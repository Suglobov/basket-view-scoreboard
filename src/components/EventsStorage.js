import { waterFall, deepFreeze } from '../components/helpers.js';

const checkString = (string, cbNext = () => { }) => {
    if (typeof string !== 'string') {
        console.warn(new Error(`'${string}' not string`));
        return;
    }

    cbNext();
};

const checkFunction = (func, cbNext = () => {}) => {
    if (func instanceof Function === false) {
        console.warn(new Error(`'${func}' not function`));
        return;
    }

    cbNext();
};

const checkDuplicateEventName = (events, eventName, cbNext = () => { }) => {
    if (events[eventName] !== undefined) {
        console.warn(new Error(`'${eventName}' eventName duplicate`));
        return;
    }

    cbNext();
};

const checkEventName = (events, eventName, cbNext = () => { }) => {
    if (events[eventName] === undefined) {
        console.warn(new Error(`'${eventName}' eventName not possible`));
        return;
    }

    cbNext();
};

const checkDuplicateHandler = (events, eventName, eventHandler, cbNext = () => { }) => {
    if (events[eventName].some((handler) => handler === eventHandler)) {
        console.warn(new Error(`'${eventHandler}' eventHandler duplicate`));
        return;
    }

    cbNext();
};

export default class EventsStorage {
    constructor (possibleEvents = []) {
        const events = Object.create(null);
        this.possibleEvents = possibleEvents;

        this.on = undefined;
        this.off = undefined;
        this.trigger = undefined;


        if (Array.isArray(possibleEvents) === false) {
            console.warn(new Error('possibleEvents not array'));
            this.possibleEvents = [];
        }


        this.possibleEvents.forEach((eventName) => {
            waterFall(
                (cbNext) => checkString(eventName, cbNext),
                (cbNext) => checkDuplicateEventName(events, eventName, cbNext),
                () => (events[eventName] = []),
            );
        });

        this.on = (eventName, eventHandler) => {
            waterFall(
                (cbNext) => checkString(eventName, cbNext),
                (cbNext) => checkEventName(events, eventName, cbNext),
                (cbNext) => checkFunction(eventHandler, cbNext),
                (cbNext) => checkDuplicateHandler(events, eventName, eventHandler, cbNext),
                () => events[eventName].push(eventHandler),
            );
        };

        this.off = (eventName, eventHandler) => {
            waterFall(
                (cbNext) => checkString(eventName, cbNext),
                (cbNext) => checkEventName(events, eventName, cbNext),
                (cbNext) => checkFunction(eventHandler, cbNext),
                () => (events[eventName] = events[eventName].filter((handler) => handler !== eventHandler)),
            );
        };

        this.trigger = (eventName, ...args) => {
            waterFall(
                (cbNext) => checkString(eventName, cbNext),
                (cbNext) => checkEventName(events, eventName, cbNext),
                () => (events[eventName].forEach((handler) => handler(...args))),
            );
        };

        deepFreeze(this);
    }
}
