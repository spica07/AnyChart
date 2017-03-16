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
   * Scale for LEFT oriented Y axes. Uses first categories values to calculate weights.
   * @type {anychart.scales.Ordinal}
   * @private
   */
  this.leftCategoriesScale_ = null;

  /**
   * Scale for RIGHT oriented Y axes. Uses last categories values to calculate weights.
   * @type {anychart.scales.Ordinal}
   * @private
   */
  this.rightCategoriesScale_ = null;

  /**
   * @type {number}
   * @private
   */
  this.pointsPadding_ = 0;

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
 * Getter for leftCategoriesScale.
 * @return {!anychart.scales.Ordinal}
 */
anychart.charts.Mosaic.prototype.leftCategoriesScale = function() {
  if (!this.leftCategoriesScale_) {
    this.leftCategoriesScale_ = this.createScaleByType('ordinal', true, false);
    this.leftCategoriesScale_.listenSignals(this.categoriesScaleInvalidated, this);

    if (!this.rightCategoriesScale_) {
      this.yAxis().listenSignals(this.axisOrientationHandler_, this);
    }
  }
  return /** @type {!anychart.scales.Ordinal} */(this.leftCategoriesScale_);
};


/**
 * Getter for rightCategoriesScale.
 * @return {!anychart.scales.Ordinal}
 */
anychart.charts.Mosaic.prototype.rightCategoriesScale = function() {
  if (!this.rightCategoriesScale_) {
    this.rightCategoriesScale_ = this.createScaleByType('ordinal', true, false);
    this.rightCategoriesScale_.listenSignals(this.categoriesScaleInvalidated, this);

    if (!this.leftCategoriesScale_) {
      this.yAxis().listenSignals(this.axisOrientationHandler_, this);
    }
  }
  return /** @type {!anychart.scales.Ordinal} */(this.rightCategoriesScale_);
};


/**
 * Left and right categories scales invalidation handler.
 * @param {anychart.SignalEvent} event Event.
 * @protected
 */
anychart.charts.Mosaic.prototype.categoriesScaleInvalidated = function(event) {
  this.suspendSignalsDispatching();
  if (event.hasSignal(anychart.Signal.NEEDS_RECALCULATION)) {
    //console.log("categoriesScaleInvalidated()");
    this.calculateCategoriesScales();

    var state = anychart.ConsistencyState.SCALE_CHART_SCALES |
        anychart.ConsistencyState.SCALE_CHART_Y_SCALES |
        anychart.ConsistencyState.SCALE_CHART_SCALE_MAPS;
    this.invalidate(state, anychart.Signal.NEEDS_REDRAW);
  }
  this.resumeSignalsDispatching(true);
};


/**
 * Left and right categories scales invalidation handler.
 * @param {anychart.SignalEvent} event Event.
 * @private
 */
anychart.charts.Mosaic.prototype.axisOrientationHandler_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED)) {
    var orientation = this.yAxis().orientation();
    var axisScale = this.yAxis().scale();
    if (axisScale == this.leftCategoriesScale() || axisScale == this.rightCategoriesScale()) {
      if (orientation == 'left' && axisScale != this.leftCategoriesScale()) {
        this.yAxis().scale(this.leftCategoriesScale());
        this.calculateCategoriesScales();

      } else if (orientation == 'right' && axisScale != this.rightCategoriesScale()) {
        this.yAxis().scale(this.rightCategoriesScale());
        this.calculateCategoriesScales();
      }
    }
  }
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
//region --- Calculations
//----------------------------------------------------------------------------------------------------------------------
//
//  Calculations
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.charts.Mosaic.prototype.calculate = function() {

  var state = anychart.ConsistencyState.SCALE_CHART_SCALES |
      anychart.ConsistencyState.SCALE_CHART_SCALE_MAPS |
      anychart.ConsistencyState.SCALE_CHART_Y_SCALES;

  if (this.hasInvalidationState(state)) {
    anychart.charts.Mosaic.base(this, 'calculate');

    var i;
    var j;
    var seriesData;
    var weights = [];
    for (i = 0; i < this.drawingPlans_.length; i++) {
      seriesData = this.drawingPlans_[i].data;
      for (j = 0; j < seriesData.length; j++) {
        var value = seriesData[j].data['value'];
        if (weights[j] == undefined) {
          weights.push(value);
        } else {
          weights[j] += value;
        }
      }
    }

    this.xScale().weights(weights);
    this.calculateCategoriesScales();
  }
};


/**
 * Left and right categories scales values and weights calculation.
 */
anychart.charts.Mosaic.prototype.calculateCategoriesScales = function() {
  if (this.drawingPlans_.length) {
    var currentScale = this.yAxis().scale();
    var categoriesScaleName;
    if (currentScale == this.leftCategoriesScale())
      categoriesScaleName = 'l';
    else if (currentScale == this.rightCategoriesScale())
      categoriesScaleName = 'r';

    if (categoriesScaleName) {
      var categoryIndex = categoriesScaleName == 'l' ? 0 : this.drawingPlans_[0].data.length - 1;
      var values = [];
      var weights = [];
      for (var i = 0; i < this.drawingPlans_.length; i++) {
        values.push(this.drawingPlans_[i].series.name());
        weights.push(this.drawingPlans_[i].data[categoryIndex].data['value']);
      }
      currentScale.values(values).weights(weights);
    }
  }
};


//endregion
//region --- Series
//----------------------------------------------------------------------------------------------------------------------
//
//  Series
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Getter/setter for points padding.
 * @param {number=} opt_value
 * @return {(number|!anychart.charts.Mosaic)}
 */
anychart.charts.Mosaic.prototype.pointsPadding = function(opt_value) {
  if (goog.isDef(opt_value) && this.pointsPadding_ != opt_value) {
    opt_value = anychart.utils.toNumber(opt_value);
    this.pointsPadding_ = isNaN(opt_value) ? 0 : (opt_value >= 0 ? opt_value : -opt_value);

    // todo: what ConsistencyState to use?
    this.invalidate(anychart.ConsistencyState.ALL, anychart.Signal.NEEDS_REDRAW);

    return this;
  }
  return this.pointsPadding_;
};


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
  proto['leftCategoriesScale'] = proto.leftCategoriesScale;
  proto['rightCategoriesScale'] = proto.rightCategoriesScale;
  proto['pointsPadding'] = proto.pointsPadding;
})();
