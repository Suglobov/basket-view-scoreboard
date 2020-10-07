const SECONDS_IN_MINUTE = 60;

class TimeObject {
    constructor() {
        this.fullSeconds;
        this.minutes;
        this.seconds;
        this.setFullSeconds(0);
    }
    setFullSeconds(fullSeconds) {
        if (fullSeconds < 0) {
            console.log('fullSeconds < 0');
            return;
        }
        this.fullSeconds = fullSeconds;
        this.minutes = Math.floor(this.fullSeconds / SECONDS_IN_MINUTE);
        this.seconds = this.fullSeconds % SECONDS_IN_MINUTE;
        return this;
    }
    setTime(minutes, seconds) {
        this.minutes = minutes;
        this.seconds = seconds;
        this.fullSeconds = this.minutes * SECONDS_IN_MINUTE + this.seconds;
        return this;
    }
    getFullSeconds() {
        return this.fullSeconds;
    }
    getSeconds() {
        return this.seconds;
    }
    getMinutes() {
        return this.minutes;
    }
}

export default TimeObject;
