<template>
    <div class="settings-container font-Aldrich d-flex flex-between flex-wrap">
        <div>
            <SettingsTeam
                v-model:team="teamLeft"
                v-model:score="scoreLeft"
                v-model:spent-timeouts="spentTimeoutsLeft"
                v-model:fols="folsLeft"
                :side="'left'"
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
            <SettingsStartButton :is-time-running="isTimeRunning" />
            <hr>
            <SettingsCounter24
                v-model:tenths="counter24.tenths"
                v-model:seconds="counter24.seconds"
            />
            <SettingsSyncCounter24Button v-model:on="isCounter24SyncWithTimer" />
        </div>
        <div>
            <SettingsTeam
                v-model:team="teamRight"
                v-model:score="scoreRight"
                v-model:spent-timeouts="spentTimeoutsRight"
                v-model:fols="folsRight"
                :side="'right'"
            />
            <div class="mt-big">
                <div>
                    <label class="d-flex cursor-pointer">
                        <input
                            v-model="showArrow"
                            class="showArrow"
                            type="checkbox"
                        >
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
                        >
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
                        >
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
                            >
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../scss/style.scss';
import TimeTicker from '../components/TimeTicker.js';
import CountdownManager from '../components/CountdownManager.js';
import sendSettings from '../components/sendSettings.js';

import soundBuzzerTimerPath from '../sounds/buzzer/beep_end_period.mp3';
import soundBuzzerCounter24Path from '../sounds/buzzer/portal2buzzer.mp3';

import { reactive, watch, provide } from 'vue';
import SettingsTeam from './SettingsTeam.vue';
import SettingsClock from './SettingsClock.vue';
import SettingsCounter24 from './SettingsCounter24.vue';
import SettingsHelpText from './SettingsHelpText.vue';
import ArrowAttack from './ArrowAttack.vue';
import SettingsStartButton from './SettingsStartButton.vue';
import TooltipInner from './TooltipInner.vue';
import SettingsSyncCounter24Button from './SettingsSyncCounter24Button.vue';

const components = {
    SettingsTeam,
    SettingsClock,
    SettingsCounter24,
    SettingsHelpText,
    ArrowAttack,
    SettingsStartButton,
    TooltipInner,
    SettingsSyncCounter24Button,
};

const soundBuzzerTimer = new Audio(soundBuzzerTimerPath);
const soundBuzzerCounter24 = new Audio(soundBuzzerCounter24Path);

const funcStorage = {
    startStopTimer: {
        hint: 'остановка/запуск таймера',
        action: () => {
            if (timeTicker.isTimerRunning === false) {
                timeTicker.startTimer();
            } else {
                timeTicker.stopTimer();
            }
        },
    },
    setTimerTo5m: {
        hint: 'таймер на 5 минут',
        action: () => {
            countdownManager.changeParts({ timer: { tenths: 0, seconds: 0, minutes: 5 } });
        },
    },
    setTimerTo10m: {
        hint: 'таймер на 10 минут',
        action: () => {
            countdownManager.changeParts({ timer: { tenths: 0, seconds: 0, minutes: 10 } });
        },
    },
    startStopCounter24: {
        hint: 'старт/стоп счетчика 24',
        action: () => {
            vueData.isCounter24SyncWithTimer = !vueData.isCounter24SyncWithTimer;
        },
    },
    setCounter24To14: {
        hint: 'счетчик 24 на 14',
        action: () => {
            countdownManager.changeParts({ counter24: { tenths: 0, seconds: 14 } });
        },
    },
    setCounter24To24: {
        hint: 'счетчик 24 на 24',
        action: () => {
            countdownManager.changeParts({ counter24: { tenths: 0, seconds: 24 } });
        },
    },
    addScoreLeft1: {
        hint: '+1 к левой команде',
        action: () => {
            vueData.scoreLeft += 1;
        },
    },
    addScoreLeft2: {
        hint: '+2 к левой команде',
        action: () => {
            vueData.scoreLeft += 2;
        },
    },
    addScoreLeft3: {
        hint: '+3 к левой команде',
        action: () => {
            vueData.scoreLeft += 3;
        },
    },
    addScoreRight1: {
        hint: '+1 к правой команде',
        action: () => {
            vueData.scoreRight += 1;
        },
    },
    addScoreRight2: {
        hint: '+2 к правой команде',
        action: () => {
            vueData.scoreRight += 2;
        },
    },
    addScoreRight3: {
        hint: '+3 к правой команде',
        action: () => {
            vueData.scoreRight += 3;
        },
    },
};
const hotKeyStorage = {
    KeyQ: { hint: 'Q' },
    KeyW: { hint: 'W' },
    KeyE: { hint: 'E' },
    KeyA: { hint: 'A' },
    KeyS: { hint: 'S' },
    KeyD: { hint: 'D' },
    KeyZ: { hint: 'Z' },
    KeyX: { hint: 'X' },
    KeyC: { hint: 'C' },
    Space: { hint: 'Пробел' },
};
const hotKeyFuncSettings = [
    { hotKey: 'KeyQ', func: 'addScoreLeft1' },
    { hotKey: 'KeyW', func: 'addScoreLeft2' },
    { hotKey: 'KeyE', func: 'addScoreLeft3' },
    { hotKey: 'KeyA', func: 'startStopCounter24' },
    { hotKey: 'KeyS', func: 'setCounter24To14' },
    { hotKey: 'KeyD', func: 'setCounter24To24' },
    { hotKey: 'KeyZ', func: 'addScoreRight1' },
    { hotKey: 'KeyX', func: 'addScoreRight2' },
    { hotKey: 'KeyC', func: 'addScoreRight3' },
    { hotKey: 'Space', func: 'startStopTimer' },
];
const hotKeyBindFunc = hotKeyFuncSettings.reduce((res, elem) => {
    res[elem.hotKey] = elem.func;
    return res;
}, {});
const funcBindHotKey = hotKeyFuncSettings.reduce((res, elem) => {
    res[elem.func] = elem.hotKey;
    return res;
}, {});
const hotKeyAction = Object.keys(hotKeyStorage).reduce((res, hotKeyName) => {
    const funcName = hotKeyBindFunc[hotKeyName];
    const currentAction = funcStorage[funcName].action;
    res[hotKeyName] = (funcName === undefined) ? () => {} : currentAction;
    return res;
}, {});
const funcHint = Object.keys(funcStorage).reduce((res, funcName) => {
    const hotKeyName = funcBindHotKey[funcName];
    const currentHotKey = hotKeyStorage[hotKeyName];
    res[funcName] = (hotKeyName === undefined) ? '' : currentHotKey.hint;
    return res;
}, {});

const vueData = reactive({
    isTimeRunning: false,
    isCounter24SyncWithTimer: true,
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
    timer: { tenths: 0, seconds: 0, minutes: 0 },
    counter24: { tenths: 0, seconds: 0 },
    startTimer () {
        timeTicker.startTimer();
    },
    stopTimer () {
        timeTicker.stopTimer();
    },
    soundBuzzerTimer,
    soundBuzzerCounter24,
});

const timeTicker = new TimeTicker({ delayMs: 100 });
timeTicker.events.on('tick', () => {
    countdownManager
        .minusTenth({
            timer: true,
            counter24: vueData.isCounter24SyncWithTimer,
        })
        .checkForZero();
});
timeTicker.events.on('startTimer', () => {
    vueData.isTimeRunning = true;
    countdownManager.checkForZero();
});
timeTicker.events.on('stopTimer', () => {
    vueData.isTimeRunning = false;
});

const countdownManager = new CountdownManager();
countdownManager.events.on('zero', () => {
    timeTicker.stopTimer();
});
countdownManager.events.on('change', (prevValues) => {
    const { timer, counter24 } = countdownManager;
    const { timer: prevTimer } = prevValues;

    setTimeout(() => {
        vueData.timer.tenths = timer.tenths;
        vueData.timer.seconds = timer.seconds;
        vueData.timer.minutes = timer.minutes;
        vueData.counter24.tenths = counter24.tenths;
        vueData.counter24.seconds = counter24.seconds;
    });

    if (prevTimer.second !== timer.seconds) {
        sendSettings({ timer: { seconds: timer.seconds, minutes: timer.minutes } });
    }

    if (counter24.fullTenths < 100 && counter24.fullTenths > 0) {
        sendSettings({ counter24: { tenths: counter24.tenths, seconds: counter24.seconds } });
    } else if (counter24.seconds !== prevValues.seconds || counter24.fullTenths === 0) {
        sendSettings({ counter24: { tenths: null, seconds: counter24.seconds } });
    }
});
countdownManager.events.on('minusTenths', (prevValues) => {
    const { timer, counter24 } = countdownManager;
    const { timer: prevTimer, counter24: prevCounter24 } = prevValues;
    if (timer.fullTenths === 0 && timer.fullTenths !== prevTimer.fullTenths) {
        soundBuzzerTimer.play();
    } else if (counter24.fullTenths === 0 && counter24.fullTenths !== prevCounter24.fullTenths) {
        soundBuzzerCounter24.play();
    }
});
countdownManager.changeParts({
    timer: { tenths: 9, seconds: 5, minutes: 1 },
    counter24: { tenths: 3, seconds: 7 },
});

// keydown space
document.body.addEventListener('keydown', (event) => {
    const { target, code } = event;
    if (target.nodeName === 'INPUT' && target.type === 'text') {
        return;
    }
    if (hotKeyAction[code] === undefined) {
        return;
    }
    event.preventDefault();
    hotKeyAction[code]();
}, { capture: true });

watch(() => vueData.timer, ({ tenths, seconds, minutes }) => {
    countdownManager.changeParts({ timer: { tenths, seconds, minutes } });
}, { deep: true });

watch(() => vueData.counter24, ({ tenths, seconds }) => {
    countdownManager.changeParts({ counter24: { tenths, seconds } });
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

export default {
    components,
    setup () {
        provide('hotKeyStorage', hotKeyStorage);
        provide('funcStorage', funcStorage);
        provide('hotKeyFuncSettings', hotKeyFuncSettings);
        provide('funcHint', funcHint);

        return vueData;
    },
};
</script>
