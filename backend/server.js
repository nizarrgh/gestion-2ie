require('dotenv').config();
const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors({origin: process.env.CORS_ORIGIN || 'http://localhost:5173'}));
app.use(express.json());

// Importer les routes
const authRoutes = require('./routes/auth');
const ressourcesRoutes = require('./routes/ressources');

// Utiliser les routes
app.use('/api/auth', authRoutes);
app.use('/api', ressourcesRoutes);

// Démarrer le serveur      
app.listen(process.env.PORT || 8000, () => {
    console.log(`Serveur démarré sur le port ${process.env.PORT || 8000}`);
}); 