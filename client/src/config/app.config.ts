export const appConfig = {
  apiEndpoints: import.meta.env.VITE_API_ENPOINTS || '',
  graphqlApiEndpoints: import.meta.env.VITE_GRAPHQL_ENDPOINTS || '',
  signupLinkRedirection: import.meta.env.VITE_SIGNUP_LINK_REDIRECTION || '',
  forgotPasswordLinkRedirection:
    import.meta.env.VITE_FORGOT_PASSWORD_LINK_REDIRECTION || '',
};
