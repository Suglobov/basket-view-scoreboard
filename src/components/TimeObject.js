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
        this.isCounter24Zero = true;

        this.events = new EventsStorage([
            'timeZero',
            'timeChanged',
        ]);
    }
    changeTime({ tenthsOfSecond, seconds, minutes, counter24 }) {
        const changedFields = [];
        Object.entries({ tenthsOfSecond, seconds, minutes, counter24 })
            .filter(([, value]) => value !== undefined)
            .forEach(([field, value]) => {
                this[field].setValue(value);
                if (field === 'counter24') {
                    if (value > 0) {
                        this.isCounter24Zero = false;
                    }
                }
                changedFields.push(field);
            });
        this.testCounter24();
        this.events.trigger('timeChanged', changedFields);
    }
    testCounter24() {
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
            return;
        }
        if (
            this.tenthsOfSecond.value === this.tenthsOfSecond.min + 1
            && this.seconds.value === this.seconds.min
            && this.minutes.value === this.minutes.min
        ) {
            this.tenthsOfSecond.setValue(this.tenthsOfSecond.value - 1);
            this.events.trigger('timeChanged', ['tenthsOfSecond']);
            this.events.trigger('timeZero');
            return;
        }
        if (this.tenthsOfSecond.value > this.tenthsOfSecond.min) {
            this.tenthsOfSecond.setValue(this.tenthsOfSecond.value - 1);
            this.events.trigger('timeChanged', ['tenthsOfSecond']);
            return;
        }
        if (this.seconds.value > this.seconds.min) {
            if (this.tenthsOfSecond.value === 0 && this.counter24.value === 0) {
                this.isCounter24Zero = true;
            }
            this.counter24.setValue(this.counter24.value - 1);
            this.testCounter24();
            const changedFields = ['tenthsOfSecond', 'seconds'];
            this.tenthsOfSecond.setValue(this.tenthsOfSecond.max);
            this.seconds.setValue(this.seconds.value - 1);
            this.events.trigger('timeChanged', changedFields);
            return;
        }
        if (this.minutes.value > this.minutes.min) {
            if (this.tenthsOfSecond.value === 0 && this.counter24.value === 0) {
                this.isCounter24Zero = true;
            }
            this.counter24.setValue(this.counter24.value - 1);
            this.testCounter24();
            const changedFields = ['tenthsOfSecond', 'seconds', 'minutes'];
            this.tenthsOfSecond.setValue(this.tenthsOfSecond.max);
            this.seconds.setValue(this.seconds.max);
            this.minutes.setValue(this.minutes.value - 1);
            this.events.trigger('timeChanged', changedFields);
            return;
        }

        console.log('imposible');
    }
}

export default TimeObject;
