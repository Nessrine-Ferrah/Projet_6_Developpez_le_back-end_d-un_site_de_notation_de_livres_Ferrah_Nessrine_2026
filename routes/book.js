import express from "express";
import auth from "../middleware/auth.js";
import multer from "../middleware/multer-config.js";
import { sharpOptimize } from "../middleware/sharp-config.js";
import {
  createBook,
  ratingBook,
  bestRatingBook,
  getOneBook,
  modifyBook,
  deleteBook,
  getAllBook
} from "../controllers/bookCtrl.js";

const router = express.Router();

// GET
router.get('/', getAllBook);
router.get('/bestrating', bestRatingBook);
router.get('/:id', getOneBook);

// POST
router.post('/', auth, multer, sharpOptimize, createBook);
router.post('/:id/rating', auth, ratingBook);

// PUT
router.put('/:id', auth, multer,sharpOptimize, modifyBook);

// DELETE
router.delete('/:id', auth, deleteBook);

export default router;