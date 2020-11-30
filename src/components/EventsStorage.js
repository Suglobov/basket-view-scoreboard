export default class EventsStorage {
    constructor (posibleEvents = []) {
        if (Array.isArray(posibleEvents) === false) {
            console.error(new Error('posibleEvents not array'));
            return;
        }
        this.events = {};
        posibleEvents.forEach((eventName) => {
            if (typeof eventName !== 'string') {
                console.error(new Error(`'${eventName}' eventName not string`));
                return;
            }
            this.events[eventName] = [];
        });

        Object.freeze(this.events);
        Object.freeze(this);
    }

    _checkEventName (eventName = '', cbSuccess = () => { }) {
        if (typeof eventName !== 'string') {
            console.error(new Error(`'${eventName}' eventName not string`));
            return;
        }
        if (this.events[eventName] === undefined) {
            console.error(new Error(`not posible eventName '${eventName}'`));
            return;
        }
        cbSuccess();
    }

    _checkEventNameAndHandler (eventName = '', eventHandler = () => {}, cbSuccess = () => { }) {
        this._checkEventName(eventName, () => {
            if ((eventHandler instanceof Function) === false) {
                console.error(new Error(`'${eventHandler}' eventHandler not function`));
                return;
            }
            cbSuccess();
        });
    }

    on (eventName = '', eventHandler = () => { }) {
        this._checkEventNameAndHandler(eventName, eventHandler, () => {
            this.events[eventName].push(eventHandler);
        });
    }

    off (eventName = '', eventHandler = () => { }) {
        this._checkEventNameAndHandler(eventName, eventHandler, () => {
            this.events[eventName] = this.events[eventName].filter((handler = () => { }) => handler !== eventHandler);
        });
    }

    trigger (eventName = '', ...args) {
        this._checkEventName(eventName, () => {
            this.events[eventName].forEach((handler = (..._args) => { }) => handler(...args));
        });
    }
}
