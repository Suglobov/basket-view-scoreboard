<template>
    <div :style="{ width, height }">
        <svg
            v-show="show"
            :class="[
                $style.arrowLeft,
                direction === 'right' ? $style.arrowRight : '',
            ]"
            preserveAspectRatio="none"
            version="1.1"
            xmlns="http://www.w3.org/2000/svg"
            xmlns:xlink="http://www.w3.org/1999/xlink"
            x="0px"
            y="0px"
            viewBox="0 0 561.803 561.802"
        >
            <polygon
                points="240.773,521.674 240.773,411.322 561.803,411.322 561.803,152.994 240.773,152.994 240.773,40.128 0,280.905 "
            />
        </svg>
    </div>
</template>

<script>
export default {
    props: {
        width: {
            type: String,
            default: '1vw',
        },
        height: {
            type: String,
            default: '1vw',
        },
        direction: {
            type: String,
            default: 'left',
            validator: (value) => ['left', 'right'].includes(value),
        },
        show: {
            type: Boolean,
            default: true,
        },
    },
};
</script>

<style module>
.arrowLeft {
    width: 100%;
    height: 100%;
    cursor: pointer;
    fill: #e6e00d;
}

.arrowRight {
    transform: rotateY(180deg);
}
</style>
