export default class {
    constructor({ min = 0, max = 0, val = 0 }) {
        this._min;
        this._max;
        this._val;

        const notIntegers = [min, max, val].filter((elem) => {
            const isInteger = Number.isInteger(elem);
            if (isInteger === false) {
                console.error(`${elem} is not integer`);
            }
            return isInteger === false;
        });
        if (notIntegers.length > 0) {
            return;
        }
        if (min > max) {
            console.error('min > max');
            return;
        }

        this._min = min;
        this._max = max;
        this.change({ val });
    }
    give() {
        return {
            min: this._min,
            max: this._max,
            val: this._val,
        };
    }
    change({ val }) {
        if (Number.isInteger(val) === false) {
            console.error(`${val} is not integer`);
            return this;
        }
        if (val >= this._min && val <= this._max) {
            this._val = val;
        } else if (val < this._min) {
            this.setToMin();
        } else if (val > this._max) {
            this.setToMax();
        }
        return this;
    }
    setToMax() {
        this._val = this._max;
        return this;
    }
    setToMin() {
        this._val = this._min;
        return this;
    }
}
