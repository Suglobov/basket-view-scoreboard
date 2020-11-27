import { reactive } from 'vue';
import timerManager from './timerMatager.js';

import soundBuzzerTimerPath from '../sounds/buzzer/beep_end_period.mp3';
import soundBuzzerCounter24Path from '../sounds/buzzer/portal2buzzer.mp3';

const soundBuzzerTimer = new Audio(soundBuzzerTimerPath);
const soundBuzzerCounter24 = new Audio(soundBuzzerCounter24Path);

export default reactive({
    isTimerRunning: timerManager.isTimerRunning,
    isCounter24RunningWithTimer: timerManager.isCounter24RunningWithTimer,
    isCounter24TemporaryStop: timerManager.isCounter24TemporaryStop,
    timer: {
        tenths: timerManager.timer.tenths,
        seconds: timerManager.timer.seconds,
        minutes: timerManager.timer.minutes,
    },
    counter24: {
        tenths: timerManager.counter24.tenths,
        seconds: timerManager.counter24.seconds,
    },
    teamLeft: 'Команда Л',
    teamRight: 'Команда П',
    scoreLeft: 0,
    scoreRight: 0,
    folsLeft: 0,
    folsRight: 0,
    timeouts: 2,
    spentTimeoutsLeft: 0,
    spentTimeoutsRight: 0,
    isMirror: false,
    showArrow: false,
    arrowDirection: 'left',
    period: 1,
    soundBuzzerTimer,
    soundBuzzerCounter24,
});
