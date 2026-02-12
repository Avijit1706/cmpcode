import { CatalogCard } from '../Shared/CatalogCard';
import { DialogForm } from '../Shared/DialogForm';

type Catalog = { id: number; name: string; description: string; dialogId: string };
type Dialogs = Record<string, { type: 'text' | 'number' | 'boolean' | 'dropdown' | 'textarea'; name: string; label: string; required?: boolean; values?: string[] }[]>;

export function ServiceCatalogView({
  catalogs,
  dialogs,
  activeCatalog,
  onSelectCatalog
}: {
  catalogs: Catalog[];
  dialogs: Dialogs;
  activeCatalog: Catalog | null;
  onSelectCatalog: (catalog: Catalog) => void;
}) {
  return (
    <section className="stack">
      <div className="catalog-grid">
        {catalogs.map((catalog) => (
          <CatalogCard key={catalog.id} catalog={catalog} onOrder={() => onSelectCatalog(catalog)} />
        ))}
      </div>
      {activeCatalog ? (
        <div className="panel">
          <DialogForm
            title={`${activeCatalog.name} - Service Dialog`}
            fields={dialogs[activeCatalog.dialogId] ?? []}
          />
        </div>
      ) : null}
    </section>
  );
}
