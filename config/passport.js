const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

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
