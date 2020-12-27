<template>
    <div class="settings-container font-Aldrich d-flex flex-between flex-wrap">
        <div>
            <SettingsTeam
                v-model:team="teamLeft"
                v-model:score="scoreLeft"
                v-model:spent-timeouts="spentTimeoutsLeft"
                v-model:fols="folsLeft"
                :side="'left'"
            />
            <SettingsHelpText />
            <div>
                <button
                    class="button"
                    @click="soundBuzzerTimer.play()"
                >
                    Звук конца четверти
                </button>
            </div>
            <div>
                <button
                    class="button"
                    @click="soundBuzzerCounter24.play()"
                >
                    Звук конца 24секунд
                </button>
            </div>
        </div>
        <div>
            <SettingsClock
                v-model:minutes="timer.minutes"
                v-model:seconds="timer.seconds"
                v-model:tenths="timer.tenths"
            />
            <SettingsStartButton :is-timer-running="isTimerRunning" />
            <hr>
            <SettingsCounter24
                v-model:tenths="counter24.tenths"
                v-model:seconds="counter24.seconds"
            />
            <SettingsSyncCounter24Button
                v-model:on="isCounter24RunningWithTimer"
                :is-counter24-temporary-stop="isCounter24TemporaryStop"
            />
        </div>
        <div>
            <SettingsTeam
                v-model:team="teamRight"
                v-model:score="scoreRight"
                v-model:spent-timeouts="spentTimeoutsRight"
                v-model:fols="folsRight"
                :side="'right'"
            />
            <div class="mt-big">
                <div>
                    <label class="d-flex cursor-pointer">
                        <input
                            v-model="showArrow"
                            class="showArrow"
                            type="checkbox"
                        >
                        <div>
                            <div>Показывать</div>
                            <div>стрелочку</div>
                        </div>
                    </label>
                </div>
                <ArrowAttack
                    :width="'15vw'"
                    :height="'7vw'"
                    :direction="arrowDirection"
                    :show="true"
                    @click="arrowDirection = arrowDirection === 'left' ? 'right' : 'left'"
                />
                <div>
                    <label class="d-flex cursor-pointer">
                        <input
                            v-model="isMirror"
                            class="mirror"
                            type="checkbox"
                        >
                        <div>
                            <div>Зеркалить</div>
                            <div>табло</div>
                        </div>
                    </label>
                </div>
                <div>
                    <label class="cursor-pointer">
                        <div>Период</div>
                        <input
                            v-model.number="period"
                            class="period"
                            type="number"
                            min="1"
                            step="1"
                        >
                    </label>
                    <label class="cursor-pointer">
                        <div>Всего таймаутов</div>
                        <div>
                            <input
                                v-model.number="timeouts"
                                class="timeouts"
                                type="number"
                                min="2"
                                max="3"
                                step="1"
                            >
                        </div>
                    </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import '../scss/style.scss';


import { vueData } from '../vue/instances.js';
import listenHotKeys from './listenHotKeys.js';

import SettingsTeam from './SettingsTeam.vue';
import SettingsClock from './SettingsClock.vue';
import SettingsCounter24 from './SettingsCounter24.vue';
import SettingsHelpText from './SettingsHelpText.vue';
import ArrowAttack from './ArrowAttack.vue';
import SettingsStartButton from './SettingsStartButton.vue';
import TooltipInner from './TooltipInner.vue';
import SettingsSyncCounter24Button from './SettingsSyncCounter24Button.vue';

const components = {
    SettingsTeam,
    SettingsClock,
    SettingsCounter24,
    SettingsHelpText,
    ArrowAttack,
    SettingsStartButton,
    TooltipInner,
    SettingsSyncCounter24Button,
};

listenHotKeys();


export default {
    components,
    setup () {
        return vueData;
    },
};
</script>
