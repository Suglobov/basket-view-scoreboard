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
                />
            </div>
        </label>
    </div>
    <div>
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
import debounce from '../components/debounce.js';

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
        'update:tenths',
        'update:seconds',
    ],
    setup(props, context) {
        return {
            emitButton({ tenths, seconds }) {
                context.emit('update:tenths', tenths);
                context.emit('update:seconds', seconds);
            },
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
    font-size: 4vw;
}

.signature {
    display: block;
    font-size: 1vw;
}
</style>
