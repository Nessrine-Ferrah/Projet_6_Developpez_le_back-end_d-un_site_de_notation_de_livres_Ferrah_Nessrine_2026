## Backend API – Projet 6
Ce dossier contient le code backend du projet de notation de livres.

## Configuration requise

# Version de Node
Ce backend a été développé initialement avec :

Node.js v20.9.0

Cependant, pour éviter les erreurs de compilation liées à Sharp, il est fortement recommandé d’utiliser une version plus récente :

Node.js v26.x (recommandé)  
Sharp est mieux supporté sur les versions récentes de Node, ce qui évite les erreurs de build ou de dépendances natives.

# Variables d’environnement
Le backend utilise dotenv pour gérer les informations sensibles.
Vous devez créer un fichier : backend/.env
avec les variables suivantes :

MONGO_URI=votre_url_mongodb_atlas
JWT_SECRET=votre_cle_secrete

Détails importants

- MONGO_URI :
À récupérer dans MongoDB Atlas → Database → Connect → Drivers.
Copiez l’URI fournie par Atlas (avec votre utilisateur et mot de passe valides).

- JWT_SECRET :
Une clé secrète utilisée pour signer les tokens JWT (ex : une chaîne aléatoire).

- Le fichier .env doit être ignoré dans .gitignore pour éviter toute fuite de données sensibles.

Un fichier .env.example est fourni pour montrer la structure attendue des variables d’environnement :

MONGO_URI=
JWT_SECRET=

Son utilité :

- Documenter les variables nécessaires au projet
- Permettre à un autre développeur de créer rapidement son propre .env
- Éviter de partager des informations sensibles dans le dépôt

## Lancement du backend
- Ouvrez un terminal dans le dossier backend.
- Installer les dépendances : npm install

Lancer le serveur
Deux options sont possibles :

- Option 1 : npm start 

- Option 2 — nodemon (si installé)
Permet un rechargement automatique : nodemon server

- Le serveur démarre sur : http://localhost:4000

## Technologies utilisées
- Node.js / Express
- MongoDB Atlas / Mongoose
- dotenv
- Multer (upload d’images)
- Sharp (compression d’images)
- JWT (authentification)
- ES Modules

## Fonctionnement
- Les routes API sont dans /routes
- Les contrôleurs sont dans /controllers
- Les modèles MongoDB sont dans /models
- Les images uploadées sont compressées puis stockées dans /images
- Lorsqu’un livre est supprimé, son image est supprimée automatiquement
