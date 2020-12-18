// import { test, expect } from 'jest';
import TimerTenths2 from '../src/components/TimerTenths2.js';

const timerTenths2 = new TimerTenths2({ maxValue: 625 });

test('immutable', () => {
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

    iter(timerTenths2);
});
