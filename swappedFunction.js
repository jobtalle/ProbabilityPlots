/**
 * A function with inverted axes
 * @param {Function} fy A function for y
 * @returns {Function} A function in the form fx(y)
 */
const SwappedFunction = function(fy) {
    this.fy = fy;

    return this.evaluate.bind(this);
};

SwappedFunction.prototype.STEPS = 512;

/**
 * Evaluate
 * @param {number} y The Y value to solve for
 * @returns {number} The X value
 */
SwappedFunction.prototype.evaluate = function(y) {
    if (y === 0)
        return 0;
    else if (y === 1)
        return 1;

    let x = .5;

    for (let i = 0; i < this.STEPS; ++i) {
        const step = 1 / (i + 2);

        if (this.fy(x) > y)
            x -= step;
        else
            x += step;
    }

    return x;
};