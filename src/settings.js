import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import TimeTicker from './components/TimeTicker.js';
import TimeObject from './components/TimeObject.js';


const HOST = location.origin.replace(/^http/, 'ws');
const webSocket = new WebSocketConnect({
    url: HOST,
    reconnectMsTimeout: 1000,
    messageJSONCallback: (message) => {
        console.log('message', message);
    },
});

const timeTicker = new TimeTicker({
    callbackTiс: () => {
        timeObjectMinusSecond({ timeObject, stopTimer });
        saveTimeFromObjectToDom({ timeObject, dom });
        saveCounter24({ timeObject, dom, newValue: Number(dom.counter24.value) - 1 });
        sendTime({ timeObject, webSocket });
        webSocket.sendJSON({ name: 'counter24', value: dom.counter24.value });
    },
});
const timeObject = new TimeObject();

const dom = {
    listenContainer: document.querySelector('.listen-container'),
    buttons: document.querySelectorAll('.score-add'),
    counter24: document.querySelector('.counter-24'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds'),
    startTimer: document.querySelector('.start-timer'),
    stopTimer: document.querySelector('.stop-timer'),
    set5: document.querySelector('.set-5'),
    set10: document.querySelector('.set-10'),
    set14: document.querySelector('.set-14'),
    set24: document.querySelector('.set-24'),
    clockControl: document.querySelector('.clock-control'),
    arrow: document.querySelector('.arrow'),
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
const getLeadingZeroNumber = (number) => {
    return number < 10 ? `0${number}` : `${number}`;
};
const sendTime = function ({ timeObject, webSocket }) {
    const minutes = timeObject.getMinutes();
    const seconds = timeObject.getSeconds();
    webSocket.sendJSON({ name: 'time', value: `${getLeadingZeroNumber(minutes)}:${getLeadingZeroNumber(seconds)}` });
};


saveTimeFromDomToObject({ timeObject, dom });

let timer;
dom.listenContainer.addEventListener('input', function (event) {
    const { target } = event;

    clearInterval(timer);
    timer = setTimeout(() => {
        const { value } = target;
        const { name, direction } = target.dataset;

        if (!name) {
            console.log('не обнаружен data-name', target);
            return;
        }
        if (name === 'minutes' || name === 'seconds') {
            saveTimeFromDomToObject({ timeObject, dom });
            sendTime({ timeObject, webSocket });
            return;
        }
        if (name === 'mirror') {
            webSocket.sendJSON({ name, value: target.checked });
            return;
        }

        webSocket.sendJSON({ name, direction, value });
    }, 300);
});

dom.buttons.forEach((button) => {
    const { add, direction } = button.dataset;
    const score = document.querySelector(`.score-${direction}`);
    const name = score.dataset.name;

    button.addEventListener('click', () => {
        score.value = Number(score.value) + Number(add);
        const value = Number(score.value);
        webSocket.sendJSON({ name, direction, value });
    });
});

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
document.body.addEventListener('keydown', (event) => {
    const { target, code } = event;
    if (target.nodeName === 'INPUT') {
        return;
    }
    if (code === 'Space') {
        if (timeTicker.isTimerRunning) {
            stopTimer();
        } else {
            startTimer();
        }
    }
}, { capture: true });
