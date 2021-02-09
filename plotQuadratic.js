/**
 * A quadratic plot
 * @param {Plot} plot The plot
 * @param {HTMLInputElement} power The power
 * @constructor
 */
const PlotQuadratic = function(plot, power) {
    this.plot = plot;
    this.power = power;

    this.update();
};

/**
 * Update the plot
 */
PlotQuadratic.prototype.update = function() {
    this.plot.draw(
        x => x ** Number.parseFloat(this.power.value),
        [
            "power: " + this.power.value
        ]);
};