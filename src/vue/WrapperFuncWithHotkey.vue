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
import { inject, toRefs } from 'vue';
import TooltipInner from './TooltipInner.vue';

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

        const funcStorage = inject('funcStorage', {});
        const funcHint = inject('funcHint', {});

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
