import TimerTenths from '../components/TimerTenths2.js';

export default class {
    constructor ({ maxValue = 0 } = {}) {
        const timerTenths = new TimerTenths({ maxValue });

        this.getValue = () => {
            return timerTenths.getValue();
        };

        this.setValue = (value = 0, cbData = (_data) => {}) => {
            const prevValue = this.timerTenths.getValue();
            const prevParts = this.timerTenths.getParts();

            timerTenths.setValue(value);

            const curValue = this.timerTenths.getValue();
            const curParts = this.timerTenths.getParts();

            const isChanged = prevValue === curValue;
            const modifiedParts = Object.keys(prevParts)
                .filter((partName) => {
                    return prevParts[partName] !== curParts[partName];
                });

            cbData({
                prevParts,
                prevValue,
                curParts,
                curValue,
                isChanged,
                modifiedParts,
            });

            return this;
        };

        Object.freeze(this);
    }
}
