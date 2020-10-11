import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import TimeTicker from './components/TimeTicker.js';


const listenersDelay = 500;
const HOST = location.origin.replace(/^http/, 'ws');
const webSocket = new WebSocketConnect({
    url: HOST,
    reconnectMsTimeout: 1000,
    messageJSONCallback: (message) => {
        console.log('message', message);
    },
});
const dom = {
    startTimer: document.querySelector('.start-timer'),
    stopTimer: document.querySelector('.stop-timer'),
    set5: document.querySelector('.set-5'),
    set10: document.querySelector('.set-10'),
    set14: document.querySelector('.set-14'),
    set24: document.querySelector('.set-24'),
    clockControl: document.querySelector('.clock-control'),
    arrow: document.querySelector('.arrow'),
    sets: document.querySelectorAll('.set-value'),
    buttons: document.querySelectorAll('.score-add'),
    teamLeft: document.querySelector('[data-name="teamLeft"]'),
    teamRight: document.querySelector('[data-name="teamRight"]'),
    scoreLeft: document.querySelector('[data-name="scoreLeft"]'),
    scoreRight: document.querySelector('[data-name="scoreRight"]'),
    folsLeft: document.querySelector('[data-name="folsLeft"]'),
    folsRight: document.querySelector('[data-name="folsRight"]'),
    timeoutsLeft: document.querySelector('[data-name="timeoutsLeft"]'),
    spentTimeoutsLeft: document.querySelector('[data-name="spentTimeoutsLeft"]'),
    timeoutsRight: document.querySelector('[data-name="timeoutsRight"]'),
    spentTimeoutsRight: document.querySelector('[data-name="spentTimeoutsRight"]'),
    quarter: document.querySelector('[data-name="quarter"]'),
    overtime: document.querySelector('[data-name="overtime"]'),
    counter24: document.querySelector('[data-name="counter24"]'),
    minutes: document.querySelector('[data-name="minutes"]'),
    seconds: document.querySelector('[data-name="seconds"]'),
    tenthsOfSecond: document.querySelector('[data-name="tenthsOfSecond"]'),
    mirror: document.querySelector('[data-name="mirror"]'),
};

const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
};

const stopTimer = function () {
    timeTicker.stopTimer();
    dom.clockControl.classList.remove('time-running');
};
const startTimer = function () {
    timeTicker.startTimer();
    dom.clockControl.classList.add('time-running');
};

let counter24 = 24;

const timeObject = {
    tenthsOfSecond: {
        value: 0,
        min: 0,
        max: 9,
        higher: 'seconds',
    },
    seconds: {
        value: 0,
        min: 0,
        max: 59,
        higher: 'minutes',
    },
    minutes: {
        value: 1,
        min: 0,
        max: 10,
    },
};

const minusTime = ({
    timeObject,
    part,
    cbSuccess = () => { },
    cbZero = () => { },
}) => {
    const { min, value, max, higher } = timeObject[part];
    if (value > min) {
        timeObject[part].value -= 1;
        cbSuccess();
        return;
    }
    if (higher === undefined) {
        cbZero();
        return;
    }
    minusTime({
        timeObject,
        part: higher,
        cbSuccess() {
            timeObject[part].value = max;
        },
        cbZero() {
            cbZero();
        },
    });
};

const timeObjectToDom = ({ timeObject, dom }) => {
    dom.tenthsOfSecond.value = timeObject.tenthsOfSecond.value;
    dom.seconds.value = timeObject.seconds.value;
    dom.minutes.value = timeObject.minutes.value;
};

const setTimeNewValue = ({ timeObject, part, value }) => {
    timeObject[part].value = value;
};

const timeTicker = new TimeTicker({
    delayMs: 100,
    callback() {
        minusTime({
            timeObject,
            part: 'tenthsOfSecond',
            cbSuccess() {
                timeObjectToDom({ timeObject, dom });
            },
            cbZero() {
                stopTimer();
            },
        });
    },
});

// listeners
dom.minutes.addEventListener('input', debounce((event) => {
    setTimeNewValue({ timeObject, part: 'minutes', value: event.target.value });
    timeObjectToDom({ timeObject, dom });
}, listenersDelay));
dom.seconds.addEventListener('input', debounce((event) => {
    setTimeNewValue({ timeObject, part: 'seconds', value: event.target.value });
    timeObjectToDom({ timeObject, dom });
}, listenersDelay));
dom.tenthsOfSecond.addEventListener('input', debounce((event) => {
    setTimeNewValue({ timeObject, part: 'tenthsOfSecond', value: event.target.value });
    timeObjectToDom({ timeObject, dom });
}, listenersDelay));
dom.counter24.addEventListener('input', debounce((event) => {

}, listenersDelay));

dom.mirror.addEventListener('input', debounce((event) => {
    const { target } = event;
    const { name } = target.dataset;
    webSocket.sendJSON({ name, value: target.checked });
}, listenersDelay));

[
    dom.teamLeft,
    dom.teamRight,
    dom.scoreLeft,
    dom.scoreRight,
    dom.folsLeft,
    dom.folsRight,
    dom.timeoutsLeft,
    dom.timeoutsRight,
    dom.spentTimeoutsLeft,
    dom.spentTimeoutsRight,
    dom.quarter,
    dom.overtime,
].forEach((element) => {
    element.addEventListener('input', debounce((event) => {
        const { target } = event;
        const { value } = target;
        const { name } = target.dataset;
        webSocket.sendJSON({ name, value, });
    }, listenersDelay));
});

// buttons add score
dom.buttons.forEach((button) => {
    const { add, targetName } = button.dataset;
    const score = dom[targetName];

    button.addEventListener('click', () => {
        score.value = Number(score.value) + Number(add);
        const value = Number(score.value);
        webSocket.sendJSON({ name: targetName, value });
    });
});

// set number
dom.set5.addEventListener('click', () => {
    setTimeNewValue({ timeObject, part: 'tenthsOfSecond', value: 0 });
    setTimeNewValue({ timeObject, part: 'seconds', value: 0 });
    setTimeNewValue({ timeObject, part: 'minutes', value: 5 });
    timeObjectToDom({ timeObject, dom });
});
dom.set10.addEventListener('click', () => {
    setTimeNewValue({ timeObject, part: 'tenthsOfSecond', value: 0 });
    setTimeNewValue({ timeObject, part: 'seconds', value: 0 });
    setTimeNewValue({ timeObject, part: 'minutes', value: 10 });
    timeObjectToDom({ timeObject, dom });
});
dom.set14.addEventListener('click', () => {
    // saveCounter24({ timeObject, dom, newValue: 14 });
    // webSocket.sendJSON({ name: 'counter24', value: dom.counter24.value });
});
dom.set24.addEventListener('click', () => {
    // saveCounter24({ timeObject, dom, newValue: 24 });
    // webSocket.sendJSON({ name: 'counter24', value: dom.counter24.value });
});


dom.startTimer.addEventListener('click', function () {
    startTimer();
});
dom.stopTimer.addEventListener('click', function () {
    stopTimer();
});
dom.arrow.addEventListener('click', function () {
    dom.arrow.classList.toggle('arrow-right');
    webSocket.sendJSON({
        name: 'arrow',
        value: dom.arrow.classList.contains('arrow-right') ? 'right' : 'left',
    });
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
        stopTimer();
    } else {
        startTimer();
    }
}, { capture: true });
