import { test, expect } from '@jest/globals';
import EventsStorage from '../src/components/EventsStorage.js';


describe('immutable', () => {
    test('can not change the field', () => {
        const eventStorage = new EventsStorage(['firstEvent']);
        const iter = (object) => {
            Object.keys(object).forEach((key) => {
                const replacement = object[key] === 5 ? 6 : 5;
                try {
                    object[key] = replacement;
                } catch (error) { }
                expect(object[key]).not.toEqual(replacement);

                if (object[key] instanceof Object) {
                    iter(object[key]);
                }
            });
        };
        iter(eventStorage);
    });

    test('can not add a field', () => {
        const eventStorage = new EventsStorage(['firstEvent']);
        const iter = (object) => {
            const loopCount = 1000;
            const fieldNamePrefix = 'zzz';
            let newFieldName;
            for (let index = 0; index < loopCount; index++) {
                if (object[`${fieldNamePrefix}${index}`] === undefined) {
                    newFieldName = `${fieldNamePrefix}${index}`;
                    break;
                }
            }

            if (newFieldName === undefined) {
                console.error('test to add new field did not work');
                return;
            }

            try {
                object[newFieldName] = newFieldName;
            } catch (error) { }
            expect(object[newFieldName]).toBeUndefined();


            Object.keys(object).forEach((key) => {
                if (object[key] instanceof Object) {
                    iter(object[key]);
                }
            });
        };
        iter(eventStorage);
    });
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
        expect(warn).toBeCalledWith(new Error('[object Object] value is instanceof Object, not Array'));

        eventStorage.on({}, () => { });
        expect(warn).toBeCalledWith(new Error('[object Object] value is instanceof Object, not String'));

        eventStorage.off([], () => { });
        expect(warn).toBeCalledWith(new Error(' value is instanceof Array, not String'));

        eventStorage.trigger(1, () => { });
        expect(warn).toBeCalledWith(new Error('1 value is instanceof Number, not String'));

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
        expect(warn).toBeCalledWith(new Error('zzz value is instanceof String, not Function'));

        eventStorage.off('event1', 'yyy');
        expect(warn).toBeCalledWith(new Error('yyy value is instanceof String, not Function'));

        warn.mockRestore();
    });
});
