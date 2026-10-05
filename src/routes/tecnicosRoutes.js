const express = require('express');
const router = express.Router();
const tecnicosController = require('../controllers/tecnicosController');

router.get('/', tecnicosController.getAll);
router.get('/:id', tecnicosController.getById);
router.post('/', tecnicosController.create);
router.put('/:id', tecnicosController.update);
router.delete('/:id', tecnicosController.delete);

module.exports = router;
