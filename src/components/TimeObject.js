import TimeComponent from './TimeComponent.js';
import EventsStorage from './EventsStorage.js';

class TimeObject {
    constructor() {
        this.tenthsOfSecond = new TimeComponent({
            value: 0, min: 0, max: 9,
        });
        this.seconds = new TimeComponent({
            value: 0, min: 0, max: 59,
        });
        this.minutes = new TimeComponent({
            value: 0, min: 0, max: 10,
        });
        this.counter24 = new TimeComponent({
            value: 0, min: 0, max: 24,
        });

        this.events = new EventsStorage([
            'timeZero',
            'timeChanged',
        ]);
    }
    changeTime({ tenthsOfSecond, seconds, minutes, counter24 }) {
        Object.entries({ tenthsOfSecond, seconds, minutes, counter24 })
            .filter(([, value]) => value !== undefined)
            .forEach(([field, value]) => {
                this[field].setValue(value);
            });
        this.testCaounter24();
        this.events.trigger('timeChanged');
        // TODO надо отправлять список полей, которые поменялись, чтоб можно было выборочно запрос отсылать
    }
    testCaounter24() {
        if (
            this.minutes.value <= 0
            && this.seconds.value < this.counter24.value
        ) {
            this.counter24.setValue(this.seconds.value);
        }
    }
    minusTime() {
        if (
            this.tenthsOfSecond.value === this.tenthsOfSecond.min
            && this.seconds.value === this.seconds.min
            && this.minutes.value === this.minutes.min
        ) {
            this.events.trigger('timeZero');
        } else if (
            this.tenthsOfSecond.value === this.tenthsOfSecond.min + 1
            && this.seconds.value === this.seconds.min
            && this.minutes.value === this.minutes.min
        ) {
            this.tenthsOfSecond.setValue(this.tenthsOfSecond.value - 1);
            this.events.trigger('timeChanged');
            this.events.trigger('timeZero');
        } else if (this.tenthsOfSecond.value > this.tenthsOfSecond.min) {
            this.tenthsOfSecond.setValue(this.tenthsOfSecond.value - 1);
            this.events.trigger('timeChanged');
        } else if (this.seconds.value > this.seconds.min) {
            this.testCaounter24();
            this.counter24.setValue(this.counter24.value - 1);
            this.tenthsOfSecond.setValue(this.tenthsOfSecond.max);
            this.seconds.setValue(this.seconds.value - 1);
            this.events.trigger('timeChanged');
        } else if (this.minutes.value > this.minutes.min) {
            this.testCaounter24();
            this.counter24.setValue(this.counter24.value - 1);
            this.seconds.setValue(this.seconds.max);
            this.minutes.setValue(this.minutes.value - 1);
            this.events.trigger('timeChanged');
        } else {
            console.log('imposible');
        }
    }
}

export default TimeObject;
