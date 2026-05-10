import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './pages/LoginPage';
import Dashboard from './pages/Dashboard';

// Ressources
import Ecoles from './pages/ressources/Ecoles';
import Filieres from './pages/ressources/Filieres';
import Cycles from './pages/ressources/Cycles';
import Specialites from './pages/ressources/Specialites';
import Pays from './pages/ressources/Pays';
import Niveaux from './pages/ressources/Niveaux';
import AnneesAcademiques from './pages/ressources/AnneesAcademiques';
import Parcours from './pages/ressources/Parcours';

// Étudiants
import EtudiantsPage from './pages/etudiants/ListesEtudiants';
import AjouterEtudiants from './pages/etudiants/AjouterEtudiants';
import Sidebar from './components/Sidebar';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          <Route element={<ProtectedRoute />}>
            <Route path="/" element={<Sidebar />}>
              <Route index element={<Navigate to="/dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />

              {/* Ressources */}
              <Route path="ecoles"              element={<Ecoles />} />
              <Route path="filieres"            element={<Filieres />} />
              <Route path="cycles"              element={<Cycles />} />
              <Route path="specialites"         element={<Specialites />} />
              <Route path="pays"                element={<Pays />} />
              <Route path="niveaux"             element={<Niveaux />} />
              <Route path="annees-academiques"  element={<AnneesAcademiques />} />
              <Route path="parcours"            element={<Parcours />} />

              {/* Étudiants */}
              <Route path="etudiants"                    element={<EtudiantsPage />} />
              <Route path="etudiants/nouveau"            element={<AjouterEtudiants />} />
              <Route path="etudiants/:id/modifier"       element={<AjouterEtudiants />} />
            </Route>
          </Route>

          {/* Redirection par défaut */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}