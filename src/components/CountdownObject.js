import CountdownTimer from './CountdownTimer.js';
import ValueComponent from './ValueComponent.js';
import EventsStorage from './EventsStorage.js';

class CountdownObject {
    constructor() {
        this.time = new CountdownTimer([
            new ValueComponent({ value: 0, min: 0, max: 9 }),
            new ValueComponent({ value: 0, min: 0, max: 59 }),
            new ValueComponent({ value: 0, min: 0, max: 10 }),
        ]);
        this.counter24 = new CountdownTimer([
            new ValueComponent({ value: 0, min: 0, max: 9 }),
            new ValueComponent({ value: 0, min: 0, max: 24 }),
        ]);
        this.events = new EventsStorage([
            'changed',
            'zero',
        ]);
    }
    change({ tenthsOfSecond, seconds, minutes, counter24 }) {
        this.time.change([tenthsOfSecond, seconds, minutes]);
        this.counter24.change([tenthsOfSecond, counter24]);
        this.syncTenth().correctCounter24();
        const maxChangedIndex = Math.max(
            [tenthsOfSecond, seconds, minutes].reduce((acc, elem, index) => elem === undefined ? acc : index, 0),
            [tenthsOfSecond, counter24].reduce((acc, elem, index) => elem === undefined ? acc : index, 0),
        );
        this.events.trigger('changed', maxChangedIndex);
        return this;
    }
    give() {
        return {
            time: this.time.give(),
            counter24: this.counter24.give(),
        };
    }
    syncTenth() {
        this.counter24.change([this.time.give()[0].value]);
        return this;
    }
    correctCounter24() {
        const times = this.time.give();
        const counter24s = this.counter24.give();
        if (
            times[2].value === times[2].min
            && times[1].value < counter24s[1].value
        ) {
            counter24s[1].setValue(times[1].value);
        }
        return this;
    }
    checkForZero() {
        const isZero = this.time.isZero();
        if (isZero) {
            this.events.trigger('zero');
        }
        return this;
    }
    minus1() {
        const maxChangedIndex = this.time.minus1();
        this.counter24.minus1();

        if (maxChangedIndex !== -1) {
            this.events.trigger('changed', maxChangedIndex);
        }
        return this;
    }
}

export default CountdownObject;
