<template>
  <div class="view-container font-Aldrich" :class="{ 'mirror': isMirror }">
        <div class="flex-center-between need-to-rotate-when-mirroring">
            <div class="uk-width-1-4">
                <div class="view-team view-team-left">{{teamLeft}}</div>
            </div>
            <div class="uk-width-expand">
                <div class="view-time">
                    <clock :time-object="timeObject"></clock>
                </div>
            </div>
            <div class="uk-width-1-4">
                <div class="view-team view-team-right">{{teamRight}}</div>
            </div>
        </div>
        <div class="flex-center-around need-to-rotate-when-mirroring">
            <div class="uk-width-1-3">
                <div class="view-score view-score-left">{{scoreLeft}}</div>
            </div>
            <div class="uk-width-expand uk-flex uk-flex-center">
                <div class="view-counter24-wrapper uk-flex uk-flex-bottom">
                    <div class="view-counter-24">{{counter24}}</div>
                    <div class="view-counter-24-tenths-of-second" v-if="tenthsOfSecond !== undefined">
                        .{{tenthsOfSecond}}
                    </div>
                </div>
            </div>
            <div class="uk-width-1-3">
                <div class="view-score view-score-right">{{scoreRight}}</div>
            </div>
        </div>
        <div class="flex-center-around need-to-rotate-when-mirroring">
            <div class="uk-width-1-4 uk-text-center">
                <Timeouts :count-elements="timeouts" :count-active="spentTimeoutsLeft"></Timeouts>
            </div>
            <div class="uk-width-expand uk-flex uk-flex-center">
                <div class="view-arrow-wrapper">
                    <svg class="view-arrow-left"
                        :class="{ 'arrow-right': arrowDirection === 'right' }"
                        preserveAspectRatio="none" version="1.1" xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 561.803 561.802">
                        <polygon
                            points="240.773,521.674 240.773,411.322 561.803,411.322 561.803,152.994 240.773,152.994 240.773,40.128 0,280.905 ">
                        </polygon>
                    </svg>
                </div>
            </div>
            <div class="uk-width-1-4 uk-text-center">
                <Timeouts :count-elements="timeouts" :count-active="spentTimeoutsRight"></Timeouts>
            </div>
        </div>
        <div class="flex-center-around need-to-rotate-when-mirroring">
            <div class="uk-width-1-3">
                <div class="view-fouls-left">
                    <div class="view-foul-text">Фолы</div>
                    <div class="view-foul">{{folsLeft}}</div>
                </div>
            </div>
            <div class="uk-width-expand uk-flex uk-flex-center">
                <div class="view-period-wrapper">
                    <div class="view-quarter-wrapper">
                        <div class="view-period-text">{{periodText}}</div>
                        <div class="view-period-value">{{periodValue}}</div>
                    </div>
                </div>
            </div>
            <div class="uk-width-1-3">
                <div class="view-fouls-right">
                    <div class="view-foul-text">Фолы</div>
                    <div class="view-foul">{{folsRight}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './../js/common.js';
import Timeouts from './Timeouts.vue';
import Clock from './Clock.vue';


window.electron.receiveSettings((message) => {
    console.log('message', message);
    Object.entries(message).forEach(([field, value]) => {
        if (field === 'time') {
            vueData.counter24 = value.counter24;
            vueData.tenthsOfSecond = value.tenthsOfSecond;
            vueData.timeObject.seconds = value.seconds;
            vueData.timeObject.minutes = value.minutes;
        } else if (field === 'arrow') {
            vueData.arrowDirection = value;
        } else if (field === 'mirror') {
            vueData.isMirror = value;
        } else if (field === 'quarter') {
            vueData.periodText = 'Четверть';
            vueData.periodValue = value;
        } else if (field === 'overtime') {
            vueData.periodText = 'Овертайм';
            vueData.periodValue = value;
        } else if (vueData[field] !== undefined) {
            vueData[field] = value;
        // } else if (field === 'font') {
        //     dom.viewContainer.classList.forEach((cls) => {
        //         if (cls.startsWith('font-')) {
        //             dom.viewContainer.classList.remove(cls);
        //         }
        //     });
        //     dom.viewContainer.classList.add(`font-${value}`);
        } else {
            console.log('message error', message);
        }
    });
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
    arrowLeft: document.querySelector('.view-arrow-left'),
    folsLeft: document.querySelector('.view-fouls-left .view-foul'),
    folsRight: document.querySelector('.view-fouls-right .view-foul'),
    periodText: document.querySelector('.view-period-text'),
    periodValue: document.querySelector('.view-period-value'),
};
 
const vueData = {
    teamLeft: 'Космические волки',
    teamRight: 'Команда П',
    scoreLeft: 10,
    scoreRight: 0,
    counter24: 24,
    tenthsOfSecond: 0,
    folsLeft: 0,
    folsRight: 0,
    periodText: 'Четверть',
    periodValue: 1,
    isMirror: false,
    arrowDirection: 'left',
    timeObject: {
        seconds: 0,
        minutes: 0,
    },
    timeouts: 2,
    spentTimeoutsLeft: 0,
    spentTimeoutsRight: 0,
};

export default {
    data() {
        return vueData;
    },
    components: {
        Clock,
        Timeouts,
    },
};
</script>

<style>

</style>
