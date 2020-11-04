<template>
    <div :class="$style.clock">
        <div :class="$style.clockNumber">
            {{ minutesDozens }}
        </div>
        <div :class="$style.clockNumber">
            {{ minutesUnits }}
        </div>
        <div :class="$style.clockColon">
            :
        </div>
        <div :class="$style.clockNumber">
            {{ secondsDozens }}
        </div>
        <div :class="$style.clockNumber">
            {{ secondsUnits }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        minutes: {
            type: Number,
            default: 0,
        },
        seconds: {
            type: Number,
            default: 0,
        },
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

<style module>
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
