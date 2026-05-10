
import { useState, useEffect } from 'react';
import { Plus, Pencil, Trash2, Search } from 'lucide-react';
import toast from 'react-hot-toast';
import Modal from '../ui/Modal';
import ConfirmDialog from '../ui/ConfirmDialog';
import LoadingSpinner from '../ui/LoadingSpinner';
import EmptyState from '../ui/EmptyState';

export default function ResourcePage({
  title,
  api,
  columns,
  FormComponent,
  searchPlaceholder = 'Rechercher...'
}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [submitting, setSubmitting] = useState(false);

  // Chargement des données
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await api.getAll({ search });
      const result = response.data;
     setData(Array.isArray(result) ? result : result.data || []);
    } catch (error) {
      toast.error('Erreur lors du chargement des données');
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [search]);

  // Création/Modification
  const handleSubmit = async (formData) => {
    try {
      setSubmitting(true);
      if (editItem) {
        await api.update(editItem.id, formData);
        toast.success('Élément modifié avec succès');
      } else {
        await api.create(formData);
        toast.success('Élément créé avec succès');
      }
      setModalOpen(false);
      setEditItem(null);
      fetchData();
    } catch (error) {
      const message = error.response?.data?.message || 'Une erreur est survenue';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  // Suppression
  const handleDelete = async () => {
    try {
      setSubmitting(true);
      await api.delete(deleteItem.id);
      toast.success('Élément supprimé avec succès');
      setDeleteItem(null);
      fetchData();
    } catch (error) {
      const message = error.response?.data?.message || 'Impossible de supprimer cet élément';
      toast.error(message);
    } finally {
      setSubmitting(false);
    }
  };

  const openCreateModal = () => {
    setEditItem(null);
    setModalOpen(true);
  };

  const openEditModal = (item) => {
    setEditItem(item);
    setModalOpen(true);
  };

  return (
    <div>
      {/* En-tête */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
        <button onClick={openCreateModal} className="btn btn-primary flex items-center gap-2">
          <Plus className="w-5 h-5" />
          Ajouter
        </button>
      </div>

      {/* Barre de recherche */}
      <div className="mb-6">
        <div className="relative max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder={searchPlaceholder}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="form-input pl-10"
          />
        </div>
      </div>

      {/* Tableau */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        {loading ? (
          <LoadingSpinner />
        ) : data.length === 0 ? (
          <EmptyState
            title="Aucune donnée"
            message="Commencez par ajouter un élément"
            action={
              <button onClick={openCreateModal} className="btn btn-primary btn-sm">
                <Plus className="w-4 h-4 mr-1" />
                Ajouter
              </button>
            }
          />
        ) : (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th key={col.key}>{col.label}</th>
                  ))}
                  <th className="text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data.map((item) => (
                  <tr key={item.id}>
                    {columns.map((col) => (
                      <td key={col.key}>
                        {col.render ? col.render(item) : item[col.key]}
                      </td>
                    ))}
                    <td className="text-right">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => openEditModal(item)}
                          className="p-2 text-gray-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-colors"
                          title="Modifier"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => setDeleteItem(item)}
                          className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Supprimer"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal de création/modification */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditItem(null);
        }}
        title={editItem ? 'Modifier' : 'Ajouter'}
      >
        <FormComponent
          initialData={editItem}
          onSubmit={handleSubmit}
          onCancel={() => {
            setModalOpen(false);
            setEditItem(null);
          }}
          loading={submitting}
        />
      </Modal>

      {/* Dialog de confirmation de suppression */}
      <ConfirmDialog
        isOpen={!!deleteItem}
        onClose={() => setDeleteItem(null)}
        onConfirm={handleDelete}
        title="Confirmer la suppression"
        message="Êtes-vous sûr de vouloir supprimer cet élément ? Cette action est irréversible."
        loading={submitting}
      />
    </div>
  );
}
