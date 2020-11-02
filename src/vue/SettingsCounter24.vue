<template>
    <div>
        <label>
            <div>Счетчик 24 секунд</div>
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
            :class="$style.setValue"
            @click="emitData({ tenths: 0, seconds: 0 })"
        >
            =0
            <span :class="$style.signature">(без баззера)</span>
        </button>
    </div>
    <div>
        <button
            :class="$style.setValue"
            @click="emitData({ tenths: 0, seconds: 14 })"
        >
            =14
        </button>
        <button
            :class="$style.setValue"
            @click="emitData({ tenths: 0, seconds: 24 })"
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
            emitData({ tenths, seconds }) {
                setTimeout(() => context.emit('update:tenths', tenths));
                setTimeout(() => context.emit('update:seconds', seconds));
            },
            emitInput: debounce(($event) =>{
                const values = $event.target.value.split('.');
                setTimeout(() => context.emit('update:tenths', Number(values[1] === undefined ? 0 : values[1])));
                setTimeout(() => context.emit('update:seconds', Number(values[0])));
            }, 500),
        };
    },
};
</script>

<style module>
.counter24 {
    font-size: 5vw;
    text-align: right;
    width: 12vw;
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
