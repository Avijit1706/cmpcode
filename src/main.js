/**
 * ========================= IMPORTANT: MANAGEIQ API CONFIG =========================
 * Set your ManageIQ API base URL and endpoint paths below.
 * - baseUrl: Your ManageIQ host (example: https://miq.example.com)
 * - endpoints.*: ManageIQ REST API paths used by this portal
 * Authentication parameters are passed from login form to authenticateManageIQLocal().
 * That function sends credentials over HTTPS and stores only short-lived session token in sessionStorage.
 */
const MANAGEIQ_CONFIG = {
  baseUrl: 'https://manageiq.example.com', // <-- CHANGE THIS
  timeoutMs: 15000,
  endpoints: {
    auth: '/api/auth', // <-- CHANGE IF YOUR MIQ AUTH PATH DIFFERS
    rbacFeatures: '/api/authorization/features',
    serviceCatalogs: '/api/service_catalogs',
    serviceDialogs: '/api/service_dialogs',
    services: '/api/services',
    requests: '/api/requests',
    serviceOrders: '/api/service_orders',
    tags: '/api/tags'
  }
};

const state = {
  auth: {
    isAuthenticated: false,
    username: null,
    token: null,
    loginError: null,
    authSource: 'manageiq-local',
    permissions: new Set()
  },
  catalogs: [
    { id: 1, name: 'RHEL App Stack', description: 'Deploy hardened RHEL app stack', dialogId: 'vm-request', used: 32 },
    { id: 2, name: 'PostgreSQL HA', description: 'Provision DB with replication', dialogId: 'db-request', used: 21 },
    { id: 3, name: 'Kubernetes Namespace', description: 'Namespace with quotas and baseline policies', dialogId: 'k8s-request', used: 28 },
    { id: 4, name: 'Windows Build Agent', description: 'Provision build workers for enterprise CI', dialogId: 'vm-request', used: 15 }
  ],
  catalogIconPrefs: {
    'RHEL App Stack': '🖥️',
    'PostgreSQL HA': '🗄️',
    'Kubernetes Namespace': '☸️',
    'Windows Build Agent': '🛠️'
  },
  dialogs: {
    'vm-request': [
      { type: 'text', label: 'Application Name' },
      { type: 'select', label: 'Environment', options: ['Dev', 'Stage', 'Prod'] },
      { type: 'number', label: 'vCPU' },
      { type: 'textarea', label: 'Notes' }
    ],
    'db-request': [
      { type: 'text', label: 'DB Name' },
      { type: 'select', label: 'Engine', options: ['Postgres', 'MySQL', 'MSSQL'] }
    ],
    'k8s-request': [{ type: 'text', label: 'Namespace' }]
  },
  services: [
    { id: 201, name: 'payments-service', description: 'Payment orchestration and settlement microservice', lifecycle_state: 'provisioned', start_date: '2026-01-10', retirement_date: '2027-01-10', retirement_state: 'active' },
    { id: 202, name: 'etl-batch', description: 'Nightly ETL processing for finance analytics workloads', lifecycle_state: 'pending approval', start_date: '2026-02-20', retirement_date: '2026-05-01', retirement_state: 'about to retire' },
    { id: 203, name: 'audit-stream', description: 'Immutable audit event collector and retention pipeline', lifecycle_state: 'unprovisioned', start_date: '2025-01-16', retirement_date: '2026-01-30', retirement_state: 'retired' },
    { id: 204, name: 'sso-gateway', description: 'Identity federation and SSO policy enforcement gateway', lifecycle_state: 'provisioned', start_date: '2026-02-01', retirement_date: '2026-04-15', retirement_state: 'about to retire' }
  ],
  vmHealth: [
    { name: 'api-prod-01', type: 'VM', health: 'available', detail: 'CPU 41%, Memory 66%' },
    { name: 'etl-worker-02', type: 'VM', health: 'degraded', detail: 'High CPU contention' },
    { name: 'legacy-batch-01', type: 'VM', health: 'unavailable', detail: 'Host unreachable' }
  ],
  serviceRequests: [
    { sr: 'SR-1001', request_id: 'REQ-9031', service_order_id: 'SO-1101', requester: 'alex.morgan', request_status: 'finished', request_details: 'Provision payments service for prod namespace', approval_pending_with: null, requested_on: '2026-02-10' },
    { sr: 'SR-1002', request_id: 'REQ-9032', service_order_id: 'SO-1102', requester: 'alex.morgan', request_status: 'pending', request_details: 'Create ETL batch service for finance workloads', approval_pending_with: 'jane.approver', requested_on: '2026-02-11' },
    { sr: 'SR-1003', request_id: 'REQ-9033', service_order_id: 'SO-1103', requester: 'alex.morgan', request_status: 'queued', request_details: 'Deploy audit stream service with retention policy', approval_pending_with: null, requested_on: '2026-02-06' },
    { sr: 'SR-1004', request_id: 'REQ-9034', service_order_id: 'SO-1104', requester: 'alex.morgan', request_status: 'finished', request_details: 'Provision SSO gateway for edge identity', approval_pending_with: null, requested_on: '2026-02-09' }
  ],
  serviceOrders: [
    { id: 'SO-1101', service_id: 201, catalog_id: 1, ordered_on: '2026-02-10' },
    { id: 'SO-1102', service_id: 202, catalog_id: 2, ordered_on: '2026-02-11' },
    { id: 'SO-1103', service_id: 203, catalog_id: 3, ordered_on: '2026-02-06' },
    { id: 'SO-1104', service_id: 204, catalog_id: 4, ordered_on: '2026-02-09' }
  ],
  notifications: [
    { source: 'ServiceNow', message: 'CHG-1128 approved for payments-service patching.', timestamp: '2026-02-12T10:02:00Z' },
    { source: 'Jira Service Management', message: 'INC-20491 linked to etl-batch degradation.', timestamp: '2026-02-12T09:18:00Z' },
    { source: 'Remedy', message: 'REQ-9032 awaiting finance approver action.', timestamp: '2026-02-12T08:46:00Z' }
  ],
  supportTickets: [
    { id: 'SUP-7201', title: 'Need firewall egress rule', impacted_service: 'payments-service', status: 'In Progress', created_on: '2026-02-10' },
    { id: 'SUP-7190', title: 'Catalog order timeout', impacted_service: 'etl-batch', status: 'Resolved', created_on: '2026-02-04' }
  ],
  assets: [
    { sr: 'SR-2001', asset_name: 'vm-payments-01', created_date: '2026-01-10', retirement_date: '2027-01-10', status: 'active', service_id: 201, ip_address: '10.20.31.14', flavour: 'm6i.large', os: 'RHEL 9.3', tags: 'env:prod,team:payments' },
    { sr: 'SR-2002', asset_name: 'vm-etl-02', created_date: '2026-01-06', retirement_date: '2026-05-01', status: 'degraded', service_id: 202, ip_address: '10.20.44.27', flavour: 'm6i.xlarge', os: 'RHEL 8.9', tags: 'env:stage,team:data' },
    { sr: 'SR-2003', asset_name: 'vm-audit-03', created_date: '2025-01-16', retirement_date: '2026-01-30', status: 'retired', service_id: 203, ip_address: '10.20.51.90', flavour: 'm5.large', os: 'Ubuntu 22.04', tags: 'env:archive,team:security' }
  ],
  profile: { username: 'alex.morgan', name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'Platform Engineer', isApprover: true }
};

const root = document.getElementById('root');
const assetSort = { key: 'created_date', direction: 'desc' };

function htmlEscape(value) {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function buildApiUrl(path) {
  return `${MANAGEIQ_CONFIG.baseUrl.replace(/\/$/, '')}${path}`;
}

/**
 * Generic authenticated ManageIQ API call helper.
 * Authentication parameter passing:
 * - Local login credentials are passed to authenticateManageIQLocal(username, password)
 * - After auth, token is stored in sessionStorage and passed as Bearer token here.
 */
async function manageIqFetch(path, { method = 'GET', body, username, password, token } = {}) {
  const headers = { Accept: 'application/json', 'Content-Type': 'application/json' };
  if (token) headers.Authorization = `Bearer ${token}`;
  if (!token && username && password) headers.Authorization = `Basic ${btoa(`${username}:${password}`)}`;

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), MANAGEIQ_CONFIG.timeoutMs);
  try {
    const response = await fetch(buildApiUrl(path), {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
      signal: controller.signal,
      credentials: 'omit',
      referrerPolicy: 'no-referrer'
    });
    if (!response.ok) throw new Error(`ManageIQ API error (${response.status})`);
    const contentType = response.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) return {};
    return await response.json();
  } finally {
    clearTimeout(timeout);
  }
}

/**
 * Local authentication against ManageIQ.
 * Configure endpoint in MANAGEIQ_CONFIG.endpoints.auth.
 */
async function authenticateManageIQLocal(username, password) {
  const authPayload = await manageIqFetch(MANAGEIQ_CONFIG.endpoints.auth, {
    method: 'POST',
    body: { username, password },
    username,
    password
  });

  const token = authPayload.auth_token || authPayload.token || btoa(`${username}:${Date.now()}`);
  sessionStorage.setItem('miq-auth-token', token);
  sessionStorage.setItem('miq-auth-user', username);
  return token;
}

/**
 * RBAC feature pull from ManageIQ.
 * Configure endpoint in MANAGEIQ_CONFIG.endpoints.rbacFeatures.
 */
async function fetchManageIqRbac(token) {
  try {
    const payload = await manageIqFetch(MANAGEIQ_CONFIG.endpoints.rbacFeatures, { token });
    const featureList = payload.resources || payload.features || [];
    return new Set(featureList.map((item) => item.identifier || item.name || String(item)));
  } catch {
    return new Set();
  }
}

function hasPermission(permissionName) {
  if (!state.auth.permissions.size) return true; // permissive in demo mode if RBAC list absent
  return state.auth.permissions.has(permissionName);
}

function setTheme(next) {
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portal-theme', next);
}

function renderLoginPage() {
  root.innerHTML = `
    <div class="login-shell">
      <div class="login-hero"></div>
      <div class="login-panel">
        <p class="eyebrow">Tata Consultancy Services</p>
        <h1>SovereignSecure Cloud</h1>
        <p>Cloud Management Portal — Access TCS SSC Marketplace, Service Lifecycle, Requests and Support in one place.</p>
        <form id="loginForm" class="ticket-form">
          <label><span>Username</span><input id="loginUsername" type="text" autocomplete="username" required /></label>
          <label><span>Password</span><input id="loginPassword" type="password" autocomplete="current-password" required /></label>
          <button class="btn primary" type="submit">Sign In</button>
        </form>
        <p class="login-help"><a href="#" id="forgotPasswordLink">Forgot password?</a></p>
        <p class="login-note">Authentication source: ManageIQ local auth. Session token is stored in sessionStorage only.</p>
        <p id="loginError" class="login-error"></p>
      </div>
    </div>
  `;

  document.getElementById('forgotPasswordLink').addEventListener('click', (event) => {
    event.preventDefault();
    alert('Please use the ManageIQ password reset workflow or contact your Cloud Platform administrator.');
  });

  document.getElementById('loginForm').addEventListener('submit', async (event) => {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value.trim();
    const password = document.getElementById('loginPassword').value;
    const loginErrorEl = document.getElementById('loginError');
    loginErrorEl.textContent = '';

    try {
      const token = await authenticateManageIQLocal(username, password);
      state.auth.isAuthenticated = true;
      state.auth.username = username;
      state.auth.token = token;
      state.auth.permissions = await fetchManageIqRbac(token);
      renderAppShell();
    } catch (error) {
      state.auth.loginError = `Login failed: ${error.message}`;
      loginErrorEl.textContent = state.auth.loginError;
    }
  });
}

function serviceRetirementBadge(retirementState) {
  if (retirementState === 'active') return '<span class="status-badge active">● active</span>';
  if (retirementState === 'about to retire') return '<span class="status-badge warning">● about to retire</span>';
  return '<span class="status-badge retired">● retired</span>';
}

function healthClass(status) {
  if (status === 'available') return 'ok';
  if (status === 'degraded') return 'warn';
  return 'down';
}

function renderOrderStatusRows() {
  return state.serviceRequests.map((request) => {
    const order = state.serviceOrders.find((serviceOrder) => serviceOrder.id === request.service_order_id) || {};
    const service = state.services.find((svc) => svc.id === order.service_id) || {};
    const catalog = state.catalogs.find((item) => item.id === order.catalog_id) || {};
    const lifecycleState = service.lifecycle_state || '-';
    return {
      sr: request.sr,
      request_id: request.request_id,
      order_id: order.id || '-',
      service_id: service.id || '-',
      service_name: service.name || '-',
      service_description: service.description || '-',
      request_status: request.request_status || '-',
      lifecycle_state: lifecycleState,
      approval_pending_with: lifecycleState === 'pending approval' ? request.approval_pending_with || '-' : '-',
      request_details: request.request_details || '-',
      catalog: catalog.name || '-',
      requested_on: request.requested_on || '-',
      start_date: service.start_date || '-',
      retirement_date: service.retirement_date || '-',
      retirement_state: service.retirement_state || 'retired'
    };
  });
}

function renderRequestStatusTable(rows) {
  return `
    <div class="panel compact">
      <h3>Request Status</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>SR#</th><th>request_id</th><th>request_date</th><th>order_id</th><th>service_id</th><th>service_name</th><th>request_status</th><th>request_details</th><th>approval_pending_with</th><th>re-order</th></tr></thead>
        <tbody>
          ${rows
            .map(
              (row) => `<tr>
                <td>${htmlEscape(row.sr)}</td>
                <td>${htmlEscape(row.request_id)}</td>
                <td>${htmlEscape(row.requested_on)}</td>
                <td>${htmlEscape(row.order_id)}</td>
                <td>${htmlEscape(row.service_id)}</td>
                <td>${htmlEscape(row.service_name)}</td>
                <td>${htmlEscape(row.request_status)}</td>
                <td>${htmlEscape(row.request_details)}</td>
                <td>${htmlEscape(row.approval_pending_with)}</td>
                <td><button class="btn primary" data-reorder="${htmlEscape(row.catalog)}" ${hasPermission('service_order') ? '' : 'disabled'}>Re-order</button></td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table></div>
    </div>`;
}

function renderServiceStatusTable(rows) {
  return `
    <div class="panel compact">
      <h3>Service Status</h3>
      <div class="table-wrap"><table>
        <thead><tr><th>SR#</th><th>request_id</th><th>order_id</th><th>service_id</th><th>service_name</th><th>service_description</th><th>lifecycle_state</th><th>start_date</th><th>retirement_date</th><th>retirement_status</th><th>actions</th></tr></thead>
        <tbody>
          ${rows
            .map(
              (row) => `<tr>
                <td>${htmlEscape(row.sr)}</td>
                <td>${htmlEscape(row.request_id)}</td>
                <td>${htmlEscape(row.order_id)}</td>
                <td>${htmlEscape(row.service_id)}</td>
                <td>${htmlEscape(row.service_name)}</td>
                <td>${htmlEscape(row.service_description)}</td>
                <td>${htmlEscape(row.lifecycle_state)}</td>
                <td>${htmlEscape(row.start_date)}</td>
                <td>${htmlEscape(row.retirement_date)}</td>
                <td>${serviceRetirementBadge(row.retirement_state)}</td>
                <td>
                  <button class="btn muted small" data-action="logs" data-service="${htmlEscape(row.service_name)}">Logs</button>
                  <button class="btn muted small" data-action="details" data-service="${htmlEscape(row.service_name)}">Details</button>
                </td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table></div>
    </div>`;
}

async function updateServiceTags(serviceId, tags) {
  await manageIqFetch(MANAGEIQ_CONFIG.endpoints.tags, {
    method: 'POST',
    token: state.auth.token,
    body: { service_id: serviceId, tags }
  }).catch(() => null);
  const service = state.services.find((item) => item.id === serviceId);
  if (service) service.tags = tags;
  return { ok: true };
}

function renderAssetsTable() {
  const sorted = [...state.assets].sort((a, b) => {
    const av = a[assetSort.key];
    const bv = b[assetSort.key];
    if (av === bv) return 0;
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
    return assetSort.direction === 'asc' ? cmp : -cmp;
  });

  const columns = ['sr', 'asset_name', 'created_date', 'retirement_date', 'status', 'service_id', 'ip_address', 'flavour', 'os', 'tags'];
  const headers = columns
    .map((col) => `<th><button class="sort-btn" data-sort="${col}">${col}${assetSort.key === col ? (assetSort.direction === 'asc' ? ' ↑' : ' ↓') : ''}</button></th>`)
    .join('');

  document.getElementById('assetsTablePanel').innerHTML = `
    <div class="table-wrap"><table>
      <thead><tr>${headers}<th>actions</th></tr></thead>
      <tbody>
        ${sorted
          .map(
            (asset) => `<tr>
              <td>${htmlEscape(asset.sr)}</td>
              <td>${htmlEscape(asset.asset_name)}</td>
              <td>${htmlEscape(asset.created_date)}</td>
              <td>${htmlEscape(asset.retirement_date)}</td>
              <td>${htmlEscape(asset.status)}</td>
              <td>${htmlEscape(asset.service_id)}</td>
              <td>${htmlEscape(asset.ip_address)}</td>
              <td>${htmlEscape(asset.flavour)}</td>
              <td>${htmlEscape(asset.os)}</td>
              <td>${htmlEscape(asset.tags)}</td>
              <td><button class="btn muted small" data-edit-tags="${htmlEscape(asset.service_id)}">Edit Tags</button></td>
            </tr>`
          )
          .join('')}
      </tbody>
    </table></div>`;
}

function renderAppShell() {
  root.innerHTML = `
    <div class="app-shell">
      <aside class="sidebar" id="sidebar">
        <div class="sidebar-head">
          <div class="brand-block">
            <div class="logo-placeholder">LOGO</div>
            <div><p>Tata Consultancy Services</p><h2>SovereignSecure Cloud</h2></div>
          </div>
          <button class="btn muted mobile-only" id="closeSidebar">✕</button>
        </div>
        <nav>
          <button class="nav-item active" data-section="dashboard">dashboard</button>
          <button class="nav-item" data-section="request-status">request status</button>
          <button class="nav-item" data-section="your-services">your services</button>
          <button class="nav-item" data-section="your-assets">your assets</button>
          <button class="nav-item" data-section="marketplace">TCS SSC marketplace</button>
        </nav>
      </aside>
      <main class="content">
        <header class="topbar">
          <div class="topbar-left">
            <button class="btn muted mobile-only" id="openSidebar">☰</button>
            <div><h1>Cloud Management Portal</h1><p>Access TCS SSC Marketplace, Service Lifecycle, Requests and Support in one place</p></div>
          </div>
          <div class="topbar-right">
            <div class="search-wrap">
              <input id="globalSearch" type="search" placeholder="Search request id, service id, marketplace item" />
            </div>
            <button class="theme-toggle" id="toggleTheme" title="Switch day/night"><span>☀️</span><span>🌙</span></button>
            <button class="btn muted" id="logoutBtn">Sign Out</button>
            <div class="profile-chip"><strong>${htmlEscape(state.profile.name)}</strong><span>${htmlEscape(state.auth.username || state.profile.role)}</span></div>
          </div>
        </header>

        <section data-view="dashboard" class="view-stack">
          <div class="card-strip" id="dashboardMetrics"></div>
          <div class="panel panel-wide">
            <div class="panel-head"><h3>Notifications</h3></div>
            <div id="notificationPanel"></div>
          </div>
          <div class="grid two-col">
            <div class="panel">
              <div class="panel-head"><h3>Trending Requests (Last 7 Days)</h3></div>
              <div id="trendingRequests"></div>
            </div>
            <div class="panel">
              <div class="panel-head"><h3>Support Tickets</h3></div>
              <div id="ticketSummary" class="ticket-summary"></div>
              <form id="ticketForm" class="ticket-form">
                <label><span>Raise a ticket</span><input id="ticketTitle" type="text" placeholder="Brief issue summary" required /></label>
                <label><span>Impacted Service</span><select id="ticketService" required></select></label>
                <label><span>Description</span><textarea id="ticketDetails" placeholder="What do you need help with?" required></textarea></label>
                <button class="btn primary" type="submit">Submit Ticket</button>
              </form>
              <p class="ticketing-link"><a href="https://support.example.com" target="_blank" rel="noopener noreferrer">Open Ticketing Tool</a></p>
            </div>
          </div>
        </section>

        <section data-view="request-status" style="display:none" class="view-stack">
          <div class="panel compact">
            <h3>Request Status Data Sources</h3>
            <p>/api/requests · /api/service_orders · /api/services</p>
          </div>
          <div class="panel" id="requestTablePanel"></div>
        </section>

        <section data-view="your-services" style="display:none" class="view-stack">
          <div class="panel compact">
            <h3>Service Health Data Source</h3>
            <p>/api/services</p>
          </div>
          <div class="service-status-full" id="serviceHealthTables"></div>
          <div class="card-strip" id="healthMetrics"></div>
          <div class="health-tile-grid" id="healthTiles"></div>
        </section>

        <section data-view="your-assets" style="display:none" class="view-stack">
          <div class="panel compact">
            <h3>Your Assets</h3>
            <p>Sorted by creation date by default. Click column headers to sort by any field.</p>
          </div>
          <div class="panel" id="assetsTablePanel"></div>
        </section>

        <section data-view="marketplace" style="display:none" class="view-stack">
          <div class="panel">
            <div class="panel-head"><h3>TCS SSC Marketplace</h3></div>
            <div class="catalog-grid" id="catalogGrid"></div>
          </div>
          <div class="panel" id="dialogPanel" style="display:none"></div>
        </section>
      </main>
    </div>
  `;

  setTheme(localStorage.getItem('portal-theme') || 'dark');
  document.getElementById('toggleTheme').addEventListener('click', () => {
    const cur = document.documentElement.getAttribute('data-theme');
    setTheme(cur === 'dark' ? 'light' : 'dark');
  });

  document.getElementById('logoutBtn').addEventListener('click', () => {
    sessionStorage.removeItem('miq-auth-token');
    sessionStorage.removeItem('miq-auth-user');
    state.auth = { isAuthenticated: false, username: null, token: null, loginError: null, authSource: 'manageiq-local', permissions: new Set() };
    renderLoginPage();
  });

  const orderedServiceStatus = renderOrderStatusRows();

  const dashboardCards = [
    ['🟢', 'Active Services', orderedServiceStatus.filter((row) => row.retirement_state === 'active').length, 'Operational services'],
    ['🟡', 'Expiring Services (≤ 3 months)', orderedServiceStatus.filter((row) => row.retirement_state === 'about to retire').length, 'Needs renewal planning'],
    ['⚫', 'Retired Services', orderedServiceStatus.filter((row) => row.retirement_state === 'retired').length, 'Already retired'],
    ['🎫', 'My Support Tickets', state.supportTickets.length, 'Open and resolved tickets']
  ];

  document.getElementById('dashboardMetrics').innerHTML = dashboardCards
    .map(([icon, label, value, hint]) => `<article class="mini-card rich"><span class="mini-icon">${icon}</span><p>${label}</p><h4>${value}</h4><small>${hint}</small></article>`)
    .join('');

  document.getElementById('notificationPanel').innerHTML = `<ul class="notification-list">${state.notifications
    .map((item) => `<li><strong>${htmlEscape(item.source)}</strong><small>${new Date(item.timestamp).toLocaleString()}</small><span>${htmlEscape(item.message)}</span></li>`)
    .join('')}</ul>`;

  const trendingRequests = [...orderedServiceStatus]
    .filter((row) => {
      const requested = new Date(row.requested_on);
      const now = new Date('2026-02-12');
      return (now - requested) / (1000 * 60 * 60 * 24) <= 7;
    })
    .sort((a, b) => b.requested_on.localeCompare(a.requested_on));

  document.getElementById('trendingRequests').innerHTML = trendingRequests.length === 0
    ? '<p>No trending requests in the last 7 days.</p>'
    : `<ul class="trend-list">${trendingRequests.map((item) => `<li><strong>${htmlEscape(item.service_name)}</strong><span>${htmlEscape(item.requested_on)}</span><small>${htmlEscape(item.request_status)} · ${htmlEscape(item.request_details)}</small></li>`).join('')}</ul>`;

  function renderTicketSummary() {
    const openCount = state.supportTickets.filter((ticket) => ticket.status !== 'Resolved').length;
    document.getElementById('ticketSummary').innerHTML = `
      <article class="mini-card"><p>Open Tickets</p><h4>${openCount}</h4><small>Needs action</small></article>
      <article class="mini-card"><p>Resolved Tickets</p><h4>${state.supportTickets.length - openCount}</h4><small>Closed successfully</small></article>
      <div class="ticket-list">${state.supportTickets
        .map((ticket) => `<div><strong>${htmlEscape(ticket.id)}</strong><span>${htmlEscape(ticket.status)}</span><small>${htmlEscape(ticket.title)} · Impacted: ${htmlEscape(ticket.impacted_service)}</small></div>`)
        .join('')}</div>
    `;
  }

  renderTicketSummary();

  document.getElementById('ticketService').innerHTML = state.services.map((service) => `<option value="${htmlEscape(service.name)}">${htmlEscape(service.id)} · ${htmlEscape(service.name)}</option>`).join('');

  document.getElementById('ticketForm').addEventListener('submit', (event) => {
    event.preventDefault();
    const title = document.getElementById('ticketTitle').value.trim();
    const details = document.getElementById('ticketDetails').value.trim();
    const impactedService = document.getElementById('ticketService').value;
    if (!title || !details || !impactedService) return;
    const newId = `SUP-${7202 + state.supportTickets.length}`;
    state.supportTickets.unshift({ id: newId, title: `${title} (${details})`, impacted_service: impactedService, status: 'New', created_on: '2026-02-12' });
    renderTicketSummary();
    event.target.reset();
  });

  document.getElementById('requestTablePanel').innerHTML = renderRequestStatusTable(orderedServiceStatus);
  document.getElementById('serviceHealthTables').innerHTML = renderServiceStatusTable(orderedServiceStatus);

  document.getElementById('healthMetrics').innerHTML = [
    ['Provisioned', orderedServiceStatus.filter((row) => row.lifecycle_state === 'provisioned').length, 'Running ordered services'],
    ['Pending Approval', orderedServiceStatus.filter((row) => row.lifecycle_state === 'pending approval').length, 'Approval workflow in progress'],
    ['Unprovisioned', orderedServiceStatus.filter((row) => row.lifecycle_state === 'unprovisioned').length, 'Not yet provisioned'],
    ['About to Retire', orderedServiceStatus.filter((row) => row.retirement_state === 'about to retire').length, 'Needs renewal decision']
  ]
    .map(([label, value, hint]) => `<article class="mini-card"><p>${label}</p><h4>${value}</h4><small>${hint}</small></article>`)
    .join('');

  document.getElementById('healthTiles').innerHTML = [
    ...state.vmHealth,
    ...orderedServiceStatus.map((service) => ({
      name: service.service_name,
      type: 'Service',
      health: service.lifecycle_state === 'provisioned' ? 'available' : service.lifecycle_state === 'pending approval' ? 'degraded' : 'unavailable',
      detail: `${service.lifecycle_state} · starts ${service.start_date}`
    }))
  ]
    .map((item) => `<article class="health-tile ${healthClass(item.health)}"><p>${item.type}</p><h4>${htmlEscape(item.name)}</h4><span>${item.health}</span><small>${htmlEscape(item.detail)}</small></article>`)
    .join('');

  function bindCatalogOrderButtons() {
    document.querySelectorAll('[data-order]').forEach((button) => {
      button.addEventListener('click', () => {
        const id = Number(button.dataset.order);
        const catalog = state.catalogs.find((c) => c.id === id);
        const fields = state.dialogs[catalog?.dialogId] || state.dialogs['vm-request'] || [];
        const panel = document.getElementById('dialogPanel');
        panel.style.display = 'block';
        panel.innerHTML = `
          <div class="panel-head"><h3>${htmlEscape(catalog?.name || 'Catalog')} - Service Dialog</h3></div>
          <div class="dialog-grid">
            ${fields
              .map((field) => {
                if (field.type === 'select') return `<label><span>${htmlEscape(field.label)}</span><select>${field.options.map((o) => `<option>${htmlEscape(o)}</option>`).join('')}</select></label>`;
                if (field.type === 'textarea') return `<label><span>${htmlEscape(field.label)}</span><textarea></textarea></label>`;
                return `<label><span>${htmlEscape(field.label)}</span><input type="${htmlEscape(field.type)}" /></label>`;
              })
              .join('')}
          </div>
          <div style="margin-top:.75rem"><button class="btn primary">Submit Request</button></div>
        `;
        panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });
  }

  const catalogIcons = {
    'RHEL App Stack': '🖥️',
    'PostgreSQL HA': '🗄️',
    'Kubernetes Namespace': '☸️',
    'Windows Build Agent': '🛠️'
  };

  function renderCatalogGrid() {
    document.getElementById('catalogGrid').innerHTML = state.catalogs
      .map(
        (catalog) => `<article class="catalog-card"><h4><span class="catalog-icon">${catalogIcons[catalog.name] || '📦'}</span>${htmlEscape(catalog.name)}</h4><p>${htmlEscape(catalog.description)}</p><div class="catalog-footer"><span>Template</span><button class="btn primary" data-order="${htmlEscape(catalog.id)}" ${hasPermission('service_order') ? '' : 'disabled'}>Order Service</button></div></article>`
      )
      .join('');
    bindCatalogOrderButtons();
  }

  renderCatalogGrid();
  renderAssetsTable();

  document.addEventListener('click', async (event) => {
    const target = event.target;
    if (target.matches('[data-reorder]')) {
      const catalogName = target.dataset.reorder;
      const catalog = state.catalogs.find((item) => item.name === catalogName);
      if (!catalog) return;
      showSection('marketplace');
      document.querySelector(`[data-order="${catalog.id}"]`)?.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    if (target.matches('[data-action]')) {
      const action = target.dataset.action;
      const serviceName = target.dataset.service;
      alert(action === 'logs' ? `Opening logs for ${serviceName}` : `Opening service details for ${serviceName}`);
    }
    if (target.matches('[data-sort]')) {
      const key = target.dataset.sort;
      if (assetSort.key === key) {
        assetSort.direction = assetSort.direction === 'asc' ? 'desc' : 'asc';
      } else {
        assetSort.key = key;
        assetSort.direction = 'asc';
      }
      renderAssetsTable();
    }
    if (target.matches('[data-edit-tags]')) {
      const serviceId = Number(target.dataset.editTags);
      const asset = state.assets.find((item) => item.service_id === serviceId);
      const nextTags = prompt('Enter comma-separated tags', asset?.tags || '');
      if (nextTags === null) return;
      const response = await updateServiceTags(serviceId, nextTags);
      if (response.ok && asset) {
        asset.tags = nextTags;
        renderAssetsTable();
        alert(`Tags updated for service ${serviceId}`);
      }
    }
  });

  document.getElementById('globalSearch').addEventListener('input', () => {
    const input = document.getElementById('globalSearch').value.trim().toLowerCase();
    if (!input) return;
    const hasMatch = orderedServiceStatus.some((row) => row.request_id.toLowerCase().includes(input) || String(row.service_id).includes(input)) || state.catalogs.some((catalog) => catalog.name.toLowerCase().includes(input));
    if (!hasMatch) alert('No matching request/service/catalog found.');
  });

  function showSection(section) {
    document.querySelectorAll('.nav-item').forEach((b) => b.classList.toggle('active', b.dataset.section === section));
    document.querySelectorAll('[data-view]').forEach((view) => {
      view.style.display = view.dataset.view === section ? 'block' : 'none';
    });
    document.getElementById('sidebar').classList.remove('open');
  }

  document.getElementById('openSidebar').addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
  document.getElementById('closeSidebar').addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));
  document.querySelectorAll('.nav-item').forEach((btn) => btn.addEventListener('click', () => showSection(btn.dataset.section)));
}

function bootstrap() {
  const existingToken = sessionStorage.getItem('miq-auth-token');
  const existingUser = sessionStorage.getItem('miq-auth-user');
  if (existingToken && existingUser) {
    state.auth.isAuthenticated = true;
    state.auth.username = existingUser;
    state.auth.token = existingToken;
    renderAppShell();
  } else {
    renderLoginPage();
  }
}

setTheme(localStorage.getItem('portal-theme') || 'dark');
bootstrap();
