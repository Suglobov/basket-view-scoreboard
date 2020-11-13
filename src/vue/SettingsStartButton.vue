<template>
    <div>
        <button
            v-if="isTimeRunning"
            :class="$style.stopTimer"
            @click="funcStorage.startStopTimer.action"
        >
            <TooltipInner :text="funcHint.startStopTimer" />
            Пауза
        </button>
        <button
            v-else
            :class="$style.startTimer"
            @click="funcStorage.startStopTimer.action"
        >
            <TooltipInner :text="funcHint.startStopTimer" />
            Старт
        </button>
    </div>
</template>

<script>
import { inject } from 'vue';
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
    setup () {
        const funcStorage = inject('funcStorage', {});
        const funcHint = inject('funcHint', {});
        return {
            funcStorage,
            funcHint,
        };
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
