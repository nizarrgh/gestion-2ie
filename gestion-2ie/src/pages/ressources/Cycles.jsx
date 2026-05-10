import ResourcePage from '../../components/common/ResourcePage';
import { cyclesAPI } from '../../api/api.js';
import CyclesForm from '../../components/CyclesForm';

const columns = [
  { key: 'libelle',      label: 'Libellé' },
  { key: 'duree_annees', label: 'Durée (ans)' },
];
export default function CyclesPage() {
  return (
    <ResourcePage
      title="Gestion des Cycles"
      api={cyclesAPI}
      columns={columns}
      FormComponent={CyclesForm}
      searchPlaceholder="Rechercher un cycle..."
    />
  );
}
