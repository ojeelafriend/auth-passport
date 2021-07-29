const express = require('express');
const passport = require('passport');
const cookie = require('cookie-parser');
const session = require('express-session');
const routes = require('./routes/network');
const app = express();

//Settings received and view engine
app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: false }));

//Sessions and cookies
app.use(cookie('top secret'));
app.use(
	session({
		secret: 'top secret',
		resave: true,
		saveUninitialized: true,
	})
);
//Passport config
require('./config/passport');
app.use(passport.initialize());
app.use(passport.session());

//Routes
routes(app);

app.listen(3000, () => {
	console.log('Yeah, connect successfully!');
});
