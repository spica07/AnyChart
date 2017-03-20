/**
 * @fileoverview anychart.modules.mosaic namespace file.
 * @suppress {extraRequire}
 */

goog.provide('anychart.modules.mosaic');

goog.require('anychart.charts.Mosaic');
goog.require('anychart.modules.base');


/**
 * Returns a marimekko chart instance with initial settings.
 * For yAxis uses default linear yScale. Points padding is set to 0.
 *
 * @param {...(anychart.data.View|anychart.data.Set|Array)} var_args Marker chart data.
 * @return {anychart.charts.Mosaic} Chart instance.
 */
anychart.marimekko = function(var_args) {
  var chart = new anychart.charts.Mosaic(false);

  chart.defaultSeriesType(anychart.enums.MosaicSeriesType.MOSAIC);
  chart.setType(anychart.enums.ChartTypes.MARIMEKKO);

  chart.setupByVal(anychart.getFullTheme('marimekko'), true);

  for (var i = 0, count = arguments.length; i < count; i++) {
    chart['mosaic'](arguments[i]);
  }
  return chart;
};


/**
 * Returns a mosaic chart instance with initial settings.
 * For yAxis uses categories ordinal scale and sets points padding default value.
 *
 * @param {...(anychart.data.View|anychart.data.Set|Array)} var_args Marker chart data.
 * @return {anychart.charts.Mosaic} Chart instance.
 */
anychart.mosaic = function(var_args) {
  var chart = new anychart.charts.Mosaic(true);

  chart.defaultSeriesType(anychart.enums.MosaicSeriesType.MOSAIC);
  chart.setType(anychart.enums.ChartTypes.MOSAIC);

  chart.setupByVal(anychart.getFullTheme('mosaic'), true);

  for (var i = 0, count = arguments.length; i < count; i++) {
    chart['mosaic'](arguments[i]);
  }
  return chart;
};


/**
 * Returns a barmekko chart instance with initial settings.
 * Same as marimekko chart, but with yScale stack mode set to 'value'.
 *
 * @param {...(anychart.data.View|anychart.data.Set|Array)} var_args Marker chart data.
 * @return {anychart.charts.Mosaic} Chart instance.
 */
anychart.barmekko = function(var_args) {
  var chart = new anychart.charts.Mosaic(false);

  chart.defaultSeriesType(anychart.enums.MosaicSeriesType.MOSAIC);
  chart.setType(anychart.enums.ChartTypes.BARMEKKO);

  chart.setupByVal(anychart.getFullTheme('barmekko'), true);

  for (var i = 0, count = arguments.length; i < count; i++) {
    chart['mosaic'](arguments[i]);
  }
  return chart;
};


anychart.chartTypesMap[anychart.enums.ChartTypes.MARIMEKKO] = anychart.marimekko;
anychart.chartTypesMap[anychart.enums.ChartTypes.MOSAIC] = anychart.mosaic;
anychart.chartTypesMap[anychart.enums.ChartTypes.BARMEKKO] = anychart.barmekko;


//exports
goog.exportSymbol('anychart.marimekko', anychart.marimekko);
goog.exportSymbol('anychart.mosaic', anychart.mosaic);
goog.exportSymbol('anychart.barmekko', anychart.barmekko);
