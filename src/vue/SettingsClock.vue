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
                    @input="emitInput({ minutes: Number($event.target.value) })"
                >
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
                    @input="emitInput({ seconds: Number($event.target.value) })"
                >
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
                    @input="emitInput({ tenths: Number($event.target.value) })"
                >
            </div>
        </label>
    </div>
    <div>
        <WrapperFuncWithHotkey :func-name="'setTimerTo5m'">
            <button :class="$style.setValue">
                =5мин.
            </button>
        </WrapperFuncWithHotkey>
        <WrapperFuncWithHotkey :func-name="'setTimerTo10m'">
            <button :class="$style.setValue">
                =10мин.
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
        minutes: {
            type: Number,
            default: 0,
        },
    },
    emits: [
        'update:tenths',
        'update:seconds',
        'update:minutes',
    ],
    setup (props, context) {
        return {
            emitButton ({ tenths, seconds, minutes }) {
                context.emit('update:tenths', tenths);
                context.emit('update:seconds', seconds);
                context.emit('update:minutes', minutes);
            },
            emitInput: debounce(({ tenths, seconds, minutes }) => {
                context.emit('update:tenths', tenths);
                context.emit('update:seconds', seconds);
                context.emit('update:minutes', minutes);
            }, 500),
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
