class EventsStorage {
    constructor(posibleEvents = []) {
        this.events = {};
        posibleEvents.forEach((eventName) => {
            this.events[eventName] = [];
        });
        Object.freeze(this);
    }

    _checkEvent(eventName, successCb) {
        if (this.events[eventName] === undefined) {
            console.error('not posible eventName', eventName);
            return;
        }
        successCb();
    }

    on(eventName, eventHandler) {
        this._checkEvent(eventName, () => {
            this.events[eventName].push(eventHandler);
        });
    }

    off(eventName, eventHandler) {
        this._checkEvent(eventName, () => {
            this.events[eventName] = this.events[eventName]
                .filter((handler) => handler !== eventHandler);
        });
    }

    trigger(eventName, ...args) {
        this._checkEvent(eventName, () => {
            this.events[eventName].forEach((handler) => handler(...args));
        });
    }
}

export default EventsStorage;
