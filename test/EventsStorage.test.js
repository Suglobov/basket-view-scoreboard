import { test, expect } from '@jest/globals';
import EventsStorage from '../src/components/EventsStorage.js';


test('immutable', () => {
    const eventStorage = new EventsStorage(['firstEvent']);

    const iter = (object) => {
        Object.keys(object).forEach((key) => {
            const replacement = object[key] === 5 ? 6 : 5;
            try {
                object[key] = replacement;
            } catch (error) {

            }
            expect(object[key]).not.toEqual(replacement);

            if (object[key] instanceof Object) {
                iter(object[key]);
            }
        });
    };

    iter(eventStorage);
});

test('on off trigger', () => {
    const jestMock = jest.fn();
    const event1Handler = (x) => {
        jestMock(x);
    };

    const eventStorage = new EventsStorage(['event1', 'event2']);
    expect(eventStorage.possibleEvents).toEqual(['event1', 'event2']);

    eventStorage.on('event1', event1Handler);
    eventStorage.trigger('event1', 100);
    expect(jestMock).toHaveBeenCalledTimes(1);
    expect(jestMock).toHaveBeenCalledWith(100);

    eventStorage.off('event1', event1Handler);
    eventStorage.trigger('event1', 100);
    expect(jestMock).toHaveBeenCalledTimes(1);
});

describe('errors', () => {
    test('input param', () => {
        const warn = jest.spyOn(global.console, 'warn').mockImplementation();

        const eventStorage = new EventsStorage({ z: 1 });
        expect(warn).toBeCalledWith(new Error('possibleEvents not array'));

        eventStorage.on({}, () => { });
        expect(warn).toBeCalledWith(new Error('\'[object Object]\' not string'));

        eventStorage.off([], () => { });
        expect(warn).toBeCalledWith(new Error('\'\' not string'));

        eventStorage.trigger(1, () => { });
        expect(warn).toBeCalledWith(new Error('\'1\' not string'));

        eventStorage.on('test', () => {});
        expect(warn).toBeCalledWith(new Error('\'test\' eventName not possible'));

        eventStorage.off('test', () => { });
        expect(warn).toBeCalledWith(new Error('\'test\' eventName not possible'));

        eventStorage.trigger('test', () => { });
        expect(warn).toBeCalledWith(new Error('\'test\' eventName not possible'));

        warn.mockRestore();
    });

    test('duplicate eventNames', () => {
        const warn = jest.spyOn(global.console, 'warn').mockImplementation();

        // eslint-disable-next-line no-new
        new EventsStorage(['duplicate', 'duplicate']);
        expect(warn).toBeCalledWith(new Error('\'duplicate\' eventName duplicate'));

        warn.mockRestore();
    });

    test('duplicate eventHandler', () => {
        const event1Handler = () => { };
        const warn = jest.spyOn(global.console, 'warn').mockImplementation();

        const eventStorage = new EventsStorage(['event']);
        eventStorage.on('event', event1Handler);
        eventStorage.on('event', event1Handler);
        expect(warn).toBeCalledWith(new Error('\'function event1Handler() {}\' eventHandler duplicate'));

        warn.mockRestore();
    });

    test('wrong handler', () => {
        const warn = jest.spyOn(global.console, 'warn').mockImplementation();

        const eventStorage = new EventsStorage(['event1', 'event2']);

        eventStorage.on('event1', 'zzz');
        expect(warn).toBeCalledWith(new Error('\'zzz\' not function'));

        eventStorage.off('event1', 'yyy');
        expect(warn).toBeCalledWith(new Error('\'yyy\' not function'));

        warn.mockRestore();
    });
});
