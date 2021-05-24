const express = require('express');
const passport = require('passport');
const router = express.Router();

//No renderiza, probablemente no se este leyendo este componente. "network.js"
router.get('/', (req, res) => {
	res.render('log');
});
router.post(
	'/',
	passport.authenticate('local', {
		successRedirect: '/panel',
		failureRedirect: '/login',
	})
);

module.exports = router;
