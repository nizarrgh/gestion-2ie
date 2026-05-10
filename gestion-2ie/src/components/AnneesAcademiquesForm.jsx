import { useState, useEffect } from 'react';

export default function AnneesAcademiquesForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    libelle:    '',
    date_debut: '',
    date_fin:   '',
    est_active: false
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        libelle:    initialData.libelle    || '',
        date_debut: initialData.date_debut ? initialData.date_debut.split('T')[0] : '',
        date_fin:   initialData.date_fin   ? initialData.date_fin.split('T')[0]   : '',
        est_active: initialData.est_active || false
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Libellé *</label>
        <input type="text" name="libelle" value={formData.libelle}
          onChange={handleChange} className="form-input"
          placeholder="Ex: 2024-2025" required />
      </div>

      <div className="form-group">
        <label className="form-label">Date de début *</label>
        <input type="date" name="date_debut" value={formData.date_debut}
          onChange={handleChange} className="form-input" required />
      </div>

      <div className="form-group">
        <label className="form-label">Date de fin *</label>
        <input type="date" name="date_fin" value={formData.date_fin}
          onChange={handleChange} className="form-input" required />
      </div>

      <div className="form-group">
        <label className="flex items-center gap-2 cursor-pointer">
          <input type="checkbox" name="est_active"
            checked={formData.est_active} onChange={handleChange}
            className="w-4 h-4 rounded border-gray-300" />
          <span className="text-sm text-gray-700">Année académique active</span>
        </label>
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <button type="button" onClick={onCancel} className="btn btn-secondary">Annuler</button>
        <button type="submit" disabled={loading} className="btn btn-primary flex items-center gap-2">
          {loading && <span className="spinner" />}
          {initialData ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}