import TimersManager from '../components/TimersManager2.js';

import { reactive, watch } from 'vue';

import soundBuzzerTimerPath from '../sounds/buzzer/beep_end_period.mp3';
import soundBuzzerCounter24Path from '../sounds/buzzer/portal2buzzer.mp3';
import sendSettings from '../components/sendSettings.js';


const soundBuzzerTimer = new Audio(soundBuzzerTimerPath);
const soundBuzzerCounter24 = new Audio(soundBuzzerCounter24Path);


const vueData = reactive({
    isTimerRunning: false,
    isCounter24RunningWithTimer: true,
    isCounter24TemporaryStop: false,
    timer: {
        tenths: 0,
        seconds: 0,
        minutes: 0,
    },
    counter24: {
        tenths: 0,
        seconds: 0,
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


const timersManager = new TimersManager();
timersManager.events.on('timersChanged', ({
    timerParts,
    counter24Parts,
}) => {
    Object.keys(vueData.timer).forEach((name) => {
        if (vueData.timer[name] !== timerParts[name]) {
            vueData.timer[name] = timerParts[name];
        }
    });
    Object.keys(vueData.counter24).forEach((name) => {
        if (vueData.counter24[name] !== counter24Parts[name]) {
            vueData.counter24[name] = counter24Parts[name];
        }
    });
});
timersManager.events.on('timersChanged', ({
    prevTimerParts,
    prevCounter24Parts,
    timerParts,
    counter24Value,
    counter24Parts,
}) => {
    if (
        prevTimerParts.seconds !== timerParts.seconds ||
        prevTimerParts.minutes !== timerParts.minutes
    ) {
        sendSettings({ timer: { seconds: timerParts.seconds, minutes: timerParts.minutes } });
    }

    if (
        prevCounter24Parts.seconds !== counter24Parts.seconds ||
        counter24Value < 100
    ) {
        sendSettings({ counter24: { tenths: counter24Parts.tenths, seconds: counter24Parts.seconds } });
    }
});

timersManager.events.on('endOfQuarter', () => {
    vueData.soundBuzzerTimer.play();
});
timersManager.events.on('endOfCounter24', () => {
    vueData.soundBuzzerCounter24.play();
});

timersManager.events.on('stopTimer', () => {
    vueData.isTimerRunning = false;
});


watch(() => vueData.isTimerRunning, (isTimerRunning) => {
    if (isTimerRunning === true) {
        timersManager.startTimer();
    } else {
        timersManager.stopTimer();
    }
});
watch(() => vueData.isCounter24RunningWithTimer, () => {
    timersManager.setAdditionalParams({
        isCounter24Freeze: vueData.isCounter24RunningWithTimer === false || vueData.isCounter24TemporaryStop === true,
    });
});
watch(() => vueData.isCounter24TemporaryStop, () => {
    timersManager.setAdditionalParams({
        isCounter24Freeze: vueData.isCounter24RunningWithTimer === false || vueData.isCounter24TemporaryStop === true,
    });
});

watch(() => vueData.timer, ({ tenths, seconds, minutes }) => {
    timersManager.setTimers({ timer: { tenths, seconds, minutes } });
}, { deep: true });

watch(() => vueData.counter24, ({ tenths, seconds }) => {
    timersManager.setTimers({ counter24: { tenths, seconds } });
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

export { timersManager, vueData };
