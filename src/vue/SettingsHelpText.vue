<template>
    <div
        v-for="(item, index) in hotKeyFuncSettings"
        :key="index"
    >
        {{ hotKeyStorage[item.hotKey].hint }} - {{ funcStorage[item.func].hint }}
    </div>
</template>

<script>
import { hotKeyStorage, funcStorage, hotKeyFuncSettings } from './hotKeysFuncsStorages.js';

export default {
    setup () {
        return {
            funcStorage,
            hotKeyStorage,
            hotKeyFuncSettings,
        };
    },
};
</script>
