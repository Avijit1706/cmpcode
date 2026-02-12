const state = {
  catalogs: [
    { id: 1, name: 'RHEL App Stack', description: 'Deploy hardened RHEL app stack', dialogId: 'vm-request' },
    { id: 2, name: 'PostgreSQL HA', description: 'Provision DB with replication', dialogId: 'db-request' },
    { id: 3, name: 'Kubernetes Namespace', description: 'Namespace with quotas and baseline policies', dialogId: 'k8s-request' }
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
  vms: [
    { name: 'api-prod-01', power_state: 'on', vendor: 'VMware', created_on: '2026-01-11' },
    { name: 'web-stage-02', power_state: 'off', vendor: 'Red Hat', created_on: '2026-01-20' }
  ],
  services: [
    { name: 'payments-service', lifecycle_state: 'running', created_on: '2026-01-10' },
    { name: 'etl-batch', lifecycle_state: 'degraded', created_on: '2026-01-06' }
  ],
  templates: [{ name: 'rhel9-golden', vendor: 'Red Hat', created_on: '2025-12-01' }],
  profile: { username: 'alex.morgan', name: 'Alex Morgan', email: 'alex.morgan@example.com', role: 'Platform Engineer' }
};

const root = document.getElementById('root');

root.innerHTML = `
  <div class="app-shell">
    <aside class="sidebar" id="sidebar">
      <div class="sidebar-head">
        <div><p>OPS SUITE</p><h2>Cloud Portal</h2></div>
        <button class="btn muted mobile-only" id="closeSidebar">✕</button>
      </div>
      <nav>
        <button class="nav-item active" data-section="dashboard">dashboard</button>
        <button class="nav-item" data-section="service-catalog">service catalog</button>
        <button class="nav-item" data-section="inventory">inventory</button>
        <button class="nav-item" data-section="reports">reports</button>
        <button class="nav-item" data-section="user-profile">user profile</button>
      </nav>
    </aside>
    <main class="content">
      <header class="topbar">
        <div class="topbar-left">
          <button class="btn muted mobile-only" id="openSidebar">☰</button>
          <div><h1>Enterprise Service Portal</h1><p>Preview-ready mock portal</p></div>
        </div>
        <div class="topbar-right"><button class="btn muted" id="toggleTheme">Toggle Theme</button></div>
      </header>

      <section data-view="dashboard">
        <div class="grid metrics" id="metrics"></div>
      </section>

      <section data-view="service-catalog" style="display:none">
        <div class="stack">
          <div class="catalog-grid" id="catalogGrid"></div>
          <div class="panel" id="dialogPanel" style="display:none"></div>
        </div>
      </section>

      <section data-view="inventory" style="display:none">
        <div class="grid two-col" id="inventory"></div>
      </section>

      <section data-view="reports" style="display:none">
        <div class="panel"><h3>Reports</h3><p>Charts are available in the React build; this zero-build preview shows summary counts.</p><div id="reportSummary"></div></div>
      </section>

      <section data-view="user-profile" style="display:none">
        <div class="panel profile"><h3>User Profile</h3><div class="profile-grid" id="profile"></div></div>
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

document.getElementById('openSidebar').addEventListener('click', () => document.getElementById('sidebar').classList.add('open'));
document.getElementById('closeSidebar').addEventListener('click', () => document.getElementById('sidebar').classList.remove('open'));

document.querySelectorAll('.nav-item').forEach((btn) => {
  btn.addEventListener('click', () => {
    const section = btn.dataset.section;
    document.querySelectorAll('.nav-item').forEach((b) => b.classList.remove('active'));
    btn.classList.add('active');
    document.querySelectorAll('[data-view]').forEach((view) => {
      view.style.display = view.dataset.view === section ? 'block' : 'none';
    });
    document.getElementById('sidebar').classList.remove('open');
  });
});

document.getElementById('metrics').innerHTML = [
  ['catalogs', state.catalogs.length],
  ['dialogs', Object.keys(state.dialogs).length],
  ['vms', state.vms.length],
  ['services', state.services.length]
]
  .map(([k, v]) => `<article class="metric"><p>${k}</p><h3>${v}</h3></article>`)
  .join('');

document.getElementById('catalogGrid').innerHTML = state.catalogs
  .map(
    (catalog) => `
  <article class="catalog-card">
    <h4>${catalog.name}</h4>
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
      <h3>${catalog.name} - Service Dialog</h3>
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
  });
});

function table(title, rows, cols) {
  return `
    <div class="panel">
      <h3>${title}</h3>
      <div class="table-wrap"><table><thead><tr>${cols.map((c) => `<th>${c}</th>`).join('')}</tr></thead>
      <tbody>${rows.map((r) => `<tr>${cols.map((c) => `<td>${r[c] ?? '-'}</td>`).join('')}</tr>`).join('')}</tbody></table></div>
    </div>`;
}

document.getElementById('inventory').innerHTML = [
  table('Virtual Machines', state.vms, ['name', 'power_state', 'vendor', 'created_on']),
  table('Services', state.services, ['name', 'lifecycle_state', 'created_on']),
  table('Templates', state.templates, ['name', 'vendor', 'created_on'])
].join('');

document.getElementById('reportSummary').innerHTML = `<p>Total resources: ${state.vms.length + state.services.length + state.templates.length}</p>`;

document.getElementById('profile').innerHTML = Object.entries(state.profile)
  .map(([k, v]) => `<div><span>${k}</span><strong>${v}</strong></div>`)
  .join('');
