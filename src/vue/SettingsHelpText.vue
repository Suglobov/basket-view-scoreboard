<template>
    <div
        v-for="(item, index) in hotKeyFuncSettings"
        :key="index"
    >
        {{ hotKeyStorage[item.hotKey].hint }} - {{ funcStorage[item.func].hint }}
    </div>
</template>

<script>
import { inject } from 'vue';

export default {
    setup () {
        const hotKeyStorage = inject('hotKeyStorage', {});
        const funcStorage = inject('funcStorage', {});
        const hotKeyFuncSettings = inject('hotKeyFuncSettings', []);

        return {
            funcStorage,
            hotKeyStorage,
            hotKeyFuncSettings,
        };
    },
};
</script>
