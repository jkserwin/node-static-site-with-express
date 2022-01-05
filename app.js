const express = require('express');
const { links } = require('express/lib/response');
const data = require('./data.json');
const { projects } = data;

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res) => {
    const { id } = req.params;
    const project = projects[id];
    res.render('project', project);
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});