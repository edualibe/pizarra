const express = require('express');
const app = express();
const exphbs = require('express-handlebars');
const path = require('path');
const routes = require('./routes/routes.js');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const MySQLStore = require('express-mysql-session')(session);
const bodyParser = require('body-parser');

const { database } = require('./keys');

require('./passport/local-auth.js');

app.set('port', process.env.PORT || 4000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
  defaultLayout: 'main.hbs',
  layoutsDir: path.join(app.get('views'), 'layouts'),
  partialsDir: path.join(app.get('views'), 'partials'),
  extname: '.hbs',
  helpers: require('./views/helpers/handlebars.hbs')
}))
app.set('view engine', '.hbs');

app.use(express.static(path.join(__dirname,'public')));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use(session({
  secret: 'secretsessionmysql',
  resave: false,
  saveUninitialized: false,
  store: new MySQLStore(database)
}));

app.use(flash());
app.use(passport.initialize());
app.use(passport.session());
app.use((req, res, next) => {
    app.locals.signinMessage = req.flash('signinMessage');
    //app.locals.user = req.user;
    //console.log(app.locals)
    next();
  });

app.use(routes);

app.listen(app.get('port'),()=>{
    console.log('Server on http://localhost:'+app.get('port'));
});