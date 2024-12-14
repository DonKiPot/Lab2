const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());
й
let users = [
    { id: 1, name: 'Джон', age: 30 },
    { id: 2, name: 'Джейн', age: 25 },
    { id: 3, name: 'Джан', age: 28 },
    { id: 4, name: 'Алиса', age: 30 }
];

app.get('/api/users', (req, res) => {
    const { name, age } = req.query;

    let filteredUsers = users;

    if (name) {
        filteredUsers = filteredUsers.filter(user => user.name.includes(name));
    }

    if (age) {
        filteredUsers = filteredUsers.filter(user => user.age == age);
    }

    res.status(200).json(filteredUsers);
});

app.listen(port, () => {
    console.log(`http://localhost:${port}`);
});
