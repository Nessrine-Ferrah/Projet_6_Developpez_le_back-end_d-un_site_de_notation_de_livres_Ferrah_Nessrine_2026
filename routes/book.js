const express = require('express');
const bookCtrl = require('../controllers/bookCtrl');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/', auth, bookCtrl.createBook);
router.post('/:id/rating', auth, bookCtrl.ratingBook);
router.get('/bestrating', bookCtrl.bestRatingBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', auth, bookCtrl.modifyBook);
router.delete('/:id', auth, bookCtrl.deleteBook);
router.get('/', bookCtrl.getAllBook);

module.exports = router;