<template>
    <div
        :class="$style.wrapper"
        @click.capture="func"
    >
        <TooltipInner :text="hint" />
        <slot />
    </div>
</template>

<script>
import { toRefs } from 'vue';
import TooltipInner from './TooltipInner.vue';

import { funcStorage, funcHint } from './hotKeysFuncsStorages.js';

export default {
    components: {
        TooltipInner,
    },
    props: {
        funcName: {
            type: String,
            default: '',
        },
    },
    setup (props) {
        const { funcName } = toRefs(props);

        const func = funcStorage[funcName.value] ? funcStorage[funcName.value].action : () => {};
        const hint = funcHint[funcName.value] ? funcHint[funcName.value] : '';
        return {
            func,
            hint,
        };
    },
};
</script>

<style module>
.wrapper {
    display: inline-block;
}
</style>
