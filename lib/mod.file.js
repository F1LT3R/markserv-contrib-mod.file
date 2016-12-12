const path = require('path');
const send = require('send');

const plugin = (plugin, markserv) => {
	return (requestPath, res, req) => new Promise((resolve, reject) => {
		send(req, path.basename(requestPath), {
			root: path.dirname(requestPath),
			dotfiles: 'allow'
		})
		.on('error', err => {
			markserv.log.error(err);
			reject(err);
		})
		.pipe(res);

		// Explicitly return nothing to the request handler as we are handling
		// the response outselves within this plugin
		resolve(null);
	});
};

module.exports = {
	name: 'markserv-contrib-mod.file',
	plugin
};
