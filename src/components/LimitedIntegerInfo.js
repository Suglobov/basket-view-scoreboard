import getIntegerInfo from '../components/getIntegerInfo.js';

export default class {
    constructor (min, max) {
        this.minInfo = getIntegerInfo(min);
        this.min = this.minInfo.integer;
        if (this.minInfo.isInteger === false) {
            console.warn('min not integer');
        }


        this.maxInfo = getIntegerInfo(max);
        this.max = this.maxInfo.integer;
        if (this.maxInfo.isInteger === false) {
            console.warn('max not integer');
        }


        if (this.minInfo.integer > this.maxInfo.integer) {
            this.min = this.maxInfo.integer;
            this.max = this.minInfo.integer;
            console.warn('min > max');
        }

        Object.freeze(this);
    }

    getLimitedIntegerInfo (value) {
        const inputInfo = getIntegerInfo(value);
        if (inputInfo.isInteger === false) {
            console.warn('value not integer');
        }

        const out = Object.create(null);
        out.inputInfo = inputInfo;
        out.integer = inputInfo.integer;
        out.overflow = undefined;

        if (out.integer < this.min) {
            out.overflow = 'min';
            out.integer = this.min;
        } else if (out.integer > this.max) {
            out.overflow = 'max';
            out.integer = this.max;
        }

        Object.freeze(out);
        return out;
    }
}
