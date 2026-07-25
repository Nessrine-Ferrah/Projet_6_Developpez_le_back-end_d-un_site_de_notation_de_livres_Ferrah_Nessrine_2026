import express from "express";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";

import bookRoutes from "./routes/book.js";
import userRoutes from "./routes/user.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();

mongoose.connect('mongodb+srv://nessrineferrah01_db_user:3lmG8p4biTTTeoCv@cluster0.qegigyn.mongodb.net/?appName=Cluster0',)
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