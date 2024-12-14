const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

app.post('/users', (req, res) => {
    const { name, email } = req.body;

    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
        return res.status(400).json({ error: 'Имя пользователя уже существует' });
    }

    const newUser = { name, email };
    users.push(newUser);

    res.status(201).json({ message: 'Пользователь успешно создан', user: newUser });
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});