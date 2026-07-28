## Backend API – Projet 6
Ce dossier contient le code backend du projet de notation de livres.

## Lancement du backend
Ouvrez un terminal dans ce dossier.

Pour installer les dépendances du projet, exécutez :

npm install

Le backend utilise nodemon pour fonctionner.
Lancez le serveur avec :

nodemon server

Laissez ce terminal tourner pour utiliser l’application.

## Configuration requise
Le backend utilise dotenv pour les variables sensibles.
Créer un fichier .env à la racine du dossier backend contenant :

MONGO_URI=votre_uri_mongodb_atlas
JWT_SECRET=votre_cle_secrete

Le fichier .env doit être ignoré dans .gitignore.

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