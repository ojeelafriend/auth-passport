const signin = require('../signin/network');
const panel = require('../panel/network');

const routes = (server) => {
	server.use('/login', signin);
	server.use('/panel', panel);
};

module.exports = routes;
