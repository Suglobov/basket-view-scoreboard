export default class {
    constructor({ fullTenthsMax = 0 }) {
        const fullTenthsMaxInteger = this._getInteger(fullTenthsMax);

        this.TENTHS_IN_SECONDS = 10;
        this.TENTHS_IN_MINUTES = 600;
        this._fullTenthsMax = fullTenthsMaxInteger;
        this.fullTenths = 0;
        this.tenths = 0;
        this.seconds = 0;
        this.minutes = 0;
    }
    _getInteger(value) {
        if (Number.isInteger(value) === false) {
            console.warn(`${value} is not integer`);
            return 0;
        }
        return value;
    }
    valueOf() {
        return this.fullTenths;
    }
    changeTenths(value) {
        const valueInteger = this._getInteger(value);

        const prevFullTenths = this.fullTenths;

        if (valueInteger >= 0 && valueInteger <= this._fullTenthsMax) {
            this.fullTenths = valueInteger;
        } else {
            this.fullTenths = valueInteger < 0 ? 0 : this._fullTenthsMax;
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
