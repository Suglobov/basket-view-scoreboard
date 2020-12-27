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
        // this.isCounter24Wait = false;

        this.events = new EventsStorage([
            'timersChanged',
            'stopTimer',
            'startTimer',

            'endOfQuarter',
            'endOfCounter24',
        ]);

        this._timeTicker.events.on('tick', () => {
            const prevTimerValue = this.timer.getValue();
            const prevTimerParts = this.timer.getParts();
            const prevCounter24Value = this.counter24.getValue();
            const prevCounter24Parts = this.counter24.getParts();

            this.timer.setValue(this.timer.getValue() - 1);
            if (this.isCounter24Freeze === false) {
                this.counter24.setValue(this.counter24.getValue() - 1);
            }
            this._correctTimers();

            if (this.timer.getValue() === 0) {
                this.stopTimer();
            }

            const timerValue = this.timer.getValue();
            const timerParts = this.timer.getParts();
            const counter24Value = this.counter24.getValue();
            const counter24Parts = this.counter24.getParts();

            this.events.trigger('timersChanged', {
                prevTimerValue,
                prevTimerParts,
                prevCounter24Value,
                prevCounter24Parts,
                timerValue,
                timerParts,
                counter24Value,
                counter24Parts,
            });

            if (timerValue === 0 && prevTimerValue !== 0) {
                this.events.trigger('endOfQuarter');
            } else if (counter24Value === 0 && prevCounter24Value !== 0) {
                this.events.trigger('endOfCounter24');
            }
        });
    }

    setAdditionalParams ({ isCounter24Freeze } = {}) {
        if (isCounter24Freeze !== undefined) {
            this.isCounter24Freeze = Boolean(isCounter24Freeze);
        }
    }

    setTimers ({ timer, counter24 } = {}) {
        const prevTimerValue = this.timer.getValue();
        const prevTimerParts = this.timer.getParts();
        const prevCounter24Value = this.counter24.getValue();
        const prevCounter24Parts = this.counter24.getParts();

        this.timer.setParts(timer);
        this.counter24.setParts(counter24);
        this._correctTimers();

        const timerValue = this.timer.getValue();
        const timerParts = this.timer.getParts();
        const counter24Value = this.counter24.getValue();
        const counter24Parts = this.counter24.getParts();

        this.events.trigger('timersChanged', {
            prevTimerValue,
            prevTimerParts,
            prevCounter24Value,
            prevCounter24Parts,
            timerValue,
            timerParts,
            counter24Value,
            counter24Parts,
        });
    }

    startTimer () {
        if (this.timer.getValue() === 0) {
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

    _correctTimers () {
        if (this.counter24.getValue() > this.timer.getValue()) {
            this.counter24.setValue(this.timer.getValue());
        }
    }
}
