<template>
    <div>
        <label :class="$style.cursorPointer">
            <div :class="$style.text">Название</div>
            <div>
                <input
                    type="text"
                    :class="$style.team"
                    :value="team"
                    @input="$emit('update:team', $event.target.value)"
                />
            </div>
        </label>
    </div>
    <div class="d-flex flex-bottom">
        <label :class="$style.cursorPointer">
            <div :class="$style.text">Счет</div>
            <div>
                <input
                    type="number"
                    min="0"
                    max="1000"
                    step="1"
                    :class="$style.score"
                    :value="score"
                    @input="$emit('update:score', Number($event.target.value))"
                />
            </div>
        </label>
        <div>
            <button
                :class="[$style.scoreAdd, $style.cursorPointer]"
                @click="$emit('update:score', score + 1)"
            >
                +1
                <TooltipInner :text="tooltip1" />
            </button>
            <button
                :class="[$style.scoreAdd, $style.cursorPointer]"
                @click="$emit('update:score', score + 2)"
            >
                +2
                <TooltipInner :text="tooltip2" />
            </button>
            <button
                :class="[$style.scoreAdd, $style.cursorPointer]"
                @click="$emit('update:score', score + 3)"
            >
                +3
                <TooltipInner :text="tooltip3" />
            </button>
        </div>
    </div>
    <div class="d-flex">
        <label :class="$style.cursorPointer">
            <div :class="$style.text2">Таймауты</div>
            <div>
                <input
                    type="number"
                    min="0"
                    max="3"
                    step="1"
                    :class="$style.spentTimeouts"
                    :value="spentTimeouts"
                    @input="$emit('update:spentTimeouts', Number($event.target.value))"
                />
            </div>
        </label>
        <label :class="$style.cursorPointer">
            <div :class="$style.text2">Фолы</div>
            <div>
                <input
                    type="number"
                    min="0"
                    max="100"
                    step="1"
                    :class="$style.fols"
                    :value="fols"
                    @input="$emit('update:fols', Number($event.target.value))"
                />
            </div>
        </label>
    </div>
</template>

<script>
import TooltipInner from './TooltipInner.vue';

export default {
    components: {
        TooltipInner,
    },
    props : {
        team: {
            type: String,
            default: '',
        },
        score: {
            type: Number,
            default: 0,
        },
        spentTimeouts: {
            type: Number,
            default: 0,
        },
        fols: {
            type: Number,
            default: 0,
        },
        tooltip1: {
            type: String,
            default: '',
        },
        tooltip2: {
            type: String,
            default: '',
        },
        tooltip3: {
            type: String,
            default: '',
        },
    },
    emits: [
        'update:team',
        'update:score',
        'update:spentTimeouts',
        'update:fols',
    ],
};
</script>

<style module>
.cursorPointer {
    cursor: pointer;
}

.text {
    font-size: 1vw;
}

.text2 {
    font-size: 1vw;
    text-align: center;
}

.team {
    max-width: 400px;
    font-size: 2vw;
}

.score {
    width: 7vw;
    font-size: 3vw;
    text-align: right;
}

.spentTimeouts {
    width: 5vw;
    font-size: 3vw;
    text-align: right;
}

.fols {
    width: 5vw;
    font-size: 3vw;
    text-align: right;
}

.scoreAdd {
    background: rgb(134, 150, 240);
    font-size: 3vw;
}
</style>
