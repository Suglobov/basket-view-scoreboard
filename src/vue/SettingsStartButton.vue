<template>
    <div>
        <WrapperFuncWithHotkey
            v-if="isTimerRunning"
            :func-name="'startStopTimer'"
        >
            <button
                v-if="isTimerRunning"
                :class="$style.stopTimer"
            >
                Пауза
            </button>
        </WrapperFuncWithHotkey>
        <WrapperFuncWithHotkey
            v-else
            :func-name="'startStopTimer'"
        >
            <button
                :class="$style.startTimer"
            >
                Старт
            </button>
        </WrapperFuncWithHotkey>
    </div>
</template>

<script>
import WrapperFuncWithHotkey from './WrapperFuncWithHotkey.vue';

export default {
    components: {
        WrapperFuncWithHotkey,
    },
    props: {
        isTimerRunning: {
            type: Boolean,
            default: false,
        },
    },
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
