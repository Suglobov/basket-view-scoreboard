import { deepFreeze, getIntegerInfo } from '../components/helpers.js';
import EventsStorage from './EventsStorage.js';

const defaultDelayMs = 1000;
export default class {
    constructor ({
        delayMs = defaultDelayMs,
    } = {}) {
        let isTimerRunning = false;
        let interval;
        this.delayMs = delayMs;

        this.getIsTimerRunning = undefined;
        this.startTick = undefined;
        this.stopTick = undefined;


        const integerInfo = getIntegerInfo(delayMs);
        if (integerInfo.isInteger === false) {
            console.warn(new Error(`'${delayMs}' delayMs not integer`));
            this.delayMs = integerInfo.isNaN === false ? integerInfo.integer : defaultDelayMs;
        }


        this.events = new EventsStorage([
            'tick',
            'startTick',
            'stopTick',
        ]);

        this.getIsTimerRunning = () => isTimerRunning;

        this.startTick = () => {
            if (isTimerRunning === false) {
                isTimerRunning = true;
                interval = setInterval(() => {
                    this.events.trigger('tick');
                }, this.delayMs);

                this.events.trigger('startTick');
            }
            return this;
        };

        this.stopTick = () => {
            if (isTimerRunning === true) {
                isTimerRunning = false;
                clearInterval(interval);

                this.events.trigger('stopTick');
            }
            return this;
        };

        deepFreeze(this);
    }
}
