// Importando o express
const express = require('express');

// Criando o roteador
const router = express.Router();

// Importando o Controller que lida com as pizzas
const PizzasController = require('../controllers/PizzasController.js');
const PontuaPizza = require('../midllewares/PontuaPizza');
// Criando rota que encaminha requisição para o PizzasController.index
router.get('/', PizzasController.index);
router.get('/busca', PizzasController.search);
router.get('/cart', PizzasController.showCart);
router.post('/addCart', PizzasController.addCart);
router.get('/:id', PontuaPizza, PizzasController.show);

// Exportando o roteador
module.exports = router;