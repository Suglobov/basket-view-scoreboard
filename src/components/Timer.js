import LimitInteger from './LimitInteger.js';

export default class {
    constructor ({ maxValue = 0 } = {}) {
        this.limitInteger = new LimitInteger({
            max: maxValue,
            cbWrongType: (message) => {
                console.log('cbWrongType', message);
            },
            cbWrongMin: (message) => {
                console.log('cbWrongMin', message);
            },
            cbOverLimit: (message) => {
                console.log('cbOverLimit', message);
            },
        });

        this.rules = {
            tenths: { divider: 1, remainder: 10 },
            seconds: { divider: 10, remainder: 60 },
            minutes: { divider: 600, remainder: 60 },
        };

        const objParts = {};
        Object.keys(this.rules).forEach((res, name) => {
            objParts[name] = 0;
        });

        this.setValue = (value = 0) => {
            const correctedValue = this.limitInteger.setValue(value).getValue();
            Object.entries(this.rules).forEach(([partName, { divider = 0, remainder = 0 }]) => {
                objParts[partName] = ~~(correctedValue / divider % remainder);
            });
        };

        this.setParts = (incomeParts = {}) => {
            const allNameParts = {};
            Object.keys(objParts).forEach((partName) => {
                const tmpPart = (incomeParts[partName] === undefined)
                    ? objParts[partName]
                    : incomeParts[partName];
                allNameParts[partName] = Number.isInteger(tmpPart) ? tmpPart : 0;
            });
            const value = Object.entries(this.rules).reduce((res, [partName, { divider = 0 }]) => {
                return res + allNameParts[partName] * divider;
            }, 0);

            this.setValue(value);
        };

        this.getParts = () => {
            return objParts;
        };

        Object.freeze(this.rules);
        Object.freeze(this);
    }

    getValue () {
        return this.limitInteger.getValue();
    }
}
