import { test, expect } from '@jest/globals';
import TimerTenths2 from '../src/components/TimerTenths2.js';

describe('immutable', () => {
    test('can not change the field', () => {
        const instance = new TimerTenths2({ maxValue: 625 });
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
        const instance = new TimerTenths2({ maxValue: 625 });
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
