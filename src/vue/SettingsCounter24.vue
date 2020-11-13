<template>
    <div>
        <label :class="$style.cursorPointer">
            <div :class="$style.text">Счетчик 24 секунд</div>
            <div>
                <input
                    :class="$style.counter24"
                    :value="`${seconds}.${tenths}`"
                    type="number"
                    min="0"
                    max="24"
                    step="0.1"
                    @input="emitInput"
                >
            </div>
        </label>
    </div>
    <div>
        <WrapperFuncWithHotkey :func-name="'setCounter24To14'">
            <button :class="$style.setValue">
                =14
            </button>
        </WrapperFuncWithHotkey>
        <WrapperFuncWithHotkey :func-name="'setCounter24To24'">
            <button :class="$style.setValue">
                =24
            </button>
        </WrapperFuncWithHotkey>
    </div>
</template>

<script>
import debounce from '../components/debounce.js';
import WrapperFuncWithHotkey from './WrapperFuncWithHotkey.vue';

export default {
    components: {
        WrapperFuncWithHotkey,
    },
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
    emits: [
        'update:tenths',
        'update:seconds',
    ],
    setup (props, context) {
        return {
            emitInput: debounce(($event) => {
                const values = $event.target.value.split('.');
                context.emit('update:tenths', Number(values[1] === undefined ? 0 : values[1]));
                context.emit('update:seconds', Number(values[0]));
            }, 100),
        };
    },
};
</script>

<style module>
.cursorPointer {
    cursor: pointer;
}

.counter24 {
    width: 12vw;
    font-size: 5vw;
    text-align: right;
}

.text {
    font-size: 2vw;
}

.setValue {
    background: rgb(192, 236, 192);
    cursor: pointer;
    font-size: 4vw;
}

.signature {
    display: block;
    font-size: 1vw;
}
</style>
