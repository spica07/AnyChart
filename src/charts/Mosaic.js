goog.provide('anychart.charts.Mosaic');
goog.require('anychart.core.series');
goog.require('anychart.core.shapeManagers');
goog.require('anychart.enums');



/**
 * Mosaic chart class.<br/>
 * To get the chart use any of these methods:
 *  <ul>
 *      <li>{@link anychart.mosaic}</li>
 *      <li>{@link anychart.marimekko}</li>
 *      <li>{@link anychart.barmekko}</li>
 *  </ul>
 * Chart can contain any number of series.
 * Each series is interactive, you can customize click and hover behavior and other params.
 * @extends {anychart.core.ChartWithAxes}
 * @constructor
 */
anychart.charts.Mosaic = function() {
  anychart.charts.Mosaic.base(this, 'constructor', true);

  /**
   * Scale for x scale weights calculation
   * @type {anychart.scales.Base}
   * @private
   */
  this.xWeightsScale_ = null;

  // Should be defined for proper xPointPosition calculation
  this.barsPadding_ = 0;
  this.barGroupsPadding_ = 0;

  this.defaultSeriesType(anychart.enums.MosaicSeriesType.MOSAIC);
};
goog.inherits(anychart.charts.Mosaic, anychart.core.ChartWithAxes);


//region --- Infrastucture
//----------------------------------------------------------------------------------------------------------------------
//
//  Infrastucture
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.charts.Mosaic.prototype.getType = function() {
  return anychart.enums.ChartTypes.MOSAIC;
};


/**
 * Series config for Mosaic chart.
 * @type {!Object.<string, anychart.core.series.TypeConfig>}
 */
anychart.charts.Mosaic.prototype.seriesConfig = (function() {
  var res = {};
  var capabilities = (
  anychart.core.series.Capabilities.ALLOW_INTERACTIVITY |
  anychart.core.series.Capabilities.ALLOW_POINT_SETTINGS |
  anychart.core.series.Capabilities.ALLOW_ERROR |
  anychart.core.series.Capabilities.SUPPORTS_MARKERS |
  anychart.core.series.Capabilities.SUPPORTS_LABELS |
  0);
  res[anychart.enums.MosaicSeriesType.MOSAIC] = {
    drawerType: anychart.enums.SeriesDrawerTypes.COLUMN,
    shapeManagerType: anychart.enums.ShapeManagerTypes.PER_POINT,
    shapesConfig: [
      anychart.core.shapeManagers.pathFillStrokeConfig,
      anychart.core.shapeManagers.pathHatchConfig
    ],
    secondaryShapesConfig: null,
    postProcessor: null,
    capabilities: capabilities,
    anchoredPositionTop: 'value',
    anchoredPositionBottom: 'zero'
  };
  return res;
})();
anychart.core.ChartWithSeries.generateSeriesConstructors(anychart.charts.Mosaic, anychart.charts.Mosaic.prototype.seriesConfig);


//endregion
//region --- Scales
//----------------------------------------------------------------------------------------------------------------------
//
//  Scales
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Getter for xScale.
 * @param {(anychart.enums.ScaleTypes|anychart.scales.Base)=} opt_value X Scale to set.
 * @return {!(anychart.scales.Base|anychart.core.ChartWithSeries)} Default chart scale value or itself for method chaining.
 */
anychart.core.Mosaic.prototype.xWeightsScale = function() {
  if (!this.xWeightsScale_) {
    this.xWeightsScale_ = this.createScaleByType('linear', true, false);
    this.xWeightsScale_.listenSignals(this.xWeightsScaleInvalidated, this);
  }
  return /** @type {!anychart.scales.Base} */(this.xWeightsScale_);
};


/**
 * xWeightsScale invalidation handler.
 * @param {anychart.SignalEvent} event Event.
 * @protected
 */
anychart.core.ChartWithSeries.prototype.xWeightsScaleInvalidated = function(event) {
  this.suspendSignalsDispatching();
  if (event.hasSignal(anychart.Signal.NEEDS_RECALCULATION)) {
    var state = anychart.ConsistencyState.SERIES_CHART_SCALES |
        anychart.ConsistencyState.SERIES_CHART_Y_SCALES |
        anychart.ConsistencyState.SERIES_CHART_SCALE_MAPS;
    // if (this.allowLegendCategoriesMode() &&
    //     this.legend().itemsSourceMode() == anychart.enums.LegendItemsSourceMode.CATEGORIES) {
    //   state |= anychart.ConsistencyState.CHART_LEGEND;
    // }
    this.invalidate(state, anychart.Signal.NEEDS_REDRAW);
  }
  if (event.hasSignal(anychart.Signal.NEEDS_REAPPLICATION)) {
    this.invalidateSeriesOfScale(this.xScale_);
  }
  this.resumeSignalsDispatching(true);
};


/** @inheritDoc */
anychart.charts.Mosaic.prototype.allowLegendCategoriesMode = function() {
  return false;
};


/** @inheritDoc */
anychart.charts.Mosaic.prototype.checkXScaleType = function(scale) {
  // var res = (scale instanceof anychart.scales.ScatterBase);
  // if (!res)
  //   anychart.core.reporting.error(anychart.enums.ErrorCode.INCORRECT_SCALE_TYPE, undefined, ['Scatter chart scales', 'scatter', 'linear, log']);
  // return res;
  return true;
};


/** @inheritDoc */
anychart.charts.Mosaic.prototype.checkYScaleType = function(scale) {
  // var res = (scale instanceof anychart.scales.ScatterBase);
  // if (!res)
  //   anychart.core.reporting.error(anychart.enums.ErrorCode.INCORRECT_SCALE_TYPE, undefined, ['Scatter chart scales', 'scatter', 'linear, log']);
  // return res;
  return true;
};


//endregion
//region --- Series
//----------------------------------------------------------------------------------------------------------------------
//
//  Series
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.charts.Mosaic.prototype.createSeriesInstance = function(type, config) {
  return new anychart.core.series.Cartesian(this, this, type, config, false);
};


/** @inheritDoc */
anychart.charts.Mosaic.prototype.normalizeSeriesType = function(type) {
  return anychart.enums.normalizeMosaicSeriesType(type);
};


//endregion
//region --- Serialization / Deserialization / Disposing
//----------------------------------------------------------------------------------------------------------------------
//
//  Serialization / Deserialization / Disposing
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * @inheritDoc
 */
anychart.charts.Mosaic.prototype.serialize = function() {
  var json = anychart.charts.Mosaic.base(this, 'serialize');
  json['type'] = anychart.enums.ChartTypes.MOSAIC;
  return {'chart': json};
};


//endregion


//exports
(function() {
  var proto = anychart.charts.Mosaic.prototype;
  proto['crosshair'] = proto.crosshair;
  proto['xScale'] = proto.xScale;//doc|ex
  proto['yScale'] = proto.yScale;//doc|ex
  proto['grid'] = proto.grid;//doc|ex
  proto['minorGrid'] = proto.minorGrid;//doc|ex
  proto['xAxis'] = proto.xAxis;//doc|ex
  proto['yAxis'] = proto.yAxis;//doc|ex
  proto['getSeries'] = proto.getSeries;//doc|ex
  // autoexport
  // proto['bubble'] = proto.bubble;//doc|ex
  // proto['line'] = proto.line;//doc|ex
  // proto['marker'] = proto.marker;//doc|ex
  proto['lineMarker'] = proto.lineMarker;//doc|ex
  proto['rangeMarker'] = proto.rangeMarker;//doc|ex
  proto['textMarker'] = proto.textMarker;//doc|ex
  proto['palette'] = proto.palette;//doc|ex
  proto['markerPalette'] = proto.markerPalette;
  proto['hatchFillPalette'] = proto.hatchFillPalette;
  proto['getType'] = proto.getType;
  proto['maxBubbleSize'] = proto.maxBubbleSize;
  proto['minBubbleSize'] = proto.minBubbleSize;
  proto['defaultSeriesType'] = proto.defaultSeriesType;
  proto['addSeries'] = proto.addSeries;
  proto['getSeriesAt'] = proto.getSeriesAt;
  proto['getSeriesCount'] = proto.getSeriesCount;
  proto['removeSeries'] = proto.removeSeries;
  proto['removeSeriesAt'] = proto.removeSeriesAt;
  proto['removeAllSeries'] = proto.removeAllSeries;
  proto['getPlotBounds'] = proto.getPlotBounds;
  proto['annotations'] = proto.annotations;
})();
