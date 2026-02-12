type Field = {
  type: 'text' | 'number' | 'boolean' | 'dropdown' | 'textarea';
  name: string;
  label: string;
  required?: boolean;
  values?: string[];
};

export function DialogForm({ fields, title }: { fields: Field[]; title: string }) {
  return (
    <form className="dialog-form" onSubmit={(e) => e.preventDefault()}>
      <h4>{title}</h4>
      <div className="dialog-grid">
        {fields.map((field) => (
          <label key={field.name}>
            <span>{field.label}</span>
            {field.type === 'dropdown' ? (
              <select>
                {field.values?.map((value) => (
                  <option key={value}>{value}</option>
                ))}
              </select>
            ) : field.type === 'textarea' ? (
              <textarea required={field.required} />
            ) : field.type === 'boolean' ? (
              <select>
                <option>True</option>
                <option>False</option>
              </select>
            ) : (
              <input type={field.type} required={field.required} />
            )}
          </label>
        ))}
      </div>
      <button className="btn primary" type="submit">Submit Request</button>
    </form>
  );
}
