
import http from 'http';
import { appendTask } from './file-persistence/tasks-fs-persistence.js'//'./persistence/tasks-persistence.js';
import * as tasksPersistence from './persistence/tasks-persistence.js';

const server = http.createServer(async (req, res) => {

    // CORS
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    res.setHeader("Access-Control-Allow-Headers", "Content-Type");

    if (req.method === "OPTIONS") {
        res.writeHead(204);
        res.end();
        return;
    }

    // GET /ping
    if (req.method === 'GET' && req.url === '/ping') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'pong' }));
        handled = true;
    }

    // GET /tasks
    if (req.method === 'GET' && req.url === '/tasks') {

        try {
            const allTasks = await tasksPersistence.getAllTasks();
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(allTasks));
        } catch (error) {
            console.error("Error fetching tasks:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }

        return;

    }

    // POST /tasks/create
    if (req.method === 'POST' && req.url === '/tasks/create') {
        let body = '';

        req.on('data', chunk => {
            body += chunk;
        });

        req.on('end', async () => {
            const data = JSON.parse(body);   // si viene JSON
            console.log("Task recibida:", data.task);
            try {
                appendTask(data.task);
                var result = await tasksPersistence.addTask(data.task);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ task: result, message: 'Task created' }));
            } catch (error) {
                console.error("Error adding task:", error);
                res.writeHead(500, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ error: 'Internal server error' }));
            }
        });
        return;
    }

    // PUT /tasks/complete/:id
    if (req.method === 'PUT' && req.url.startsWith('/tasks/complete/')) {
        const taskId = req.url.split('/')[3];
        console.log("Completing task with ID:", taskId);
        try {
            const result = await tasksPersistence.completeTask(taskId);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ task: result, message: 'Task completed' }));
        } catch (error) {
            console.error("Error completing task:", error);
            res.writeHead(500, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ error: 'Internal server error' }));
        }
        return;
    }

    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ error: 'Not found' }));
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});