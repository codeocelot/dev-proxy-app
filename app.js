const http = require('http');
const request = require('request');

const port = 9090;

const PROXY_BASE_URL = 'https://edge-api.yewno.com';

const requestHandler = (req, response) => {
  request({ url: `${PROXY_BASE_URL}/${req.url}`, encoding: null })
    .on('response', (r) => {
      response.set(r.headers);
    })
    .on('error', (...args) => {
      console.error('error', args);
    })
    .pipe(response);
};

const server = http.createServer(requestHandler);

server.listen(port, (err) => {
  if (err) {
    return console.error('something bad happened', err);
  }

  console.log(`server is listening on ${port}`);
});
