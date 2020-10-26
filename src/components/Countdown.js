import IntegerNumber from './IntegerNumber.js';
import EventsStorage from './EventsStorage.js';

export default class Countdown {
    constructor() {
        this._tenths;
        this._seconds;
        this._minutes;
        this._rules;
        this._rulesReverce;
        this.events;

        this._tenths = new IntegerNumber({ min: 0, max: 9, val: 0 });
        this._seconds = new IntegerNumber({ min: 0, max: 59, val: 0 });
        this._minutes = new IntegerNumber({ min: 0, max: 10, val: 0 });

        this._rules = ['tenths', 'seconds', 'minutes'];
        this._rulesReverce = this._rules.slice().reverse();

        this.events = new EventsStorage(['zero', 'change', 'setFromOther']);
    }
    give() {
        return {
            tenths: this._tenths,
            seconds: this._seconds,
            minutes: this._minutes,
        };
    }
    lessEqualLarger(countdown) {
        if (countdown instanceof Countdown === false) {
            console.error(`${countdown} is not instance of Countdown`);
            return this;
        }

        const lessEqualLarger = this._rulesReverce.reduce((res, rule) => {
            if (res === 'less' || res === 'larger') {
                return res;
            }
            const thisVal = this.give()[rule].give().val;
            const incomeVal = countdown.give()[rule].give().val;
            if (thisVal < incomeVal) {
                res = 'less';
            }
            if (thisVal > incomeVal) {
                res = 'larger';
            }
            return res;
        }, 'equal');
        return lessEqualLarger;
    }
    setValues(options) {
        const changedFields = [];
        this._rules.forEach((rule) => {
            if (options[rule] === undefined) {
                return;
            }
            changedFields.push(rule);
            const integerNumber = this.give()[rule];
            integerNumber.change({ val: options[rule] });
        });
        this.events.trigger('change', changedFields);
        return this;
    }
    setValuesFrom(countdown) {
        if (countdown instanceof Countdown === false) {
            console.error(`${countdown} is not instance of Countdown`);
            return this;
        }
        Object.entries(countdown.give())
            .forEach(([key, val]) => {
                this.give()[key].change({ val: val.give().val });
            });
        this.events.trigger('setFromOther');
    }
    checkForZero() {
        const isZero = this._rules.every((rule) => {
            const integerNumber = this.give()[rule];
            return integerNumber.give().val === integerNumber.give().min;
        });
        if (isZero) {
            this.events.trigger('zero');
        }
        return this;
    }
    minusTenth() {
        const changedFields = [];
        const firstNoMinIndex = this._rules.findIndex((rule) => {
            const integerNumber = this.give()[rule];
            return integerNumber.give().val > integerNumber.give().min;
        });
        if (firstNoMinIndex === -1) {
            return this;
        }
        this._rules.forEach((rule, index) => {
            const integerNumber = this.give()[rule];
            const val = integerNumber.give().val;
            if (index < firstNoMinIndex) {
                changedFields.push(rule);
                integerNumber.setToMax();
            }
            if (index === firstNoMinIndex) {
                changedFields.push(rule);
                integerNumber.change({ val: val - 1 });
            }
        });

        this.events.trigger('change', changedFields);
        return this;
    }
}
