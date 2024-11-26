const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware para processar formulários
app.use(bodyParser.urlencoded({ extended: true }));

const mysql = require('mysql.sql');

// Configurando a conexão
const db = mysql.createConnection({
    host: 'localhost',       // Endereço do servidor MySQL
    user: 'root',            // Usuário do MySQL
    password: '',            // Senha do MySQL (adicione a sua, se necessário)
    database: 'login_system' // Nome do banco de dados
});

// Conectando ao banco
db.connect((err) => {
    if (err) {
        console.error('Erro ao conectar ao banco de dados:', err);
        return;
    }
    console.log('Conectado ao banco de dados!');
});

module.exports = db; // Para reutilizar a conexão em outros arquivos

// Servir arquivos estáticos (HTML e CSS)
app.use(express.static(path.join(__dirname, 'public')));

// Rota para processar login
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Consultar o banco de dados
    const query = 'SELECT * FROM users WHERE username = ?';
    db.query(query, [username], async (err, results) => {
        if (err) throw err;

        if (results.length > 0) {
            const validPassword = await bcrypt.compare(password, results[0].password);
            if (validPassword) {
                // Redireciona para a página principal
                res.redirect('/index.html');
            } else {
                res.send('Senha incorreta.');
            }
        } else {
            res.send('Usuário não encontrado.');
        }
    });
});

// Rota para a página principal
app.get('/home', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/home.html')); // Página principal (exemplo)
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});

db.query('SHOW TABLES', (err, results) => {
    if (err) {
        console.error('Erro ao executar a query:', err);
    } else {
        console.log('Tabelas no banco de dados:', results);
    }
});
app.post('/login', (req, res) => {
    const { username, password } = req.body;

    // Query para verificar o usuário
    const query = 'SELECT * FROM users WHERE username = ? AND password = ?';
    db.query(query, [username, password], (err, results) => {
        if (err) {
            res.status(500).send('Erro no servidor');
            return;
        }

        if (results.length > 0) {
            // Login bem-sucedido
            res.redirect('/home');
        } else {
            // Usuário ou senha incorretos
            res.status(401).send('Usuário ou senha incorretos');
        }
    });
});
const bcrypt = require('bcrypt');
const saltRounds = 10;

// Para criar uma senha hasheada
bcrypt.hash('sua_senha', saltRounds, (err, hash) => {
    console.log('Senha hasheada:', hash);
});

// Para comparar a senha fornecida com o hash
bcrypt.compare('senha_fornecida', hash_armazenado, (err, result) => {
    if (result) {
        console.log('Senha correta!');
    } else {
        console.log('Senha incorreta!');
    }
});

