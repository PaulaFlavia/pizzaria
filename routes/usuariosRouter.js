const UsuariosController = require('../controllers/UsuariosController');
const router = require('./PizzasRouter');

const UsuariosRouter = require('express').Router();

UsuariosRouter.get('/entrar', UsuariosController.showEntrar);
UsuariosRouter.post('/add', UsuariosController.add);


module.exports = UsuariosRouter;

