import checkType from './checkType.js';
import LimitInteger from './LimitInteger.js';
import PartsNumber from './PartsNumber.js';

export default class {
    constructor ({ value = 0 } = {}) {
        this.limitInteger = new LimitInteger({ max: value });
        this.partsNumber = new PartsNumber([
            { divider: 1, remainder: 10 },
            { divider: 10, remainder: 60 },
            { divider: 600, remainder: 60 },
        ]);
        this.names = ['tenths', 'seconds', 'minutes'];

        const namedParts = {};

        const _saveToNamedParts = (parts = [0]) => {
            this.names.forEach((name, index) => {
                namedParts[name] = parts[index];
            });
        };

        _saveToNamedParts(this.names.map(() => 0));

        this.setValue = (value = 0) => {
            checkType(value, 'integer');
            this.limitInteger.setValue();
            const parts = this.partsNumber.getParts(value);
            _saveToNamedParts(parts);
        };

        this.setParts = (incomeNamedParts = {}) => {
            checkType(incomeNamedParts, 'object');
            const incomeParts = this.names.map((name) => {
                if (incomeNamedParts[name] === undefined) {
                    return namedParts[name];
                }
                checkType(incomeNamedParts[name], 'integer');
                return incomeNamedParts[name];
            });
            const value = this.partsNumber.getValue(incomeParts);
            this.limitInteger.setValue(value);
            _saveToNamedParts(incomeParts);
        };

        this.getParts = () => {
            return namedParts;
        };

        Object.freeze(this.names);
        Object.freeze(this);
    }

    getValue () {
        return this.limitInteger.getValue();
    }
}
