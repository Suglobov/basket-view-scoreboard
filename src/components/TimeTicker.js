class TimeTicker {
    constructor({
        callbackTiс = () => { },
        callbackSeconds = () => { },
        callback100ms = () => { },
    }) {
        this.callbackTiс = callbackTiс;

        this.timer100;
        this.count100ms = 0;
        this.callbackSeconds = callbackSeconds;
        this.callback100ms = callback100ms;
        this.isTimerRunning = false;

        setInterval(() => {
            if (this.isTimerRunning) {
                this.callbackTiс();
            }
        }, 1000);
    }

    startTimer() {
        this.isTimerRunning = true;
        this.timer100 = setInterval(() => {
            this.count100ms += 1;
            this.callback100ms();
            if (this.count100ms >= 10) {
                this.callbackSeconds();
                this.count100ms = 0;
            }
        }, 100);
    }

    stopTimer() {
        this.isTimerRunning = false;
        clearInterval(this.timer100);
    }
}

export default TimeTicker;
