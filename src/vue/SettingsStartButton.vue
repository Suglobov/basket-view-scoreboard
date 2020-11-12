<template>
    <div>
        <button
            v-if="isTimeRunning"
            :class="$style.stopTimer"
            @click="$emit('stop-timer')"
        >
            <TooltipInner :text="'пробел'" />
            Пауза
        </button>
        <button
            v-else
            :class="$style.startTimer"
            @click="$emit('start-timer')"
        >
            <TooltipInner :text="'пробел'" />
            Старт
        </button>
    </div>
</template>

<script>
import TooltipInner from './TooltipInner.vue';

export default {
    components: {
        TooltipInner,
    },
    props: {
        isTimeRunning: {
            type: Boolean,
            default: false,
        },
    },
    emits: [
        'stop-timer',
        'start-timer',
    ],
};
</script>

<style module>
.startTimer,
.stopTimer {
    padding: 2vw;
    cursor: pointer;
    font-size: 4vw;
}

.startTimer {
    background-color: #1e87f0;
    color: #fff;
}

.stopTimer {
    background-color: #f0506e;
    color: #fff;
}
</style>
