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
    display: flex;
    justify-content: center;
}

.timeout-ball {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    margin-right: 10px;
    margin-left: 10px;

    border: 3px solid #1bda5f;
    border-radius: 50%;
}

.timeout-ball--active {
    background-color: #1bda5f;
}
</style>