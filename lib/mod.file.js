module.exports = (plugin, markserv) => {
  const send = require('send');
  const path = require('path');

  return (requestPath, res, req) => {
    return new Promise((resolve, reject) => {
      send(req, path.basename(requestPath), {
        root: path.dirname(requestPath),
        dotfiles: 'allow'
      })
      .on('error', err => {
        markserv.log.error(err);
        reject(err);
      })
      .pipe(res);

      // Explicitly return nothing to the request handler
      resolve(null);
    });
  };
};
