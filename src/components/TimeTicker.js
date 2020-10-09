class TimeTicker {
    constructor({
        callbackTiс = () => { },
    }) {
        this.callbackTiс = callbackTiс;

        this.isTimerRunning = false;

        setInterval(() => {
            if (this.isTimerRunning) {
                this.callbackTiс();
            }
        }, 1000);
    }

    startTimer() {
        this.isTimerRunning = true;
    }

    stopTimer() {
        this.isTimerRunning = false;
    }
}

export default TimeTicker;
