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

        this.events = new EventsStorage([
            'timersChanged',
            'stopTimer',
            'startTimer',

            'endOfQuarter',
            'endOfCounter24',
        ]);


        const additionalParams = Object.create(null);
        additionalParams.isCounter24Freeze = false;

        this.setAdditionalParams = ({ isCounter24Freeze } = {}) => {
            if (isCounter24Freeze !== undefined) {
                additionalParams.isCounter24Freeze = Boolean(isCounter24Freeze);
            }
        };


        this._timeTicker.events.on('tick', () => {
            this.wrapperAction(({
                prevTimerTime,
                prevCounter24Time,
            }) => {
                this.timer.setAllTenths(prevTimerTime.allTenths - 1);
                if (additionalParams.isCounter24Freeze === false) {
                    this.counter24.setAllTenths(prevCounter24Time.allTenths - 1);
                }
                this._correctTimers();
            }, ({
                prevTimerTime,
                prevCounter24Time,
                timerTime,
                counter24Time,
            }) => {
                if (timerTime.allTenths === 0) {
                    this.stopTimer();
                }

                if (timerTime.allTenths === 0 && prevTimerTime.allTenths !== 0) {
                    this.events.trigger('endOfQuarter');
                } else if (counter24Time.allTenths === 0 && prevCounter24Time.allTenths !== 0) {
                    this.events.trigger('endOfCounter24');
                }
            });
        });

        Object.freeze(this);
    }

    _correctTimers () {
        const timerTime = this.timer.getTime();
        const counter24Time = this.counter24.getTime();

        if (timerTime.allTenths < counter24Time.allTenths) {
            this.counter24.setAllTenths(timerTime.allTenths);
        }
    }

    wrapperAction (changeAction = () => { }, actionAfterChange = () => {}) {
        const prevTimerTime = this.timer.getTime();
        const prevCounter24Time = this.counter24.getTime();

        changeAction({
            prevTimerTime,
            prevCounter24Time,
        });

        const timerTime = this.timer.getTime();
        const counter24Time = this.counter24.getTime();

        this.events.trigger('timersChanged', {
            prevTimerTime,
            prevCounter24Time,
            timerTime,
            counter24Time,
        });

        actionAfterChange({
            prevTimerTime,
            prevCounter24Time,
            timerTime,
            counter24Time,
        });
    }

    setTimers ({ timer, counter24 } = {}) {
        this.wrapperAction(() => {
            this.timer.setParts(timer);
            this.counter24.setParts(counter24);
            this._correctTimers();
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
