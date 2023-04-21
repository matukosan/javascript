import type { BuildUrlWithAuthParams } from '@clerk/types';
import React from 'react';

import { buildURL } from '../../utils/url';
import { buildAuthQueryString, extractAuthProp } from '../common/authPropHelpers';
import { useCoreClerk, useEnvironment } from '../contexts';
import type { ParsedQs } from '../router';
import { useRouter } from '../router';
import type {
  AvailableComponentCtx,
  CreateOrganizationCtx,
  OrganizationProfileCtx,
  OrganizationSwitcherCtx,
  SignInCtx,
  SignUpCtx,
  UserButtonCtx,
  UserProfileCtx,
} from '../types';
import { isRedirectForFAPIInitiatedFlow } from './utils';

export const ComponentContext = React.createContext<AvailableComponentCtx | null>(null);

export type SignUpContextType = SignUpCtx & {
  navigateAfterSignUp: () => any;
  queryParams: ParsedQs;
  signInUrl: string;
  secondFactorUrl: string;
  authQueryString: string | null;
};

export const useSignUpContext = (): SignUpContextType => {
  const { componentName, ...ctx } = (React.useContext(ComponentContext) || {}) as SignUpCtx;
  const { navigate } = useRouter();
  const { displayConfig } = useEnvironment();
  const { queryParams } = useRouter();
  const clerk = useCoreClerk();

  if (componentName !== 'SignUp') {
    throw new Error('Clerk: useSignUpContext called outside of the mounted SignUp component.');
  }

  const afterSignUpUrl = clerk.buildUrlWithAuth(
    extractAuthProp('afterSignUpUrl', {
      ctx,
      queryParams,
      displayConfig,
    }),
  );

  const afterSignInUrl = clerk.buildUrlWithAuth(
    extractAuthProp('afterSignInUrl', {
      ctx,
      queryParams,
      displayConfig,
    }),
  );

  const navigateAfterSignUp = () => navigate(afterSignUpUrl);
  let signInUrl = ctx.signInUrl || displayConfig.signInUrl;

  // Add query strings to the sign in URL
  const authQs = buildAuthQueryString({
    afterSignInUrl: afterSignInUrl,
    afterSignUpUrl: afterSignUpUrl,
    displayConfig: displayConfig,
  });

  // Todo: Look for a better way than checking virtual
  if (authQs && ctx.routing != 'virtual') {
    signInUrl += `#/?${authQs}`;
  }

  // TODO: Avoid building this url again to remove duplicate code. Get it from window.Clerk instead.
  const secondFactorUrl = buildURL({ base: signInUrl, hashPath: '/factor-two' }, { stringify: true });

  return {
    ...ctx,
    componentName,
    signInUrl,
    secondFactorUrl,
    afterSignUpUrl,
    afterSignInUrl,
    navigateAfterSignUp,
    queryParams,
    authQueryString: authQs,
  };
};

export type SignInContextType = SignInCtx & {
  navigateAfterSignIn: () => any;
  queryParams: ParsedQs;
  signUpUrl: string;
  signUpContinueUrl: string;
  authQueryString: string | null;
};

export const useSignInContext = (): SignInContextType => {
  const { componentName, ...ctx } = (React.useContext(ComponentContext) || {}) as SignInCtx;
  const { navigate } = useRouter();
  const { displayConfig } = useEnvironment();
  const { queryParams } = useRouter();
  const clerk = useCoreClerk();

  if (componentName !== 'SignIn') {
    throw new Error('Clerk: useSignInContext called outside of the mounted SignIn component.');
  }

  const afterSignUpUrl = clerk.buildUrlWithAuth(
    extractAuthProp('afterSignUpUrl', {
      ctx,
      queryParams,
      displayConfig,
    }),
  );

  const extractedAfterSignInUrl = extractAuthProp('afterSignInUrl', {
    ctx,
    queryParams,
    displayConfig,
  });

  const buildUrlWithAuthParams: BuildUrlWithAuthParams = {};
  if (clerk.instanceType !== 'production' && isRedirectForFAPIInitiatedFlow(clerk, extractedAfterSignInUrl)) {
    buildUrlWithAuthParams.useQueryParam = true;

    if (clerk.session) {
      navigate(clerk.buildUrlWithAuth(extractedAfterSignInUrl, buildUrlWithAuthParams));
    }
  }

  const afterSignInUrl = clerk.buildUrlWithAuth(extractedAfterSignInUrl, buildUrlWithAuthParams);

  const navigateAfterSignIn = () => navigate(afterSignInUrl);
  let signUpUrl = ctx.signUpUrl || displayConfig.signUpUrl;

  // Add query strings to the sign in URL
  const authQs = buildAuthQueryString({
    afterSignInUrl: afterSignInUrl,
    afterSignUpUrl: afterSignUpUrl,
    displayConfig: displayConfig,
  });
  if (authQs && ctx.routing !== 'virtual') {
    signUpUrl += `#/?${authQs}`;
  }

  const signUpContinueUrl = buildURL({ base: signUpUrl, hashPath: '/continue' }, { stringify: true });

  return {
    ...ctx,
    componentName,
    signUpUrl,
    afterSignInUrl,
    afterSignUpUrl,
    navigateAfterSignIn,
    signUpContinueUrl,
    queryParams,
    authQueryString: authQs,
  };
};

export type UserProfileContextType = UserProfileCtx & {
  queryParams: ParsedQs;
  authQueryString: string | null;
};

// UserProfile does not accept any props except for
// `routing` and `path`
// TODO: remove if not needed during the components v2 overhaul
export const useUserProfileContext = (): UserProfileContextType => {
  const { componentName, ...ctx } = (React.useContext(ComponentContext) || {}) as UserProfileCtx;
  const { queryParams } = useRouter();

  if (componentName !== 'UserProfile') {
    throw new Error('Clerk: useUserProfileContext called outside of the mounted UserProfile component.');
  }

  return {
    ...ctx,
    componentName,
    queryParams,
    authQueryString: '',
  };
};

export const useUserButtonContext = () => {
  const { componentName, ...ctx } = (React.useContext(ComponentContext) || {}) as UserButtonCtx;
  const { navigate } = useRouter();
  const { displayConfig } = useEnvironment();

  if (componentName !== 'UserButton') {
    throw new Error('Clerk: useUserButtonContext called outside of the mounted UserButton component.');
  }

  const signInUrl = ctx.signInUrl || displayConfig.signInUrl;
  const userProfileUrl = ctx.userProfileUrl || displayConfig.userProfileUrl;

  const afterMultiSessionSingleSignOutUrl = ctx.afterMultiSessionSingleSignOutUrl || displayConfig.afterSignOutOneUrl;
  const navigateAfterMultiSessionSingleSignOut = () => navigate(afterMultiSessionSingleSignOutUrl);
  const afterSignOutUrl = ctx.afterSignOutUrl || displayConfig.afterSignOutAllUrl;
  const navigateAfterSignOut = () => navigate(afterSignOutUrl);

  const afterSwitchSessionUrl = ctx.afterSwitchSessionUrl || displayConfig.afterSwitchSessionUrl;
  const navigateAfterSwitchSession = () => navigate(afterMultiSessionSingleSignOutUrl);

  return {
    ...ctx,
    componentName,
    navigateAfterMultiSessionSingleSignOut,
    navigateAfterSignOut,
    navigateAfterSwitchSession,
    signInUrl,
    userProfileUrl,
    afterMultiSessionSingleSignOutUrl,
    afterSignOutUrl,
    afterSwitchSessionUrl,
  };
};

export const useOrganizationSwitcherContext = () => {
  const { componentName, ...ctx } = (React.useContext(ComponentContext) || {}) as OrganizationSwitcherCtx;
  const { navigate } = useRouter();
  const { displayConfig } = useEnvironment();

  if (componentName !== 'OrganizationSwitcher') {
    throw new Error('Clerk: useUserButtonContext called outside OrganizationSwitcher.');
  }

  const afterCreateOrganizationUrl = ctx.afterCreateOrganizationUrl || displayConfig.afterCreateOrganizationUrl;
  const afterLeaveOrganizationUrl = ctx.afterLeaveOrganizationUrl || displayConfig.afterLeaveOrganizationUrl;

  const navigateCreateOrganization = () => navigate(ctx.createOrganizationUrl || displayConfig.createOrganizationUrl);
  const navigateOrganizationProfile = () =>
    navigate(ctx.organizationProfileUrl || displayConfig.organizationProfileUrl);
  const navigateAfterSwitchOrganization = () =>
    ctx.afterSwitchOrganizationUrl ? navigate(ctx.afterSwitchOrganizationUrl) : Promise.resolve();

  return {
    ...ctx,
    hidePersonal: ctx.hidePersonal || false,
    organizationProfileMode: ctx.organizationProfileMode || 'modal',
    createOrganizationMode: ctx.createOrganizationMode || 'modal',
    afterCreateOrganizationUrl,
    afterLeaveOrganizationUrl,
    navigateOrganizationProfile,
    navigateCreateOrganization,
    navigateAfterSwitchOrganization,
    componentName,
  };
};

export const useOrganizationProfileContext = () => {
  const { componentName, ...ctx } = (React.useContext(ComponentContext) || {}) as OrganizationProfileCtx;
  const { navigate } = useRouter();
  const { displayConfig } = useEnvironment();

  if (componentName !== 'OrganizationProfile') {
    throw new Error('Clerk: useOrganizationProfileContext called outside OrganizationProfile.');
  }

  const navigateAfterLeaveOrganization = () =>
    navigate(ctx.afterLeaveOrganizationUrl || displayConfig.afterLeaveOrganizationUrl);

  return {
    ...ctx,
    navigateAfterLeaveOrganization,
    componentName,
  };
};

export const useCreateOrganizationContext = () => {
  const { componentName, ...ctx } = (React.useContext(ComponentContext) || {}) as CreateOrganizationCtx;
  const { navigate } = useRouter();
  const { displayConfig } = useEnvironment();

  if (componentName !== 'CreateOrganization') {
    throw new Error('Clerk: useCreateOrganizationContext called outside CreateOrganization.');
  }

  const navigateAfterCreateOrganization = () =>
    navigate(ctx.afterCreateOrganizationUrl || displayConfig.afterCreateOrganizationUrl);

  return {
    ...ctx,
    navigateAfterCreateOrganization,
    componentName,
  };
};
