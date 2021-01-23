import { deepFreeze, checkInstanceOf, GoNext } from '../components/helpers.js';


const checkEventNamePossible = (events, eventName, cbNext = () => { }) => {
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
const checkDuplicateEventName = (events, eventName, cbNext = () => { }) => {
    if (events[eventName] !== undefined) {
        console.warn(new Error(`'${eventName}' eventName duplicate`));
        return;
    }
    cbNext();
};


export default class EventsStorage {
    constructor (possibleEvents = []) {
        const events = Object.create(null);
        this.possibleEvents = undefined;

        this.on = undefined;
        this.off = undefined;
        this.trigger = undefined;


        new GoNext(({ toNext, toError }) => {
            checkInstanceOf({ value: possibleEvents, type: Array, cbOk: toNext, cbFail: toError });
        })
            .next(() => (this.possibleEvents = possibleEvents))
            .error(() => (this.possibleEvents = []));

        this.possibleEvents.forEach((eventName) => {
            new GoNext(({ toNext, toError }) => {
                checkInstanceOf({ value: eventName, type: String, cbOk: toNext, cbFail: toError });
            }).next(({ toNext }) => {
                checkDuplicateEventName(events, eventName, toNext);
            }).next(() => {
                events[eventName] = [];
            });
        });

        this.on = (eventName, eventHandler) => {
            new GoNext(({ toNext }) => {
                checkInstanceOf({ value: eventName, type: String, cbOk: toNext });
            }).next(({ toNext }) => {
                checkInstanceOf({ value: eventHandler, type: Function, cbOk: toNext });
            }).next(({ toNext }) => {
                checkEventNamePossible(events, eventName, toNext);
            }).next(({ toNext }) => {
                checkDuplicateHandler(events, eventName, eventHandler, toNext);
            }).next(() => {
                events[eventName].push(eventHandler);
            });
        };

        this.off = (eventName, eventHandler) => {
            new GoNext(({ toNext }) => {
                checkInstanceOf({ value: eventName, type: String, cbOk: toNext });
            }).next(({ toNext }) => {
                checkInstanceOf({ value: eventHandler, type: Function, cbOk: toNext });
            }).next(({ toNext }) => {
                checkEventNamePossible(events, eventName, toNext);
            }).next(() => {
                events[eventName] = events[eventName].filter((handler) => handler !== eventHandler);
            });
        };

        this.trigger = (eventName, ...args) => {
            new GoNext(({ toNext }) => {
                checkInstanceOf({ value: eventName, type: String, cbOk: toNext });
            }).next(({ toNext }) => {
                checkEventNamePossible(events, eventName, toNext);
            }).next(() => {
                events[eventName].forEach((handler) => handler(...args));
            });
        };

        deepFreeze(this);
    }
}
