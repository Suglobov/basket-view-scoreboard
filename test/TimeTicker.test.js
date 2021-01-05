import { test, expect } from '@jest/globals';
import TimeTicker from '../src/components/TimeTicker.js';


describe('immutable', () => {
    test('can not change the field', () => {
        const instance = new TimeTicker();
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
        iter(instance);
    });

    test('can not add a field', () => {
        const instance = new TimeTicker();
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
        iter(instance);
    });
});

test('time tick', (done) => {
    const startTickJestMock = jest.fn();
    const stopTickJestMock = jest.fn();
    const tickJestMock = jest.fn();

    const instance = new TimeTicker({ delayMs: 100 });
    expect(instance.delayMs).toBe(100);

    instance.events.on('startTick', () => {
        startTickJestMock(10);
    });
    instance.events.on('stopTick', () => {
        stopTickJestMock(500);
    });

    let index = 1;
    instance.events.on('tick', () => {
        tickJestMock(index);
        index += 5;
    });

    instance.startTick();
    instance.startTick();
    instance.startTick();

    setTimeout(() => {
        instance.stopTick();
        instance.stopTick();
        instance.stopTick();

        expect(startTickJestMock).toHaveBeenCalledTimes(1);
        expect(startTickJestMock).toHaveBeenCalledWith(10);

        expect(stopTickJestMock).toHaveBeenCalledTimes(1);
        expect(stopTickJestMock).toHaveBeenCalledWith(500);

        expect(tickJestMock).toHaveBeenCalledTimes(2);
        expect(tickJestMock).toHaveBeenNthCalledWith(1, 1);
        expect(tickJestMock).toHaveBeenNthCalledWith(2, 6);

        done();
    }, 250);
});

describe('errors', () => {
    test('input params', () => {
        const warn = jest.spyOn(global.console, 'warn').mockImplementation();

        // eslint-disable-next-line no-new
        new TimeTicker({ delayMs: {} });
        expect(warn).toBeCalledWith(new Error('\'[object Object]\' delayMs not integer'));

        warn.mockRestore();
    });
});
