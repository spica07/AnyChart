goog.provide('anychart.core.drawers.Column');
goog.require('anychart.core.drawers');
goog.require('anychart.core.drawers.Base');
goog.require('anychart.enums');


/**
 * Column drawer.
 * @param {anychart.core.series.Base} series
 * @constructor
 * @extends {anychart.core.drawers.Base}
 */
anychart.core.drawers.Column = function(series) {
  anychart.core.drawers.Column.base(this, 'constructor', series);
};
goog.inherits(anychart.core.drawers.Column, anychart.core.drawers.Base);
anychart.core.drawers.AvailableDrawers[anychart.enums.SeriesDrawerTypes.COLUMN] = anychart.core.drawers.Column;


/** @inheritDoc */
anychart.core.drawers.Column.prototype.type = anychart.enums.SeriesDrawerTypes.COLUMN;


/** @inheritDoc */
anychart.core.drawers.Column.prototype.flags = (
    anychart.core.drawers.Capabilities.NEEDS_ZERO |
    // anychart.core.drawers.Capabilities.NEEDS_SIZE_SCALE |
    // anychart.core.drawers.Capabilities.USES_CONTAINER_AS_ROOT |
    // anychart.core.drawers.Capabilities.USES_STROKE_AS_FILL |
    // anychart.core.drawers.Capabilities.SUPPORTS_CONNECTING_MISSING |
    anychart.core.drawers.Capabilities.SUPPORTS_STACK |
    anychart.core.drawers.Capabilities.SUPPORTS_COMPARISON |
    anychart.core.drawers.Capabilities.SUPPORTS_ERROR |
    // anychart.core.drawers.Capabilities.SUPPORTS_OUTLIERS |
    anychart.core.drawers.Capabilities.IS_DISCRETE_BASED |
    anychart.core.drawers.Capabilities.IS_WIDTH_BASED |
    // anychart.core.drawers.Capabilities.IS_3D_BASED |
    // anychart.core.drawers.Capabilities.IS_VERTICAL |
    // anychart.core.drawers.Capabilities.IS_MARKER_BASED |
    // anychart.core.drawers.Capabilities.IS_OHLC_BASED |
    // anychart.core.drawers.Capabilities.IS_LINE_BASED |
    // anychart.core.drawers.Capabilities.IS_RANGE_BASED |
    // anychart.core.drawers.Capabilities.SUPPORTS_STEP_DIRECTION |
    anychart.core.drawers.Capabilities.SUPPORTS_DISTRIBUTION |
    0);


/** @inheritDoc */
anychart.core.drawers.Column.prototype.requiredShapes = (function() {
  var res = {};
  res['path'] = anychart.enums.ShapeType.PATH;
  res['hatchFill'] = anychart.enums.ShapeType.PATH;
  return res;
})();


/** @inheritDoc */
anychart.core.drawers.Column.prototype.drawSubsequentPoint = function(point, state) {
  var shapes = /** @type {Object.<acgraph.vector.Path>} */(this.shapesManager.getShapesGroup(state));
  this.drawPoint_(point, shapes);
};


/** @inheritDoc */
anychart.core.drawers.Column.prototype.updatePointOnAnimate = function(point) {
  // this code can currently work with Bar series created with PerPoint shape managers.
  var shapes = /** @type {Object.<acgraph.vector.Path>} */(point.meta('shapes'));
  for (var i in shapes)
    shapes[i].clear();
  this.drawPoint_(point, shapes);
};


/**
 * Actually draws the point.
 * @param {anychart.data.IRowInfo} point
 * @param {Object.<acgraph.vector.Shape>} shapes
 * @private
 */
anychart.core.drawers.Column.prototype.drawPoint_ = function(point, shapes) {
  if (point.get('value') == 0) return;

  var x = /** @type {number} */(point.meta('x'));
  var zero = /** @type {number} */(point.meta('zero'));
  var y = /** @type {number} */(point.meta('value'));

  var pointsPadding = this.series.chart.pointsPadding && this.series.chart.pointsPadding() || 0;
  this.pointWidth -= pointsPadding * 2;
  var leftX = (x - this.pointWidth / 2);
  var rightX = leftX + this.pointWidth;

  var thickness = acgraph.vector.getThickness(/** @type {acgraph.vector.Stroke} */(shapes['path'].stroke()));

  if (this.crispEdges /*|| this.fullWidth*/) {
    leftX = anychart.utils.applyPixelShift(leftX, thickness);
    rightX = anychart.utils.applyPixelShift(rightX, thickness);
  }

  // if (this.fullWidth) {
  //   var halfThickness = thickness / 2;
  //   console.log(leftX, rightX, thickness, halfThickness);
  //
  //   leftX += halfThickness;
  //   rightX -= halfThickness;
  //   // zero -= this.isVertical ? -thicknessOffset : thicknessOffset;
  //   // y += this.isVertical ? -thicknessOffset : thicknessOffset;
  // }

  y = anychart.utils.applyPixelShift(y, thickness);
  zero = anychart.utils.applyPixelShift(zero, thickness);

  if (pointsPadding) {
    // Adjust vertical padding depend on available space
    var height = Math.abs(zero - y);
    var vPadding = (height > pointsPadding * 2) ? pointsPadding : (height / 2 - 1);
    zero -= vPadding;
    y += vPadding;
  }

  var path = /** @type {acgraph.vector.Path} */(shapes['path']);
  anychart.core.drawers.move(path, this.isVertical, leftX, y);
  anychart.core.drawers.line(path, this.isVertical, rightX, y, rightX, zero, leftX, zero);
  path.close();
  path = /** @type {acgraph.vector.Path} */(shapes['hatchFill']);
  anychart.core.drawers.move(path, this.isVertical, leftX, y);
  anychart.core.drawers.line(path, this.isVertical, rightX, y, rightX, zero, leftX, zero);
  path.close();
};
