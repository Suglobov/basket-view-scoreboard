<template>
    <div
        class="view-container font-Aldrich"
        :class="{ mirror: isMirror }"
    >
        <ViewRow
            :width-firs-last="'25%'"
            class="d-flex flex-between mirror-change-direction"
        >
            <template #first>
                <div class="view-team view-team-left">
                    {{ teamLeft }}
                </div>
            </template>
            <template #center>
                <div class="view-time">
                    <Clock
                        :minutes="minutes"
                        :seconds="seconds"
                    />
                </div>
            </template>
            <template #last>
                <div class="view-team view-team-right">
                    {{ teamRight }}
                </div>
            </template>
        </ViewRow>
        <ViewRow
            :width-firs-last="'33%'"
            class="d-flex flex-between flex-bottom mirror-change-direction"
        >
            <template #first>
                <div class="view-score view-score-left">
                    {{ scoreLeft }}
                </div>
            </template>
            <template #center>
                <div class="view-counter24-wrapper d-flex">
                    <div class="view-counter-24">
                        {{ counter24 }}
                    </div>
                    <div
                        v-if="tenths !== null"
                        class="view-counter-24-tenths-of-second"
                    >
                        .{{ tenths }}
                    </div>
                </div>
            </template>
            <template #last>
                <div class="view-score view-score-right">
                    {{ scoreRight }}
                </div>
            </template>
        </ViewRow>
        <ViewRow
            :width-firs-last="'25%'"
            class="d-flex flex-between flex-middle mirror-change-direction"
        >
            <template #first>
                <TimeoutsBall
                    class="d-flex flex-center"
                    :count-elements="timeouts"
                    :count-active="spentTimeoutsLeft"
                />
            </template>
            <template #center>
                <div class="d-flex flex-center">
                    <div class="view-arrow-wrapper">
                        <svg
                            v-show="showArrow"
                            class="view-arrow-left"
                            :class="{
                                'arrow-right': arrowDirection === 'right',
                            }"
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
                            />
                        </svg>
                    </div>
                </div>
            </template>
            <template #last>
                <TimeoutsBall
                    class="d-flex flex-center"
                    :count-elements="timeouts"
                    :count-active="spentTimeoutsRight"
                />
            </template>
        </ViewRow>
        <ViewRow
            :width-firs-last="'33%'"
            class="d-flex flex-between mirror-change-direction"
        >
            <template #first>
                <div class="view-foul-text">
                    Фолы
                </div>
                <div
                    class="view-foul"
                    :class="{ 'view-foul-limit': folsLeft > 3 }"
                >
                    {{ folsLeft }}
                </div>
            </template>
            <template #center>
                <div class="view-period-wrapper">
                    <div class="view-quarter-wrapper">
                        <div class="view-period-text">
                            {{ periodText }}
                        </div>
                        <div class="view-period-value">
                            {{ periodValue }}
                        </div>
                    </div>
                </div>
            </template>
            <template #last>
                <div class="view-foul-text">
                    Фолы
                </div>
                <div
                    class="view-foul"
                    :class="{ 'view-foul-limit': folsRight > 3 }"
                >
                    {{ folsRight }}
                </div>
            </template>
        </ViewRow>
    </div>
</template>

<script>
import { reactive } from 'vue';
import './../scss/style.scss';
import TimeoutsBall from './TimeoutsBall.vue';
import Clock from './Clock.vue';
import ViewRow from './ViewRow.vue';


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
    scoreLeft: 0,
    scoreRight: 0,
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
    tenths: 0,
    timeouts: 2,
    spentTimeoutsLeft: 0,
    spentTimeoutsRight: 0,
});

export default {
    components: {
        Clock,
        TimeoutsBall,
        ViewRow,
    },
    setup() {
        return vueData;
    },
};
</script>
