import { useState } from 'react';
import { Sidebar } from './Sidebar';
import { AuthPanel } from '../Auth/AuthPanel';

export function MainLayout({
  activeSection,
  onSectionChange,
  children,
  onToggleTheme
}: {
  activeSection: string;
  onSectionChange: (section: string) => void;
  children: React.ReactNode;
  onToggleTheme: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="app-shell">
      <Sidebar active={activeSection} onSelect={onSectionChange} open={open} onClose={() => setOpen(false)} />
      <main className="content">
        <header className="topbar">
          <div className="topbar-left">
            <button className="btn muted mobile-only" onClick={() => setOpen(true)}>☰</button>
            <div>
              <h1>Enterprise Service Portal</h1>
              <p>Clean, sleek, and production-minded</p>
            </div>
          </div>
          <div className="topbar-right">
            <button className="btn muted" onClick={onToggleTheme}>Toggle Theme</button>
            <AuthPanel />
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
