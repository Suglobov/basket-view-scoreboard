import EventsStorage from './EventsStorage.js';

class TimeTicker {
    constructor({
        delayMs = 10,
    }) {
        this.interval;
        this.delayMs = delayMs;
        this.isTimerRunning = false;

        this.events = new EventsStorage(['tick', 'stopTick', 'startTick']);
    }

    startTimer() {
        this.isTimerRunning = true;
        this.interval = setInterval(() => {
            this.events.trigger('tick');
        }, this.delayMs);
        this.events.trigger('startTick');
        return this;
    }

    stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.interval);
        this.events.trigger('stopTick');
        return this;
    }
}

export default TimeTicker;
