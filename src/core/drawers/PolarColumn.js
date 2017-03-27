// goog.provide('anychart.core.drawers.PolarColumn');
// goog.require('anychart.core.drawers');
// goog.require('anychart.core.drawers.Base');
// goog.require('anychart.enums');
//
//
//
// /**
//  * PolarColumn drawer.
//  * @param {anychart.core.series.Base} series
//  * @constructor
//  * @extends {anychart.core.drawers.Base}
//  */
// anychart.core.drawers.PolarColumn = function(series) {
//   anychart.core.drawers.PolarColumn.base(this, 'constructor', series);
// };
// goog.inherits(anychart.core.drawers.PolarColumn, anychart.core.drawers.Base);
// anychart.core.drawers.AvailableDrawers[anychart.enums.SeriesDrawerTypes.POLAR_COLUMN] = anychart.core.drawers.PolarColumn;
//
//
// /** @inheritDoc */
// anychart.core.drawers.PolarColumn.prototype.type = anychart.enums.SeriesDrawerTypes.POLAR_COLUMN;
//
//
// /** @inheritDoc */
// anychart.core.drawers.PolarColumn.prototype.flags = (
//     anychart.core.drawers.Capabilities.NEEDS_ZERO |
//     // anychart.core.drawers.Capabilities.NEEDS_SIZE_SCALE |
//     // anychart.core.drawers.Capabilities.USES_CONTAINER_AS_ROOT |
//     // anychart.core.drawers.Capabilities.USES_STROKE_AS_FILL |
//     // anychart.core.drawers.Capabilities.SUPPORTS_CONNECTING_MISSING |
//     anychart.core.drawers.Capabilities.SUPPORTS_STACK |
//     anychart.core.drawers.Capabilities.SUPPORTS_COMPARISON |
//     anychart.core.drawers.Capabilities.SUPPORTS_ERROR |
//     // anychart.core.drawers.Capabilities.SUPPORTS_OUTLIERS |
//     anychart.core.drawers.Capabilities.IS_DISCRETE_BASED |
//     anychart.core.drawers.Capabilities.IS_WIDTH_BASED |
//     // anychart.core.drawers.Capabilities.IS_3D_BASED |
//     // anychart.core.drawers.Capabilities.IS_VERTICAL |
//     // anychart.core.drawers.Capabilities.IS_MARKER_BASED |
//     // anychart.core.drawers.Capabilities.IS_OHLC_BASED |
//     // anychart.core.drawers.Capabilities.IS_LINE_BASED |
//     // anychart.core.drawers.Capabilities.IS_RANGE_BASED |
//     // anychart.core.drawers.Capabilities.SUPPORTS_STEP_DIRECTION |
//     anychart.core.drawers.Capabilities.SUPPORTS_DISTRIBUTION |
//     0);
//
//
// /** @inheritDoc */
// anychart.core.drawers.PolarColumn.prototype.requiredShapes = (function() {
//   var res = {};
//   res['path'] = anychart.enums.ShapeType.PATH;
//   res['hatchFill'] = anychart.enums.ShapeType.PATH;
//   return res;
// })();
//
//
// /** @inheritDoc */
// anychart.core.drawers.PolarLine.prototype.startDrawing = function(shapeManager) {
//   anychart.core.drawers.PolarLine.base(this, 'startDrawing', shapeManager);
//
//   var series = (/** @type {anychart.core.series.Polar} */(this.series));
//   /**
//    * @type {number}
//    * @protected
//    */
//   this.cx = series.cx;
//   /**
//    * @type {number}
//    * @protected
//    */
//   this.cy = series.cy;
//   /**
//    * @type {number}
//    * @protected
//    */
//   this.radius = series.radius;
//   /**
//    * @type {number}
//    * @protected
//    */
//   this.zeroAngle = goog.math.toRadians(goog.math.modulo((/** @type {number} */(series.getOption('startAngle'))) - 90, 360));
// };
//
//
// /** @inheritDoc */
// anychart.core.drawers.PolarColumn.prototype.drawSubsequentPoint = function(point, state) {
//   var shapes = /** @type {Object.<acgraph.vector.Path>} */(this.shapesManager.getShapesGroup(state));
//   this.drawPoint_(point, shapes);
// };
//
//
// /** @inheritDoc */
// anychart.core.drawers.PolarColumn.prototype.updatePointOnAnimate = function(point) {
//   // this code can currently work with Bar series created with PerPoint shape managers.
//   var shapes = /** @type {Object.<acgraph.vector.Path>} */(point.meta('shapes'));
//   for (var i in shapes)
//     shapes[i].clear();
//   this.drawPoint_(point, shapes);
// };
//
//
// /**
//  * Actually draws the point.
//  * @param {anychart.data.IRowInfo} point
//  * @param {Object.<acgraph.vector.Shape>} shapes
//  * @private
//  */
// anychart.core.drawers.PolarColumn.prototype.drawPoint_ = function(point, shapes) {
//   var x = /** @type {number} */(point.meta('x'));
//   var zero = /** @type {number} */(point.meta('zero'));
//   var y = /** @type {number} */(point.meta('value'));
//   var xRatio = /** @type {number} */(point.meta('xRatio'));
//   var yRatio = /** @type {number} */(point.meta('valueRatio'));
//
//   var leftX = x - this.pointWidth / 2;
//   var rightX = leftX + this.pointWidth;
//
//   var thickness = acgraph.vector.getThickness(/** @type {acgraph.vector.Stroke} */(shapes['path'].stroke()));
//   if (this.crispEdges) {
//     leftX = anychart.utils.applyPixelShift(leftX, thickness);
//     rightX = anychart.utils.applyPixelShift(rightX, thickness);
//   }
//   y = anychart.utils.applyPixelShift(y, thickness);
//   zero = anychart.utils.applyPixelShift(zero, thickness);
//
//   var path = /** @type {acgraph.vector.Path} */(shapes['path']);
//   anychart.core.drawers.move(path, this.isVertical, leftX, y);
//   anychart.core.drawers.line(path, this.isVertical, rightX, y, rightX, zero, leftX, zero);
//   path.close();
//   path = /** @type {acgraph.vector.Path} */(shapes['hatchFill']);
//   anychart.core.drawers.move(path, this.isVertical, leftX, y);
//   anychart.core.drawers.line(path, this.isVertical, rightX, y, rightX, zero, leftX, zero);
//   path.close();
// };
