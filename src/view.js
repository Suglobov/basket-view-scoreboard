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
            dom.time.textContent = message.value;
        } else if (message.name === 'arrow') {
            if (message.value === 'left') {
                dom.arrow.classList.remove('arrow-right');
            } else if (message.value === 'right') {
                dom.arrow.classList.add('arrow-right');
            }
        } else if (message.name === 'quarter') {
            dom.periodText.textContent = 'Четверть';
            dom.periodValue.textContent = message.value;
        } else if (message.name === 'overtime') {
            dom.periodText.textContent = 'Овертайм';
            dom.periodValue.textContent = message.value;
        } else if (message.name === 'timeouts') {
            if (message.direction === 'left') {
                vueInstance.leftTimeoutsCount = Number(message.value);
            } else if (message.direction === 'right') {
                vueInstance.rightTimeoutsCount = Number(message.value);
            }
        } else if (message.name === 'spentTimeouts') {
            if (message.direction === 'left') {
                vueInstance.leftTimeoutsActives = Number(message.value);
            } else if (message.direction === 'right') {
                vueInstance.rightTimeoutsActives = Number(message.value);
            }
        } else if (message.name === 'mirror') {
            if (message.value) {
                dom.viewContainer.classList.add('mirror');
            } else {
                dom.viewContainer.classList.remove('mirror');
            }
        } else if (dom[message.name]) {
            dom[message.name].textContent = message.value;
        } else if (message.name && message.direction) {
            const domName = `${message.name}${message.direction[0].toUpperCase()}${message.direction.slice(1)}`;
            if (dom[domName]) {
                dom[domName].textContent = message.value;
            } else {
                console.log('domName error', domName);
            }
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
        leftTimeoutsCount: 2,
        leftTimeoutsActives: 0,
        rightTimeoutsCount: 2,
        rightTimeoutsActives: 0,
    },
});

const dom = {
    viewContainer: document.querySelector('.view-container'),
    time: document.querySelector('.view-time'),
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
