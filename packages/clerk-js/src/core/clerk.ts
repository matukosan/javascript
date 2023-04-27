import type { LocalStorageBroadcastChannel } from '@clerk/shared';
import {
  addClerkPrefix,
  handleValueOrFn,
  inClientSide,
  isHttpOrHttps,
  isLegacyFrontendApiKey,
  isValidBrowserOnline,
  isValidProxyUrl,
  noop,
  parsePublishableKey,
  proxyUrlToAbsoluteURL,
  stripScheme,
} from '@clerk/shared';
import type {
  ActiveSessionResource,
  AuthenticateWithMetamaskParams,
  BeforeEmitCallback,
  BuildUrlWithAuthParams,
  Clerk as ClerkInterface,
  ClerkOptions,
  ClientResource,
  CreateOrganizationParams,
  CreateOrganizationProps,
  CustomNavigation,
  DomainOrProxyUrl,
  EnvironmentJSON,
  EnvironmentResource,
  HandleMagicLinkVerificationParams,
  HandleOAuthCallbackParams,
  InstanceType,
  ListenerCallback,
  OrganizationInvitationResource,
  OrganizationMembershipResource,
  OrganizationProfileProps,
  OrganizationResource,
  OrganizationSwitcherProps,
  PublishableKey,
  RedirectOptions,
  Resources,
  SetActiveParams,
  SignInProps,
  SignInResource,
  SignOut,
  SignOutCallback,
  SignOutOptions,
  SignUpProps,
  SignUpResource,
  UnsubscribeCallback,
  UserButtonProps,
  UserProfileProps,
  UserResource,
} from '@clerk/types';

import type { MountComponentRenderer } from '../ui/Components';
import {
  appendAsQueryParams,
  buildURL,
  createBeforeUnloadTracker,
  createCookieHandler,
  createPageLifecycle,
  errorThrower,
  getClerkQueryParam,
  hasExternalAccountSignUpError,
  ignoreEventValue,
  inActiveBrowserTab,
  inBrowser,
  isAccountsHostedPages,
  isDevOrStagingUrl,
  isError,
  noOrganizationExists,
  noUserExists,
  removeClerkQueryParam,
  sessionExistsAndSingleSessionModeEnabled,
  setDevBrowserJWTInURL,
  stripOrigin,
  validateFrontendApi,
  windowNavigate,
} from '../utils';
import { memoizeListenerCallback } from '../utils/memoizeStateListenerCallback';
import { CLERK_SATELLITE_URL, CLERK_SYNCED, ERROR_CODES } from './constants';
import type { DevBrowserHandler } from './devBrowserHandler';
import createDevBrowserHandler from './devBrowserHandler';
import {
  clerkErrorInitFailed,
  clerkMissingDevBrowserJwt,
  clerkMissingProxyUrlAndDomain,
  clerkMissingSignInUrlAsSatellite,
  clerkOAuthCallbackDidNotCompleteSignInSignUp,
  clerkRedirectUrlIsMissingScheme,
} from './errors';
import type { FapiClient, FapiRequestCallback } from './fapiClient';
import createFapiClient from './fapiClient';
import {
  BaseResource,
  Client,
  Environment,
  MagicLinkError,
  MagicLinkErrorCode,
  Organization,
  OrganizationMembership,
} from './resources/internal';
import { SessionCookieService } from './services';
import { warnings } from './warnings';

export type ClerkCoreBroadcastChannelEvent = { type: 'signout' };

declare global {
  interface Window {
    Clerk?: Clerk;
    __clerk_frontend_api?: string;
    __clerk_publishable_key?: string;
    __clerk_proxy_url?: ClerkInterface['proxyUrl'];
    __clerk_domain?: ClerkInterface['domain'];
  }
}

const defaultOptions: ClerkOptions = {
  polling: true,
  standardBrowser: true,
  touchSession: true,
  isSatellite: false,
  signInUrl: undefined,
};

export default class Clerk implements ClerkInterface {
  public static mountComponentRenderer?: MountComponentRenderer;
  public static version: string = __PKG_VERSION__;
  public client?: ClientResource;
  public session?: ActiveSessionResource | null;
  public organization?: OrganizationResource | null;
  public user?: UserResource | null;
  public __internal_country?: string | null;
  public readonly frontendApi: string;
  public readonly publishableKey?: string;
  public readonly proxyUrl?: ClerkInterface['proxyUrl'];

  #domain: DomainOrProxyUrl['domain'];
  #authService: SessionCookieService | null = null;
  #broadcastChannel: LocalStorageBroadcastChannel<ClerkCoreBroadcastChannelEvent> | null = null;
  #componentControls?: ReturnType<MountComponentRenderer> | null;
  #devBrowserHandler: DevBrowserHandler | null = null;
  #environment?: EnvironmentResource | null;
  #fapiClient: FapiClient;
  #instanceType: InstanceType;
  #isReady = false;
  #lastOrganizationInvitation: OrganizationInvitationResource | null = null;
  #lastOrganizationMember: OrganizationMembershipResource | null = null;
  #listeners: Array<(emission: Resources) => void> = [];
  #options: ClerkOptions = {};
  #pageLifecycle: ReturnType<typeof createPageLifecycle> | null = null;

  get version(): string {
    return Clerk.version;
  }

  get loaded(): boolean {
    return this.#isReady;
  }

  get isSatellite(): boolean {
    if (inBrowser()) {
      return handleValueOrFn(this.#options.isSatellite, new URL(window.location.href), false);
    }
    return false;
  }

  get allowedRedirectOrigins(): string[] {
    const origins = [...(this.#options.allowedRedirectOrigins || [])];
    if (inBrowser()) {
      //TODO: also push http(s)://*.etld+1
      origins.push(window.location.origin);
    }
    return origins;
  }

  get domain(): string {
    if (inBrowser()) {
      const strippedDomainString = stripScheme(handleValueOrFn(this.#domain, new URL(window.location.href)));
      if (this.#instanceType === 'production') {
        return addClerkPrefix(strippedDomainString);
      }
      return strippedDomainString;
    }
    return '';
  }

  get instanceType() {
    return this.#instanceType;
  }

  public constructor(key: string, options?: DomainOrProxyUrl) {
    key = (key || '').trim();

    const _unfilteredProxy = options?.proxyUrl;

    if (!isValidProxyUrl(_unfilteredProxy)) {
      errorThrower.throwInvalidProxyUrl({ url: _unfilteredProxy });
    }
    this.proxyUrl = proxyUrlToAbsoluteURL(_unfilteredProxy);

    this.#domain = options?.domain;

    if (isLegacyFrontendApiKey(key)) {
      if (!validateFrontendApi(key)) {
        errorThrower.throwInvalidFrontendApiError({ key });
      }

      this.frontendApi = key;
      this.#instanceType = isDevOrStagingUrl(this.frontendApi) ? 'development' : 'production';
    } else {
      const publishableKey = parsePublishableKey(key);

      if (!publishableKey) {
        errorThrower.throwInvalidPublishableKeyError({ key });
      }

      const { frontendApi, instanceType } = publishableKey as PublishableKey;

      this.frontendApi = frontendApi;
      this.#instanceType = instanceType;
    }
    this.#fapiClient = createFapiClient(this);
    BaseResource.clerk = this;
  }

  public getFapiClient = (): FapiClient => this.#fapiClient;

  public isReady = (): boolean => this.#isReady;

  public load = async (options?: ClerkOptions): Promise<void> => {
    if (this.#isReady) {
      return;
    }

    this.#options = {
      ...defaultOptions,
      ...options,
    };

    if (this.#options.standardBrowser) {
      this.#isReady = await this.#loadInStandardBrowser();
    } else {
      this.#isReady = await this.#loadInNonStandardBrowser();
    }
  };

  public signOut: SignOut = async (callbackOrOptions?: SignOutCallback | SignOutOptions, options?: SignOutOptions) => {
    if (!this.client || this.client.sessions.length === 0) {
      return;
    }
    const cb = typeof callbackOrOptions === 'function' ? callbackOrOptions : undefined;
    const opts = callbackOrOptions && typeof callbackOrOptions === 'object' ? callbackOrOptions : options || {};

    if (!opts.sessionId || this.client.activeSessions.length === 1) {
      await this.client.destroy();
      return this.setActive({
        session: null,
        beforeEmit: ignoreEventValue(cb),
      });
    }

    const session = this.client.activeSessions.find(s => s.id === opts.sessionId);
    const shouldSignOutCurrent = session?.id && this.session?.id === session.id;
    await session?.remove();
    if (shouldSignOutCurrent) {
      return this.setActive({
        session: null,
        beforeEmit: ignoreEventValue(cb),
      });
    }
  };

  public openSignIn = (props?: SignInProps): void => {
    this.assertComponentsReady(this.#componentControls);
    if (sessionExistsAndSingleSessionModeEnabled(this, this.#environment) && this.#instanceType === 'development') {
      return console.info(warnings.cannotOpenSignUpOrSignUp);
    }
    void this.#componentControls
      .ensureMounted({ preloadHint: 'SignIn' })
      .then(controls => controls.openModal('signIn', props || {}));
  };

  public closeSignIn = (): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls => controls.closeModal('signIn'));
  };

  public openSignUp = (props?: SignInProps): void => {
    this.assertComponentsReady(this.#componentControls);
    if (sessionExistsAndSingleSessionModeEnabled(this, this.#environment) && this.#instanceType === 'development') {
      return console.info(warnings.cannotOpenSignUpOrSignUp);
    }
    void this.#componentControls
      .ensureMounted({ preloadHint: 'SignUp' })
      .then(controls => controls.openModal('signUp', props || {}));
  };

  public closeSignUp = (): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls => controls.closeModal('signUp'));
  };

  public openUserProfile = (props?: UserProfileProps): void => {
    this.assertComponentsReady(this.#componentControls);
    if (noUserExists(this) && this.#instanceType === 'development') {
      return console.info(warnings.cannotOpenUserProfile);
    }
    void this.#componentControls
      .ensureMounted({ preloadHint: 'UserProfile' })
      .then(controls => controls.openModal('userProfile', props || {}));
  };

  public closeUserProfile = (): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls => controls.closeModal('userProfile'));
  };

  public openOrganizationProfile = (props?: OrganizationProfileProps): void => {
    this.assertComponentsReady(this.#componentControls);
    if (noOrganizationExists(this) && this.#instanceType === 'development') {
      return console.info(warnings.cannotOpenOrgProfile);
    }
    void this.#componentControls
      .ensureMounted({ preloadHint: 'OrganizationProfile' })
      .then(controls => controls.openModal('organizationProfile', props || {}));
  };

  public closeOrganizationProfile = (): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls => controls.closeModal('organizationProfile'));
  };

  public openCreateOrganization = (props?: CreateOrganizationProps): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls
      .ensureMounted({ preloadHint: 'CreateOrganization' })
      .then(controls => controls.openModal('createOrganization', props || {}));
  };

  public closeCreateOrganization = (): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls => controls.closeModal('createOrganization'));
  };

  public mountSignIn = (node: HTMLDivElement, props?: SignInProps): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted({ preloadHint: 'SignIn' }).then(controls =>
      controls.mountComponent({
        name: 'SignIn',
        appearanceKey: 'signIn',
        node,
        props,
      }),
    );
  };

  public unmountSignIn = (node: HTMLDivElement): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls =>
      controls.unmountComponent({
        node,
      }),
    );
  };

  public mountSignUp = (node: HTMLDivElement, props?: SignUpProps): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted({ preloadHint: 'SignUp' }).then(controls =>
      controls.mountComponent({
        name: 'SignUp',
        appearanceKey: 'signUp',
        node,
        props,
      }),
    );
  };

  public unmountSignUp = (node: HTMLDivElement): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls =>
      controls.unmountComponent({
        node,
      }),
    );
  };

  public mountUserProfile = (node: HTMLDivElement, props?: UserProfileProps): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted({ preloadHint: 'UserProfile' }).then(controls =>
      controls.mountComponent({
        name: 'UserProfile',
        appearanceKey: 'userProfile',
        node,
        props,
      }),
    );
  };

  public unmountUserProfile = (node: HTMLDivElement): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls =>
      controls.unmountComponent({
        node,
      }),
    );
  };

  public mountOrganizationProfile = (node: HTMLDivElement, props?: OrganizationProfileProps) => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted({ preloadHint: 'OrganizationProfile' }).then(controls =>
      controls.mountComponent({
        name: 'OrganizationProfile',
        appearanceKey: 'userProfile',
        node,
        props,
      }),
    );
  };

  public unmountOrganizationProfile = (node: HTMLDivElement) => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls.ensureMounted().then(controls =>
      controls.unmountComponent({
        node,
      }),
    );
  };

  public mountCreateOrganization = (node: HTMLDivElement, props?: CreateOrganizationProps) => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls?.ensureMounted({ preloadHint: 'CreateOrganization' }).then(controls =>
      controls.mountComponent({
        name: 'CreateOrganization',
        appearanceKey: 'createOrganization',
        node,
        props,
      }),
    );
  };

  public unmountCreateOrganization = (node: HTMLDivElement) => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls?.ensureMounted().then(controls =>
      controls.unmountComponent({
        node,
      }),
    );
  };

  public mountOrganizationSwitcher = (node: HTMLDivElement, props?: OrganizationSwitcherProps) => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls?.ensureMounted({ preloadHint: 'OrganizationSwitcher' }).then(controls =>
      controls.mountComponent({
        name: 'OrganizationSwitcher',
        appearanceKey: 'organizationSwitcher',
        node,
        props,
      }),
    );
  };

  public unmountOrganizationSwitcher = (node: HTMLDivElement): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls?.ensureMounted().then(controls => controls.unmountComponent({ node }));
  };

  public mountUserButton = (node: HTMLDivElement, props?: UserButtonProps) => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls?.ensureMounted({ preloadHint: 'UserButton' }).then(controls =>
      controls.mountComponent({
        name: 'UserButton',
        appearanceKey: 'userButton',
        node,
        props,
      }),
    );
  };

  public unmountUserButton = (node: HTMLDivElement): void => {
    this.assertComponentsReady(this.#componentControls);
    void this.#componentControls?.ensureMounted().then(controls => controls.unmountComponent({ node }));
  };

  /**
   * `setActive` can be used to set the active session and/or organization.
   * It will eventually replace `setSession`.
   *
   * @experimental
   */
  public setActive = async ({ session, organization, beforeEmit }: SetActiveParams): Promise<void> => {
    if (!this.client) {
      throw new Error('setActive is being called before the client is loaded. Wait for init.');
    }

    if (session === undefined && !this.session) {
      throw new Error(
        'setActive should either be called with a session param or there should be already an active session.',
      );
    }

    type SetActiveHook = () => void;
    const onBeforeSetActive: SetActiveHook =
      typeof window !== 'undefined' && typeof window.__unstable__onBeforeSetActive === 'function'
        ? window.__unstable__onBeforeSetActive
        : noop;

    const onAfterSetActive: SetActiveHook =
      typeof window !== 'undefined' && typeof window.__unstable__onAfterSetActive === 'function'
        ? window.__unstable__onAfterSetActive
        : noop;

    if (typeof session === 'string') {
      session = (this.client.sessions.find(x => x.id === session) as ActiveSessionResource) || null;
    }

    let newSession = session === undefined ? this.session : session;

    // At this point, the `session` variable should contain either an `ActiveSessionResource`
    // ,`null` or `undefined`.
    // We now want to set the last active organization id on that session (if it exists).
    // However, if the `organization` parameter is not given (i.e. `undefined`), we want
    // to keep the organization id that the session had.
    const shouldSwitchOrganization = organization !== undefined;
    if (newSession && shouldSwitchOrganization) {
      const organizationId = typeof organization === 'string' ? organization : organization?.id;
      newSession.lastActiveOrganizationId = organizationId || null;
    }

    // If this.session exists, then signOut was triggered by the current tab
    // and should emit. Other tabs should not emit the same event again
    const shouldSignOutSession = this.session && newSession === null;
    if (shouldSignOutSession) {
      this.#broadcastSignOutEvent();
    }

    onBeforeSetActive();

    //1. setLastActiveSession to passed user session (add a param).
    //   Note that this will also update the session's active organization
    //   id.
    if (inActiveBrowserTab()) {
      await this.#touchLastActiveSession(newSession);
      // reload session from updated client
      newSession = this.#getSessionFromClient(newSession?.id);
    }

    await this.#authService?.setAuthCookiesFromSession(newSession);

    //2. If there's a beforeEmit, typically we're navigating.  Emit the session as
    //   undefined, then wait for beforeEmit to complete before emitting the new session.
    //   When undefined, neither SignedIn nor SignedOut renders, which avoids flickers or
    //   automatic reloading when reloading shouldn't be happening.
    const beforeUnloadTracker = createBeforeUnloadTracker();
    if (beforeEmit) {
      beforeUnloadTracker.startTracking();
      this.#setTransitiveState();
      await beforeEmit(newSession);
      beforeUnloadTracker.stopTracking();
    }

    //3. Check if hard reloading (onbeforeunload).  If not, set the user/session and emit
    if (beforeUnloadTracker.isUnloading()) {
      return;
    }

    this.#setAccessors(newSession);
    this.#emit();
    onAfterSetActive();
    this.#resetComponentsState();
  };

  public setSession = async (
    session: ActiveSessionResource | string | null,
    beforeEmit?: BeforeEmitCallback,
  ): Promise<void> => {
    return this.setActive({ session, beforeEmit });
  };

  public addListener = (listener: ListenerCallback): UnsubscribeCallback => {
    listener = memoizeListenerCallback(listener);
    this.#listeners.push(listener);
    // emit right away
    if (this.client) {
      listener({
        client: this.client,
        session: this.session,
        user: this.user,
        organization: this.organization,
        lastOrganizationInvitation: this.#lastOrganizationInvitation,
        lastOrganizationMember: this.#lastOrganizationMember,
      });
    }

    const unsubscribe = () => {
      this.#listeners = this.#listeners.filter(l => l !== listener);
    };
    return unsubscribe;
  };

  public navigate: CustomNavigation = async to => {
    if (!to || !inBrowser()) {
      return;
    }

    const toURL = new URL(to, window.location.href);
    const customNavigate = this.#options.navigate;

    if (toURL.origin !== window.location.origin || !customNavigate) {
      windowNavigate(toURL);
      return;
    }

    // React router only wants the path, search or hash portion.
    return await customNavigate(stripOrigin(toURL));
  };

  public buildUrlWithAuth(to: string, options?: BuildUrlWithAuthParams): string {
    if (this.#instanceType === 'production' || !this.#devBrowserHandler?.usesUrlBasedSessionSync()) {
      return to;
    }

    const toURL = new URL(to, window.location.href);

    if (toURL.origin === window.location.origin) {
      return toURL.href;
    }

    const devBrowserJwt = this.#devBrowserHandler?.getDevBrowserJWT();
    if (!devBrowserJwt) {
      return clerkMissingDevBrowserJwt();
    }

    let asQueryParam = false;
    if (options && options.useQueryParam) {
      asQueryParam = options.useQueryParam;
    }

    return setDevBrowserJWTInURL(toURL.href, devBrowserJwt, asQueryParam);
  }

  public buildSignInUrl(options?: RedirectOptions): string {
    const opts: RedirectOptions = {
      ...options,
      redirectUrl: options?.redirectUrl || window.location.href,
    };
    if (!this.#environment || !this.#environment.displayConfig) {
      return '';
    }
    const { signInUrl } = this.#environment.displayConfig;
    return this.buildUrlWithAuth(appendAsQueryParams(signInUrl, opts));
  }

  public buildSignUpUrl(options?: RedirectOptions): string {
    const opts: RedirectOptions = {
      ...options,
      redirectUrl: options?.redirectUrl || window.location.href,
    };
    if (!this.#environment || !this.#environment.displayConfig) {
      return '';
    }
    const { signUpUrl } = this.#environment.displayConfig;
    return this.buildUrlWithAuth(appendAsQueryParams(signUpUrl, opts));
  }

  public buildUserProfileUrl(): string {
    if (!this.#environment || !this.#environment.displayConfig) {
      return '';
    }
    return this.buildUrlWithAuth(this.#environment.displayConfig.userProfileUrl);
  }

  public buildHomeUrl(): string {
    if (!this.#environment || !this.#environment.displayConfig) {
      return '';
    }
    return this.buildUrlWithAuth(this.#environment.displayConfig.homeUrl);
  }

  public buildCreateOrganizationUrl(): string {
    if (!this.#environment || !this.#environment.displayConfig) {
      return '';
    }
    return this.buildUrlWithAuth(this.#environment.displayConfig.createOrganizationUrl);
  }

  public buildOrganizationProfileUrl(): string {
    if (!this.#environment || !this.#environment.displayConfig) {
      return '';
    }
    return this.buildUrlWithAuth(this.#environment.displayConfig.organizationProfileUrl);
  }

  #redirectToSatellite = async (): Promise<unknown> => {
    if (!inBrowser()) {
      return;
    }
    const searchParams = new URLSearchParams({
      [CLERK_SYNCED]: 'true',
    });
    const backToSatelliteUrl = buildURL(
      { base: getClerkQueryParam(CLERK_SATELLITE_URL) as string, searchParams },
      { stringify: true },
    );
    return this.navigate(this.buildUrlWithAuth(backToSatelliteUrl));
  };

  public redirectWithAuth = async (to: string): Promise<unknown> => {
    if (inBrowser()) {
      return this.navigate(this.buildUrlWithAuth(to));
    }
    return;
  };

  public redirectToSignIn = async (options?: RedirectOptions): Promise<unknown> => {
    if (inBrowser()) {
      return this.navigate(this.buildSignInUrl(options));
    }
    return;
  };

  public redirectToSignUp = async (options?: RedirectOptions): Promise<unknown> => {
    if (inBrowser()) {
      return this.navigate(this.buildSignUpUrl(options));
    }
    return;
  };

  public redirectToUserProfile = async (): Promise<unknown> => {
    if (inBrowser()) {
      return this.navigate(this.buildUserProfileUrl());
    }
    return;
  };

  public redirectToCreateOrganization = async (): Promise<unknown> => {
    if (inBrowser()) {
      return this.navigate(this.buildCreateOrganizationUrl());
    }
    return;
  };

  public redirectToOrganizationProfile = async (): Promise<unknown> => {
    if (inBrowser()) {
      return this.navigate(this.buildOrganizationProfileUrl());
    }
    return;
  };

  public redirectToHome = async (): Promise<unknown> => {
    if (inBrowser()) {
      return this.navigate(this.buildHomeUrl());
    }
    return;
  };

  public handleMagicLinkVerification = async (
    params: HandleMagicLinkVerificationParams,
    customNavigate?: (to: string) => Promise<unknown>,
  ): Promise<unknown> => {
    if (!this.client) {
      return;
    }

    const verificationStatus = getClerkQueryParam('__clerk_status');
    if (verificationStatus === 'expired') {
      throw new MagicLinkError(MagicLinkErrorCode.Expired);
    } else if (verificationStatus !== 'verified') {
      throw new MagicLinkError(MagicLinkErrorCode.Failed);
    }

    const newSessionId = getClerkQueryParam('__clerk_created_session');
    const { signIn, signUp, sessions } = this.client;

    const shouldCompleteOnThisDevice = sessions.some(s => s.id === newSessionId);
    const shouldContinueOnThisDevice =
      signIn.status === 'needs_second_factor' || signUp.status === 'missing_requirements';

    const navigate = (to: string) =>
      customNavigate && typeof customNavigate === 'function' ? customNavigate(to) : this.navigate(to);

    const redirectComplete = params.redirectUrlComplete ? () => navigate(params.redirectUrlComplete as string) : noop;
    const redirectContinue = params.redirectUrl ? () => navigate(params.redirectUrl as string) : noop;

    if (shouldCompleteOnThisDevice) {
      return this.setActive({
        session: newSessionId,
        beforeEmit: redirectComplete,
      });
    } else if (shouldContinueOnThisDevice) {
      return redirectContinue();
    }

    if (typeof params.onVerifiedOnOtherDevice === 'function') {
      params.onVerifiedOnOtherDevice();
    }
    return null;
  };

  public handleRedirectCallback = async (
    params: HandleOAuthCallbackParams = {},
    customNavigate?: (to: string) => Promise<unknown>,
  ): Promise<unknown> => {
    if (!this.#isReady || !this.#environment || !this.client) {
      return;
    }
    const { signIn, signUp } = this.client;
    const { displayConfig } = this.#environment;
    const { firstFactorVerification } = signIn;
    const { externalAccount } = signUp.verifications;
    const su = {
      status: signUp.status,
      externalAccountStatus: externalAccount.status,
      externalAccountErrorCode: externalAccount.error?.code,
      externalAccountSessionId: externalAccount.error?.meta?.sessionId,
    };

    const si = {
      status: signIn.status,
      firstFactorVerificationStatus: firstFactorVerification.status,
      firstFactorVerificationErrorCode: firstFactorVerification.error?.code,
      firstFactorVerificationSessionId: firstFactorVerification.error?.meta?.sessionId,
    };

    const navigate = (to: string) =>
      customNavigate && typeof customNavigate === 'function' ? customNavigate(to) : this.navigate(to);

    const makeNavigate = (to: string) => () => navigate(to);

    const navigateToSignIn = makeNavigate(displayConfig.signInUrl);

    const navigateToSignUp = makeNavigate(displayConfig.signUpUrl);

    const navigateToFactorTwo = makeNavigate(
      params.secondFactorUrl ||
        buildURL({ base: displayConfig.signInUrl, hashPath: '/factor-two' }, { stringify: true }),
    );

    const navigateAfterSignIn = makeNavigate(
      params.afterSignInUrl || params.redirectUrl || displayConfig.afterSignInUrl,
    );

    const navigateAfterSignUp = makeNavigate(
      params.afterSignUpUrl || params.redirectUrl || displayConfig.afterSignUpUrl,
    );

    const navigateToContinueSignUp = makeNavigate(
      params.continueSignUpUrl ||
        buildURL({ base: displayConfig.signUpUrl, hashPath: '/continue' }, { stringify: true }),
    );

    const userExistsButNeedsToSignIn =
      su.externalAccountStatus === 'transferable' && su.externalAccountErrorCode === 'external_account_exists';

    if (userExistsButNeedsToSignIn) {
      const res = await signIn.create({ transfer: true });
      switch (res.status) {
        case 'complete':
          return this.setActive({
            session: res.createdSessionId,
            beforeEmit: navigateAfterSignIn,
          });
        case 'needs_second_factor':
          return navigateToFactorTwo();
        default:
          clerkOAuthCallbackDidNotCompleteSignInSignUp('sign in');
      }
    }

    const userNeedsToBeCreated = si.firstFactorVerificationStatus === 'transferable';

    if (userNeedsToBeCreated) {
      const res = await signUp.create({ transfer: true });
      switch (res.status) {
        case 'complete':
          return this.setActive({
            session: res.createdSessionId,
            beforeEmit: navigateAfterSignUp,
          });
        case 'missing_requirements':
          return navigateToContinueSignUp();
        default:
          clerkOAuthCallbackDidNotCompleteSignInSignUp('sign in');
      }
    }

    if (si.status === 'needs_second_factor') {
      return navigateToFactorTwo();
    }

    const suUserAlreadySignedIn =
      (su.externalAccountStatus === 'failed' || su.externalAccountStatus === 'unverified') &&
      su.externalAccountErrorCode === 'identifier_already_signed_in' &&
      su.externalAccountSessionId;

    const siUserAlreadySignedIn =
      si.firstFactorVerificationStatus === 'failed' &&
      si.firstFactorVerificationErrorCode === 'identifier_already_signed_in' &&
      si.firstFactorVerificationSessionId;

    const userAlreadySignedIn = suUserAlreadySignedIn || siUserAlreadySignedIn;
    if (userAlreadySignedIn) {
      const sessionId = si.firstFactorVerificationSessionId || su.externalAccountSessionId;
      if (sessionId) {
        return this.setActive({
          session: sessionId,
          beforeEmit: navigateAfterSignIn,
        });
      }
    }

    if (hasExternalAccountSignUpError(signUp)) {
      return navigateToSignUp();
    }

    if (su.externalAccountStatus === 'verified' && su.status === 'missing_requirements') {
      return navigateToContinueSignUp();
    }

    return navigateToSignIn();
  };

  public handleUnauthenticated = async (opts = { broadcast: true }): Promise<unknown> => {
    if (!this.client || !this.session) {
      return;
    }
    const newClient = await Client.getInstance().fetch();
    this.updateClient(newClient);
    if (this.session) {
      return;
    }
    if (opts.broadcast) {
      this.#broadcastSignOutEvent();
    }
    return this.setActive({ session: null });
  };

  public authenticateWithMetamask = async ({
    redirectUrl,
    signUpContinueUrl,
    customNavigate,
  }: AuthenticateWithMetamaskParams = {}): Promise<void> => {
    if (!this.client || !this.#environment) {
      return;
    }

    const navigate = (to: string) =>
      customNavigate && typeof customNavigate === 'function' ? customNavigate(to) : this.navigate(to);

    let signInOrSignUp: SignInResource | SignUpResource;
    try {
      signInOrSignUp = await this.client.signIn.authenticateWithMetamask();
    } catch (err) {
      if (isError(err, ERROR_CODES.FORM_IDENTIFIER_NOT_FOUND)) {
        signInOrSignUp = await this.client.signUp.authenticateWithMetamask();

        if (
          signUpContinueUrl &&
          signInOrSignUp.status === 'missing_requirements' &&
          signInOrSignUp.verifications.web3Wallet.status === 'verified'
        ) {
          await navigate(signUpContinueUrl);
        }
      } else {
        throw err;
      }
    }

    if (signInOrSignUp.createdSessionId) {
      await this.setActive({
        session: signInOrSignUp.createdSessionId,
        beforeEmit: () => {
          if (redirectUrl) {
            return navigate(redirectUrl);
          }
          return Promise.resolve();
        },
      });
    }
  };

  public createOrganization = async ({ name, slug }: CreateOrganizationParams): Promise<OrganizationResource> => {
    return Organization.create({ name, slug });
  };

  public getOrganizationMemberships = async (): Promise<OrganizationMembership[]> => {
    return await OrganizationMembership.retrieve();
  };

  public getOrganization = async (organizationId: string): Promise<Organization | undefined> => {
    return (await OrganizationMembership.retrieve()).find(orgMem => orgMem.organization.id === organizationId)
      ?.organization;
  };

  public updateEnvironment(environment: EnvironmentResource) {
    this.#environment = environment;
    this.#authService?.setEnvironment(environment);
  }

  __internal_setCountry = (country: string | null) => {
    if (!this.__internal_country) {
      this.__internal_country = country;
    }
  };

  updateClient = (newClient: ClientResource): void => {
    if (!this.client) {
      // This is the first time client is being
      // set, so we also need to set session
      const session = this.#options.selectInitialSession
        ? this.#options.selectInitialSession(newClient)
        : this.#defaultSession(newClient);
      this.#setAccessors(session);
    }
    this.client = newClient;

    if (this.session) {
      const session = this.#getSessionFromClient(this.session.id);
      this.#setAccessors(session);
    }

    this.#emit();
  };

  __unstable__invitationUpdate(invitation: OrganizationInvitationResource) {
    this.#lastOrganizationInvitation = invitation;
    this.#emit();
  }

  __unstable__membershipUpdate(membership: OrganizationMembershipResource) {
    this.#lastOrganizationMember = membership;
    this.#emit();
  }

  get __unstable__environment(): EnvironmentResource | null | undefined {
    return this.#environment;
  }

  __unstable__setEnvironment = async (env: EnvironmentJSON) => {
    this.#environment = new Environment(env);

    if (Clerk.mountComponentRenderer) {
      this.#componentControls = Clerk.mountComponentRenderer(this, this.#environment, this.#options);
    }
  };

  __unstable__onBeforeRequest = (callback: FapiRequestCallback<any>): void => {
    this.#fapiClient.onBeforeRequest(callback);
  };

  __unstable__onAfterResponse = (callback: FapiRequestCallback<any>): void => {
    this.#fapiClient.onAfterResponse(callback);
  };

  __unstable__updateProps = (props: any) => {
    // The expect-error directive below is safe since `updateAppearanceProp` is only used
    // in the v4 build. This will be removed when v4 becomes the main stable version
    return this.#componentControls?.ensureMounted().then(controls => controls.updateProps(props));
  };

  #hasJustSynced = () => getClerkQueryParam(CLERK_SYNCED) === 'true';

  #clearJustSynced = () => removeClerkQueryParam(CLERK_SYNCED);

  #buildSyncUrlForDevelopmentInstances = (): string => {
    const searchParams = new URLSearchParams({
      [CLERK_SATELLITE_URL]: window.location.href,
    });
    return buildURL({ base: this.#options.signInUrl, searchParams }, { stringify: true });
  };

  #buildSyncUrlForProductionInstances = (): string => {
    let primarySyncUrl;

    if (this.proxyUrl) {
      const proxy = new URL(this.proxyUrl);
      primarySyncUrl = new URL(`${proxy.pathname}/v1/client/sync`, proxy.origin);
    } else if (this.domain) {
      primarySyncUrl = new URL(`/v1/client/sync`, `https://${this.domain}`);
    }

    primarySyncUrl?.searchParams.append('redirect_url', window.location.href);

    return primarySyncUrl?.toString() || '';
  };

  #shouldSyncWithPrimary = (): boolean => {
    if (this.#hasJustSynced()) {
      this.#clearJustSynced();
      return false;
    }

    if (!this.isSatellite) {
      return false;
    }

    if (!this.proxyUrl && !this.domain) {
      clerkMissingProxyUrlAndDomain();
    }

    return this.#shouldSyncWithPrimaryInDevelopment() || this.#shouldSyncWithPrimaryInProduction();
  };

  #shouldSyncWithPrimaryInDevelopment = (): boolean => {
    if (this.#instanceType === 'development' && !this.#options.signInUrl) {
      clerkMissingSignInUrlAsSatellite();
    }

    return this.#instanceType === 'development';
  };

  #shouldSyncWithPrimaryInProduction = (): boolean => {
    if (this.#instanceType === 'development') {
      return false;
    }

    const cookieHandler = createCookieHandler();
    return cookieHandler.getClientUatCookie() <= 0;
  };

  #shouldRedirectToSatellite = (): boolean => {
    if (this.#instanceType === 'production') {
      return false;
    }

    if (this.isSatellite) {
      return false;
    }

    const satelliteUrl = getClerkQueryParam(CLERK_SATELLITE_URL);
    if (!satelliteUrl) {
      return false;
    }

    if (!isHttpOrHttps(satelliteUrl)) {
      clerkRedirectUrlIsMissingScheme();
    }

    return true;
  };

  #syncWithPrimary = async () => {
    if (this.#shouldSyncWithPrimaryInDevelopment()) {
      await this.navigate(this.#buildSyncUrlForDevelopmentInstances());
    } else if (this.#shouldSyncWithPrimaryInProduction()) {
      await this.navigate(this.#buildSyncUrlForProductionInstances());
    }
  };

  #loadInStandardBrowser = async (): Promise<boolean> => {
    // Dev Browser handling
    this.#devBrowserHandler = createDevBrowserHandler({
      frontendApi: this.frontendApi,
      fapiClient: this.#fapiClient,
    });

    if (this.#instanceType === 'production') {
      await this.#devBrowserHandler.clear();
    } else {
      await this.#devBrowserHandler.setup();
    }

    // Multidomain SSO handling
    if (this.#shouldSyncWithPrimary()) {
      await this.#syncWithPrimary();
      // ClerkJS is not considered loaded during the sync/link process with the primary domain
      return false;
    } else if (this.#shouldRedirectToSatellite()) {
      await this.#redirectToSatellite();
      return false;
    }

    this.#authService = new SessionCookieService(this);
    this.#pageLifecycle = createPageLifecycle();

    const isInAccountsHostedPages = isAccountsHostedPages(window?.location.hostname);

    this.#setupListeners();

    let retries = 0;
    while (retries < 2) {
      retries++;

      try {
        const shouldTouchEnv = this.#instanceType === 'development' && !isInAccountsHostedPages;

        const [environment, client] = await Promise.all([
          Environment.getInstance().fetch({ touch: shouldTouchEnv }),
          Client.getInstance().fetch(),
        ]);

        this.updateClient(client);
        // updateEnvironment should be called after updateClient
        // because authService#setEnviroment depends on clerk.session that is being
        // set in updateClient
        this.updateEnvironment(environment);

        if (Clerk.mountComponentRenderer) {
          this.#componentControls = Clerk.mountComponentRenderer(this, this.#environment as Environment, this.#options);
        }

        break;
      } catch (err) {
        if (isError(err, 'dev_browser_unauthenticated')) {
          // Purge and try setup again
          await this.#devBrowserHandler.clear();
          await this.#devBrowserHandler.setup();
        } else if (!isValidBrowserOnline()) {
          console.warn(err);
          return false;
        } else {
          throw err;
        }
      }

      if (retries >= 2) {
        clerkErrorInitFailed();
      }
    }

    this.#handleImpersonationFab();
    return true;
  };

  #loadInNonStandardBrowser = async (): Promise<boolean> => {
    const [environment, client] = await Promise.all([
      Environment.getInstance().fetch({ touch: false }),
      Client.getInstance().fetch(),
    ]);

    this.#environment = environment;
    this.updateClient(client);

    // TODO: Add an auth service also for non standard browsers that will poll for the __session JWT but won't use cookies

    if (Clerk.mountComponentRenderer) {
      this.#componentControls = Clerk.mountComponentRenderer(this, this.#environment, this.#options);
    }

    return true;
  };

  #defaultSession = (client: ClientResource): ActiveSessionResource | null => {
    if (client.lastActiveSessionId) {
      const lastActiveSession = client.activeSessions.find(s => s.id === client.lastActiveSessionId);
      if (lastActiveSession) {
        return lastActiveSession;
      }
    }
    const session = client.activeSessions[0];
    return session || null;
  };

  #setupListeners = (): void => {
    if (!inClientSide()) {
      return;
    }

    this.#pageLifecycle?.onPageVisible(() => {
      if (this.session) {
        void this.#touchLastActiveSession(this.session);
      }
    });

    this.#broadcastChannel?.addEventListener('message', ({ data }) => {
      if (data.type === 'signout') {
        void this.handleUnauthenticated({ broadcast: false });
      }
    });
  };

  // TODO: Be more conservative about touches. Throttle, don't touch when only one user, etc
  #touchLastActiveSession = async (session?: ActiveSessionResource | null): Promise<void> => {
    if (!session || !this.#options.touchSession) {
      return Promise.resolve();
    }
    await session.touch().catch(noop);
  };

  #emit = (): void => {
    if (this.client) {
      for (const listener of this.#listeners) {
        listener({
          client: this.client,
          session: this.session,
          user: this.user,
          organization: this.organization,
          lastOrganizationInvitation: this.#lastOrganizationInvitation,
          lastOrganizationMember: this.#lastOrganizationMember,
        });
      }
    }
  };

  #broadcastSignOutEvent = () => {
    this.#broadcastChannel?.postMessage({ type: 'signout' });
  };

  #resetComponentsState = () => {
    if (Clerk.mountComponentRenderer) {
      this.closeSignUp();
      this.closeSignIn();
    }
  };

  #setTransitiveState = () => {
    this.session = undefined;
    this.organization = undefined;
    this.user = undefined;
    this.#emit();
  };

  #getLastActiveOrganizationFromSession = () => {
    const orgMemberships = this.session?.user.organizationMemberships || [];
    return (
      orgMemberships.map(om => om.organization).find(org => org.id === this.session?.lastActiveOrganizationId) || null
    );
  };

  #setAccessors = (session?: ActiveSessionResource | null) => {
    this.session = session || null;
    this.organization = this.#getLastActiveOrganizationFromSession();
    this.#aliasUser();
  };

  #getSessionFromClient = (sessionId: string | undefined): ActiveSessionResource | null => {
    return this.client?.activeSessions.find(x => x.id === sessionId) || null;
  };

  #aliasUser = () => {
    this.user = this.session ? this.session.user : null;
  };

  #handleImpersonationFab = () => {
    this.addListener(({ session }) => {
      const isImpersonating = !!session?.actor;
      if (isImpersonating) {
        void this.#componentControls?.ensureMounted().then(controls => controls.mountImpersonationFab());
      }
    });
  };

  assertComponentsReady(controls: unknown): asserts controls is ReturnType<MountComponentRenderer> {
    if (!Clerk.mountComponentRenderer) {
      throw new Error('ClerkJS was loaded without UI components.');
    }
    if (!controls) {
      throw new Error('ClerkJS components are not ready yet.');
    }
  }
}
