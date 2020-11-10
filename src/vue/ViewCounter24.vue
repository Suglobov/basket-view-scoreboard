<template>
    <div
        :class="[
            $style.wrapper,
            seconds < 6 && tenths !== null ? $style.warning : '',
        ]"
    >
        <div
            :class="[
                $style.seconds,
                seconds < 10 ? $style.less10 : '',
            ]"
        >
            {{ seconds }}
        </div>
        <div
            v-show="tenths !== null"
            :class="$style.tenths"
        >
            .{{ tenths }}
        </div>
    </div>
</template>

<script>
export default {
    props: {
        tenths: {
            type: [Number, null],
            default: null,
        },
        seconds: {
            type: Number,
            default: 0,
        },
    },
};
</script>

<style lang="scss" module>
.wrapper {
    display: flex;
    justify-content: center;
    padding: 2vw;
    color: #e03838;
}

.warning {
    background-color: #e03838;
    border-radius: 10px;
    color: #fff;
}

.seconds {
    flex: none;
    font-size: 10vw;
    text-align: right;
}

.less10 {
    width: 8vw;
}

.tenths {
    width: 10vw;
    flex: none;
    font-size: 10vw;
}
</style>
