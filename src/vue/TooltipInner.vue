<template>
    <div
        v-show="false"
        ref="inner"
    />
    <teleport to="body">
        <transition>
            <div
                v-show="show"
                ref="tooltip"
                :class="[
                    $style.tooltip,
                    show ? $style.tooltipShow : '',
                ]"
            >
                {{ text }}
            </div>
        </transition>
    </teleport>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
    props: {
        text: {
            type: String,
            default: '',
        },
    },
    setup() {
        const inner = ref(null);
        const tooltip = ref(null);
        const show = ref(false);

        onMounted(() => {
            const parent = inner.value.parentNode;
            parent.addEventListener('mouseenter', (/* event */) => {
                tooltip.value.style.display = 'block';
                const rectEl = parent.getBoundingClientRect();
                const rectTool = tooltip.value.getBoundingClientRect();
                tooltip.value.style.display = '';

                tooltip.value.style.width = `${rectEl.width}px`;

                tooltip.value.style.top = `${rectEl.top - rectTool.height}px`;
                tooltip.value.style.left = `${rectEl.left}px`;

                show.value = true;
            });
            parent.addEventListener('mouseleave', (/* event */) => {
                show.value = false;
            });
        });

        return {
            inner,
            tooltip,
            show,
        };
    },
};
</script>

<style module>
.tooltip {
    position: absolute;
    top: 0;
    box-sizing: border-box;
    padding: 0.5vw;
    border: 1px solid #ccc;
    background: #222;
    border-radius: 5px;
    color: #ccc;
    font-size: 1.2vw;
    opacity: 0;
    transition-duration: 0.3s;
    transition-property: opacity;
}

.tooltipShow {
    opacity: 1;
}
</style>
