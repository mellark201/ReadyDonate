if(process.env.NODE_ENV !== 'production')
{
    require('dotenv').config();
}

const express = require('express');
const app = express();
const expressLayouts = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressSession = require('express-session');
const cookieParser = require('cookie-parser');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('./models/user');

app.use(require('express-session')({
    secret: 'helele',
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.use(function(req, res, next){
    res.locals.currentUser = req.user;
    next();
})

app.set('view engine', 'ejs');
app.set('views', __dirname+'/views');
app.set('layout', 'layouts/layout');
app.use(express.static('public'));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}));
app.use(methodOverride('_method'));

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://shubham:internnhilagi@cluster0.ifudr.mongodb.net/cluster0?retryWrites=true&w=majority',
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        useCreateIndex: true
    });
const db = mongoose.connection;
db.on('error', error => console.log(error));
db.once('open', () => console.log('Connected to Mongoose'));

const indexRouter = require('./routes/index');
const authRouter = require('./routes/auth.js');
const requestRouter = require('./routes/request.js');

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/request', requestRouter);

app.listen(process.env.PORT || 3000);