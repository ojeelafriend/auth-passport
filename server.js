const express = require('express');
const passport = require('passport');
const cookie = require('cookie-parser');
const session = require('express-session');
const LocalStrategy = require('passport-local').Strategy;
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
app.use(passport.initialize());
app.use(passport.session());

//Object userfield.
const user = {
	id: 10,
	username: 'ojeeldev',
	password: 'ojeeldev',
};

passport.use(
	new LocalStrategy((username, password, done) => {
		if (username === user.username && password === user.password) {
			return done(null, user);
		}
		done(null, false);
	})
);

passport.serializeUser((user, done) => {
	done(null, user.id);
});
passport.deserializeUser((id, done) => {
	done(null, user);
});

app.get('/login', (req, res) => {
	res.render('log');
});

app.get(
	'/',
	(req, res, next) => {
		if (req.isAuthenticated()) {
			return next();
		}
		res.redirect('/login');
	},
	(req, res) => {
		res.send('Passport authenticated from local strategy');
		console.log('Passport authenticated from local strategy');
	}
);

app.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/',
		failureRedirect: '/login',
	})
);

app.listen(3000, () => {
	console.log('Yeah, connect successfully!');
});
