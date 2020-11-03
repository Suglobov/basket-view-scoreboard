export default {
    mounted(el, binding) {
        console.log(binding);
        if (binding.value === '') {
            return;
        }
        const tooltipElement = document.createElement('div');
        tooltipElement.classList.add('tooltip');
        tooltipElement.innerHTML = binding.value;
        document.body.append(tooltipElement);

        el.addEventListener('mouseover', (/* event */) => {
            setTimeout(() => {
                tooltipElement.classList.add('tooltip-show');
                const rectEl = el.getBoundingClientRect();
                tooltipElement.style.width = `${rectEl.width}px`;
                const rectTool = tooltipElement.getBoundingClientRect();
                tooltipElement.style.top = `${rectEl.top - rectTool.height}px`;
                tooltipElement.style.left = `${rectEl.left}px`;
                setTimeout(() => tooltipElement.classList.add('tooltip-opacity'));
            });
        });
        el.addEventListener('mouseout', (/* event */) => {
            tooltipElement.classList.remove('tooltip-show');
            tooltipElement.classList.remove('tooltip-opacity');
        });
    },
};
