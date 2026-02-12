const wait = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

function withAuthHeaders(token: string | null) {
  return {
    Authorization: token ? `Bearer ${token}` : '',
    'Content-Type': 'application/json'
  };
}

export async function getServiceCatalogs(token: string | null) {
  await wait(150);
  withAuthHeaders(token);
  return [
    { id: 1, name: 'RHEL App Stack', description: 'Deploy hardened RHEL app stack', dialogId: 'vm-request' },
    { id: 2, name: 'PostgreSQL HA', description: 'Provision DB with replication', dialogId: 'db-request' },
    { id: 3, name: 'Kubernetes Namespace', description: 'Namespace with quotas & baseline policies', dialogId: 'k8s-request' }
  ];
}

export async function getServiceDialogs(token: string | null) {
  await wait(150);
  withAuthHeaders(token);
  return {
    'vm-request': [
      { type: 'text', name: 'appName', label: 'Application Name', required: true },
      { type: 'dropdown', name: 'environment', label: 'Environment', values: ['Dev', 'Stage', 'Prod'] },
      { type: 'number', name: 'cpu', label: 'vCPU' },
      { type: 'boolean', name: 'backup', label: 'Enable Backups' },
      { type: 'textarea', name: 'notes', label: 'Notes' }
    ],
    'db-request': [
      { type: 'text', name: 'dbName', label: 'DB Name', required: true },
      { type: 'dropdown', name: 'engine', label: 'Engine', values: ['Postgres', 'MySQL', 'MSSQL'] }
    ],
    'k8s-request': [{ type: 'text', name: 'namespace', label: 'Namespace', required: true }]
  };
}

export async function getInventory(token: string | null) {
  await wait(120);
  withAuthHeaders(token);
  return {
    vms: [
      { name: 'api-prod-01', power_state: 'on', vendor: 'VMware', created_on: '2026-01-11' },
      { name: 'web-stage-02', power_state: 'off', vendor: 'Red Hat', created_on: '2026-01-20' }
    ],
    services: [
      { name: 'payments-service', lifecycle_state: 'running', created_on: '2026-01-10' },
      { name: 'etl-batch', lifecycle_state: 'degraded', created_on: '2026-01-06' }
    ],
    templates: [{ name: 'rhel9-golden', vendor: 'Red Hat', created_on: '2025-12-01' }]
  };
}
