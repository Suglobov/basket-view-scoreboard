<template>
    <div class="settings-container uk-flex uk-flex-between uk-flex-wrap">
        <div class="">
            <div>
                <label class="">
                    Название
                    <div class="">
                        <input
                            class="teamLeft"
                            data-name="teamLeft"
                            type="text"
                        />
                    </div>
                </label>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <label class="">
                    Счет
                    <div class="">
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
                <label class="">
                    <div>таймауты</div>
                    <div class="">
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
                <label class="">
                    Фолы
                    <div class="">
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
        <div class="">
            <div class="uk-flex">
                <label class="">
                    Минуты
                    <div class="">
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
                <label class="">
                    Секунды
                    <div class="">
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
                <label class="">
                    Десятые
                    <div class="">
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
                <button class="set-5">= 5 минут</button>
                <button class="set-10">= 10 минут</button>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <label class="">
                    Счетчик 24 секунд
                    <div class="">
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
                        <button class="set-14">= 14</button>
                    </div>
                    <div>
                        <button class="set-24">= 24</button>
                    </div>
                </div>
            </div>
            <div class="uk-flex uk-flex-bottom uk-margin-top uk-margin-bottom">
                <div
                    class="clock-control"
                    uk-tooltip="реагирует на пробел. Если нажимать пробел в поле ввода, то таймер не среагирует"
                >
                    <button class="start-timer">Старт</button>
                    <button class="stop-timer">Пауза</button>
                </div>
                <div>
                    <div>
                        <label
                            ><input
                                class="showArrow"
                                data-name="showArrow"
                                type="checkbox"
                            />Показывать стрелочку</label
                        >
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
                            ></polygon>
                        </svg>
                    </div>
                </div>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <div>
                    <label class="">
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
                    <label class="">
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
                    <label
                        ><input
                            class="mirror"
                            data-name="mirror"
                            type="checkbox"
                        />Зеркалить табло</label
                    >
                </div>
            </div>
            <div>
                <label class="">
                    <div>Всего таймаутов</div>
                    <div class="">
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
        <div class="">
            <div>
                <label class="">
                    Название
                    <div class="">
                        <input
                            class="teamRight"
                            data-name="teamRight"
                            type="text"
                        />
                    </div>
                </label>
            </div>
            <div class="uk-flex uk-flex-bottom">
                <label class="">
                    Счет
                    <div class="">
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
                <label class="">
                    <div>таймауты</div>
                    <div class="">
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
                <label class="">
                    Фолы
                    <div class="">
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
import Countdown from './Countdown.js';


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
const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
};

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
        timer
            .minusTenth()
            .checkForZero();
        counter24
            .minusTenth()
            .checkForZero();
        // countdownObject
        //     .minus1()
        //     .checkForZero();
    });
    timeTicker.events.on('startTimer', () => {
        timer.checkForZero();
        // countdownObject.checkForZero();
        dom.clockControl.classList.add('time-running');
    });
    timeTicker.events.on('stopTimer', () => {
        dom.clockControl.classList.remove('time-running');
    });


    const correctCounter24 = ({ timer, counter24 }) => {
        if (timer.lessEqualLarger(counter24) === 'larger') {
            counter24.setValuesFrom(timer);
        }
    };

    const timer = new Countdown();
    timer.events.on('zero', () => {
        timeTicker.stopTimer();
    });
    timer.events.on('change', (changedFields) => {
        dom.tenths.value = timer.give().tenths.give().val;
        dom.seconds.value = timer.give().seconds.give().val;
        dom.minutes.value = timer.give().minutes.give().val;
        if (changedFields.includes('seconds')) {
            sendData({
                seconds: timer.give().seconds.give().val,
                minutes: timer.give().minutes.give().val,
            });
        }
    });
    timer.setValues({
        tenths: 9,
        seconds: 15,
        minutes: 0,
    });

    const counter24 = new Countdown();
    counter24.events.on('change', (changedFields) => {
        correctCounter24({ timer, counter24 });
        dom.counter24.value = `${counter24.give().seconds.give().val}.${counter24.give().tenths.give().val}`;
        const tenthsIntegerNumber = counter24.give().tenths;
        const secondsIntegerNumber = counter24.give().seconds;
        if (
            secondsIntegerNumber.give().val < 10
            && !(secondsIntegerNumber.give().val === secondsIntegerNumber.give().min
                && tenthsIntegerNumber.give().val === tenthsIntegerNumber.give().min)
        ) {
            sendData({
                counter24: counter24.give().seconds.give().val,
                tenthsOfSecond: counter24.give().tenths.give().val,
            });
        } else if (
            secondsIntegerNumber.give().val === secondsIntegerNumber.give().min
            && tenthsIntegerNumber.give().val === tenthsIntegerNumber.give().min
        ) {
            sendData({
                counter24: counter24.give().seconds.give().val,
                tenthsOfSecond: null,
            });
        } else {
            sendData({
                counter24: counter24.give().seconds.give().val,
                tenthsOfSecond: counter24.give().tenths.give().val,
            });
        }
    });
    counter24.setValues({
        tenths: 9,
        seconds: 15,
    });


    const countdownObject = new CountdownObject();
    // countdownObject.events.on('zero', () => {
    //     timeTicker.stopTimer();
    // });
    // countdownObject.events.on('changed', (maxChangedIndex) => {
    // const cdData = countdownObject.give();
    // dom.seconds.value = cdData.time[1].value;
    // dom.minutes.value = cdData.time[2].value;
    // dom.counter24.value = `${cdData.counter24[1].value}.${cdData.counter24[0].value}`;
    // if (
    //     cdData.counter24[1].value < 10
    //     && !(cdData.counter24[0].value === 0 && cdData.counter24[1].value === 0)
    // ) {
    //     sendData({
    //         seconds: cdData.time[1].value,
    //         minutes: cdData.time[2].value,
    //         tenthsOfSecond: cdData.counter24[0].value,
    //         counter24: cdData.counter24[1].value,
    //     });
    // } else if (maxChangedIndex > 0 || countdownObject.time.isZero()) {
    //     sendData({
    //         seconds: cdData.time[1].value,
    //         minutes: cdData.time[2].value,
    //         tenthsOfSecond: null,
    //         counter24: cdData.counter24[1].value,
    //     });
    // }
    // });
    // countdownObject.change({
    //     tenthsOfSecond: 9, seconds: 10, minutes: 2, counter24: 2,
    // });


    // listeners
    dom.tenths.addEventListener('input', debounce((event) => {
        timer.setValues({ tenths: Number(event.target.value) });
    }, listenersDelay));
    dom.seconds.addEventListener('input', debounce((event) => {
        timer.setValues({ seconds: Number(event.target.value) });
    }, listenersDelay));
    dom.minutes.addEventListener('input', debounce((event) => {
        timer.setValues({ minutes: Number(event.target.value) });
    }, listenersDelay));
    dom.counter24.addEventListener('input', debounce((event) => {
        const values = event.target.value.split('.');
        counter24.setValues({
            tenths: Number(values[1] === undefined ? 0 : values[1]),
            seconds: Number(values[0]),
        });
    }, listenersDelay));

    dom.set5.addEventListener('click', () => {
        timer.setValues({ tenths: 0, seconds: 0, minutes: 5 });
    });
    dom.set10.addEventListener('click', () => {
        timer.setValues({ tenths: 0, seconds: 0, minutes: 10 });
    });
    dom.set14.addEventListener('click', () => {
        counter24.setValues({ tenths: 0, seconds: 14 });
    });
    dom.set24.addEventListener('click', () => {
        counter24.setValues({ tenths: 0, seconds: 24 });
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
