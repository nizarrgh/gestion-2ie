import { useState } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const menu = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    items: [
      { path: '/dashboard', label: 'Tableau de bord' },
    ],
  },
  {
    id: 'ressources',
    label: 'Ressources',
    items: [
      { path: '/ecoles',             label: 'Ecoles' },
      { path: '/filieres',           label: 'Filières' },
      { path: '/cycles',             label: 'Cycles' },
      { path: '/specialites',        label: 'Spécialités' },
      { path: '/niveaux',            label: 'Niveaux' },
      { path: '/pays',               label: 'Pays' },
      { path: '/annees-academiques', label: 'Années académiques' },
      { path: '/parcours',           label: 'Parcours' },
    ],
  },
  {
    id: 'etudiants',
    label: 'Gestion étudiants',
    items: [
      { path: '/etudiants/nouveau', label: 'Ajouter un étudiant' },
      { path: '/etudiants',         label: 'Liste des étudiants' },
    ],
  },
];

export default function Sidebar() {
  const [collapsed, setCollapsed]     = useState(false);
  const [openSection, setOpenSection] = useState('dashboard');
  const { logout, user }              = useAuth();
  const navigate                      = useNavigate();

  const toggleSection = (id) =>
    setOpenSection(prev => prev === id ? null : id);

  const sidebarWidth = collapsed ? '64px' : '250px';

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>

      {/* ── Sidebar ── */}
      <aside style={{
        width: sidebarWidth, minHeight: '100vh',
        background: '#154360', display: 'flex', flexDirection: 'column',
        position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
        overflowY: 'auto', overflowX: 'hidden',
        transition: 'width .22s ease',
        boxShadow: '2px 0 8px rgba(0,0,0,.15)'
      }}>

        {/* Logo */}
        <div style={{
          display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          padding: '.9rem', background: 'rgba(0,0,0,.25)',
          borderBottom: '1px solid rgba(255,255,255,.08)',
          minHeight: '52px'
        }}>
          {!collapsed && (
            <span style={{ color: '#fff', fontWeight: 700, fontSize: '.95rem', whiteSpace: 'nowrap' }}>
              🎓 Gestion 2iE
            </span>
          )}
          <button onClick={() => setCollapsed(p => !p)} style={{
            background: 'rgba(255,255,255,.1)', border: 'none',
            color: '#fff', borderRadius: '6px', padding: '.25rem .5rem',
            cursor: 'pointer', fontSize: '.9rem', marginLeft: 'auto'
          }}>
            {collapsed ? '→' : '←'}
          </button>
        </div>

        {/* Nav */}
        <nav style={{ flex: 1, padding: '.5rem 0' }}>
          {menu.map(section => (
            <div key={section.id} style={{ marginBottom: '.25rem' }}>
              <div onClick={() => toggleSection(section.id)} style={{
                padding: '.5rem .85rem', cursor: 'pointer',
                fontSize: '.7rem', fontWeight: 700, textTransform: 'uppercase',
                letterSpacing: '.08em', color: 'rgba(255,255,255,.35)',
                display: 'flex', alignItems: 'center', justifyContent: 'space-between'
              }}>
                {!collapsed && <span>{section.label}</span>}
                {!collapsed && (
                  <span style={{
                    transition: 'transform .2s',
                    transform: openSection === section.id ? 'rotate(90deg)' : 'none',
                    fontSize: '.8rem'
                  }}>▶</span>
                )}
              </div>

              {!collapsed && openSection === section.id && (
                <div>
                  {section.items.map(item => (
                    <NavLink key={item.path} to={item.path}
                      style={({ isActive }) => ({
                        display: 'block', padding: '.48rem .85rem .48rem 1.1rem',
                        fontSize: '.84rem', textDecoration: 'none',
                        borderLeft: isActive ? '3px solid #f39c12' : '3px solid transparent',
                        background: isActive ? 'rgba(255,255,255,.12)' : 'transparent',
                        color: isActive ? '#fff' : 'rgba(255,255,255,.6)',
                        fontWeight: isActive ? 600 : 400,
                        transition: 'all .14s',
                        whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis'
                      })}
                      onMouseEnter={e => {
                        e.currentTarget.style.background = 'rgba(255,255,255,.08)';
                        e.currentTarget.style.color = '#fff';
                      }}
                      onMouseLeave={e => {
                        const isActive = e.currentTarget.getAttribute('aria-current') === 'page';
                        e.currentTarget.style.background = isActive ? 'rgba(255,255,255,.12)' : 'transparent';
                        e.currentTarget.style.color = isActive ? '#fff' : 'rgba(255,255,255,.6)';
                      }}
                    >
                      {item.label}
                    </NavLink>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Footer */}
        {!collapsed && (
          <div style={{
            padding: '.75rem .9rem',
            background: 'rgba(0,0,0,.2)',
            borderTop: '1px solid rgba(255,255,255,.08)'
          }}>
            <div style={{ marginBottom: '.5rem' }}>
              <div style={{ fontSize: '.82rem', fontWeight: 600, color: '#fff' }}>
                {user?.nom || 'Admin'}
              </div>
              <div style={{ fontSize: '.72rem', color: 'rgba(255,255,255,.4)' }}>
                Administrateur
              </div>
            </div>
            <button onClick={() => { logout(); navigate('/login'); }} style={{
              width: '100%', padding: '.4rem', background: 'rgba(231,76,60,.15)',
              border: '1px solid rgba(231,76,60,.3)', borderRadius: '6px',
              color: '#e74c3c', fontSize: '.82rem', cursor: 'pointer',
              transition: 'background .15s'
            }}>
              Se déconnecter
            </button>
          </div>
        )}
      </aside>

      {/* ── Contenu principal ── */}
      <div style={{
        marginLeft: sidebarWidth, flex: 1,
        minHeight: '100vh', background: '#f1f5f9',
        transition: 'margin-left .22s ease',
        padding: '1.5rem'
      }}>
        <Outlet />
      </div>
    </div>
  );
}