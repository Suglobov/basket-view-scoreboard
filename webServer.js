const express = require('express');
const path = require('path');
const http = require('http');
const WebSocket = require('ws');

const PORT = 8000;
const app = express();

const server = http.createServer(app);
const webSocketServer = new WebSocket.Server({ server });

server.listen(PORT, function () {
    console.log(`Server was started.`);
    console.log(`View page  http://localhost:${PORT}/`);
    console.log(`Settings page  http://localhost:${PORT}/settings`);
});

app.use(express.static(path.resolve(__dirname, './dist')));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/index.html'));
});
app.get('/settings', function (req, res) {
    res.sendFile(path.join(__dirname + '/dist/settings.html'));
});

webSocketServer.on('connection', (client) => {
    client.on('message', (message) => {
        console.log('message', message);
        broadcastJson(webSocketServer.clients, message);
    });

    client.on('close', (message) => {
        console.log('message', message);

    });
});

const sendJson = (client, data) => {
    const dataJson = JSON.stringify(data);
    client.send(dataJson);
};

const broadcastJson = (clients, data) => {
    clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            sendJson(client, data);
        }
    });
};


