/**
 * @fileoverview anychart.modules.mosaic namespace file.
 * @suppress {extraRequire}
 */

goog.provide('anychart.modules.mosaic');

goog.require('anychart.charts.Mosaic');
goog.require('anychart.modules.base');


/**
 * Returns a mosaic chart instance with initial settings (axes, grids, title).<br/>
 * @param {...(anychart.data.View|anychart.data.Set|Array)} var_args Marker chart data.
 * @return {anychart.charts.Mosaic} Chart with defaults for scatter series.
 */
anychart.mosaic = function(var_args) {
  var chart = new anychart.charts.Mosaic(true);
  chart.setupByVal(anychart.getFullTheme('mosaic'), true);

  for (var i = 0, count = arguments.length; i < count; i++) {
    chart['column'](arguments[i]);
  }

  return chart;
};


/**
 * Returns a marimekko chart instance with initial settings (axes, grids, title).<br/>
 * @param {...(anychart.data.View|anychart.data.Set|Array)} var_args Marker chart data.
 * @return {anychart.charts.Mosaic} Chart with defaults for scatter series.
 */
anychart.marimekko = function(var_args) {
  var chart = new anychart.charts.Mosaic(false);
  chart.setupByVal(anychart.getFullTheme('marimekko'), true);

  for (var i = 0, count = arguments.length; i < count; i++) {
    chart['column'](arguments[i]);
  }
  return chart;
};


/**
 * Returns a barmekko chart instance with initial settings (axes, grids, title).<br/>
 * @param {...(anychart.data.View|anychart.data.Set|Array)} var_args Marker chart data.
 * @return {anychart.charts.Mosaic} Chart with defaults for scatter series.
 */
anychart.barmekko = function(var_args) {
  var chart = new anychart.charts.Mosaic(false);
  chart.setupByVal(anychart.getFullTheme('barmekko'), true);

  for (var i = 0, count = arguments.length; i < count; i++) {
    chart['column'](arguments[i]);
  }

  chart.yScale().stackMode('value');
  return chart;
};


anychart.chartTypesMap[anychart.enums.ChartTypes.MOSAIC] = anychart.mosaic;

//exports
goog.exportSymbol('anychart.mosaic', anychart.mosaic);
