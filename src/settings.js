import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import TimeTicker from './components/TimeTicker.js';
import TimeComponent from './components/TimeComponent.js';

const listenersDelay = 500;

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
const timeTicker = new TimeTicker({
    delayMs: 100,
    callback() {
        minusTime({
            timeObject,
            part: 'tenthsOfSecond',
            cbSuccess() {
                timeObjectToDom({ timeObject, dom, fields: ['tenthsOfSecond', 'seconds', 'minutes'] });
                if (timeObject.tenthsOfSecond.value === timeObject.tenthsOfSecond.max) {
                    setCounter24NewValue({ counter24Object, value: counter24Object.value - 1 });
                    counter24ToDom({ counter24Object, dom });
                }
            },
            cbZero() {
                stopTimer();
            },
        });
    },
});

const webSocket = new WebSocketConnect({
    url: location.origin.replace(/^http/, 'ws'),
    reconnectMsTimeout: 1000,
    messageJSONCallback: (message) => {
        console.log('message', message);
    },
});
const sendWSData = (objectToSend) => {
    webSocket.sendJSON(objectToSend);
};

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


const minusTime = ({
    timeObject,
    part,
    cbSuccess = () => { },
    cbZero = () => { },
}) => {
    const { min, value, max, higher } = timeObject[part];
    if (value > min) {
        timeObject[part].setValue(value - 1);
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
            timeObject[part].setValue(max);
            cbSuccess();
        },
        cbZero() {
            cbZero();
        },
    });
};

const timeObjectToDom = ({ timeObject, dom, fields }) => {
    fields.forEach((field) => {
        dom[field].value = timeObject[field].value;
    });
};
const setTimeNewValue = ({ timeObject, values }) => {
    Object.entries(values).forEach(([field, value]) => {
        timeObject[field].setValue(value);
    });
};
const counter24ToDom = ({ counter24Object, dom }) => {
    dom.counter24.value = counter24Object.value;
};
const setCounter24NewValue = ({ counter24Object, value }) => {
    counter24Object.setValue(value);
};

const counter24Object = new TimeComponent({ value: 24, min: 0, max: 24, });
const timeObject = {
    tenthsOfSecond: new TimeComponent({ value: 0, min: 0, max: 9, higher: 'seconds', }),
    seconds: new TimeComponent({ value: 0, min: 0, max: 59, higher: 'minutes', }),
    minutes: new TimeComponent({ value: 1, min: 0, max: 10, }),
};
timeObjectToDom({ timeObject, dom, fields: ['tenthsOfSecond', 'seconds', 'minutes'] });



// listeners
dom.mirror.addEventListener('input', debounce((event) => {
    const { target } = event;
    const { name } = target.dataset;
    sendWSData({ [name]: target.checked });
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

dom.tenthsOfSecond.addEventListener('input', debounce((event) => {
    setTimeNewValue({ timeObject, values: { tenthsOfSecond: Number(event.target.value) } });
    timeObjectToDom({ timeObject, dom, fields: ['tenthsOfSecond'] });
}, listenersDelay));
dom.seconds.addEventListener('input', debounce((event) => {
    setTimeNewValue({ timeObject, values: { seconds: Number(event.target.value) } });
    timeObjectToDom({ timeObject, dom, fields: ['seconds'] });
}, listenersDelay));
dom.minutes.addEventListener('input', debounce((event) => {
    setTimeNewValue({ timeObject, values: { minutes: Number(event.target.value) } });
    timeObjectToDom({ timeObject, dom, fields: ['minutes'] });
}, listenersDelay));
dom.set5.addEventListener('click', () => {
    setTimeNewValue({ timeObject, values: { tenthsOfSecond: 0, seconds: 0, minutes: 5, }, });
    timeObjectToDom({ timeObject, dom, fields: ['tenthsOfSecond', 'seconds', 'minutes'] });
});
dom.set10.addEventListener('click', () => {
    setTimeNewValue({ timeObject, values: { tenthsOfSecond: 0, seconds: 0, minutes: 10, }, });
    timeObjectToDom({ timeObject, dom, fields: ['tenthsOfSecond', 'seconds', 'minutes'] });
});

dom.counter24.addEventListener('input', debounce((event) => {
    setCounter24NewValue({ counter24Object, value: Number(event.target.value) });
    counter24ToDom({ counter24Object, dom });
}, listenersDelay));
dom.set14.addEventListener('click', () => {
    setCounter24NewValue({ counter24Object, value: 14 });
    counter24ToDom({ counter24Object, dom });
});
dom.set24.addEventListener('click', () => {
    setCounter24NewValue({ counter24Object, value: 24 });
    counter24ToDom({ counter24Object, dom });
});


dom.startTimer.addEventListener('click', function () {
    startTimer();
});
dom.stopTimer.addEventListener('click', function () {
    stopTimer();
});
dom.arrow.addEventListener('click', function () {
    dom.arrow.classList.toggle('arrow-right');
    sendWSData({ arrow: dom.arrow.classList.contains('arrow-right') ? 'right' : 'left' });
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
