export const isAllowedRedirect = (url: string, allowedRedirectOrigins: string[]) => {
  //TODO: replace with proper checks
  return !url.includes('__clerk_not_allowed__');
};
