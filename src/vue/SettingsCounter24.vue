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
        <WrapperFuncWithHotkeyAndStopCounter24 :func-name="'setCounter24To14'">
            <button :class="$style.setValue">
                =14
            </button>
        </WrapperFuncWithHotkeyAndStopCounter24>
        <WrapperFuncWithHotkeyAndStopCounter24 :func-name="'setCounter24To24'">
            <button :class="$style.setValue">
                =24
            </button>
        </WrapperFuncWithHotkeyAndStopCounter24>
    </div>
</template>

<script>
import WrapperFuncWithHotkeyAndStopCounter24 from './WrapperFuncWithHotkeyAndStopCounter24.vue';

export default {
    components: {
        WrapperFuncWithHotkeyAndStopCounter24,
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
        const emitValue = (event) => {
            const values = event.target.value.split('.');
            context.emit('update:tenths', Number(values[1] === undefined ? 0 : values[1]));
            context.emit('update:seconds', Number(values[0]));
        };
        return {
            emitInput: (() => {
                let timer;
                return (event) => {
                    clearInterval(timer);
                    if (event.inputType === undefined) {
                        emitValue(event);
                        return;
                    }
                    timer = setTimeout(emitValue, 500, event);
                };
            })(),
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
