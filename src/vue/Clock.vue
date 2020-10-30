<template>
    <div class="clock">
        <div class="clockNumber">{{minutesDozens}}</div>
        <div class="clockNumber">{{minutesUnits}}</div>
        <div class="clockColon">:</div>
        <div class="clockNumber">{{secondsDozens}}</div>
        <div class="clockNumber">{{secondsUnits}}</div>
    </div>
</template>

<script>
export default {
    props: {
        minutes: Number,
        seconds: Number,
    },
    computed: {
        minutesDozens() {
            const dozens = Math.floor(this.minutes / 10);
            return dozens === 0 ? '' : dozens;
        },
        minutesUnits() {
            return this.minutes % 10;
        },
        secondsDozens() {
            const dozens = Math.floor(this.seconds / 10);
            return dozens;
        },
        secondsUnits() {
            return this.seconds % 10;
        },
    },
};
</script>

<style lang="scss">
.clock {
    display: flex;
    width: 100%;
}

.clockColon {
    text-align: center;
    width: 10%;
}

.clockNumber {
    text-align: center;
    width: 22.5%;
}
</style>
