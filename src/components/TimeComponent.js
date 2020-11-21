import LimitInteger from './LimitInteger.js';

export default class {
    constructor ({ fullTenthsMax = 0 }) {
        this.limitInteger = new LimitInteger({ value: 0, min: 0, max: fullTenthsMax });
        this.fullTenths = this.limitInteger.value;

        this.rules = [
            { name: 'tenths', divider: 1, remainder: 10 },
            { name: 'seconds', divider: 10, remainder: 60 },
            { name: 'minutes', divider: 600, remainder: 60 },
        ];
        this.names = Object.values(this.rules).map((elem) => elem.name);
        this._saveComponents(this.names.reduce((res, elem) => ({ ...res, [elem]: 0 }), {}));
    }

    _getComponents (fullValue) {
        const componentObject = this.rules.reduce((res, { name, divider, remainder }) => {
            res[name] = ~~(fullValue / divider % remainder);
            return res;
        }, {});
        return componentObject;
    }

    _getFullValueFromComponents (componentObject) {
        const fullValue = this.rules.reduce((res, { name, divider }) => {
            const value = (componentObject[name] === undefined)
                ? this[name] * divider
                : componentObject[name] * divider;
            return res + value;
        }, 0);
        return fullValue;
    }

    _saveComponents (componentObject) {
        this.names.forEach((name) => (this[name] = componentObject[name]));
    }

    changeTenths (value) {
        const oldValue = this.limitInteger.value;
        this.limitInteger.changeValue(value);
        if (this.limitInteger.value !== value) {
            console.warn('this.limitInteger.value !== value', this.limitInteger.value, value);
        }

        if (oldValue === this.limitInteger.value) {
            return;
        }
        this.fullTenths = this.limitInteger.value;

        const componentObject = this._getComponents(this.fullTenths);
        this._saveComponents(componentObject);
        return this;
    }

    changeParts (componentObject) {
        const fullTenths = this._getFullValueFromComponents(componentObject);
        this.changeTenths(fullTenths);
        return this;
    }

    valueOf () {
        console.warn('valueOf');
        return this.fullTenths;
    }
}
