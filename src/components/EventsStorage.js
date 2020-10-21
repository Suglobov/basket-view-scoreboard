class EventsStorage {
    constructor(posibleEvents = [],) {
        this.events = {};
        posibleEvents.forEach((eventName,) => {
            this.events[eventName] = [];
        },);
    }
    on(eventName, eventHandler,) {
        if (this.events[eventName] === undefined) {
            console.warn('not posible eventName', eventName,);
            return this;
        }
        this.events[eventName].push(eventHandler,);
        return this;
    }
    off(eventName, eventHandler,) {
        if (this.events[eventName] === undefined) {
            console.warn('not posible eventName', eventName,);
            return this;
        }
        this.events[eventName] = this.events[eventName]
            .filter((handler,) => handler !== eventHandler,);
        return this;
    }
    trigger(eventName, ...args) {
        if (this.events[eventName] === undefined) {
            console.warn('not posible eventName', eventName,);
            return this;
        }
        this.events[eventName].forEach((handler,) => handler(...args,),);
        return this;
    }
}

export default EventsStorage;
