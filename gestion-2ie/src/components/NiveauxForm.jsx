import { useState, useEffect } from 'react';

export default function NiveauxForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    libelle: '',
    ordre:   ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        libelle: initialData.libelle || '',
        ordre:   initialData.ordre   || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, ordre: parseInt(formData.ordre) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Libellé *</label>
        <input type="text" name="libelle" value={formData.libelle}
          onChange={handleChange} className="form-input"
          placeholder="Ex: Licence 1, Master 2" required />
      </div>

      <div className="form-group">
        <label className="form-label">Ordre *</label>
        <input type="number" name="ordre" value={formData.ordre}
          onChange={handleChange} className="form-input" min={1} required />
        <p className="text-xs text-gray-500 mt-1">
          L&apos;ordre détermine la position du niveau (1 pour L1, 2 pour L2, etc.)
        </p>
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