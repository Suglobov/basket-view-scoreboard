class CountdownTimer {
    constructor(valueComponents = [],) {
        this.vcs = valueComponents;
    }
    change(values,) {
        values.forEach((value, index,) => {
            if (value !== undefined) {
                this.vcs[index].setValue(value,);
            }
        },);
    }
    give() {
        return this.vcs;
    }
    isZero() {
        return this.vcs.every(({ value, min, },) => value === min,);
    }
    minus1() {
        const firstNoMinIndex = this.vcs.findIndex(({ value, min, },) => value > min,);
        if (firstNoMinIndex === -1) {
            return -1;
        }
        this.vcs.some((vc, index,) => {
            if (index < firstNoMinIndex) {
                vc.setToMax();
                return false;
            }
            if (index === firstNoMinIndex) {
                vc.setValue(vc.value - 1,);
                return false;
            }
            return true;
        },);
        return firstNoMinIndex;
    }
}

export default CountdownTimer;
