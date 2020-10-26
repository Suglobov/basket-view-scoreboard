<template>
    <div :class="$style.timeouts">
        <template v-for="n in countElementsNumber">
            <div
                :key="'a' + n"
                v-if="n <= countActiveNumber"
                :class="[$style.timeoutBall, timeoutBallActive]"
            ></div>
            <div :key="'b' + n" v-else :class="$style.timeoutBall"></div>
        </template>
    </div>
</template>

<script>
export default {
    props: ['countElements', 'countActive'],
    computed: {
        countElementsNumber() {
            return Number(this.countElements);
        },
        countActiveNumber() {
            return Number(this.countActive);
        },
    },
};
</script>

<style module>
.timeoutBall {
    border: 3px solid #1bda5f;
    border-radius: 50%;
    box-sizing: border-box;
    height: 6vw;
    margin-left: 1vw;
    margin-right: 1vw;
    width: 6vw;
}

.timeoutBallActive {
    background-color: #1bda5f;
}
</style>
