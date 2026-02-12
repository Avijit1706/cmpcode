import { useEffect, useMemo, useState } from 'react';
import { MainLayout } from './components/Layout/MainLayout';
import { DashboardView } from './components/Views/DashboardView';
import { ServiceCatalogView } from './components/Views/ServiceCatalogView';
import { InventoryView } from './components/Views/InventoryView';
import { ReportsView } from './components/Views/ReportsView';
import { UserProfileView } from './components/Views/UserProfileView';
import { appConfig } from './config';
import { useAuth } from './contexts/AuthContext';
import { getInventory, getServiceCatalogs, getServiceDialogs } from './services/manageIqService';

type Catalog = { id: number; name: string; description: string; dialogId: string };

export default function App() {
  const { token } = useAuth();
  const [activeSection, setActiveSection] = useState('dashboard');
  const [catalogs, setCatalogs] = useState<Catalog[]>([]);
  const [dialogs, setDialogs] = useState<Record<string, any[]>>({});
  const [inventory, setInventory] = useState({ vms: [], services: [], templates: [] } as any);
  const [activeCatalog, setActiveCatalog] = useState<Catalog | null>(null);

  useEffect(() => {
    Promise.all([getServiceCatalogs(token), getServiceDialogs(token), getInventory(token)]).then(
      ([catalogResponse, dialogResponse, inventoryResponse]) => {
        setCatalogs(catalogResponse);
        setDialogs(dialogResponse);
        setInventory(inventoryResponse);
      }
    );
  }, [token]);

  useEffect(() => {
    const theme = localStorage.getItem(appConfig.themeStorageKey) || 'dark';
    document.documentElement.setAttribute('data-theme', theme);
  }, []);

  const counts = useMemo(
    () => ({
      catalogs: catalogs.length,
      dialogs: Object.keys(dialogs).length,
      vms: inventory.vms.length,
      services: inventory.services.length
    }),
    [catalogs, dialogs, inventory]
  );

  const toggleTheme = () => {
    const current = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', current);
    localStorage.setItem(appConfig.themeStorageKey, current);
  };

  return (
    <MainLayout activeSection={activeSection} onSectionChange={setActiveSection} onToggleTheme={toggleTheme}>
      {activeSection === 'dashboard' ? <DashboardView counts={counts} /> : null}
      {activeSection === 'service-catalog' ? (
        <ServiceCatalogView
          catalogs={catalogs}
          dialogs={dialogs}
          activeCatalog={activeCatalog}
          onSelectCatalog={(catalog) => setActiveCatalog(catalog)}
        />
      ) : null}
      {activeSection === 'inventory' ? (
        <InventoryView vms={inventory.vms} services={inventory.services} templates={inventory.templates} />
      ) : null}
      {activeSection === 'reports' ? <ReportsView /> : null}
      {activeSection === 'user-profile' ? <UserProfileView /> : null}
    </MainLayout>
  );
}
