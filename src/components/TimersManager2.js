import TimeTicker from './TimeTicker.js';
import EventsStorage from './EventsStorage.js';
// import TimerTenthWrapper from './TimerTenthWrapper.js';
import TimerTenths from '../components/TimerTenths2.js';
// import waterFall from './waterFall.js';


export default class {
    constructor () {
        this.timer = new TimerTenths({ maxValue: 6000 });
        this.counter24 = new TimerTenths({ maxValue: 240 });
        this._timeTicker = new TimeTicker({ delayMs: 100 });

        this.isCounter24Freeze = false;

        this.events = new EventsStorage([
            'timersChanged',
            'stopTimer',
            'startTimer',

            'endOfQuarter',
            'endOfCounter24',
        ]);

        this._timeTicker.events.on('tick', () => {
            const prevTimerTime = this.timer.getTime();
            const prevCounter24Time = this.counter24.getTime();

            this.timer.setAllTenths(prevTimerTime.allTenths - 1);
            if (this.isCounter24Freeze === false) {
                this.counter24.setAllTenths(prevCounter24Time.allTenths - 1);
            }
            this._correctTimers();

            const timerTime = this.timer.getTime();
            const counter24Time = this.counter24.getTime();

            if (timerTime.allTenths === 0) {
                this.stopTimer();
            }


            this.events.trigger('timersChanged', {
                prevTimerTime,
                prevCounter24Time,
                timerTime,
                counter24Time,
            });

            if (timerTime.allTenths === 0 && prevTimerTime.allTenths !== 0) {
                this.events.trigger('endOfQuarter');
            } else if (counter24Time.allTenths === 0 && prevCounter24Time.allTenths !== 0) {
                this.events.trigger('endOfCounter24');
            }
        });
    }

    _correctTimers () {
        const timerTime = this.timer.getTime();
        const counter24Time = this.counter24.getTime();

        if (timerTime.allTenths < counter24Time.allTenths) {
            this.counter24.setAllTenths(timerTime.allTenths);
        }
    }

    setAdditionalParams ({ isCounter24Freeze } = {}) {
        if (isCounter24Freeze !== undefined) {
            this.isCounter24Freeze = Boolean(isCounter24Freeze);
        }
    }

    setTimers ({ timer, counter24 } = {}) {
        const prevTimerTime = this.timer.getTime();
        const prevCounter24Time = this.counter24.getTime();

        this.timer.setParts(timer);
        this.counter24.setParts(counter24);
        this._correctTimers();

        const timerTime = this.timer.getTime();
        const counter24Time = this.counter24.getTime();

        this.events.trigger('timersChanged', {
            prevTimerTime,
            prevCounter24Time,
            timerTime,
            counter24Time,
        });
    }

    startTimer () {
        const timerTime = this.timer.getTime();
        if (timerTime.allTenths === 0) {
            this.stopTimer();
            return;
        }
        this._timeTicker.startTick();
        this.events.trigger('startTimer');
    }

    stopTimer () {
        this._timeTicker.stopTick();
        this.events.trigger('stopTimer');
    }
}
