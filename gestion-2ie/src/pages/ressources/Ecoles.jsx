import ResourcePage from '../../components/common/ResourcePage';
import { ecolesAPI } from '../../api/api.js';
import EcolesForm from '../../components/EcolesForm';

const columns = [
  { key: 'libelle',   label: 'Nom' },
  { key: 'adresse',   label: 'Adresse' },
  { key: 'telephone', label: 'Téléphone' },
  { key: 'email',     label: 'Email' },
]

export default function EcolesPage() {
  return (
    <ResourcePage
      title="Gestion des Écoles"
      api={ecolesAPI}
      columns={columns}
      FormComponent={EcolesForm}
      searchPlaceholder="Rechercher une école..."
    />
  );
}
