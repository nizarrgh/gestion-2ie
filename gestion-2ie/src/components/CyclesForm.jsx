import { useState, useEffect } from 'react';

export default function CyclesForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    libelle:      '',
    duree_annees: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        libelle:      initialData.libelle      || '',
        duree_annees: initialData.duree_annees || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ ...formData, duree_annees: parseInt(formData.duree_annees) });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Libellé *</label>
        <input type="text" name="libelle" value={formData.libelle}
          onChange={handleChange} className="form-input"
          placeholder="Ex: Licence, Master, Doctorat" required />
      </div>

      <div className="form-group">
        <label className="form-label">Durée (en années) *</label>
        <input type="number" name="duree_annees" value={formData.duree_annees}
          onChange={handleChange} className="form-input"
          min={1} max={10} required />
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