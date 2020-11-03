import { createApp } from 'vue';
import SettingsApp from '../vue/SettingsApp.vue';
import tooltipVueDirective from '../vue/tooltipVueDirective.js';

createApp(SettingsApp)
    .directive('tooltip', tooltipVueDirective)
    .mount('#app');
