import EventsStorage from './EventsStorage.js';

class TimeTicker {
    constructor({
        delayMs = 10,
    }) {
        this.interval;
        this.delayMs = delayMs;
        this.isTimerRunning = false;

        this.events = new EventsStorage(['tick']);
    }

    startTimer() {
        this.isTimerRunning = true;
        this.interval = setInterval(() => {
            this.events.trigger('tick');
        }, this.delayMs);
        return this;
    }

    stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.interval);
        return this;
    }
}

export default TimeTicker;
