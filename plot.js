/**
 * A plot
 * @param {HTMLCanvasElement} canvas The canvas to plot on
 * @constructor
 */
const Plot = function(canvas) {
    this.context = canvas.getContext("2d");
    this.width = canvas.width;
    this.height = canvas.height;
};

Plot.prototype.PADDING = 2;
Plot.prototype.GRID_COLOR = "#d2d2d2";
Plot.prototype.GRID_LINE_WIDTH = 1.5;
Plot.prototype.AXIS_COLOR = "#6b6b6b";
Plot.prototype.AXIS_LINE_WIDTH = 1.5;
Plot.prototype.TICKS = 4;
Plot.prototype.TICK_SIZE = 8;
Plot.prototype.PLOT_COLOR = "#d64034";
Plot.prototype.PLOT_LINE_WIDTH = 2;
Plot.prototype.RESOLUTION = 3;
Plot.prototype.STEP = .001;

/**
 * Draw the grid lines
 */
Plot.prototype.drawGrid = function() {
    this.context.strokeStyle = this.GRID_COLOR;
    this.context.lineWidth = this.GRID_LINE_WIDTH;

    for (let tick = 0; tick < this.TICKS; ++tick) {
        const y = this.PADDING + (this.height - this.PADDING - this.TICK_SIZE) * tick / this.TICKS;
        const x = this.width - this.PADDING - (this.width - this.PADDING - this.TICK_SIZE) * tick / this.TICKS;

        this.context.beginPath();
        this.context.moveTo(this.PADDING, y);
        this.context.lineTo(this.width - this.PADDING, y);
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(x, this.PADDING);
        this.context.lineTo(x, this.height - this.PADDING);
        this.context.stroke();
    }
};

/**
 * Draw both axes
 */
Plot.prototype.drawAxes = function() {
    this.context.strokeStyle = this.AXIS_COLOR;
    this.context.lineWidth = this.AXIS_LINE_WIDTH;

    this.context.beginPath();
    this.context.moveTo(this.PADDING, this.PADDING);
    this.context.lineTo(this.PADDING, this.height - this.PADDING);
    this.context.stroke();

    this.context.beginPath();
    this.context.moveTo(this.PADDING, this.height - this.PADDING);
    this.context.lineTo(this.width - this.PADDING, this.height - this.PADDING);
    this.context.stroke();

    for (let tick = 0; tick < this.TICKS; ++tick) {
        const y = this.PADDING + (this.height - this.PADDING - this.TICK_SIZE) * tick / this.TICKS;
        const x = this.width - this.PADDING - (this.width - this.PADDING - this.TICK_SIZE) * tick / this.TICKS;

        this.context.beginPath();
        this.context.moveTo(this.PADDING, y);
        this.context.lineTo(this.PADDING + this.TICK_SIZE, y);
        this.context.stroke();

        this.context.beginPath();
        this.context.moveTo(x, this.height - this.PADDING - this.TICK_SIZE);
        this.context.lineTo(x, this.height - this.PADDING);
        this.context.stroke();
    }
};

/**
 * Plot the function
 * @param {Function} f A function to plot
 */
Plot.prototype.drawPlot = function(f) {
    let xPrevious = this.PADDING;
    let yPrevious = this.height - this.PADDING;

    this.context.strokeStyle = this.PLOT_COLOR;
    this.context.lineWidth = this.PLOT_LINE_WIDTH;

    this.context.beginPath();
    this.context.moveTo(xPrevious, yPrevious);

    for (let xStep = this.STEP; xStep <= 1; xStep += this.STEP) {
        const x = this.PADDING + (this.width - this.PADDING * 2) * xStep;
        const y = this.height - this.PADDING - f(xStep) * (this.height - this.PADDING * 2);
        const dy = y - yPrevious;

        if (this.STEP * this.STEP + dy * dy > this.RESOLUTION * this.RESOLUTION) {
            this.context.lineTo(x, y);

            xPrevious = x;
            yPrevious = y;
        }
    }

    this.context.lineTo(this.width - this.PADDING, this.PADDING);
    this.context.stroke();
};

/**
 * Draw a plot
 * @param {Function} f A function to plot
 */
Plot.prototype.draw = function(f) {
    this.context.clearRect(0, 0, this.width, this.height);

    this.drawGrid();
    this.drawPlot(f);
    this.drawAxes();
};