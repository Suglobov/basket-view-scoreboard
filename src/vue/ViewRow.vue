<template>
    <div>
        <div :style="{ width: widthFirsLast }">
            <slot name="first" />
        </div>
        <div :style="{ width: `calc(100% - 2 * ${widthFirsLast})` }">
            <slot name="center" />
        </div>
        <div :style="{ width: widthFirsLast }">
            <slot name="last" />
        </div>
    </div>
</template>

<script>
export default {
    props: {
        widthFirsLast: {
            type: String,
            default: '10%',
        },
    },
};
</script>
