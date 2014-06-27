goog.provide('anychartexport');
goog.require('anychart');


//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.Chart
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.Chart', anychart.cartesian.Chart);//in docs/
anychart.cartesian.Chart.prototype['xScale'] = anychart.cartesian.Chart.prototype.xScale;//in docs/
anychart.cartesian.Chart.prototype['yScale'] = anychart.cartesian.Chart.prototype.yScale;//in docs/
anychart.cartesian.Chart.prototype['barsPadding'] = anychart.cartesian.Chart.prototype.barsPadding;//in docs/
anychart.cartesian.Chart.prototype['barGroupsPadding'] = anychart.cartesian.Chart.prototype.barGroupsPadding;//in docs/
anychart.cartesian.Chart.prototype['grid'] = anychart.cartesian.Chart.prototype.grid;//in docs/
anychart.cartesian.Chart.prototype['minorGrid'] = anychart.cartesian.Chart.prototype.minorGrid;//in docs/
anychart.cartesian.Chart.prototype['xAxis'] = anychart.cartesian.Chart.prototype.xAxis;//in docs/
anychart.cartesian.Chart.prototype['yAxis'] = anychart.cartesian.Chart.prototype.yAxis;//in docs/
anychart.cartesian.Chart.prototype['getSeries'] = anychart.cartesian.Chart.prototype.getSeries;
anychart.cartesian.Chart.prototype['area'] = anychart.cartesian.Chart.prototype.area;//in docs/
anychart.cartesian.Chart.prototype['bar'] = anychart.cartesian.Chart.prototype.bar;//in docs/
anychart.cartesian.Chart.prototype['bubble'] = anychart.cartesian.Chart.prototype.bubble;//in docs/
anychart.cartesian.Chart.prototype['candlestick'] = anychart.cartesian.Chart.prototype.candlestick;//in docs/
anychart.cartesian.Chart.prototype['column'] = anychart.cartesian.Chart.prototype.column;//in docs/
anychart.cartesian.Chart.prototype['line'] = anychart.cartesian.Chart.prototype.line;//in docs/
anychart.cartesian.Chart.prototype['marker'] = anychart.cartesian.Chart.prototype.marker;//in docs/
anychart.cartesian.Chart.prototype['ohlc'] = anychart.cartesian.Chart.prototype.ohlc;//in docs/
anychart.cartesian.Chart.prototype['rangeArea'] = anychart.cartesian.Chart.prototype.rangeArea;//in docs/
anychart.cartesian.Chart.prototype['rangeBar'] = anychart.cartesian.Chart.prototype.rangeBar;//in docs/
anychart.cartesian.Chart.prototype['rangeColumn'] = anychart.cartesian.Chart.prototype.rangeColumn;//in docs/
anychart.cartesian.Chart.prototype['rangeSplineArea'] = anychart.cartesian.Chart.prototype.rangeSplineArea;//in docs/
anychart.cartesian.Chart.prototype['rangeStepArea'] = anychart.cartesian.Chart.prototype.rangeStepArea;//in docs/
anychart.cartesian.Chart.prototype['spline'] = anychart.cartesian.Chart.prototype.spline;//in docs/
anychart.cartesian.Chart.prototype['splineArea'] = anychart.cartesian.Chart.prototype.splineArea;//in docs/
anychart.cartesian.Chart.prototype['stepLine'] = anychart.cartesian.Chart.prototype.stepLine;//in docs/
anychart.cartesian.Chart.prototype['stepArea'] = anychart.cartesian.Chart.prototype.stepArea;//in docs/
anychart.cartesian.Chart.prototype['lineMarker'] = anychart.cartesian.Chart.prototype.lineMarker;//in docs/
anychart.cartesian.Chart.prototype['rangeMarker'] = anychart.cartesian.Chart.prototype.rangeMarker;//in docs/
anychart.cartesian.Chart.prototype['textMarker'] = anychart.cartesian.Chart.prototype.textMarker;//in docs/
anychart.cartesian.Chart.prototype['palette'] = anychart.cartesian.Chart.prototype.palette;
//anychart.cartesian.Chart.prototype['tooltip'] = anychart.cartesian.Chart.prototype.tooltip;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Area
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Area', anychart.cartesian.series.Area);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.AreaBase
//
//----------------------------------------------------------------------------------------------------------------------
anychart.cartesian.series.AreaBase.prototype['startDrawing'] = anychart.cartesian.series.AreaBase.prototype.startDrawing;
anychart.cartesian.series.AreaBase.prototype['fill'] = anychart.cartesian.series.AreaBase.prototype.fill;
anychart.cartesian.series.AreaBase.prototype['hoverFill'] = anychart.cartesian.series.AreaBase.prototype.hoverFill;
anychart.cartesian.series.AreaBase.prototype['stroke'] = anychart.cartesian.series.AreaBase.prototype.stroke;
anychart.cartesian.series.AreaBase.prototype['hoverStroke'] = anychart.cartesian.series.AreaBase.prototype.hoverStroke;
anychart.cartesian.series.AreaBase.prototype['hatchFill'] = anychart.cartesian.series.AreaBase.prototype.hatchFill;
anychart.cartesian.series.AreaBase.prototype['hoverHatchFill'] = anychart.cartesian.series.AreaBase.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Bar
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Bar', anychart.cartesian.series.Bar);
anychart.cartesian.series.Bar.prototype['fill'] = anychart.cartesian.series.Base.prototype.fill;
anychart.cartesian.series.Bar.prototype['hoverFill'] = anychart.cartesian.series.Base.prototype.hoverFill;
anychart.cartesian.series.Bar.prototype['stroke'] = anychart.cartesian.series.Base.prototype.stroke;
anychart.cartesian.series.Bar.prototype['hoverStroke'] = anychart.cartesian.series.Base.prototype.hoverStroke;
anychart.cartesian.series.Bar.prototype['hatchFill'] = anychart.cartesian.series.Bar.prototype.hatchFill;
anychart.cartesian.series.Bar.prototype['hoverHatchFill'] = anychart.cartesian.series.Bar.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Base
//
//----------------------------------------------------------------------------------------------------------------------
anychart.cartesian.series.Base.prototype['name'] = anychart.cartesian.series.Base.prototype.name;//in docs/
anychart.cartesian.series.Base.prototype['meta'] = anychart.cartesian.series.Base.prototype.meta;
anychart.cartesian.series.Base.prototype['data'] = anychart.cartesian.series.Base.prototype.data;//in docs/
anychart.cartesian.series.Base.prototype['draw'] = anychart.cartesian.series.Base.prototype.draw;//in docs/
anychart.cartesian.series.Base.prototype['drawPoint'] = anychart.cartesian.series.Base.prototype.drawPoint;//in docs/
anychart.cartesian.series.Base.prototype['drawMissing'] = anychart.cartesian.series.Base.prototype.drawMissing;//in docs/
anychart.cartesian.series.Base.prototype['startDrawing'] = anychart.cartesian.series.Base.prototype.startDrawing;//in docs/
anychart.cartesian.series.Base.prototype['finalizeDrawing'] = anychart.cartesian.series.Base.prototype.finalizeDrawing;//in docs/
anychart.cartesian.series.Base.prototype['labels'] = anychart.cartesian.series.Base.prototype.labels;
anychart.cartesian.series.Base.prototype['tooltip'] = anychart.cartesian.series.Base.prototype.tooltip;
anychart.cartesian.series.Base.prototype['color'] = anychart.cartesian.series.Base.prototype.color;//in docs/
anychart.cartesian.series.Base.prototype['getIterator'] = anychart.cartesian.series.Base.prototype.getIterator;//in docs/
anychart.cartesian.series.Base.prototype['getResetIterator'] = anychart.cartesian.series.Base.prototype.getResetIterator;//in docs/
anychart.cartesian.series.Base.prototype['xPointPosition'] = anychart.cartesian.series.Base.prototype.xPointPosition;//in docs/
anychart.cartesian.series.Base.prototype['xScale'] = anychart.cartesian.series.Base.prototype.xScale;//in docs/
anychart.cartesian.series.Base.prototype['yScale'] = anychart.cartesian.series.Base.prototype.yScale;//in docs/
anychart.cartesian.series.Base.prototype['hatchFill'] = anychart.cartesian.series.Base.prototype.hatchFill;
anychart.cartesian.series.Base.prototype['hoverHatchFill'] = anychart.cartesian.series.Base.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.BaseWithMarkers
//
//----------------------------------------------------------------------------------------------------------------------
anychart.cartesian.series.BaseWithMarkers.prototype['startDrawing'] = anychart.cartesian.series.BaseWithMarkers.prototype.startDrawing;//in docs/
anychart.cartesian.series.BaseWithMarkers.prototype['drawPoint'] = anychart.cartesian.series.BaseWithMarkers.prototype.drawPoint;//in docs/
anychart.cartesian.series.BaseWithMarkers.prototype['finalizeDrawing'] = anychart.cartesian.series.BaseWithMarkers.prototype.finalizeDrawing;//in docs/
anychart.cartesian.series.BaseWithMarkers.prototype['markers'] = anychart.cartesian.series.BaseWithMarkers.prototype.markers;//in docs/
anychart.cartesian.series.BaseWithMarkers.prototype['hoverMarkers'] = anychart.cartesian.series.BaseWithMarkers.prototype.hoverMarkers;//in docs/
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Bubble
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Bubble', anychart.cartesian.series.Bubble);
anychart.cartesian.series.Bubble.prototype['minimumSize'] = anychart.cartesian.series.Bubble.prototype.minimumSize;
anychart.cartesian.series.Bubble.prototype['maximumSize'] = anychart.cartesian.series.Bubble.prototype.maximumSize;
anychart.cartesian.series.Bubble.prototype['displayNegative'] = anychart.cartesian.series.Bubble.prototype.displayNegative;
anychart.cartesian.series.Bubble.prototype['fill'] = anychart.cartesian.series.Bubble.prototype.fill;
anychart.cartesian.series.Bubble.prototype['hoverFill'] = anychart.cartesian.series.Bubble.prototype.hoverFill;
anychart.cartesian.series.Bubble.prototype['stroke'] = anychart.cartesian.series.Bubble.prototype.stroke;
anychart.cartesian.series.Bubble.prototype['hoverStroke'] = anychart.cartesian.series.Bubble.prototype.hoverStroke;
anychart.cartesian.series.Bubble.prototype['negativeFill'] = anychart.cartesian.series.Bubble.prototype.negativeFill;
anychart.cartesian.series.Bubble.prototype['hoverNegativeFill'] = anychart.cartesian.series.Bubble.prototype.hoverNegativeFill;
anychart.cartesian.series.Bubble.prototype['negativeStroke'] = anychart.cartesian.series.Bubble.prototype.negativeStroke;
anychart.cartesian.series.Bubble.prototype['hoverNegativeStroke'] = anychart.cartesian.series.Bubble.prototype.hoverNegativeStroke;
anychart.cartesian.series.Bubble.prototype['hatchFill'] = anychart.cartesian.series.Bubble.prototype.hatchFill;
anychart.cartesian.series.Bubble.prototype['hoverHatchFill'] = anychart.cartesian.series.Bubble.prototype.hoverHatchFill;
anychart.cartesian.series.Bubble.prototype['negativeHatchFill'] = anychart.cartesian.series.Bubble.prototype.negativeHatchFill;
anychart.cartesian.series.Bubble.prototype['hoverNegativeHatchFill'] = anychart.cartesian.series.Bubble.prototype.hoverNegativeHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Candlestick
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Candlestick', anychart.cartesian.series.Candlestick);
anychart.cartesian.series.Candlestick.prototype['risingFill'] = anychart.cartesian.series.Candlestick.prototype.risingFill;
anychart.cartesian.series.Candlestick.prototype['hoverRisingFill'] = anychart.cartesian.series.Candlestick.prototype.hoverRisingFill;
anychart.cartesian.series.Candlestick.prototype['fallingFill'] = anychart.cartesian.series.Candlestick.prototype.fallingFill;
anychart.cartesian.series.Candlestick.prototype['hoverFallingFill'] = anychart.cartesian.series.Candlestick.prototype.hoverFallingFill;
anychart.cartesian.series.Candlestick.prototype['risingHatchFill'] = anychart.cartesian.series.Candlestick.prototype.risingHatchFill;
anychart.cartesian.series.Candlestick.prototype['hoverRisingHatchFill'] = anychart.cartesian.series.Candlestick.prototype.hoverRisingHatchFill;
anychart.cartesian.series.Candlestick.prototype['fallingHatchFill'] = anychart.cartesian.series.Candlestick.prototype.fallingHatchFill;
anychart.cartesian.series.Candlestick.prototype['hoverFallingHatchFill'] = anychart.cartesian.series.Candlestick.prototype.hoverFallingHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Column
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Column', anychart.cartesian.series.Column);
anychart.cartesian.series.Column.prototype['fill'] = anychart.cartesian.series.Column.prototype.fill;
anychart.cartesian.series.Column.prototype['hoverFill'] = anychart.cartesian.series.Column.prototype.hoverFill;
anychart.cartesian.series.Column.prototype['stroke'] = anychart.cartesian.series.Column.prototype.stroke;
anychart.cartesian.series.Column.prototype['hoverStroke'] = anychart.cartesian.series.Column.prototype.hoverStroke;
anychart.cartesian.series.Column.prototype['hatchFill'] = anychart.cartesian.series.Column.prototype.hatchFill;
anychart.cartesian.series.Column.prototype['hoverHatchFill'] = anychart.cartesian.series.Column.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.ContinuousBase
//
//----------------------------------------------------------------------------------------------------------------------
anychart.cartesian.series.ContinuousBase.prototype['startDrawing'] = anychart.cartesian.series.ContinuousBase.prototype.startDrawing;
anychart.cartesian.series.ContinuousBase.prototype['drawMissing'] = anychart.cartesian.series.ContinuousBase.prototype.drawMissing;
anychart.cartesian.series.ContinuousBase.prototype['hoverSeries'] = anychart.cartesian.series.ContinuousBase.prototype.hoverSeries;
anychart.cartesian.series.ContinuousBase.prototype['hoverPoint'] = anychart.cartesian.series.ContinuousBase.prototype.hoverPoint;
anychart.cartesian.series.ContinuousBase.prototype['unhover'] = anychart.cartesian.series.ContinuousBase.prototype.unhover;
anychart.cartesian.series.ContinuousBase.prototype['connectMissingPoints'] = anychart.cartesian.series.ContinuousBase.prototype.connectMissingPoints;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.ContinuousRangeBase
//
//----------------------------------------------------------------------------------------------------------------------
anychart.cartesian.series.ContinuousRangeBase.prototype['fill'] = anychart.cartesian.series.ContinuousRangeBase.prototype.fill;
anychart.cartesian.series.ContinuousRangeBase.prototype['hoverFill'] = anychart.cartesian.series.ContinuousRangeBase.prototype.hoverFill;
anychart.cartesian.series.ContinuousRangeBase.prototype['highStroke'] = anychart.cartesian.series.ContinuousRangeBase.prototype.highStroke;
anychart.cartesian.series.ContinuousRangeBase.prototype['hoverHighStroke'] = anychart.cartesian.series.ContinuousRangeBase.prototype.hoverHighStroke;
anychart.cartesian.series.ContinuousRangeBase.prototype['lowStroke'] = anychart.cartesian.series.ContinuousRangeBase.prototype.lowStroke;
anychart.cartesian.series.ContinuousRangeBase.prototype['hoverLowStroke'] = anychart.cartesian.series.ContinuousRangeBase.prototype.hoverLowStroke;
anychart.cartesian.series.ContinuousRangeBase.prototype['hatchFill'] = anychart.cartesian.series.ContinuousRangeBase.prototype.hatchFill;
anychart.cartesian.series.ContinuousRangeBase.prototype['hoverHatchFill'] = anychart.cartesian.series.ContinuousRangeBase.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.DiscreteBase
//
//----------------------------------------------------------------------------------------------------------------------
anychart.cartesian.series.DiscreteBase.prototype['hoverSeries'] = anychart.cartesian.series.DiscreteBase.prototype.hoverSeries;
anychart.cartesian.series.DiscreteBase.prototype['hoverPoint'] = anychart.cartesian.series.DiscreteBase.prototype.hoverPoint;
anychart.cartesian.series.DiscreteBase.prototype['unhover'] = anychart.cartesian.series.DiscreteBase.prototype.unhover;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Line
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Line', anychart.cartesian.series.Line);
anychart.cartesian.series.Line.prototype['stroke'] = anychart.cartesian.series.Line.prototype.stroke;
anychart.cartesian.series.Line.prototype['hoverStroke'] = anychart.cartesian.series.Line.prototype.hoverStroke;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Marker
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Marker', anychart.cartesian.series.Marker);
anychart.cartesian.series.Marker.prototype['stroke'] = anychart.cartesian.series.Marker.prototype.stroke;//in docs/
anychart.cartesian.series.Marker.prototype['hoverStroke'] = anychart.cartesian.series.Marker.prototype.hoverStroke;//in docs/
anychart.cartesian.series.Marker.prototype['fill'] = anychart.cartesian.series.Marker.prototype.fill;//in docs/
anychart.cartesian.series.Marker.prototype['hoverFill'] = anychart.cartesian.series.Marker.prototype.hoverFill;//in docs/
anychart.cartesian.series.Marker.prototype['size'] = anychart.cartesian.series.Marker.prototype.size;//in docs/
anychart.cartesian.series.Marker.prototype['hoverSize'] = anychart.cartesian.series.Marker.prototype.hoverSize;//in docs/
anychart.cartesian.series.Marker.prototype['type'] = anychart.cartesian.series.Marker.prototype.type;//in docs/
anychart.cartesian.series.Marker.prototype['hoverType'] = anychart.cartesian.series.Marker.prototype.hoverType;//in docs/
anychart.cartesian.series.Marker.prototype['startDrawing'] = anychart.cartesian.series.Marker.prototype.startDrawing;//in docs/
anychart.cartesian.series.Marker.prototype['finalizeDrawing'] = anychart.cartesian.series.Marker.prototype.finalizeDrawing;//in docs/
anychart.cartesian.series.Marker.prototype['hoverSeries'] = anychart.cartesian.series.Marker.prototype.hoverSeries;//in docs/
anychart.cartesian.series.Marker.prototype['hoverPoint'] = anychart.cartesian.series.Marker.prototype.hoverPoint;//in docs/
anychart.cartesian.series.Marker.prototype['unhover'] = anychart.cartesian.series.Marker.prototype.unhover;//in docs/
anychart.cartesian.series.Marker.prototype['hatchFill'] = anychart.cartesian.series.Marker.prototype.hatchFill;
anychart.cartesian.series.Marker.prototype['hoverHatchFill'] = anychart.cartesian.series.Marker.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.OHLC
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.OHLC', anychart.cartesian.series.OHLC);
anychart.cartesian.series.OHLC.prototype['risingStroke'] = anychart.cartesian.series.OHLC.prototype.risingStroke;
anychart.cartesian.series.OHLC.prototype['hoverRisingStroke'] = anychart.cartesian.series.OHLC.prototype.hoverRisingStroke;
anychart.cartesian.series.OHLC.prototype['fallingStroke'] = anychart.cartesian.series.OHLC.prototype.fallingStroke;
anychart.cartesian.series.OHLC.prototype['hoverFallingStroke'] = anychart.cartesian.series.OHLC.prototype.hoverFallingStroke;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.RangeArea
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.RangeArea', anychart.cartesian.series.RangeArea);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.RangeBar
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.RangeBar', anychart.cartesian.series.RangeBar);
anychart.cartesian.series.RangeBar.prototype['fill'] = anychart.cartesian.series.RangeBar.prototype.fill;
anychart.cartesian.series.RangeBar.prototype['hoverFill'] = anychart.cartesian.series.RangeBar.prototype.hoverFill;
anychart.cartesian.series.RangeBar.prototype['stroke'] = anychart.cartesian.series.RangeBar.prototype.stroke;
anychart.cartesian.series.RangeBar.prototype['hoverStroke'] = anychart.cartesian.series.RangeBar.prototype.hoverStroke;
anychart.cartesian.series.RangeBar.prototype['hatchFill'] = anychart.cartesian.series.RangeBar.prototype.hatchFill;
anychart.cartesian.series.RangeBar.prototype['hoverHatchFill'] = anychart.cartesian.series.RangeBar.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.RangeColumn
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.RangeColumn', anychart.cartesian.series.RangeColumn);
anychart.cartesian.series.RangeColumn.prototype['fill'] = anychart.cartesian.series.RangeColumn.prototype.fill;
anychart.cartesian.series.RangeColumn.prototype['hoverFill'] = anychart.cartesian.series.RangeColumn.prototype.hoverFill;
anychart.cartesian.series.RangeColumn.prototype['stroke'] = anychart.cartesian.series.RangeColumn.prototype.stroke;
anychart.cartesian.series.RangeColumn.prototype['hoverStroke'] = anychart.cartesian.series.RangeColumn.prototype.hoverStroke;
anychart.cartesian.series.RangeColumn.prototype['hatchFill'] = anychart.cartesian.series.RangeColumn.prototype.hatchFill;
anychart.cartesian.series.RangeColumn.prototype['hoverHatchFill'] = anychart.cartesian.series.RangeColumn.prototype.hoverHatchFill;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.RangeSplineArea
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.RangeSplineArea', anychart.cartesian.series.RangeSplineArea);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.RangeStepArea
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.RangeStepArea', anychart.cartesian.series.RangeStepArea);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.Spline
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.Spline', anychart.cartesian.series.Spline);
anychart.cartesian.series.Spline.prototype['stroke'] = anychart.cartesian.series.Spline.prototype.stroke;
anychart.cartesian.series.Spline.prototype['hoverStroke'] = anychart.cartesian.series.Spline.prototype.hoverStroke;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.SplineArea
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.SplineArea', anychart.cartesian.series.SplineArea);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.StepLine
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.StepLine', anychart.cartesian.series.StepLine);
anychart.cartesian.series.StepLine.prototype['stroke'] = anychart.cartesian.series.StepLine.prototype.stroke;
anychart.cartesian.series.StepLine.prototype['hoverStroke'] = anychart.cartesian.series.StepLine.prototype.hoverStroke;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.StepArea
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.cartesian.series.StepArea', anychart.cartesian.series.StepArea);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.cartesian.series.WidthBased
//
//----------------------------------------------------------------------------------------------------------------------
anychart.cartesian.series.WidthBased.prototype['pointWidth'] = anychart.cartesian.series.WidthBased.prototype.pointWidth;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.color
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.color.blend', anychart.color.blend);//in docs/final
goog.exportSymbol('anychart.color.lighten', anychart.color.lighten);//in docs/final
goog.exportSymbol('anychart.color.darken', anychart.color.darken);//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.data.Iterator
//
//----------------------------------------------------------------------------------------------------------------------
anychart.data.Iterator.prototype['select'] = anychart.data.Iterator.prototype.select;//in docs/final
anychart.data.Iterator.prototype['reset'] = anychart.data.Iterator.prototype.reset;//in docs/final
anychart.data.Iterator.prototype['advance'] = anychart.data.Iterator.prototype.advance;//in docs/final
anychart.data.Iterator.prototype['get'] = anychart.data.Iterator.prototype.get;//in docs/final
anychart.data.Iterator.prototype['meta'] = anychart.data.Iterator.prototype.meta;//in docs/final
anychart.data.Iterator.prototype['getIndex'] = anychart.data.Iterator.prototype.getIndex;//in docs/final
anychart.data.Iterator.prototype['getRowsCount'] = anychart.data.Iterator.prototype.getRowsCount;//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.data.Mapping
//
//----------------------------------------------------------------------------------------------------------------------
anychart.data.Mapping.prototype['row'] = anychart.data.Mapping.prototype.row;//in docs/final
anychart.data.Mapping.prototype['getRowsCount'] = anychart.data.Mapping.prototype.getRowsCount;//in docs/final
anychart.data.Mapping.prototype['getIterator'] = anychart.data.Mapping.prototype.getIterator;//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.data.Set
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.data.Set', anychart.data.Set);//in docs/final
anychart.data.Set.prototype['data'] = anychart.data.Set.prototype.data;//in docs/final
anychart.data.Set.prototype['mapAs'] = anychart.data.Set.prototype.mapAs;//in docs/final
anychart.data.Set.prototype['row'] = anychart.data.Set.prototype.row;//in docs/final
anychart.data.Set.prototype['getRowsCount'] = anychart.data.Set.prototype.getRowsCount;//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.data.View
//
//----------------------------------------------------------------------------------------------------------------------
anychart.data.View.prototype['derive'] = anychart.data.View.prototype.derive;
anychart.data.View.prototype['filter'] = anychart.data.View.prototype.filter;//in docs/final
anychart.data.View.prototype['sort'] = anychart.data.View.prototype.sort;//in docs/final
anychart.data.View.prototype['concat'] = anychart.data.View.prototype.concat;//in docs/final
anychart.data.View.prototype['row'] = anychart.data.View.prototype.row;//in docs/final
anychart.data.View.prototype['getRowsCount'] = anychart.data.View.prototype.getRowsCount;//in docs/final
anychart.data.View.prototype['getIterator'] = anychart.data.View.prototype.getIterator;//in docs/final
anychart.data.View.prototype['meta'] = anychart.data.View.prototype.meta;//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.data.csv.Parser
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.data.csv.Parser', anychart.data.csv.Parser);
anychart.data.csv.Parser.prototype['parse'] = anychart.data.csv.Parser.prototype.parse;
anychart.data.csv.Parser.prototype['rowsSeparator'] = anychart.data.csv.Parser.prototype.rowsSeparator;
anychart.data.csv.Parser.prototype['columnsSeparator'] = anychart.data.csv.Parser.prototype.columnsSeparator;
anychart.data.csv.Parser.prototype['ignoreTrailingSpaces'] = anychart.data.csv.Parser.prototype.ignoreTrailingSpaces;
anychart.data.csv.Parser.prototype['ignoreFirstRow'] = anychart.data.csv.Parser.prototype.ignoreFirstRow;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Axis
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Axis', anychart.elements.Axis);
anychart.elements.Axis.prototype['title'] = anychart.elements.Axis.prototype.title;
anychart.elements.Axis.prototype['name'] = anychart.elements.Axis.prototype.name;
anychart.elements.Axis.prototype['labels'] = anychart.elements.Axis.prototype.labels;
anychart.elements.Axis.prototype['minorLabels'] = anychart.elements.Axis.prototype.minorLabels;
anychart.elements.Axis.prototype['ticks'] = anychart.elements.Axis.prototype.ticks;
anychart.elements.Axis.prototype['minorTicks'] = anychart.elements.Axis.prototype.minorTicks;
anychart.elements.Axis.prototype['stroke'] = anychart.elements.Axis.prototype.stroke;
anychart.elements.Axis.prototype['orientation'] = anychart.elements.Axis.prototype.orientation;
anychart.elements.Axis.prototype['scale'] = anychart.elements.Axis.prototype.scale;
anychart.elements.Axis.prototype['offsetX'] = anychart.elements.Axis.prototype.offsetX;
anychart.elements.Axis.prototype['offsetY'] = anychart.elements.Axis.prototype.offsetY;
anychart.elements.Axis.prototype['length'] = anychart.elements.Axis.prototype.length;
anychart.elements.Axis.prototype['parentBounds'] = anychart.elements.Axis.prototype.parentBounds;
anychart.elements.Axis.prototype['getRemainingBounds'] = anychart.elements.Axis.prototype.getRemainingBounds;
anychart.elements.Axis.prototype['drawFirstLabel'] = anychart.elements.Axis.prototype.drawFirstLabel;
anychart.elements.Axis.prototype['drawLastLabel'] = anychart.elements.Axis.prototype.drawLastLabel;
anychart.elements.Axis.prototype['overlapMode'] = anychart.elements.Axis.prototype.overlapMode;
anychart.elements.Axis.prototype['isHorizontal'] = anychart.elements.Axis.prototype.isHorizontal;
anychart.elements.Axis.prototype['draw'] = anychart.elements.Axis.prototype.draw;
anychart.elements.Axis.prototype['serialize'] = anychart.elements.Axis.prototype.serialize;
anychart.elements.Axis.prototype['deserialize'] = anychart.elements.Axis.prototype.deserialize;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Background
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Background', anychart.elements.Background);//in docs/final
anychart.elements.Background.prototype['fill'] = anychart.elements.Background.prototype.fill;//in docs/final
anychart.elements.Background.prototype['stroke'] = anychart.elements.Background.prototype.stroke;//in docs/final
anychart.elements.Background.prototype['cornerType'] = anychart.elements.Background.prototype.cornerType;//in docs/final
anychart.elements.Background.prototype['corners'] = anychart.elements.Background.prototype.corners;//in docs/final
anychart.elements.Background.prototype['draw'] = anychart.elements.Background.prototype.draw;//in docs/final
goog.exportSymbol('anychart.elements.Background.CornerType.NONE', anychart.elements.Background.CornerType.NONE);//in docs/final
goog.exportSymbol('anychart.elements.Background.CornerType.ROUND ', anychart.elements.Background.CornerType.ROUND);//in docs/final
goog.exportSymbol('anychart.elements.Background.CornerType.CUT', anychart.elements.Background.CornerType.CUT);//in docs/final
goog.exportSymbol('anychart.elements.Background.CornerType.ROUND_INNER', anychart.elements.Background.CornerType.ROUND_INNER);//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.VisualBase
//
//----------------------------------------------------------------------------------------------------------------------
anychart.VisualBase.prototype['container'] = anychart.VisualBase.prototype.container;//in docs/final
anychart.VisualBase.prototype['zIndex'] = anychart.VisualBase.prototype.zIndex;//in docs/final
anychart.VisualBase.prototype['enabled'] = anychart.VisualBase.prototype.enabled;//in docs/final
anychart.VisualBase.prototype['listen'] = anychart.VisualBase.prototype.listen;
anychart.VisualBase.prototype['listenOnce'] = anychart.VisualBase.prototype.listenOnce;
anychart.VisualBase.prototype['unlisten'] = anychart.VisualBase.prototype.unlisten;
anychart.VisualBase.prototype['unlistenByKey'] = anychart.VisualBase.prototype.unlistenByKey;
anychart.VisualBase.prototype['removeAllListeners'] = anychart.VisualBase.prototype.removeAllListeners;
anychart.VisualBase.prototype['saveAsPNG'] = anychart.VisualBase.prototype.saveAsPNG;
anychart.VisualBase.prototype['saveAsJPG'] = anychart.VisualBase.prototype.saveAsJPG;
anychart.VisualBase.prototype['saveAsPDF'] = anychart.VisualBase.prototype.saveAsPDF;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.VisualBaseWithBounds
//
//----------------------------------------------------------------------------------------------------------------------
anychart.VisualBaseWithBounds.prototype['bounds'] = anychart.VisualBaseWithBounds.prototype.bounds;//in docs/final
anychart.VisualBaseWithBounds.prototype['top'] = anychart.VisualBaseWithBounds.prototype.top;//in docs/
anychart.VisualBaseWithBounds.prototype['right'] = anychart.VisualBaseWithBounds.prototype.right;//in docs/
anychart.VisualBaseWithBounds.prototype['bottom'] = anychart.VisualBaseWithBounds.prototype.bottom;//in docs/
anychart.VisualBaseWithBounds.prototype['left'] = anychart.VisualBaseWithBounds.prototype.left;//in docs/
anychart.VisualBaseWithBounds.prototype['width'] = anychart.VisualBaseWithBounds.prototype.width;//in docs/
anychart.VisualBaseWithBounds.prototype['height'] = anychart.VisualBaseWithBounds.prototype.height;//in docs/
anychart.VisualBaseWithBounds.prototype['pixelBounds'] = anychart.VisualBaseWithBounds.prototype.pixelBounds;//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Grid
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Grid', anychart.elements.Grid);
anychart.elements.Grid.prototype['minor'] = anychart.elements.Grid.prototype.minor;
anychart.elements.Grid.prototype['oddFill'] = anychart.elements.Grid.prototype.oddFill;
anychart.elements.Grid.prototype['evenFill'] = anychart.elements.Grid.prototype.evenFill;
anychart.elements.Grid.prototype['direction'] = anychart.elements.Grid.prototype.direction;
anychart.elements.Grid.prototype['scale'] = anychart.elements.Grid.prototype.scale;
anychart.elements.Grid.prototype['parentBounds'] = anychart.elements.Grid.prototype.parentBounds;
anychart.elements.Grid.prototype['stroke'] = anychart.elements.Grid.prototype.stroke;
anychart.elements.Grid.prototype['drawFirstLine'] = anychart.elements.Grid.prototype.drawFirstLine;
anychart.elements.Grid.prototype['drawLastLine'] = anychart.elements.Grid.prototype.drawLastLine;
anychart.elements.Grid.prototype['draw'] = anychart.elements.Grid.prototype.draw;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Label
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Label', anychart.elements.Label);//in docs/
anychart.elements.Label.prototype['background'] = anychart.elements.Label.prototype.background;//in docs/
anychart.elements.Label.prototype['padding'] = anychart.elements.Label.prototype.padding;//in docs/
anychart.elements.Label.prototype['width'] = anychart.elements.Label.prototype.width;//in docs/
anychart.elements.Label.prototype['height'] = anychart.elements.Label.prototype.height;//in docs/
anychart.elements.Label.prototype['parentBounds'] = anychart.elements.Label.prototype.parentBounds;//in docs/
anychart.elements.Label.prototype['anchor'] = anychart.elements.Label.prototype.anchor;//in docs/
anychart.elements.Label.prototype['offsetX'] = anychart.elements.Label.prototype.offsetX;//in docs/
anychart.elements.Label.prototype['offsetY'] = anychart.elements.Label.prototype.offsetY;//in docs/
anychart.elements.Label.prototype['position'] = anychart.elements.Label.prototype.position;//in docs/
anychart.elements.Label.prototype['text'] = anychart.elements.Label.prototype.text;//in docs/
anychart.elements.Label.prototype['draw'] = anychart.elements.Label.prototype.draw;//in docs/
anychart.elements.Label.prototype['minFontSize'] = anychart.elements.Label.prototype.minFontSize;
anychart.elements.Label.prototype['maxFontSize'] = anychart.elements.Label.prototype.maxFontSize;
anychart.elements.Label.prototype['adjustFontSize'] = anychart.elements.Label.prototype.adjustFontSize;
//anychart.elements.Label.prototype['rotation'] = anychart.elements.Label.prototype.rotation;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Legend
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Legend', anychart.elements.Legend);
anychart.elements.Legend.prototype['itemsLayout'] = anychart.elements.Legend.prototype.itemsLayout;
anychart.elements.Legend.prototype['itemsProvider'] = anychart.elements.Legend.prototype.itemsProvider;
anychart.elements.Legend.prototype['itemsSpacing'] = anychart.elements.Legend.prototype.itemsSpacing;
anychart.elements.Legend.prototype['iconTextSpacing'] = anychart.elements.Legend.prototype.iconTextSpacing;
anychart.elements.Legend.prototype['margin'] = anychart.elements.Legend.prototype.margin;
anychart.elements.Legend.prototype['padding'] = anychart.elements.Legend.prototype.padding;
anychart.elements.Legend.prototype['background'] = anychart.elements.Legend.prototype.background;
anychart.elements.Legend.prototype['title'] = anychart.elements.Legend.prototype.title;
anychart.elements.Legend.prototype['titleSeparator'] = anychart.elements.Legend.prototype.titleSeparator;
anychart.elements.Legend.prototype['paginator'] = anychart.elements.Legend.prototype.paginator;
anychart.elements.Legend.prototype['tooltip'] = anychart.elements.Legend.prototype.tooltip;
anychart.elements.Legend.prototype['width'] = anychart.elements.Legend.prototype.width;
anychart.elements.Legend.prototype['height'] = anychart.elements.Legend.prototype.height;
anychart.elements.Legend.prototype['parentBounds'] = anychart.elements.Legend.prototype.parentBounds;
anychart.elements.Legend.prototype['position'] = anychart.elements.Legend.prototype.position;
anychart.elements.Legend.prototype['align'] = anychart.elements.Legend.prototype.align;
anychart.elements.Legend.prototype['getRemainingBounds'] = anychart.elements.Legend.prototype.getRemainingBounds;
anychart.elements.Legend.prototype['draw'] = anychart.elements.Legend.prototype.draw;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.LegendItem
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.LegendItem', anychart.elements.LegendItem);
anychart.elements.LegendItem.prototype['parentBounds'] = anychart.elements.LegendItem.prototype.parentBounds;
anychart.elements.LegendItem.prototype['x'] = anychart.elements.LegendItem.prototype.x;
anychart.elements.LegendItem.prototype['y'] = anychart.elements.LegendItem.prototype.y;
anychart.elements.LegendItem.prototype['iconType'] = anychart.elements.LegendItem.prototype.iconType;
anychart.elements.LegendItem.prototype['iconFill'] = anychart.elements.LegendItem.prototype.iconFill;
anychart.elements.LegendItem.prototype['iconStroke'] = anychart.elements.LegendItem.prototype.iconStroke;
anychart.elements.LegendItem.prototype['iconTextSpacing'] = anychart.elements.LegendItem.prototype.iconTextSpacing;
anychart.elements.LegendItem.prototype['maxWidth'] = anychart.elements.LegendItem.prototype.maxWidth;
anychart.elements.LegendItem.prototype['maxHeight'] = anychart.elements.LegendItem.prototype.maxHeight;
anychart.elements.LegendItem.prototype['text'] = anychart.elements.LegendItem.prototype.text;
anychart.elements.LegendItem.prototype['getTextElement'] = anychart.elements.LegendItem.prototype.getTextElement;
anychart.elements.LegendItem.prototype['getContentBounds'] = anychart.elements.LegendItem.prototype.getContentBounds;
anychart.elements.LegendItem.prototype['getWidth'] = anychart.elements.LegendItem.prototype.getWidth;
anychart.elements.LegendItem.prototype['getHeight'] = anychart.elements.LegendItem.prototype.getHeight;
anychart.elements.LegendItem.prototype['draw'] = anychart.elements.LegendItem.prototype.draw;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.LineMarker
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.LineMarker', anychart.elements.LineMarker);
anychart.elements.LineMarker.prototype['value'] = anychart.elements.LineMarker.prototype.value;
anychart.elements.LineMarker.prototype['scale'] = anychart.elements.LineMarker.prototype.scale;
anychart.elements.LineMarker.prototype['parentBounds'] = anychart.elements.LineMarker.prototype.parentBounds;
anychart.elements.LineMarker.prototype['direction'] = anychart.elements.LineMarker.prototype.direction;
anychart.elements.LineMarker.prototype['stroke'] = anychart.elements.LineMarker.prototype.stroke;
anychart.elements.LineMarker.prototype['draw'] = anychart.elements.LineMarker.prototype.draw;
anychart.elements.LineMarker.prototype['isHorizontal'] = anychart.elements.LineMarker.prototype.isHorizontal;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Marker
//
//----------------------------------------------------------------------------------------------------------------------
//goog.exportSymbol('anychart.elements.Marker', anychart.elements.Marker);//in docs/
//anychart.elements.Marker.prototype['parentBounds'] = anychart.elements.Marker.prototype.parentBounds;//in docs/
//anychart.elements.Marker.prototype['anchor'] = anychart.elements.Marker.prototype.anchor;//in docs/
//anychart.elements.Marker.prototype['offsetX'] = anychart.elements.Marker.prototype.offsetX;//in docs/
//anychart.elements.Marker.prototype['offsetY'] = anychart.elements.Marker.prototype.offsetY;//in docs/
//anychart.elements.Marker.prototype['position'] = anychart.elements.Marker.prototype.position;//in docs/
//anychart.elements.Marker.prototype['type'] = anychart.elements.Marker.prototype.type;//in docs/
//anychart.elements.Marker.prototype['size'] = anychart.elements.Marker.prototype.size;//in docs/
//anychart.elements.Marker.prototype['fill'] = anychart.elements.Marker.prototype.fill;//in docs/
//anychart.elements.Marker.prototype['stroke'] = anychart.elements.Marker.prototype.stroke;//in docs/
//anychart.elements.Marker.prototype['draw'] = anychart.elements.Marker.prototype.draw;//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.CIRCLE', anychart.elements.Marker.Type.CIRCLE);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.CROSS', anychart.elements.Marker.Type.CROSS);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.DIAGONAL_CROSS', anychart.elements.Marker.Type.DIAGONAL_CROSS);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.DIAMOND', anychart.elements.Marker.Type.DIAMOND);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.SQUARE', anychart.elements.Marker.Type.SQUARE);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.STAR10', anychart.elements.Marker.Type.STAR10);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.STAR4', anychart.elements.Marker.Type.STAR4);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.STAR5', anychart.elements.Marker.Type.STAR5);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.STAR6', anychart.elements.Marker.Type.STAR6);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.STAR7', anychart.elements.Marker.Type.STAR7);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.STAR10', anychart.elements.Marker.Type.STAR10);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.TRIANGLE_DOWN', anychart.elements.Marker.Type.TRIANGLE_DOWN);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.TRIANGLE_UP', anychart.elements.Marker.Type.TRIANGLE_UP);//in docs/
//goog.exportSymbol('anychart.elements.Marker.Type.SQUARE', anychart.elements.Marker.Type.SQUARE);//in docs/
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.MultiMarker
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Multimarker', anychart.elements.Multimarker);//in docs/
anychart.elements.Multimarker.prototype['positionFormatter'] = anychart.elements.Multimarker.prototype.positionFormatter;//in docs/
anychart.elements.Multimarker.prototype['anchor'] = anychart.elements.Multimarker.prototype.anchor;//in docs/
anychart.elements.Multimarker.prototype['anchorAt'] = anychart.elements.Multimarker.prototype.anchorAt;//in docs/
anychart.elements.Multimarker.prototype['offsetX'] = anychart.elements.Multimarker.prototype.offsetX;//in docs/
anychart.elements.Multimarker.prototype['offsetXAt'] = anychart.elements.Multimarker.prototype.offsetXAt;//in docs/
anychart.elements.Multimarker.prototype['offsetY'] = anychart.elements.Multimarker.prototype.offsetY;//in docs/
anychart.elements.Multimarker.prototype['offsetYAt'] = anychart.elements.Multimarker.prototype.offsetYAt;//in docs/
anychart.elements.Multimarker.prototype['position'] = anychart.elements.Multimarker.prototype.position;//in docs/
anychart.elements.Multimarker.prototype['positionAt'] = anychart.elements.Multimarker.prototype.positionAt;//in docs/
anychart.elements.Multimarker.prototype['type'] = anychart.elements.Multimarker.prototype.type;//in docs/
anychart.elements.Multimarker.prototype['typeAt'] = anychart.elements.Multimarker.prototype.typeAt;//in docs/
anychart.elements.Multimarker.prototype['size'] = anychart.elements.Multimarker.prototype.size;//in docs/
anychart.elements.Multimarker.prototype['sizeAt'] = anychart.elements.Multimarker.prototype.sizeAt;//in docs/
anychart.elements.Multimarker.prototype['fill'] = anychart.elements.Multimarker.prototype.fill;//in docs/
anychart.elements.Multimarker.prototype['fillAt'] = anychart.elements.Multimarker.prototype.fillAt;//in docs/
anychart.elements.Multimarker.prototype['stroke'] = anychart.elements.Multimarker.prototype.stroke;//in docs/
anychart.elements.Multimarker.prototype['strokeAt'] = anychart.elements.Multimarker.prototype.strokeAt;//in docs/
anychart.elements.Multimarker.prototype['deserialize'] = anychart.elements.Multimarker.prototype.deserialize;//in docs/
anychart.elements.Multimarker.prototype['deserializeAt'] = anychart.elements.Multimarker.prototype.deserializeAt;//in docs/
anychart.elements.Multimarker.prototype['dropCustomSettings'] = anychart.elements.Multimarker.prototype.dropCustomSettings;//in docs/
anychart.elements.Multimarker.prototype['end'] = anychart.elements.Multimarker.prototype.end;//in docs/
anychart.elements.Multimarker.prototype['clear'] = anychart.elements.Multimarker.prototype.clear;//in docs/
anychart.elements.Multimarker.prototype['draw'] = anychart.elements.Multimarker.prototype.draw;//in docs/
anychart.elements.Multimarker.prototype['measure'] = anychart.elements.Multimarker.prototype.measure;//in docs/
anychart.elements.Multimarker.prototype['serialize'] = anychart.elements.Multimarker.prototype.serialize;//in docs/
anychart.elements.Multimarker.prototype['enabledAt'] = anychart.elements.Multimarker.prototype.enabledAt;//in docs/
anychart.elements.Multimarker.prototype['parentBounds'] = anychart.elements.Multimarker.prototype.parentBounds;//in docs/
anychart.elements.Multimarker.prototype['listen'] = anychart.elements.Multimarker.prototype.listen;
anychart.elements.Multimarker.prototype['listenOnce'] = anychart.elements.Multimarker.prototype.listenOnce;
anychart.elements.Multimarker.prototype['unlisten'] = anychart.elements.Multimarker.prototype.unlisten;
anychart.elements.Multimarker.prototype['unlistenByKey'] = anychart.elements.Multimarker.prototype.unlistenByKey;
anychart.elements.Multimarker.prototype['removeAllListeners'] = anychart.elements.Multimarker.prototype.removeAllListeners;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.LabelsFactory
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.LabelsFactory', anychart.elements.LabelsFactory);
anychart.elements.LabelsFactory.prototype['background'] = anychart.elements.LabelsFactory.prototype.background;
anychart.elements.LabelsFactory.prototype['padding'] = anychart.elements.LabelsFactory.prototype.padding;
anychart.elements.LabelsFactory.prototype['textFormatter'] = anychart.elements.LabelsFactory.prototype.textFormatter;
anychart.elements.LabelsFactory.prototype['positionFormatter'] = anychart.elements.LabelsFactory.prototype.positionFormatter;
anychart.elements.LabelsFactory.prototype['position'] = anychart.elements.LabelsFactory.prototype.position;
anychart.elements.LabelsFactory.prototype['anchor'] = anychart.elements.LabelsFactory.prototype.anchor;
anychart.elements.LabelsFactory.prototype['offsetX'] = anychart.elements.LabelsFactory.prototype.offsetX;
anychart.elements.LabelsFactory.prototype['offsetY'] = anychart.elements.LabelsFactory.prototype.offsetY;
anychart.elements.LabelsFactory.prototype['rotation'] = anychart.elements.LabelsFactory.prototype.rotation;
anychart.elements.LabelsFactory.prototype['width'] = anychart.elements.LabelsFactory.prototype.width;
anychart.elements.LabelsFactory.prototype['height'] = anychart.elements.LabelsFactory.prototype.height;
anychart.elements.LabelsFactory.prototype['serialize'] = anychart.elements.LabelsFactory.prototype.serialize;
anychart.elements.LabelsFactory.prototype['deserialize'] = anychart.elements.LabelsFactory.prototype.deserialize;
anychart.elements.LabelsFactory.prototype['add'] = anychart.elements.LabelsFactory.prototype.add;
anychart.elements.LabelsFactory.prototype['draw'] = anychart.elements.LabelsFactory.prototype.draw;
anychart.elements.LabelsFactory.prototype['clear'] = anychart.elements.LabelsFactory.prototype.clear;
anychart.elements.LabelsFactory.prototype['measure'] = anychart.elements.LabelsFactory.prototype.measure;
anychart.elements.LabelsFactory.prototype['enabled'] = anychart.elements.LabelsFactory.prototype.enabled;
anychart.elements.LabelsFactory.prototype['measureWithTransform'] = anychart.elements.LabelsFactory.prototype.measureWithTransform;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.LabelsFactory.Label
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.LabelsFactory.Label', anychart.elements.LabelsFactory.Label);
anychart.elements.LabelsFactory.Label.prototype['background'] = anychart.elements.LabelsFactory.Label.prototype.background;
anychart.elements.LabelsFactory.Label.prototype['padding'] = anychart.elements.LabelsFactory.Label.prototype.padding;
anychart.elements.LabelsFactory.Label.prototype['textFormatter'] = anychart.elements.LabelsFactory.Label.prototype.textFormatter;
anychart.elements.LabelsFactory.Label.prototype['positionFormatter'] = anychart.elements.LabelsFactory.Label.prototype.positionFormatter;
anychart.elements.LabelsFactory.Label.prototype['position'] = anychart.elements.LabelsFactory.Label.prototype.position;
anychart.elements.LabelsFactory.Label.prototype['anchor'] = anychart.elements.LabelsFactory.Label.prototype.anchor;
anychart.elements.LabelsFactory.Label.prototype['offsetX'] = anychart.elements.LabelsFactory.Label.prototype.offsetX;
anychart.elements.LabelsFactory.Label.prototype['offsetY'] = anychart.elements.LabelsFactory.Label.prototype.offsetY;
anychart.elements.LabelsFactory.Label.prototype['rotation'] = anychart.elements.LabelsFactory.Label.prototype.rotation;
anychart.elements.LabelsFactory.Label.prototype['width'] = anychart.elements.LabelsFactory.Label.prototype.width;
anychart.elements.LabelsFactory.Label.prototype['height'] = anychart.elements.LabelsFactory.Label.prototype.height;
anychart.elements.LabelsFactory.Label.prototype['enabled'] = anychart.elements.LabelsFactory.Label.prototype.enabled;
anychart.elements.LabelsFactory.Label.prototype['serialize'] = anychart.elements.LabelsFactory.Label.prototype.serialize;
anychart.elements.LabelsFactory.Label.prototype['deserialize'] = anychart.elements.LabelsFactory.Label.prototype.deserialize;
anychart.elements.LabelsFactory.Label.prototype['draw'] = anychart.elements.LabelsFactory.Label.prototype.draw;
anychart.elements.LabelsFactory.Label.prototype['clear'] = anychart.elements.LabelsFactory.Label.prototype.clear;
anychart.elements.LabelsFactory.Label.prototype['getIndex'] = anychart.elements.LabelsFactory.Label.prototype.getIndex;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.RangeMarker
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.RangeMarker', anychart.elements.RangeMarker);
anychart.elements.RangeMarker.prototype['from'] = anychart.elements.RangeMarker.prototype.from;
anychart.elements.RangeMarker.prototype['to'] = anychart.elements.RangeMarker.prototype.to;
anychart.elements.RangeMarker.prototype['scale'] = anychart.elements.RangeMarker.prototype.scale;
anychart.elements.RangeMarker.prototype['parentBounds'] = anychart.elements.RangeMarker.prototype.parentBounds;
anychart.elements.RangeMarker.prototype['direction'] = anychart.elements.RangeMarker.prototype.direction;
anychart.elements.RangeMarker.prototype['fill'] = anychart.elements.RangeMarker.prototype.fill;
anychart.elements.RangeMarker.prototype['draw'] = anychart.elements.RangeMarker.prototype.draw;
anychart.elements.RangeMarker.prototype['isHorizontal'] = anychart.elements.RangeMarker.prototype.isHorizontal;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Separator
//
//----------------------------------------------------------------------------------------------------------------------
//goog.exportSymbol('anychart.elements.Separator', anychart.elements.Separator);
//anychart.elements.Separator.prototype['parentBounds'] = anychart.elements.Separator.prototype.parentBounds;
//anychart.elements.Separator.prototype['width'] = anychart.elements.Separator.prototype.width;
//anychart.elements.Separator.prototype['height'] = anychart.elements.Separator.prototype.height;
//anychart.elements.Separator.prototype['margin'] = anychart.elements.Separator.prototype.margin;
//anychart.elements.Separator.prototype['orientation'] = anychart.elements.Separator.prototype.orientation;
//anychart.elements.Separator.prototype['fill'] = anychart.elements.Separator.prototype.fill;
//anychart.elements.Separator.prototype['stroke'] = anychart.elements.Separator.prototype.stroke;
//anychart.elements.Separator.prototype['drawer'] = anychart.elements.Separator.prototype.drawer;
//anychart.elements.Separator.prototype['draw'] = anychart.elements.Separator.prototype.draw;
//anychart.elements.Separator.prototype['getRemainingBounds'] = anychart.elements.Separator.prototype.getRemainingBounds;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Text
//
//----------------------------------------------------------------------------------------------------------------------
anychart.elements.Text.prototype['fontSize'] = anychart.elements.Text.prototype.fontSize;//in docs/final
anychart.elements.Text.prototype['fontFamily'] = anychart.elements.Text.prototype.fontFamily;//in docs/final
anychart.elements.Text.prototype['fontColor'] = anychart.elements.Text.prototype.fontColor;//in docs/final
anychart.elements.Text.prototype['fontOpacity'] = anychart.elements.Text.prototype.fontOpacity;//in docs/final
anychart.elements.Text.prototype['fontDecoration'] = anychart.elements.Text.prototype.fontDecoration;//in docs/final
anychart.elements.Text.prototype['fontStyle'] = anychart.elements.Text.prototype.fontStyle;//in docs/final
anychart.elements.Text.prototype['fontVariant'] = anychart.elements.Text.prototype.fontVariant;//in docs/final
anychart.elements.Text.prototype['fontWeight'] = anychart.elements.Text.prototype.fontWeight;//in docs/final
anychart.elements.Text.prototype['letterSpacing'] = anychart.elements.Text.prototype.letterSpacing;//in docs/final
anychart.elements.Text.prototype['textDirection'] = anychart.elements.Text.prototype.textDirection;//in docs/final
anychart.elements.Text.prototype['lineHeight'] = anychart.elements.Text.prototype.lineHeight;//in docs/final
anychart.elements.Text.prototype['textIndent'] = anychart.elements.Text.prototype.textIndent;//in docs/final
anychart.elements.Text.prototype['vAlign'] = anychart.elements.Text.prototype.vAlign;//in docs/final
anychart.elements.Text.prototype['hAlign'] = anychart.elements.Text.prototype.hAlign;//in docs/final
anychart.elements.Text.prototype['textWrap'] = anychart.elements.Text.prototype.textWrap;//in docs/final
anychart.elements.Text.prototype['textOverflow'] = anychart.elements.Text.prototype.textOverflow;//in docs/final
anychart.elements.Text.prototype['selectable'] = anychart.elements.Text.prototype.selectable;//in docs/final
anychart.elements.Text.prototype['hoverable'] = anychart.elements.Text.prototype.hoverable;//in docs/final
anychart.elements.Text.prototype['useHtml'] = anychart.elements.Text.prototype.useHtml;//in docs/final
anychart.elements.Text.prototype['textSettings'] = anychart.elements.Text.prototype.textSettings;//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.TextMarker
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.TextMarker', anychart.elements.TextMarker);
anychart.elements.TextMarker.prototype['value'] = anychart.elements.TextMarker.prototype.value;
anychart.elements.TextMarker.prototype['scale'] = anychart.elements.TextMarker.prototype.scale;
anychart.elements.TextMarker.prototype['parentBounds'] = anychart.elements.TextMarker.prototype.parentBounds;
anychart.elements.TextMarker.prototype['anchor'] = anychart.elements.TextMarker.prototype.anchor;
anychart.elements.TextMarker.prototype['align'] = anychart.elements.TextMarker.prototype.align;
anychart.elements.TextMarker.prototype['direction'] = anychart.elements.TextMarker.prototype.direction;
anychart.elements.TextMarker.prototype['offsetX'] = anychart.elements.TextMarker.prototype.offsetX;
anychart.elements.TextMarker.prototype['offsetY'] = anychart.elements.TextMarker.prototype.offsetY;
anychart.elements.TextMarker.prototype['text'] = anychart.elements.TextMarker.prototype.text;
anychart.elements.TextMarker.prototype['height'] = anychart.elements.TextMarker.prototype.height;
anychart.elements.TextMarker.prototype['width'] = anychart.elements.TextMarker.prototype.width;
anychart.elements.TextMarker.prototype['draw'] = anychart.elements.TextMarker.prototype.draw;
anychart.elements.TextMarker.prototype['isHorizontal'] = anychart.elements.TextMarker.prototype.isHorizontal;
goog.exportSymbol('anychart.elements.TextMarker.Align.CENTER', anychart.elements.TextMarker.Align.CENTER);
goog.exportSymbol('anychart.elements.TextMarker.Align.NEAR', anychart.elements.TextMarker.Align.NEAR);
goog.exportSymbol('anychart.elements.TextMarker.Align.FAR', anychart.elements.TextMarker.Align.FAR);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Ticks
//
//----------------------------------------------------------------------------------------------------------------------
anychart.elements.Ticks.prototype['length'] = anychart.elements.Ticks.prototype.length;//in docs/
anychart.elements.Ticks.prototype['stroke'] = anychart.elements.Ticks.prototype.stroke;//in docs/
anychart.elements.Ticks.prototype['position'] = anychart.elements.Ticks.prototype.position;//in docs/
goog.exportSymbol('anychart.elements.Ticks.Position.INSIDE', anychart.elements.Ticks.Position.INSIDE);//in docs/
goog.exportSymbol('anychart.elements.Ticks.Position.OUTSIDE', anychart.elements.Ticks.Position.OUTSIDE);//in docs/
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Title
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Title', anychart.elements.Title);//in docs/final
anychart.elements.Title.prototype['parentBounds'] = anychart.elements.Title.prototype.parentBounds;//in docs/final
anychart.elements.Title.prototype['text'] = anychart.elements.Title.prototype.text;//in docs/final
anychart.elements.Title.prototype['background'] = anychart.elements.Title.prototype.background;//in docs/final
anychart.elements.Title.prototype['width'] = anychart.elements.Title.prototype.width;//in docs/final
anychart.elements.Title.prototype['height'] = anychart.elements.Title.prototype.height;//in docs/final
anychart.elements.Title.prototype['margin'] = anychart.elements.Title.prototype.margin;//in docs/final
anychart.elements.Title.prototype['padding'] = anychart.elements.Title.prototype.padding;//in docs/final
anychart.elements.Title.prototype['align'] = anychart.elements.Title.prototype.align;//in docs/final
anychart.elements.Title.prototype['orientation'] = anychart.elements.Title.prototype.orientation;//in docs/final
anychart.elements.Title.prototype['draw'] = anychart.elements.Title.prototype.draw;//in docs/final
anychart.elements.Title.prototype['getRemainingBounds'] = anychart.elements.Title.prototype.getRemainingBounds;//in docs/final
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.Tooltip
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.Tooltip', anychart.elements.Tooltip);
anychart.elements.Tooltip.prototype['titleFormatter'] = anychart.elements.Tooltip.prototype.titleFormatter;
anychart.elements.Tooltip.prototype['textFormatter'] = anychart.elements.Tooltip.prototype.textFormatter;
anychart.elements.Tooltip.prototype['allowLeaveScreen'] = anychart.elements.Tooltip.prototype.allowLeaveScreen;
anychart.elements.Tooltip.prototype['isFloating'] = anychart.elements.Tooltip.prototype.isFloating;
anychart.elements.Tooltip.prototype['title'] = anychart.elements.Tooltip.prototype.title;
anychart.elements.Tooltip.prototype['separator'] = anychart.elements.Tooltip.prototype.separator;
anychart.elements.Tooltip.prototype['content'] = anychart.elements.Tooltip.prototype.content;
anychart.elements.Tooltip.prototype['background'] = anychart.elements.Tooltip.prototype.background;
anychart.elements.Tooltip.prototype['padding'] = anychart.elements.Tooltip.prototype.padding;
anychart.elements.Tooltip.prototype['offsetX'] = anychart.elements.Tooltip.prototype.offsetX;
anychart.elements.Tooltip.prototype['offsetY'] = anychart.elements.Tooltip.prototype.offsetY;
anychart.elements.Tooltip.prototype['anchor'] = anychart.elements.Tooltip.prototype.anchor;
anychart.elements.Tooltip.prototype['hideDelay'] = anychart.elements.Tooltip.prototype.hideDelay;
anychart.elements.Tooltip.prototype['show'] = anychart.elements.Tooltip.prototype.show;
anychart.elements.Tooltip.prototype['hide'] = anychart.elements.Tooltip.prototype.hide;
anychart.elements.Tooltip.prototype['redraw'] = anychart.elements.Tooltip.prototype.redraw;
anychart.elements.Tooltip.prototype['enabled'] = anychart.elements.Tooltip.prototype.enabled;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.elements.TooltipItem
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.elements.TooltipItem', anychart.elements.TooltipItem);
anychart.elements.TooltipItem.prototype['title'] = anychart.elements.TooltipItem.prototype.title;
anychart.elements.TooltipItem.prototype['separator'] = anychart.elements.TooltipItem.prototype.separator;
anychart.elements.TooltipItem.prototype['content'] = anychart.elements.TooltipItem.prototype.content;
anychart.elements.TooltipItem.prototype['background'] = anychart.elements.TooltipItem.prototype.background;
anychart.elements.TooltipItem.prototype['padding'] = anychart.elements.TooltipItem.prototype.padding;
anychart.elements.TooltipItem.prototype['x'] = anychart.elements.TooltipItem.prototype.x;
anychart.elements.TooltipItem.prototype['y'] = anychart.elements.TooltipItem.prototype.y;
anychart.elements.TooltipItem.prototype['offsetX'] = anychart.elements.TooltipItem.prototype.offsetX;
anychart.elements.TooltipItem.prototype['offsetY'] = anychart.elements.TooltipItem.prototype.offsetY;
anychart.elements.TooltipItem.prototype['anchor'] = anychart.elements.TooltipItem.prototype.anchor;
anychart.elements.TooltipItem.prototype['visible'] = anychart.elements.TooltipItem.prototype.visible;
anychart.elements.TooltipItem.prototype['hideDelay'] = anychart.elements.TooltipItem.prototype.hideDelay;
anychart.elements.TooltipItem.prototype['draw'] = anychart.elements.TooltipItem.prototype.draw;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.events.EventType
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.events.EventType.POINT_MOUSE_OUT', anychart.events.EventType.POINT_MOUSE_OUT);
goog.exportSymbol('anychart.events.EventType.POINT_MOUSE_OVER', anychart.events.EventType.POINT_MOUSE_OVER);
goog.exportSymbol('anychart.events.EventType.POINT_CLICK', anychart.events.EventType.POINT_CLICK);
goog.exportSymbol('anychart.events.EventType.POINT_DOUBLE_CLICK', anychart.events.EventType.POINT_DOUBLE_CLICK);
goog.exportSymbol('anychart.events.EventType.CHART_DRAW', anychart.events.EventType.CHART_DRAW);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.math.Rect
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.math.Rect', anychart.math.Rect);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.pie.Chart
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.pie.Chart', anychart.pie.Chart);//in docs/final
anychart.pie.Chart.prototype['data'] = anychart.pie.Chart.prototype.data;//in docs/final
anychart.pie.Chart.prototype['group'] = anychart.pie.Chart.prototype.group;
anychart.pie.Chart.prototype['labels'] = anychart.pie.Chart.prototype.labels;//in docs/final
anychart.pie.Chart.prototype['radius'] = anychart.pie.Chart.prototype.radius;//in docs/final
anychart.pie.Chart.prototype['innerRadius'] = anychart.pie.Chart.prototype.innerRadius;//in docs/final
anychart.pie.Chart.prototype['startAngle'] = anychart.pie.Chart.prototype.startAngle;//in docs/final
anychart.pie.Chart.prototype['explode'] = anychart.pie.Chart.prototype.explode;//in docs/final
anychart.pie.Chart.prototype['sort'] = anychart.pie.Chart.prototype.sort;//in docs/final
anychart.pie.Chart.prototype['getCenterPoint'] = anychart.pie.Chart.prototype.getCenterPoint;//in docs/final
anychart.pie.Chart.prototype['getPixelRadius'] = anychart.pie.Chart.prototype.getPixelRadius;//in docs/final
anychart.pie.Chart.prototype['getPixelInnerRadius'] = anychart.pie.Chart.prototype.getPixelInnerRadius;//in docs/final
anychart.pie.Chart.prototype['palette'] = anychart.pie.Chart.prototype.palette;//in docs/final
anychart.pie.Chart.prototype['fill'] = anychart.pie.Chart.prototype.fill;//in docs/final
anychart.pie.Chart.prototype['stroke'] = anychart.pie.Chart.prototype.stroke;//in docs/final
anychart.pie.Chart.prototype['hoverFill'] = anychart.pie.Chart.prototype.hoverFill;//in docs/final
anychart.pie.Chart.prototype['hoverStroke'] = anychart.pie.Chart.prototype.hoverStroke;//in docs/final
anychart.pie.Chart.prototype['serialize'] = anychart.pie.Chart.prototype.serialize;//in docs/
anychart.pie.Chart.prototype['explodeSlice'] = anychart.pie.Chart.prototype.explodeSlice;
anychart.pie.Chart.prototype['tooltip'] = anychart.pie.Chart.prototype.tooltip;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.Base
//
//----------------------------------------------------------------------------------------------------------------------
anychart.scales.Base.prototype['stackMode'] = anychart.scales.Base.prototype.stackMode;
anychart.scales.Base.prototype['inverted'] = anychart.scales.Base.prototype.inverted;
anychart.scales.Base.prototype['startAutoCalc'] = anychart.scales.Base.prototype.startAutoCalc;
anychart.scales.Base.prototype['finishAutoCalc'] = anychart.scales.Base.prototype.finishAutoCalc;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.DateTime
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.scales.DateTime', anychart.scales.DateTime);
anychart.scales.DateTime.prototype['ticks'] = anychart.scales.DateTime.prototype.ticks;
anychart.scales.DateTime.prototype['minorTicks'] = anychart.scales.DateTime.prototype.minorTicks;
goog.exportSymbol('anychart.scales.dateTime', anychart.scales.dateTime);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.DateTimeTicks
//
//----------------------------------------------------------------------------------------------------------------------
anychart.scales.DateTimeTicks.prototype['interval'] = anychart.scales.DateTimeTicks.prototype.interval;
anychart.scales.DateTimeTicks.prototype['count'] = anychart.scales.DateTimeTicks.prototype.count;
anychart.scales.DateTimeTicks.prototype['set'] = anychart.scales.DateTimeTicks.prototype.set;
anychart.scales.DateTimeTicks.prototype['get'] = anychart.scales.DateTimeTicks.prototype.get;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.Linear
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.scales.Linear', anychart.scales.Linear);
anychart.scales.Linear.prototype['ticks'] = anychart.scales.Linear.prototype.ticks;
anychart.scales.Linear.prototype['minorTicks'] = anychart.scales.Linear.prototype.minorTicks;
goog.exportSymbol('anychart.scales.linear', anychart.scales.linear);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.Logarithmic
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.scales.Logarithmic', anychart.scales.Logarithmic);
anychart.scales.Logarithmic.prototype['transform'] = anychart.scales.Logarithmic.prototype.transform;
anychart.scales.Logarithmic.prototype['inverseTransform'] = anychart.scales.Logarithmic.prototype.inverseTransform;
goog.exportSymbol('anychart.scales.log', anychart.scales.log);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.Ordinal
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.scales.Ordinal', anychart.scales.Ordinal);
anychart.scales.Ordinal.prototype['transform'] = anychart.scales.Ordinal.prototype.transform;
anychart.scales.Ordinal.prototype['inverseTransform'] = anychart.scales.Ordinal.prototype.inverseTransform;
anychart.scales.Ordinal.prototype['ticks'] = anychart.scales.Ordinal.prototype.ticks;
anychart.scales.Ordinal.prototype['values'] = anychart.scales.Ordinal.prototype.values;
anychart.scales.Ordinal.prototype['extendDataRange'] = anychart.scales.Ordinal.prototype.extendDataRange;
goog.exportSymbol('anychart.scales.ordinal', anychart.scales.ordinal);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.OrdinalTicks
//
//----------------------------------------------------------------------------------------------------------------------
anychart.scales.OrdinalTicks.prototype['interval'] = anychart.scales.OrdinalTicks.prototype.interval;
anychart.scales.OrdinalTicks.prototype['set'] = anychart.scales.OrdinalTicks.prototype.set;
anychart.scales.OrdinalTicks.prototype['get'] = anychart.scales.OrdinalTicks.prototype.get;
anychart.scales.OrdinalTicks.prototype['names'] = anychart.scales.OrdinalTicks.prototype.names;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.ScatterBase
//
//----------------------------------------------------------------------------------------------------------------------
anychart.scales.ScatterBase.prototype['transform'] = anychart.scales.ScatterBase.prototype.transform;
anychart.scales.ScatterBase.prototype['inverseTransform'] = anychart.scales.ScatterBase.prototype.inverseTransform;
anychart.scales.ScatterBase.prototype['minimum'] = anychart.scales.ScatterBase.prototype.minimum;
anychart.scales.ScatterBase.prototype['maximum'] = anychart.scales.ScatterBase.prototype.maximum;
anychart.scales.ScatterBase.prototype['minimumGap'] = anychart.scales.ScatterBase.prototype.minimumGap;
anychart.scales.ScatterBase.prototype['maximumGap'] = anychart.scales.ScatterBase.prototype.maximumGap;
anychart.scales.ScatterBase.prototype['extendDataRange'] = anychart.scales.ScatterBase.prototype.extendDataRange;
anychart.scales.ScatterBase.prototype['stackMode'] = anychart.scales.ScatterBase.prototype.stackMode;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.ScatterTicks
//
//----------------------------------------------------------------------------------------------------------------------
anychart.scales.ScatterTicks.prototype['interval'] = anychart.scales.ScatterTicks.prototype.interval;
anychart.scales.ScatterTicks.prototype['count'] = anychart.scales.ScatterTicks.prototype.count;
anychart.scales.ScatterTicks.prototype['base'] = anychart.scales.ScatterTicks.prototype.base;
anychart.scales.ScatterTicks.prototype['set'] = anychart.scales.ScatterTicks.prototype.set;
anychart.scales.ScatterTicks.prototype['get'] = anychart.scales.ScatterTicks.prototype.get;
anychart.scales.ScatterTicks.prototype['mode'] = anychart.scales.ScatterTicks.prototype.mode;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.ui.Button
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.ui.Button', anychart.ui.Button);
anychart.ui.Button.prototype['parentBounds'] = anychart.ui.Button.prototype.parentBounds;
anychart.ui.Button.prototype['text'] = anychart.ui.Button.prototype.text;
anychart.ui.Button.prototype['padding'] = anychart.ui.Button.prototype.padding;
anychart.ui.Button.prototype['position'] = anychart.ui.Button.prototype.position;
anychart.ui.Button.prototype['width'] = anychart.ui.Button.prototype.width;
anychart.ui.Button.prototype['height'] = anychart.ui.Button.prototype.height;
anychart.ui.Button.prototype['draw'] = anychart.ui.Button.prototype.draw;
anychart.ui.Button.prototype['setOnClickListener'] = anychart.ui.Button.prototype.setOnClickListener;
anychart.ui.Button.prototype['normal'] = anychart.ui.Button.prototype.normal;
anychart.ui.Button.prototype['hover'] = anychart.ui.Button.prototype.hover;
anychart.ui.Button.prototype['pushed'] = anychart.ui.Button.prototype.pushed;
anychart.ui.Button.prototype['checked'] = anychart.ui.Button.prototype.checked;
anychart.ui.Button.prototype['disabled'] = anychart.ui.Button.prototype.disabled;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.ui.Paginator
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.ui.Paginator', anychart.ui.Paginator);
anychart.ui.Paginator.prototype['parentBounds'] = anychart.ui.Paginator.prototype.parentBounds;
anychart.ui.Paginator.prototype['background'] = anychart.ui.Paginator.prototype.background;
anychart.ui.Paginator.prototype['orientation'] = anychart.ui.Paginator.prototype.orientation;
anychart.ui.Paginator.prototype['padding'] = anychart.ui.Paginator.prototype.padding;
anychart.ui.Paginator.prototype['margin'] = anychart.ui.Paginator.prototype.margin;
anychart.ui.Paginator.prototype['layout'] = anychart.ui.Paginator.prototype.layout;
anychart.ui.Paginator.prototype['pageCount'] = anychart.ui.Paginator.prototype.pageCount;
anychart.ui.Paginator.prototype['currentPage'] = anychart.ui.Paginator.prototype.currentPage;
anychart.ui.Paginator.prototype['draw'] = anychart.ui.Paginator.prototype.draw;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.ui.Splitter
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.ui.Splitter', anychart.ui.Splitter);
goog.exportSymbol('anychart.ui.Splitter.CHANGE', anychart.ui.Splitter.CHANGE);
anychart.ui.Splitter.prototype['layout'] = anychart.ui.Splitter.prototype.layout;
anychart.ui.Splitter.prototype['position'] = anychart.ui.Splitter.prototype.position;
anychart.ui.Splitter.prototype['dragAreaLength'] = anychart.ui.Splitter.prototype.dragAreaLength;
anychart.ui.Splitter.prototype['stroke'] = anychart.ui.Splitter.prototype.stroke;
anychart.ui.Splitter.prototype['fill'] = anychart.ui.Splitter.prototype.fill;
anychart.ui.Splitter.prototype['dragPreviewStroke'] = anychart.ui.Splitter.prototype.dragPreviewStroke;
anychart.ui.Splitter.prototype['dragPreviewFill'] = anychart.ui.Splitter.prototype.dragPreviewFill;
anychart.ui.Splitter.prototype['dragAreaStroke'] = anychart.ui.Splitter.prototype.dragAreaStroke;
anychart.ui.Splitter.prototype['dragAreaFill'] = anychart.ui.Splitter.prototype.dragAreaFill;
anychart.ui.Splitter.prototype['handlePositionChange'] = anychart.ui.Splitter.prototype.handlePositionChange;
anychart.ui.Splitter.prototype['considerSplitterWidth'] = anychart.ui.Splitter.prototype.considerSplitterWidth;
anychart.ui.Splitter.prototype['splitterWidth'] = anychart.ui.Splitter.prototype.splitterWidth;
anychart.ui.Splitter.prototype['leftLimitSize'] = anychart.ui.Splitter.prototype.leftLimitSize;
anychart.ui.Splitter.prototype['topLimitSize'] = anychart.ui.Splitter.prototype.topLimitSize;
anychart.ui.Splitter.prototype['rightLimitSize'] = anychart.ui.Splitter.prototype.rightLimitSize;
anychart.ui.Splitter.prototype['bottomLimitSize'] = anychart.ui.Splitter.prototype.bottomLimitSize;
anychart.ui.Splitter.prototype['getLeftBounds'] = anychart.ui.Splitter.prototype.getLeftBounds;
anychart.ui.Splitter.prototype['getTopBounds'] = anychart.ui.Splitter.prototype.getTopBounds;
anychart.ui.Splitter.prototype['getRightBounds'] = anychart.ui.Splitter.prototype.getRightBounds;
anychart.ui.Splitter.prototype['getBottomBounds'] = anychart.ui.Splitter.prototype.getBottomBounds;
anychart.ui.Splitter.prototype['draw'] = anychart.ui.Splitter.prototype.draw;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.scales.ScatterTicksMode
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.scales.ScatterTicksMode.LINEAR', anychart.scales.ScatterTicksMode.LINEAR);
goog.exportSymbol('anychart.scales.ScatterTicksMode.LOGARITHMIC', anychart.scales.ScatterTicksMode.LOGARITHMIC);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.Base
//
//----------------------------------------------------------------------------------------------------------------------
anychart.Base.prototype['listen'] = anychart.Base.prototype.listen;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.Signal
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.SignalEvent', anychart.SignalEvent);
anychart.SignalEvent.prototype['hasSignal'] = anychart.SignalEvent.prototype.hasSignal;
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.Signal
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.Signal', anychart.Signal);
goog.exportSymbol('anychart.Signal.NEEDS_REDRAW', anychart.Signal.NEEDS_REDRAW);
goog.exportSymbol('anychart.Signal.NEEDS_REAPPLICATION', anychart.Signal.NEEDS_REAPPLICATION);
goog.exportSymbol('anychart.Signal.NEEDS_RECALCULATION', anychart.Signal.NEEDS_RECALCULATION);
goog.exportSymbol('anychart.Signal.BOUNDS_CHANGED', anychart.Signal.BOUNDS_CHANGED);
goog.exportSymbol('anychart.Signal.DATA_CHANGED', anychart.Signal.DATA_CHANGED);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.utils Position
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.utils.Align.CENTER', anychart.utils.Align.CENTER);//in docs/
goog.exportSymbol('anychart.utils.Align.LEFT', anychart.utils.Align.LEFT);//in docs/
goog.exportSymbol('anychart.utils.Align.RIGHT', anychart.utils.Align.RIGHT);//in docs/
goog.exportSymbol('anychart.utils.Align.TOP', anychart.utils.Align.TOP);//in docs/
goog.exportSymbol('anychart.utils.Align.BOTTOM', anychart.utils.Align.BOTTOM);//in docs/
goog.exportSymbol('anychart.utils.Orientation.LEFT', anychart.utils.Orientation.LEFT);//in docs/
goog.exportSymbol('anychart.utils.Orientation.RIGHT', anychart.utils.Orientation.RIGHT);//in docs/
goog.exportSymbol('anychart.utils.Orientation.TOP', anychart.utils.Orientation.TOP);//in docs/
goog.exportSymbol('anychart.utils.Orientation.BOTTOM', anychart.utils.Orientation.BOTTOM);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.LEFT_TOP', anychart.utils.NinePositions.LEFT_TOP);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.TOP', anychart.utils.NinePositions.TOP);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.RIGHT_TOP', anychart.utils.NinePositions.RIGHT_TOP);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.LEFT_CENTER', anychart.utils.NinePositions.LEFT_CENTER);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.CENTER', anychart.utils.NinePositions.CENTER);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.RIGHT_CENTER', anychart.utils.NinePositions.RIGHT_CENTER);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.LEFT_BOTTOM', anychart.utils.NinePositions.LEFT_BOTTOM);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.BOTTOM', anychart.utils.NinePositions.BOTTOM);//in docs/
goog.exportSymbol('anychart.utils.NinePositions.RIGHT_BOTTOM', anychart.utils.NinePositions.RIGHT_BOTTOM);//in docs/
goog.exportSymbol('anychart.utils.Direction.HORIZONTAL', anychart.utils.Direction.HORIZONTAL);//in docs/
goog.exportSymbol('anychart.utils.Direction.VERTICAL', anychart.utils.Direction.VERTICAL);//in docs/
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.utils Palettes
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.utils.DistinctColorPalette', anychart.utils.DistinctColorPalette);//in docs/
anychart.utils.DistinctColorPalette.prototype['colorAt'] = anychart.utils.DistinctColorPalette.prototype.colorAt;//in docs/
anychart.utils.DistinctColorPalette.prototype['colors'] = anychart.utils.DistinctColorPalette.prototype.colors;//in docs/
goog.exportSymbol('anychart.utils.MarkerPalette', anychart.utils.MarkerPalette);
anychart.utils.MarkerPalette.prototype['markerAt'] = anychart.utils.MarkerPalette.prototype.markerAt;
anychart.utils.MarkerPalette.prototype['markers'] = anychart.utils.MarkerPalette.prototype.markers;
anychart.utils.MarkerPalette.prototype['serialize'] = anychart.utils.MarkerPalette.prototype.serialize;
anychart.utils.MarkerPalette.prototype['deserialize'] = anychart.utils.MarkerPalette.prototype.deserialize;
goog.exportSymbol('anychart.utils.RangeColorPalette', anychart.utils.RangeColorPalette);//in docs/
anychart.utils.RangeColorPalette.prototype['colorAt'] = anychart.utils.RangeColorPalette.prototype.colorAt;//in docs/
anychart.utils.RangeColorPalette.prototype['colors'] = anychart.utils.RangeColorPalette.prototype.colors;//in docs/
anychart.utils.RangeColorPalette.prototype['count'] = anychart.utils.RangeColorPalette.prototype.count;//in docs/
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.utils.Sort
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.utils.Sort.NONE', anychart.utils.Sort.NONE);//in docs/
goog.exportSymbol('anychart.utils.Sort.ASC', anychart.utils.Sort.ASC);//in docs/
goog.exportSymbol('anychart.utils.Sort.DESC', anychart.utils.Sort.DESC);//in docs/
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.utils
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.utils.xml2json', anychart.utils.xml2json);
goog.exportSymbol('anychart.utils.json2xml', anychart.utils.json2xml);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.VERSION', anychart.VERSION);
goog.exportSymbol('anychart.version', anychart.VERSION);
goog.exportSymbol('anychart.fromJson', anychart.fromJson);
goog.exportSymbol('anychart.fromXml', anychart.fromXml);
goog.exportSymbol('anychart.onDocumentLoad', anychart.onDocumentLoad);//in docs/
goog.exportSymbol('anychart.onDocumentReady', anychart.onDocumentReady);
goog.exportSymbol('anychart.chart', anychart.chart);
goog.exportSymbol('anychart.scatterChart', anychart.scatterChart);
goog.exportSymbol('anychart.pieChart', anychart.pieChart);
goog.exportSymbol('anychart.lineChart', anychart.lineChart);
goog.exportSymbol('anychart.columnChart', anychart.columnChart);
goog.exportSymbol('anychart.barChart', anychart.barChart);
goog.exportSymbol('anychart.areaChart', anychart.areaChart);
goog.exportSymbol('anychart.financialChart', anychart.financialChart);
//----------------------------------------------------------------------------------------------------------------------
//
//  anychart.Chart
//
//----------------------------------------------------------------------------------------------------------------------
goog.exportSymbol('anychart.Chart', anychart.Chart);//in docs/final
anychart.Chart.prototype['title'] = anychart.Chart.prototype.title;//in docs/final
anychart.Chart.prototype['background'] = anychart.Chart.prototype.background;//in docs/final
anychart.Chart.prototype['margin'] = anychart.Chart.prototype.margin;//in docs/final
anychart.Chart.prototype['padding'] = anychart.Chart.prototype.padding;//in docs/final
anychart.Chart.prototype['legend'] = anychart.Chart.prototype.legend;
anychart.Chart.prototype['chartLabel'] = anychart.Chart.prototype.chartLabel;
anychart.Chart.prototype['draw'] = anychart.Chart.prototype.draw;//in docs/final
anychart.Chart.prototype['toJson'] = anychart.Chart.prototype.toJson;
anychart.Chart.prototype['toXml'] = anychart.Chart.prototype.toXml;
