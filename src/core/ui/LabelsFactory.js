//region --- Requiring and Providing
goog.provide('anychart.core.ui.LabelsFactory');
goog.provide('anychart.core.ui.LabelsFactory.Label');
goog.require('acgraph.math');
goog.require('anychart.core.IStandaloneBackend');
goog.require('anychart.core.VisualBase');
goog.require('anychart.core.reporting');
goog.require('anychart.core.settings');
goog.require('anychart.core.ui.Background');
goog.require('anychart.core.utils.Padding');
goog.require('anychart.core.utils.TokenParser');
goog.require('anychart.enums');
goog.require('anychart.math.Rect');
goog.require('goog.math.Coordinate');
//endregion



/**
 * Class for creation of sets of similar labels and management of such sets.
 * Any individual label can be changed after all labels are displayed.
 * @constructor
 * @extends {anychart.core.VisualBase}
 * @implements {anychart.core.settings.IObjectWithSettings}
 * @implements {anychart.core.settings.IResolvable}
 * @implements {anychart.core.IStandaloneBackend}
 */
anychart.core.ui.LabelsFactory = function() {
  this.suspendSignalsDispatching();
  anychart.core.ui.LabelsFactory.base(this, 'constructor');

  /**
   * Labels background settings.
   * @type {anychart.core.ui.Background}
   * @private
   */
  this.background_ = null;

  /**
   * Labels padding settings.
   * @type {anychart.core.utils.Padding}
   * @private
   */
  this.padding_ = null;

  /**
   * Labels layer.
   * @type {acgraph.vector.Layer}
   * @private
   */
  this.layer_ = null;

  /**
   * Labels Array.
   * @type {Array.<anychart.core.ui.LabelsFactory.Label>}
   * @private
   */
  this.labels_;

  /**
   * @type {Array.<string>}
   * @protected
   */
  this.settingsFieldsForMerge = ['background', 'padding', 'height', 'width', 'offsetY', 'offsetX', 'position', 'anchor',
    'rotation', 'textFormatter', 'positionFormatter', 'minFontSize', 'maxFontSize', 'fontSize', 'fontWeight', 'clip',
    'connectorStroke', 'textWrap', 'adjustFontSize', 'useHtml'
  ];

  /**
   * Theme settings.
   * @type {Object}
   */
  this.themeSettings = {};

  /**
   * Own settings (Settings set by user with API).
   * @type {Object}
   */
  this.ownSettings = {};

  /**
   * Auto values of settings set by external controller.
   * @type {!Object}
   */
  this.autoSettings = {};

  this.invalidate(anychart.ConsistencyState.ALL);
  this.resumeSignalsDispatching(false);
};
goog.inherits(anychart.core.ui.LabelsFactory, anychart.core.VisualBase);


//region --- Class const
/**
 * Supported consistency states.
 * @type {number}
 */
anychart.core.ui.LabelsFactory.prototype.SUPPORTED_SIGNALS = anychart.core.Text.prototype.SUPPORTED_SIGNALS;


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.core.ui.LabelsFactory.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.Text.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.LABELS_FACTORY_BACKGROUND |
    anychart.ConsistencyState.LABELS_FACTORY_HANDLERS |
    anychart.ConsistencyState.LABELS_FACTORY_CLIP |
    anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR;


/**
 * Enumeration to handle composite event handlers attachment on DOM create.
 * @const {Object.<number>}
 * @private
 */
anychart.core.ui.LabelsFactory.HANDLED_EVENT_TYPES_ = {
  /** Click. */
  'click': 0x01,

  /** Double click. */
  'dblclick': 0x02,

  /** Mouse down */
  'mousedown': 0x04,

  /** Mouse up */
  'mouseup': 0x08,

  /** Mouse over. */
  'mouseover': 0x10,

  /** Mouse out. */
  'mouseout': 0x20,

  /** Mouse move */
  'mousemove': 0x40,

  /** Touch start */
  'touchstart': 0x80,

  /** Touch move */
  'touchmove': 0x100,

  /** Touch end */
  'touchend': 0x200,

  /** Touch cancel.
   * @see http://www.w3.org/TR/2011/WD-touch-events-20110505/#the-touchcancel-event
   */
  'touchcancel': 0x400

  //  /** Tap (fast touchstart-touchend) */
  //  'tap': 0x800
};


/**
 * MAGIC NUMBERS!!! MAGIC NUMBERS!!!111
 * This is a lsh (<< - left shift) second argument to convert simple HANDLED_EVENT_TYPES code to a
 * CAPTURE HANDLED_EVENT_TYPES code! Tada!
 * @type {number}
 * @private
 */
anychart.core.ui.LabelsFactory.HANDLED_EVENT_TYPES_CAPTURE_SHIFT_ = 12;


//endregion
//region --- Settings
/**
 * Text descriptors.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.core.ui.LabelsFactory.prototype.TEXT_DESCRIPTORS =
    anychart.core.settings.createTextPropertiesDescriptors(
        anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
        anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
        anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED,
        anychart.Signal.NEEDS_REDRAW
    );
anychart.core.settings.populate(anychart.core.ui.LabelsFactory, anychart.core.ui.LabelsFactory.prototype.TEXT_DESCRIPTORS);


/**
 * Simple properties descriptors.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.core.ui.LabelsFactory.prototype.SIMPLE_PROPS_DESCRIPTORS = (function() {
  /** @type {!Object.<string, anychart.core.settings.PropertyDescriptor>} */
  var map = {};
  map['textFormatter'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'textFormatter',
      anychart.core.settings.stringOrFunctionNormalizer,
      anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['positionFormatter'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'positionFormatter',
      anychart.core.settings.stringOrFunctionNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['position'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'position',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['anchor'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'anchor',
      anychart.enums.normalizeAnchor,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['offsetX'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offsetX',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['offsetY'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offsetY',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['connectorStroke'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.MULTI_ARG,
      'connectorStroke',
      anychart.core.settings.strokeNormalizer,
      anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR,
      anychart.Signal.NEEDS_REDRAW);

  map['rotation'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'rotation',
      anychart.core.settings.numberNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['width'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'width',
      anychart.core.settings.numberOrPercentNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['height'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'height',
      anychart.core.settings.numberOrPercentNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['clip'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'clip',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.LABELS_FACTORY_CLIP,
      anychart.Signal.NEEDS_REDRAW);

  return map;
})();
anychart.core.settings.populate(anychart.core.ui.LabelsFactory, anychart.core.ui.LabelsFactory.prototype.SIMPLE_PROPS_DESCRIPTORS);


//----------------------------------------------------------------------------------------------------------------------
//
//  enabled.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Getter/setter for enabled.
 * @param {?boolean=} opt_value Value to set.
 * @return {!anychart.core.ui.LabelsFactory|boolean|null} .
 */
anychart.core.ui.LabelsFactory.prototype.enabled = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var prevEnabledState = this.getOption('enabled');
    this.ownSettings['enabled'] = opt_value;
    if (!goog.isNull(opt_value)) {
      if (goog.isNull(prevEnabledState) && !!opt_value) {
        this.invalidate(anychart.ConsistencyState.ENABLED, this.getEnableChangeSignals());
      }
      anychart.core.ui.LabelsFactory.base(this, 'enabled', /** @type {boolean} */(opt_value));
    } else {
      anychart.core.ui.LabelsFactory.base(this, 'enabled', true);
      this.markConsistent(anychart.ConsistencyState.ENABLED);
    }
    return this;
  }
  return /** @type {?boolean} */(this.getOption('enabled'));
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Background and Padding.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gets or sets the labels background settings.
 * @param {(string|Object|null|boolean)=} opt_value Background object to set.
 * @return {!(anychart.core.ui.LabelsFactory|anychart.core.ui.Background)} Returns the background or itself for chaining.
 */
anychart.core.ui.LabelsFactory.prototype.background = function(opt_value) {
  if (!this.ownSettings['background']) {
    var background = this.ownSettings['background'] = new anychart.core.ui.Background();
    background.markConsistent(anychart.ConsistencyState.ALL);
    background.listenSignals(this.backgroundInvalidated_, this);
  }

  if (goog.isDef(opt_value)) {
    this.ownSettings['background'].setup(opt_value);
    return this;
  }
  return this.ownSettings['background'];
};


/**
 * Internal background invalidation handler.
 * @param {anychart.SignalEvent} event Event object.
 * @private
 */
anychart.core.ui.LabelsFactory.prototype.backgroundInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REDRAW)) {
    this.ownSettings['background'].markConsistent(anychart.ConsistencyState.ALL);
    this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
  }
};


/**
 * Labels padding.
 * @param {(string|number|Array.<number|string>|{top:(number|string),left:(number|string),bottom:(number|string),right:(number|string)})=} opt_spaceOrTopOrTopAndBottom Space object or top or top and bottom
 *    space.
 * @param {(string|number)=} opt_rightOrRightAndLeft Right or right and left space.
 * @param {(string|number)=} opt_bottom Bottom space.
 * @param {(string|number)=} opt_left Left space.
 * @return {!(anychart.core.ui.LabelsFactory|anychart.core.utils.Padding)} Padding or LabelsFactory for chaining.
 */
anychart.core.ui.LabelsFactory.prototype.padding = function(opt_spaceOrTopOrTopAndBottom, opt_rightOrRightAndLeft, opt_bottom, opt_left) {
  if (!this.ownSettings['padding']) {
    var padding = this.ownSettings['padding'] = new anychart.core.utils.Padding();
    padding.listenSignals(this.paddingInvalidated_, this);
  }
  if (goog.isDef(opt_spaceOrTopOrTopAndBottom)) {
    this.ownSettings['padding'].setup.apply(this.ownSettings['padding'], arguments);
    return this;
  }
  return this.ownSettings['padding'];
};


/**
 * Listener for bounds invalidation.
 * @param {anychart.SignalEvent} event Invalidation event.
 * @private
 */
anychart.core.ui.LabelsFactory.prototype.paddingInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REAPPLICATION)) {
    this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
  }
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Text formatter.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gets text formatter.
 * @return {Function|string} Text formatter.
 */
anychart.core.ui.LabelsFactory.prototype.getTextFormatterInternal = function() {
  return /** @type {Function|string} */(this.getOwnOption('textFormatter'));
};


/**
 * Sets text formatter.
 * @param {Function|string} value Text formatter value.
 */
anychart.core.ui.LabelsFactory.prototype.setTextFormatterInternal = function(value) {
  this.setOption('textFormatter', value);
};


/**
 * Getter/setter for textSettings.
 * @param {(Object|string)=} opt_objectOrName Settings object or settings name or nothing to get complete object.
 * @param {(string|number|boolean|Function)=} opt_value Setting value if used as a setter.
 * @return {!(anychart.core.ui.LabelsFactory|Object|string|number|boolean)} A copy of settings or the title for chaining.
 */
anychart.core.ui.LabelsFactory.prototype.textSettings = function(opt_objectOrName, opt_value) {
  if (goog.isDef(opt_objectOrName)) {
    if (goog.isString(opt_objectOrName)) {
      if (goog.isDef(opt_value)) {
        if (opt_objectOrName in this.TEXT_DESCRIPTORS) {
          this[opt_objectOrName](opt_value);
        }
        return this;
      } else {
        return /** @type {!(Object|boolean|number|string)} */ (this.getOwnOption(opt_objectOrName));
      }
    } else if (goog.isObject(opt_objectOrName)) {
      for (var item in opt_objectOrName) {
        if (item in this.TEXT_DESCRIPTORS)
          this[item](opt_objectOrName[item]);
      }
    }
    return this;
  }

  var res = {};
  for (var key in this.ownSettings) {
    if (key in this.TEXT_DESCRIPTORS)
      res[key] = this.ownSettings[key];
  }
  return res;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Other settings.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Helper method.
 * @private
 * @return {boolean} is adjustment enabled.
 */
anychart.core.ui.LabelsFactory.prototype.adjustEnabled_ = function() {
  var adjustFontSize = this.getOption('adjustFontSize');
  return !!adjustFontSize && (adjustFontSize['width'] || adjustFontSize['height']);
};


/**
 * @param {(anychart.enums.AdjustFontSizeMode|string)=} opt_value Adjust font size mode to set.
 * @return {anychart.enums.AdjustFontSizeMode|anychart.core.ui.LabelsFactory}
 */
anychart.core.ui.LabelsFactory.prototype.adjustFontSizeMode = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.enums.normalizeAdjustFontSizeMode(opt_value);
    if (this.adjustFontSizeMode_ != opt_value) {
      this.adjustFontSizeMode_ = opt_value;
      if (this.adjustEnabled_())
        this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.adjustFontSizeMode_;
};


/**
 * Sets current ajust font size calculated for current bounds.
 * @param {null|string|number} value Adjusted font size.
 * @return {anychart.core.ui.LabelsFactory} Itself for chaining call.
 */
anychart.core.ui.LabelsFactory.prototype.setAdjustFontSize = function(value) {
  var needInvalidate = this.getOption('fontSize') != value;
  this.autoSettings['fontSize'] = value;
  if (needInvalidate)
    this.invalidate(anychart.ConsistencyState.BOUNDS);

  return this;
};


/**
 * Sets labels color that parent series have set for it.
 * @param {string} value Auto color distributed by the series.
 * @return {anychart.core.ui.LabelsFactory} Itself for chaining call.
 */
anychart.core.ui.LabelsFactory.prototype.setAutoColor = function(value) {
  var needInvalidate = this.getOption('fontColor') != value;
  this.autoSettings['fontColor'] = value;
  if (needInvalidate)
    this.invalidate(anychart.ConsistencyState.BOUNDS);

  return this;
};


//endregion
//region --- IResolvable implementation
/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.resolutionChainCache = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.resolutionChainCache_ = opt_value;
  }
  return this.resolutionChainCache_;
};


/**
 * Getter/setter for resolution low and high chain cache.
 * @param {Array.<Object|null|undefined>=} opt_value
 * @return {?Array.<Object|null|undefined>}
 */
anychart.core.ui.LabelsFactory.prototype.resolutionLowAndHighChainCache = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.resolutionLowAndHighChainCache_ = opt_value;
  }
  return this.resolutionLowAndHighChainCache_;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.getResolutionChain = function() {
  var chain = this.resolutionChainCache();
  if (!chain) {
    chain = goog.array.concat(this.getHighPriorityResolutionChain(), this.getMidPriorityResolutionChain(), this.getLowPriorityResolutionChain());
    this.resolutionChainCache(chain);
  }
  return chain;
};


/**
 * Gets chain of low and high priority settings.
 * @return {?Array.<Object|null|undefined>}
 */
anychart.core.ui.LabelsFactory.prototype.getLowAndHighResolutionChain = function() {
  var chain = this.resolutionLowAndHighChainCache();
  if (!chain) {
    chain = goog.array.concat(this.getHighPriorityResolutionChain(), this.getLowPriorityResolutionChain());
    this.resolutionLowAndHighChainCache(chain);
  }
  return chain;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.getLowPriorityResolutionChain = function() {
  var sett = [this.autoSettings];
  if (this.parent_) {
    sett = goog.array.concat(sett, this.parent_.getLowPriorityResolutionChain());
  }
  return sett;
};


/**
 * Gets chain of middle priority settings.
 * @return {Array.<Object|null|undefined>} - Chain of settings.
 */
anychart.core.ui.LabelsFactory.prototype.getMidPriorityResolutionChain = function() {
  var sett = [this.themeSettings];
  if (this.parent_) {
    sett = goog.array.concat(sett, this.parent_.getMidPriorityResolutionChain());
  }
  return sett;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.getHighPriorityResolutionChain = function() {
  var sett = [this.ownSettings];
  if (this.parent_) {
    sett = goog.array.concat(sett, this.parent_.getHighPriorityResolutionChain());
  }
  return sett;
};


//endregion
//region --- IObjectWithSettings implementation
/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.getOwnOption = function(name) {
  return this.ownSettings[name];
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.hasOwnOption = function(name) {
  return goog.isDefAndNotNull(this.ownSettings[name]);
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.getThemeOption = function(name) {
  return this.themeSettings[name];
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.getOption = anychart.core.settings.getOption;


/**
 * Returns own and auto option value.
 * @param {string} name .
 * @return {*}
 */
anychart.core.ui.LabelsFactory.prototype.getOwnAndAutoOption = function(name) {
  var chain = this.getLowAndHighResolutionChain();
  for (var i = 0; i < chain.length; i++) {
    var obj = chain[i];
    if (obj) {
      var res = obj[name];
      if (goog.isDef(res))
        return res;
    }
  }
  return void 0;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.setOption = function(name, value) {
  this.ownSettings[name] = value;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.check = function(flags) {
  return true;
};


//endregion
//region --- Settings management
/**
 * Returns object with changed states.
 * @return {Object.<boolean>}
 */
anychart.core.ui.LabelsFactory.prototype.getSettingsChangedStatesObj = function() {
  return this.ownSettings;
};


/**
 * Returns changed settings.
 * @return {Object}
 */
anychart.core.ui.LabelsFactory.prototype.getChangedSettings = function() {
  var result = {};
  goog.object.forEach(this.ownSettings, function(value, key) {
    if (value) {
      if (key == 'adjustByHeight' || key == 'adjustByWidth') {
        key = 'adjustFontSize';
      }

      result[key] = this[key]();
      if (key == 'padding' || key == 'background') {
        result[key] = this.getOwnOption(key).serialize();
      } else {
        result[key] = this.getOwnOption(key);
      }
    }
  }, this);
  return result;
};


//endregion
//region --- DOM Elements
/**
 * Returns DOM element.
 * @return {acgraph.vector.Layer}
 */
anychart.core.ui.LabelsFactory.prototype.getDomElement = function() {
  return this.layer_;
};


/**
 * Gets labels factory root layer;
 * @return {acgraph.vector.Layer}
 */
anychart.core.ui.LabelsFactory.prototype.getRootLayer = function() {
  return this.layer_;
};


//endregion
//region --- Labels management
/**
 * Clears an array of labels.
 * @param {number=} opt_index If set, removes only the label that is in passed index.
 * @return {anychart.core.ui.LabelsFactory} Returns itself for chaining.
 */
anychart.core.ui.LabelsFactory.prototype.clear = function(opt_index) {
  if (!this.freeToUseLabelsPool_)
    this.freeToUseLabelsPool_ = [];

  if (this.labels_ && this.labels_.length) {
    if (goog.isDef(opt_index)) {
      if (this.labels_[opt_index]) {
        this.labels_[opt_index].clear();
        this.freeToUseLabelsPool_.push(this.labels_[opt_index]);
        this.dropCallsCache(opt_index);
        delete this.labels_[opt_index];
      }
    } else {
      this.dropCallsCache();
      for (var i = this.labels_.length; i--;) {
        var label = this.labels_[i];
        if (label) {
          label.clear();
          this.freeToUseLabelsPool_.push(label);
        }
      }
      this.labels_.length = 0;
      this.invalidate(anychart.ConsistencyState.LABELS_FACTORY_HANDLERS, anychart.Signal.NEEDS_REDRAW);
    }
  } else
    this.labels_ = [];

  return this;
};


/**
 * Returns label by index (if there is such label).
 * @param {number} index Label index.
 * @return {anychart.core.ui.LabelsFactory.Label} Already existing label.
 */
anychart.core.ui.LabelsFactory.prototype.getLabel = function(index) {
  index = +index;
  return this.labels_ && this.labels_[index] ? this.labels_[index] : null;
};


/**
 * Labels count
 * @return {number}
 */
anychart.core.ui.LabelsFactory.prototype.labelsCount = function() {
  return this.labels_ ? this.labels_.length : 0;
};


/**
 * Creates new instance of anychart.core.ui.LabelsFactory.Label, saves it in the factory
 * and returns it.
 * @param {*} formatProvider Object that provides info for textFormatter function.
 * @param {*} positionProvider Object that provides info for positionFormatter function.
 * @param {number=} opt_index Label index.
 * @return {!anychart.core.ui.LabelsFactory.Label} Returns new label instance.
 */
anychart.core.ui.LabelsFactory.prototype.add = function(formatProvider, positionProvider, opt_index) {
  var label, index;
  if (!goog.isDef(this.labels_)) this.labels_ = [];

  if (goog.isDef(opt_index)) {
    index = +opt_index;
    label = this.labels_[index];
  }

  if (label) {
    label.suspendSignalsDispatching();
    label.clear();
  } else {
    label = this.freeToUseLabelsPool_ && this.freeToUseLabelsPool_.length > 0 ?
        this.freeToUseLabelsPool_.pop() :
        this.createLabel();
    label.suspendSignalsDispatching();

    if (goog.isDef(index)) {
      this.labels_[index] = label;
      label.setIndex(index);
    } else {
      this.labels_.push(label);
      label.setIndex(this.labels_.length - 1);
    }
  }

  label.formatProvider(formatProvider);
  label.positionProvider(positionProvider);
  label.setFactory(this);
  label.state('pointNormal', label);
  label.state('seriesNormal', this);
  label.state('seriesNormalTheme', this.themeSettings);
  label.resumeSignalsDispatching(false);

  return label;
};


/**
 * @protected
 * @return {anychart.core.ui.LabelsFactory.Label}
 */
anychart.core.ui.LabelsFactory.prototype.createLabel = function() {
  return new anychart.core.ui.LabelsFactory.Label();
};


//endregion
//region --- Drawing
/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.remove = function() {
  if (this.layer_) this.layer_.parent(null);
};


/**
 * Labels drawing.
 * @return {anychart.core.ui.LabelsFactory} Returns itself for chaining.
 */
anychart.core.ui.LabelsFactory.prototype.draw = function() {
  if (this.isDisposed())
    return this;

  if (!this.layer_) {
    this.layer_ = acgraph.layer();
    this.bindHandlersToGraphics(this.layer_);
  }

  var stage = this.container() ? this.container().getStage() : null;
  var manualSuspend = stage && !stage.isSuspended();
  if (manualSuspend) stage.suspend();

  if (this.labels_) {
    goog.array.forEach(this.labels_, function(label, index) {
      if (label) {
        label.container(this.layer_);
        label.draw();
      }
    }, this);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
    this.layer_.zIndex(/** @type {number} */(this.zIndex()));
    this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.CONTAINER)) {
    this.layer_.parent(/** @type {acgraph.vector.ILayer} */(this.container()));
    this.markConsistent(anychart.ConsistencyState.CONTAINER);
  }

  this.markConsistent(anychart.ConsistencyState.ALL);

  if (manualSuspend) stage.resume();
  return this;
};


//endregion
//region --- Measuring
/**
 * Returns label size.
 * @param {*|anychart.core.ui.LabelsFactory.Label} formatProviderOrLabel Object that provides info for textFormatter function.
 * @param {*=} opt_positionProvider Object that provides info for positionFormatter function.
 * @param {Object=} opt_settings .
 * @param {number=} opt_cacheIndex .
 * @return {anychart.math.Rect} Label bounds.
 */
anychart.core.ui.LabelsFactory.prototype.getDimension = function(formatProviderOrLabel, opt_positionProvider, opt_settings, opt_cacheIndex) {
  var text;
  var textElementBounds;
  var textWidth;
  var textHeight;
  /** @type {anychart.math.Rect} */
  var outerBounds = new anychart.math.Rect(0, 0, 0, 0);
  var isWidthSet;
  var isHeightSet;
  var parentWidth;
  var parentHeight;
  var formatProvider;
  var positionProvider;

  if (!this.measureCustomLabel_) {
    this.measureCustomLabel_ = this.createLabel();
    this.measureCustomLabel_.setFactory(this);
  } else {
    this.measureCustomLabel_.clear();
  }

  if (formatProviderOrLabel instanceof anychart.core.ui.LabelsFactory.Label) {
    var label = (/** @type {anychart.core.ui.LabelsFactory.Label} */(formatProviderOrLabel));
    this.measureCustomLabel_.setup(label.getMergedSettings());
    formatProvider = label.formatProvider();
    positionProvider = opt_positionProvider || label.positionProvider() || {'value' : {'x': 0, 'y': 0}};
  } else {
    formatProvider = formatProviderOrLabel;
    positionProvider = opt_positionProvider || {'value' : {'x': 0, 'y': 0}};
  }
  this.measureCustomLabel_.setup(opt_settings);

  var isHtmlLabel = this.measureCustomLabel_.getOption('useHtml');
  var isHtml = goog.isDef(isHtmlLabel) ? isHtmlLabel : this.getOption('useHtml');

  //we should ask text element about bounds only after text format and text settings are applied

  //define parent bounds
  var parentBounds = /** @type {anychart.math.Rect} */(this.parentBounds());
  if (parentBounds) {
    parentWidth = parentBounds.width;
    parentHeight = parentBounds.height;
  }

  var padding = this.measureCustomLabel_.getOption('padding') || this.getOption('padding') || null;
  var widthSettings = goog.isDef(this.measureCustomLabel_.getOption('width')) ? this.measureCustomLabel_.getOption('width') : this.getOption('width');
  var heightSettings = goog.isDef(this.measureCustomLabel_.getOption('height')) ? this.measureCustomLabel_.getOption('height') : this.getOption('height');
  var offsetY = /** @type {number|string} */(this.measureCustomLabel_.getOption('offsetY') || this.getOption('offsetY'));
  if (!goog.isDef(offsetY)) offsetY = 0;
  var offsetX = /** @type {number|string} */(this.measureCustomLabel_.getOption('offsetX') || this.getOption('offsetX'));
  if (!goog.isDef(offsetX)) offsetX = 0;
  var anchor = /** @type {string} */(this.measureCustomLabel_.getOption('anchor') || this.getOption('anchor'));
  var textFormatter = /** @type {Function|string} */(this.measureCustomLabel_.getOption('textFormatter') || this.getOption('textFormatter'));

  if (!this.measureTextElement_) {
    this.measureTextElement_ = acgraph.text();
    this.measureTextElement_.attr('aria-hidden', 'true');
  }

  text = this.callTextFormatter(textFormatter, formatProvider, opt_cacheIndex);
  this.measureTextElement_.width(null);
  this.measureTextElement_.height(null);
  if (isHtml) {
    this.measureTextElement_.htmlText(goog.isDefAndNotNull(text) ? String(text) : null);
  } else {
    this.measureTextElement_.text(goog.isDefAndNotNull(text) ? String(text) : null);
  }

  this.measureCustomLabel_.applyTextSettings(this.measureTextElement_, true, this.themeSettings);
  this.measureCustomLabel_.applyTextSettings.call(this, this.measureTextElement_);
  this.measureCustomLabel_.applyTextSettings(this.measureTextElement_);


  //define is width and height set from settings
  isWidthSet = !goog.isNull(widthSettings);
  isHeightSet = !goog.isNull(heightSettings);

  textElementBounds = this.measureTextElement_.getBounds();

  //calculate text width and outer width
  var width;
  if (isWidthSet) {
    width = Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(widthSettings), parentWidth));
    textWidth = padding ? padding.tightenWidth(width) : width;
    outerBounds.width = width;
  } else {
    width = textElementBounds.width;
    outerBounds.width = padding ? padding.widenWidth(width) : width;
  }

  if (goog.isDef(textWidth)) this.measureTextElement_.width(textWidth);

  textElementBounds = this.measureTextElement_.getBounds();

  //calculate text height and outer height
  var height;
  if (isHeightSet) {
    height = Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(heightSettings), parentHeight));
    textHeight = padding ? padding.tightenHeight(height) : height;
    outerBounds.height = height;
  } else {
    height = textElementBounds.height;
    outerBounds.height = padding ? padding.widenHeight(height) : height;
  }

  if (goog.isDef(textHeight)) this.measureTextElement_.height(textHeight);

  var formattedPosition = goog.object.clone(this.getOption('positionFormatter').call(positionProvider, positionProvider));

  return this.getDimensionInternal(outerBounds, formattedPosition, parentBounds, offsetX, offsetY, anchor);
};


/**
 * Get dimension internal
 * @param {anychart.math.Rect} outerBounds
 * @param {Object} formattedPosition
 * @param {anychart.math.Rect} parentBounds
 * @param {number|string} offsetX
 * @param {number|string} offsetY
 * @param {string} anchor
 * @return {anychart.math.Rect}
 */
anychart.core.ui.LabelsFactory.prototype.getDimensionInternal = function(outerBounds, formattedPosition, parentBounds, offsetX, offsetY, anchor) {
  var parentWidth, parentHeight;
  if (parentBounds) {
    parentWidth = parentBounds.width;
    parentHeight = parentBounds.height;
  }

  var position = new goog.math.Coordinate(formattedPosition['x'], formattedPosition['y']);
  var anchorCoordinate = anychart.utils.getCoordinateByAnchor(
      new anychart.math.Rect(0, 0, outerBounds.width, outerBounds.height),
      /** @type {string} */(anchor));

  position.x -= anchorCoordinate.x;
  position.y -= anchorCoordinate.y;

  offsetX = goog.isDef(offsetX) ? anychart.utils.normalizeSize(offsetX, parentWidth) : 0;
  offsetY = goog.isDef(offsetY) ? anychart.utils.normalizeSize(offsetY, parentHeight) : 0;

  anychart.utils.applyOffsetByAnchor(position, /** @type {anychart.enums.Anchor} */(anchor), offsetX, offsetY);

  outerBounds.left = position.x;
  outerBounds.top = position.y;

  return /** @type {anychart.math.Rect} */(outerBounds)
};


/**
 * Measure labels using formatProvider, positionProvider and returns labels bounds.
 * @param {*|anychart.core.ui.LabelsFactory.Label} formatProviderOrLabel Object that provides info for textFormatter function.
 * @param {*=} opt_positionProvider Object that provides info for positionFormatter function.
 * @param {Object=} opt_settings .
 * @param {number=} opt_cacheIndex .
 * @return {anychart.math.Rect} Labels bounds.
 */
anychart.core.ui.LabelsFactory.prototype.measure = function(formatProviderOrLabel, opt_positionProvider, opt_settings, opt_cacheIndex) {
  var arr = this.measureWithTransform(formatProviderOrLabel, opt_positionProvider, opt_settings, opt_cacheIndex);
  return anychart.math.Rect.fromCoordinateBox(arr);
};


/**
 * Measures label in its coordinate system and returns bounds as an array of points in parent coordinate system.
 * @param {*|anychart.core.ui.LabelsFactory.Label} formatProviderOrLabel Object that provides info for textFormatter function.
 * @param {*=} opt_positionProvider Object that provides info for positionFormatter function.
 * @param {Object=} opt_settings .
 * @param {number=} opt_cacheIndex .
 * @return {Array.<number>} Label bounds.
 */
anychart.core.ui.LabelsFactory.prototype.measureWithTransform = function(formatProviderOrLabel, opt_positionProvider, opt_settings, opt_cacheIndex) {
  var rotation, anchor;
  if (formatProviderOrLabel instanceof anychart.core.ui.LabelsFactory.Label) {
    var labelRotation = formatProviderOrLabel.getOption('rotation');
    rotation = goog.isDef(labelRotation) ? labelRotation : this.getOption('rotation') || 0;
    anchor = formatProviderOrLabel.getOption('anchor') || this.getOption('anchor');
    opt_cacheIndex = goog.isDef(opt_cacheIndex) ? opt_cacheIndex : formatProviderOrLabel.getIndex();
  } else {
    rotation = goog.isDef(opt_settings) && goog.isDef(opt_settings['rotation']) ? opt_settings['rotation'] : this.getOption('rotation') || 0;
    anchor = goog.isDef(opt_settings) && opt_settings['anchor'] || this.getOption('anchor');
  }

  var bounds = this.getDimension(formatProviderOrLabel, opt_positionProvider, opt_settings, opt_cacheIndex);

  var rotationAngle = /** @type {number} */(rotation);
  var point = anychart.utils.getCoordinateByAnchor(bounds, /** @type {anychart.enums.Anchor} */(anchor));
  var tx = goog.math.AffineTransform.getRotateInstance(goog.math.toRadians(rotationAngle), point.x, point.y);

  var arr = bounds.toCoordinateBox() || [];
  tx.transform(arr, 0, arr, 0, 4);

  return arr;
};


//endregion
//region --- TextFormatter calls management
/**
 * Calls text formatter in scope of provider, or returns value from cache.
 * @param {Function|string} formatter Text formatter function.
 * @param {*} provider Provider for text formatter.
 * @param {number=} opt_cacheIndex Label index.
 * @return {*}
 */
anychart.core.ui.LabelsFactory.prototype.callTextFormatter = function(formatter, provider, opt_cacheIndex) {
  if (goog.isString(formatter))
    formatter = anychart.core.utils.TokenParser.getInstance().getTextFormatter(formatter);
  if (!this.textFormatterCallsCache_)
    this.textFormatterCallsCache_ = {};
  if (goog.isDefAndNotNull(opt_cacheIndex)) {
    if (!goog.isDef(this.textFormatterCallsCache_[opt_cacheIndex])) {
      this.textFormatterCallsCache_[opt_cacheIndex] = formatter.call(provider, provider);
    }

    return this.textFormatterCallsCache_[opt_cacheIndex];
  }
  return formatter.call(provider, provider);
};


/**
 * Drops tet formatter calls cache.
 * @param {number=} opt_index
 * @return {anychart.core.ui.LabelsFactory} Self for chaining.
 */
anychart.core.ui.LabelsFactory.prototype.dropCallsCache = function(opt_index) {
  if (!goog.isDef(opt_index)) {
    this.textFormatterCallsCache_ = {};
  } else {
    if (this.textFormatterCallsCache_ && goog.isDef(this.textFormatterCallsCache_[opt_index])) {
      delete this.textFormatterCallsCache_[opt_index];
    }
  }
  return this;
};


//endregion
//region --- Interactivity
//----------------------------------------------------------------------------------------------------------------------
//
//  Events
//
//----------------------------------------------------------------------------------------------------------------------
/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.makeBrowserEvent = function(e) {
  var res = anychart.core.ui.LabelsFactory.base(this, 'makeBrowserEvent', e);
  var target = res['domTarget'];
  var tag;
  while (target instanceof acgraph.vector.Element) {
    tag = target.tag;
    if (tag instanceof anychart.core.VisualBase || !anychart.utils.isNaN(tag))
      break;
    target = target.parent();
  }
  res['labelIndex'] = anychart.utils.toNumber(tag);
  return res;
};


//endregion
//region --- Setup & Dispose
/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.disposeInternal = function() {
  goog.disposeAll(
      this.labels_,
      this.freeToUseLabelsPool_,
      this.measureCustomLabel_,
      this.layer_,
      this.background_,
      this.padding_);

  this.labels_ = null;
  this.freeToUseLabelsPool_ = null;
  this.measureCustomLabel_ = null;
  this.layer_ = null;
  this.background_ = null;
  this.padding_ = null;

  anychart.core.ui.LabelsFactory.base(this, 'disposeInternal');
};


/**
 * Sets default settings.
 * @param {!Object} config .
 */
anychart.core.ui.LabelsFactory.prototype.setThemeSettings = function(config) {
  for (var name in this.TEXT_DESCRIPTORS) {
    var val = config[name];
    if (goog.isDef(val))
      this.themeSettings[name] = val;
  }
  for (var name in this.SIMPLE_PROPS_DESCRIPTORS) {
    var val = config[name];
    if (goog.isDef(val))
      this.themeSettings[name] = val;
  }

  if ('enabled' in config) this.themeSettings['enabled'] = config['enabled'];
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.serialize = function() {
  var json = anychart.core.ui.LabelsFactory.base(this, 'serialize');
  // if (goog.isNull(json['enabled'])) delete json['enabled'];
  // if (this.background_) json['background'] = this.background_.serialize();
  // if (this.padding_) json['padding'] = this.padding_.serialize();
  // if (this.changedSettings['position']) json['position'] = this.position();
  // if (this.changedSettings['anchor']) json['anchor'] = this.anchor();
  // if (this.changedSettings['offsetX']) json['offsetX'] = this.offsetX();
  // if (this.changedSettings['offsetY']) json['offsetY'] = this.offsetY();
  // if (this.changedSettings['rotation']) json['rotation'] = this.rotation();
  // if (this.changedSettings['width']) json['width'] = this.width();
  // if (this.changedSettings['height']) json['height'] = this.height();
  // if (this.changedSettings['connectorStroke']) json['connectorStroke'] = this.connectorStroke();
  // if (this.changedSettings['adjustByHeight'] || this.changedSettings['adjustByWidth'])
  //   json['adjustFontSize'] = this.adjustFontSize();
  // if (goog.isDef(this.minFontSize())) json['minFontSize'] = this.minFontSize();
  // if (goog.isDef(this.maxFontSize())) json['maxFontSize'] = this.maxFontSize();
  //
  // if (goog.isFunction(this.textFormatter_)) {
  //   anychart.core.reporting.warning(
  //       anychart.enums.WarningCode.CANT_SERIALIZE_FUNCTION,
  //       null,
  //       ['Labels textFormatter']
  //   );
  // } else {
  //   if (goog.isDef(this.textFormatter_)) json['textFormatter'] = this.textFormatter_;
  // }

  return json;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.setupByJSON = function(config, opt_default) {
  var enabledState = this.enabled();
  anychart.core.ui.LabelsFactory.base(this, 'setupByJSON', config, opt_default);

  if (opt_default) {
    this.setThemeSettings(config);
  } else {
    anychart.core.settings.deserialize(this, this.TEXT_DESCRIPTORS, config);
    anychart.core.settings.deserialize(this, this.SIMPLE_PROPS_DESCRIPTORS, config);
    this.enabled('enabled' in config ? config['enabled'] : enabledState);
  }

  if ('background' in config)
    this.background().setupByVal(config['background'], opt_default);

  if ('padding' in config)
    this.padding().setupByVal(config['padding'], opt_default);
};
//endregion



/**
 * Class for creation of sets of similar labels and management of such sets.
 * Any individual label can be changed after all labels are displayed.
 * @constructor
 * @implements {anychart.core.settings.IObjectWithSettings}
 * @implements {anychart.core.settings.IResolvable}
 * @extends {anychart.core.VisualBase}
 */
anychart.core.ui.LabelsFactory.Label = function() {
  anychart.core.ui.LabelsFactory.Label.base(this, 'constructor');

  /**
   * Label index.
   * @type {number}
   * @private
   */
  this.index_;

  /**
   * Label layer
   * @type {acgraph.vector.Layer}
   * @private
   */
  this.layer_;

  /**
   * @type {acgraph.vector.Text}
   * @protected
   */
  this.textElement;

  /**
   * @type {anychart.core.ui.Background}
   * @private
   */
  this.backgroundElement_;

  /**
   * @type {Object}
   * @protected
   */
  this.mergedSettings;

  /**
   * States.
   * @type {Object}
   * @private
   */
  this.states_ = {};

  /**
   * Own settings (Settings set by user with API).
   * @type {Object}
   */
  this.ownSettings = {};

  /**
   * Auto values of settings set by external controller.
   * @type {!Object}
   */
  this.autoSettings = {};

  /**
   * Default drawing plan.
   * @type {Array.<string>}
   * @private
   */
  this.defaultDrawingPlan_ = [
    'pointState',
    'seriesState',
    'chartState',
    'pointNormal',
    'seriesNormal',
    'chartNormal',
    'seriesStateTheme',
    'chartStateTheme',
    'auto',
    'seriesNormalTheme',
    'chartNormalTheme'
  ];

  /**
   * Drawing plan.
   * @type {Array.<string>}
   * @private
   */
  this.drawingPlan_ = goog.array.slice(this.defaultDrawingPlan_, 0);

  this.resetSettings();
};
goog.inherits(anychart.core.ui.LabelsFactory.Label, anychart.core.VisualBase);


//region --- Class const
/**
 * Supported signals.
 * @type {number}
 */
anychart.core.ui.LabelsFactory.Label.prototype.SUPPORTED_SIGNALS = anychart.core.Text.prototype.SUPPORTED_SIGNALS;


/**
 * Supported consistency states.
 * @type {number}
 */
anychart.core.ui.LabelsFactory.Label.prototype.SUPPORTED_CONSISTENCY_STATES =
    anychart.core.Text.prototype.SUPPORTED_CONSISTENCY_STATES |
    anychart.ConsistencyState.LABELS_FACTORY_CLIP |
    anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR;


//endregion
//region --- Dom elements
/**
 * Returns DOM element.
 * @return {acgraph.vector.Layer}
 */
anychart.core.ui.LabelsFactory.Label.prototype.getDomElement = function() {
  return this.layer_;
};


/**
 * Returns connector graphics element.
 * @return {acgraph.vector.Layer}
 */
anychart.core.ui.LabelsFactory.Label.prototype.getConnectorElement = function() {
  return this.connector;
};


//endregion
//region --- States
/**
 * Root factory.
 * @param {anychart.core.ui.LabelsFactory} value .
 */
anychart.core.ui.LabelsFactory.Label.prototype.setFactory = function(value) {
  this.factory_ = value;
};


/**
 * Return Root factory.
 * @return {anychart.core.ui.LabelsFactory} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.getFactory = function() {
  return this.factory_;
};


/**
 * Gets/sets parent LabelsFactory.
 * @param {!anychart.core.ui.LabelsFactory=} opt_value labels factory.
 * @return {anychart.core.ui.LabelsFactory|anychart.core.ui.LabelsFactory.Label} Returns LabelsFactory or self
 * for method chainging.
 */
anychart.core.ui.LabelsFactory.Label.prototype.parentLabelsFactory = function(opt_value) {
  if (goog.isDefAndNotNull(opt_value)) {
    if (this.state('seriesNormal') != opt_value) {
      this.setFactory(opt_value);
      this.state('seriesNormal', opt_value);
      this.state('seriesNormalTheme', opt_value ? opt_value.themeSettings : null);
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  } else {
    return /** @type {anychart.core.ui.LabelsFactory} */(this.state('seriesNormal'));
  }
};


/**
 * Gets/sets LabelsFactory to a label.
 * @param {anychart.core.ui.LabelsFactory=} opt_value labels factory.
 * @return {anychart.core.ui.LabelsFactory|anychart.core.ui.LabelsFactory.Label} Returns LabelsFactory or self
 * for method chainging.
 */
anychart.core.ui.LabelsFactory.Label.prototype.currentLabelsFactory = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.state('seriesState') != opt_value) {
      this.state('seriesState', opt_value);
      this.state('seriesStateTheme', opt_value ? opt_value.themeSettings : null);
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  } else {
    return /** @type {anychart.core.ui.LabelsFactory} */(this.state('seriesState'));
  }
};


/**
 * @param {string} name State name.
 * @param {Object=} opt_value State settings.
 * @param {?number=} opt_priority State settings.
 * @return {anychart.core.ui.LabelsFactory|Object}
 */
anychart.core.ui.LabelsFactory.Label.prototype.state = function(name, opt_value, opt_priority) {
  if (goog.isDef(opt_value)) {
    if (goog.isDef(opt_priority)) {
      opt_priority = anychart.utils.toNumber(opt_priority);
    }

    if (this.states_[name] != opt_value || this.drawingPlan_.indexOf(name) != opt_priority) {
      this.states_[name] = opt_value;

      if (this.drawingPlan_.indexOf(name) == -1)
        opt_priority = this.drawingPlan_.length;

      if (!isNaN(opt_priority))
        this.stateOrder(name, opt_priority);

      this.invalidate(anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.ENABLED,
          anychart.Signal.BOUNDS_CHANGED | anychart.Signal.NEEDS_REDRAW);
    }

    return this;
  }

  return this.states_[name];
};


/**
 * Drawing plan.
 * @param {null|string|Array<anychart.core.ui.LabelsFactory.Label|anychart.core.ui.LabelsFactory|Object|string>} nameOrSet State name or array of states.
 * @param {number=} opt_value Priority value. 0 is more priority than 1. if passed 'null' - auto mode - last priority value.
 * @return {anychart.core.ui.LabelsFactory.Label|number} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.stateOrder = function(nameOrSet, opt_value) {
  var invalidate = false;
  if (goog.isDef(opt_value) && goog.isString(nameOrSet)) {
    opt_value = anychart.utils.toNumber(opt_value);
    var index = this.drawingPlan_.indexOf(/** @type {string} */(nameOrSet));

    if (index == opt_value)
      return this;

    if (index != -1) {
      goog.array.moveItem(this.drawingPlan_, index, isNaN(opt_value) ? this.drawingPlan_.length - 1 : opt_value - 1);
    } else {
      goog.array.insertAt(this.drawingPlan_, nameOrSet, isNaN(opt_value) ? this.drawingPlan_.length : opt_value);
    }
    invalidate = true;

    return this;
  } else if (goog.isArray(nameOrSet)) {
    this.drawingPlan_ = goog.array.slice(nameOrSet, 0);
    invalidate = true;
  } else if (goog.isNull(nameOrSet)) {
    this.drawingPlan_ = goog.array.slice(this.defaultDrawingPlan_, 0);
    invalidate = true;
  }
  if (invalidate) {
    this.invalidate(anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.ENABLED,
        anychart.Signal.BOUNDS_CHANGED | anychart.Signal.NEEDS_REDRAW);
  }

  return this.drawingPlan_.indexOf(/** @type {string} */(nameOrSet));
};


/**
 * Invalidation state checker.
 * @param {number} state .
 * @return {boolean} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.checkInvalidationState = function(state) {
  return /** @type {boolean} */(this.iterateDrawingPlans_(function(state, settings) {
    if (settings instanceof anychart.core.ui.LabelsFactory.Label || settings instanceof anychart.core.ui.LabelsFactory) {
      if (settings.hasInvalidationState(state))
        return true;
    }
  }) || this.hasInvalidationState(state));
};


//endregion
//region --- Settings
/**
 * Text descriptors.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.core.ui.LabelsFactory.Label.prototype.TEXT_DESCRIPTORS =
    anychart.core.settings.createTextPropertiesDescriptors(
        anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
        anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
        anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED,
        anychart.Signal.NEEDS_REDRAW
    );
anychart.core.settings.populate(anychart.core.ui.LabelsFactory.Label, anychart.core.ui.LabelsFactory.Label.prototype.TEXT_DESCRIPTORS);


/**
 * Simple properties descriptors.
 * @type {!Object.<string, anychart.core.settings.PropertyDescriptor>}
 */
anychart.core.ui.LabelsFactory.Label.prototype.SIMPLE_PROPS_DESCRIPTORS = (function() {
  /** @type {!Object.<string, anychart.core.settings.PropertyDescriptor>} */
  var map = {};
  map['textFormatter'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'textFormatter',
      anychart.core.settings.stringOrFunctionNormalizer,
      anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['positionFormatter'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'positionFormatter',
      anychart.core.settings.stringOrFunctionNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['position'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'position',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['anchor'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'anchor',
      anychart.enums.normalizeAnchor,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['offsetX'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offsetX',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['offsetY'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offsetY',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['connectorStroke'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.MULTI_ARG,
      'connectorStroke',
      anychart.core.settings.strokeNormalizer,
      anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR,
      anychart.Signal.NEEDS_REDRAW);

  map['rotation'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'rotation',
      anychart.core.settings.numberNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['width'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'width',
      anychart.core.settings.numberOrPercentNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['height'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'height',
      anychart.core.settings.numberOrPercentNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['clip'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'clip',
      anychart.core.settings.asIsNormalizer,
      anychart.ConsistencyState.LABELS_FACTORY_CLIP,
      anychart.Signal.NEEDS_REDRAW);

  map['enabled'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'enabled',
      anychart.core.settings.boolOrNullNormalizer,
      anychart.ConsistencyState.ENABLED,
      anychart.Signal.BOUNDS_CHANGED | anychart.Signal.NEEDS_REDRAW);

  return map;
})();
anychart.core.settings.populate(anychart.core.ui.LabelsFactory.Label, anychart.core.ui.LabelsFactory.Label.prototype.SIMPLE_PROPS_DESCRIPTORS);


//----------------------------------------------------------------------------------------------------------------------
//
//  Internal settings.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Returns label index.
 * @return {number}
 */
anychart.core.ui.LabelsFactory.Label.prototype.getIndex = function() {
  return this.index_;
};


/**
 * Sets labels index.
 * @param {number} index Index to set.
 * @return {anychart.core.ui.LabelsFactory.Label}
 */
anychart.core.ui.LabelsFactory.Label.prototype.setIndex = function(index) {
  this.index_ = +index;
  return this;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Background and Padding.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gets or sets the Label background settings.
 * @param {(string|Object|null|boolean)=} opt_value Background object to set.
 * @return {!(anychart.core.ui.LabelsFactory.Label|anychart.core.ui.Background)} Returns background or itself for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.background = function(opt_value) {
  var makeDefault = goog.isNull(opt_value);
  if (!makeDefault && !this.ownSettings['background']) {
    this.ownSettings['background'] = new anychart.core.ui.Background();
    this.ownSettings['background'].setup(anychart.getFullTheme('standalones.labelsFactory.background'));
    this.ownSettings['background'].listenSignals(this.backgroundInvalidated_, this);
  }

  if (goog.isDef(opt_value)) {
    if (makeDefault) {
      goog.dispose(this.ownSettings['background']);
    } else
      this.ownSettings['background'].setup(opt_value);
    return this;
  }
  return this.ownSettings['background'];
};


/**
 * Internal background invalidation handler.
 * @param {anychart.SignalEvent} event Event object.
 * @private
 */
anychart.core.ui.LabelsFactory.Label.prototype.backgroundInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REDRAW)) {
    this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
  }
};


/**
 * Getter for current label padding.<br/>
 * @param {(null|anychart.core.utils.Padding|string|number|Array.<number|string>|{top:(number|string),left:(number|string),bottom:(number|string),right:(number|string)})=} opt_spaceOrTopOrTopAndBottom .
 * @param {(string|number)=} opt_rightOrRightAndLeft .
 * @param {(string|number)=} opt_bottom .
 * @param {(string|number)=} opt_left .
 * @return {anychart.core.ui.LabelsFactory.Label|anychart.core.utils.Padding} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.padding = function(opt_spaceOrTopOrTopAndBottom, opt_rightOrRightAndLeft, opt_bottom, opt_left) {
  var makeDefault = goog.isNull(opt_spaceOrTopOrTopAndBottom);
  if (!makeDefault && !this.ownSettings['padding']) {
    this.ownSettings['padding'] = new anychart.core.utils.Padding();
    this.ownSettings['padding'].listenSignals(this.boundsInvalidated_, this);
  }
  if (goog.isDef(opt_spaceOrTopOrTopAndBottom)) {
    if (makeDefault) {
      goog.dispose(this.ownSettings['padding']);
    } else if (opt_spaceOrTopOrTopAndBottom instanceof anychart.core.utils.Padding) {
      for (var name in anychart.core.utils.Space.SIMPLE_PROPS_DESCRIPTORS) {
        var val = opt_spaceOrTopOrTopAndBottom.getOption(name);
        this.ownSettings['padding'].setOption(name, val);
      }
    } else {
      this.ownSettings['padding'].setup.apply(this.ownSettings['padding'], arguments);
    }
    return this;
  }
  return this.ownSettings['padding'];
};


/**
 * Listener for bounds invalidation.
 * @param {anychart.SignalEvent} event Invalidation event.
 * @private
 */
anychart.core.ui.LabelsFactory.Label.prototype.boundsInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REAPPLICATION)) {
    this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
  }
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Auto settings.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Sets labels color that parent series have set for it.
 * @param {number=} opt_value Auto rotation angle.
 * @return {number|anychart.core.ui.LabelsFactory.Label}
 */
anychart.core.ui.LabelsFactory.Label.prototype.autoRotation = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.utils.toNumber(opt_value);
    if (this.autoSettings['rotation'] !== opt_value) {
      this.autoSettings['rotation'] = opt_value;
      if (!goog.isDef(this.ownSettings['rotation']) || isNaN(this.ownSettings['rotation']))
        this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return isNaN(this.autoSettings['rotation']) ? undefined : this.autoSettings['rotation'];
  }
};


/**
 * Getter for label anchor settings.
 * @param {(anychart.enums.Anchor|string)=} opt_value .
 * @return {!anychart.core.ui.LabelsFactory.Label|anychart.enums.Anchor} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.autoAnchor = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var value = goog.isNull(opt_value) ? null : anychart.enums.normalizeAnchor(opt_value);
    if (this.autoSettings['anchor'] !== value) {
      this.autoSettings['anchor'] = value;
      if (!goog.isDef(this.ownSettings['anchor']))
        this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.autoSettings['anchor'];
  }
};


/**
 * Defines whether label is vertical.
 * @param {(boolean)=} opt_value .
 * @return {!anychart.core.ui.LabelsFactory.Label|boolean} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.autoVertical = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var value = !!opt_value;
    if (this.autoSettings['vertical'] !== value) {
      this.autoSettings['vertical'] = value;
      if (!goog.isDef(this.autoSettings['vertical']))
        this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.autoSettings['vertical'];
  }
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Checkers.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Helper method.
 * @private
 * @return {boolean} is adjustment enabled.
 */
anychart.core.ui.LabelsFactory.Label.prototype.adjustEnabled_ = function() {
  var adjustFontSize = this.getOption('adjustFontSize');
  return !!adjustFontSize && (adjustFontSize['width'] || adjustFontSize['height']);
};


/**
 * Check
 * @param {number} width
 * @param {number} height
 * @param {number} originWidth
 * @param {number} originHeight
 * @param {boolean} adjustByWidth
 * @param {boolean} adjustByHeight
 * @private
 * @return {number}
 */
anychart.core.ui.LabelsFactory.Label.prototype.check_ = function(width, height, originWidth, originHeight, adjustByWidth, adjustByHeight) {
  if (adjustByWidth && adjustByHeight) {
    if (width > originWidth || height > originHeight) {
      return 1;
    } else if (width < originWidth || height < originHeight) {
      return -1;
    }
  } else if (adjustByWidth) {
    if (width < originWidth) {
      return -1;
    } else if (width > originWidth) {
      return 1;
    }
  } else if (adjustByHeight) {
    if (height < originHeight) {
      return -1;
    } else if (height > originHeight) {
      return 1;
    }
  }

  return 0;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Providers.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gets/Sets format provider.
 * @param {*=} opt_value Format provider.
 * @return {*} Format provider or self for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.formatProvider = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.formatProvider_ != opt_value) {
      this.formatProvider_ = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  } else {
    return this.formatProvider_;
  }
};


/**
 * Gets/Sets position provider.
 * @param {*=} opt_value Position provider.
 * @return {*} Position provider or self for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.positionProvider = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.positionProvider_ != opt_value) {
      this.positionProvider_ = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.positionProvider_;
  }
};


//endregion
//region --- IResolvable implementation
/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.resolutionChainCache = function(opt_value) {
  if (goog.isDef(opt_value)) {
    this.resolutionChainCache_ = opt_value;
  }
  return this.resolutionChainCache_;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.getResolutionChain = function() {
  var chain = this.resolutionChainCache();
  if (!chain) {
    chain = this.getHighPriorityResolutionChain();
    this.resolutionChainCache(chain);
  }
  return chain;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.getLowPriorityResolutionChain = function() {
  return [];
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.getHighPriorityResolutionChain = function() {
  return [this.ownSettings];
};


//endregion
//region --- IObjectWithSettings implementation
/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.getOwnOption = function(name) {
  return this.ownSettings[name];
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.hasOwnOption = function(name) {
  return goog.isDefAndNotNull(this.ownSettings[name]);
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.getOption = anychart.core.settings.getOption;


/**
 * Returns own and auto option value.
 * @type {*}
 */
anychart.core.ui.LabelsFactory.Label.prototype.getOwnAndAutoOption = anychart.core.ui.LabelsFactory.Label.prototype.getOwnOption;


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.getThemeOption = anychart.core.ui.LabelsFactory.Label.prototype.getOwnOption;


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.setOption = function(name, value) {
  this.ownSettings[name] = value;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.check = function(flags) {
  return true;
};


//endregion
//region --- Settings manipulations
/**
 * Reset settings.
 */
anychart.core.ui.LabelsFactory.Label.prototype.resetSettings = function() {
  if (this.ownSettings['background']) {
    goog.dispose(this.ownSettings['background']);
    this.ownSettings['background'] = null;
  }

  if (this.ownSettings['padding']) {
    goog.dispose(this.ownSettings['padding']);
    this.ownSettings['padding'] = null;
  }

  this.ownSettings = {};
  this.states_ = {
    'pointNormal': this
  };
  if (this.factory_) {
    this.states_['seriesNormal'] = this.factory_;
    this.states_['seriesNormalTheme'] = this.factory_.themeSettings;
  }
  this.dropMergedSettings();
};


/**
 * Sets settings.
 * @param {Object=} opt_settings1 Settings1.
 * @param {Object=} opt_settings2 Settings2.
 * @return {anychart.core.ui.LabelsFactory.Label} Returns self for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.setSettings = function(opt_settings1, opt_settings2) {
  if (goog.isDef(opt_settings1)) {
    this.setup(opt_settings1);
  }
  if (goog.isDefAndNotNull(opt_settings2)) {
    this.states_['pointState'] = opt_settings2;
  }

  if (goog.isDef(opt_settings1) || goog.isDef(opt_settings2))
    this.invalidate(anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.ENABLED,
        anychart.Signal.BOUNDS_CHANGED | anychart.Signal.NEEDS_REDRAW);
  return this;
};


/**
 * Returns final value of settings with passed name.
 * @param {string} value Name of settings.
 * @return {*} settings value.
 */
anychart.core.ui.LabelsFactory.Label.prototype.getFinalSettings = function(value) {
  if (value == 'adjustFontSize') {
    var adjustByWidth = this.resolveSetting_(value, function(value) {
      return value.width;
    });
    var adjustByHeight = this.resolveSetting_(value, function(value) {
      return value.height;
    });
    return {width: adjustByWidth, height: adjustByHeight};
  } else {
    return this.resolveSetting_(value);
  }
};


/**
 * Drawing plans iterator.
 * @param {Function} handler .
 * @param {boolean=} opt_invert .
 * @return {*}
 * @private
 */
anychart.core.ui.LabelsFactory.Label.prototype.iterateDrawingPlans_ = function(handler, opt_invert) {
  var iterator = opt_invert ? goog.array.findRight : goog.array.find;

  var result = void 0;
  var ths = this;

  iterator(this.drawingPlan_, function(state, i) {
    var stateSettings = goog.isString(state) ? state == 'auto' ? ths.autoSettings : ths.states_[state] : state;

    if (!stateSettings)
      return;

    result = handler.call(ths, state, stateSettings, i);
    if (goog.isDef(result))
      return true;
  });

  return result;
};


/**
 * Settings resolver.
 * @param {string} field
 * @param {Function=} opt_handler
 * @return {*}
 * @private
 */
anychart.core.ui.LabelsFactory.Label.prototype.resolveSetting_ = function(field, opt_handler) {
  return this.iterateDrawingPlans_(function(state, settings) {
    var setting;

    if (settings instanceof anychart.core.ui.LabelsFactory.Label || settings instanceof anychart.core.ui.LabelsFactory) {
      if (field == 'enabled') {
        setting = !goog.isNull(settings[field]()) ? settings[field]() : undefined;
      } else {
        setting = settings.getOption(field);
      }
    } else if (goog.isObject(settings)) {
      if (field == 'adjustFontSize') {
        setting = this.normalizeAdjustFontSize(settings[field]);
      } else {
        setting = settings[field];
      }
    }

    if (opt_handler && goog.isDef(setting))
      setting = opt_handler(setting);

    return setting;
  });
};


/**
 * Drops merged settings.
 */
anychart.core.ui.LabelsFactory.Label.prototype.dropMergedSettings = function() {
  this.mergedSettings = null;
};


/**
 * AdjustFontSize normalizer.
 * @param {Object=} opt_value
 * @return {{width:boolean,height:boolean}} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.normalizeAdjustFontSize = function(opt_value) {
  var adjustByWidth, adjustByHeight;
  if (goog.isDef(opt_value)) {
    if (goog.isArray(opt_value)) {
      adjustByWidth = opt_value[0];
      adjustByHeight = opt_value[1];
    } else if (goog.isObject(opt_value)) {
      adjustByWidth = opt_value['width'];
      adjustByHeight = opt_value['height'];
    } else {
      adjustByWidth = !!opt_value;
      adjustByHeight = !!opt_value;
    }
  } else {
    adjustByWidth = void 0;
    adjustByHeight = void 0;
  }

  return {width: adjustByWidth, height: adjustByHeight};
};


/**
 * Returns merged settings.
 * @return {!Object}
 */
anychart.core.ui.LabelsFactory.Label.prototype.getMergedSettings = function() {
  if (this.mergedSettings)
    return goog.object.clone(this.mergedSettings);

  var factory = this.factory_;
  var fields = factory.settingsFieldsForMerge;

  var mergedSettings = {};
  for (var i = 0, len = fields.length; i < len; i++) {
    var field = fields[i];
    var finalSettings = this.getFinalSettings(field);

    if (field == 'adjustFontSize') {
      mergedSettings['adjustByWidth'] = finalSettings.width;
      mergedSettings['adjustByHeight'] = finalSettings.height;
    } else {
      mergedSettings[field] = finalSettings;
    }
  }

  this.mergedSettings = mergedSettings;
  return goog.object.clone(this.mergedSettings);
};


//endregion
//region --- Measuring and calculations
/**
 * Adjust font size by width/height.
 * @param {number} originWidth
 * @param {number} originHeight
 * @param {number} minFontSize
 * @param {number} maxFontSize
 * @param {boolean} adjustByWidth
 * @param {boolean} adjustByHeight
 * @return {number}
 */
anychart.core.ui.LabelsFactory.Label.prototype.calculateFontSize = function(originWidth, originHeight, minFontSize, maxFontSize, adjustByWidth, adjustByHeight) {
  /** @type {acgraph.vector.Text} */
  var text = this.createSizeMeasureElement_();

  /** @type {number} */
  var fontSize = Math.round((maxFontSize + minFontSize) / 2);

  /** @type {number} */
  var from = minFontSize;

  /** @type {number} */
  var to = maxFontSize;

  /** @type {number} */
  var checked;

  // check if the maximal value is ok
  text.fontSize(maxFontSize);

  if (this.check_(text.getBounds().width, text.getBounds().height, originWidth, originHeight, adjustByWidth, adjustByHeight) <= 0) {
    return maxFontSize;
  }
  // set initial fontSize - that's half way between min and max
  text.fontSize(fontSize);
  // check sign
  var sign = checked = this.check_(text.getBounds().width, text.getBounds().height, originWidth, originHeight, adjustByWidth, adjustByHeight);

  // divide in half and iterate waiting for the sign to change
  while (from != to) {
    if (checked < 0) {
      from = Math.min(fontSize + 1, to);
      fontSize += Math.floor((to - fontSize) / 2);
    } else if (checked > 0) {
      to = Math.max(fontSize - 1, from);
      fontSize -= Math.ceil((fontSize - from) / 2);
    } else {
      break;
    }
    text.fontSize(fontSize);
    checked = this.check_(text.getBounds().width, text.getBounds().height, originWidth, originHeight, adjustByWidth, adjustByHeight);
    // sign chaneged if product is negative, 0 is an exit too
    if (sign * checked <= 0) {
      break;
    }
  }

  if (!checked) {
    // size is exactly ok for the bounds set
    return fontSize;
  }

  // iterate increase/decrease font size until sign changes again
  do {
    fontSize += sign;
    text.fontSize(fontSize);
    checked = this.check_(text.getBounds().width, text.getBounds().height, originWidth, originHeight, adjustByWidth, adjustByHeight);
  } while (sign * checked < 0);

  // decrease font size only if we've been increasing it - we are looking for size to fit in bounds
  if (sign > 0) fontSize -= sign;
  return fontSize;
};


/**
 * Creates and returns size measure element.
 * @return {!acgraph.vector.Text}
 * @private
 */
anychart.core.ui.LabelsFactory.Label.prototype.createSizeMeasureElement_ = function() {
  var mergedSettings = this.getMergedSettings();

  var isHtml = mergedSettings['useHtml'];
  var formatProvider = this.formatProvider();
  var text = this.factory_.callTextFormatter(mergedSettings['textFormatter'], formatProvider, this.getIndex());

  if (!this.fontSizeMeasureElement_) {
    this.fontSizeMeasureElement_ = acgraph.text();
    this.fontSizeMeasureElement_.attr('aria-hidden', 'true');
  }

  if (isHtml) this.fontSizeMeasureElement_.htmlText(goog.isDef(text) ? String(text) : '');
  else this.fontSizeMeasureElement_.text(goog.isDef(text) ? String(text) : '');

  this.iterateDrawingPlans_(function(state, settings, index) {
    var isInit = index == 0;
    if (settings instanceof anychart.core.ui.LabelsFactory || settings instanceof anychart.core.ui.LabelsFactory.Label) {
      this.applyTextSettings.call(settings, this.fontSizeMeasureElement_, isInit);
    } else {
      this.applyTextSettings(this.fontSizeMeasureElement_, isInit, settings);
    }
  }, true);

  return this.fontSizeMeasureElement_;
};


//endregion
//region --- Drawing
/**
 * Resets label to the initial state, but leaves DOM elements intact, but without the parent.
 */
anychart.core.ui.LabelsFactory.Label.prototype.clear = function() {
  this.resetSettings();
  if (this.layer_) {
    this.layer_.parent(null);
    this.layer_.removeAllListeners();
  }
  this.invalidate(anychart.ConsistencyState.CONTAINER);
};


/**
 * Label drawing.
 * @param {anychart.math.Rect} bounds Outter label bounds.
 * @param {anychart.math.Rect} parentBounds Parent bounds.
 */
anychart.core.ui.LabelsFactory.Label.prototype.drawLabel = function(bounds, parentBounds) {
  var positionFormatter = this.mergedSettings['positionFormatter'];
  var anchor = this.mergedSettings['anchor'];
  var isAutoAnchor = anchor === anychart.enums.Anchor.AUTO;
  var isVertical = false;
  if (isAutoAnchor) {
    anchor = this.autoAnchor();
    isVertical = this.autoVertical();
  }
  var offsetX = this.mergedSettings['offsetX'];
  var offsetY = this.mergedSettings['offsetY'];

  var parentWidth = 0, parentHeight = 0;
  if (parentBounds) {
    parentWidth = parentBounds.width;
    parentHeight = parentBounds.height;
  }

  var positionProvider = this.positionProvider();
  var formattedPosition = goog.object.clone(positionFormatter.call(positionProvider, positionProvider));
  var position = new goog.math.Coordinate(formattedPosition['x'], formattedPosition['y']);

  var connectorPoint = positionProvider && positionProvider['connectorPoint'];
  if (this.connector) {
    this.connector.clear();
    this.connector.setTransformationMatrix(1, 0, 0, 1, 0, 0);
  }
  if (connectorPoint) {
    if (!this.connector) {
      this.connector = this.layer_.path();
      this.connector.disableStrokeScaling(true);
    }
    this.connector.stroke(this.mergedSettings['connectorStroke']);
    var formattedConnectorPosition = goog.object.clone(positionFormatter.call(connectorPoint, connectorPoint));
    this.connector.moveTo(position.x, position.y).lineTo(formattedConnectorPosition['x'], formattedConnectorPosition['y']);
  }

  var anchorCoordinate = anychart.utils.getCoordinateByAnchor(
      new anychart.math.Rect(0, 0, bounds.width, bounds.height), anchor);

  position.x -= anchorCoordinate.x;
  position.y -= anchorCoordinate.y;

  var offsetXNormalized = goog.isDef(offsetX) ? anychart.utils.normalizeSize(/** @type {number|string} */(offsetX), parentWidth) : 0;
  var offsetYNormalized = goog.isDef(offsetY) ? anychart.utils.normalizeSize(/** @type {number|string} */(offsetY), parentHeight) : 0;

  if (isVertical)
    anychart.utils.applyOffsetByAnchor(position, anchor, offsetYNormalized, offsetXNormalized);
  else
    anychart.utils.applyOffsetByAnchor(position, anchor, offsetXNormalized, offsetYNormalized);

  this.textX += position.x;
  this.textY += position.y;
  bounds.left = position.x;
  bounds.top = position.y;

  this.textElement.x(/** @type {number} */(this.textX)).y(/** @type {number} */(this.textY));
};


/**
 * Connector drawing.
 */
anychart.core.ui.LabelsFactory.Label.prototype.drawConnector = function() {
  var positionProvider = this.positionProvider();
  var positionFormatter = this.mergedSettings['positionFormatter'];
  var formattedPosition = goog.object.clone(positionFormatter.call(positionProvider, positionProvider));
  var position = new goog.math.Coordinate(formattedPosition['x'], formattedPosition['y']);

  var connectorPoint = positionProvider && positionProvider['connectorPoint'];
  if (this.connector) {
    this.connector.clear();
    this.connector.setTransformationMatrix(1, 0, 0, 1, 0, 0);
  }
  if (connectorPoint) {
    if (!this.connector) {
      this.connector = this.layer_.path();
      this.connector.disableStrokeScaling(true);
    }
    this.connector.stroke(this.mergedSettings['connectorStroke']);
    var formattedConnectorPosition = goog.object.clone(positionFormatter.call(connectorPoint, connectorPoint));
    this.connector.moveTo(position.x, position.y).lineTo(formattedConnectorPosition['x'], formattedConnectorPosition['y']);
  }
};


/**
 * Applies text settings to text element.
 * @param {!acgraph.vector.Text} textElement Text element to apply settings to.
 * @param {boolean} isInitial - Whether is initial operation.
 * @param {Object=} opt_settings .
 * @this {anychart.core.ui.LabelsFactory.Label|anychart.core.ui.LabelsFactory}
 */
anychart.core.ui.LabelsFactory.Label.prototype.applyTextSettings = function(textElement, isInitial, opt_settings) {
  var textVal, useHtml, text;
  var target = goog.isDef(opt_settings) ?
      function(value) {return opt_settings[value]} :
      this instanceof anychart.core.ui.LabelsFactory.Label ?
          this.getOwnOption :
          anychart.core.ui.LabelsFactory.prototype.getOwnAndAutoOption;

  textVal = target.call(this, 'text');
  useHtml = target.call(this, 'useHtml');

  if (isInitial || goog.isDef(textVal) || goog.isDef(useHtml)) {
    text = /** @type {string} */(textVal);
    if (useHtml) {
      textElement.htmlText(text);
    } else {
      textElement.text(text);
    }
  }

  textElement.fontSize(/** @type {number|string} */ (target.call(this, 'fontSize')));
  textElement.fontFamily(/** @type {string} */ (target.call(this, 'fontFamily')));
  textElement.color(/** @type {string} */ (target.call(this, 'fontColor')));
  textElement.direction(/** @type {string} */ (target.call(this, 'textDirection')));
  textElement.textWrap(/** @type {string} */ (target.call(this, 'textWrap')));
  textElement.opacity(/** @type {number} */ (target.call(this, 'fontOpacity')));
  textElement.decoration(/** @type {string} */ (target.call(this, 'fontDecoration')));
  textElement.fontStyle(/** @type {string} */ (target.call(this, 'fontStyle')));
  textElement.fontVariant(/** @type {string} */ (target.call(this, 'fontVariant')));
  textElement.fontWeight(/** @type {number|string} */ (target.call(this, 'fontWeight')));
  textElement.letterSpacing(/** @type {number|string} */ (target.call(this, 'letterSpacing')));
  textElement.lineHeight(/** @type {number|string} */ (target.call(this, 'lineHeight')));
  textElement.textIndent(/** @type {number} */ (target.call(this, 'textIndent')));
  textElement.vAlign(/** @type {string} */ (target.call(this, 'vAlign')));
  textElement.hAlign(/** @type {string} */ (target.call(this, 'hAlign')));
  textElement.textOverflow(/** @type {string} */ (target.call(this, 'textOverflow')));
  textElement.selectable(/** @type {boolean} */ (target.call(this, 'selectable')));
  textElement.disablePointerEvents(/** @type {boolean} */ (target.call(this, 'disablePointerEvents')));
};


/**
 * Label drawing.
 * @return {anychart.core.ui.LabelsFactory.Label} Returns self for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.draw = function() {
  var factory = this.factory_;
  var mergedSettings;

  if (!this.layer_) this.layer_ = acgraph.layer();
  this.layer_.tag = this.index_;

  var enabled = this.getFinalSettings('enabled');

  if (this.checkInvalidationState(anychart.ConsistencyState.ENABLED)) {
    if (!enabled) {
      if (this.layer_) this.layer_.parent(null);
      this.markConsistent(anychart.ConsistencyState.ALL);
      return this;
    } else {
      if (this.container() && !this.layer_.parent())
        this.layer_.parent(/** @type {acgraph.vector.ILayer} */(this.container()));
      this.markConsistent(anychart.ConsistencyState.ENABLED);
    }
  }
  if (this.checkInvalidationState(anychart.ConsistencyState.CONTAINER)) {
    if (enabled) {
      if ((!this.factory_.enabled() || (goog.isDef(this.enabled()) && !this.enabled())) && this.factory_.getDomElement()) {
        if (!this.container()) this.container(factory.getDomElement());
        if (!this.container().parent()) {
          this.container().parent(/** @type {acgraph.vector.ILayer} */(factory.container()));
        }
      }
      if (this.container())
        this.layer_.parent(/** @type {acgraph.vector.ILayer} */(this.container()));
    }
    this.markConsistent(anychart.ConsistencyState.CONTAINER);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.Z_INDEX)) {
    if (this.container()) this.container().zIndex(/** @type {number} */(factory.zIndex()));
    this.layer_.zIndex(/** @type {number} */(this.zIndex()));
    this.markConsistent(anychart.ConsistencyState.Z_INDEX);
  }

  if (this.checkInvalidationState(anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS)) {
    this.dropMergedSettings();
    this.getMergedSettings();
    mergedSettings = this.mergedSettings;

    var formatProvider = this.formatProvider();
    if (goog.isDef(formatProvider) && formatProvider['series'] && (!this.textFormatterCallsCache_ || !goog.isDef(this.textFormatterCallsCache_[this.getIndex()]))) {
      var series = /** @type {{getIterator: Function}} */ (formatProvider['series']);
      series.getIterator().select(goog.isDef(formatProvider['index']) ? formatProvider['index'] : this.getIndex());
    }
    var text = factory.callTextFormatter(mergedSettings['textFormatter'], formatProvider, this.getIndex());

    this.layer_.setTransformationMatrix(1, 0, 0, 1, 0, 0);

    if (!this.backgroundElement_) {
      this.backgroundElement_ = new anychart.core.ui.Background();
      this.backgroundElement_.zIndex(0);
      this.backgroundElement_.container(this.layer_);
    }
    if (mergedSettings['background'] instanceof anychart.core.ui.Background)
      this.backgroundElement_.setup(mergedSettings['background'].serialize());
    else
      this.backgroundElement_.setup(mergedSettings['background']);
    this.backgroundElement_.draw();


    if (!this.textElement) {
      this.textElement = acgraph.text();
      this.textElement.attr('aria-hidden', 'true');
      this.textElement.zIndex(1);
      this.textElement.parent(this.layer_);
      this.textElement.disablePointerEvents(true);
    }

    //define parent bounds
    var parentWidth, parentHeight;
    var parentBounds = /** @type {anychart.math.Rect} */(this.iterateDrawingPlans_(function(state, settings) {
      if (settings instanceof anychart.core.ui.LabelsFactory) {
        parentBounds = settings.parentBounds();
        if (parentBounds)
          return parentBounds;
      }
    }));

    if (!parentBounds) {
      if (factory.container()) {
        parentBounds = factory.container().getBounds();
      } else {
        parentBounds = anychart.math.rect(0, 0, 0, 0);
      }
    }
    if (parentBounds) {
      parentWidth = parentBounds.width;
      parentHeight = parentBounds.height;
    }

    var isHtml = this.mergedSettings['useHtml'];

    this.textElement.width(null);
    this.textElement.height(null);

    if (isHtml) this.textElement.htmlText(goog.isDef(text) ? String(text) : '');
    else this.textElement.text(goog.isDef(text) ? String(text) : '');

    this.iterateDrawingPlans_(function(state, settings, index) {
      var isInit = index == 0;
      if (settings instanceof anychart.core.ui.LabelsFactory || settings instanceof anychart.core.ui.LabelsFactory.Label) {
        this.applyTextSettings.call(settings, this.textElement, isInit);
      } else {
        this.applyTextSettings(this.textElement, isInit, settings);
      }
    }, true);

    //define is width and height set from settings
    var isWidthSet = !goog.isNull(mergedSettings['width']);
    var isHeightSet = !goog.isNull(mergedSettings['height']);

    /** @type  {anychart.math.Rect} */
    var outerBounds = new anychart.math.Rect(0, 0, 0, 0);
    //calculate text width and outer width

    var padding;
    if (mergedSettings['padding'] instanceof anychart.core.utils.Padding) {
      padding = mergedSettings['padding'];
    } else if (goog.isObject(mergedSettings['padding']) || goog.isNumber(mergedSettings['padding']) || goog.isString(mergedSettings['padding'])) {
      padding = new anychart.core.utils.Padding();
      padding.setup(mergedSettings['padding']);
    }

    var autoWidth;
    var autoHeight;
    var textElementBounds;

    var width, textWidth;
    if (isWidthSet) {
      width = Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(mergedSettings['width']), parentWidth));
      if (padding) {
        textWidth = padding.tightenWidth(width);
        this.textX = anychart.utils.normalizeSize(padding.getOption('left'), width);
      } else {
        this.textX = 0;
        textWidth = width;
      }
      outerBounds.width = width;
      autoWidth = false;
    } else {
      //we should ask text element about bounds only after text format and text settings are applied
      textElementBounds = this.textElement.getBounds();
      width = textElementBounds.width;
      if (padding) {
        outerBounds.width = padding.widenWidth(width);
        this.textX = anychart.utils.normalizeSize(padding.getOption('left'), outerBounds.width);
      } else {
        this.textX = 0;
        outerBounds.width = width;
      }
      autoWidth = true;
    }
    if (goog.isDef(textWidth)) this.textElement.width(textWidth);

    //calculate text height and outer height
    var height, textHeight;
    if (isHeightSet) {
      height = Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(mergedSettings['height']), parentHeight));
      if (padding) {
        textHeight = padding.tightenHeight(height);
        this.textY = anychart.utils.normalizeSize(padding.getOption('top'), height);
      } else {
        this.textY = 0;
        textHeight = height;
      }
      outerBounds.height = height;
      autoHeight = false;
    } else {
      //we should ask text element about bounds only after text format and text settings are applied
      textElementBounds = this.textElement.getBounds();
      height = textElementBounds.height;
      if (padding) {
        outerBounds.height = padding.widenHeight(height);
        this.textY = anychart.utils.normalizeSize(padding.getOption('top'), outerBounds.height);
      } else {
        this.textY = 0;
        outerBounds.height = height;
      }
      autoHeight = true;
    }

    if (goog.isDef(textHeight)) this.textElement.height(textHeight);

    var canAdjustByWidth = !autoWidth;
    var canAdjustByHeight = !autoHeight;
    var needAdjust = ((canAdjustByWidth && mergedSettings['adjustByHeight']) || (canAdjustByHeight && mergedSettings['adjustByHeight']));

    if (needAdjust) {
      var calculatedFontSize;
      if (factory.adjustFontSizeMode() == anychart.enums.AdjustFontSizeMode.DIFFERENT) {
        calculatedFontSize = this.calculateFontSize(
            textWidth,
            textHeight,
            mergedSettings['minFontSize'],
            mergedSettings['maxFontSize'],
            mergedSettings['adjustByWidth'],
            mergedSettings['adjustByHeight']);
      } else {
        calculatedFontSize = this.iterateDrawingPlans_(function(state, settings) {
          if (settings instanceof anychart.core.ui.LabelsFactory) {
            if (goog.isDef(settings.autoSettings['fontSize']))
              return settings.autoSettings['fontSize'];
          }
        });
      }

      this.suspendSignalsDispatching();

      this.textElement.fontSize(/** @type {number|string} */(calculatedFontSize));

      //need fix outer bounds after applying adjust font size
      if (isWidthSet) {
        width = Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(mergedSettings['width']), parentWidth));
        outerBounds.width = width;
      } else {
        //we should ask text element about bounds only after text format and text settings are applied
        textElementBounds = this.textElement.getBounds();
        width = textElementBounds.width;
        if (padding) {
          outerBounds.width = padding.widenWidth(width);
        } else {
          outerBounds.width = width;
        }
      }

      if (isHeightSet) {
        height = Math.ceil(anychart.utils.normalizeSize(/** @type {number|string} */(mergedSettings['height']), parentHeight));
        outerBounds.height = height;
      } else {
        //we should ask text element about bounds only after text format and text settings are applied
        textElementBounds = this.textElement.getBounds();
        height = textElementBounds.height;
        if (padding) {
          outerBounds.height = padding.widenHeight(height);
        } else {
          outerBounds.height = height;
        }
      }

      this.resumeSignalsDispatching(false);
    }

    this.drawLabel(outerBounds, parentBounds);

    this.backgroundElement_.parentBounds(outerBounds);
    this.backgroundElement_.draw();

    var coordinateByAnchor = anychart.utils.getCoordinateByAnchor(outerBounds, mergedSettings['anchor']);
    this.layer_.setRotation(/** @type {number} */(mergedSettings['rotation']), coordinateByAnchor.x, coordinateByAnchor.y);

    this.invalidate(anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR);
    this.markConsistent(anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS);
  }

  if (this.hasInvalidationState(anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR)) {
    this.drawConnector();
    this.markConsistent(anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR);
  }

  if (this.checkInvalidationState(anychart.ConsistencyState.LABELS_FACTORY_CLIP)) {
    mergedSettings = this.getMergedSettings();
    if (this.layer_)
      this.layer_.clip(mergedSettings['clip']);
    this.markConsistent(anychart.ConsistencyState.LABELS_FACTORY_CLIP);
  }
  return this;
};


//endregion
//region --- Setup & Dispose
/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.serialize = function() {
  var json = anychart.core.ui.LabelsFactory.Label.base(this, 'serialize');
  // if (goog.isDef(this.settingsObj['background'])) json['background'] = this.background().serialize();
  // if (goog.isDef(this.settingsObj['padding'])) json['padding'] = this.padding().serialize();
  // if (goog.isDef(this.position())) json['position'] = this.position();
  // if (goog.isDef(this.anchor())) json['anchor'] = this.anchor();
  // if (goog.isDef(this.offsetX())) json['offsetX'] = this.offsetX();
  // if (goog.isDef(this.offsetY())) json['offsetY'] = this.offsetY();
  // if (goog.isDef(this.connectorStroke())) json['connectorStroke'] = this.connectorStroke();
  // if (goog.isDef(this.width())) json['width'] = this.width();
  // if (goog.isDef(this.height())) json['height'] = this.height();
  // if (goog.isDef(this.rotation())) json['rotation'] = this.rotation();
  // if (!goog.isDef(this.enabled())) delete json['enabled'];
  // if (goog.isDef(this.settingsObj.adjustByHeight) || goog.isDef(this.settingsObj.adjustByWidth))
  //   json['adjustFontSize'] = this.adjustFontSize();
  // if (goog.isDef(this.minFontSize())) json['minFontSize'] = this.minFontSize();
  // if (goog.isDef(this.maxFontSize())) json['maxFontSize'] = this.maxFontSize();

  return json;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.setupByJSON = function(config, opt_default) {
  var enabledState = this.getOption('enabled');

  anychart.core.settings.deserialize(this, this.TEXT_DESCRIPTORS, config);
  anychart.core.settings.deserialize(this, this.SIMPLE_PROPS_DESCRIPTORS, config);

  anychart.core.ui.LabelsFactory.Label.base(this, 'setupByJSON', config, opt_default);

  if (!goog.isDef(config['enabled'])) delete this.ownSettings['enabled'];
  this.setOption('enabled', 'enabled' in config ? config['enabled'] : enabledState);

  if ('background' in config)
    this.background(config['background']);

  if ('padding' in config)
    this.padding(config['padding']);
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.disposeInternal = function() {
  goog.disposeAll(
      this.ownSettings['background'],
      this.ownSettings['padding'],
      this.backgroundElement_,
      this.textElement,
      this.layer_);

  this.backgroundElement_ = null;
  this.textElement = null;
  this.ownSettings['background'] = null;
  this.ownSettings['padding'] = null;

  anychart.core.ui.LabelsFactory.Label.base(this, 'disposeInternal');
};
//endregion


//region --- Exports
//exports
(function() {
  var proto = anychart.core.ui.LabelsFactory.prototype;
  proto['background'] = proto.background;
  proto['padding'] = proto.padding;
  proto['enabled'] = proto.enabled;
  // proto['textFormatter'] = proto.textFormatter;
  // proto['positionFormatter'] = proto.positionFormatter;
  // proto['position'] = proto.position;
  // proto['anchor'] = proto.anchor;
  // proto['offsetX'] = proto.offsetX;
  // proto['offsetY'] = proto.offsetY;
  // proto['connectorStroke'] = proto.connectorStroke;
  // proto['rotation'] = proto.rotation;
  // proto['width'] = proto.width;
  // proto['height'] = proto.height;
  // proto['adjustFontSize'] = proto.adjustFontSize;
  // proto['minFontSize'] = proto.minFontSize;
  // proto['maxFontSize'] = proto.maxFontSize;

  proto = anychart.core.ui.LabelsFactory.Label.prototype;
  proto['getIndex'] = proto.getIndex;
  proto['padding'] = proto.padding;
  proto['background'] = proto.background;
  proto['clear'] = proto.clear;
  proto['draw'] = proto.draw;
  // proto['autoAnchor'] = proto.autoAnchor;//don't public
  // proto['autoRotation'] = proto.autoRotation;//don't public
  // proto['rotation'] = proto.rotation;
  // proto['textFormatter'] = proto.textFormatter;
  // proto['positionFormatter'] = proto.positionFormatter;
  // proto['position'] = proto.position;
  // proto['anchor'] = proto.anchor;
  // proto['offsetX'] = proto.offsetX;
  // proto['offsetY'] = proto.offsetY;
  // proto['connectorStroke'] = proto.connectorStroke;
  // proto['width'] = proto.width;
  // proto['height'] = proto.height;
  // proto['enabled'] = proto.enabled;
  // proto['adjustFontSize'] = proto.adjustFontSize;
  // proto['minFontSize'] = proto.minFontSize;
  // proto['maxFontSize'] = proto.maxFontSize;
})();
//endregion
