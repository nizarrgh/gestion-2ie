// EcolesForm.jsx — remplacez entièrement
import { useState, useEffect } from 'react';

export default function EcolesForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    libelle: '',
    adresse: '',
    telephone: '',
    email: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        libelle:   initialData.libelle   || '',
        adresse:   initialData.adresse   || '',
        telephone: initialData.telephone || '',
        email:     initialData.email     || ''
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
        <label className="form-label">Nom de l&apos;école *</label>
        <input
          type="text"
          name="libelle"
          value={formData.libelle}
          onChange={handleChange}
          className="form-input"
          required
        />
      </div>

      <div className="form-group">
        <label className="form-label">Adresse</label>
        <input
          type="text"
          name="adresse"
          value={formData.adresse}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Téléphone</label>
        <input
          type="text"
          name="telephone"
          value={formData.telephone}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="form-group">
        <label className="form-label">Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="form-input"
        />
      </div>

      <div className="flex gap-3 justify-end mt-6">
        <button type="button" onClick={onCancel} className="btn btn-secondary">
          Annuler
        </button>
        <button type="submit" disabled={loading} className="btn btn-primary">
          {loading && <span className="spinner" />}
          {initialData ? 'Modifier' : 'Créer'}
        </button>
      </div>
    </form>
  );
}