<template>
    <div>
        <div :style="{ width: widthFirsLast }">
            <slot name="first"></slot>
        </div>
        <div :style="{ width: `calc(100% - 2 * ${widthFirsLast})` }">
            <slot name="center"></slot>
        </div>
        <div :style="{ width: widthFirsLast }">
            <slot name="last"></slot>
        </div>
    </div>
</template>

<script>
export default {
    props: ['widthFirsLast'],
};
</script>

<style>
</style>
