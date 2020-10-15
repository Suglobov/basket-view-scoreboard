<template>
    <div class="timeouts timeouts-left timeouts-2">
        <template v-for="n in countElements">
            <div :key="n" v-if="n <= countActive" class="timeout-ball timeout-ball--active"></div>
            <div :key="n" v-else class="timeout-ball"></div>
        </template>
    </div>
</template>

<script>
export default {
    props: {
        countElements: Number,
        countActive: Number,
    },
};
</script>

<style lang="scss" scoped>
.timeouts {
    display: inline-flex;
    justify-content: center;
}

.timeout-ball {
    border: 3px solid #1bda5f;
    border-radius: 50%;
    box-sizing: border-box;
    height: 50px;
    margin-left: 10px;
    margin-right: 10px;
    width: 50px;
}

.timeout-ball--active {
    background-color: #1bda5f;
}
</style>
