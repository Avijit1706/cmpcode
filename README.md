# Tata Consultancy Services — SovereignSecure Cloud
## Cloud Management Portal (TCS SSC Marketplace)

This portal is a static HTML/CSS/JS front-end that can run immediately in mock mode, and can be switched to real ManageIQ APIs by updating one configuration block.

## 1) Exactly where to configure ManageIQ endpoints and auth

Update **`src/main.js`** in the `MANAGEIQ_CONFIG` object:

- `baseUrl`: your ManageIQ host URL (must be HTTPS)
- `endpoints.auth`: auth endpoint used by login
- `endpoints.rbacFeatures`: RBAC endpoint
- `endpoints.serviceCatalogs`
- `endpoints.serviceDialogs`
- `endpoints.services`
- `endpoints.requests`
- `endpoints.serviceOrders`
- `endpoints.tags`

```js
const MANAGEIQ_CONFIG = {
  baseUrl: 'https://manageiq.example.com',
  timeoutMs: 15000,
  endpoints: {
    auth: '/api/auth',
    rbacFeatures: '/api/authorization/features',
    serviceCatalogs: '/api/service_catalogs',
    serviceDialogs: '/api/service_dialogs',
    services: '/api/services',
    requests: '/api/requests',
    serviceOrders: '/api/service_orders',
    tags: '/api/tags'
  }
};
```

## 2) How authentication parameters are passed

Login form values (`username`, `password`) are sent from `renderLoginPage()` to `authenticateManageIQLocal(username, password)`.

Authentication call behavior:
- `manageIqFetch(...)` adds `Authorization: Basic <base64(username:password)>` **only for auth call** when token is not yet available.
- On successful auth, returned `auth_token` / `token` is stored in `sessionStorage`.
- All subsequent API calls use `Authorization: Bearer <token>`.

## 3) Security controls added

Implemented in `src/main.js`:
- HTTPS enforcement for ManageIQ base URL (`SECURITY_CONFIG.requireHttps`).
- Session TTL (`sessionTtlMs`, default 30 minutes).
- Session expiry check during bootstrap.
- Strict token requirement (no insecure fallback token generation).
- Request hardening in `fetch`:
  - timeout + abort
  - `cache: 'no-store'`
  - `redirect: 'error'`
  - `mode: 'cors'`
  - `referrerPolicy: 'no-referrer'`
- Centralized session cleanup helper (`clearAuthSession`).

## 4) Runtime notes for production

- Serve only over HTTPS.
- Do not log tokens in browser console.
- Keep token lifetime short and rotate on the backend.
- Restrict CORS on ManageIQ to the portal origin.
- Prefer HttpOnly secure cookies server-side when available in your architecture.
- Keep CSP and security headers at reverse proxy (NGINX/Ingress).

## 5) Local run

```bash
python3 -m http.server 8080
```

Open `http://localhost:8080`.

## 6) Standalone preview

`preview-full.html` is a single-file preview copy of the current UI.
