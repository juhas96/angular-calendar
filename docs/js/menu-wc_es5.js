'use strict';

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); Object.defineProperty(subClass, "prototype", { writable: false }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _createSuper(Derived) { var hasNativeReflectConstruct = _isNativeReflectConstruct(); return function _createSuperInternal() { var Super = _getPrototypeOf(Derived), result; if (hasNativeReflectConstruct) { var NewTarget = _getPrototypeOf(this).constructor; result = Reflect.construct(Super, arguments, NewTarget); } else { result = Super.apply(this, arguments); } return _possibleConstructorReturn(this, result); }; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } else if (call !== void 0) { throw new TypeError("Derived constructors may only return object or undefined"); } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function _construct(Parent, args, Class) { if (_isNativeReflectConstruct()) { _construct = Reflect.construct.bind(); } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); return true; } catch (e) { return false; } }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

customElements.define('compodoc-menu', /*#__PURE__*/function (_HTMLElement) {
  _inherits(_class, _HTMLElement);

  var _super = _createSuper(_class);

  function _class() {
    var _this;

    _classCallCheck(this, _class);

    _this = _super.call(this);
    _this.isNormalMode = _this.getAttribute('mode') === 'normal';
    return _this;
  }

  _createClass(_class, [{
    key: "connectedCallback",
    value: function connectedCallback() {
      this.render(this.isNormalMode);
    }
  }, {
    key: "render",
    value: function render(isNormalMode) {
      var tp = lithtml.html("\n        <nav>\n            <ul class=\"list\">\n                <li class=\"title\">\n                    <a href=\"index.html\" data-type=\"index-link\">angular-calendar documentation</a>\n                </li>\n\n                <li class=\"divider\"></li>\n                ".concat(isNormalMode ? "<div id=\"book-search-input\" role=\"search\"><input type=\"text\" placeholder=\"Type to search\"></div>" : '', "\n                <li class=\"chapter\">\n                    <a data-type=\"chapter-link\" href=\"index.html\"><span class=\"icon ion-ios-home\"></span>Getting started</a>\n                    <ul class=\"links\">\n                        <li class=\"link\">\n                            <a href=\"overview.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-keypad\"></span>Overview\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"index.html\" data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>README\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"changelog.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>CHANGELOG\n                            </a>\n                        </li>\n                        <li class=\"link\">\n                            <a href=\"license.html\"  data-type=\"chapter-link\">\n                                <span class=\"icon ion-ios-paper\"></span>LICENSE\n                            </a>\n                        </li>\n                                <li class=\"link\">\n                                    <a href=\"dependencies.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-list\"></span>Dependencies\n                                    </a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"properties.html\" data-type=\"chapter-link\">\n                                        <span class=\"icon ion-ios-apps\"></span>Properties\n                                    </a>\n                                </li>\n                    </ul>\n                </li>\n                    <li class=\"chapter modules\">\n                        <a data-type=\"chapter-link\" href=\"modules.html\">\n                            <div class=\"menu-toggler linked\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#modules-links"' : 'data-target="#xs-modules-links"', ">\n                                <span class=\"icon ion-ios-archive\"></span>\n                                <span class=\"link-name\">Modules</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                        </a>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"', ">\n                            <li class=\"link\">\n                                <a href=\"modules/CalendarCommonModule.html\" data-type=\"entity-link\" >CalendarCommonModule</a>\n                                <li class=\"chapter inner\">\n                                    <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#directives-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"' : 'data-target="#xs-directives-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"', ">\n                                        <span class=\"icon ion-md-code-working\"></span>\n                                        <span>Directives</span>\n                                        <span class=\"icon ion-ios-arrow-down\"></span>\n                                    </div>\n                                    <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="directives-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"' : 'id="xs-directives-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"', ">\n                                        <li class=\"link\">\n                                            <a href=\"directives/CalendarNextViewDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CalendarNextViewDirective</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"directives/CalendarPreviousViewDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CalendarPreviousViewDirective</a>\n                                        </li>\n                                        <li class=\"link\">\n                                            <a href=\"directives/CalendarTodayDirective.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CalendarTodayDirective</a>\n                                        </li>\n                                    </ul>\n                                </li>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#pipes-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"' : 'data-target="#xs-pipes-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"', ">\n                                            <span class=\"icon ion-md-add\"></span>\n                                            <span>Pipes</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="pipes-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"' : 'id="xs-pipes-links-module-CalendarCommonModule-67c384f8601053d8adb200e955c82e2e5303bd8e21713a197323294757e78db5866d206353bdcea35844d7b24009826791fdbce00bad5e24a263df41f6ef4c18"', ">\n                                            <li class=\"link\">\n                                                <a href=\"pipes/CalendarDatePipe.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CalendarDatePipe</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/CalendarDayModule.html\" data-type=\"entity-link\" >CalendarDayModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-CalendarDayModule-e98192b1a931cd0a878233ada0b038befcd692f7f649042c957dc384e876fe0e6c8068548342068fdfd0032955b962970b7920d64479250c760cd8d8a9614040"' : 'data-target="#xs-components-links-module-CalendarDayModule-e98192b1a931cd0a878233ada0b038befcd692f7f649042c957dc384e876fe0e6c8068548342068fdfd0032955b962970b7920d64479250c760cd8d8a9614040"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-CalendarDayModule-e98192b1a931cd0a878233ada0b038befcd692f7f649042c957dc384e876fe0e6c8068548342068fdfd0032955b962970b7920d64479250c760cd8d8a9614040"' : 'id="xs-components-links-module-CalendarDayModule-e98192b1a931cd0a878233ada0b038befcd692f7f649042c957dc384e876fe0e6c8068548342068fdfd0032955b962970b7920d64479250c760cd8d8a9614040"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/CalendarDayViewComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CalendarDayViewComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/CalendarModule.html\" data-type=\"entity-link\" >CalendarModule</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/CalendarMonthModule.html\" data-type=\"entity-link\" >CalendarMonthModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-CalendarMonthModule-cafc1675d9bbc9761e3fb51faaa382b09c60f060379d30e8d73cf5595cd1b74b1bc54608824d1575eb079ebe883635323d2e5524cf02e297e1bca9139084b003"' : 'data-target="#xs-components-links-module-CalendarMonthModule-cafc1675d9bbc9761e3fb51faaa382b09c60f060379d30e8d73cf5595cd1b74b1bc54608824d1575eb079ebe883635323d2e5524cf02e297e1bca9139084b003"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-CalendarMonthModule-cafc1675d9bbc9761e3fb51faaa382b09c60f060379d30e8d73cf5595cd1b74b1bc54608824d1575eb079ebe883635323d2e5524cf02e297e1bca9139084b003"' : 'id="xs-components-links-module-CalendarMonthModule-cafc1675d9bbc9761e3fb51faaa382b09c60f060379d30e8d73cf5595cd1b74b1bc54608824d1575eb079ebe883635323d2e5524cf02e297e1bca9139084b003"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/CalendarMonthViewComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CalendarMonthViewComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"modules/CalendarWeekModule.html\" data-type=\"entity-link\" >CalendarWeekModule</a>\n                                    <li class=\"chapter inner\">\n                                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#components-links-module-CalendarWeekModule-b23ecbfcc9e253989d2e43bbd5ab48d17a69cefe2369d5142bd2645b44e5947d07ec4db07318e64b8dec7dcd99f25840f0f516550f563f6c2ef6e25d86e05743"' : 'data-target="#xs-components-links-module-CalendarWeekModule-b23ecbfcc9e253989d2e43bbd5ab48d17a69cefe2369d5142bd2645b44e5947d07ec4db07318e64b8dec7dcd99f25840f0f516550f563f6c2ef6e25d86e05743"', ">\n                                            <span class=\"icon ion-md-cog\"></span>\n                                            <span>Components</span>\n                                            <span class=\"icon ion-ios-arrow-down\"></span>\n                                        </div>\n                                        <ul class=\"links collapse\" ").concat(isNormalMode ? 'id="components-links-module-CalendarWeekModule-b23ecbfcc9e253989d2e43bbd5ab48d17a69cefe2369d5142bd2645b44e5947d07ec4db07318e64b8dec7dcd99f25840f0f516550f563f6c2ef6e25d86e05743"' : 'id="xs-components-links-module-CalendarWeekModule-b23ecbfcc9e253989d2e43bbd5ab48d17a69cefe2369d5142bd2645b44e5947d07ec4db07318e64b8dec7dcd99f25840f0f516550f563f6c2ef6e25d86e05743"', ">\n                                            <li class=\"link\">\n                                                <a href=\"components/CalendarWeekViewComponent.html\" data-type=\"entity-link\" data-context=\"sub-entity\" data-context-id=\"modules\" >CalendarWeekViewComponent</a>\n                                            </li>\n                                        </ul>\n                                    </li>\n                            </li>\n                </ul>\n                </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#classes-links"' : 'data-target="#xs-classes-links"', ">\n                            <span class=\"icon ion-ios-paper\"></span>\n                            <span>Classes</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"', ">\n                            <li class=\"link\">\n                                <a href=\"classes/CalendarEventTitleFormatter.html\" data-type=\"entity-link\" >CalendarEventTitleFormatter</a>\n                            </li>\n                        </ul>\n                    </li>\n                        <li class=\"chapter\">\n                            <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#injectables-links"' : 'data-target="#xs-injectables-links"', ">\n                                <span class=\"icon ion-md-arrow-round-down\"></span>\n                                <span>Injectables</span>\n                                <span class=\"icon ion-ios-arrow-down\"></span>\n                            </div>\n                            <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"', ">\n                                <li class=\"link\">\n                                    <a href=\"injectables/CalendarDateFormatter.html\" data-type=\"entity-link\" >CalendarDateFormatter</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CalendarMomentDateFormatter.html\" data-type=\"entity-link\" >CalendarMomentDateFormatter</a>\n                                </li>\n                                <li class=\"link\">\n                                    <a href=\"injectables/CalendarNativeDateFormatter.html\" data-type=\"entity-link\" >CalendarNativeDateFormatter</a>\n                                </li>\n                            </ul>\n                        </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#interfaces-links"' : 'data-target="#xs-interfaces-links"', ">\n                            <span class=\"icon ion-md-information-circle-outline\"></span>\n                            <span>Interfaces</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"', ">\n                            <li class=\"link\">\n                                <a href=\"interfaces/CalendarDateFormatterInterface.html\" data-type=\"entity-link\" >CalendarDateFormatterInterface</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CalendarEventTimesChangedEvent.html\" data-type=\"entity-link\" >CalendarEventTimesChangedEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CalendarModuleConfig.html\" data-type=\"entity-link\" >CalendarModuleConfig</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CalendarMonthViewBeforeRenderEvent.html\" data-type=\"entity-link\" >CalendarMonthViewBeforeRenderEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CalendarMonthViewEventTimesChangedEvent.html\" data-type=\"entity-link\" >CalendarMonthViewEventTimesChangedEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/CalendarWeekViewBeforeRenderEvent.html\" data-type=\"entity-link\" >CalendarWeekViewBeforeRenderEvent</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/DateFormatterParams.html\" data-type=\"entity-link\" >DateFormatterParams</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"interfaces/WeekViewAllDayEventResize.html\" data-type=\"entity-link\" >WeekViewAllDayEventResize</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"chapter\">\n                        <div class=\"simple menu-toggler\" data-toggle=\"collapse\" ").concat(isNormalMode ? 'data-target="#miscellaneous-links"' : 'data-target="#xs-miscellaneous-links"', ">\n                            <span class=\"icon ion-ios-cube\"></span>\n                            <span>Miscellaneous</span>\n                            <span class=\"icon ion-ios-arrow-down\"></span>\n                        </div>\n                        <ul class=\"links collapse \" ").concat(isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"', ">\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/enumerations.html\" data-type=\"entity-link\">Enums</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/typealiases.html\" data-type=\"entity-link\">Type aliases</a>\n                            </li>\n                            <li class=\"link\">\n                                <a href=\"miscellaneous/variables.html\" data-type=\"entity-link\">Variables</a>\n                            </li>\n                        </ul>\n                    </li>\n                    <li class=\"divider\"></li>\n                    <li class=\"copyright\">\n                        Documentation generated using <a href=\"https://compodoc.app/\" target=\"_blank\">\n                            <img data-src=\"images/compodoc-vectorise.png\" class=\"img-responsive\" data-type=\"compodoc-logo\">\n                        </a>\n                    </li>\n            </ul>\n        </nav>\n        "));
      this.innerHTML = tp.strings;
    }
  }]);

  return _class;
}( /*#__PURE__*/_wrapNativeSuper(HTMLElement)));