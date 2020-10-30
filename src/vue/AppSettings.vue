<template>
    <div class="settings-container font-Aldrich d-flex flex-between flex-wrap">
        <div>
            <div>
                <label>
                    Название
                    <div>
                        <input
                            v-model="teamLeft"
                            class="teamLeft"
                            type="text"
                        />
                    </div>
                </label>
            </div>
            <div class="d-flex flex-bottom">
                <label>
                    Счет
                    <div>
                        <input
                            v-model.number="scoreLeft"
                            class="scoreLeft"
                            type="number"
                            min="0"
                            max="1000"
                            step="1"
                        />
                    </div>
                </label>
                <div>
                    <button
                        class="score-add"
                        data-add="1"
                        data-target-name="scoreLeft"
                        @click="scoreLeft += 1"
                    >
                        +1
                    </button>
                    <button
                        class="score-add"
                        data-add="2"
                        data-target-name="scoreLeft"
                        @click="scoreLeft += 2"
                    >
                        +2
                    </button>
                    <button
                        class="score-add"
                        data-add="3"
                        data-target-name="scoreLeft"
                        @click="scoreLeft += 3"
                    >
                        +3
                    </button>
                </div>
            </div>
            <div class="d-flex">
                <label>
                    <div>таймауты</div>
                    <div>
                        <input
                            v-model.number="spentTimeoutsLeft"
                            class="spentTimeoutsLeft"
                            type="number"
                            min="0"
                            max="3"
                            step="1"
                        />
                    </div>
                </label>
                <label>
                    Фолы
                    <div>
                        <input
                            v-model.number="folsLeft"
                            class="folsLeft"
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </div>
                </label>
            </div>
        </div>
        <div>
            <div class="d-flex">
                <label>
                    Минуты
                    <div>
                        <input
                            v-model.number="minutes"
                            class="minutes"
                            type="number"
                            min="0"
                            max="10"
                            step="1"
                        />
                    </div>
                </label>
                <label>
                    Секунды
                    <div>
                        <input
                            v-model.number="seconds"
                            class="seconds"
                            type="number"
                            min="0"
                            max="59"
                            step="1"
                        />
                    </div>
                </label>
                <label>
                    Десятые
                    <div>
                        <input
                            v-model.number="tenths"
                            class="tenths"
                            type="number"
                            min="0"
                            max="9"
                            step="1"
                        />
                    </div>
                </label>
            </div>
            <div>
                <button
                    class="setValue"
                    @click="setTimer({ tenths: 0, seconds: 0, minutes: 5 })"
                >
                    = 5 минут
                </button>
                <button
                    class="setValue"
                    @click="setTimer({ tenths: 0, seconds: 0, minutes: 10 })"
                >
                    = 10 минут
                </button>
            </div>
            <div>
                <div>
                    <label>
                        Счетчик 24 секунд
                        <div>
                            <input
                                v-model="counter24"
                                class="counter24"
                                type="number"
                                min="0"
                                max="24"
                                step="0.1"
                            />
                        </div>
                    </label>
                </div>
                <div>
                    <div>
                        <button
                            class="setValue"
                            @click="setCounter24({ tenths: 0, seconds: 14 })"
                        >
                            = 14
                        </button>
                        <button
                            class="setValue"
                            @click="setCounter24({ tenths: 0, seconds: 24 })"
                        >
                            = 24
                        </button>
                    </div>
                    <div>
                        <button
                            class="setValue"
                            @click="setCounter24({ tenths: 0, seconds: 0 })"
                        >
                            = 0 (без баззера)
                        </button>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-bottom">
                <div
                    v-tooltip="'реагирует на пробел. Если нажимать пробел в поле ввода, то таймер не среагирует'"
                    uk-tooltip="Hello World"
                    class="clock-control"
                    :class="{ 'time-running': isTimeRunning }"
                >
                    <button
                        class="start-timer"
                        @click="startTimer()"
                    >
                        Старт
                    </button>
                    <button
                        class="stop-timer"
                        @click="stopTimer()"
                    >
                        Пауза
                    </button>
                </div>
                <div>
                    <div>
                        <label><input
                            v-model="showArrow"
                            class="showArrow"
                            type="checkbox"
                        />Показывать стрелочку</label>
                    </div>
                    <div class="settings-arrow-wrapper">
                        <svg
                            class="settings-arrow-left"
                            :class="{
                                'arrow-right': arrowDirection === 'right',
                            }"
                            preserveAspectRatio="none"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 561.803 561.802"
                            @click="
                                arrowDirection =
                                    arrowDirection === 'left' ? 'right' : 'left'
                            "
                        >
                            <polygon
                                points="240.773,521.674 240.773,411.322 561.803,411.322 561.803,152.994 240.773,152.994 240.773,40.128 0,280.905 "
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="d-flex flex-bottom">
                <div>
                    <label>
                        <div>Четверть</div>
                        <input
                            v-model.number="quarter"
                            class="quarter"
                            type="number"
                            min="1"
                            max="4"
                            step="1"
                        />
                    </label>
                </div>
                <div>
                    <label>
                        <div>Овертайм</div>
                        <input
                            v-model.number="overtime"
                            class="overtime"
                            type="number"
                            min="0"
                            max="1000"
                            step="1"
                        />
                    </label>
                </div>
                <div>
                    <label><input
                        v-model="isMirror"
                        class="mirror"
                        type="checkbox"
                    />Зеркалить табло</label>
                </div>
            </div>
            <div>
                <label>
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
        <div>
            <div>
                <label>
                    Название
                    <div>
                        <input
                            v-model="teamRight"
                            class="teamRight"
                            type="text"
                        />
                    </div>
                </label>
            </div>
            <div class="d-flex flex-bottom">
                <label>
                    Счет
                    <div>
                        <input
                            v-model.number="scoreRight"
                            class="scoreRight"
                            type="number"
                            min="0"
                            max="1000"
                            step="1"
                        />
                    </div>
                </label>
                <div>
                    <button
                        class="score-add"
                        data-add="1"
                        data-target-name="scoreRight"
                        @click="scoreRight += 1"
                    >
                        +1
                    </button>
                    <button
                        class="score-add"
                        data-add="2"
                        data-target-name="scoreRight"
                        @click="scoreRight += 2"
                    >
                        +2
                    </button>
                    <button
                        class="score-add"
                        data-add="3"
                        data-target-name="scoreRight"
                        @click="scoreRight += 3"
                    >
                        +3
                    </button>
                </div>
            </div>
            <div class="d-flex">
                <label>
                    <div>таймауты</div>
                    <div>
                        <input
                            v-model.number="spentTimeoutsRight"
                            class="spentTimeoutsRight"
                            type="number"
                            min="0"
                            max="3"
                            step="1"
                        />
                    </div>
                </label>
                <label>
                    Фолы
                    <div>
                        <input
                            v-model.number="folsRight"
                            class="folsRight"
                            type="number"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </div>
                </label>
            </div>
        </div>
    </div>
</template>

<script>
import { reactive, watch } from 'vue';
import '../scss/style.scss';
import TimeTicker from '../components/TimeTicker.js';
import CountdownObject from '../components/CountdownObject.js';
import soundBuzzerTimerPath from '../sounds/buzzer/beep_end_period.wav';
import soundBuzzerCounter24Path from '../sounds/buzzer/portal2buzzer.mp3';

const soundBuzzerTimer = new Audio(soundBuzzerTimerPath);
const soundBuzzerCounter24 = new Audio(soundBuzzerCounter24Path);

const vueData = reactive({
    isTimeRunning: false,
    quarter: 1,
    overtime: 0,
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
    tenths: 0,
    seconds: 0,
    minutes: 0,
    counter24: '24.0',
    setTimer({ tenths, seconds, minutes }) {
        countdownObject.changeParts({
            timer: { tenths, seconds, minutes },
        });
    },
    setCounter24({ tenths, seconds }) {
        countdownObject.changeParts({
            counter24: { tenths, seconds },
        });
    },
    startTimer() {
        timeTicker.startTimer();
    },
    stopTimer() {
        timeTicker.stopTimer();
    },
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
    vueData.tenths = countdownObject.timer.tenths;
    vueData.seconds = countdownObject.timer.seconds;
    vueData.minutes = countdownObject.timer.minutes;
    vueData.counter24 = `${countdownObject.counter24.seconds}.${countdownObject.counter24.tenths}`;

    if (prevValues.timer.second !== countdownObject.timer.seconds) {
        sendData({
            seconds: countdownObject.timer.seconds,
            minutes: countdownObject.timer.minutes,
        });
    }
    if (
        countdownObject.counter24.fullTenths < 100
        && countdownObject.counter24.fullTenths > 0) {
        sendData({
            counter24: countdownObject.counter24.seconds,
            tenths: countdownObject.counter24.tenths,
        });
    } else if (countdownObject.counter24.fullTenths === 0) {
        sendData({
            counter24: countdownObject.counter24.seconds,
            tenths: null,
        });
    } else if (countdownObject.counter24.seconds !== prevValues.seconds) {
        sendData({
            counter24: countdownObject.counter24.seconds,
            tenths: null,
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
    if (code !== 'Space') {
        return;
    }
    if (target.nodeName === 'INPUT' && target.type !== 'number') {
        return;
    }
    event.preventDefault();
    if (timeTicker.isTimerRunning) {
        timeTicker.stopTimer();
    } else {
        timeTicker.startTimer();
    }
}, { capture: true });


[
    'tenths',
    'seconds',
    'minutes',
].forEach((elem) => {
    watch(() => vueData[elem], (value) => {
        countdownObject.changeParts({ timer: { [elem]: value } });
    });
});
watch(() => vueData.counter24, (value) => {
    const values = value.split('.');
    countdownObject.changeParts({
        counter24: {
            tenths: Number(values[1] === undefined ? 0 : values[1]),
            seconds: Number(values[0]),
        },
    });
});
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
    'overtime',
    'quarter',
].forEach((elem) => {
    watch(() => vueData[elem], (value) => {
        sendData({ [elem]: value });
    });
});

export default {
    directives: {
        tooltip: {
            mounted(el, binding) {
                const tooltipElement = document.createElement('div');
                tooltipElement.classList.add('tooltip');
                tooltipElement.innerHTML = binding.value;
                document.body.append(tooltipElement);

                el.addEventListener('mouseover', (/* event */) => {
                    setTimeout(() => {
                        tooltipElement.classList.add('tooltip-show');
                        const rectEl = el.getBoundingClientRect();
                        tooltipElement.style.width = `${rectEl.width}px`;
                        const rectTool = tooltipElement.getBoundingClientRect();
                        tooltipElement.style.top = `${rectEl.top - rectTool.height}px`;
                        tooltipElement.style.left = `${rectEl.left}px`;
                        setTimeout(() => tooltipElement.classList.add('tooltip-opacity'));
                    });
                });
                el.addEventListener('mouseout', (/* event */) => {
                    tooltipElement.classList.remove('tooltip-show');
                    tooltipElement.classList.remove('tooltip-opacity');
                });
            },
        },
    },
    setup() {
        return vueData;
    },
};
</script>
