export default class {
    constructor({ fullTenthsMax = 0 }) {
        if (Number.isInteger(fullTenthsMax) === false) {
            console.error(`${fullTenthsMax} is not integer`);
            return this;
        }

        this.TENTHS_IN_SECONDS = 10;
        this.TENTHS_IN_MINUTES = 600;
        this._fullTenthsMax = fullTenthsMax;
        this.fullTenths = 0;
        this.tenths = 0;
        this.seconds = 0;
        this.minutes = 0;
    }
    valueOf() {
        return this.fullTenths;
    }
    changeTenths(value) {
        if (Number.isInteger(value) === false) {
            console.error(`${value} is not integer`);
            return this;
        }

        const prevFullTenths = this.fullTenths;

        if (value >= 0 && value <= this._fullTenthsMax) {
            this.fullTenths = value;
        } else {
            this.fullTenths = value < 0 ? 0 : this._fullTenthsMax;
        }

        if ((prevFullTenths - this.fullTenths) === 0) {
            return this;
        }

        const remainderMinutes = this.fullTenths % this.TENTHS_IN_MINUTES;
        const minutes = ~~(this.fullTenths / this.TENTHS_IN_MINUTES);
        const seconds = ~~(remainderMinutes / this.TENTHS_IN_SECONDS);
        const tenths = remainderMinutes % this.TENTHS_IN_SECONDS;

        this.minutes = minutes;
        this.seconds = seconds;
        this.tenths = tenths;
        return this;
    }
    changeParts({ tenths, seconds, minutes }) {
        const fullTenths = (tenths === undefined ? this.tenths : tenths)
            + (seconds === undefined ? this.seconds : seconds) * this.TENTHS_IN_SECONDS
            + (minutes === undefined ? this.minutes : minutes) * this.TENTHS_IN_MINUTES;
        this.changeTenths(fullTenths);
        return this;
    }
}
