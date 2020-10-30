<template>
    <div class="d-flex">
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
                >
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
                >
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
                >
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
    <div class="d-flex flex-bottom">
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
                >
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
</template>

<script>
import {  onMounted } from 'vue';
import TimeTicker from './TimeTicker.js';
import CountdownObject from './CountdownObject.js';
import IntegerNumber from './IntegerNumber.js';
import Countdown from './Countdown.js';
import Countdown_v2 from './Countdown_v2.js';

const listenersDelay = 200;
const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
};

const afterMountedVue= () => {
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

    const timer = new Countdown({
        tenths: new IntegerNumber({ min: 0, max: 9, val: 9 }),
        seconds: new IntegerNumber({ min: 0, max: 59, val: 10 }),
        minutes: new IntegerNumber({ min: 0, max: 10, val: 0 }),
    });
    timer.setValues({
        tenths: 9,
        seconds: 15,
        minutes: 0,
    });
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

    const counter24 = new Countdown({
        tenths: new IntegerNumber({ min: 0, max: 9, val: 8 }),
        seconds: new IntegerNumber({ min: 0, max: 24, val: 10 }),
    });
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


    // const countdownObject = new CountdownObject();
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

    dom.startTimer.addEventListener('click', function () {
        timeTicker.startTimer();
    });
    dom.stopTimer.addEventListener('click', function () {
        timeTicker.stopTimer();
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
};
export default {
    setup(props, context) {
        onMounted(() => {
            afterMountedVue();
        });
        // Attributes (Non-reactive object)
        // console.log(context.attrs);

        // Slots (Non-reactive object)
        // console.log(context.slots);

        // Emit Events (Method)
        console.log(context);
    },
};
</script>
