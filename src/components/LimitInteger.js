import checkType from './checkType.js';

export default class {
    constructor({ value = 0, min = 0, max = 0 }) {
        [value, min, max].forEach((val) => checkType(val, 'integer'));
        this._checkMinMax(min, max);
        this._checkValue(value, min, max);

        this.value = value;
        this.min = min;
        this.max = max;


        const out = Object.create(null);
        out.min = this.min;
        out.max = this.max;
        out.getValue = () => this.value;
        out.setValue = (value) => this.setValue(value);
        Object.freeze(out);
        return out;
    }

    _checkMinMax(min = 0, max = 0) {
        if (min <= max) {
            return;
        }
        throw new Error(`min (${min}) > max (${max})`);
    }

    _checkValue(value = 0, min = 0, max = 0) {
        if (value >= min && value <= max) {
            return;
        }
        if (value < min) {
            throw new Error(`value (${value}) < min (${min})`);
        } else if (value > max) {
            throw new Error(`value (${value}) > max (${max})`);
        } else {
            throw new Error('imposible step');
        }
    }

    setValue(value = 0) {
        checkType(value, 'integer');
        this._checkValue(value, this.min, this.max);
        if (value === this.value) {
            return;
        }
        this.value = value;
    }
}
