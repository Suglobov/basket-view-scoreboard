import LimitInteger from './LimitInteger.js';
import checkType from './checkType.js';

export default class {
    constructor ({ fullTenthsMax = 0 }) {
        this.limitInteger = new LimitInteger({ max: fullTenthsMax });

        this.rules = [
            { name: 'tenths', divider: 1, remainder: 10 },
            { name: 'seconds', divider: 10, remainder: 60 },
            { name: 'minutes', divider: 600, remainder: 60 },
        ];
        this.names = Object.values(this.rules).map((elem) => elem.name);
        this._saveComponents(this.names.reduce((res, elem) => ({ ...res, [elem]: 0 }), {}));

        Object.freeze(this.rules);
        Object.freeze(this.names);
    }

    _getPartsFromFullValue (fullValue = 0) {
        checkType(fullValue, 'integer');
        const parts = this.rules.reduce((res, { name, divider, remainder }) => {
            res[name] = ~~(fullValue / divider % remainder);
            return res;
        }, {});
        return parts;
    }

    _getFullValueFromParts (parts = {}) {
        const fullValue = this.rules.reduce((res, { name, divider }) => {
            const part = (parts[name] === undefined) ? this[name] : parts[name];
            checkType(part, 'integer');
            const value = part * divider;
            return res + value;
        }, 0);
        return fullValue;
    }

    _saveComponents (parts = {}) {
        this.names.forEach((name) => {
            if (parts[name] === undefined) {
                return;
            }
            checkType(parts[name], 'integer');
            this[name] = parts[name];
        });
    }

    getFullTenths () {
        return this.limitInteger.getValue();
    }

    getParts () {
        const out = this.rules.reduce((res, { name }) => {
            res[name] = this[name];
            return res;
        }, {});
        return out;
    }

    changeTenths (value = 0) {
        checkType(value, 'integer');
        const oldValue = this.limitInteger.getValue();
        this.limitInteger.setValue(value);

        if (oldValue === value) {
            return;
        }

        const parts = this._getPartsFromFullValue(value);
        this._saveComponents(parts);
    }

    changeParts (parts = {}) {
        const fullTenths = this._getFullValueFromParts(parts);
        this.changeTenths(fullTenths);
    }
}
