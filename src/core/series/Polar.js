goog.provide('anychart.core.series.Polar');
goog.require('anychart.core.series.Radar');



/**
 * Class that represents a polar series for the user.
 * @param {!anychart.core.IChart} chart
 * @param {!anychart.core.IPlot} plot
 * @param {string} type
 * @param {anychart.core.series.TypeConfig} config
 * @param {boolean} sortedMode
 * @constructor
 * @extends {anychart.core.series.Radar}
 */
anychart.core.series.Polar = function(chart, plot, type, config, sortedMode) {
  anychart.core.series.Polar.base(this, 'constructor', chart, plot, type, config, sortedMode);
};
goog.inherits(anychart.core.series.Polar, anychart.core.series.Radar);


/**
 * Properties that should be defined in series.Polar prototype.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.core.series.Polar.PROPERTY_DESCRIPTORS = (function() {
  /** @type {!Object.<string, anychart.core.settings.PropertyDescriptor>} */
  var map = {};
  map['closed'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'closed',
      anychart.core.settings.booleanNormalizer,
      anychart.ConsistencyState.SERIES_POINTS,
      anychart.Signal.NEEDS_REDRAW,
      anychart.core.series.Capabilities.ANY);
  return map;
})();
anychart.core.settings.populate(anychart.core.series.Polar, anychart.core.series.Polar.PROPERTY_DESCRIPTORS);


/** @inheritDoc */
anychart.core.series.Polar.prototype.serialize = function() {
  var json = anychart.core.series.Polar.base(this, 'serialize');
  anychart.core.settings.serialize(this, anychart.core.series.Polar.PROPERTY_DESCRIPTORS, json);
  return json;
};


/** @inheritDoc */
anychart.core.series.Polar.prototype.setupByJSON = function(config, opt_default) {
  anychart.core.settings.deserialize(this, anychart.core.series.Polar.PROPERTY_DESCRIPTORS, config);
  anychart.core.series.Polar.base(this, 'setupByJSON', config, opt_default);
};


//exports
// from descriptors:
//proto['closed'] = proto.closed;
