//region --- Requiring and Providing
goog.provide('anychart.core.ui.LabelsFactory');
goog.provide('anychart.core.ui.LabelsFactory.Label');
goog.require('acgraph.math');
goog.require('anychart.core.IStandaloneBackend');
goog.require('anychart.core.Text');
goog.require('anychart.core.reporting');
goog.require('anychart.core.ui.Background');
goog.require('anychart.core.utils.Padding');
goog.require('anychart.core.utils.TokenParser');
goog.require('anychart.enums');
goog.require('anychart.math.Rect');
goog.require('goog.math.Coordinate');
//endregion



//region --- LabelsFactory
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
   * Enabled state.
   * @type {?boolean}
   * @private
   */
  this.enabledState_ = null;

  /**
   * Labels width settings.
   * @type {string|number|null}
   * @private
   */
  this.width_;

  /**
   * Labels height settings.
   * @type {string|number|null}
   * @private
   */
  this.height_;

  /**
   * Rotation angle.
   * @type {number}
   * @private
   */
  this.rotationAngle_;

  /**
   * Clip settings.
   * @type {anychart.math.Rect}
   * @private
   */
  this.clip_;

  /**
   * Labels position settings.
   * @type {string}
   * @private
   */
  this.position_;

  /**
   * Labels anchor settings.
   * @type {?anychart.enums.Anchor}
   * @private
   */
  this.anchor_;

  /**
   * Offset by X coordinate from labels position.
   * @type {number|string}
   * @private
   */
  this.offsetX_;

  /**
   * Offset by Y coordinate from labels position.
   * @type {number|string}
   * @private
   */
  this.offsetY_;

  /**
   * Label text formatting function, by default we use value field of the format provider.
   * @type {Function|string}
   * @private
   */
  this.textFormatter_;

  /**
   * Label position function, by default we use value obtained from context.
   * @type {Function}
   * @private
   */
  this.positionFormatter_;

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
   * Adjust font size by width.
   * @type {boolean}
   * @private
   */
  this.adjustByWidth_;

  /**
   * Adjust font size by height.
   * @type {boolean}
   * @private
   */
  this.adjustByHeight_;

  /**
   * Minimimum font size for adjusting from.
   * @type {number}
   * @private
   */
  this.minFontSize_;

  /**
   * Maximum font size for adjusting to.
   * @type {number}
   * @private
   */
  this.maxFontSize_;

  /**
   * @type {Object.<boolean>}
   * @protected
   */
  this.changedSettings = {};

  /**
   * @type {Array.<string>}
   * @protected
   */
  this.settingsFieldsForMerge = ['background', 'padding', 'height', 'width', 'offsetY', 'offsetX', 'position', 'anchor',
    'rotation', 'textFormatter', 'positionFormatter', 'minFontSize', 'maxFontSize', 'fontSize', 'fontWeight', 'clip',
    'connectorStroke', 'textWrap', 'adjustFontSize', 'useHtml'
  ];

  /**
   * States.
   * @type {Object.<string, Object>}
   * @private
   */
  this.states_ = {};

  this.adjustFontSizeMode('different');

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
anychart.core.ui.LabelsFactory.TEXT_DESCRIPTORS =
    anychart.core.settings.createTextPropertiesDescriptors(
        anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
        anychart.ConsistencyState.APPEARANCE | anychart.ConsistencyState.BOUNDS,
        anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED,
        anychart.Signal.NEEDS_REDRAW
    );
anychart.core.settings.populate(anychart.core.ui.LabelsFactory, anychart.core.ui.LabelsFactory.TEXT_DESCRIPTORS);

anychart.core.ui.LabelsFactory.SIMPLE_PROPS_DESCRIPTORS = (function() {
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
      anychart.enums.asIsNormalizer,
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
      anychart.enums.asIsNormalizer,
      anychart.ConsistencyState.BOUNDS,
      anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);

  map['offsetY'] = anychart.core.settings.createDescriptor(
      anychart.enums.PropertyHandlerType.SINGLE_ARG,
      'offsetY',
      anychart.enums.asIsNormalizer,
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
      anychart.enums.asIsNormalizer,
      anychart.ConsistencyState.LABELS_FACTORY_CLIP,
      anychart.Signal.NEEDS_REDRAW);

  return map;
})();
anychart.core.settings.populate(anychart.core.ui.LabelsFactory, anychart.core.ui.LabelsFactory.SIMPLE_PROPS_DESCRIPTORS);


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
    var prevEnabledState = this.enabledState_;
    this.enabledState_ = opt_value;
    this.changedSettings['enabled'] = true;
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
  return this.enabledState_;
};


//----------------------------------------------------------------------------------------------------------------------
//
//  Background.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Gets or sets the labels background settings.
 * @param {(string|Object|null|boolean)=} opt_value Background object to set.
 * @return {!(anychart.core.ui.LabelsFactory|anychart.core.ui.Background)} Returns the background or itself for chaining.
 */
anychart.core.ui.LabelsFactory.prototype.background = function(opt_value) {
  if (!this.background_) {
    this.background_ = new anychart.core.ui.Background();
    this.background_.markConsistent(anychart.ConsistencyState.ALL);
    this.background_.listenSignals(this.backgroundInvalidated_, this);
  }

  if (goog.isDef(opt_value)) {
    this.changedSettings['background'] = true;
    this.background_.setup(opt_value);
    return this;
  }
  return this.background_;
};


/**
 * Internal background invalidation handler.
 * @param {anychart.SignalEvent} event Event object.
 * @private
 */
anychart.core.ui.LabelsFactory.prototype.backgroundInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REDRAW)) {
    this.changedSettings['background'] = true;
    this.background_.markConsistent(anychart.ConsistencyState.ALL);
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
  if (!this.padding_) {
    this.padding_ = new anychart.core.utils.Padding();
    this.padding_.listenSignals(this.paddingInvalidated_, this);
  }
  if (goog.isDef(opt_spaceOrTopOrTopAndBottom)) {
    this.changedSettings['padding'] = true;
    this.padding_.setup.apply(this.padding_, arguments);
    return this;
  }
  return this.padding_;
};


/**
 * Listener for bounds invalidation.
 * @param {anychart.SignalEvent} event Invalidation event.
 * @private
 */
anychart.core.ui.LabelsFactory.prototype.paddingInvalidated_ = function(event) {
  if (event.hasSignal(anychart.Signal.NEEDS_REAPPLICATION)) {
    this.changedSettings['padding'] = true;
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
  return this.getOwnOption('textFormatter');
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
//  Position.
//
//----------------------------------------------------------------------------------------------------------------------
/**
 * Helper method.
 * @private
 * @return {boolean} is adjustment enabled.
 */
anychart.core.ui.LabelsFactory.prototype.adjustEnabled_ = function() {
  var adjustFontSize = this.getOption('adjustFontSize');
  return (adjustFontSize['width'] || adjustFontSize['height']);
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
 * Resolution chain getter.
 * @return {Array.<Object|null|undefined>} - Chain of settings.
 */
anychart.core.ui.LabelsFactory.prototype.getResolutionChain = function() {
  var chain = this.resolutionChainCache();
  if (!chain) {
    chain = goog.array.concat(this.getHighPriorityResolutionChain(), this.getMidPriorityResolutionChain(), this.getLowPriorityResolutionChain());
    this.resolutionChainCache(chain);
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


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.setOption = function(name, value) {
  this.ownSettings[name] = value;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.prototype.check = function(flags) {
  return true;
};
//endregion
//region --- Settings managment
/**
 * Returns object with changed states.
 * @return {Object.<boolean>}
 */
anychart.core.ui.LabelsFactory.prototype.getSettingsChangedStatesObj = function() {
  return this.changedSettings;
};


/**
 * Returns changed settings.
 * @return {Object}
 */
anychart.core.ui.LabelsFactory.prototype.getChangedSettings = function() {
  var result = {};
  goog.object.forEach(this.changedSettings, function(value, key) {
    if (value) {
      if (key == 'adjustByHeight' || key == 'adjustByWidth') {
        key = 'adjustFontSize';
      }
      if (key == 'padding' || key == 'background') {
        result[key] = this[key]().serialize();
      } else {
        result[key] = this[key]();
      }
    }
  }, this);
  return result;
};


/**
 * @param {string} name State name.
 * @param {Object=} opt_value State settings.
 * @return {anychart.core.ui.LabelsFactory|Object}
 */
anychart.core.ui.LabelsFactory.prototype.state = function(name, opt_value) {
  if (goog.isDef(opt_value)) {
    this.states_[name] = opt_value;
    return this;
  }

  return this.states_[name];
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
//region --- Labels managment
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
  // label.parentLabelsFactory(this);
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
/**
 * Applies text settings to text element.
 * @param {boolean} isInitial - Whether is initial operation.
 */
anychart.core.ui.LabelsFactory.prototype.applyTextSettings = function(isInitial) {
  var textVal = this.getOption('text');
  var useHtml = this.getOption('useHtml');

  if (isInitial || goog.isDef(textVal) || goog.isDef(useHtml)) {
    var text = /** @type {string} */(textVal);
    if (useHtml) {
      this.text_.htmlText(text);
    } else {
      this.text_.text(text);
    }
  }
  this.text_.fontSize(/** @type {number|string} */ (this.getOption('fontSize')));
  this.text_.fontFamily(/** @type {string} */ (this.getOption('fontFamily')));
  this.text_.color(/** @type {string} */ (this.getOption('fontColor')));
  this.text_.direction(/** @type {string} */ (this.getOption('textDirection')));
  this.text_.textWrap(/** @type {string} */ (this.getOption('textWrap')));
  this.text_.opacity(/** @type {number} */ (this.getOption('fontOpacity')));
  this.text_.decoration(/** @type {string} */ (this.getOption('fontDecoration')));
  this.text_.fontStyle(/** @type {string} */ (this.getOption('fontStyle')));
  this.text_.fontVariant(/** @type {string} */ (this.getOption('fontVariant')));
  this.text_.fontWeight(/** @type {number|string} */ (this.getOption('fontWeight')));
  this.text_.letterSpacing(/** @type {number|string} */ (this.getOption('letterSpacing')));
  this.text_.lineHeight(/** @type {number|string} */ (this.getOption('lineHeight')));
  this.text_.textIndent(/** @type {number} */ (this.getOption('textIndent')));
  this.text_.vAlign(/** @type {string} */ (this.getOption('vAlign')));
  this.text_.hAlign(/** @type {string} */ (this.getOption('hAlign')));
  this.text_.textOverflow(/** @type {string} */ (this.getOption('textOverflow')));
  this.text_.selectable(/** @type {boolean} */ (this.getOption('selectable')));
  this.text_.disablePointerEvents(/** @type {boolean} */ (this.getOption('disablePointerEvents')));
};


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
    this.measureCustomLabel_ = new anychart.core.ui.LabelsFactory.Label();
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
  this.measureCustomLabel_.setSettings(opt_settings);

  var isHtml = goog.isDef(this.measureCustomLabel_.useHtml()) ? this.measureCustomLabel_.useHtml() : this.useHtml();

  //we should ask text element about bounds only after text format and text settings are applied

  //define parent bounds
  var parentBounds = /** @type {anychart.math.Rect} */(this.parentBounds());
  if (parentBounds) {
    parentWidth = parentBounds.width;
    parentHeight = parentBounds.height;
  }

  var padding = opt_settings && opt_settings['padding'] ? this.measureCustomLabel_.settingsObj['padding'] : this.changedSettings['padding'] ? this.padding_ : null;
  var widthSettings = goog.isDef(this.measureCustomLabel_.width()) ? this.measureCustomLabel_.width() : this.width();
  var heightSettings = goog.isDef(this.measureCustomLabel_.height()) ? this.measureCustomLabel_.height() : this.height();
  var offsetY = /** @type {number|string} */(this.measureCustomLabel_.offsetY() || this.offsetY());
  var offsetX = /** @type {number|string} */(this.measureCustomLabel_.offsetX() || this.offsetX());
  var anchor = /** @type {string} */(this.measureCustomLabel_.anchor() || this.anchor());
  var textFormatter = this.measureCustomLabel_.textFormatter() || this.textFormatter();

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

  this.applyTextSettings(this.measureTextElement_, true);
  this.measureCustomLabel_.applyTextSettings(this.measureTextElement_, false);

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

  var formattedPosition = goog.object.clone(this.positionFormatter_.call(positionProvider, positionProvider));
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

  return /**@type {anychart.math.Rect} */(outerBounds);
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
    rotation = goog.isDef(formatProviderOrLabel.rotation()) ? formatProviderOrLabel.rotation() : this.rotation() || 0;
    anchor = formatProviderOrLabel.anchor() || this.anchor();
    opt_cacheIndex = goog.isDef(opt_cacheIndex) ? opt_cacheIndex : formatProviderOrLabel.getIndex();
  } else {
    rotation = goog.isDef(opt_settings) && goog.isDef(opt_settings['rotation']) ? opt_settings['rotation'] : this.rotation() || 0;
    anchor = goog.isDef(opt_settings) && opt_settings['anchor'] || this.anchor();
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
//region --- TextFormatter calls managment
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


anychart.core.ui.LabelsFactory.prototype.setThemeSettings = function(config) {
  var enabledState = this.enabled();

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
  // var json = anychart.core.ui.LabelsFactory.base(this, 'serialize');
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
  if (opt_default) {
    this.setThemeSettings(config);
  } else {
    anychart.core.settings.deserialize(this, this.TEXT_DESCRIPTORS, config);
    anychart.core.settings.deserialize(this, this.SIMPLE_PROPS_DESCRIPTORS, config);

    var enabledState = this.enabled();
    anychart.core.ui.LabelsFactory.base(this, 'setupByJSON', config, opt_default);
    this.enabled('enabled' in config ? config['enabled'] : enabledState);
  }

  if ('background' in config)
    this.background().setupByVal(config['background'], opt_default);

  if ('padding' in config)
    this.padding().setupByVal(config['padding'], opt_default);
};



//endregion
//endregion
//region --- Label
/**
 * Class for creation of sets of similar labels and management of such sets.
 * Any individual label can be changed after all labels are displayed.
 * @constructor
 * @extends {anychart.core.Text}
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

  this.states_ = {
    'pointNormal': this
  };

  /**
   * Drawing plan.
   * @type {Array.<string>}
   * @private
   */
  this.drawingPlan_ = [
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

  this.resetSettings();
};
goog.inherits(anychart.core.ui.LabelsFactory.Label, anychart.core.Text);


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
 * Gets/sets parent LabelsFactory.
 * @param {!anychart.core.ui.LabelsFactory=} opt_value labels factory.
 * @return {anychart.core.ui.LabelsFactory|anychart.core.ui.LabelsFactory.Label} Returns LabelsFactory or self
 * for method chainging.
 */
anychart.core.ui.LabelsFactory.Label.prototype.parentLabelsFactory = function(opt_value) {
  if (goog.isDefAndNotNull(opt_value)) {
    if (this.parentLabelsFactory_ != opt_value) {
      this.parentLabelsFactory_ = opt_value;
      this.state('seriesNormal', opt_value);
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  } else {
    return this.parentLabelsFactory_;
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
    if (this.currentLabelsFactory_ != opt_value) {
      this.currentLabelsFactory_ = opt_value;
      this.state('seriesState', opt_value);
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  } else {
    return this.currentLabelsFactory_;
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
    if (goog.isDef(opt_priority))
      opt_priority = anychart.utils.toNumber(opt_priority);
    else
      opt_priority = this.drawingPlan_.length;

    if (this.states_[name] != opt_value || this.drawingPlan_.indexOf(name) != opt_priority) {
      this.states_[name] = opt_value;

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
 * @param {string} name State name.
 * @param {number=} opt_value Priority value. 0 is more priority than 1. if passed 'null' - auto mode - last priority value.
 * @return {anychart.core.ui.LabelsFactory.Label|Object} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.stateOrder = function(name, opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.utils.toNumber(opt_value);
    var index = this.drawingPlan_.indexOf(name);

    if (index == opt_value)
      return;

    if (index != -1) {
      goog.array.moveItem(this.drawingPlan_, index, isNaN(opt_value) ? this.drawingPlan_.length - 1 : opt_value - 1);
    } else {
      goog.array.insertAt(this.drawingPlan_, name, isNaN(opt_value) ? this.drawingPlan_.length : opt_value);
    }
    return this;
  }

  return this.drawingPlan_.indexOf(name);
};


/**
 * Invalidation state checker.
 * @param {number} state .
 * @return {boolean} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.checkInvalidationState = function(state) {
  return this.iterateDrawingPlans_(function(name, settings) {
    if (settings instanceof anychart.core.ui.LabelsFactory.Label || settings instanceof anychart.core.ui.LabelsFactory) {
      if (settings.hasInvalidationState(state))
        return true;
    }
  }) || this.hasInvalidationState(state);
};


//endregion
//region --- Settings
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


/**
 * Gets or sets the Label background settings.
 * @param {(string|Object|null|boolean)=} opt_value Background object to set.
 * @return {!(anychart.core.ui.LabelsFactory.Label|anychart.core.ui.Background)} Returns background or itself for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.background = function(opt_value) {
  var makeDefault = goog.isNull(opt_value);
  if (!makeDefault && !this.settingsObj['background']) {
    this.settingsObj['background'] = new anychart.core.ui.Background();
    this.settingsObj['background'].setup(anychart.getFullTheme('standalones.labelsFactory.background'));
    this.settingsObj['background'].listenSignals(this.backgroundInvalidated_, this);
  }

  if (goog.isDef(opt_value)) {
    if (makeDefault) {
      goog.dispose(this.settingsObj['background']);
    } else
      this.settingsObj['background'].setup(opt_value);
    return this;
  }
  return this.settingsObj['background'];
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
  if (!makeDefault && !this.settingsObj['padding']) {
    this.settingsObj['padding'] = new anychart.core.utils.Padding();
    this.settingsObj['padding'].listenSignals(this.boundsInvalidated_, this);
  }
  if (goog.isDef(opt_spaceOrTopOrTopAndBottom)) {
    if (makeDefault) {
      goog.dispose(this.settingsObj['padding']);
    } else if (opt_spaceOrTopOrTopAndBottom instanceof anychart.core.utils.Padding) {
      for (var name in anychart.core.utils.Space.SIMPLE_PROPS_DESCRIPTORS) {
        var val = opt_spaceOrTopOrTopAndBottom.getOption(name);
        this.settingsObj['padding'].setOption(name, val);
      }
    } else {
      this.settingsObj['padding'].setup.apply(this.settingsObj['padding'], arguments);
    }
    return this;
  }
  return this.settingsObj['padding'];
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


/**
 * Getter for label width.
 * @param {(number|string|null)=} opt_value .
 * @return {!anychart.core.ui.LabelsFactory.Label|number|string|null} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.width = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.width !== opt_value) {
      this.settingsObj.width = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.settingsObj.width;
};


/**
 * Getter for label height.
 * @param {(number|string|null)=} opt_value .
 * @return {!anychart.core.ui.LabelsFactory.Label|number|string|null} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.height = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.height !== opt_value) {
      this.settingsObj.height = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.settingsObj.height;
};


/**
 * Sets labels color that parent series have set for it.
 * @param {number=} opt_value Auto rotation angle.
 * @return {number|anychart.core.ui.LabelsFactory.Label}
 */
anychart.core.ui.LabelsFactory.Label.prototype.autoRotation = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.utils.toNumber(opt_value);
    if (this.settingsObj.autoRotation !== opt_value) {
      this.settingsObj.autoRotation = opt_value;
      if (!goog.isDef(this.settingsObj.rotation) || isNaN(this.settingsObj.rotation))
        this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return isNaN(this.settingsObj.autoRotation) ? undefined : this.settingsObj.autoRotation;
  }
};


/**
 * Rotates a label around an anchor.
 * ({@link acgraph.vector.Element}). Method resets transformation and applies a new one.
 * @param {number=} opt_value Rotation angle in degrees.
 * @return {number|anychart.core.ui.LabelsFactory.Label} Rotation angle in degrees or self for chaining call.
 */
anychart.core.ui.LabelsFactory.Label.prototype.rotation = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = anychart.utils.toNumber(opt_value);
    if (this.settingsObj.rotation !== opt_value) {
      this.settingsObj.rotation = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return isNaN(this.settingsObj.rotation) ? undefined : this.settingsObj.rotation;
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
    if (this.settingsObj.autoAnchor !== value) {
      this.settingsObj.autoAnchor = value;
      if (!goog.isDef(this.settingsObj.autoAnchor))
        this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.settingsObj.autoAnchor;
  }
};


/**
 * Getter for label anchor settings.
 * @param {(boolean)=} opt_value .
 * @return {!anychart.core.ui.LabelsFactory.Label|anychart.enums.Anchor} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.autoVertical = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var value = !!opt_value;
    if (this.settingsObj.autoVertical !== value) {
      this.settingsObj.autoVertical = value;
      if (!goog.isDef(this.settingsObj.autoVertical))
        this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.settingsObj.autoVertical;
  }
};


/**
 * Getter for label anchor settings.
 * @param {(anychart.enums.Anchor|string)=} opt_value .
 * @return {!anychart.core.ui.LabelsFactory.Label|anychart.enums.Anchor} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.anchor = function(opt_value) {
  if (goog.isDef(opt_value)) {
    var value = goog.isNull(opt_value) ? null : anychart.enums.normalizeAnchor(opt_value);
    if (this.settingsObj.anchor !== value) {
      this.settingsObj.anchor = value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.settingsObj.anchor;
  }
};


/**
 * Getter for current label offsetX settings.
 * @param {(number|string)=} opt_value .
 * @return {number|string|anychart.core.ui.LabelsFactory.Label} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.offsetX = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.offsetX != opt_value) {
      this.settingsObj.offsetX = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.settingsObj.offsetX;
  }
};


/**
 * Getter for current label offsetY settings.
 * @param {(number|string)=} opt_value .
 * @return {number|string|anychart.core.ui.LabelsFactory.Label} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.offsetY = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.offsetY != opt_value) {
      this.settingsObj.offsetY = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.settingsObj.offsetY;
  }
};


/**
 * Getter/setter for stroke.
 * @param {(acgraph.vector.Stroke|acgraph.vector.ColoredFill|string|null)=} opt_strokeOrFill Fill settings.
 *    or stroke settings.
 * @param {number=} opt_thickness [1] Line thickness.
 * @param {string=} opt_dashpattern Controls the pattern of dashes and gaps used to stroke paths.
 * @param {acgraph.vector.StrokeLineJoin=} opt_lineJoin Line joint style.
 * @param {acgraph.vector.StrokeLineCap=} opt_lineCap Line cap style.
 * @return {anychart.core.ui.LabelsFactory.Label|acgraph.vector.Stroke} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.connectorStroke = function(opt_strokeOrFill, opt_thickness, opt_dashpattern, opt_lineJoin, opt_lineCap) {
  if (goog.isDef(opt_strokeOrFill)) {
    var stroke = acgraph.vector.normalizeStroke.apply(null, arguments);

    if (stroke != this.settingsObj.connectorStroke) {
      this.settingsObj.connectorStroke = stroke;
      this.invalidate(anychart.ConsistencyState.LABELS_FACTORY_CONNECTOR, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.settingsObj.connectorStroke;
};


/**
 * Helper method.
 * @private
 * @return {boolean} is adjustment enabled.
 */
anychart.core.ui.LabelsFactory.Label.prototype.adjustEnabled_ = function() {
  return (this.settingsObj.adjustByWidth || this.settingsObj.adjustByHeight);
};


/**
 * Sets font size setting for adjust text from.
 * @param {(number|string)=} opt_value
 * @return {number|anychart.core.ui.LabelsFactory.Label}
 */
anychart.core.ui.LabelsFactory.Label.prototype.minFontSize = function(opt_value) {
  if (goog.isDef(opt_value) && !isNaN(+opt_value)) {
    if (this.settingsObj.minFontSize != +opt_value) {
      this.settingsObj.minFontSize = +opt_value;
      // we don't need to invalidate bounds if adjusting is not enabled
      if (this.adjustEnabled_())
        this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.settingsObj.minFontSize;
};


/**
 * Sets font size setting for adjust text to.
 * @param {(number|string)=} opt_value
 * @return {number|anychart.core.ui.LabelsFactory.Label}
 */
anychart.core.ui.LabelsFactory.Label.prototype.maxFontSize = function(opt_value) {
  if (goog.isDef(opt_value) && !isNaN(+opt_value)) {
    if (this.settingsObj.maxFontSize != +opt_value) {
      this.settingsObj.maxFontSize = +opt_value;
      // we don't need to invalidate bounds if adjusting is not enabled
      if (this.adjustEnabled_())
        this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return this.settingsObj.maxFontSize;
};


/**
 * Labels clip settings.
 * @param {?anychart.math.Rect=} opt_value Height clip to set.
 * @return {!anychart.core.ui.LabelsFactory.Label|anychart.math.Rect|null} LabelsFactory clip or itself for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.clip = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.clip != opt_value) {
      this.settingsObj.clip = opt_value;
      this.invalidate(anychart.ConsistencyState.LABELS_FACTORY_CLIP, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  }
  return this.settingsObj.clip;
};


/**
 * Adjust font size.
 * @param {(boolean|Array.<boolean, boolean>|{width:boolean,height:boolean})=} opt_adjustOrAdjustByWidth Is font needs to be adjusted in case of 1 argument and adjusted by width in case of 2 arguments.
 * @param {boolean=} opt_adjustByHeight Is font needs to be adjusted by height.
 * @return {({width:boolean,height:boolean}|anychart.core.ui.LabelsFactory.Label)} adjustFontSite setting or self for method chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.adjustFontSize = function(opt_adjustOrAdjustByWidth, opt_adjustByHeight) {
  // if values are set as an array ( [true, true] [true, false] [false, true] [false, false] ) rather than a set of two arguments, simply expand their
  if (goog.isArray(opt_adjustOrAdjustByWidth)) {
    return this.adjustFontSize.apply(this, opt_adjustOrAdjustByWidth);
  } else if (goog.isObject(opt_adjustOrAdjustByWidth)) {
    this.adjustFontSize(opt_adjustOrAdjustByWidth['width'], opt_adjustOrAdjustByWidth['height']);
    return this;
  }
  var stateToInvalidate = 0;
  // if 2 params are set
  if (goog.isDef(opt_adjustByHeight)) {
    if (this.settingsObj.adjustByWidth != !!opt_adjustOrAdjustByWidth) {
      this.settingsObj.adjustByWidth = !!opt_adjustOrAdjustByWidth;
      stateToInvalidate |= anychart.ConsistencyState.BOUNDS;
    }
    if (this.settingsObj.adjustByHeight != !!opt_adjustByHeight) {
      this.settingsObj.adjustByHeight = !!opt_adjustByHeight;
      stateToInvalidate |= anychart.ConsistencyState.BOUNDS;
    }
    this.invalidate(stateToInvalidate, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    return this;
    // if only one param is set -  adjusting for the both
  } else if (goog.isDef(opt_adjustOrAdjustByWidth)) {
    if (!(this.settingsObj.adjustByWidth == this.settingsObj.adjustByHeight && this.settingsObj.adjustByWidth == opt_adjustOrAdjustByWidth)) {
      this.settingsObj.adjustByWidth = this.settingsObj.adjustByHeight = /** @type {boolean} */ (opt_adjustOrAdjustByWidth);
      this.invalidate(anychart.ConsistencyState.BOUNDS, anychart.Signal.NEEDS_REDRAW | anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  }
  return {'width': this.settingsObj.adjustByWidth, 'height': this.settingsObj.adjustByHeight};
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


/**
 * Getter for current label position settings.
 * @param {string=} opt_value .
 * @return {!anychart.core.ui.LabelsFactory.Label|string} .
 */
anychart.core.ui.LabelsFactory.Label.prototype.position = function(opt_value) {
  if (goog.isDef(opt_value)) {
    opt_value = String(opt_value);
    if (this.settingsObj.position != opt_value) {
      this.settingsObj.position = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return /** @type {anychart.enums.Position} */(this.settingsObj.position);
  }
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.enabled = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.enabledLabel != opt_value) {
      this.settingsObj.enabledLabel = opt_value;
      this.invalidate(anychart.ConsistencyState.ENABLED, anychart.Signal.BOUNDS_CHANGED | anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  } else {
    return this.settingsObj.enabledLabel;
  }
};


/**
 * Gets/Sets text formatter.
 * @param {*=} opt_value Text formatter.
 * @return {*} Text formatter or itself for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.textFormatter = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.textFormatter != opt_value) {
      this.settingsObj.textFormatter = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.NEEDS_REDRAW);
    }
    return this;
  } else {
    return this.settingsObj.textFormatter;
  }
};


/**
 * Gets/Sets position formatter.
 * @param {*=} opt_value Position formatter.
 * @return {*} Position formatter or self for chaining.
 */
anychart.core.ui.LabelsFactory.Label.prototype.positionFormatter = function(opt_value) {
  if (goog.isDef(opt_value)) {
    if (this.settingsObj.positionFormatter != opt_value) {
      this.settingsObj.positionFormatter = opt_value;
      this.invalidate(anychart.ConsistencyState.APPEARANCE, anychart.Signal.BOUNDS_CHANGED);
    }
    return this;
  } else {
    return this.settingsObj.positionFormatter;
  }
};


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
//region --- Settings manipulations
/**
 * Reset settings.
 */
anychart.core.ui.LabelsFactory.Label.prototype.resetSettings = function() {
  var padding = this.settingsObj['padding'];

  if (this.settingsObj['background']) {
    goog.dispose(this.settingsObj['background']);
    this.settingsObj['background'] = null;
  }

  if (this.settingsObj['padding']) {
    goog.dispose(this.settingsObj['padding']);
    this.settingsObj['padding'] = null;
  }

  this.settingsObj = {};

  this.changedSettings = {};
  this.states_['state'] = {};
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

  iterator(this.drawingPlan_, function(stateName, i) {
    var stateSettings = ths.states_[stateName];

    if (!stateSettings)
      return;

    result = handler.call(ths, stateName, stateSettings, i);
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
  return this.iterateDrawingPlans_(function(name, settings) {
    var setting;
    if (name == 'auto') {
      var selfAutoSettings = 'auto' + goog.string.capitalize(field);
      setting = this[selfAutoSettings] ? this[selfAutoSettings]() : undefined;
    } else {
      if (settings instanceof anychart.core.ui.LabelsFactory.Label) {
        setting = field == 'background' || field == 'padding' ? settings.settingsObj[field] : settings[field]();
      } else if (settings instanceof anychart.core.ui.LabelsFactory) {
        if (field == 'enabled') {
          setting = !goog.isNull(settings[field]()) ? settings[field]() : undefined;
        } else {
          setting = settings.getSettingsChangedStatesObj()[field] ? settings[field]() : undefined;
        }
      } else if (goog.isObject(settings)) {
        if (field == 'adjustFontSize') {
          setting = this.normalizeAdjustFontSize(settings[field]);
        } else {
          setting = settings[field];
        }
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

  this.iterateDrawingPlans_(function(name, settings, index) {
    var isInit = index == 0;
    if (settings instanceof anychart.core.ui.LabelsFactory || settings instanceof anychart.core.ui.LabelsFactory.Label) {
      settings.applyTextSettings(this.fontSizeMeasureElement_, isInit);
    } else {
      this.textSettings(settings);
      this.applyTextSettings(this.fontSizeMeasureElement_, isInit);
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
    var parentBounds = this.iterateDrawingPlans_(function(name, settings) {
      if (settings instanceof anychart.core.ui.LabelsFactory) {
        parentBounds = settings.parentBounds();
        if (parentBounds)
          return parentBounds;
      }
    });

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

    this.iterateDrawingPlans_(function(name, settings, index) {
      var isInit = index == 0;
      if (settings instanceof anychart.core.ui.LabelsFactory || settings instanceof anychart.core.ui.LabelsFactory.Label) {
        settings.applyTextSettings(this.textElement, isInit);
      } else {
        this.textSettings(settings);
        this.applyTextSettings(this.textElement, isInit);
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
        calculatedFontSize = this.iterateDrawingPlans_(function(name, settings) {
          if (settings instanceof anychart.core.ui.LabelsFactory) {
            if (goog.isDef(settings.autoSettings.fontSize))
              return settings.autoSettings.fontSize;
          }
        });
      }

      this.suspendSignalsDispatching();

      this.textElement.fontSize(calculatedFontSize);

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
  if (goog.isDef(this.settingsObj['background'])) json['background'] = this.background().serialize();
  if (goog.isDef(this.settingsObj['padding'])) json['padding'] = this.padding().serialize();
  if (goog.isDef(this.position())) json['position'] = this.position();
  if (goog.isDef(this.anchor())) json['anchor'] = this.anchor();
  if (goog.isDef(this.offsetX())) json['offsetX'] = this.offsetX();
  if (goog.isDef(this.offsetY())) json['offsetY'] = this.offsetY();
  if (goog.isDef(this.connectorStroke())) json['connectorStroke'] = this.connectorStroke();
  if (goog.isDef(this.width())) json['width'] = this.width();
  if (goog.isDef(this.height())) json['height'] = this.height();
  if (goog.isDef(this.rotation())) json['rotation'] = this.rotation();
  if (!goog.isDef(this.enabled())) delete json['enabled'];
  if (goog.isDef(this.settingsObj.adjustByHeight) || goog.isDef(this.settingsObj.adjustByWidth))
    json['adjustFontSize'] = this.adjustFontSize();
  if (goog.isDef(this.minFontSize())) json['minFontSize'] = this.minFontSize();
  if (goog.isDef(this.maxFontSize())) json['maxFontSize'] = this.maxFontSize();

  return json;
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.setupByJSON = function(config, opt_default) {
  var enabledState = this.enabled();
  anychart.core.ui.LabelsFactory.Label.base(this, 'setupByJSON', config, opt_default);


  if ('background' in config)
    this.background(config['background']);

  if ('padding' in config)
    this.padding(config['padding']);

  this.position(config['position']);
  this.anchor(config['anchor']);
  this.offsetX(config['offsetX']);
  this.offsetY(config['offsetY']);
  this.connectorStroke(config['connectorStroke']);
  this.rotation(config['rotation']);
  this.width(config['width']);
  this.height(config['height']);
  this.adjustFontSize(config['adjustFontSize']);
  this.minFontSize(config['minFontSize']);
  this.maxFontSize(config['maxFontSize']);
  this.textFormatter(config['textFormatter']);
  this.positionFormatter(config['positionFormatter']);
  if (!goog.isDef(config['enabled'])) delete this.settingsObj.enabledLabel;
  this.enabled('enabled' in config ? config['enabled'] : enabledState);
};


/** @inheritDoc */
anychart.core.ui.LabelsFactory.Label.prototype.disposeInternal = function() {
  goog.disposeAll(
      this.settingsObj['background'],
      this.settingsObj['padding'],
      this.backgroundElement_,
      this.textElement,
      this.layer_);

  this.backgroundElement_ = null;
  this.textElement = null;
  this.settingsObj['background'] = null;
  this.settingsObj['padding'] = null;

  anychart.core.ui.LabelsFactory.Label.base(this, 'disposeInternal');
};


//endregion
//endregion
//region --- Exports
//exports
(function() {
  var proto = anychart.core.ui.LabelsFactory.prototype;
  proto['background'] = proto.background;
  proto['padding'] = proto.padding;
  proto['textFormatter'] = proto.textFormatter;
  proto['positionFormatter'] = proto.positionFormatter;
  proto['position'] = proto.position;
  proto['anchor'] = proto.anchor;
  proto['offsetX'] = proto.offsetX;
  proto['offsetY'] = proto.offsetY;
  proto['connectorStroke'] = proto.connectorStroke;
  proto['rotation'] = proto.rotation;
  proto['width'] = proto.width;
  proto['height'] = proto.height;
  proto['enabled'] = proto.enabled;
  proto['adjustFontSize'] = proto.adjustFontSize;
  proto['minFontSize'] = proto.minFontSize;
  proto['maxFontSize'] = proto.maxFontSize;

  proto = anychart.core.ui.LabelsFactory.Label.prototype;
  proto['padding'] = proto.padding;
  proto['rotation'] = proto.rotation;
  proto['autoRotation'] = proto.autoRotation;//don't public
  proto['getIndex'] = proto.getIndex;
  proto['textFormatter'] = proto.textFormatter;
  proto['positionFormatter'] = proto.positionFormatter;
  proto['position'] = proto.position;
  proto['autoAnchor'] = proto.autoAnchor;//don't public
  proto['anchor'] = proto.anchor;
  proto['draw'] = proto.draw;
  proto['clear'] = proto.clear;
  proto['background'] = proto.background;
  proto['offsetX'] = proto.offsetX;
  proto['offsetY'] = proto.offsetY;
  proto['connectorStroke'] = proto.connectorStroke;
  proto['width'] = proto.width;
  proto['height'] = proto.height;
  proto['enabled'] = proto.enabled;
  proto['adjustFontSize'] = proto.adjustFontSize;
  proto['minFontSize'] = proto.minFontSize;
  proto['maxFontSize'] = proto.maxFontSize;
})();
//endregion
