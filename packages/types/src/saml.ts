export type StartSamlFlowParams = {
  /**
   * Full URL or path to the route that will complete the SAML flow.
   * Typically, this will be a simple `/sso-callback` route that calls `Clerk.handleRedirectCallback`
   * or mounts the <AuthenticateWithRedirectCallback /> component.
   */
  redirectUrl: string;

  /**
   * Full URL or path to navigate after the SAML flow completes.
   */
  redirectUrlComplete: string;
};
