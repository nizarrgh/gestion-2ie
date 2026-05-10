// ================================================
// Configuration Axios avec intercepteur JWT
// ================================================

import axios from 'axios';

// Création de l'instance Axios
const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json'
  }
});

// Intercepteur pour ajouter le token JWT à chaque requête
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Intercepteur pour gérer les erreurs de réponse
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // Si le token est expiré ou invalide, rediriger vers la page de login
    if (error.response?.status === 401) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user');
      // Redirection vers login si pas déjà sur la page
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

// ================================================
// Fonctions d'authentification
// ================================================

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  verify: () => api.get('/auth/verify'),
  register: (data) => api.post('/auth/register', data)
};

// ================================================
// Factory pour les API CRUD
// ================================================

export const createCrudAPI = (resource) => ({
  getAll: (params = {}) => api.get(`/${resource}`, { params }),
  getById: (id) => api.get(`/${resource}/${id}`),
  create: (data) => api.post(`/${resource}`, data),
  update: (id, data) => api.put(`/${resource}/${id}`, data),
  delete: (id) => api.delete(`/${resource}/${id}`)
});

// ================================================
// APIs pour chaque ressource
// ================================================

export const paysAPI = createCrudAPI('pays');
export const ecolesAPI = createCrudAPI('ecoles');
export const cyclesAPI = createCrudAPI('cycles');
export const filieresAPI = createCrudAPI('filieres');
export const specialitesAPI = createCrudAPI('specialites');
export const niveauxAPI = createCrudAPI('niveaux');
export const anneesAcademiquesAPI = createCrudAPI('annees-academiques');
export const parcoursAPI = createCrudAPI('parcours');
export const classesAPI = createCrudAPI('classes');
export const etudiantsAPI = createCrudAPI('etudiants');
export const inscriptionsAPI = createCrudAPI('inscriptions');

export default api;
