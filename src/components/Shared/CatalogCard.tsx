import { ProtectedAction } from './ProtectedAction';

type Catalog = { id: number; name: string; description: string };

export function CatalogCard({ catalog, onOrder }: { catalog: Catalog; onOrder: () => void }) {
  return (
    <article className="catalog-card">
      <h4>{catalog.name}</h4>
      <p>{catalog.description}</p>
      <div className="catalog-footer">
        <span>Template</span>
        <ProtectedAction permission="service_catalog_order" fallback={<button className="btn muted" disabled>No Access</button>}>
          <button className="btn primary" onClick={onOrder}>Order Service</button>
        </ProtectedAction>
      </div>
    </article>
  );
}
