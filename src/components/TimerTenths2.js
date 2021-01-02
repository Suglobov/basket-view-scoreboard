import getIntegerInfo from '../components/getIntegerInfo.js';
import LimitedIntegerInfo from '../components/LimitedIntegerInfo.js';


export default class {
    constructor ({ maxValue = 0 } = {}) {
        this.limitedInteger = new LimitedIntegerInfo(0, maxValue);

        this.rules = {
            tenths: { divider: 1, remainder: 10 },
            seconds: { divider: 10, remainder: 60 },
            minutes: { divider: 600, remainder: 60 },
        };
        Object.freeze(this.rules.tenths);
        Object.freeze(this.rules.seconds);
        Object.freeze(this.rules.minutes);
        Object.freeze(this.rules);


        const _time = Object.create(null);
        _time.allTenths = 0;
        _time.parts = this.getIntegerParts(0);

        this.getTime = () => ({ ..._time });

        const _saveTime = (integer) => {
            if (integer === _time.allTenths) {
                return;
            }

            _time.allTenths = integer;
            _time.parts = this.getIntegerParts(integer);
        };


        this.setAllTenths = (value) => {
            const integerInfo = this.limitedInteger.getLimitedIntegerInfo(value);
            if (
                integerInfo.inputInfo.isNaN === false &&
                integerInfo.integer !== _time.allTenths
            ) {
                _saveTime(integerInfo.integer);
            }

            return this;
        };

        this.setParts = (incomeParts) => {
            if (incomeParts instanceof Object) {
                let integer = _time.allTenths;

                Object.entries(this.rules).forEach(([partName, { divider }]) => {
                    const incomePartInfo = getIntegerInfo(incomeParts[partName]);
                    if (
                        incomePartInfo.isNaN ||
                        incomePartInfo.integer === _time.parts[partName]
                    ) {
                        return;
                    }

                    integer -= (_time.parts[partName] - incomePartInfo.integer) * divider;
                });

                this.setAllTenths(integer);
            }

            return this;
        };

        Object.freeze(this);
    }

    getIntegerParts (value) {
        const inputInfo = getIntegerInfo(value);
        if (inputInfo.isInteger === false) {
            console.warn('value not integer');
        }

        const integerParts = Object.create(null);
        Object.entries(this.rules)
            .forEach(([partName, { divider = 0, remainder = 0 }]) => {
                integerParts[partName] = ~~(inputInfo.integer / divider % remainder);
            });

        Object.freeze(integerParts);

        return integerParts;
    }
}
