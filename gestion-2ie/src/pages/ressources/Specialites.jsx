import ResourcePage from '../../components/common/ResourcePage';
import { specialitesAPI } from '../../api/api.js';
import SpecialitesForm from '../../components/SpecialitesForm';

const columns = [
  { key: 'libelle',         label: 'Libellé' },
  { key: 'filiere_libelle', label: 'Filière' },
  { key: 'description',     label: 'Description', render: (item) => (
    <span className="truncate max-w-xs block">{item.description || '-'}</span>
  )},
];
export default function SpecialitesPage() {
  return (
    <ResourcePage
      title="Gestion des Spécialités"
      api={specialitesAPI}
      columns={columns}
      FormComponent={SpecialitesForm}
      searchPlaceholder="Rechercher une spécialité..."
    />
  );
}
