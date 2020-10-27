import EventsStorage from './EventsStorage.js';

export default class {
    constructor({ fullTenthsMax = 0 }) {
        if (Number.isInteger(fullTenthsMax) === false) {
            console.error(`${fullTenthsMax} is not integer`);
            return this;
        }

        this.TENTHS_IN_SECONDS = 10;
        this.TENTHS_IN_MINUTES = 600;
        this._fullTenthsMax = fullTenthsMax;
        this.fullTenths = 0;
        this.tenths = 0;
        this.seconds = 0;
        this.minutes = 0;

        this.events = new EventsStorage(['zero', 'change']);
    }
    valueOf() {
        return this.fullTenths;
    }
    changeTenths(value) {
        if (Number.isInteger(value) === false) {
            console.error(`${value} is not integer`);
            return this;
        }

        const prevValues = {
            fullTenths: this.fullTenths,
            tenths: this.tenths,
            seconds: this.seconds,
            minutes: this.minutes,
        };

        if (value >= 0 && value <= this._fullTenthsMax) {
            this.fullTenths = value;
        } else if (value < 0) {
            this.fullTenths = 0;
        } else if (value > this._fullTenthsMax) {
            this.fullTenths = this._fullTenthsMax;
        } else {
            console.error('imposible');
            return this;
        }

        this.minutes = Math.floor(this.fullTenths / this.TENTHS_IN_MINUTES);
        this.seconds = Math.floor((this.fullTenths - this.minutes * this.TENTHS_IN_MINUTES) / this.TENTHS_IN_SECONDS);
        this.tenths = this.fullTenths - this.minutes * this.TENTHS_IN_MINUTES - this.seconds * this.TENTHS_IN_SECONDS;

        this.events.trigger('change', prevValues);
        return this;
    }
    changeParts({ tenths, seconds, minutes }) {
        const fullTenths = (tenths === undefined ? this.tenths : tenths)
            + (seconds === undefined ? this.seconds : seconds) * this.TENTHS_IN_SECONDS
            + (minutes === undefined ? this.minutes : minutes) * this.TENTHS_IN_MINUTES;
        this.changeTenths(fullTenths);
        return this;
    }
}
