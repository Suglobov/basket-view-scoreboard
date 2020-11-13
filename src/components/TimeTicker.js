import EventsStorage from './EventsStorage.js';

class TimeTicker {
    constructor ({
        delayMs = 10,
    }) {
        this.interval = undefined;
        this.delayMs = delayMs;
        this.isTimerRunning = false;

        this.events = new EventsStorage(['tick', 'startTimer', 'stopTimer']);
    }

    startTimer () {
        this.isTimerRunning = true;
        this.interval = setInterval(() => {
            this.events.trigger('tick');
        }, this.delayMs);
        this.events.trigger('startTimer');
        return this;
    }

    stopTimer () {
        this.isTimerRunning = false;
        clearInterval(this.interval);
        this.events.trigger('stopTimer');
        return this;
    }
}

export default TimeTicker;
