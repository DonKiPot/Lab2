const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs').promises;
const app = express();
const port = 3000;

app.use(bodyParser.json());

const readFileAsync = async (filePath) => {
    try {
        const data = await fs.readFile(filePath, 'utf8');
        return data;
    } catch (error) {
        throw new Error(`Ошибка чтения файла: ${error.message}`);
    }
};

const writeFileAsync = async (filePath, data) => {
    try {
        await fs.writeFile(filePath, data, 'utf8');
    } catch (error) {
        throw new Error(`Ошибка записи файла: ${error.message}`);
    }
};

app.post('/write', async (req, res) => {
    const { content } = req.body;
    const filePath = 'output.txt';

    try {
        await writeFileAsync(filePath, content);
        res.status(201).json({ message: 'Файл записан успешно' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/read', async (req, res) => {
    const filePath = 'output.txt';

    try {
        const data = await readFileAsync(filePath);
        res.status(200).json({ content: data });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
