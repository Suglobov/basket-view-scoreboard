class ValueComponent {
    constructor({
        value = 0,
        min = 0,
        max = 0,
    },) {
        this.min = min;
        this.max = max;
        this.setValue(value,);
    }
    setValue(value,) {
        if (value >= this.min && value <= this.max) {
            this.value = value;
        } else if (value < this.min) {
            this.setToMin();
        } else if (value > this.max) {
            this.setToMax();
        }
        return this;
    }
    setToMax() {
        this.value = this.max;
        return this;
    }
    setToMin() {
        this.value = this.min;
        return this;
    }
}

export default ValueComponent;
