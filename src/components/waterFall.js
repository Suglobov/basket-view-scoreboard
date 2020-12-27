export default (...functions) => {
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
