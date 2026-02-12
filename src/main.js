const state = {
  catalogs: [
    { id: 1, name: 'RHEL App Stack', description: 'Deploy hardened RHEL app stack', dialogId: 'vm-request', used: 32 },
    { id: 2, name: 'PostgreSQL HA', description: 'Provision DB with replication', dialogId: 'db-request', used: 21 },
    { id: 3, name: 'Kubernetes Namespace', description: 'Namespace with quotas and baseline policies', dialogId: 'k8s-request', used: 28 },
    { id: 4, name: 'Windows Build Agent', description: 'Provision build workers for enterprise CI', dialogId: 'vm-request', used: 15 }
  ],
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

  catalogIconPrefs: {
    'RHEL App Stack': '🖥️',
    'PostgreSQL HA': '🗄️',
    'Kubernetes Namespace': '☸️',
    'Windows Build Agent': '🛠️'
  },
  services: [
    {
      id: 201,
      name: 'payments-service',
      description: 'Payment orchestration and settlement microservice',
      lifecycle_state: 'provisioned',
      start_date: '2026-01-10',
      retirement_date: '2027-01-10',
      retirement_state: 'active'
    },
    {
      id: 202,
      name: 'etl-batch',
      description: 'Nightly ETL processing for finance analytics workloads',
      lifecycle_state: 'pending approval',
      start_date: '2026-02-20',
      retirement_date: '2026-05-01',
      retirement_state: 'about to retire'
    },
    {
      id: 203,
      name: 'audit-stream',
      description: 'Immutable audit event collector and retention pipeline',
      lifecycle_state: 'unprovisioned',
      start_date: '2025-01-16',
      retirement_date: '2026-01-30',
      retirement_state: 'retired'
    },
    {
      id: 204,
      name: 'sso-gateway',
      description: 'Identity federation and SSO policy enforcement gateway',
      lifecycle_state: 'provisioned',
      start_date: '2026-02-01',
      retirement_date: '2026-04-15',
      retirement_state: 'about to retire'
    }
  ],
  vmHealth: [
    { name: 'api-prod-01', type: 'VM', health: 'available', detail: 'CPU 41%, Memory 66%' },
    { name: 'etl-worker-02', type: 'VM', health: 'degraded', detail: 'High CPU contention' },
    { name: 'legacy-batch-01', type: 'VM', health: 'unavailable', detail: 'Host unreachable' }
  ],
  serviceRequests: [
    {
      request_id: 'REQ-9031',
      service_order_id: 'SO-1101',
      requester: 'alex.morgan',
      request_status: 'finished',
      request_details: 'Provision payments service for prod namespace',
      approval_pending_with: null,
      requested_on: '2026-02-10'
    },
    {
      request_id: 'REQ-9032',
      service_order_id: 'SO-1102',
      requester: 'alex.morgan',
      request_status: 'pending',
      request_details: 'Create ETL batch service for finance workloads',
      approval_pending_with: 'jane.approver',
      requested_on: '2026-02-11'
    },
    {
      request_id: 'REQ-9033',
      service_order_id: 'SO-1103',
      requester: 'alex.morgan',
      request_status: 'queued',
      request_details: 'Deploy audit stream service with retention policy',
      approval_pending_with: null,
      requested_on: '2026-02-06'
    },
    {
      request_id: 'REQ-9034',
      service_order_id: 'SO-1104',
      requester: 'alex.morgan',
      request_status: 'finished',
      request_details: 'Provision SSO gateway for edge identity',
      approval_pending_with: null,
      requested_on: '2026-02-09'
    }
  ],
  serviceOrders: [
    { id: 'SO-1101', service_id: 201, catalog_id: 1, ordered_on: '2026-02-10' },
    { id: 'SO-1102', service_id: 202, catalog_id: 2, ordered_on: '2026-02-11' },
    { id: 'SO-1103', service_id: 203, catalog_id: 3, ordered_on: '2026-02-06' },
    { id: 'SO-1104', service_id: 204, catalog_id: 4, ordered_on: '2026-02-09' }
  ],
  notifications: [
    { source: 'ServiceNow', message: 'CHG-1128 approved for payments-service patching.', timestamp: '2026-02-12T10:02:00Z' },
    { source: 'Jira ITSM', message: 'INC-20491 linked to etl-batch degradation.', timestamp: '2026-02-12T09:18:00Z' },
    { source: 'Remedy', message: 'REQ-9032 awaiting finance approver action.', timestamp: '2026-02-12T08:46:00Z' }
  ],
  supportTickets: [
    { id: 'SUP-7201', title: 'Need firewall egress rule', impacted_service: 'payments-service', status: 'In Progress', created_on: '2026-02-10' },
    { id: 'SUP-7190', title: 'Catalog order timeout', impacted_service: 'etl-batch', status: 'Resolved', created_on: '2026-02-04' }
  ],
  assets: [
    {
      asset_name: 'vm-payments-01',
      created_date: '2026-01-10',
      retirement_date: '2027-01-10',
      status: 'active',
      service_id: 201,
      ip_address: '10.20.31.14',
      flavour: 'm6i.large',
      os: 'RHEL 9.3',
      tags: 'env:prod,team:payments'
    },
    {
      asset_name: 'vm-etl-02',
      created_date: '2026-01-06',
      retirement_date: '2026-05-01',
      status: 'degraded',
      service_id: 202,
      ip_address: '10.20.44.27',
      flavour: 'm6i.xlarge',
      os: 'RHEL 8.9',
      tags: 'env:stage,team:data'
    },
    {
      asset_name: 'vm-audit-03',
      created_date: '2025-01-16',
      retirement_date: '2026-01-30',
      status: 'retired',
      service_id: 203,
      ip_address: '10.20.51.90',
      flavour: 'm5.large',
      os: 'Ubuntu 22.04',
      tags: 'env:archive,team:security'
    }
  ],
  profile: { username: 'alex.morgan', name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'Platform Engineer', isApprover: true }
};

const assetSort = { key: 'created_date', direction: 'desc' };
const root = document.getElementById('root');

root.innerHTML = `
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-head">
        <div class="brand-block">
          <div class="logo-placeholder">LOGO</div>
          <div><p>OPS SUITE</p><h2>Cloud Management Portal</h2></div>
        </div>
        <button class="btn muted mobile-only" id="closeSidebar">✕</button>
      </div>
      <nav>
        <button class="nav-item active" data-section="dashboard">dashboard</button>
        <button class="nav-item" data-section="request-status">request status</button>
        <button class="nav-item" data-section="your-services">your services</button>
        <button class="nav-item" data-section="your-assets">your assets</button>
        <button class="nav-item" data-section="marketplace">marketplace</button>
      </nav>
    </aside>
    <main class="content">
      <header class="topbar">
        <div class="topbar-left">
          <button class="btn muted mobile-only" id="openSidebar">☰</button>
          <div><h1>Cloud Management Portal</h1><p>Service lifecycle, requests, and support in one place</p></div>
        </div>
        <div class="topbar-right">
          <div class="search-wrap">
            <input id="globalSearch" type="search" placeholder="Search request id, service id, marketplace item" />
          </div>
          <button class="theme-toggle" id="toggleTheme" title="Switch day/night"><span>☀️</span><span>🌙</span></button>
          <div class="profile-chip"><strong>${state.profile.name}</strong><span>${state.profile.role}</span></div>
        </div>
      </header>

      <section data-view="dashboard" class="view-stack">
        <div class="card-strip" id="dashboardMetrics"></div>
        <div class="grid two-col">
          <div class="panel">
            <div class="panel-head"><h3>ITSM Notifications</h3></div>
            <div id="notificationPanel"></div>
          </div>
          <div class="panel">
            <div class="panel-head"><h3>Unified Search Results</h3></div>
            <div id="searchResults"><p>Start typing in the search bar to find request IDs, service IDs, or marketplace items.</p></div>
          </div>
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
        <div class="panel" id="approverPanel" style="display:none"></div>
      </section>

      <section data-view="request-status" style="display:none" class="view-stack">
        <div class="panel compact">
          <h3>Request Status Data Sources</h3>
          <p>Request table API: <strong>/api/requests</strong> · Service order API: <strong>/api/service_orders</strong> · Service table API: <strong>/api/services</strong></p>
        </div>
        <div class="panel" id="requestTablePanel"></div>
      </section>

      <section data-view="your-services" style="display:none" class="view-stack">
        <div class="panel compact">
          <h3>Service Health Data Source</h3>
          <p>Lifecycle state, start date, and retirement dates are sourced from <strong>/api/services</strong>.</p>
        </div>
        <div class="service-status-full" id="serviceHealthTables"></div>
        <div class="card-strip" id="healthMetrics"></div>
        <div class="health-tile-grid" id="healthTiles"></div>
      </section>

      <section data-view="your-assets" style="display:none" class="view-stack">
        <div class="panel compact">
          <h3>Your Assets</h3>
          <p>Assets are sorted by creation date by default. Click any column header to sort by that field.</p>
        </div>
        <div class="panel" id="assetsTablePanel"></div>
      </section>

      <section data-view="marketplace" style="display:none" class="view-stack">
        <div class="panel">
          <div class="panel-head"><h3>Marketplace</h3></div>
          <div class="catalog-grid" id="catalogGrid"></div>
        </div>
        <div class="panel marketplace-icons-panel">
          <div class="panel-head"><h3>Arrange Marketplace Icons</h3></div>
          <p>Catalog items are created in ManageIQ. Use this panel to choose which icon each catalog should use in this portal view.</p>
          <div id="iconArrangeGrid" class="icon-arrange-grid"></div>
        </div>
        <div class="panel" id="dialogPanel" style="display:none"></div>
      </section>
    </main>
  </div>
`;

function setTheme(next) {
  document.documentElement.setAttribute('data-theme', next);
  localStorage.setItem('portal-theme', next);
}

setTheme(localStorage.getItem('portal-theme') || 'dark');
document.getElementById('toggleTheme').addEventListener('click', () => {
  const cur = document.documentElement.getAttribute('data-theme');
  setTheme(cur === 'dark' ? 'light' : 'dark');
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
        <thead><tr><th>request_id</th><th>request_date</th><th>order_id</th><th>service_id</th><th>service_name</th><th>request_status</th><th>request_details</th><th>approval_pending_with</th><th>re-order</th></tr></thead>
        <tbody>
          ${rows
            .map(
              (row) => `<tr>
                <td>${row.request_id}</td>
                <td>${row.requested_on}</td>
                <td>${row.order_id}</td>
                <td>${row.service_id}</td>
                <td>${row.service_name}</td>
                <td>${row.request_status}</td>
                <td>${row.request_details}</td>
                <td>${row.approval_pending_with}</td>
                <td><button class="btn primary" data-reorder="${row.catalog}">Re-order</button></td>
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
        <thead><tr><th>request_id</th><th>order_id</th><th>service_id</th><th>service_name</th><th>service_description</th><th>lifecycle_state</th><th>start_date</th><th>retirement_date</th><th>retirement_status</th><th>actions</th></tr></thead>
        <tbody>
          ${rows
            .map(
              (row) => `<tr>
                <td>${row.request_id}</td>
                <td>${row.order_id}</td>
                <td>${row.service_id}</td>
                <td>${row.service_name}</td>
                <td>${row.service_description}</td>
                <td>${row.lifecycle_state}</td>
                <td>${row.start_date}</td>
                <td>${row.retirement_date}</td>
                <td>${serviceRetirementBadge(row.retirement_state)}</td>
                <td>
                  <button class="btn muted small" data-action="logs" data-service="${row.service_name}">Logs</button>
                  <button class="btn muted small" data-action="details" data-service="${row.service_name}">Details</button>
                </td>
              </tr>`
            )
            .join('')}
        </tbody>
      </table></div>
    </div>`;
}

function renderSearchResults(rows) {
  const input = document.getElementById('globalSearch').value.trim().toLowerCase();
  if (!input) {
    document.getElementById('searchResults').innerHTML = '<p>Start typing in the search bar to find request IDs, service IDs, or marketplace items.</p>';
    return;
  }
  const requestMatches = rows.filter((row) => row.request_id.toLowerCase().includes(input));
  const serviceMatches = rows.filter((row) => String(row.service_id).includes(input));
  const marketplaceMatches = state.catalogs.filter((catalog) => catalog.name.toLowerCase().includes(input) || String(catalog.id).includes(input));

  const markup = [
    requestMatches.length
      ? `<div><h4>Request IDs</h4><ul class="search-list">${requestMatches.map((r) => `<li>${r.request_id} · ${r.request_status} · ${r.service_name}</li>`).join('')}</ul></div>`
      : '',
    serviceMatches.length
      ? `<div><h4>Service IDs</h4><ul class="search-list">${serviceMatches.map((r) => `<li>${r.service_id} · ${r.service_name} · ${r.lifecycle_state}</li>`).join('')}</ul></div>`
      : '',
    marketplaceMatches.length
      ? `<div><h4>Marketplace Items</h4><ul class="search-list">${marketplaceMatches.map((c) => `<li>${c.id} · ${c.name}</li>`).join('')}</ul></div>`
      : ''
  ].filter(Boolean).join('');

  document.getElementById('searchResults').innerHTML = markup || '<p>No matches for your query.</p>';
}

async function updateServiceTags(serviceId, tags) {
  const service = state.services.find((item) => item.id === serviceId);
  if (service) service.tags = tags;
  return Promise.resolve({ ok: true });
}

function renderAssetsTable() {
  const sorted = [...state.assets].sort((a, b) => {
    const av = a[assetSort.key];
    const bv = b[assetSort.key];
    if (av === bv) return 0;
    const cmp = String(av).localeCompare(String(bv), undefined, { numeric: true });
    return assetSort.direction === 'asc' ? cmp : -cmp;
  });

  const columns = [
    'asset_name', 'created_date', 'retirement_date', 'status', 'service_id', 'ip_address', 'flavour', 'os', 'tags'
  ];
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
              <td>${asset.asset_name}</td>
              <td>${asset.created_date}</td>
              <td>${asset.retirement_date}</td>
              <td>${asset.status}</td>
              <td>${asset.service_id}</td>
              <td>${asset.ip_address}</td>
              <td>${asset.flavour}</td>
              <td>${asset.os}</td>
              <td>${asset.tags}</td>
              <td><button class="btn muted small" data-edit-tags="${asset.service_id}">Edit Tags</button></td>
            </tr>`
          )
          .join('')}
      </tbody>
    </table></div>`;
}

const orderedServiceStatus = renderOrderStatusRows();
const dashboardCards = [
  ['Active Services', orderedServiceStatus.filter((row) => row.retirement_state === 'active').length, 'Operational services'],
  ['Expiring Services (≤ 3 months)', orderedServiceStatus.filter((row) => row.retirement_state === 'about to retire').length, 'Needs renewal planning'],
  ['Retired Services', orderedServiceStatus.filter((row) => row.retirement_state === 'retired').length, 'Already retired'],
  ['My Support Tickets', state.supportTickets.length, 'Open and resolved tickets']
];

document.getElementById('dashboardMetrics').innerHTML = dashboardCards
  .map(([label, value, hint]) => `<article class="mini-card"><p>${label}</p><h4>${value}</h4><small>${hint}</small></article>`)
  .join('');

document.getElementById('notificationPanel').innerHTML = `<ul class="notification-list">${state.notifications
  .map((item) => `<li><strong>${item.source}</strong><small>${new Date(item.timestamp).toLocaleString()}</small><span>${item.message}</span></li>`)
  .join('')}</ul>`;

const trendingRequests = [...orderedServiceStatus]
  .filter((row) => {
    const requested = new Date(row.requested_on);
    const now = new Date('2026-02-12');
    return (now - requested) / (1000 * 60 * 60 * 24) <= 7;
  })
  .sort((a, b) => b.requested_on.localeCompare(a.requested_on));

document.getElementById('trendingRequests').innerHTML =
  trendingRequests.length === 0
    ? '<p>No trending requests in the last 7 days.</p>'
    : `<ul class="trend-list">${trendingRequests
        .map((item) => `<li><strong>${item.service_name}</strong><span>${item.requested_on}</span><small>${item.request_status} · ${item.request_details}</small></li>`)
        .join('')}</ul>`;

if (state.profile.isApprover) {
  const pendingApprovals = orderedServiceStatus.filter((row) => row.lifecycle_state === 'pending approval');
  const approverPanel = document.getElementById('approverPanel');
  approverPanel.style.display = 'block';
  approverPanel.innerHTML = `
    <div class="panel-head"><h3>Pending For Your Approval</h3></div>
    ${pendingApprovals.length ? `<ul class="approval-list">${pendingApprovals
      .map((row) => `<li><strong>${row.request_id}</strong><span>${row.service_name}</span><small>${row.request_details}</small></li>`)
      .join('')}</ul>` : '<p>No requests pending your approval.</p>'}
  `;
}

function renderTicketSummary() {
  const openCount = state.supportTickets.filter((ticket) => ticket.status !== 'Resolved').length;
  document.getElementById('ticketSummary').innerHTML = `
    <article class="mini-card"><p>Open Tickets</p><h4>${openCount}</h4><small>Needs action</small></article>
    <article class="mini-card"><p>Resolved Tickets</p><h4>${state.supportTickets.length - openCount}</h4><small>Closed successfully</small></article>
    <div class="ticket-list">${state.supportTickets
      .map((ticket) => `<div><strong>${ticket.id}</strong><span>${ticket.status}</span><small>${ticket.title} · Impacted: ${ticket.impacted_service}</small></div>`)
      .join('')}</div>
  `;
}
renderTicketSummary();

document.getElementById('ticketService').innerHTML = state.services
  .map((service) => `<option value="${service.name}">${service.id} · ${service.name}</option>`)
  .join('');

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
  .map((item) => `<article class="health-tile ${healthClass(item.health)}"><p>${item.type}</p><h4>${item.name}</h4><span>${item.health}</span><small>${item.detail}</small></article>`)
  .join('');

const iconChoices = ['🖥️', '🗄️', '☸️', '🛠️', '🔒', '📦', '⚙️', '🌐', '🧠'];

function bindCatalogOrderButtons() {
  document.querySelectorAll('[data-order]').forEach((button) => {
    button.addEventListener('click', () => {
      const id = Number(button.dataset.order);
      const catalog = state.catalogs.find((c) => c.id === id);
      const fields = state.dialogs[catalog?.dialogId] || state.dialogs['vm-request'] || [];
      const panel = document.getElementById('dialogPanel');
      panel.style.display = 'block';
      panel.innerHTML = `
        <div class="panel-head"><h3>${catalog?.name || 'Catalog'} - Service Dialog</h3></div>
        <div class="dialog-grid">
          ${fields
            .map((field) => {
              if (field.type === 'select') {
                return `<label><span>${field.label}</span><select>${field.options.map((o) => `<option>${o}</option>`).join('')}</select></label>`;
              }
              if (field.type === 'textarea') {
                return `<label><span>${field.label}</span><textarea></textarea></label>`;
              }
              return `<label><span>${field.label}</span><input type="${field.type}" /></label>`;
            })
            .join('')}
        </div>
        <div style="margin-top:.75rem"><button class="btn primary">Submit Request</button></div>
      `;
      panel.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
}

function renderIconArrangeGrid() {
  document.getElementById('iconArrangeGrid').innerHTML = state.catalogs
    .map(
      (catalog) => `<label class="icon-arrange-row"><span>${catalog.name}</span>
        <select data-icon-for="${catalog.name}">
          ${iconChoices.map((icon) => `<option value="${icon}" ${state.catalogIconPrefs[catalog.name] === icon ? 'selected' : ''}>${icon}</option>`).join('')}
        </select>
      </label>`
    )
    .join('');
}

function renderCatalogGrid() {
  document.getElementById('catalogGrid').innerHTML = state.catalogs
    .map(
      (catalog) => `
    <article class="catalog-card">
      <h4><span class="catalog-icon">${state.catalogIconPrefs[catalog.name] || '📦'}</span>${catalog.name}</h4>
      <p>${catalog.description}</p>
      <div class="catalog-footer">
        <span>Template</span>
        <button class="btn primary" data-order="${catalog.id}">Order Service</button>
      </div>
    </article>`
    )
    .join('');
  bindCatalogOrderButtons();
  renderIconArrangeGrid();
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

document.getElementById('globalSearch').addEventListener('input', () => renderSearchResults(orderedServiceStatus));
renderSearchResults(orderedServiceStatus);


document.addEventListener('change', (event) => {
  const target = event.target;
  if (target.matches('[data-icon-for]')) {
    state.catalogIconPrefs[target.dataset.iconFor] = target.value;
    renderCatalogGrid();
  }
});
