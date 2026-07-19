const Book = require('../models/book');

exports.createBook = (req, res, next) => {
  delete req.body._id;
  const book = new Book({
    ...req.body
  });
  book.save()
    .then(() => res.status(201).json({ message: 'Post saved successfully!'}))
    .catch(error => res.status(400).json({ error }));
};

exports.ratingBook = (req, res, next) => {
  const userId = req.body.userId;
  const rating = req.body.rating;

    if (rating < 0 || rating > 5) {
        return res.status(400).json({ message: "La note doit être comprise entre 0 et 5." });
    }

  Book.findOne({ _id: req.params.id} )
    .then(book => {
      if (!book) {
        return res.status(404).json({ message: "Livre introuvable." })
      }

       const alreadyRated = book.ratings.find(r => r.userId === userId);
        if (alreadyRated) {
            return res.status(400).json({ message: "Vous avez déjà noté ce livre." });
       }

       book.ratings.push({ userId: userId, grade: rating });


       book.save()
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
};

exports.bestRatingBook = (req, res, next) => {
  Book.find()
    .then(books => {
        const sortBooks = books.sort((a, b) => b.averageRating - a.averageRating);
        const bestThree = sortedBooks.slice(0, 3);
        res.status(200).json(bestThree);
    })
    .catch(error => res.status(400).json({ error }));
};

exports.getOneBook = (req, res, next) => {
   Book.findOne({_id: req.params.id})
    .then(book => res.status(200).json(book))
    .catch(error => res.status(404).json({ error }));
};

exports.modifyBook = (req, res, next) => {
  Book.updateOne({_id: req.params.id}, { ...req.body, _id:req.params.id })
  .then(() => res.status(201).json({ message: 'Book updated successfully!'}))
  .catch(error => res.status(400).json({ error }));
};

exports.deleteBook = (req, res, next) => {
 Book.deleteOne({_id: req.params.id})
  .then(() => res.status(200).json({ message: 'Deleted!'}))
  .catch(error => res.status(400).json({ error }));
};

exports.getAllBook = (req, res, next) => {
  Book.find()
    .then(books => res.status(200).json(books))
    .catch(error => res.status(400).json({ error }));
};


