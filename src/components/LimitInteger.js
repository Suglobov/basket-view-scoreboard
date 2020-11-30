export default class {
    constructor ({
        value = 0,
        min = 0,
        max = 0,
        cbWrongType = (_message = '') => { },
        cbWrongMin = (_message = '') => { },
        cbOverLimit = (_message = '') => { },
    }) {
        const integerValue = this._getInteger(value, () => cbWrongType('value not integer, assigned to 0'));
        const integerMin = this._getInteger(min, () => cbWrongType('min not integer, assigned to 0'));
        const integerMax = this._getInteger(max, () => cbWrongType('max not integer, assigned to 0'));

        this.max = integerMax;
        this.min = this._getCorrectMin(integerMin, () => cbWrongMin('min > max, assigned to max'));

        let _value = this._getCorrectValue(integerValue, () => cbOverLimit('value < min or value > max'));

        this.getValue = () => _value;
        this.setValue = (value = 0) => {
            const integerValue = this._getInteger(value, () => cbWrongType('value not integer, assigned to 0'));
            const correctValue = this._getCorrectValue(integerValue, () => cbOverLimit('value < min or value > max'));
            if (correctValue === _value) {
                return;
            }
            _value = correctValue;
            return this;
        };
        Object.freeze(this);
    }

    _getInteger (value = 0, cbError = () => {}) {
        if (Number.isInteger(value) === true) {
            return value;
        }
        cbError();
        return 0;
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
