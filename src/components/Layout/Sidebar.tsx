const sections = ['dashboard', 'service-catalog', 'inventory', 'reports', 'user-profile'] as const;

export function Sidebar({
  active,
  onSelect,
  open,
  onClose
}: {
  active: string;
  onSelect: (section: string) => void;
  open: boolean;
  onClose: () => void;
}) {
  return (
    <aside className={`sidebar ${open ? 'open' : ''}`}>
      <div className="sidebar-head">
        <div>
          <p>OPS SUITE</p>
          <h2>Cloud Portal</h2>
        </div>
        <button className="btn muted mobile-only" onClick={onClose}>✕</button>
      </div>
      <nav>
        {sections.map((section) => (
          <button
            key={section}
            className={`nav-item ${active === section ? 'active' : ''}`}
            onClick={() => {
              onSelect(section);
              onClose();
            }}
          >
            {section.replace('-', ' ')}
          </button>
        ))}
      </nav>
    </aside>
  );
}
