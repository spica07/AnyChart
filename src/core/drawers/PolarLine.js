goog.provide('anychart.core.drawers.PolarLine');
goog.require('anychart.core.drawers');
goog.require('anychart.core.drawers.Base');
goog.require('anychart.enums');


/**
 * PolarLine drawer.
 * @param {anychart.core.series.Base} series
 * @constructor
 * @extends {anychart.core.drawers.Line}
 */
anychart.core.drawers.PolarLine = function(series) {
  anychart.core.drawers.PolarLine.base(this, 'constructor', series);
};
goog.inherits(anychart.core.drawers.PolarLine, anychart.core.drawers.Line);
anychart.core.drawers.AvailableDrawers[anychart.enums.SeriesDrawerTypes.POLAR_LINE] = anychart.core.drawers.PolarLine;


/** @inheritDoc */
anychart.core.drawers.PolarLine.prototype.type = anychart.enums.SeriesDrawerTypes.POLAR_LINE;


/** @inheritDoc */
anychart.core.drawers.PolarLine.prototype.startDrawing = function(shapeManager) {
  anychart.core.drawers.PolarLine.base(this, 'startDrawing', shapeManager);

  var series = (/** @type {anychart.core.series.Polar} */(this.series));
  /**
   * @type {number}
   * @private
   */
  this.cx = series.cx;
  /**
   * @type {number}
   * @private
   */
  this.cy = series.cy;
  /**
   * @type {number}
   * @private
   */
  this.radius = series.radius;
  /**
   * @type {number}
   * @private
   */
  this.zeroAngle = goog.math.toRadians(goog.math.modulo((/** @type {number} */(series.getOption('startAngle'))) - 90, 360));
  /**
   * @type {boolean}
   * @private
   */
  this.counterClockwise = this.series.planIsXScaleInverted();
};


/** @inheritDoc */
anychart.core.drawers.PolarLine.prototype.drawFirstPoint = function(point, state) {
  var shapes = this.shapesManager.getShapesGroup(this.seriesState);
  var x = /** @type {number} */(point.meta('x'));
  var y = /** @type {number} */(point.meta('value'));
  var xRatio = /** @type {number} */(point.meta('xRatio'));
  var yRatio = /** @type {number} */(point.meta('valueRatio'));
  (/** @type {acgraph.vector.Path} */(shapes['stroke'])).moveTo(x, y);
  if (isNaN(this.firstPointX)) {
    this.firstPointX = x;
    this.firstPointY = y;
    this.firstPointXRatio_ = xRatio;
    this.firstPointYRatio_ = yRatio;
  }
  this.lastX_ = x;
  this.lastY_ = y;
  this.lastXRatio_ = xRatio;
  this.lastYRatio_ = yRatio;
  this.suppressNextNewPath_ = true;
};


/** @inheritDoc */
anychart.core.drawers.PolarLine.prototype.drawSubsequentPoint = function(point, state) {
  var x = /** @type {number} */(point.meta('x'));
  var y = /** @type {number} */(point.meta('value'));
  var xRatio = /** @type {number} */(point.meta('xRatio'));
  var yRatio = /** @type {number} */(point.meta('valueRatio'));
  this.lineTo_(x, y, xRatio, yRatio);
};


/** @inheritDoc */
anychart.core.drawers.PolarLine.prototype.additionalFinalize = function() {
  if (this.closed && !isNaN(this.firstPointX) && (this.connectMissing || this.prevPointDrawn && !this.firstPointMissing)) {
    this.lineTo_(this.firstPointX, this.firstPointY, this.firstPointXRatio_, this.firstPointYRatio_);
  }
};


/**
 * Draws polar line to from last coords to passed position.
 * @param {number} x
 * @param {number} y
 * @param {number} xRatio
 * @param {number} yRatio
 * @private
 */
anychart.core.drawers.PolarLine.prototype.lineTo_ = function(x, y, xRatio, yRatio) {
  var shapes = this.shapesManager.getShapesGroup(this.seriesState);
  var path = /** @type {acgraph.vector.Path} */(shapes['stroke']);
  var params = anychart.math.getPolarLineParams(this.lastX_, this.lastY_, this.lastXRatio_, this.lastYRatio_,
      x, y, xRatio, yRatio, this.cx, this.cy, this.radius, this.zeroAngle, this.counterClockwise);
  if (this.suppressNextNewPath_ && params.length)
    params[0] = 0;
  this.suppressNextNewPath_ = false;
  var prevX = this.lastX_;
  var prevY = this.lastY_;
  for (var i = 0; i < params.length; i += 7) {
    if (params[i]) {
      shapes = this.shapesManager.addShapesGroup(this.seriesState);
      path = /** @type {acgraph.vector.Path} */(shapes['stroke']);
      path.moveTo(prevX, prevY);
    }
    path.curveTo(params[i + 1], params[i + 2], params[i + 3], params[i + 4], prevX = params[i + 5], prevY = params[i + 6]);
  }
  this.lastX_ = x;
  this.lastY_ = y;
  this.lastXRatio_ = xRatio;
  this.lastYRatio_ = yRatio;
};
