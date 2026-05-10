import { useState, useEffect } from 'react';

export default function FilieresForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    code:        '',
    libelle:     '',
    description: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        code:        initialData.code        || '',
        libelle:     initialData.libelle     || '',
        description: initialData.description || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Code *</label>
        <input type="text" name="code" value={formData.code}
          onChange={handleChange} className="form-input"
          placeholder="Ex: INFO" required />
      </div>

      <div className="form-group">
        <label className="form-label">Libellé *</label>
        <input type="text" name="libelle" value={formData.libelle}
          onChange={handleChange} className="form-input"
          placeholder="Ex: Informatique" required />
      </div>

      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea name="description" value={formData.description}
          onChange={handleChange} className="form-input" rows={3}
          placeholder="Description optionnelle" />
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Annuler
        </button>
        <button type="submit" disabled={loading} className="btn btn-primary flex items-center gap-2">
          {loading && <span className="spinner" />}
          {initialData ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}