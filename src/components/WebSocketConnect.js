class WebSocketConnect {
    constructor(options = {}) {
        const {
            url,
            reconnectMsTimeout = false, // int | false
            messageJSONCallback = () => { },
        } = options;

        this.url = url;
        this.reconnectMsTimeout = reconnectMsTimeout;
        this.messageJSONCallback = messageJSONCallback;

        this.ws;

        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.listen();
    }

    listen() {
        this.ws.addEventListener('error', (error) => {
            console.log('WebSocketConnect error:', error);
        });

        this.ws.addEventListener('open', () => {
            console.log('WebSocket connection established');
        });

        this.ws.addEventListener('close', () => {
            if (this.reconnectMsTimeout === false) {
                return;
            }

            setTimeout(() => this.connect(this.url), this.reconnectMsTimeout);
        });

        this.ws.addEventListener('message', (messageEvent) => {
            this.messageJSONCallback(JSON.parse(messageEvent.data));
        });
    }

    sendJSON(data) {
        const dataJSON = JSON.stringify(data);
        this.ws.send(dataJSON);
    }
}

export default WebSocketConnect;
