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
        let isGoNext = null;
        let transferData;

        const toNext = (data) => {
            transferData = data;
            isGoNext = true;
        };
        const toError = (data) => {
            transferData = data;
            isGoNext = false;
        };
        const callFunc = (func) => {
            if (func instanceof Function === false) {
                console.warn(new Error('func not function'));
                return;
            }

            isGoNext = null;
            transferData = func({
                data: transferData,
                toNext,
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
                callFunc(func);
            }

            return this;
        };

        deepFreeze(this);
    }
}

export const getInstanceOf = (value) => {
    return (
        value === undefined
            ? undefined
            : (
                value === null
                    ? null
                    : Object.getPrototypeOf(value)
            )
    );
};

export const checkInteger = ({
    value,
    onFailValue = 0,
    cbOk = () => { },
    cbFail = (_info) => { },
} = {}) => {
    if (Number.isInteger(onFailValue)) {
        console.warn(new Error('onFailValue is not an integer'));
        return;
    }
    if (cbOk instanceof Function === false) {
        console.warn(new Error('cbOk is not a function'));
        return;
    }
    if (cbFail instanceof Function === false) {
        console.warn(new Error('cbFail is not a function'));
        return;
    }

    if (Number.isInteger(value)) {
        cbOk();
        return;
    }

    const instanceOf = getInstanceOf(value);

    const parseInteger = parseInt(value, 10);
    const isNaN = Number.isNaN(parseInteger);
    const integer = isNaN ? onFailValue : parseInteger;

    cbFail({
        parseInteger,
        isNaN,
        integer,
        instanceOf,
    });
};

export const checkInstanceOf = ({
    value,
    type,
    cbOk = () => { },
    cbFail = (_info) => { },
} = {}) => {
    if (value === undefined || value === null) {
        console.warn(new Error('value not defined'));
        return;
    }
    if (cbOk instanceof Function === false) {
        console.warn(new Error('cbOk is not a function'));
        return;
    }
    if (cbFail instanceof Function === false) {
        console.warn(new Error('cbFail is not a function'));
        return;
    }
    if (type === undefined || type === null || type.name === undefined) {
        console.warn(new Error('type not constructor'));
        return;
    }

    let checkResult;
    const special = {
        String: (value) => typeof value === 'string',
        Number: (value) => typeof value === 'number',
        Boolean: (value) => typeof value === 'boolean',
        Symbol: (value) => typeof value === 'symbol',
        Object: (value) => typeof value === 'object' && value !== null,
    };

    if (special[String(type.name)] !== undefined) {
        checkResult = special[String(type.name)](value);
    } else {
        checkResult = (value instanceof type === true);
    }

    if (checkResult === true) {
        cbOk();
        return;
    }

    const instanceOf = getInstanceOf(value);
    console.warn(new Error(`${value} value is instanceof ${instanceOf.constructor.name}, not ${type.name}`));
    cbFail({
        instanceOf,
    });
};
