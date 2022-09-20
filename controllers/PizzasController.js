// Importando o array de pizzas
const pizzas = require('../database/pizzas.json');

// Criando e exportando o objeto literal que conterá todas as funções (controllers)
module.exports = {

    index: (req, res) => {
        let quantidade = 0;
        if(req.session.pizzas){
            quantidade = req.session.pizzas.length;
        }
        res.render('index.ejs',{ pizzas, quantidade });
    },

    show: (req, res) => {
        // Levantar o id que veio no parâmetro de rota
        let id = req.params.id;

        // Encontrar no array de pizzas a pizza
        let pizza = pizzas.find(p=>p.id == id);

        // Retornar a view pizza.ejs, a pizza encontrada
        res.render('pizza.ejs',{pizza});
    },

    search: (req, res) => {
        // Levantar o trecho que está sendo buscado (req.query.q)
        let quantidade = 0;
        if(req.session.pizzas){
            quantidade = req.session.pizzas.length;
        };

        let termoBuscado = req.query.q;
        // Filtrar as pizzas para obter somente as pizzas com esse trecho
        let pizzasFiltradas = pizzas.filter(p => p.nome.toLowerCase().includes(termoBuscado.toLowerCase()));
        // retornar a view index.ejs, passando para ela somente as pizzas filtradas
        res.render('index.ejs', { pizzas: pizzasFiltradas, quantidade });
    },

    addCart: (req, res) => {
        if(req.session.pizzas){
            req.session.pizzas.push(req.body.aEscolhida);
        } else {
        req.session.pizzas = [req.body.aEscolhida];
    }
    res.redirect('/pizzas');
    console.log(req.session);
},
    showCart: (req, res) => {
    let getPizzaById = (id) => {
        let pizzaEncontrada = pizzas.find(p => p.id == id);
        return pizzaEncontrada;
    }
        let pizzasNoCarrinho = req.session.pizzas.map(getPizzaById);

        let usuarioLogado = (req.session.usuario !== undefined);

        res.render('cart.ejs', {pizzasNoCarrinho, usuarioLogado});
    }
    //showCart: (req,res) =>{
    //let pizzasNoCarrinho = req.session.pizza.map(id => pizzas.find(p => p.id == id))
    //}
}