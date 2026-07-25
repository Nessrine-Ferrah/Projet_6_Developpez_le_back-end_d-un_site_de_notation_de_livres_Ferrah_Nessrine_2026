import Book from "../models/book.js";
import fs from "fs";
//l nous donne accès aux fonctions qui nous permettent de modifier le système de fichiers
//, y compris aux fonctions permettant de supprimer les fichiers.

export async function createBook (req, res, next) {
    try {
        const bookObject = JSON.parse(req.body.book);
        delete bookObject._id;
        delete bookObject.userId;
        const book = new Book({
        ...bookObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        });
        await book.save()
        res.status(201).json({ message: 'Post saved successfully!'});
    } catch(error) {
        res.status(400).json({ error });
    }
}

export async function ratingBook (req, res, next) {
    try {
        const userId = req.body.userId;
        const rating = req.body.rating;

        if (rating < 0 || rating > 5) {
            return res.status(400).json({ message: "La note doit être comprise entre 0 et 5." });
        }

        const book = await Book.findOne({ _id: req.params.id} )
        if (!book) {
        return res.status(404).json({ message: "Livre introuvable." })
        }

        const alreadyRated = book.ratings.find(r => r.userId === userId);
        if (alreadyRated) {
            return res.status(400).json({ message: "Vous avez déjà noté ce livre." });
        }

        book.ratings.push({ userId: userId, grade: rating });

        const total = book.ratings.reduce((sum, r) => sum + r.grade, 0);
        book.averageRating = (total / book.ratings.length).toFixed(1);

        const updatedBook = await book.save()
        res.status(200).json(updatedBook);
    } catch (error) {
        res.status(400).json({ error });
    }
}

export async function bestRatingBook (req, res, next) {
    try {
        const books = await Book.find();
        const sortBooks = books.sort((a, b) => b.averageRating - a.averageRating);
        const bestThree = sortBooks.slice(0, 3);
        res.status(200).json(bestThree);
    } catch (error) {
        res.status(400).json({ error });
    }
}

export async function getOneBook (req, res, next) {
    try {
        const book = await Book.findOne({_id: req.params.id});
        res.status(200).json(book);
    } catch (error) {
        res.status(404).json({ error });
    }
}

export async function modifyBook (req, res, next) {
    try {
        const bookObject = req.file ? {
        ...JSON.parse(req.body.book),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        } : { ...req.body};
    
        delete bookObject.userId;
        const book = await Book.findOne({_id: req.params.id});
        if (book.userId != req.auth.userId) {
            return res.status(401).json({ message : 'Not authorized'});
        } else {
            await Book.updateOne({ _id: req.params.id}, { ...bookObject, _id: req.params.id});
            res.status(200).json({message : 'livre modifié!'});
        }
        
    } catch (error) {
        res.status(400).json({ error });
    }
}

export async function deleteBook (req, res, next) {  
    try {
        const book = await Book.findOne({ _id: req.params.id});
        if (book.userId != req.auth.userId) {
            return res.status(401).json({message: 'Not authorized'});
        } 
        const filename = book.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, async () => {
            await Book.deleteOne({_id: req.params.id})
            res.status(200).json({message: 'Livre supprimé !'});      
        });
    } catch (error) {
        res.status(500).json({ error });
    }
}

export async function getAllBook (req, res, next) {
    try {
        const books = await Book.find();
        res.status(200).json(books);
    } catch (error) {
        res.status(400).json({ error });
    }
}


