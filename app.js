// Carregando módulos
const express = require('express');
const handlebars = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const app = express();
const admin = require('./routes/admin');
const path = require('path');
const PORT = 8081;

// Configurações
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.use(express.static(path.join(__dirname, "public")));

// Mongoose (Object Data Mapping)
mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost:27017/blogapp', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log("MongoDB Conectado");
}).catch((err) => {
  console.log("Erro ao conectar ao MondoDB! " + err);
});

// Rotas
app.get("/", (req, res) => {
  res.send('Página Principal')
})
app.use('/admin', admin);

// Outros
app.listen(PORT, () => {
  console.log("Servidor rodando na porta " + PORT);
});
