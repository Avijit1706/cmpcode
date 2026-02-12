import { ProtectedAction } from '../Shared/ProtectedAction';

type Item = Record<string, string>;

function Table({ title, rows, columns }: { title: string; rows: Item[]; columns: string[] }) {
  return (
    <div className="panel">
      <h3>{title}</h3>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>{columns.map((column) => <th key={column}>{column}</th>)}</tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={`${row.name}-${index}`}>{columns.map((column) => <td key={column}>{row[column] ?? '-'}</td>)}</tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function InventoryView({
  vms,
  services,
  templates
}: {
  vms: Item[];
  services: Item[];
  templates: Item[];
}) {
  return (
    <section className="grid two-col">
      <ProtectedAction permission="vm_view" fallback={<div className="panel">VM access restricted.</div>}>
        <Table title="Virtual Machines" rows={vms} columns={['name', 'power_state', 'vendor', 'created_on']} />
      </ProtectedAction>
      <ProtectedAction permission="service_view" fallback={<div className="panel">Service access restricted.</div>}>
        <Table title="Services" rows={services} columns={['name', 'lifecycle_state', 'created_on']} />
      </ProtectedAction>
      <Table title="Templates" rows={templates} columns={['name', 'vendor', 'created_on']} />
    </section>
  );
}
