import EventsStorage from './EventsStorage.js';

class WebSocketConnect {
    constructor(options = {}) {
        const {
            url,
            reconnectMsTimeout = false, // int | false
        } = options;

        this.url = url;
        this.reconnectMsTimeout = reconnectMsTimeout;

        this.ws;

        this.events = new EventsStorage([
            'error',
            'open',
            'close',
            'messageJSON',
        ]);

        this.connect();
    }

    connect() {
        this.ws = new WebSocket(this.url);

        this.listen();
    }

    listen() {
        this.ws.addEventListener('error', (error) => {
            this.events.trigger('error', error);
        });

        this.ws.addEventListener('open', () => {
            this.events.trigger('open');
        });

        this.ws.addEventListener('close', () => {
            this.events.trigger('close');
            if (this.reconnectMsTimeout === false) {
                return;
            }

            setTimeout(() => this.connect(this.url), this.reconnectMsTimeout);
        });

        this.ws.addEventListener('message', (messageEvent) => {
            this.events.trigger('messageJSON', JSON.parse(messageEvent.data));
        });
    }

    sendJSON(data) {
        const dataJSON = JSON.stringify(data);
        this.ws.send(dataJSON);
    }
}

export default WebSocketConnect;
