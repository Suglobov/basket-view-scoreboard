<template>
    <div :class="$style.timeouts">
        <template v-for="n in countElements">
            <div
                v-if="n <= countActive"
                :key="'a' + n"
                :class="[$style.timeoutBall, $style.timeoutBallActive]"
            />
            <div
                v-else
                :key="'b' + n"
                :class="$style.timeoutBall"
            />
        </template>
    </div>
</template>

<script>
export default {
    props: {
        countElements: {
            type: Number,
            default: 0,
        },
        countActive: {
            type: Number,
            default: 0,
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
