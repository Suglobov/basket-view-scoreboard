import { reactive, watch } from 'vue';

import sendSettings from '../components/sendSettings.js';
import timerManager from './timerMatager.js';

import soundBuzzerTimerPath from '../sounds/buzzer/beep_end_period.mp3';
import soundBuzzerCounter24Path from '../sounds/buzzer/portal2buzzer.mp3';

const soundBuzzerTimer = new Audio(soundBuzzerTimerPath);
const soundBuzzerCounter24 = new Audio(soundBuzzerCounter24Path);

const vueData = reactive({
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

watch(() => vueData.isTimerRunning, (isTimerRunning) => {
    if (isTimerRunning === true) {
        timerManager.startTimer();
    } else {
        timerManager.stopTimer();
    }
});
watch(() => vueData.isCounter24RunningWithTimer, (isCounter24RunningWithTimer) => {
    if (isCounter24RunningWithTimer === true) {
        timerManager.startCounter24RunningWithTimer();
    } else {
        timerManager.stopCounter24RunningWithTimer();
    }
});
watch(() => vueData.isCounter24TemporaryStop, (isCounter24TemporaryStop) => {
    if (isCounter24TemporaryStop === true) {
        timerManager.setIsCounter24TemporaryStopToTrue();
    } else {
        timerManager.setIsCounter24TemporaryStopToFalse();
    }
});

watch(() => vueData.timer, ({ tenths, seconds, minutes }) => {
    timerManager.changeTimerParts({ tenths, seconds, minutes });
}, { deep: true });

watch(() => vueData.counter24, ({ tenths, seconds }) => {
    timerManager.changeCounter24Parts({ tenths, seconds });
}, { deep: true });

[
    'teamLeft',
    'teamRight',
    'scoreLeft',
    'scoreRight',
    'folsLeft',
    'folsRight',
    'timeouts',
    'spentTimeoutsLeft',
    'spentTimeoutsRight',
    'isMirror',
    'showArrow',
    'arrowDirection',
    'period',
].forEach((elem) => {
    watch(() => vueData[elem], (value) => {
        sendSettings({ [elem]: value });
    });
});

export default vueData;
