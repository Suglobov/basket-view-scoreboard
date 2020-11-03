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
                <div class="view-team">
                    {{ teamLeft }}
                </div>
            </template>
            <template #center>
                <div class="view-time">
                    <ViewClock
                        :minutes="timer.minutes"
                        :seconds="timer.seconds"
                    />
                </div>
            </template>
            <template #last>
                <div class="view-team">
                    {{ teamRight }}
                </div>
            </template>
        </ViewRow>
        <ViewRow
            :width-firs-last="'33%'"
            class="d-flex flex-between flex-bottom mirror-change-direction"
        >
            <template #first>
                <div class="view-score">
                    {{ scoreLeft }}
                </div>
            </template>
            <template #center>
                <div class="d-flex width-1-1">
                    <div class="view-counter-24">
                        {{ counter24.seconds }}
                    </div>
                    <div
                        v-if="counter24.tenths !== null"
                        class="view-counter-24-tenths-of-second"
                    >
                        .{{ counter24.tenths }}
                    </div>
                </div>
            </template>
            <template #last>
                <div class="view-score">
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
                    <ArrowAttack
                        :width="'15vw'"
                        :height="'15vw'"
                        :direction="((arrowDirection === 'left' && isMirror === false)
                            || (arrowDirection === 'right' && isMirror === true)) ? 'left' : 'right'"
                        :show="showArrow"
                    />
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
                <ViewPeriod :period="period" />
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
import '../scss/style.scss';
import TimeoutsBall from './TimeoutsBall.vue';
import ViewClock from './ViewClock.vue';
import ViewRow from './ViewRow.vue';
import ViewPeriod from './ViewPeriod.vue';
import ArrowAttack from './ArrowAttack.vue';


const components = {
    ViewClock,
    TimeoutsBall,
    ViewRow,
    ViewPeriod,
    ArrowAttack,
};

window.electron.receiveSettings((message) => {
    Object.entries(message).forEach(([field, value]) => {
        if (vueData[field] !== undefined) {
            vueData[field] = value;
        } else {
            console.log('message error', message);
        }
    });
});

const vueData = reactive({
    teamLeft: 'Команда Л',
    teamRight: 'Команда П',
    scoreLeft: 0,
    scoreRight: 0,
    folsLeft: 0,
    folsRight: 0,
    isMirror: false,
    showArrow: false,
    arrowDirection: 'left',
    timeouts: 2,
    spentTimeoutsLeft: 0,
    spentTimeoutsRight: 0,
    period: 1,
    timer: {
        tenths: 0,
        seconds: 0,
        minutes: 0,
    },
    counter24: {
        tenths: 0,
        seconds: 0,
    },
});

export default {
    components,
    setup() {
        return vueData;
    },
};
</script>
