import TimeComponent from './TimeComponent.js';
import EventsStorage from './EventsStorage.js';

class TimeObject {
    constructor(defaultValues = {
        tenthsOfSecond: 0,
        seconds: 0,
        minutes: 10,
        counter24: 24,
    }) {
        this.tenthsOfSecond = new TimeComponent({
            value: defaultValues.tenthsOfSecond,
            min: 0, max: 9, higher: 'seconds',
        });
        this.seconds = new TimeComponent({
            value: defaultValues.seconds,
            min: 0, max: 59, higher: 'minutes',
        });
        this.minutes = new TimeComponent({
            value: defaultValues.minutes,
            min: 0, max: 10,
        });
        this.counter24 = new TimeComponent({
            value: defaultValues.counter24,
            min: 0, max: 24,
        });

        this.events = new EventsStorage([
            'minusTenthsOfSecond',
            'minusSecond',
            'minusMinutes',
            'minusCounter24',
        ]);
    }

    minusTime() {
        // part: 'tenthsOfSecond',
        // cbSuccess() {
        //     timeObjectToDom({ timeObject, dom, fields: ['tenthsOfSecond', 'seconds', 'minutes'] });
        //     if (timeObject.tenthsOfSecond.value === timeObject.tenthsOfSecond.max) {
        //         setCounter24NewValue({ timeObject, counter24Object, value: counter24Object.value - 1 });
        //     }
        //     if (counter24Object.value < 9 && counter24Object.value !== 0) {
        //         sendTime({ timeObject, counter24Object });
        //     }
        // },
        // cbZero() {
        //     timeTicker.stopTimer();
        //     sendTime({ timeObject, counter24Object });
        // },

    };
}

export default TimeObject;
