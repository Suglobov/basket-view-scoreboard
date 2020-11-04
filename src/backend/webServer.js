const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const PORT = 8000;
const app = express();

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

server.listen(PORT, function () {
    console.log('Server was started.');
    console.log(`View page  http://localhost:${PORT}/`);
    console.log(`Settings page  http://localhost:${PORT}/settings`);
});

const basePath = path.resolve(__dirname, './../..');
const staticPath = path.resolve(basePath, './dist');
const settingsPath = path.resolve(basePath, './dist/settings.html');
const viewPath = path.resolve(basePath, './dist/index.html');

app.use(express.static(staticPath));
app.get('/', function (req, res) {
    res.sendFile(viewPath);
});
app.get('/settings', function (req, res) {
    res.sendFile(settingsPath);
});

webSocketServer.on('connection', (client) => {
    client.on('message', (message) => {
        console.log('message', message);
        webSocketServer.clients.forEach((client) => {
            client.send(message);
        });
    });

    client.on('close', (close) => {
        console.log('close', close);
    });
});
