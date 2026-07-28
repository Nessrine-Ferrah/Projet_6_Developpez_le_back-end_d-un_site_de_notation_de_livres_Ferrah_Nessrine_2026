import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
// En ES Modules, __filename et __dirname n'existent plus nativement.
import bookRoutes from "./routes/book.js";
import userRoutes from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// On les recrée manuellement à partir de import.meta.url pour obtenir
// le chemin absolu du fichier courant et de son dossier.
// Cela permet de gérer correctement les chemins (ex: dossier /images) 
// comme on le faisait en CommonJS.

const app = express();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch((error) => {
  console.log('Connexion à MongoDB échouée !');
  console.error(error);
});


app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

app.use('/api/books', bookRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname,'images')));

export default app;