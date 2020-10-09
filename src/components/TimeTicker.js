class TimeTicker {
    constructor({
        delayMs = 10,
        callback = () => { },
    }) {
        this.interval;
        this.delayMs = delayMs;
        this.callback = callback;
        this.isTimerRunning = false;
    }

    startTimer() {
        this.isTimerRunning = true;
        this.interval = setInterval(this.callback, this.delayMs);
        return this;
    }

    stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.interval);
        return this;
    }
}

export default TimeTicker;
