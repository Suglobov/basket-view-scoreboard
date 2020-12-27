// import waterFall from '../components/waterFall.js';


const getInteger = (value, cbTypeError = (_value = 0, _newValue = 0) => { }) => {
    if (Number.isInteger(value) === true) {
        return value;
    }
    const integer = parseInt(String(value), 10);
    const newValue = Number.isNaN(integer) ? 0 : integer;
    cbTypeError(value, newValue);
    return newValue;
};
const getIntegerOrNan = (value) => {
    return Number.isInteger(value) ? value : parseInt(String(value));
};

export default class {
    constructor ({ maxValue = 0 } = {}) {
        this.rules = {
            tenths: { divider: 1, remainder: 10 },
            seconds: { divider: 10, remainder: 60 },
            minutes: { divider: 600, remainder: 60 },
        };
        Object.freeze(this.rules.tenths);
        Object.freeze(this.rules.seconds);
        Object.freeze(this.rules.minutes);
        Object.freeze(this.rules);

        this.maxValue = getInteger(maxValue);

        let _value;
        const _parts = Object.create(null);

        this.getValue = () => _value;
        this.getParts = () => ({ ..._parts });

        const _setPartsFromInteger = (integer) => {
            Object.entries(this.rules).forEach(([partName, { divider = 0, remainder = 0 }]) => {
                _parts[partName] = ~~(integer / divider % remainder);
            });
        };

        const _setValueFromInteger = (integer) => {
            if (integer === _value) {
                return;
            }
            _value = integer;
            _setPartsFromInteger(integer);
        };

        this.setValue = (value) => {
            const integerOrNan = getIntegerOrNan(value);
            if (Number.isNaN(integerOrNan) === false) {
                const limitedInteger = this._getLimitedValue(integerOrNan);
                _setValueFromInteger(limitedInteger);
            }
            return this;
        };

        this.setParts = (incomeParts) => {
            if (incomeParts instanceof Object) {
                let integer = this.getValue();
                Object.entries(this.rules).forEach(([partName, { divider }]) => {
                    const incomePart = getIntegerOrNan(incomeParts[partName]);
                    if (Number.isNaN(incomePart) || incomePart === _parts[partName]) {
                        return;
                    }
                    integer -= (_parts[partName] - incomePart) * divider;
                });
                const limitedInteger = this._getLimitedValue(integer);
                _setValueFromInteger(limitedInteger);
            }
            return this;
        };

        Object.freeze(this);
        this.setValue(0);
    }

    _getLimitedValue (value) {
        if (value >= 0 && value <= this.maxValue) {
            return value;
        } else if (value < 0) {
            return 0;
        }
        return this.maxValue;
    }
}
