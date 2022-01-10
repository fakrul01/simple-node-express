const express = require('express');
const res = require('express/lib/response');
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());

const port = process.env.PORT || 5000;

app.get('/', (req, res) => {
    res.send('Hello from node server to learn');
});

const users = [
    { id: 0, name: 'fakrul', email: 'fakrul@gmail.com' },
    { id: 1, name: 'jahid', email: 'jahid@gmail.com' },
    { id: 2, name: 'rahim', email: 'rahim@gmail.com' },
    { id: 3, name: 'karim', email: 'karim@gmail.com' },
    { id: 4, name: 'jalal', email: 'jalal@gmail.com' },
    { id: 5, name: 'kamal', email: 'kamal@gmail.com' }
]

// app.get('/users', (req, res) => {
//     res.send(users);
// });


app.get('/users', (req, res) => {
    const search = req.query.search;
    //use query parameter
    if (search) {
        const searchResult = users.filter(user => user.name.toLocaleLowerCase().includes(search));
        res.send(searchResult);
    }
    else {
        res.send(users);
    }
});

//app.METHOD
app.post('/users', (req, res) => {
    const newUser = req.body;
    newUser.id = users.length;
    users.push(newUser);
    console.log('post hitting on the server', req.body);
    // res.send(JSON.stringify(newUser));
    res.json(newUser);
})

// dynamic api
app.get('/users/:id', (req, res) => {
    const id = req.params.id;
    const user = users[id];
    res.send(user);
});

app.listen(port, () => {
    console.log('listing to port ', port);
});