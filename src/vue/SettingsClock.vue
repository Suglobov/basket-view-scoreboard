<template>
    <div class="d-flex">
        <label>
            <div :class="$style.text">Мин.</div>
            <div>
                <input
                    :class="$style.minutes"
                    type="number"
                    min="0"
                    max="10"
                    step="1"
                    :value="minutes"
                    @input="$emit('update:minutes', Number($event.target.value))"
                />
            </div>
        </label>
        <label>
            <div :class="$style.text">Сек.</div>
            <div>
                <input
                    :class="$style.seconds"
                    type="number"
                    min="0"
                    max="59"
                    step="1"
                    :value="seconds"
                    @input="$emit('update:seconds', Number($event.target.value))"
                />
            </div>
        </label>
        <label>
            <div :class="$style.text">0.1</div>
            <div>
                <input
                    :class="$style.tenths"
                    type="number"
                    min="0"
                    max="9"
                    step="1"
                    :value="tenths"
                    @input="$emit('update:tenths', Number($event.target.value))"
                />
            </div>
        </label>
    </div>
    <div>
        <button
            :class="$style.setValue"
            @click="emitData({ tenths: 0, seconds: 0, minutes: 5 })"
        >
            =5мин.
        </button>
        <button
            :class="$style.setValue"
            @click="emitData({ tenths: 0, seconds: 0, minutes: 10 })"
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
    ],
    setup(props, context) {
        return {
            emitData({ tenths, seconds, minutes }) {
                setTimeout(() => context.emit('update:tenths', tenths));
                setTimeout(() => context.emit('update:seconds', seconds));
                setTimeout(() => context.emit('update:minutes', minutes));
            },
        };
    },
};
</script>
<style module>
.text {
    font-size: 2vw;
}

.setValue {
    background: rgb(192, 236, 192);
    font-size: 2vw;
}

.minutes,
.seconds,
.tenths {
    font-size: 3vw;
}

.minutes {
    text-align: right;
    width: 5vw;
}

.seconds {
    text-align: right;
    width: 5vw;
}

.tenths {
    text-align: right;
    width: 3.5vw;
}
</style>
