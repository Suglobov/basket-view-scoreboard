<template>
    <div>
        <button
            v-if="on"
            :class="$style.off"
            @click="$emit('update:on', false)"
        >
            Пауза
        </button>
        <button
            v-else
            :class="$style.on"
            @click="$emit('update:on', true)"
        >
            Старт
        </button>
    </div>
</template>

<script>
export default {
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
