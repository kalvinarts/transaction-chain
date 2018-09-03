"use strict";

function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

var _require = require('events'),
    EventEmitter = _require.EventEmitter;

var TransactionChain =
/*#__PURE__*/
function (_EventEmitter) {
  _inherits(TransactionChain, _EventEmitter);

  function TransactionChain() {
    var _this;

    var chain = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

    _classCallCheck(this, TransactionChain);

    _this = _possibleConstructorReturn(this, _getPrototypeOf(TransactionChain).call(this));
    _this.chain = [];
    if (Array.isArray(chain)) chain.forEach(function (step) {
      return _this.add(step);
    });
    return _this;
  }

  _createClass(TransactionChain, [{
    key: "add",
    value: function add(_ref) {
      var _ref$action = _ref.action,
          action = _ref$action === void 0 ? function () {} : _ref$action,
          _ref$undo = _ref.undo,
          undo = _ref$undo === void 0 ? function () {} : _ref$undo,
          otherKeys = _objectWithoutProperties(_ref, ["action", "undo"]);

      this.chain.push(_objectSpread({
        action: action,
        undo: undo
      }, otherKeys));
      return this;
    }
  }, {
    key: "run",
    value: function () {
      var _run = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee() {
        var context,
            done,
            _iteratorNormalCompletion,
            _didIteratorError,
            _iteratorError,
            _iterator,
            _step,
            _step$value,
            idx,
            step,
            _args = arguments;

        return regeneratorRuntime.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                context = _args.length > 0 && _args[0] !== undefined ? _args[0] : {};
                done = [];
                _iteratorNormalCompletion = true;
                _didIteratorError = false;
                _iteratorError = undefined;
                _context.prev = 5;
                _iterator = this.chain.entries()[Symbol.iterator]();

              case 7:
                if (_iteratorNormalCompletion = (_step = _iterator.next()).done) {
                  _context.next = 25;
                  break;
                }

                _step$value = _slicedToArray(_step.value, 2), idx = _step$value[0], step = _step$value[1];
                _context.prev = 9;
                _context.next = 12;
                return step.action(context, step);

              case 12:
                done.push(step);
                _context.next = 22;
                break;

              case 15:
                _context.prev = 15;
                _context.t0 = _context["catch"](9);
                _context.t0.index = idx;
                this.emit('error', {
                  error: _context.t0,
                  chain: this.chain,
                  step: step,
                  done: done,
                  context: context
                });
                _context.next = 21;
                return this._undo(done, context);

              case 21:
                return _context.abrupt("return", context);

              case 22:
                _iteratorNormalCompletion = true;
                _context.next = 7;
                break;

              case 25:
                _context.next = 31;
                break;

              case 27:
                _context.prev = 27;
                _context.t1 = _context["catch"](5);
                _didIteratorError = true;
                _iteratorError = _context.t1;

              case 31:
                _context.prev = 31;
                _context.prev = 32;

                if (!_iteratorNormalCompletion && _iterator.return != null) {
                  _iterator.return();
                }

              case 34:
                _context.prev = 34;

                if (!_didIteratorError) {
                  _context.next = 37;
                  break;
                }

                throw _iteratorError;

              case 37:
                return _context.finish(34);

              case 38:
                return _context.finish(31);

              case 39:
                return _context.abrupt("return", context);

              case 40:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[5, 27, 31, 39], [9, 15], [32,, 34, 38]]);
      }));

      return function run() {
        return _run.apply(this, arguments);
      };
    }()
  }, {
    key: "_undo",
    value: function () {
      var _undo2 = _asyncToGenerator(
      /*#__PURE__*/
      regeneratorRuntime.mark(function _callee2(chain, context) {
        var done, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, step, res;

        return regeneratorRuntime.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                done = [];
                _iteratorNormalCompletion2 = true;
                _didIteratorError2 = false;
                _iteratorError2 = undefined;
                _context2.prev = 4;
                _iterator2 = chain.reverse()[Symbol.iterator]();

              case 6:
                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                  _context2.next = 22;
                  break;
                }

                step = _step2.value;
                _context2.prev = 8;
                _context2.next = 11;
                return step.undo(context, step);

              case 11:
                res = _context2.sent;
                done.push(step);
                _context2.next = 19;
                break;

              case 15:
                _context2.prev = 15;
                _context2.t0 = _context2["catch"](8);
                this.emit('fatal', {
                  error: _context2.t0,
                  chain: chain,
                  step: step,
                  done: done,
                  context: context
                });
                return _context2.abrupt("return");

              case 19:
                _iteratorNormalCompletion2 = true;
                _context2.next = 6;
                break;

              case 22:
                _context2.next = 28;
                break;

              case 24:
                _context2.prev = 24;
                _context2.t1 = _context2["catch"](4);
                _didIteratorError2 = true;
                _iteratorError2 = _context2.t1;

              case 28:
                _context2.prev = 28;
                _context2.prev = 29;

                if (!_iteratorNormalCompletion2 && _iterator2.return != null) {
                  _iterator2.return();
                }

              case 31:
                _context2.prev = 31;

                if (!_didIteratorError2) {
                  _context2.next = 34;
                  break;
                }

                throw _iteratorError2;

              case 34:
                return _context2.finish(31);

              case 35:
                return _context2.finish(28);

              case 36:
              case "end":
                return _context2.stop();
            }
          }
        }, _callee2, this, [[4, 24, 28, 36], [8, 15], [29,, 31, 35]]);
      }));

      return function _undo(_x, _x2) {
        return _undo2.apply(this, arguments);
      };
    }()
  }]);

  return TransactionChain;
}(EventEmitter);

module.exports = TransactionChain;