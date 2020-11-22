const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');
const { render } = require('ejs');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

//connect to MongoDB
const dbURI = 'mongodb+srv://Jonathan:Chata2001@cluster0.yisv5.mongodb.net/node-tuts?retryWrites=true&w=majority'
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));


app.set('view engine', 'ejs');

app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true}));
app.use(express.static('public'));

//mongoose and mongo sandbox routes
app.get('/add-blog', (req, res) => {
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  });

  blog.save()
  .then((result) => {
    res.send(result)
  })
  .catch((err) => {
    console.log(err);
  });
})

app.get('/all-blogs', (req, res) => {
  Blog.find()
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5fb9961f3917923dc4da6508')
  .then((result) => {
    res.send(result);
  })
  .catch((err) => {
    console.log(err);
  });
});

app.get('/', (req, res) => {
    res.redirect('/blogs');
  });

  // app.use((req, res, next) => {
  //   console.log('new request made:');
  //   console.log('host: ', req.hostname);
  //   console.log('path: ', req.path);
  //   console.log('method: ', req.method);
  //   next();
  // });

  // app.use((req, res, next) => {
  //   console.log('in the next middleware');
  //    next();
  //  });

//sending index.html

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
  });

  app.use('/blogs', blogRoutes);

  // 404 page
  app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
  });

// app.get('/', (req,res) => {
//     // res.send('<p>home page</p>');
//     res.sendFile('./views/index.html', { root: __dirname});
// })

// //sending about.html
// app.get('/about', (req,res) => {
//     // res.send('<p>About page</p>');
//     res.sendFile('./views/about.html', { root: __dirname});
// })

// //redirect to about page
// // app.get('/about-us', (req,res) => {
// //     res.redirect('/about');
// // })
// app.use((req,res) => {
//     res.status(404).sendFile('./views/404.html', {root: __dirname});
// })
