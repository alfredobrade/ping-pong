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


// import { sum } from './src/math.js';
// // const math = require('./src/math.js');

// console.log(sum(2, 3)); // Output: 5

import http from 'http';
import { appendTask } from './src/file-persistence/tasks-fs-persistence.js'//'./src/persistence/tasks-persistence.js';


const server = http.createServer((req, res) => {
  if (req.method === 'GET' && req.url === '/ping') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'pong' }));
  } else if (req.method === 'POST' && req.url === '/tasks/create') {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => {
      const data = JSON.parse(body);   // si viene JSON
      console.log("Task recibida:", data.task);
      try {
        appendTask( data.task );
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'Task created' }));
      } catch (error) {
        console.error("Error adding task:", error);
        res.writeHead(500, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ error: 'Internal server error' }));
        return;
      }
    });

  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
  }
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});