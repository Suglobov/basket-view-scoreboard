<template>
    <div>
        <WrapperFuncWithHotkey
            v-if="on"
            :func-name="'startStopCounter24'"
        >
            <button :class="$style.off">
                Пауза
            </button>
        </WrapperFuncWithHotkey>
        <WrapperFuncWithHotkey
            v-else
            :func-name="'startStopCounter24'"
        >
            <button :class="$style.on">
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
        on: {
            type: Boolean,
            default: false,
        },
    },
    emits: [
        'update:on',
    ],
};
</script>

<style module>
.on,
.off {
    padding: 1vw;
    cursor: pointer;
    font-size: 3vw;
}

.on {
    background-color: #48f01e;
    color: #fff;
}

.off {
    background-color: #f0506e;
    color: #fff;
}
</style>
