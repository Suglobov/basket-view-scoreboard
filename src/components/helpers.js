export const debounce = (func, delay) => {
    let timeout;
    return function () {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, arguments), delay);
    };
};

export const getIntegerInfo = (value) => {
    const out = Object.create(null);
    out.input = value;
    out.integer = value;
    out.isInteger = true;
    out.isNaN = false;

    if (Number.isInteger(value) === false) {
        const int = parseInt(String(value), 10);
        out.isInteger = false;
        out.isNaN = Number.isNaN(int);
        out.integer = out.isNaN ? 0 : int;
    }

    Object.freeze(out);
    return out;
};

export const waterFall = (...functions) => {
    const next = ([firstFunction, ...otherFunctions], ...previousResult) => {
        const cbNext = (...data) => {
            if (otherFunctions.length === 0) {
                return;
            }
            next(otherFunctions, ...data);
        };

        firstFunction(cbNext, ...previousResult);
    };

    next(functions);
};

