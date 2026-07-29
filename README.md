## Backend API – Projet 6
Ce dossier contient le code backend du projet de notation de livres.

## Configuration requise

# Version de Node
Ce backend a été développé avec :

Node.js v20.9.0
Il est recommandé d’utiliser une version équivalente ou supérieure.

# Variables d’environnement
Le backend utilise dotenv pour gérer les informations sensibles.
Créer un fichier .env à la racine du dossier backend contenant :

MONGO_URI=votre_url_mongodb_atlas
JWT_SECRET=votre_cle_secrete

- L’URI MongoDB doit être récupérée dans MongoDB Atlas :  
  Database → Connect → Drivers → copier l’URI fournie par Atlas.
- Ne jamais mettre d’URL contenant un utilisateur supprimé ou un mot de passe exposé.  
- Le fichier .env doit être ignoré dans .gitignore.

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
