\const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

const validateData = (data) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[a-zA-Z]+$/;

    if (!emailRegex.test(data.email)) {
        return { isValid: false, message: 'Неправильный формат' };
    }

    if (!nameRegex.test(data.name)) {
        return { isValid: false, message: 'Неправильный формат' };
    }

    return { isValid: true };
};

app.post('/users', (req, res) => {
    const data = req.body;
    const validationResult = validateData(data);

    if (!validationResult.isValid) {
        return res.status(400).json({ error: validationResult.message });
    }

    res.status(201).json({ message: 'Создание пользлователя успешно' });
});

app.put('/users/:id', (req, res) => {
    const data = req.body;
    const validationResult = validateData(data);

    if (!validationResult.isValid) {
        return res.status(400).json({ error: validationResult.message });
    }

    res.status(200).json({ message: 'Обновление успешно' });
});

app.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    const userIdRegex = /^[0-9a-fA-F]{24}$/; d

    if (!userIdRegex.test(userId)) {
        return res.status(400).json({ error: 'Ошибка ID пользователся' });
    }

    res.status(200).json({ message: 'Удаление пользователя успешно' });
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
