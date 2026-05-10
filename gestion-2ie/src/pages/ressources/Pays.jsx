import ResourcePage from '../../components/common/ResourcePage';
import { paysAPI } from '../../api/api.js';
import PaysForm from '../../components/PaysForm';

const columns = [
  { key: 'libelle',     label: 'Pays' },
  { key: 'nationalite', label: 'Nationalité' },
  { key: 'code',        label: 'Code' },
  { key: 'iso',         label: 'ISO' },
];

export default function PaysPage() {
  return (
    <ResourcePage
      title="Gestion des Pays"
      api={paysAPI}
      columns={columns}
      FormComponent={PaysForm}
      searchPlaceholder="Rechercher un pays..."
    />
  );
}
