import checkType from './checkType.js';

export default class {
    constructor (rules = [{ divider: 0, remainder: 0 }]) {
        checkType(rules, 'array');
        this.rules = rules.map(({ divider, remainder }) => {
            checkType(divider, 'integer');
            checkType(remainder, 'integer');
            return { divider, remainder };
        });

        Object.freeze(this.rules);
        Object.freeze(this);
    }

    getParts (value = 0) {
        checkType(value, 'integer');
        const result = this.rules.map(({ divider, remainder }) => {
            return ~~(value / divider % remainder);
        });
        return result;
    }

    getValue (parts = [0]) {
        checkType(parts, 'array');
        if (parts.length !== this.rules.length) {
            throw new Error('parts.length !== rules.length');
        }
        const result = this.rules.reduce((acc, { divider }, index) => {
            checkType(parts[index], 'integer');
            return acc + parts[index] * divider;
        }, 0);
        return result;
    }
}
