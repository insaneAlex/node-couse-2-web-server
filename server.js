const express = require('express');
const hbs = require('hbs');
const fs = require('fs')

const port = process.env.PORT || 2000;
let app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');



app.use((req, res, next) => {
    var now = new Date().toString();
    let log = `${now}:${req.method}:${req.url}`;
    //console.log(log);

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log('Unable to append file to server.log');
        }
    });
    next();
})

// app.use('/about',(req, res, next) => {
//     res.render('maintenance.hbs')
// })

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
})

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
})

app.get('/', (req, res) => {
    res.render('home.hbs', {
        welcomeMessage: 'Welcome to my site',
        pageTitle: 'Home Page',
        linkArrdess: '/about',
        linkText: 'About Page'
    });
})

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',

        linkArrdess: '/',
        linkText: 'Home Page'
    });
})

app.listen(port, () => {
    console.log(`Running server on ${port}...`);
});