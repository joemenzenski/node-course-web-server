const fs = require('fs');

const express = require('express');
const hbs = require('hbs');

// heroku port
const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');


// simple logging middleware
app.use((request, response, next) => {

    const now = new Date().toString();
    const log = `${now}: ${request.method} ${request.url}`;
    console.log(log);

    fs.appendFile('server.log', log + '\n', (error) => {
        if (error) {
            console.log('Unable to append to server.log');
        }
    });
    next();

});

// app.use((request, response, next) => {
//     response.render('maintenance.hbs');
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => new Date().getFullYear() );
hbs.registerHelper('screamIt', (text) => text.toUpperCase() );

app.get('/', (request, response) => {
    
    response.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome!!!'
    });

});

app.get('/about', (request, response) => {
    
    response.render('about.hbs', {
        pageTitle: 'About Page'
    });

});

app.get('/bad', (request, response) => {
    response.send({
        errorMessage: 'This is an error'
    });
});

app.listen(port, () => {
    console.log(`Server is up on port ${port}!`);
});