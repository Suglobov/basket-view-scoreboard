import './common.js';

const HOST = location.origin.replace(/^http/, 'ws');
const ws = new WebSocket(HOST);

ws.onopen = () => {
    console.log('WebSocket connection established');
};
ws.onclose = (event) => {
    console.log('event', event);
};
ws.onerror = (error) => {
    console.log('WebSocket connection error:', error);
};
ws.onmessage = (event) => {
    console.log('event', JSON.parse(event.data));
};

const listenContainer = document.querySelector('.listen-container');
let timer;
listenContainer.addEventListener('input', function (event) {
    const { target } = event;
    const inputName = target.dataset.inputName;

    clearInterval(timer);
    timer = setTimeout(() => {
        const { value } = target;
        ws.send(JSON.stringify({ field: inputName, value }));
    }, 300);
});

const buttons = document.querySelectorAll('.score-add');
buttons.forEach((button) => {
    const addScore = button.dataset.scoreAdd;
    const direction = button.dataset.direction;
    const scoreInput = document.querySelector(`.score-${direction}`);
    button.addEventListener('click', () => {
        scoreInput.value = Number(scoreInput.value) + Number(addScore);
        ws.send(JSON.stringify({ field: scoreInput.dataset.inputName, value: Number(scoreInput.value) }));
    });
});

let isTimeRunning = false;
const timeMessage = document.querySelector('.time-message');
const stopTimer = function () {
    isTimeRunning = false;
    timeMessage.classList.remove('time-running');
};
const startTimer = function () {
    isTimeRunning = true;
    timeMessage.classList.add('time-running');
};

const counter24Input = document.querySelector('.counter-24');
const minutesInput = document.querySelector('.minutes');
const secundesInput = document.querySelector('.seconds');

setInterval(() => {
    if (isTimeRunning) {
        const counterNewValue = Number(counter24Input.value) - 1;
        counter24Input.value = counterNewValue < 0 ? 0 : counterNewValue;
        ws.send(JSON.stringify({ field: 'counter24', value: Number(counter24Input.value) }));

        const secundesNewValue = Number(secundesInput.value) - 1;
        if (secundesNewValue < 0) {
            const minutesNewValue = Number(minutesInput.value) - 1;
            if (minutesNewValue < 0) {
                stopTimer();
                return;
            }

            minutesInput.value = minutesNewValue < 0 ? 0 : minutesNewValue;
            ws.send(JSON.stringify({ field: 'minutes', value: Number(minutesInput.value) }));
        }

        secundesInput.value = secundesNewValue < 0 ? 59 : secundesNewValue;
        ws.send(JSON.stringify({ field: 'seconds', value: Number(secundesInput.value) }));
    }
}, 1000);

const startTimerButton = document.querySelector('.start-timer');
startTimerButton.addEventListener('click', function () {
    startTimer();
});
const stopTimerButton = document.querySelector('.stop-timer');
stopTimerButton.addEventListener('click', function () {
    stopTimer();
});

const resetCounter = document.querySelector('.reset-counter');
resetCounter.addEventListener('click', function () {
    counter24Input.value = 24;
    ws.send(JSON.stringify({ field: 'counter24', value: Number(counter24Input.value) }));
});

const timeSet10Minute = document.querySelector('.time-set-10-minute');
timeSet10Minute.addEventListener('click', function () {
    minutesInput.value = 10;
    secundesInput.value = 0;
    ws.send(JSON.stringify({ field: 'minutes', value: Number(minutesInput.value) }));
    ws.send(JSON.stringify({ field: 'seconds', value: Number(secundesInput.value) }));
});
const timeSet5Minute = document.querySelector('.time-set-5-minute');
timeSet5Minute.addEventListener('click', function () {
    minutesInput.value = 5;
    secundesInput.value = 0;
    ws.send(JSON.stringify({ field: 'minutes', value: Number(minutesInput.value) }));
    ws.send(JSON.stringify({ field: 'seconds', value: Number(secundesInput.value) }));
});
