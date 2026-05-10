import ResourcePage from '../../components/common/ResourcePage';
import { filieresAPI } from '../../api/api.js';
import FilieresForm from '../../components/FilieresForm';

const columns = [
  { key: 'code',        label: 'Code' },
  { key: 'libelle',     label: 'Libellé' },
  { key: 'description', label: 'Description', render: (item) => (
    <span className="truncate max-w-xs block">{item.description || '-'}</span>
  )},
];

export default function FilieresPage() {
  return (
    <ResourcePage
      title="Gestion des Filières"
      api={filieresAPI}
      columns={columns}
      FormComponent={FilieresForm}
      searchPlaceholder="Rechercher une filière..."
    />
  );
}
