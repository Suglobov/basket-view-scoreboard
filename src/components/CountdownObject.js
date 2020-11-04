import Countdown from './Countdown.js';
import EventsStorage from './EventsStorage.js';

class CountdownObject {
    constructor() {
        this.timer = new Countdown({ fullTenthsMax: 6000 });
        this.counter24 = new Countdown({ fullTenthsMax: 240 });
        this.events = new EventsStorage([
            'zero',
            'change',
            'minusTenths',
            'changeParts',
        ]);
    }
    _correctCounter24() {
        if (this.counter24.fullTenths > this.timer.fullTenths) {
            this.counter24.changeTenths(this.timer.fullTenths);
        }
        return this;
    }
    _getPrevValues() {
        return {
            timer: {
                fullTenths: this.timer.fullTenths,
                tenths: this.timer.tenths,
                seconds: this.timer.seconds,
                minutes: this.timer.minutes,
            },
            counter24: {
                fullTenths: this.counter24.fullTenths,
                tenths: this.counter24.tenths,
                seconds: this.counter24.seconds,
                minutes: this.counter24.minutes,
            },
        };
    }
    changeParts({ timer, counter24 }) {
        const prevValues = this._getPrevValues();
        if (timer !== undefined) {
            const { tenths, seconds, minutes } = timer;
            this.timer.changeParts({ tenths, seconds, minutes });
        }
        if (counter24 !== undefined) {
            const { tenths, seconds, minutes } = counter24;
            this.counter24.changeParts({ tenths, seconds, minutes });
        }
        this._correctCounter24();
        this.events.trigger('change', prevValues);
        this.events.trigger('changeParts', prevValues);
    }
    checkForZero() {
        const isZero = this.timer.fullTenths === 0;
        if (isZero) {
            this.events.trigger('zero');
        }
        return this;
    }
    minusTenth() {
        if (this.timer.fullTenths === 0) {
            this._correctCounter24();
            return this;
        }
        const prevValues = this._getPrevValues();
        this.timer.changeTenths(this.timer.fullTenths - 1);
        this.counter24.changeTenths(this.counter24.fullTenths - 1);
        this._correctCounter24();
        this.events.trigger('change', prevValues);
        this.events.trigger('minusTenths', prevValues);
        return this;
    }
}

export default CountdownObject;
