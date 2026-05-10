import { useState, useEffect } from 'react';
import { filieresAPI } from '../api/api.js';

export default function SpecialitesForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    libelle:     '',
    filieres_id: '',
    description: ''
  });
  const [filieres, setFilieres] = useState([]);

  useEffect(() => {
    filieresAPI.getAll()
      .then(res => setFilieres(Array.isArray(res.data) ? res.data : []));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        libelle:     initialData.libelle     || '',
        filieres_id: initialData.filieres_id || '',
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
    onSubmit({ ...formData, filieres_id: parseInt(formData.filieres_id) || null });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Libellé *</label>
        <input type="text" name="libelle" value={formData.libelle}
          onChange={handleChange} className="form-input"
          placeholder="Ex: Génie Logiciel" required />
      </div>

      <div className="form-group">
        <label className="form-label">Filière *</label>
        <select name="filieres_id" value={formData.filieres_id}
          onChange={handleChange} className="form-select" required>
          <option value="">Sélectionner une filière</option>
          {filieres.map(f => (
            <option key={f.id} value={f.id}>{f.libelle}</option>
          ))}
        </select>
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