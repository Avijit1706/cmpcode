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
  services: [
    {
      id: 201,
      name: 'payments-service',
      description: 'Payment orchestration and settlement microservice',
      lifecycle_state: 'provisioned',
      start_date: '2026-01-10',
      retirement_date: '2027-01-10',
      retirement_state: 'active',
      created_on: '2026-01-10'
    },
    {
      id: 202,
      name: 'etl-batch',
      description: 'Nightly ETL processing for finance analytics workloads',
      lifecycle_state: 'pending approval',
      start_date: '2026-02-20',
      retirement_date: '2026-05-01',
      retirement_state: 'about to retire',
      created_on: '2026-01-06'
    },
    {
      id: 203,
      name: 'audit-stream',
      description: 'Immutable audit event collector and retention pipeline',
      lifecycle_state: 'unprovisioned',
      start_date: '2025-01-16',
      retirement_date: '2026-01-30',
      retirement_state: 'retired',
      created_on: '2026-01-16'
    },
    {
      id: 204,
      name: 'sso-gateway',
      description: 'Identity federation and SSO policy enforcement gateway',
      lifecycle_state: 'provisioned',
      start_date: '2026-02-01',
      retirement_date: '2026-04-15',
      retirement_state: 'about to retire',
      created_on: '2026-02-01'
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
  supportTickets: [
    {
      id: 'SUP-7201',
      title: 'Need firewall egress rule',
      impacted_service: 'payments-service',
      status: 'In Progress',
      created_on: '2026-02-10',
      channel: 'Portal'
    },
    {
      id: 'SUP-7190',
      title: 'Catalog order timeout',
      impacted_service: 'etl-batch',
      status: 'Resolved',
      created_on: '2026-02-04',
      channel: 'Email'
    }
  ],
  profile: { username: 'alex.morgan', name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'Platform Engineer' }
};

const root = document.getElementById('root');

root.innerHTML = `
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-head">
        <div><p>OPS SUITE</p><h2>Cloud Management Portal</h2></div>
        <button class="btn muted mobile-only" id="closeSidebar">✕</button>
      </div>
      <nav>
        <button class="nav-item active" data-section="dashboard">dashboard</button>
        <button class="nav-item" data-section="request-status">request status</button>
        <button class="nav-item" data-section="your-services">your services</button>
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
          <button class="btn muted" id="toggleTheme">Toggle Theme</button>
          <div class="profile-chip"><strong>${state.profile.name}</strong><span>${state.profile.role}</span></div>
        </div>
      </header>

      <section data-view="dashboard" class="view-stack">
        <div class="card-strip" id="dashboardMetrics"></div>
        <div class="panel">
          <div class="panel-head"><h3>Unified Search Results</h3></div>
          <div id="searchResults"><p>Start typing in the search bar to find request IDs, service IDs, or marketplace items.</p></div>
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
          <p>Request table API: <strong>/api/requests</strong> · Service order API: <strong>/api/service_orders</strong> · Service table API: <strong>/api/services</strong></p>
        </div>
        <div class="panel" id="requestTablePanel"></div>
      </section>

      <section data-view="your-services" style="display:none" class="view-stack">
        <div class="panel compact">
          <h3>Service Health Data Source</h3>
          <p>Lifecycle state, start date, and retirement dates are sourced from <strong>/api/services</strong>.</p>
        </div>
        <div class="card-strip" id="healthMetrics"></div>
        <div class="health-tile-grid" id="healthTiles"></div>
        <div class="service-status-full" id="serviceHealthTables"></div>
      </section>

      <section data-view="marketplace" style="display:none" class="view-stack">
        <div class="panel"><div class="panel-head"><h3>Marketplace</h3></div><div class="catalog-grid" id="catalogGrid"></div></div>
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

function table(title, rows, cols) {
  return `
    <div class="panel compact">
      <h3>${title}</h3>
      <div class="table-wrap"><table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${cols.map((c) => `<td>${r[c] ?? '-'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    </div>`;
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
      ordered_on: order.ordered_on || '-',
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
  const serviceMatches = rows.filter((row) => String(row.service_id).toLowerCase().includes(input));
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
  ]
    .filter(Boolean)
    .join('');

  document.getElementById('searchResults').innerHTML = markup || '<p>No matches for your query.</p>';
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
        .map(
          (item) => `<li><strong>${item.service_name}</strong><span>${item.requested_on}</span><small>${item.request_status} · ${item.request_details}</small></li>`
        )
        .join('')}</ul>`;

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
  state.supportTickets.unshift({
    id: newId,
    title: `${title} (${details})`,
    impacted_service: impactedService,
    status: 'New',
    created_on: '2026-02-12',
    channel: 'Portal'
  });
  renderTicketSummary();
  event.target.reset();
});

document.getElementById('requestTablePanel').innerHTML = renderRequestStatusTable(orderedServiceStatus);

document.getElementById('healthMetrics').innerHTML = [
  ['Provisioned', orderedServiceStatus.filter((row) => row.lifecycle_state === 'provisioned').length, 'Running ordered services'],
  ['Pending Approval', orderedServiceStatus.filter((row) => row.lifecycle_state === 'pending approval').length, 'Approval workflow in progress'],
  ['Unprovisioned', orderedServiceStatus.filter((row) => row.lifecycle_state === 'unprovisioned').length, 'Not yet provisioned'],
  ['About to Retire', orderedServiceStatus.filter((row) => row.retirement_state === 'about to retire').length, 'Needs renewal decision']
]
  .map(([label, value, hint]) => `<article class="mini-card"><p>${label}</p><h4>${value}</h4><small>${hint}</small></article>`)
  .join('');

document.getElementById('serviceHealthTables').innerHTML = renderServiceStatusTable(orderedServiceStatus);

document.getElementById('healthTiles').innerHTML = [
  ...state.vmHealth,
  ...orderedServiceStatus.map((service) => ({
    name: service.service_name,
    type: 'Service',
    health: service.lifecycle_state === 'provisioned' ? 'available' : service.lifecycle_state === 'pending approval' ? 'degraded' : 'unavailable',
    detail: `${service.lifecycle_state} · starts ${service.start_date}`
  }))
]
  .map(
    (item) => `<article class="health-tile ${healthClass(item.health)}"><p>${item.type}</p><h4>${item.name}</h4><span>${item.health}</span><small>${item.detail}</small></article>`
  )
  .join('');


const catalogIcons = {
  'RHEL App Stack': '🖥️',
  'PostgreSQL HA': '🗄️',
  'Kubernetes Namespace': '☸️',
  'Windows Build Agent': '🛠️'
};

document.getElementById('catalogGrid').innerHTML = state.catalogs
  .map(
    (catalog) => `
  <article class="catalog-card">
    <h4><span class="catalog-icon">${catalogIcons[catalog.name] || "📦"}</span>${catalog.name}</h4>
    <p>${catalog.description}</p>
    <div class="catalog-footer">
      <span>Template</span>
      <button class="btn primary" data-order="${catalog.id}">Order Service</button>
    </div>
  </article>`
  )
  .join('');

document.querySelectorAll('[data-order]').forEach((button) => {
  button.addEventListener('click', () => {
    const id = Number(button.dataset.order);
    const catalog = state.catalogs.find((c) => c.id === id);
    const fields = state.dialogs[catalog.dialogId] || [];
    const panel = document.getElementById('dialogPanel');
    panel.style.display = 'block';
    panel.innerHTML = `
      <div class="panel-head"><h3>${catalog.name} - Service Dialog</h3></div>
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

document.addEventListener('click', (event) => {
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
    const message = action === 'logs' ? `Opening logs for ${serviceName}` : `Opening service details for ${serviceName}`;
    alert(message);
  }
});

document.getElementById('globalSearch').addEventListener('input', () => renderSearchResults(orderedServiceStatus));
renderSearchResults(orderedServiceStatus);
