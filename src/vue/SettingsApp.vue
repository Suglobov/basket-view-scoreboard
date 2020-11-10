<template>
    <div class="settings-container font-Aldrich d-flex flex-between flex-wrap">
        <div>
            <SettingsTeam
                v-model:team="teamLeft"
                v-model:score="scoreLeft"
                v-model:spent-timeouts="spentTimeoutsLeft"
                v-model:fols="folsLeft"
                :tooltip1="'Q'"
                :tooltip2="'W'"
                :tooltip3="'E'"
            />
            <SettingsHelpText />
            <div>
                <button
                    class="button"
                    @click="soundBuzzerTimer.play()"
                >
                    Звук конца четверти
                </button>
            </div>
            <div>
                <button
                    class="button"
                    @click="soundBuzzerCounter24.play()"
                >
                    Звук конца 24секунд
                </button>
            </div>
        </div>
        <div>
            <SettingsClock
                v-model:minutes="timer.minutes"
                v-model:seconds="timer.seconds"
                v-model:tenths="timer.tenths"
            />
            <SettingsCounter24
                v-model:tenths="counter24.tenths"
                v-model:seconds="counter24.seconds"
            />
            <SettingsStartButton
                class="d-inline-block"
                :is-time-running="isTimeRunning"
                @start-timer="startTimer"
                @stop-timer="stopTimer"
            />
        </div>
        <div>
            <SettingsTeam
                v-model:team="teamRight"
                v-model:score="scoreRight"
                v-model:spent-timeouts="spentTimeoutsRight"
                v-model:fols="folsRight"
                :tooltip1="'Z'"
                :tooltip2="'X'"
                :tooltip3="'C'"
            />
            <div class="mt-big">
                <div>
                    <label class="d-flex cursor-pointer">
                        <input
                            v-model="showArrow"
                            class="showArrow"
                            type="checkbox"
                        />
                        <div>
                            <div>Показывать</div>
                            <div>стрелочку</div>
                        </div>
                    </label>
                </div>
                <ArrowAttack
                    :width="'15vw'"
                    :height="'7vw'"
                    :direction="arrowDirection"
                    :show="true"
                    @click="arrowDirection = arrowDirection === 'left' ? 'right' : 'left'"
                />
                <div>
                    <label class="d-flex cursor-pointer">
                        <input
                            v-model="isMirror"
                            class="mirror"
                            type="checkbox"
                        />
                        <div>
                            <div>Зеркалить</div>
                            <div>табло</div>
                        </div>
                    </label>
                </div>
                <div>
                    <label class="cursor-pointer">
                        <div>Период</div>
                        <input
                            v-model.number="period"
                            class="period"
                            type="number"
                            min="1"
                            step="1"
                        />
                    </label>
                    <label class="cursor-pointer">
                        <div>Всего таймаутов</div>
                        <div>
                            <input
                                v-model.number="timeouts"
                                class="timeouts"
                                type="number"
                                min="2"
                                max="3"
                                step="1"
                            />
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, watch } from 'vue';
import '../scss/style.scss';
import TimeTicker from '../components/TimeTicker.js';
import CountdownObject from '../components/CountdownObject.js';
import soundBuzzerTimerPath from '../sounds/buzzer/beep_end_period.mp3';
import soundBuzzerCounter24Path from '../sounds/buzzer/portal2buzzer.mp3';
import SettingsTeam from './SettingsTeam.vue';
import SettingsClock from './SettingsClock.vue';
import SettingsCounter24 from './SettingsCounter24.vue';
import SettingsHelpText from './SettingsHelpText.vue';
import ArrowAttack from './ArrowAttack.vue';
import SettingsStartButton from './SettingsStartButton.vue';
import TooltipInner from './TooltipInner.vue';

const components = {
    SettingsTeam,
    SettingsClock,
    SettingsCounter24,
    SettingsHelpText,
    ArrowAttack,
    SettingsStartButton,
    TooltipInner,
};

const soundBuzzerTimer = new Audio(soundBuzzerTimerPath);
const soundBuzzerCounter24 = new Audio(soundBuzzerCounter24Path);

const vueData = reactive({
    isTimeRunning: false,
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
    timer: {
        tenths: 0,
        seconds: 0,
        minutes: 0,
    },
    counter24: {
        tenths: 0,
        seconds: 0,
    },
    startTimer() {
        timeTicker.startTimer();
    },
    stopTimer() {
        timeTicker.stopTimer();
    },
    soundBuzzerTimer,
    soundBuzzerCounter24,
});

const sendData = (objectToSend) => {
    window.electron.sendSettings(objectToSend);
};

const timeTicker = new TimeTicker({ delayMs: 100 });
timeTicker.events.on('tick', () => {
    countdownObject.minusTenth().checkForZero();
});
timeTicker.events.on('startTimer', () => {
    vueData.isTimeRunning = true;
    countdownObject.checkForZero();
});
timeTicker.events.on('stopTimer', () => {
    vueData.isTimeRunning = false;
});

const countdownObject = new CountdownObject();
countdownObject.events.on('zero', () => {
    timeTicker.stopTimer();
});
countdownObject.events.on('change', (prevValues) => {
    setTimeout(() => {
        vueData.timer.tenths = countdownObject.timer.tenths;
        vueData.timer.seconds = countdownObject.timer.seconds;
        vueData.timer.minutes = countdownObject.timer.minutes;
        vueData.counter24.tenths = countdownObject.counter24.tenths;
        vueData.counter24.seconds = countdownObject.counter24.seconds;
    });

    if (prevValues.timer.second !== countdownObject.timer.seconds) {
        sendData({
            timer: {
                seconds: countdownObject.timer.seconds,
                minutes: countdownObject.timer.minutes,
            },
        });
    }

    if (
        countdownObject.counter24.fullTenths < 100
        && countdownObject.counter24.fullTenths > 0
    ) {
        sendData({
            counter24: {
                tenths: countdownObject.counter24.tenths,
                seconds: countdownObject.counter24.seconds,
            },
        });
    } else if (
        countdownObject.counter24.seconds !== prevValues.seconds
        || countdownObject.counter24.fullTenths === 0
    ) {
        sendData({
            counter24: {
                tenths: null,
                seconds: countdownObject.counter24.seconds,
            },
        });
    }
});
countdownObject.events.on('minusTenths', (prevValues) => {
    if (
        countdownObject.timer.fullTenths === 0
        && countdownObject.timer.fullTenths !== prevValues.timer.fullTenths
    ) {
        soundBuzzerTimer.play();
    } else if (
        countdownObject.counter24.fullTenths === 0
        && countdownObject.counter24.fullTenths !== prevValues.counter24.fullTenths
    ) {
        soundBuzzerCounter24.play();
    }
});
countdownObject.changeParts({
    timer: {
        tenths: 9,
        seconds: 5,
        minutes: 1,
    },
    counter24: {
        tenths: 3,
        seconds: 7,
    },
});

// keydown space
document.body.addEventListener('keydown', (event) => {
    const { target, code } = event;
    if (target.nodeName === 'INPUT' && target.type === 'text') {
        return;
    }
    const actions = {
        KeyA() { countdownObject.changeParts({ counter24: { tenths: 0, seconds: 0 } }); },
        KeyS() { countdownObject.changeParts({ counter24: { tenths: 0, seconds: 14 } }); },
        KeyD() { countdownObject.changeParts({ counter24: { tenths: 0, seconds: 24 } }); },
        KeyQ() { vueData.scoreLeft += 1; },
        KeyW() { vueData.scoreLeft += 2; },
        KeyE() { vueData.scoreLeft += 3; },
        KeyZ() { vueData.scoreRight += 1; },
        KeyX() { vueData.scoreRight += 2; },
        KeyC() { vueData.scoreRight += 3; },
        Space() {
            if (timeTicker.isTimerRunning) {
                timeTicker.stopTimer();
            } else {
                timeTicker.startTimer();
            }
        },
    };
    if (actions[code] === undefined) {
        return;
    }
    event.preventDefault();
    actions[code]();
}, { capture: true });

watch(() => vueData.timer, ({ tenths, seconds, minutes }) => {
    countdownObject.changeParts({ timer: { tenths, seconds, minutes } });
}, { deep : true });

watch(() => vueData.counter24, ({ tenths, seconds }) => {
    countdownObject.changeParts({ counter24: { tenths, seconds } });
}, { deep : true });

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
        sendData({ [elem]: value });
    });
});

export default {
    components,
    setup() {
        return vueData;
    },
};
</script>
