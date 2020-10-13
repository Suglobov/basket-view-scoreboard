class TimeComponent {
    constructor({
        value = 0,
        min = 0,
        max = 0,
    }) {
        this.min = min;
        this.max = max;
        this.setValue(value);
    }
    setValue(value) {
        if (value >= this.min && value <= this.max) {
            this.value = value;
        } else if (value < this.min) {
            this.value = this.min;
        } else if (value > this.max) {
            this.value = this.max;
        }
        return this;
    }
}

export default TimeComponent;
