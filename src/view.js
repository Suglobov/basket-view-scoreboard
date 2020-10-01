import './js/common.js';
import WebSocketConnect from './components/WebSocketConnect.js';
import Vue from 'vue/dist/vue.esm.js';
import timeouts from './components/timeouts.vue';

global.Vue = Vue;

const HOST = location.origin.replace(/^http/, 'ws');
const webSocket = new WebSocketConnect({
    url: HOST,
    reconnectMsTimeout: 1000,
    messageJSONCallback: (message) => {
        console.log('message', message);
    },
});

const vueInstance = new Vue({
    el: '#app',
    components: {
        timeouts,
    },
    data: {
        leftTimeoutsCount: 2,
        leftTimeoutsActives: 1,
        rightTimeoutsCount: 3,
        rightTimeoutsActives: 2,
    },
});


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

