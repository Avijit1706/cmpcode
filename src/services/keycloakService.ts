export async function initializeKeycloak() {
  return Promise.resolve({ initialized: true, mode: 'mock' });
}
