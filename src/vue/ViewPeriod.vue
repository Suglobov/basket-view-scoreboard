<template>
    <div
        v-if="period < 5"
        :class="$style.text"
    >
        Четверть
    </div>
    <div
        v-else
        :class="$style.text"
    >
        Овертайм
    </div>
    <div :class="$style.period">
        {{ period }}
    </div>
</template>

<script>
export default {
    props: {
        period: {
            type: Number,
            default: 1,
        },
    },
};
</script>

<style module>
.text {
    font-size: 3vw;
    text-align: center;
}

.period {
    color: #1bda5f;
    font-size: 10vw;
    text-align: center;
}
</style>
