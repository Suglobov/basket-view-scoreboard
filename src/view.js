import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import Vue from 'vue/dist/vue.esm.js';
import timeouts from './components/timeouts.vue';

global.Vue = Vue;

const webSocket = new WebSocketConnect({
    url: location.origin.replace(/^http/, 'ws'),
    reconnectMsTimeout: 1000,
});
webSocket.events.on('open', () => {
    console.log('WebSocket connection open');
});
webSocket.events.on('close', () => {
    console.log('WebSocket connection close');
});
webSocket.events.on('error', (error) => {
    console.log('WebSocket connection error:', error);
});
webSocket.events.on('messageJSON', (message) => {
    console.log('message', message);
    Object.entries(message).forEach(([field, value]) => {
        if (field === 'time') {
            console.log('value', value);
            dom.minutes.textContent = value.minutes;
            dom.seconds.textContent = value.seconds < 10 ? `0${value.seconds}` : value.seconds;
            dom.counter24.textContent = value.counter24;
            if (value.tenthsOfSecond === undefined) {
                dom.counter24TenthsOfSecond.hidden = true;
            } else {
                dom.counter24TenthsOfSecond.hidden = false;
                dom.counter24TenthsOfSecond.textContent = `.${value.tenthsOfSecond}`;
            }
        } else if (field === 'arrow') {
            if (value === 'left') {
                dom.arrowLeft.classList.remove('arrow-right');
            } else if (value === 'right') {
                dom.arrowLeft.classList.add('arrow-right');
            }
        } else if (field === 'mirror') {
            if (value) {
                dom.viewContainer.classList.add('mirror');
            } else {
                dom.viewContainer.classList.remove('mirror');
            }
        } else if (field === 'quarter') {
            dom.periodText.textContent = 'Четверть';
            dom.periodValue.textContent = value;
        } else if (field === 'overtime') {
            dom.periodText.textContent = 'Овертайм';
            dom.periodValue.textContent = value;
        } else if (vueInstance[field] !== undefined) {
            vueInstance[field] = Number(value);
        } else if (dom[field]) {
            dom[field].textContent = value;
        } else {
            console.log('message error', message);
        }
    });
});

const vueInstance = new Vue({
    el: '#app',
    components: {
        timeouts,
    },
    data: {
        timeoutsLeft: 2,
        spentTimeoutsLeft: 0,
        timeoutsRight: 2,
        spentTimeoutsRight: 0,
    },
});

const dom = {
    viewContainer: document.querySelector('.view-container'),
    time: document.querySelector('.view-time'),
    minutes: document.querySelector('.view-minutes'),
    seconds: document.querySelector('.view-seconds'),
    teamLeft: document.querySelector('.view-team-left'),
    teamRight: document.querySelector('.view-team-right'),
    scoreLeft: document.querySelector('.view-score-left'),
    scoreRight: document.querySelector('.view-score-right'),
    counter24: document.querySelector('.view-counter-24'),
    counter24TenthsOfSecond: document.querySelector('.view-counter-24-tenths-of-second'),
    arrowLeft: document.querySelector('.arrow-left'),
    folsLeft: document.querySelector('.view-fouls-left .view-foul'),
    folsRight: document.querySelector('.view-fouls-right .view-foul'),
    periodText: document.querySelector('.view-period-text'),
    periodValue: document.querySelector('.view-period-value'),
};
