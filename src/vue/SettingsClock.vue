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
                    @input="emitInput($event, { minutes: Number($event.target.value) })"
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
                    max="60"
                    step="1"
                    :value="seconds"
                    @input="emitInput($event, { seconds: Number($event.target.value) })"
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
                    max="10"
                    step="1"
                    :value="tenths"
                    @input="emitInput($event, { tenths: Number($event.target.value) })"
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
        const emitValue = ({ tenths, seconds, minutes }) => {
            if (tenths !== undefined) {
                context.emit('update:tenths', tenths);
            }
            if (seconds !== undefined) {
                context.emit('update:seconds', seconds);
            }
            if (minutes !== undefined) {
                context.emit('update:minutes', minutes);
            }
        };
        return {
            emitInput: (() => {
                let timer;
                return (event, data) => {
                    clearInterval(timer);
                    if (event.inputType === undefined) {
                        emitValue(data);
                        return;
                    }
                    timer = setTimeout(emitValue, 500, data);
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
    width: 5vw;
    font-size: 3vw;
    text-align: right;
}
</style>
