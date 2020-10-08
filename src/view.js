import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import Vue from 'vue/dist/vue.esm.js';
import timeouts from './components/timeouts.vue';

global.Vue = Vue;

const HOST = location.origin.replace(/^http/, 'ws');
new WebSocketConnect({
    url: HOST,
    reconnectMsTimeout: 1000,
    messageJSONCallback: (message) => {
        console.log('message', message);

        if (message.name === 'time') {
            dom.minutes.textContent = message.value.minutes;
            dom.seconds.textContent = message.value.seconds < 10 ? `0${message.value.seconds}` : message.value.seconds;
        } else if (message.name === 'arrow') {
            if (message.value === 'left') {
                dom.arrow.classList.remove('arrow-right');
            } else if (message.value === 'right') {
                dom.arrow.classList.add('arrow-right');
            }
        } else if (message.name === 'mirror') {
            if (message.value) {
                dom.viewContainer.classList.add('mirror');
            } else {
                dom.viewContainer.classList.remove('mirror');
            }
        } else if (message.name === 'quarter') {
            dom.periodText.textContent = 'Четверть';
            dom.periodValue.textContent = message.value;
        } else if (message.name === 'overtime') {
            dom.periodText.textContent = 'Овертайм';
            dom.periodValue.textContent = message.value;
        } else if (vueInstance[message.name] !== undefined) {
            vueInstance[message.name] = Number(message.value);
        } else if (dom[message.name]) {
            dom[message.name].textContent = message.value;
        } else {
            console.log('message error', message);
        }
    },
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
    arrow: document.querySelector('.arrow'),
    folsLeft: document.querySelector('.view-fouls-left .view-foul'),
    folsRight: document.querySelector('.view-fouls-right .view-foul'),
    periodText: document.querySelector('.view-period-text'),
    periodValue: document.querySelector('.view-period-value'),
};
