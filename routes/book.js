const express = require('express');
const bookCtrl = require('../controllers/bookCtrl')

const router = express.Router();

router.post('/',bookCtrl.createBook);
router.post('/:id/rating', bookCtrl.ratingBook);
router.get('/bestrating', bookCtrl.bestRatingBook);
router.get('/:id', bookCtrl.getOneBook);
router.put('/:id', bookCtrl.modifyBook);
router.delete('/:id', bookCtrl.deleteBook);
router.get('/', bookCtrl.getAllBook);

module.exports = router;