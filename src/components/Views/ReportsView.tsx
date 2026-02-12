import { Bar, BarChart, CartesianGrid, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export function ReportsView() {
  const vmState = [
    { name: 'on', value: 7 },
    { name: 'off', value: 2 },
    { name: 'suspended', value: 1 }
  ];
  const svcState = [
    { name: 'running', value: 8 },
    { name: 'degraded', value: 1 },
    { name: 'stopped', value: 2 }
  ];

  return (
    <section className="grid two-col">
      <div className="panel chart-panel">
        <h3>VM Power Analytics</h3>
        <ResponsiveContainer width="100%" height={260}>
          <PieChart>
            <Pie data={vmState} dataKey="value" nameKey="name" outerRadius={90} fill="#3b82f6" />
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="panel chart-panel">
        <h3>Service Distribution</h3>
        <ResponsiveContainer width="100%" height={260}>
          <BarChart data={svcState}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#1d4ed8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="panel">
        <h3>Exports</h3>
        <p>Export actions are UI-ready for CSV/PDF wiring.</p>
        <div className="row">
          <button className="btn muted">Export CSV</button>
          <button className="btn muted">Export PDF</button>
        </div>
      </div>
    </section>
  );
}
