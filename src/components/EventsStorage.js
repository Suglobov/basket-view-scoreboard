class EventsStorage {
    constructor(posibleEvents = []) {
        this.events = {};
        posibleEvents.forEach((eventName) => {
            this.events[eventName] = [];
        });
    }
    on(eventName, eventHandler) {
        if (this.events[eventName] === undefined) {
            console.log('not posible eventName');
        }
        this.events[eventName].push(eventHandler);
    }
    off(eventName, eventHandler) {
        if (this.events[eventName] === undefined) {
            console.log('not posible eventName');
        }
        this.events[eventName].filter((handler) => handler !== eventHandler);
    }
    trigger(eventName, ...args) {
        if (this.events[eventName] === undefined) {
            console.log('not posible eventName');
        }
        this.events[eventName].forEach((handler) => handler(...args));
    }
}

export default EventsStorage;
