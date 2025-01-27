const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const path = require('path');
const employeeRoutes = require('./routes/employee');
const authRoutes = require('./routes/auth');
require('./config/passport')(passport);

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/employeeDB', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(session({
    secret: 'your_secret_key',
    resave: false,
    saveUninitialized: true,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.set('view engine', 'ejs');

app.use((req, res, next) => {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.user = req.user;
    next();
});

app.use(express.static(path.join(__dirname, 'public')));

app.use('/', employeeRoutes);
app.use('/', authRoutes);

app.get('/', (req, res) => {
    res.render('index', { title: 'Home' });
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port: http://localhost:${PORT}`);
});