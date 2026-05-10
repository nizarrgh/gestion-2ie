import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { etudiantsAPI, paysAPI } from '../../api/api.js';
import toast from 'react-hot-toast';
import { ArrowLeft, Save } from 'lucide-react';

export default function AjouterEtudiants() {
  const navigate = useNavigate();
  const { id } = useParams();
  const isEdit = !!id;

  const [loading, setLoading] = useState(false);
  const [pays, setPays] = useState([]);
  const [formData, setFormData] = useState({
    nom:           '',
    prenoms:       '',
    dateNaissance: '',
    pays_id:       '',
    email:         '',
    telephone:     ''
  });

  useEffect(() => {
    paysAPI.getAll().then(res => setPays(res.data || []));

    if (isEdit) {
      etudiantsAPI.getById(id).then(res => {
        const data = res.data;
        setFormData({
          nom:           data.nom           || '',
          prenoms:       data.prenoms       || '',
          dateNaissance: data.dateNaissance
                           ? data.dateNaissance.split('T')[0] : '',
          pays_id:       data.pays_id       || '',
          email:         data.email         || '',
          telephone:     data.telephone     || ''
        });
      }).catch(() => {
        toast.error('Étudiant non trouvé');
        navigate('/etudiants');
      });
    }
  }, [id, isEdit, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const data = {
        ...formData,
        pays_id: formData.pays_id ? parseInt(formData.pays_id) : null
      };
      if (isEdit) {
        await etudiantsAPI.update(id, data);
        toast.success('Étudiant modifié avec succès');
      } else {
        await etudiantsAPI.create(data);
        toast.success('Étudiant créé avec succès');
      }
      navigate('/etudiants');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Une erreur est survenue');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => navigate('/etudiants')}
          className="p-2 text-gray-500 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-gray-900">
          {isEdit ? "Modifier l'étudiant" : 'Nouvel étudiant'}
        </h1>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            <div className="form-group">
              <label className="form-label">Nom *</label>
              <input type="text" name="nom" value={formData.nom}
                onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Prénoms *</label>
              <input type="text" name="prenoms" value={formData.prenoms}
                onChange={handleChange} className="form-input" required />
            </div>

            <div className="form-group">
              <label className="form-label">Date de naissance</label>
              <input type="date" name="dateNaissance" value={formData.dateNaissance}
                onChange={handleChange} className="form-input" />
            </div>

            <div className="form-group">
              <label className="form-label">Pays</label>
              <select name="pays_id" value={formData.pays_id}
                onChange={handleChange} className="form-select">
                <option value="">-- Sélectionner un pays --</option>
                {pays.map(p => (
                  <option key={p.id} value={p.id}>{p.libelle}</option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Email</label>
              <input type="email" name="email" value={formData.email}
                onChange={handleChange} className="form-input"
                placeholder="etudiant@example.com" />
            </div>

            <div className="form-group md:col-span-1">
              <label className="form-label">Téléphone</label>
              <input type="tel" name="telephone" value={formData.telephone}
                onChange={handleChange} className="form-input"
                placeholder="+226 XX XX XX XX" />
            </div>

          </div>

          <div className="flex gap-3 justify-end mt-8 pt-6 border-t border-gray-200">
            <button type="button" onClick={() => navigate('/etudiants')}
              className="btn btn-secondary">
              Annuler
            </button>
            <button type="submit" disabled={loading}
              className="btn btn-primary flex items-center gap-2">
              {loading ? (
                <><span className="spinner" /> Enregistrement...</>
              ) : (
                <><Save className="w-5 h-5" /> {isEdit ? 'Modifier' : 'Créer'}</>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}