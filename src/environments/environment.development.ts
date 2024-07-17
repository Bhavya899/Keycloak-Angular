export const environment = {
    keycloak: {
        authority: 'http://localhost:9999',
        redirectUri: 'http://localhost:4200',
        postLogoutRedirectUri: 'http://localhost:4200/logout',
        realm: 'Login',
        clientId: 'Bhavya',
      },
};
