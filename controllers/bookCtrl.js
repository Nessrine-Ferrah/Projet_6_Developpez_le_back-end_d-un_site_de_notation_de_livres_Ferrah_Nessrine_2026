const Book = require('../models/book');

exports.createBook = (req, res, next) => {
    const bookObject = JSON.parse(req.body.book);
    delete bookObject._id;
    delete bookObject.userId;
    const book = new Book({
    ...bookObject,
    userId: req.auth.userId,
    imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
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

      
       const total = book.ratings.reduce((sum, r) => sum + r.grade, 0);
       book.averageRating = total / book.ratings.length;

       book.save()
        .then(updatedBook => res.status(200).json(updatedBook))
        .catch(error => res.status(400).json({ error }));
    })
    .catch(error => res.status(400).json({ error }));
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


