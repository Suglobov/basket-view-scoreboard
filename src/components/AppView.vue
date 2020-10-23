<template>
    <div class="view-container font-Aldrich" :class="{ mirror: isMirror }">
        <div class="flex-center-between need-to-rotate-when-mirroring">
            <div class="uk-width-1-4">
                <div class="view-team view-team-left">{{ teamLeft }}</div>
            </div>
            <div class="uk-width-expand">
                <div class="view-time">
                    <Clock :minutes="minutes" :seconds="seconds"></Clock>
                </div>
            </div>
            <div class="uk-width-1-4">
                <div class="view-team view-team-right">{{ teamRight }}</div>
            </div>
        </div>
        <div class="flex-center-around need-to-rotate-when-mirroring">
            <div class="uk-width-1-3">
                <div class="view-score view-score-left">{{ scoreLeft }}</div>
            </div>
            <div class="uk-width-expand uk-flex uk-flex-center">
                <div class="view-counter24-wrapper uk-flex uk-flex-bottom">
                    <div class="view-counter-24">{{ counter24 }}</div>
                    <div
                        class="view-counter-24-tenths-of-second"
                        v-if="tenthsOfSecond !== null"
                    >
                        .{{ tenthsOfSecond }}
                    </div>
                </div>
            </div>
            <div class="uk-width-1-3">
                <div class="view-score view-score-right">{{ scoreRight }}</div>
            </div>
        </div>
        <div class="flex-center-around need-to-rotate-when-mirroring">
            <div class="uk-width-1-4 uk-text-center">
                <Timeouts
                    :count-elements="timeouts"
                    :count-active="spentTimeoutsLeft"
                ></Timeouts>
            </div>
            <div class="uk-width-expand uk-flex uk-flex-center">
                <div class="view-arrow-wrapper">
                    <svg
                        v-show="showArrow"
                        class="view-arrow-left"
                        :class="{ 'arrow-right': arrowDirection === 'right' }"
                        preserveAspectRatio="none"
                        version="1.1"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        x="0px"
                        y="0px"
                        viewBox="0 0 561.803 561.802"
                    >
                        <polygon
                            points="240.773,521.674 240.773,411.322 561.803,411.322 561.803,152.994 240.773,152.994 240.773,40.128 0,280.905 "
                        ></polygon>
                    </svg>
                </div>
            </div>
            <div class="uk-width-1-4 uk-text-center">
                <Timeouts
                    :count-elements="timeouts"
                    :count-active="spentTimeoutsRight"
                ></Timeouts>
            </div>
        </div>
        <div class="flex-center-around need-to-rotate-when-mirroring">
            <div class="uk-width-1-3">
                <div class="view-fouls-left">
                    <div class="view-foul-text">Фолы</div>
                    <div class="view-foul">{{ folsLeft }}</div>
                </div>
            </div>
            <div class="uk-width-expand uk-flex uk-flex-center">
                <div class="view-period-wrapper">
                    <div class="view-quarter-wrapper">
                        <div class="view-period-text">{{ periodText }}</div>
                        <div class="view-period-value">{{ periodValue }}</div>
                    </div>
                </div>
            </div>
            <div class="uk-width-1-3">
                <div class="view-fouls-right">
                    <div class="view-foul-text">Фолы</div>
                    <div class="view-foul">{{ folsRight }}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import './../js/common.js';
import Timeouts from './Timeouts.vue';
import Clock from './Clock.vue';
import { reactive } from 'vue';


window.electron.receiveSettings((message) => {
    Object.entries(message).forEach(([field, value]) => {
        if (field === 'quarter') {
            vueData.periodText = 'Четверть';
            vueData.periodValue = value;
        } else if (field === 'overtime') {
            vueData.periodText = 'Овертайм';
            vueData.periodValue = value;
        } else if (vueData[field] !== undefined) {
            vueData[field] = value;
        } else {
            console.log('message error', message);
        }
    });
});

const vueData = reactive({
    teamLeft: 'Космические волки',
    teamRight: 'Команда П',
    scoreLeft: 100,
    scoreRight: 100,
    folsLeft: 0,
    folsRight: 0,
    periodText: 'Четверть',
    periodValue: 1,
    isMirror: false,
    showArrow: false,
    arrowDirection: 'left',
    seconds: 0,
    minutes: 0,
    counter24: 24,
    tenthsOfSecond: 0,
    timeouts: 2,
    spentTimeoutsLeft: 0,
    spentTimeoutsRight: 0,
});

export default {
    components: {
        Clock,
        Timeouts,
    },
    setup() {
        return vueData;
    },
};
</script>

<style>
</style>
