import TimeTicker from '../components/TimeTicker.js';
import TimeComponent from '../components/TimeComponent.js';
import EventsStorage from '../components/EventsStorage.js';

export default class {
    constructor () {
        this.timer = new TimeComponent({ fullTenthsMax: 6000 });
        this.counter24 = new TimeComponent({ fullTenthsMax: 240 });
        this._timeTicker = new TimeTicker({ delayMs: 100 });

        this.isTimerRunning = false;
        this.isCounter24RunningWithTimer = true;

        this.events = new EventsStorage([
            'timerChanged',
            'counter24Changed',

            'endOfQuarter',
            'endOfCounter24',

            'startTimer',
            'stopTimer',
            'startCounter24RunningWithTimer',
            'stopCounter24RunningWithTimer',
        ]);

        this._listenTimeTicker();
    }

    _listenTimeTicker () {
        this._timeTicker.events.on('tick', () => {
            if (this.timer.getFullTenths() === 0) {
                this._actionsWithChangeCheck();
                this.stopTimer();
                return;
            }

            const prevTimerFullTenths = this.timer.getFullTenths();
            const prevCounter24FullTenths = this.counter24.getFullTenths();

            this._actionsWithChangeCheck(() => {
                this.timer.changeTenths(this.timer.getFullTenths() - 1);

                if (
                    this.isCounter24RunningWithTimer === true &&
                    this.counter24.getFullTenths() > 0
                ) {
                    this.counter24.changeTenths(this.counter24.getFullTenths() - 1);
                }
            });

            if (this.timer.getFullTenths() === 0 && prevTimerFullTenths !== 0) {
                this.events.trigger('endOfQuarter');
            } else if (this.counter24.getFullTenths() === 0 && prevCounter24FullTenths !== 0) {
                this.events.trigger('endOfCounter24');
            }
        });
    }

    _setCounter24NotMoreTimer () {
        if (this.counter24.getFullTenths() > this.timer.getFullTenths()) {
            this.counter24.changeTenths(this.timer.getFullTenths());
        }
    }

    _actionsWithChangeCheck (actions = () => { }) {
        const prevTimerFullTenths = this.timer.getFullTenths();
        const prevTimerParts = this.timer.getParts();
        const prevCounter24FullTenths = this.counter24.getFullTenths();
        const prevCounter24Parts = this.counter24.getParts();

        actions();

        const counter24FulltenthsBeforeCorrect = this.counter24.getFullTenths();
        this._setCounter24NotMoreTimer();

        const timerFulltenths = this.timer.getFullTenths();
        if (timerFulltenths !== prevTimerFullTenths) {
            const parts = this.timer.getParts();
            const modifiedParts = this._getModifiedParts(parts, prevTimerParts);
            this.events.trigger('timerChanged', modifiedParts);
        }

        const counter24Fulltenths = this.counter24.getFullTenths();
        if (
            counter24Fulltenths !== prevCounter24FullTenths ||
            counter24Fulltenths !== counter24FulltenthsBeforeCorrect
        ) {
            const parts = this.counter24.getParts();
            const modifiedParts = this._getModifiedParts(parts, prevCounter24Parts);
            this.events.trigger('counter24Changed', modifiedParts);
        }
    }

    _getModifiedParts (parts = {}, prevParts = {}) {
        const modifiedParts = Object.entries(parts)
            .reduce((res, [key, value]) => {
                if (value !== prevParts[key].value) {
                    res.push(key);
                }
                return res;
            }, []);
        return modifiedParts;
    }

    changeTimerParts (options = {}) {
        this._actionsWithChangeCheck(() => {
            this.timer.changeParts(options);
        });
    }

    changeCounter24Parts (options = {}) {
        this._actionsWithChangeCheck(() => {
            this.counter24.changeParts(options);
        });
    }

    startTimer () {
        if (this.timer.getFullTenths() === 0) {
            return;
        }
        this._timeTicker.startTick();
        this.isTimerRunning = true;
        this.events.trigger('startTimer');
    }

    stopTimer () {
        this._timeTicker.stopTick();
        this.isTimerRunning = false;
        this.events.trigger('stopTimer');
    }

    startCounter24RunningWithTimer () {
        this.isCounter24RunningWithTimer = true;
        this.events.trigger('startCounter24RunningWithTimer');
    }

    stopCounter24RunningWithTimer () {
        this.isCounter24RunningWithTimer = false;
        this.events.trigger('stopCounter24RunningWithTimer');
    }
}
