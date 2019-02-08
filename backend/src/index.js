const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

const app = express();

const server = require("http").Server(app);
const io = require('socket.io')(server); //quem vai controlar novas informaçoes, isso permite que os erver ouça as informaçoes em real time.

mongoose.connect('mongodb://goweek:goweek123@ds121415.mlab.com:21415/goweek-molimat', {
    useNewUrlParser: true
});

app.use((req, res, next) => { //Middleware
    req.io = io; //aqui a gente insere dentro da variavel req a ferramenta io que foi criada ali em cima.
    return next(); //o next é só pra dizer que ele pode ir pras proximas requisiçoes, isso faz com que o middleware nao trave as proximas requisicoes
});

app.use(cors());
app.use(express.json());
app.use(require('./routes')); //aqui é onde as rotas da nossa api serão definidas.

server.listen(3000, () => {
    console.log('server started on port 3000')
})