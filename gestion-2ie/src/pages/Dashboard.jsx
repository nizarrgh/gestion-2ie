import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  etudiantsAPI,
  filieresAPI,
  parcoursAPI,
  ecolesAPI,
} from "../api/api.js";

export default function Dashboard() {

  const navigate = useNavigate();

  const [stats, setStats] = useState({
    etudiants: 0,
    filieres: 0,
    parcours: 0,
    ecoles: 0,
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {

    const loadStats = async () => {

      setLoading(true);

      try {

        const [e, f, p, ec] = await Promise.all([
          etudiantsAPI.getAll(),
          filieresAPI.getAll(),
          parcoursAPI.getAll(),
          ecolesAPI.getAll(),
        ]);

        setStats({
          etudiants: (e.data || []).length,
          filieres: (f.data || []).length,
          parcours: (p.data || []).length,
          ecoles: (ec.data || []).length,
        });

      } catch (err) {

        console.error("Erreur chargement stats :", err);

      } finally {

        setLoading(false);
      }
    };

    loadStats();

  }, []);

  const statCards = [
    {
      label: "Étudiants",
      value: stats.etudiants,
      path: "/etudiants",
      color: "blue",
      icon: "users",
    },
    {
      label: "Filières",
      value: stats.filieres,
      path: "/filieres",
      color: "green",
      icon: "book",
    },
    {
      label: "Parcours",
      value: stats.parcours,
      path: "/parcours",
      color: "purple",
      icon: "map",
    },
    {
      label: "Écoles",
      value: stats.ecoles,
      path: "/ecoles",
      color: "orange",
      icon: "school",
    },
  ];

  const modules = [
    {
      path: "/ecoles",
      label: "Écoles",
      description: "Gérer les écoles",
      color: "gray",
    },
    {
      path: "/filieres",
      label: "Filières",
      description: "Gérer les filières",
      color: "green",
    },
    {
      path: "/cycles",
      label: "Cycles",
      description: "Gérer les cycles",
      color: "indigo",
    },
    {
      path: "/specialites",
      label: "Spécialités",
      description: "Gérer les spécialités",
      color: "yellow",
    },
    {
      path: "/niveaux",
      label: "Niveaux",
      description: "Gérer les niveaux",
      color: "pink",
    },
    {
      path: "/parcours",
      label: "Parcours",
      description: "Gérer les parcours",
      color: "teal",
    },
    {
      path: "/pays",
      label: "Pays",
      description: "Gérer les pays",
      color: "red",
    },
    {
      path: "/annees-academiques",
      label: "Années académiques",
      description: "Gérer les années",
      color: "cyan",
    },
    {
      path: "/etudiants",
      label: "Étudiants",
      description: "Liste des étudiants",
      color: "blue",
    },
    {
      path: "/etudiants/nouveau",
      label: "Ajouter étudiant",
      description: "Enregistrer un étudiant",
      color: "purple",
    },
  ];

  const colorMap = {
    blue: "bg-blue-50 text-blue-600 border-blue-200",
    green: "bg-green-50 text-green-600 border-green-200",
    purple: "bg-purple-50 text-purple-600 border-purple-200",
    orange: "bg-orange-50 text-orange-600 border-orange-200",
    red: "bg-red-50 text-red-600 border-red-200",
    indigo: "bg-indigo-50 text-indigo-600 border-indigo-200",
    pink: "bg-pink-50 text-pink-600 border-pink-200",
    yellow: "bg-yellow-50 text-yellow-600 border-yellow-200",
    teal: "bg-teal-50 text-teal-600 border-teal-200",
    cyan: "bg-cyan-50 text-cyan-600 border-cyan-200",
    gray: "bg-gray-50 text-gray-600 border-gray-200",
  };

  const statColor = {
    blue: "bg-blue-100 text-blue-600",
    green: "bg-green-100 text-green-600",
    purple: "bg-purple-100 text-purple-600",
    orange: "bg-orange-100 text-orange-600",
  };

  const Icon = ({ name }) => {

    const paths = {

      users:
        "M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z",

      book:
        "M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253",

      map:
        "M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7",

      school:
        "M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z",
    };

    return (
      <svg
       width="18"
       height="18"
       fill="none"
       stroke="currentColor"
       viewBox="0 0 24 24"
     >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d={paths[name]}
        />
      </svg>
    );
  };

  return (

    <div className="p-4 max-w-6xl mx-auto">

      {/* HEADER */}
      <div className="mb-5">

        <h1 className="text-2xl font-bold text-gray-800">
          Bienvenue sur 2iE Gestion
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Plateforme de gestion académique
        </p>

      </div>

      {/* STATISTIQUES */}
      <div className="flex flex-wrap gap-3 mb-6">

        {statCards.map((card) => (

          <div
            key={card.path}
            onClick={() => navigate(card.path)}
            className="
              bg-white
              border
              border-gray-200
              rounded-lg
              shadow-sm
              p-3
              cursor-pointer
              hover:shadow-md
              transition-all
            "
            style={{
              width: "180px",
              height: "100px",
            }}
          >

            <div className="flex items-center justify-between mb-2">

              <div className={`p-1 rounded ${statColor[card.color]}`}>
                <div style={{ width: "18px", height: "18px" }}>
                <Icon name={card.icon} />
                  </div>
              </div>

            </div>

            <h3 className="text-xl font-bold text-gray-800">
              {loading ? "..." : card.value}
            </h3>

            <p className="text-xs text-gray-500">
              {card.label}
            </p>

          </div>

        ))}

      </div>

      {/* MODULES */}
      <div>

        <h2 className="text-lg font-semibold text-gray-700 mb-4">
          Modules disponibles
        </h2>

        <div className="flex flex-wrap gap-3">

          {modules.map((mod) => (

            <div
              key={mod.path}
              onClick={() => navigate(mod.path)}
              className={`
                ${colorMap[mod.color]}
                border
                rounded-lg
                p-3
                cursor-pointer
                hover:shadow-md
                transition-all
              `}
              style={{
                width: "200px",
                height: "110px",
              }}
            >

              <h3 className="text-sm font-semibold text-gray-800 mb-1">
                {mod.label}
              </h3>

              <p className="text-xs text-gray-500 mb-2">
                {mod.description}
              </p>

              <div className="text-xs font-medium">
                Accéder →
              </div>

            </div>

          ))}

        </div>

      </div>

    </div>
  );
}