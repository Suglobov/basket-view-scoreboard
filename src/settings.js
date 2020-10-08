import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import TimeTicker from './components/TimeTicker.js';
import TimeObject from './components/TimeObject.js';


const listenersDelay = 500;

const HOST = location.origin.replace(/^http/, 'ws');
const webSocket = new WebSocketConnect({
    url: HOST,
    reconnectMsTimeout: 1000,
    messageJSONCallback: (message) => {
        console.log('message', message);
    },
});
const timeObj = {
    ms100InMinutes: 600,
    ms100InSeconds: 10,
    time100Ms: 0,
    timeSeconds: 0,
    timeMinutes: 5,
    minus100ms(callbackTimeIsEnd = () => { }, callbackMinusSuccess = () => { }) {
        const currentFull100ms = this.timeMinutes * this.ms100InMinutes
            + this.timeSeconds * this.ms100InSeconds
            + this.time100Ms;
        if (currentFull100ms <= 0) {
            callbackTimeIsEnd();
            return;
        }
        const newFull100ms = currentFull100ms - 1;
        this.setTimeFull100Ms(newFull100ms);
        callbackMinusSuccess();
    },
    setTimeFull100Ms(full100ms) {
        this.timeMinutes = Math.floor(full100ms / this.ms100InMinutes);
        this.timeSeconds = Math.floor(full100ms / this.ms100InSeconds);
    },
};

const timeTicker = new TimeTicker({
    delayMs: 100,
    callback() {
        console.log('callback');
    },
    // callback100ms: (count100ms) => {
    //     const reverseCount100ms = (10 - count100ms) % 10;
    //     dom.ms100.value = reverseCount100ms;
    //     if (reverseCount100ms >= 9) {
    //         timeObjectMinusSecond({ timeObject, stopTimer });
    //         saveTimeFromObjectToDom({ timeObject, dom });
    //     }
    // },
    // callbackSeconds: () => {
    //     console.log('callbackSeconds');
    //     timeObjectMinusSecond({ timeObject, stopTimer });
    //     saveTimeFromObjectToDom({ timeObject, dom });
    //     // saveCounter24({ timeObject, dom, newValue: Number(dom.counter24.value) - 1 });
    //     // sendTime({ timeObject, webSocket });
    //     // webSocket.sendJSON({ name: 'counter24', value: dom.counter24.value });
    // },
});
const timeObject = new TimeObject();

const dom = {
    startTimer: document.querySelector('.start-timer'),
    stopTimer: document.querySelector('.stop-timer'),
    set5: document.querySelector('.set-5'),
    set10: document.querySelector('.set-10'),
    set14: document.querySelector('.set-14'),
    set24: document.querySelector('.set-24'),
    clockControl: document.querySelector('.clock-control'),
    arrow: document.querySelector('.arrow'),
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
    ms100: document.querySelector('[data-name="ms100"]'),
    mirror: document.querySelector('[data-name="mirror"]'),
};

const stopTimer = function () {
    timeTicker.stopTimer();
    dom.clockControl.classList.remove('time-running');
};
const startTimer = function () {
    timeTicker.startTimer();
    dom.clockControl.classList.add('time-running');
};

const timeObjectMinusSecond = ({ timeObject, stopTimer }) => {
    const fullSeconds = timeObject.getFullSeconds();
    if (fullSeconds <= 0) {
        stopTimer();
        return;
    }
    timeObject.setFullSeconds(fullSeconds - 1);
};

const saveTimeFromDomToObject = ({ timeObject, dom }) => {
    const minutes = Number(dom.minutes.value);
    const seconds = Number(dom.seconds.value);
    timeObject.setTime(minutes, seconds);
};
const saveTimeFromObjectToDom = ({ timeObject, dom }) => {
    dom.minutes.value = timeObject.getMinutes();
    dom.seconds.value = timeObject.getSeconds();
};

const saveCounter24 = ({ newValue, dom, timeObject }) => {
    if (newValue < 0) {
        return;
    }
    const fullSeconds = timeObject.getFullSeconds();
    dom.counter24.value = (fullSeconds < newValue) ? fullSeconds : newValue;
};

const sendTime = function ({ timeObject, webSocket }) {
    const minutes = timeObject.getMinutes();
    const seconds = timeObject.getSeconds();
    webSocket.sendJSON({
        name: 'time', value: { minutes, seconds, },
    });
};

const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
};


saveTimeFromDomToObject({ timeObject, dom });
// listeners
let timer1;
[dom.minutes, dom.seconds,].forEach((element) => {
    element.addEventListener('input', () => {
        clearInterval(timer1);
        timer1 = setTimeout(() => {
            saveTimeFromDomToObject({ timeObject, dom });
            sendTime({ timeObject, webSocket });
        }, setTimeoutTimeout);
    });
});

// listeners
dom.minutes.addEventListener('input', debounce((event) => {

}, listenersDelay));
dom.seconds.addEventListener('input', debounce((event) => {

}, listenersDelay));
dom.ms100.addEventListener('input', debounce((event) => {

}, listenersDelay));
dom.counter24.addEventListener('input', debounce((event) => {

}, listenersDelay));

// [dom.minutes, dom.seconds, dom.ms100, dom.counter24,].forEach((element) => {
//     element.addEventListener('input', debounce(() => {
//         // saveTimeFromDomToObject({ timeObject, dom });
//         // sendTime({ timeObject, webSocket });
//     }, listenersDelay));
// });

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
        webSocket.sendJSON({ name, value: target.checked });
    }, setTimeoutTimeout);
});

let timer3;
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
    dom.counter24,
].forEach((element) => {
    element.addEventListener('input', (event) => {
        const { target } = event;
        clearInterval(timer3);
        timer3 = setTimeout(() => {
            const { value } = target;
            const { name } = target.dataset;

            if (!name) {
                console.log('не обнаружен data-name', target);
                return;
            }
            webSocket.sendJSON({ name, value });
        }, setTimeoutTimeout);
    });
});

// buttons add
dom.buttons.forEach((button) => {
    const { add, targetName } = button.dataset;
    const score = document.querySelector(`[data-name="${targetName}"]`);

    button.addEventListener('click', () => {
        score.value = Number(score.value) + Number(add);
        const value = Number(score.value);
        webSocket.sendJSON({ name: targetName, value });
    });
});

// set number
dom.set5.addEventListener('click', () => {
    dom.minutes.value = 5;
    dom.seconds.value = 0;
    saveTimeFromDomToObject({ timeObject, dom });
    sendTime({ timeObject, webSocket });
});
dom.set10.addEventListener('click', () => {
    dom.minutes.value = 10;
    dom.seconds.value = 0;
    saveTimeFromDomToObject({ timeObject, dom });
    sendTime({ timeObject, webSocket });
});
dom.set14.addEventListener('click', () => {
    saveCounter24({ timeObject, dom, newValue: 14 });
    webSocket.sendJSON({ name: 'counter24', value: dom.counter24.value });
});
dom.set24.addEventListener('click', () => {
    saveCounter24({ timeObject, dom, newValue: 24 });
    webSocket.sendJSON({ name: 'counter24', value: dom.counter24.value });
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

// space
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
