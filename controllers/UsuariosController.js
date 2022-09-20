const bcrypt = require('bcrypt');
const fs = require('fs');
const path = require('path');

const UsuariosController = {
  showEntrar: (req, res) => {

    let erroNoCadastro = (req.query.erroNoCadastro == 1);

    res.render('entrar.ejs', {erroNoCadastro});
  },

  add: (req, res) => {
    let {email, senha, confirmacao, endereco} = req.body;
    if(senha != confirmacao){
       return res.redirect('/usuarios/entrar?erroNoCadastro=1');
    }
    let usuario = {
      email,
      senha: bcrypt.hashSync(senha, 10),
      enderecos: [endereco]
    }

    const usuarios = require('../database/usuarios.json');
    usuarios.push(usuario);
    fs.writeFileSync(
      path.join(__dirname, '../database/usuarios.json'),
      JSON.stringify(usuarios, null, 4)
      )
       delete usuario.senha;
       req.session.usuario = usuario;

       if(req.session.pizzas != undefined) {
        return res.redirect('/pizzas/cart')
       } else {
        return res.redirect('/pizzas');
       }
  }
};

module.exports = UsuariosController;
//na função add
// extrair info do req.body
// Verificar se a senha e confirmação estão ok

// Criar um objeto com as informações do usuário

// Salvar o usuário no arquivo usuarios.json

// Criar uma session com as informações NÃO SENSÍVEIS do usuário

// Redirecionar o usuário...
// Caso ele tenha carrinho -> /pizzas/cart
// Caso contrário -> /pizzas
