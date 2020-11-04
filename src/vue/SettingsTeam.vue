<template>
    <div>
        <label>
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
        <label>
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
                v-tooltip="tooltip1"
                :class="$style.scoreAdd"
                @click="$emit('update:score', score + 1)"
            >
                +1
            </button>
            <button
                v-tooltip="tooltip2"
                :class="$style.scoreAdd"
                @click="$emit('update:score', score + 2)"
            >
                +2
            </button>
            <button
                v-tooltip="tooltip3"
                :class="$style.scoreAdd"
                @click="$emit('update:score', score + 3)"
            >
                +3
            </button>
        </div>
    </div>
    <div class="d-flex">
        <label>
            <div :class="$style.textFols">Таймауты</div>
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
        <label>
            <div :class="$style.textFols">Фолы</div>
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
export default {
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
.text {
    font-size: 1vw;
}

.textFols {
    font-size: 1vw;
    text-align: center;
}

.team {
    font-size: 2vw;
    max-width: 400px;
}

.score {
    font-size: 3vw;
    text-align: right;
    width: 7vw;
}

.spentTimeouts {
    font-size: 3vw;
    text-align: right;
    width: 5vw;
}

.fols {
    font-size: 3vw;
    text-align: right;
    width: 5vw;
}

.scoreAdd {
    background: rgb(134, 150, 240);
    font-size: 3vw;
}
</style>
