import ResourcePage from '../../components/common/ResourcePage';
import { anneesAcademiquesAPI } from '../../api/api.js';
import AnneesAcademiquesForm from '../../components/AnneesAcademiquesForm';

const columns = [
  { key: 'libelle', label: 'Libellé' },
  { key: 'date_debut', label: 'Début', render: (item) => new Date(item.date_debut).toLocaleDateString('fr-FR') },
  { key: 'date_fin', label: 'Fin', render: (item) => new Date(item.date_fin).toLocaleDateString('fr-FR') },
  { key: 'active', label: 'Statut', render: (item) => (
    <span className={`badge ${item.active ? 'badge-success' : 'badge-warning'}`}>
      {item.active ? 'Active' : 'Inactive'}
    </span>
  )}
];

export default function AnneesAcademiquesPage() {
  return (
    <ResourcePage
      title="Gestion des Années Académiques"
      api={anneesAcademiquesAPI}
      columns={columns}
      FormComponent={AnneesAcademiquesForm}
      searchPlaceholder="Rechercher une année..."
    />
  );
}
