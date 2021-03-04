const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');
const cookieParser = require('cookie-parser');
const { requireAuth, checkUser } = require('./middleware/authMiddleware');



// express app
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
// connect to mongodb & listen for requests
const dbURI = "mongodb+srv://Krithika18:leosmileaf@cluster0.cst58.mongodb.net/project?";

mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(process.env.PORT || 3000))
  .catch(err => console.log(err));




// register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));
app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

// routes
app.get('/', (req, res) => {
  res.render('login', { title: 'Login' });
});

app.get('/', (req, res) => {
  res.redirect('/reservations');
});



app.get('/about', (req, res) => {
  res.render('about', { title: 'About' });
});


app.get('/signup', (req, res) => {
  res.render('signup', { title: 'Signup' });
});


const methodOverride = require("method-override");
app.use(methodOverride("_method", {
  methods: ["POST", "GET"]
}));


// blog routes
app.use('/reservations', blogRoutes);
app.get('*', checkUser);
app.use(authRoutes);

app.get('/wronglogin', (req, res) => {
  res.render('wronglogin', { title: 'Try Again' });
});
// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});

app.get('/', (req, res) => res.render('/reservations'));
app.get('/reservations', requireAuth, (req, res) => res.render('reservations'));
