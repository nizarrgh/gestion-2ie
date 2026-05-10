import ResourcePage from '../../components/common/ResourcePage';
import { parcoursAPI } from '../../api/api.js';
import ParcoursForm from '../../components/ParcoursForm';

const columns = [
  { key: 'libelle',            label: 'Libellé' },
  { key: 'specialite_libelle', label: 'Spécialité' },
  { key: 'niveau_libelle',     label: 'Niveau' },
  { key: 'cycle_libelle',      label: 'Cycle' },
];
export default function ParcoursPage() {
  return (
    <ResourcePage
      title="Gestion des Parcours"
      api={parcoursAPI}
      columns={columns}
      FormComponent={ParcoursForm}
      searchPlaceholder="Rechercher un parcours..."
    />
  );
}
