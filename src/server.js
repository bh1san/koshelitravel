
'use strict';
const http = require('http');

const PORT = 8080;
const HOST = '0.0.0.0';

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Test server is running correctly. If you can see this message in your browser, the network and server configuration are OK. The problem is inside the Next.js application.');
});

server.listen(PORT, HOST, () => {
  console.log(`Test server running at http://${HOST}:${PORT}/`);
  console.log('This is a simple test server. It does not run the Next.js application.');
});
