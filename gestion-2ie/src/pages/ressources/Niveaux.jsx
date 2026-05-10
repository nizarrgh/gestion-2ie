import ResourcePage from '../../components/common/ResourcePage.jsx';
import { niveauxAPI } from '../../api/api.js';
import NiveauxForm from '../../components/NiveauxForm.jsx';

const columns = [
  { key: 'ordre',   label: 'Ordre' },
  { key: 'libelle', label: 'Libellé' },
];

export default function NiveauxPage() {
  return (
    <ResourcePage
      title="Gestion des Niveaux"
      api={niveauxAPI}
      columns={columns}
      FormComponent={NiveauxForm}
      searchPlaceholder="Rechercher un niveau..."
    />
  );
}
