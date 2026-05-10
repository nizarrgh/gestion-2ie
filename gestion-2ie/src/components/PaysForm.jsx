import { useState, useEffect } from 'react';

export default function PaysForm({ initialData, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    libelle:     '',
    nationalite: '',
    code:        '',
    iso:         ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData({
        libelle:     initialData.libelle     || '',
        nationalite: initialData.nationalite || '',
        code:        initialData.code        || '',
        iso:         initialData.iso         || ''
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
        <label className="form-label">Libellé *</label>
        <input type="text" name="libelle" value={formData.libelle}
          onChange={handleChange} className="form-input"
          placeholder="Ex: Burkina Faso" required />
      </div>

      <div className="form-group">
        <label className="form-label">Nationalité</label>
        <input type="text" name="nationalite" value={formData.nationalite}
          onChange={handleChange} className="form-input"
          placeholder="Ex: Burkinabè" />
      </div>

      <div className="form-group">
        <label className="form-label">Code</label>
        <input type="text" name="code" value={formData.code}
          onChange={handleChange} className="form-input"
          placeholder="Ex: BF" maxLength={5} />
      </div>

      <div className="form-group">
        <label className="form-label">ISO</label>
        <input type="text" name="iso" value={formData.iso}
          onChange={handleChange} className="form-input"
          placeholder="Ex: BFA" maxLength={3} />
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