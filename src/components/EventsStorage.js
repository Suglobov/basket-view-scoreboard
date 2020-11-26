import checkType from './checkType.js';

export default class EventsStorage {
    constructor(posibleEvents = []) {
        checkType(posibleEvents, 'array');
        this.events = {};
        posibleEvents.forEach((eventName) => {
            checkType(eventName, 'string');
            this.events[eventName] = [];
        });

        Object.freeze(this.events);
        Object.freeze(this);
    }

    _checkEvent(eventName = '', successCb = () => { }) {
        if (this.events[eventName] === undefined) {
            console.error('not posible eventName', eventName);
            return;
        }
        successCb();
    }

    on(eventName = '', eventHandler = () => { }) {
        checkType(eventName, 'string');
        checkType(eventHandler, 'function');
        this._checkEvent(eventName, () => {
            this.events[eventName].push(eventHandler);
        });
    }

    off(eventName = '', eventHandler = () => { }) {
        checkType(eventName, 'string');
        checkType(eventHandler, 'function');
        this._checkEvent(eventName, () => {
            this.events[eventName] = this.events[eventName].filter((handler = () => { }) => handler !== eventHandler);
        });
    }

    trigger(eventName = '', ...args) {
        checkType(eventName, 'string');
        this._checkEvent(eventName, () => {
            this.events[eventName].forEach((handler = (..._args) => { }) => handler(...args));
        });
    }
}
