const e = require('express');
const express = require('express');
const { links } = require('express/lib/response');
const data = require('./data.json');
const { projects } = data;

const app = express();

app.use('/static', express.static('public'));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
    res.render('index', { projects });
});

app.get('/about', (req, res) => {
    res.render('about');
});

app.get('/projects/:id', (req, res, next) => {
    const { id } = req.params;
    const project = projects[id];

    if (project) {
        res.render('project', project);
    } else {
        next();
    }

});

// 404 error handler

app.use((req, res, next) => {
    const err = new Error('404: Page not found');
    err.status = 404;
    console.error("404: Page not found");
    res.render('page-not-found', {err});
});

// Global error handler

app.use((err, req, res, next) => {
    err.message = err.message || `Oops! Looks like there was a server error: ${err.status}.`;
    res.status(err.status || 500);
    res.render('error', {err})
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000');
});