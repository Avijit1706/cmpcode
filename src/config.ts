export const appConfig = {
  themeStorageKey: 'portal-theme',
  tokenStorageKey: 'portal-token',
  refreshEveryMs: 25_000,
  mockMode: true,
  keycloak: {
    realm: 'demo',
    clientId: 'portal-ui'
  }
};
