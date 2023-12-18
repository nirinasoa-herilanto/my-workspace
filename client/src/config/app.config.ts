export const appConfig = {
  apiEndpoints: import.meta.env.VITE_API_ENPOINTS || '',
  graphqlApiEndpoints: import.meta.env.VITE_GRAPHQL_ENDPOINTS || '',
  firebaseLinkRedirection: import.meta.env.VITE_FIREBASE_LINK_REDIRECTION || '',
};
