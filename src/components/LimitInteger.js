/**
 * if the values are not integers, then they will be assigned 0
 */
export default class {
    constructor ({ value, min, max }) {
        this.value = this._getInteger(value);
        this.min = this._getInteger(min);
        this.max = this._getInteger(max);
    }

    _getInteger (value) {
        return Number.isInteger(value) ? value : 0;
    }

    changeValue (value) {
        const valueInteger = this._getInteger(value);
        if (valueInteger === this.value) {
            return;
        }

        let newValue;
        if (valueInteger >= this.min && valueInteger <= this.max) {
            newValue = valueInteger;
        } else {
            newValue = valueInteger < this.min ? this.min : this.max;
        }

        this.value = newValue;
    }
}
