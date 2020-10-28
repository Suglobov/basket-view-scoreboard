<template>
    <div class="settings-container uk-flex uk-flex-between uk-flex-wrap">
        <div>
            <div>
                <label>
                    Название
                    <div>
                        <input
                            class="teamLeft"
                            data-name="teamLeft"
                            type="text"
                        />
                    </div>
                </label>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <label>
                    Счет
                    <div>
                        <input
                            class="scoreLeft"
                            data-name="scoreLeft"
                            type="number"
                            value="0"
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
                    >
                        +1
                    </button>
                    <button
                        class="score-add"
                        data-add="2"
                        data-target-name="scoreLeft"
                    >
                        +2
                    </button>
                    <button
                        class="score-add"
                        data-add="3"
                        data-target-name="scoreLeft"
                    >
                        +3
                    </button>
                </div>
            </div>
            <div class="uk-flex">
                <label>
                    <div>таймауты</div>
                    <div>
                        <input
                            class="spentTimeoutsLeft"
                            data-name="spentTimeoutsLeft"
                            type="number"
                            value="0"
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
                            class="folsLeft"
                            data-name="folsLeft"
                            type="number"
                            value="0"
                            min="0"
                            max="100"
                            step="1"
                        />
                    </div>
                </label>
            </div>
        </div>
        <div>
            <div class="uk-flex">
                <label>
                    Минуты
                    <div>
                        <input
                            class="minutes"
                            data-name="minutes"
                            type="number"
                            value="10"
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
                            class="seconds"
                            data-name="seconds"
                            type="number"
                            value="0"
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
                            class="tenths"
                            data-name="tenths"
                            type="number"
                            value="0"
                            min="0"
                            max="9"
                            step="1"
                        />
                    </div>
                </label>
            </div>
            <div>
                <button class="set-5">
                    = 5 минут
                </button>
                <button class="set-10">
                    = 10 минут
                </button>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <label>
                    Счетчик 24 секунд
                    <div>
                        <input
                            class="counter24"
                            data-name="counter24"
                            type="number"
                            value="24"
                            min="0"
                            max="24"
                            step="0.1"
                        />
                    </div>
                </label>
                <div>
                    <div>
                        <button class="set-14">
                            = 14
                        </button>
                    </div>
                    <div>
                        <button class="set-24">
                            = 24
                        </button>
                    </div>
                </div>
            </div>
            <div class="uk-flex uk-flex-bottom uk-margin-top uk-margin-bottom">
                <div
                    class="clock-control"
                    uk-tooltip="реагирует на пробел. Если нажимать пробел в поле ввода, то таймер не среагирует"
                >
                    <button class="start-timer">
                        Старт
                    </button>
                    <button class="stop-timer">
                        Пауза
                    </button>
                </div>
                <div>
                    <div>
                        <label><input
                            class="showArrow"
                            data-name="showArrow"
                            type="checkbox"
                        />Показывать стрелочку</label>
                    </div>
                    <div class="settings-arrow-wrapper">
                        <svg
                            class="settings-arrow-left"
                            preserveAspectRatio="none"
                            version="1.1"
                            xmlns="http://www.w3.org/2000/svg"
                            xmlns:xlink="http://www.w3.org/1999/xlink"
                            x="0px"
                            y="0px"
                            viewBox="0 0 561.803 561.802"
                        >
                            <polygon
                                points="240.773,521.674 240.773,411.322 561.803,411.322 561.803,152.994 240.773,152.994 240.773,40.128 0,280.905 "
                            />
                        </svg>
                    </div>
                </div>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <div>
                    <label>
                        <div>Четверть</div>
                        <input
                            class="quarter"
                            data-name="quarter"
                            type="number"
                            value="1"
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
                            class="overtime"
                            data-name="overtime"
                            type="number"
                            value="0"
                            min="0"
                            max="1000"
                            step="1"
                        />
                    </label>
                </div>
                <div>
                    <label><input
                        class="mirror"
                        data-name="mirror"
                        type="checkbox"
                    />Зеркалить табло</label>
                </div>
            </div>
            <div>
                <label>
                    <div>Всего таймаутов</div>
                    <div>
                        <input
                            class="timeouts"
                            data-name="timeouts"
                            type="number"
                            value="2"
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
                            class="teamRight"
                            data-name="teamRight"
                            type="text"
                        />
                    </div>
                </label>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <label>
                    Счет
                    <div>
                        <input
                            class="scoreRight"
                            data-name="scoreRight"
                            type="number"
                            value="0"
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
                    >
                        +1
                    </button>
                    <button
                        class="score-add"
                        data-add="2"
                        data-target-name="scoreRight"
                    >
                        +2
                    </button>
                    <button
                        class="score-add"
                        data-add="3"
                        data-target-name="scoreRight"
                    >
                        +3
                    </button>
                </div>
            </div>
            <div class="uk-flex">
                <label>
                    <div>таймауты</div>
                    <div>
                        <input
                            class="spentTimeoutsRight"
                            data-name="spentTimeoutsRight"
                            type="number"
                            value="0"
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
                            class="folsRight"
                            data-name="folsRight"
                            type="number"
                            value="0"
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

import { reactive, onMounted } from 'vue';
import './../js/common.js';
import TimeTicker from './TimeTicker.js';
import CountdownObject from './CountdownObject.js';
import debounce from './debounce.js';
import soundBuzzerTimerPath from '../sounds/buzzer/zvuk-gudka-u-mashinyi-skoroy-pomoschi-13746.mp3';
import soundBuzzerCounter24Path from '../sounds/buzzer/portal2buzzer.mp3';

const soundBuzzerTimer = new Audio(soundBuzzerTimerPath);
const soundBuzzerCounter24 = new Audio(soundBuzzerCounter24Path);

const vueData = reactive({
    teamLeft: 'Космические волки',
    teamRight: 'Команда П',
    scoreLeft: 100,
    scoreRight: 100,
    folsLeft: 0,
    folsRight: 0,
    periodText: 'Четверть',
    periodValue: 1,
    isMirror: false,
    showArrow: false,
    arrowDirection: 'left',
    seconds: 0,
    minutes: 0,
    counter24: 24,
    tenthsOfSecond: 0,
    timeouts: 2,
    spentTimeoutsLeft: 0,
    spentTimeoutsRight: 0,
});

const listenersDelay = 200;

const sendData = (objectToSend) => {
    window.electron.sendSettings(objectToSend);
};
const afterMountedVue = () => {
    const dom = {
        startTimer: document.querySelector('.start-timer'),
        stopTimer: document.querySelector('.stop-timer'),
        set5: document.querySelector('.set-5'),
        set10: document.querySelector('.set-10'),
        set14: document.querySelector('.set-14'),
        set24: document.querySelector('.set-24'),
        clockControl: document.querySelector('.clock-control'),
        arrow: document.querySelector('.settings-arrow-left'),
        sets: document.querySelectorAll('.set-value'),
        buttons: document.querySelectorAll('.score-add'),
        teamLeft: document.querySelector('[data-name="teamLeft"]'),
        teamRight: document.querySelector('[data-name="teamRight"]'),
        scoreLeft: document.querySelector('[data-name="scoreLeft"]'),
        scoreRight: document.querySelector('[data-name="scoreRight"]'),
        folsLeft: document.querySelector('[data-name="folsLeft"]'),
        folsRight: document.querySelector('[data-name="folsRight"]'),
        spentTimeoutsLeft: document.querySelector('[data-name="spentTimeoutsLeft"]'),
        spentTimeoutsRight: document.querySelector('[data-name="spentTimeoutsRight"]'),
        quarter: document.querySelector('[data-name="quarter"]'),
        overtime: document.querySelector('[data-name="overtime"]'),
        counter24: document.querySelector('[data-name="counter24"]'),
        minutes: document.querySelector('[data-name="minutes"]'),
        seconds: document.querySelector('[data-name="seconds"]'),
        tenths: document.querySelector('[data-name="tenths"]'),
        mirror: document.querySelector('[data-name="mirror"]'),
        showArrow: document.querySelector('[data-name="showArrow"]'),
        timeouts: document.querySelector('[data-name="timeouts"]'),
    };
    // console.log('dom', dom);

    const timeTicker = new TimeTicker({ delayMs: 100 });
    timeTicker.events.on('tick', () => {
        countdownObject.minusTenth().checkForZero();
    });
    timeTicker.events.on('startTimer', () => {
        dom.clockControl.classList.add('time-running');
        countdownObject.checkForZero();
    });
    timeTicker.events.on('stopTimer', () => {
        dom.clockControl.classList.remove('time-running');
    });

    const countdownObject = new CountdownObject();
    countdownObject.events.on('zero', () => {
        timeTicker.stopTimer();
    });
    countdownObject.events.on('change', () => {
        dom.tenths.value = countdownObject.timer.tenths;
        dom.seconds.value = countdownObject.timer.seconds;
        dom.minutes.value = countdownObject.timer.minutes;
        dom.counter24.value = `${countdownObject.counter24.seconds}.${countdownObject.counter24.tenths}`;
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

    // listeners
    dom.tenths.addEventListener('input', debounce((event) => {
        countdownObject.changeParts({
            timer: { tenths: Number(event.target.value) },
        });
    }, listenersDelay));
    dom.seconds.addEventListener('input', debounce((event) => {
        countdownObject.changeParts({
            timer: { seconds: Number(event.target.value) },
        });
    }, listenersDelay));
    dom.minutes.addEventListener('input', debounce((event) => {
        countdownObject.changeParts({
            timer: { minutes: Number(event.target.value) },
        });
    }, listenersDelay));
    dom.counter24.addEventListener('input', debounce((event) => {
        const values = event.target.value.split('.');
        countdownObject.changeParts({
            counter24: {
                tenths: Number(values[1] === undefined ? 0 : values[1]),
                seconds: Number(values[0]),
            },
        });
    }, listenersDelay));

    dom.set5.addEventListener('click', () => {
        countdownObject.changeParts({
            timer: { tenths: 0, seconds: 0, minutes: 5 },
        });
    });
    dom.set10.addEventListener('click', () => {
        countdownObject.changeParts({
            timer: { tenths: 0, seconds: 0, minutes: 10 },
        });
    });
    dom.set14.addEventListener('click', () => {
        countdownObject.changeParts({
            counter24: { tenths: 0, seconds: 14 },
        });
    });
    dom.set24.addEventListener('click', () => {
        countdownObject.changeParts({
            counter24: { tenths: 0, seconds: 24 },
        });
    });

    [
        dom.teamLeft, dom.teamRight, dom.scoreLeft, dom.scoreRight, dom.folsLeft, dom.folsRight,
        dom.timeouts, dom.spentTimeoutsLeft, dom.spentTimeoutsRight, dom.quarter, dom.overtime,
    ].forEach((element) => {
        element.addEventListener('input', debounce((event) => {
            const { target } = event;
            const { value } = target;
            const { name } = target.dataset;
            sendData({ [name]: value });
        }, listenersDelay));
    });

    // buttons add score
    dom.buttons.forEach((button) => {
        const { add, targetName } = button.dataset;
        const score = dom[targetName];

        button.addEventListener('click', () => {
            score.value = Number(score.value) + Number(add);
            const value = Number(score.value);
            sendData({ [targetName]: value });
        });
    });


    dom.startTimer.addEventListener('click', function () {
        timeTicker.startTimer();
    });
    dom.stopTimer.addEventListener('click', function () {
        timeTicker.stopTimer();
    });
    dom.arrow.addEventListener('click', function () {
        dom.arrow.classList.toggle('arrow-right');
        sendData({ arrowDirection: dom.arrow.classList.contains('arrow-right') ? 'right' : 'left' });
    });
    dom.mirror.addEventListener('input', debounce((event) => {
        const { target } = event;
        sendData({ isMirror: target.checked });
    }, listenersDelay));
    dom.showArrow.addEventListener('input', debounce((event) => {
        const { target } = event;
        sendData({ showArrow: target.checked });
    }, listenersDelay));

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
};



export default {
    setup() {
        onMounted(() => {
            afterMountedVue();
        });
    },
};
</script>
