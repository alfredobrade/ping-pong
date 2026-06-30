// const http = require('http');

// const PORT = process.env.PORT || 3000;

// const server = http.createServer((req, res) => {
//   if (req.method === 'GET' && req.url === '/ping') {
//     res.writeHead(200, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ message: 'pong' }));
//   } else {
//     res.writeHead(404, { 'Content-Type': 'application/json' });
//     res.end(JSON.stringify({ error: 'Not found' }));
//   }
// });

// server.listen(PORT, () => {
//   console.log(`Server running on http://localhost:${PORT}`);
// });


import { sum } from './src/math.js';
// const math = require('./src/math.js');

console.log(sum(2, 3)); // Output: 5