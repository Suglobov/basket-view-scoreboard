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

export const deepFreeze = (object) => {
    const iter = (iterObject) => {
        if (Object.isFrozen(iterObject) === false) {
            Object.freeze(iterObject);
        }
        Object.keys(iterObject).forEach((key) => {
            if (
                iterObject[key] instanceof Object ||
                (typeof iterObject[key] === 'object' && iterObject[key] !== null)
            ) {
                iter(iterObject[key]);
            }
        });
    };
    iter(object);
};

export const getSimpleObject = (object) => {
    const iter = (iterObject) => {
        const simpleIterObject = Object.create(null);
        Object.keys(iterObject).forEach((key) => {
            if (typeof object[key] === 'object' && object[key] !== null) {
                simpleIterObject[key] = iter(iterObject[key]);
            } else {
                simpleIterObject[key] = iterObject[key];
            }
        });
        return simpleIterObject;
    };

    const simpleObject = iter(object);

    return simpleObject;
};

export const waterFall = (...functions) => {
    const next = ([firstFunction, ...otherFunctions], ...previousResult) => {
        if (firstFunction instanceof Function === false) {
            console.warn(new Error(`'${firstFunction}' not function`));
            return;
        }

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


/*
new GoNext(({ toError }) => {})
    .next(({ toError, data }) => {
        if (need to transfer data to .next) {
            return data;
        } else if(need to transfer data to .error ) {
            return toError(data);
        }
    })
    .error(({ toError, data }) => {
        similarly as 'next'
    })
*/
export class GoNext {
    constructor (func) {
        let isGoNext = true;
        let transferData;
        const toError = (data) => {
            transferData = data;
            isGoNext = false;
            return data;
        };
        const callFunc = (func) => {
            if (func instanceof Function === false) {
                console.warn(new Error('func not function'));
                return;
            }

            transferData = func({
                data: transferData,
                toError,
            });
        };

        this.next = undefined;
        this.error = undefined;


        callFunc(func);

        this.next = (func) => {
            if (isGoNext === true) {
                callFunc(func);
            }

            return this;
        };

        this.error = (func) => {
            if (isGoNext === false) {
                isGoNext = true;
                callFunc(func);
            }

            return this;
        };

        deepFreeze(this);
    }
}

export const checkType = () => {

};
