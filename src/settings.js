import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import TimeTicker from './components/TimeTicker.js';
// import TimeObject from './components/TimeObject.js';


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

// const timeToDom = ({ timeObj, dom }) => {
//     dom.minutes.value = timeObj.minutes;
//     dom.seconds.value = timeObj.seconds;
//     dom.ms100.value = timeObj.ms100;
// };

// const timeObjectMinusSecond = ({ timeObject, stopTimer }) => {
//     const fullSeconds = timeObject.getFullSeconds();
//     if (fullSeconds <= 0) {
//         stopTimer();
//         return;
//     }
//     timeObject.setFullSeconds(fullSeconds - 1);
// };

// const saveTimeFromDomToObject = ({ timeObject, dom }) => {
//     const minutes = Number(dom.minutes.value);
//     const seconds = Number(dom.seconds.value);
//     timeObject.setTime(minutes, seconds);
// };
// const saveTimeFromObjectToDom = ({ timeObject, dom }) => {
//     dom.minutes.value = timeObject.getMinutes();
//     dom.seconds.value = timeObject.getSeconds();
// };

// const saveCounter24 = ({ newValue, dom, timeObject }) => {
//     if (newValue < 0) {
//         return;
//     }
//     const fullSeconds = timeObject.getFullSeconds();
//     dom.counter24.value = (fullSeconds < newValue) ? fullSeconds : newValue;
// };

// const sendTime = function ({ timeObject, webSocket }) {
//     const minutes = timeObject.getMinutes();
//     const seconds = timeObject.getSeconds();
//     webSocket.sendJSON({
//         name: 'time', value: { minutes, seconds, },
//     });
// };

const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
};

// сonst timeObj = {
//     ms100InMinutes: 600,
//     ms100InSeconds: 10,
//     ms100: 0,
//     seconds: 5,
//     minutes: 0,
//     minus100ms({ callbackTimeIsEnd = () => { }, callbackMinusSuccess = () => { } }) {
//         const currentFull100ms = this.minutes * this.ms100InMinutes
//             + this.seconds * this.ms100InSeconds
//             + this.ms100;
//         if (currentFull100ms <= 0) {
//             callbackTimeIsEnd();
//             return;
//         }
//         const newFull100ms = currentFull100ms - 1;

//         this.counter24 = this.counter24 - 1;
//         const fullSeconds = newFull100ms * this.ms100InSeconds;
//         if (fullSeconds < this.counter24) {
//             this.counter24 = fullSeconds;
//         }
//         this.setTimeFull100Ms(newFull100ms);
//         callbackMinusSuccess();
//     },
//     setTimeFull100Ms(full100ms) {
//         this.minutes = Math.floor(full100ms / this.ms100InMinutes);
//         const remainOfMinutes = full100ms - this.minutes * this.ms100InMinutes;
//         this.seconds = Math.floor(remainOfMinutes / this.ms100InSeconds);
//         const remainOfSeconds = remainOfMinutes - this.seconds * this.ms100InSeconds;
//         this.ms100 = remainOfSeconds;
//     },
// };
const MS100_IN_MINUTES = 600;
const MS100_IN_SECONDS = 10;

let fullMs100 = 50;
let counter24 = 24;

const getTimeObject = (fullMs100) => {
    const minutes = Math.floor(fullMs100 / MS100_IN_MINUTES);
    const remainOfMinutes = fullMs100 - minutes * MS100_IN_MINUTES;
    const seconds = Math.floor(remainOfMinutes / MS100_IN_SECONDS);
    const remainOfSeconds = remainOfMinutes - seconds * MS100_IN_SECONDS;
    const ms100 = remainOfSeconds;
    return { minutes, seconds, ms100, };
};

const getCorrectCounter24 = (newValue, fullMs100) => {
    const fullSeconds = Math.floor(fullMs100 / MS100_IN_SECONDS);
    return (newValue > fullSeconds) ? fullSeconds : newValue;
};

const getFullMs100FromTime = ({ minutes, seconds, ms100 }) => {
    let acc = 0;
    if (minutes !== undefined) {
        acc += minutes * MS100_IN_MINUTES;
    }
    if (seconds !== undefined) {
        acc += seconds * MS100_IN_SECONDS;
    }
    if (ms100 !== undefined) {
        acc += ms100;
    }
    return acc;
};

const changeFullMs100 = () => {

};

const changeCounter24 = () => {

};



const timeTicker = new TimeTicker({
    delayMs: 100,
    callback() {
        if (fullMs100 <= 0) {
            stopTimer();
            return;
        }

        fullMs100 -= 1;
        const timeObject = getTimeObject(fullMs100);
        dom.minutes.value = timeObject.minutes;
        dom.seconds.value = timeObject.seconds;
        dom.ms100.value = timeObject.ms100;
        if (timeObject.ms100 >= 9) {
            counter24 = getCorrectCounter24(counter24 - 1, fullMs100);
            dom.counter24.value = counter24;
        }

        if (fullMs100 <= 0) {
            stopTimer();
        }
    },
});

// saveTimeFromDomToObject({ timeObject, dom });
// timeToDom({ timeObj, dom });



// listeners
dom.minutes.addEventListener('input', debounce((event) => {

}, listenersDelay));
dom.seconds.addEventListener('input', debounce((event) => {

}, listenersDelay));
dom.ms100.addEventListener('input', debounce((event) => {

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
    // const score = document.querySelector(`[data-name="${targetName}"]`);
    const score = dom[targetName];

    button.addEventListener('click', () => {
        score.value = Number(score.value) + Number(add);
        const value = Number(score.value);
        webSocket.sendJSON({ name: targetName, value });
    });
});
// sets
// dom.sets.forEach((setValue) => {
//     const { set, targetName } = setValue;
//     const targetElement = dom[targetName];
//     if (targetName === 'counter24') {
//         setValue.addEventListener('click', () => {
//             targetElement.value = set;
//         });
//     }
// });

// set number
dom.set5.addEventListener('click', () => {
    const newFullMs100 = getFullMs100FromTime({ minutes: 5 });
    console.log('newFullMs100', newFullMs100);
    // dom.minutes.value = 5;
    // dom.seconds.value = 0;
    // dom.ms100.value = 0;
    // saveTimeFromDomToObject({ timeObject, dom });
    // sendTime({ timeObject, webSocket });
});
dom.set10.addEventListener('click', () => {
    const newFullMs100 = getFullMs100FromTime({ minutes: 10 });
    console.log('newFullMs100', newFullMs100);
    // dom.minutes.value = 10;
    // dom.seconds.value = 0;
    // dom.ms100.value = 0;
    // saveTimeFromDomToObject({ timeObject, dom });
    // sendTime({ timeObject, webSocket });
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
