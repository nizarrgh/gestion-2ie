import { useState, useEffect } from 'react';
import { specialitesAPI, cyclesAPI, niveauxAPI } from '../api/api.js';

export default function ParcoursForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    libelle:        '',
    specialites_id: '',
    niveaux_id:     '',
    cycles_id:      ''
  });
  const [specialites, setSpecialites] = useState([]);
  const [cycles, setCycles]           = useState([]);
  const [niveaux, setNiveaux]         = useState([]);

  useEffect(() => {
    specialitesAPI.getAll().then(res => setSpecialites(res.data || []));
    cyclesAPI.getAll().then(res => setCycles(res.data || []));
    niveauxAPI.getAll().then(res => setNiveaux(res.data || []));
  }, []);

  useEffect(() => {
    if (initialData) {
      setFormData({
        libelle:        initialData.libelle        || '',
        specialites_id: initialData.specialites_id || '',
        niveaux_id:     initialData.niveaux_id     || '',
        cycles_id:      initialData.cycles_id      || ''
      });
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.specialites_id) { alert('Veuillez sélectionner une spécialité'); return; }
    if (!formData.cycles_id)      { alert('Veuillez sélectionner un cycle');       return; }
    onSubmit({
      libelle:        formData.libelle,
      specialites_id: parseInt(formData.specialites_id),
      niveaux_id:     parseInt(formData.niveaux_id) || null,
      cycles_id:      parseInt(formData.cycles_id),
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label className="form-label">Libellé *</label>
        <input type="text" name="libelle" value={formData.libelle}
          onChange={handleChange} className="form-input"
          placeholder="Ex: Licence Informatique" required />
      </div>

      <div className="form-group">
        <label className="form-label">Spécialité *</label>
        <select name="specialites_id" value={formData.specialites_id}
          onChange={handleChange} className="form-select" required>
          <option value="">-- Sélectionner une spécialité --</option>
          {specialites.length === 0
            ? <option disabled>Aucune spécialité disponible</option>
            : specialites.map(s => (
              <option key={s.id} value={s.id}>{s.libelle}</option>
            ))
          }
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Niveau</label>
        <select name="niveaux_id" value={formData.niveaux_id}
          onChange={handleChange} className="form-select">
          <option value="">-- Sélectionner un niveau --</option>
          {niveaux.length === 0
            ? <option disabled>Aucun niveau disponible</option>
            : niveaux.map(n => (
              <option key={n.id} value={n.id}>{n.libelle}</option>
            ))
          }
        </select>
      </div>

      <div className="form-group">
        <label className="form-label">Cycle *</label>
        <select name="cycles_id" value={formData.cycles_id}
          onChange={handleChange} className="form-select" required>
          <option value="">-- Sélectionner un cycle --</option>
          {cycles.length === 0
            ? <option disabled>Aucun cycle disponible</option>
            : cycles.map(c => (
              <option key={c.id} value={c.id}>{c.libelle}</option>
            ))
          }
        </select>
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