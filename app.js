const express = require('express');

const app = express();

app.listen(3000);

//sending index.html
app.get('/', (req,res) => {
    // res.send('<p>home page </p>');
    res.sendFile('./view/index.html', { root: __dirname });
});

//sending about.html
app.get('/about', (req, res) => {
    // res.send('<p>about page</p>');
    res.sendFile('./view/about.html', { root: __dirname });
  });

//redirecting to about.html
app.get('/about-us', (req,res) => {
    res.redirect('/about');
});

//sending 404.html for any invalid link or path
app.use((req,res) => {
    res.status(404).sendFile('./view/404.html', {root: __dirname });
});