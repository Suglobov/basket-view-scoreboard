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
    const dataJson = JSON.parse(event.data);
    if (fields[dataJson.field]) {
        fields[dataJson.field].textContent = dataJson.value;
    } else {
        console.log({
            'fields[dataJson.field]': fields[dataJson.field],
            'dataJson.field': dataJson.field,
        });
    }

    if (dataJson.field === 'overtime') {
        if (dataJson.value < 1) {
            fields.period.classList.remove('show-overtime');
        } else {
            fields.period.classList.add('show-overtime');
        }
    }
};

const fields = {
    teamLeft: document.querySelector('.teamLeft'),
    teamRight: document.querySelector('.teamRight'),
    scoreLeft: document.querySelector('.scoreLeft'),
    scoreRight: document.querySelector('.scoreRight'),
    folsLeft: document.querySelector('.folsLeft'),
    folsRight: document.querySelector('.folsRight'),
    counter24: document.querySelector('.counter24'),
    minutes: document.querySelector('.minutes'),
    seconds: document.querySelector('.seconds'),
    period: document.querySelector('.period'),
    quarter: document.querySelector('.quarter'),
    overtime: document.querySelector('.overtime'),
};
