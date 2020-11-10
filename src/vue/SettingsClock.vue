<template>
    <div class="d-flex">
        <label :class="$style.cursorPointer">
            <div :class="$style.text">Мин.</div>
            <div>
                <input
                    :class="$style.minutes"
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    :value="minutes"
                    @input="$emit('change-from-input', { minutes: Number($event.target.value) })"
                />
            </div>
        </label>
        <label :class="$style.cursorPointer">
            <div :class="$style.text">Сек.</div>
            <div>
                <input
                    :class="$style.seconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    :value="seconds"
                    @input="$emit('change-from-input', { seconds: Number($event.target.value) })"
                />
            </div>
        </label>
        <label :class="$style.cursorPointer">
            <div :class="$style.text">0.1</div>
            <div>
                <input
                    :class="$style.tenths"
                    type="number"
                    min="0"
                    max="9"
                    step="1"
                    :value="tenths"
                    @input="$emit('change-from-input', { tenths: Number($event.target.value) })"
                />
            </div>
        </label>
    </div>
    <div>
        <button
            :class="[$style.setValue, $style.cursorPointer]"
            @click="emitButton({ tenths: 0, seconds: 0, minutes: 5 })"
        >
            =5мин.
        </button>
        <button
            :class="[$style.setValue, $style.cursorPointer]"
            @click="emitButton({ tenths: 0, seconds: 0, minutes: 10 })"
        >
            =10мин.
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
        minutes: {
            type: Number,
            default: 0,
        },
    },
    emits: [
        'update:tenths',
        'update:seconds',
        'update:minutes',
        'change-from-button',
        'change-from-input',
        'changeFromButton',
        'changeFromInput',
    ],
    setup(props, context) {
        return {
            emitButton({ tenths, seconds, minutes }) {
                context.emit('change-from-button', { tenths, seconds, minutes });
            },
        };
    },
};
</script>

<style module>
.cursorPointer {
    cursor: pointer;
}

.text {
    cursor: pointer;
    font-size: 2vw;
}

.setValue {
    background: rgb(192, 236, 192);
    cursor: pointer;
    font-size: 2vw;
}

.minutes,
.seconds,
.tenths {
    font-size: 3vw;
}

.minutes {
    width: 5vw;
    text-align: right;
}

.seconds {
    width: 5vw;
    text-align: right;
}

.tenths {
    width: 3.5vw;
    text-align: right;
}
</style>
