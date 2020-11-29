export default function (variable, type = '') {
    const typeTests = {
        function: (value) => value instanceof Function,
        object: (value) => typeof value === 'object' && value instanceof Object,
        string: (value) => typeof value === 'string',
        number: (value) => typeof value === 'number',
        integer: (value) => typeof value === 'number' && Number.isInteger(value),
        array: (value) => Array.isArray(value),
    };

    if (typeTests[type] === undefined) {
        throw new Error(`type '${type}' not supported`);
    }

    if (typeTests[type](variable) === false) {
        throw new Error(`'${variable}' type not ${type}`);
    }
}
