import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import TimeTicker from './components/TimeTicker.js';
import CountdownObject from './components/CountdownObject.js';


const listenersDelay = 200;
const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
};

const sendWSData = (objectToSend) => {
    window.electron.sendSettings(objectToSend);
};

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
    mirror: document.querySelector('[data-name="mirror"]'),
    showArrow: document.querySelector('[data-name="showArrow"]'),
    timeouts: document.querySelector('[data-name="timeouts"]'),
};


const timeTicker = new TimeTicker({ delayMs: 100 });
timeTicker.events.on('tick', () => {
    countdownObject
        .minus1()
        .checkForZero();
});
timeTicker.events.on('startTimer', () => {
    countdownObject.checkForZero();
    dom.clockControl.classList.add('time-running');
});
timeTicker.events.on('stopTimer', () => {
    dom.clockControl.classList.remove('time-running');
});


const countdownObject = new CountdownObject();
countdownObject.events.on('zero', () => {
    timeTicker.stopTimer();
});
countdownObject.events.on('changed', (maxChangedIndex) => {
    const cdData = countdownObject.give();
    // dom.tenthsOfSecond.value = cdData.time[0].value;
    dom.seconds.value = cdData.time[1].value;
    dom.minutes.value = cdData.time[2].value;
    dom.counter24.value = `${cdData.counter24[1].value}.${cdData.counter24[0].value}`;
    if (
        cdData.counter24[1].value < 10
        && !(cdData.counter24[0].value === 0 && cdData.counter24[1].value === 0)
    ) {
        sendWSData({
            time: {
                seconds: cdData.time[1].value,
                minutes: cdData.time[2].value,
                tenthsOfSecond: cdData.counter24[0].value,
                counter24: cdData.counter24[1].value,
            },
        });
    } else if (maxChangedIndex > 0 || countdownObject.time.isZero()) {
        sendWSData({
            time: {
                seconds: cdData.time[1].value,
                minutes: cdData.time[2].value,
                counter24: cdData.counter24[1].value,
            },
        });
    }
});
countdownObject.change({
    tenthsOfSecond: 9, seconds: 10, minutes: 2, counter24: 2,
});


// listeners
dom.seconds.addEventListener('input', debounce((event) => {
    countdownObject.change({ seconds: Number(event.target.value) });
}, listenersDelay));
dom.minutes.addEventListener('input', debounce((event) => {
    countdownObject.change({ minutes: Number(event.target.value) });
}, listenersDelay));
dom.counter24.addEventListener('input', debounce((event) => {
    const values = event.target.value.split('.');
    countdownObject.change({
        tenthsOfSecond: Number(values[1] === undefined ? 0 : values[1]),
        counter24: Number(values[0]),
    });
}, listenersDelay));

dom.set5.addEventListener('click', () => {
    countdownObject.change({ tenthsOfSecond: 0, seconds: 0, minutes: 5 });
});
dom.set10.addEventListener('click', () => {
    countdownObject.change({ tenthsOfSecond: 0, seconds: 0, minutes: 10 });
});
dom.set14.addEventListener('click', () => {
    countdownObject.change({ counter24: 14 });
});
dom.set24.addEventListener('click', () => {
    countdownObject.change({ counter24: 24 });
});


[
    dom.teamLeft,
    dom.teamRight,
    dom.scoreLeft,
    dom.scoreRight,
    dom.folsLeft,
    dom.folsRight,
    dom.timeouts,
    dom.spentTimeoutsLeft,
    dom.spentTimeoutsRight,
    dom.quarter,
    dom.overtime,
].forEach((element) => {
    element.addEventListener('input', debounce((event) => {
        const { target } = event;
        const { value } = target;
        const { name } = target.dataset;
        sendWSData({ [name]: value });
    }, listenersDelay));
});

// buttons add score
dom.buttons.forEach((button) => {
    const { add, targetName } = button.dataset;
    const score = dom[targetName];

    button.addEventListener('click', () => {
        score.value = Number(score.value) + Number(add);
        const value = Number(score.value);
        sendWSData({ [targetName]: value });
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
    sendWSData({ arrowDirection: dom.arrow.classList.contains('arrow-right') ? 'right' : 'left' });
});
dom.mirror.addEventListener('input', debounce((event) => {
    const { target } = event;
    sendWSData({ isMirror: target.checked });
}, listenersDelay));
dom.showArrow.addEventListener('input', debounce((event) => {
    const { target } = event;
    sendWSData({ showArrow: target.checked });
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
