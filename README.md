# ManageIQ Portal (React + TypeScript, Mock Mode)

A sleek enterprise portal with a Linear/Vercel-inspired visual style (deep blues, crisp cards, smooth transitions), dark/light themes, and all major operational sections.

## Key UX updates

- Service Dialog is now embedded into **Service Catalog templates** (not a separate nav section).
- Neutral gray interstitial styling has been removed in favor of cleaner blue-toned surfaces.
- Responsive sidebar + polished cards/tables/charts.

## Project Structure

```text
src/
├── components/
│   ├── Auth/           # Authentication components
│   ├── Layout/         # Sidebar + MainLayout
│   ├── Shared/         # Reusable components (CatalogCard, DialogForm, ProtectedAction)
│   └── Views/          # Dashboard, ServiceCatalog, Inventory, Reports, UserProfile
├── contexts/           # React contexts (AuthContext)
├── hooks/              # Custom hooks (usePermissions)
├── services/           # API service abstractions (Keycloak, ManageIQ)
└── config.ts           # App configuration
```

## Security Features (implementation-ready pattern)

- Bearer token propagation pattern in service layer.
- Automatic token refresh lifecycle in `AuthContext`.
- RBAC-aware UI control through `ProtectedAction` + `usePermissions`.
- Token persistence in `localStorage` with cleanup on logout.

> This repository currently runs in **mock mode** for demo quality and UI iteration.

## Components

### Service Catalog
- Catalog templates shown as reusable cards.
- “Order Service” triggers template dialog workflow.
- Dialog rendering is contextually shown under selected catalog.

### Dynamic Dialogs
- Auto-renders based on dialog field metadata.
- Supports: text, number, boolean, dropdown, textarea.

### Inventory
- VMs, Services, Templates with table views.
- Permission-based visibility for VM/Service panels.

### Reports
- VM power state and service distribution charts.
- Export action placeholders (CSV/PDF buttons).

### User Profile
- User identity + permission display from auth context.

## RBAC usage example

```tsx
import { ProtectedAction } from './components/Shared/ProtectedAction';

<ProtectedAction permission="vm_create">
  <button>Create VM</button>
</ProtectedAction>
```

## API integration targets

- `/api/service_catalogs`
- `/api/service_templates`
- `/api/service_dialogs`
- `/api/vms`
- `/api/services`
- `/api/templates`
- `/api/authorization/features`

## Run locally

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Deployment (detailed)

### Option 1: NGINX

1. Build static bundle:

```bash
npm install
npm run build
```

2. Copy `dist/` to server path:

```bash
sudo mkdir -p /var/www/manageiq-portal
sudo cp -r dist/* /var/www/manageiq-portal/
```

3. Configure NGINX:

```nginx
server {
  listen 80;
  server_name portal.example.com;

  root /var/www/manageiq-portal;
  index index.html;

  location / {
    try_files $uri $uri/ /index.html;
  }

  add_header X-Content-Type-Options "nosniff" always;
  add_header X-Frame-Options "SAMEORIGIN" always;
  add_header Referrer-Policy "strict-origin-when-cross-origin" always;
}
```

4. Enable and reload:

```bash
sudo nginx -t
sudo systemctl reload nginx
```

5. Add TLS with certbot (recommended).

### Option 2: Docker

```Dockerfile
FROM nginx:stable-alpine
COPY dist /usr/share/nginx/html
```

```bash
npm install
npm run build
docker build -t manageiq-portal:latest .
docker run -d -p 8080:80 --name manageiq-portal manageiq-portal:latest
```

### Option 3: CDN/Object Storage

1. Upload `dist/` files to bucket.
2. Enable static hosting.
3. Put CDN in front.
4. Configure custom domain and HTTPS.
5. Cache static assets aggressively; keep `index.html` short-lived.

## Theme customization

Update colors in `src/styles.css` (blue-forward palette by default).
