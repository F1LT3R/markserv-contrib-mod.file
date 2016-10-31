const markserv = require.main.exports.plugin;

markserv(Markconf => {
  const send = require('send');
  const path = require('path');

  return (requestPath, res, req) => {
    console.log(res, req);
    return new Promise((resolve, reject) => {

      send(req, path.basename(requestPath), {
        root: path.dirname(requestPath)
      })
      .pipe(res);

      // Explicitly return nothing to the request handler
      return null;
    });
  };
});
