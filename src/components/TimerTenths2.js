const getInteger = (value = 0, cbTypeError = (_value = 0, _newValue = 0) => { }) => {
    if (Number.isInteger(value) === true) {
        return value;
    }
    const integer = parseInt(String(value), 10);
    const newValue = Number.isNaN(integer) ? 0 : integer;
    cbTypeError(value, newValue);
    return newValue;
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

        const setPartsFromInteger = (integer = 0) => {
            Object.entries(this.rules)
                .forEach(([partName, { divider = 0, remainder = 0 }]) => {
                    _parts[partName] = ~~(integer / divider % remainder);
                });
        };

        const setValueFromInteger = (integer = 0) => {
            _value = integer;
            setPartsFromInteger(integer);
        };

        this.setValue = (value = 0) => {
            const incomeValue = Number.isInteger(value) ? value : parseInt(String(value));
            if (Number.isNaN(incomeValue)) {
                return;
            }
            const limitedInteger = this._getLimitedValue(incomeValue);
            setValueFromInteger(limitedInteger);
            return this;
        };

        this.setParts = (incomeParts) => {
            if (incomeParts instanceof Object === false) {
                return this;
            }
            let integer = this.getValue();
            Object.entries(this.rules).forEach(([partName, { divider }]) => {
                const incomePart = incomeParts[partName];
                const incomeValue = Number.isInteger(incomePart) ? incomePart : parseInt(String(incomePart));
                if (Number.isNaN(incomeValue) || incomeValue < 0) {
                    return;
                }
                integer -= (_parts[partName] - incomeValue) * divider;
            });
            const limitedInteger = this._getLimitedValue(integer);
            setValueFromInteger(limitedInteger);
            return this;
        };

        Object.freeze(this);
        this.setValue(0);
    }

    _getLimitedValue (value = 0) {
        if (value >= 0 && value <= this.maxValue) {
            return value;
        } else if (value < 0) {
            return 0;
        }
        return this.maxValue;
    }
}
