<template>
    <div v-tooltip="'пробел'">
        <button
            v-if="isTimeRunning"
            :class="$style.stopTimer"
            @click="$emit('stop-timer')"
        >
            Пауза
        </button>
        <button
            v-else
            :class="$style.startTimer"
            @click="$emit('start-timer')"
        >
            Старт
        </button>
    </div>
</template>

<script>
export default {
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
