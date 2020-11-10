<template>
    <div>
        <label :class="$style.cursorPointer">
            <div :class="$style.text">Счетчик 24 секунд</div>
            <div>
                <input
                    :class="$style.counter24"
                    type="number"
                    min="0"
                    max="24"
                    step="0.1"
                    :value="`${seconds}.${tenths}`"
                    @input="emitInput"
                />
            </div>
        </label>
    </div>
    <div>
        <button
            v-tooltip="'A'"
            :class="[$style.setValue, $style.cursorPointer]"
            @click="emitButton({ tenths: 0, seconds: 0 })"
        >
            =0
            <span :class="$style.signature">(без баззера)</span>
        </button>
        <button
            v-tooltip="'S'"
            :class="[$style.setValue, $style.cursorPointer]"
            @click="emitButton({ tenths: 0, seconds: 14 })"
        >
            =14
        </button>
        <button
            v-tooltip="'D'"
            :class="[$style.setValue, $style.cursorPointer]"
            @click="emitButton({ tenths: 0, seconds: 24 })"
        >
            =24
        </button>
    </div>
</template>

<script>
export default {
    props : {
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
        'change-from-button',
        'change-from-input',
        'changeFromButton',
        'changeFromInput',
    ],
    setup(props, context) {
        return {
            emitButton({ tenths, seconds }) {
                context.emit('change-from-button', { tenths, seconds });
            },
            emitInput($event) {
                const values = $event.target.value.split('.');
                context.emit('change-from-input', {
                    tenths: Number(values[1] === undefined ? 0 : values[1]),
                    seconds: Number(values[0]),
                });
            },
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
    font-size: 4vw;
}

.signature {
    display: block;
    font-size: 1vw;
}
</style>
