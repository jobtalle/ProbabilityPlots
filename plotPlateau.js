/**
 * A plateau plot
 * @param {Plot} plot The plot
 * @param {HTMLInputElement} plateau The plateau Y value in the range <0, infinite]
 * @param {HTMLInputElement} width The plateau width
 * @constructor
 */
const PlotPlateau = function(plot, plateau, width) {
    this.plot = plot;
    this.plateau = plateau;
    this.width = width;
};

/**
 * Update the plot
 */
PlotPlateau.prototype.update = function() {
    this.plot.draw(x => {
        const at = x - .5;
        const multiplier = (1 - Math.sin(Math.PI * x)) ** Number.parseFloat(this.width.value);

        return (4 * at * at * at * multiplier + .5) ** (Math.log(Number.parseFloat(this.plateau.value)) / Math.log(.5));
    },
    [
        "plateau: " + this.plateau.value,
        "width: " + this.width.value
    ]);
};