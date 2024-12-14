const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises; 
const app = express();
const port = 3000;

app.use(bodyParser.json());

let users = [];

const logOperation = async (operation, data) => {
    const timestamp = new Date().toISOString();
    const logEntry = `[${timestamp}] ${operation}: ${JSON.stringify(data)}\n`;
    try {
        await fs.appendFile('logs.txt', logEntry);
    } catch (error) {
        console.error(`Ошибка записи в файл журнала: ${error.message}`);
    }
};

app.post('/users', async (req, res) => {
    const { name, email } = req.body;

    const existingUser = users.find(user => user.name === name);
    if (existingUser) {
        return res.status(400).json({ error: 'Имя пользователя уже существует' });
    }

    const newUser = { name, email };
    users.push(newUser);

    await logOperation('Создание пользователя', newUser);

    res.status(201).json({ message: 'Пользователь успешно создан', user: newUser });
});

app.put('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const { name, email } = req.body;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const existingUser = users.find(user => user.name === name && user.id !== userId);
    if (existingUser) {
        return res.status(400).json({ error: 'Имя пользователя уже существует' });
    }

    users[userIndex] = { id: userId, name, email };

    await logOperation('Обновление пользователя', users[userIndex]);

    res.status(200).json({ message: 'Пользователь успешно обновился', user: users[userIndex] });
});

app.delete('/users/:id', async (req, res) => {
    const userId = req.params.id;
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex === -1) {
        return res.status(404).json({ error: 'Пользователь не найден' });
    }

    const deletedUser = users.splice(userIndex, 1)[0];

    await logOperation('Удаление пользователя', deletedUser);

    res.status(200).json({ message: 'Пользователь успешно удален', user: deletedUser });
});

app.get('/users', (req, res) => {
    res.status(200).json(users);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
