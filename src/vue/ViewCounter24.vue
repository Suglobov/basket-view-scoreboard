<template>
    <div
        :class="[
            $style.wrapper,
            seconds < 6 ? $style.warning : '',
        ]"
    >
        <div
            :class="[
                $style.seconds,
                seconds < 10 ? $style.showTenths : '',
            ]"
        >
            {{ seconds }}
        </div>
        <div
            v-show="seconds < 10"
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
            type: Number,
            default: 0,
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
    padding: 1vw;
    color: #e03838;
}

.warning {
    background-color: #ff0f;
    border-radius: 10px;
}

.seconds {
    flex: none;
    font-size: 12vw;
    text-align: right;
}

.showTenths {
    width: 8vw;
}

.tenths {
    width: 12vw;
    flex: none;
    font-size: 12vw;
}
</style>
