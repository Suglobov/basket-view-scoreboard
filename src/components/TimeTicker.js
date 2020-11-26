import EventsStorage from './EventsStorage.js';

export default class {
    constructor({
        delayMs = 10,
    }) {
        this.interval = undefined;
        this.delayMs = delayMs;
        this.isTimerRunning = false;

        this.events = new EventsStorage([
            'tick',
            'startTick',
            'stopTick',
        ]);
    }

    startTick() {
        this.isTimerRunning = true;
        this.interval = setInterval(() => {
            this.events.trigger('tick');
        }, this.delayMs);
        this.events.trigger('startTick');
        return this;
    }

    stopTick() {
        this.isTimerRunning = false;
        clearInterval(this.interval);
        this.events.trigger('stopTick');
        return this;
    }
}
