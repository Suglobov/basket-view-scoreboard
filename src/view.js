import Vue from 'vue/dist/vue.esm.js';
import AppView from './components/AppView.vue';


new Vue({
    el: '#app',
    render: createElement => createElement(AppView),
});
