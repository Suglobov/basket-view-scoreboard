export default class {
    constructor ({
        value = 0,
        min = 0,
        max = 0,
        cbWrongType = (_message = '') => { },
        cbWrongMin = (_message = '') => { },
        cbOverLimit = (_message = '') => { },
    }) {
        const integerMin = this._getInteger(min, (res) => cbWrongType(`min not integer, assigned to ${res}`));
        const integerMax = this._getInteger(max, (res) => cbWrongType(`max not integer, assigned to ${res}`));

        this.max = integerMax;
        this.min = this._getCorrectMin(integerMin, () => cbWrongMin('min > max, assigned to max'));

        let _value;

        this.getValue = () => _value;
        this.setValue = (value = 0) => {
            const integerValue = this._getInteger(value, (res) => cbWrongType(`value not integer, assigned to ${res}`));
            const correctValue = this._getCorrectValue(integerValue, () => cbOverLimit('value < min or value > max'));
            if (correctValue === _value) {
                return;
            }
            _value = correctValue;
            return this;
        };
        this.setValue(value);
        Object.freeze(this);
    }

    _getInteger (value = 0, cbError = (_res = 0) => {}) {
        if (Number.isInteger(value) === true) {
            return value;
        }
        const tmp = parseInt(String(value), 10);
        const res = Number.isNaN(tmp) ? 0 : tmp;
        cbError(res);
        return res;
    }

    _getCorrectMin (min = 0, cbError = () => {}) {
        if (min <= this.max) {
            return min;
        }
        cbError();
        return this.max;
    }

    _getCorrectValue (value = 0, cbError = () => {}) {
        if (value >= this.min && value <= this.max) {
            return value;
        }
        cbError();
        return value < this.min ? this.min : this.max;
    }
}
