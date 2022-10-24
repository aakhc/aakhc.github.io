System.register("chunks:///_virtual/CarmeraMove.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _inheritsLoose, cclegacy, _decorator, input, Input, v3, KeyCode, Vec3, Component;

  return {
    setters: [function (module) {
      _inheritsLoose = module.inheritsLoose;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      input = module.input;
      Input = module.Input;
      v3 = module.v3;
      KeyCode = module.KeyCode;
      Vec3 = module.Vec3;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _class;

      cclegacy._RF.push({}, "d07f8w2VFFJGa54nE1RESdI", "CarmeraMove", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var ObjectMove = exports('ObjectMove', (_dec = ccclass('ObjectMove'), _dec(_class = /*#__PURE__*/function (_Component) {
        _inheritsLoose(ObjectMove, _Component);

        function ObjectMove() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.direction = new Vec3();
          _this.angle = new Vec3();
          _this.speed = 10;
          _this.angleSpeed = 25;
          _this.keyW = void 0;
          _this.keyS = void 0;
          _this.keyA = void 0;
          _this.keyD = void 0;
          _this.isHidePointer = false;
          _this.pointerLockActivatedAt = null;
          return _this;
        }

        var _proto = ObjectMove.prototype;

        _proto.start = function start() {
          var _this2 = this;

          window.xx = this;
          input.on(Input.EventType.KEY_DOWN, this.onKeyDown, this);
          input.on(Input.EventType.KEY_UP, this.onKeyUp, this);
          input.on(Input.EventType.KEY_PRESSING, this.onKeyPress, this);
          input.on(Input.EventType.MOUSE_MOVE, this.mouseMove, this);
          var gameCanvas = document.getElementById("GameCanvas");
          gameCanvas.addEventListener('click', function () {
            if (_this2.pointerLockActivatedAt != null && Date.now() - _this2.pointerLockActivatedAt < 1000) {
              return;
            }

            if (_this2.isHidePointer) {
              return;
            }

            gameCanvas.requestPointerLock();
            _this2.isHidePointer = true;
          });
          gameCanvas.addEventListener('click', function () {
            // 再次点击页面，取消鼠标锁定处理
            if (document.pointerLockElement == gameCanvas) {
              _this2.pointerLockActivatedAt = Date.now();
              _this2.isHidePointer = false;
              document.exitPointerLock();
            }
          });
        };

        _proto.update = function update(dt) {
          if (this.keyW) {
            this.direction.add(this.node.forward);
          }

          if (this.keyS) {
            this.direction.subtract(this.node.forward);
          }

          if (this.keyA) {
            this.direction.subtract(this.node.right);
          }

          if (this.keyD) {
            this.direction.add(this.node.right);
          }

          var pos = this.node.getPosition().add(this.direction.clone().multiplyScalar(dt * this.speed));
          this.node.setPosition(pos);
          this.node.eulerAngles = this.node.eulerAngles.add(this.angle.multiplyScalar(dt * this.angleSpeed));
          this.direction = v3(0);
        };

        _proto.onKeyPress = function onKeyPress(event) {
          switch (event.keyCode) {
            case KeyCode.ESCAPE:
              this.isHidePointer = false;
              this.pointerLockActivatedAt = Date.now();
              break;
          }
        };

        _proto.onKeyDown = function onKeyDown(event) {
          switch (event.keyCode) {
            case KeyCode.KEY_W:
              this.keyW = true;
              break;

            case KeyCode.KEY_S:
              this.keyS = true;
              break;

            case KeyCode.KEY_A:
              this.keyA = true;
              break;

            case KeyCode.KEY_D:
              this.keyD = true;
              break;

            case KeyCode.ESCAPE:
              this.isHidePointer = false;
              this.pointerLockActivatedAt = Date.now();
              break;
          }
        };

        _proto.onKeyUp = function onKeyUp(event) {
          switch (event.keyCode) {
            case KeyCode.KEY_W:
              this.keyW = false;
              break;

            case KeyCode.KEY_S:
              this.keyS = false;
              break;

            case KeyCode.KEY_A:
              this.keyA = false;
              break;

            case KeyCode.KEY_D:
              this.keyD = false;
              break;

            case KeyCode.ESCAPE:
              this.isHidePointer = false;
              this.pointerLockActivatedAt = Date.now();
              break;
          }
        };

        _proto.mouseMove = function mouseMove(event) {
          if (!this.isHidePointer) {
            return;
          }

          var dx = event.getDeltaX();
          var dy = event.getDeltaY();
          var v3 = new Vec3(dy, -dx, 0);
          this.angle = v3;
        };

        return ObjectMove;
      }(Component)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Env.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, sys;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      sys = module.sys;
    }],
    execute: function () {
      exports('useMouseInput', useMouseInput);

      cclegacy._RF.push({}, "a8e74fzgpdNS4WNl5PVwPZm", "Env", undefined);

      function useMouseInput() {
        return !isTouchDevice();
      }

      function isTouchDevice() {
        return sys.hasFeature(sys.Feature.INPUT_TOUCH);
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/FirstPersonCamera.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc', './Env.ts', './NodeUtils.ts'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, _createForOfIteratorHelperLoose, _createClass, cclegacy, _decorator, Node, math, Input, EventMouse, Component, useMouseInput, getForward;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
      _createForOfIteratorHelperLoose = module.createForOfIteratorHelperLoose;
      _createClass = module.createClass;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Node = module.Node;
      math = module.math;
      Input = module.Input;
      EventMouse = module.EventMouse;
      Component = module.Component;
    }, function (module) {
      useMouseInput = module.useMouseInput;
    }, function (module) {
      getForward = module.getForward;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _dec5, _dec6, _dec7, _dec8, _dec9, _dec10, _dec11, _dec12, _dec13, _dec14, _dec15, _class, _class2, _descriptor, _descriptor2, _descriptor3, _descriptor4, _descriptor5, _descriptor6, _descriptor7, _descriptor8, _descriptor9, _descriptor10, _descriptor11, _descriptor12, _descriptor13;

      cclegacy._RF.push({}, "e4ecedi9Z1HuZujkzSkGFJj", "FirstPersonCamera", undefined);

      var FirstPersonCamera = exports('FirstPersonCamera', (_dec = _decorator.ccclass('FirstPersonCamera'), _dec2 = _decorator.executionOrder(9999), _dec3 = _decorator.property({
        type: Node,
        displayName: '输入设备',
        tooltip: '输入设备。可以选择某个 UI 节点。'
      }), _dec4 = _decorator.property({
        displayName: '最小距离',
        tooltip: '与目标的最小距离。'
      }), _dec5 = _decorator.property({
        displayName: '最大距离',
        tooltip: '与目标的最大距离。'
      }), _dec6 = _decorator.property({
        displayName: '初始距离',
        tooltip: '初始时与目标的距离。'
      }), _dec7 = _decorator.property({
        displayName: '初始水平旋转',
        tooltip: '初始时在水平方向上的旋转。'
      }), _dec8 = _decorator.property({
        displayName: '初始垂直旋转',
        tooltip: '初始时在垂直方向上的旋转。'
      }), _dec9 = _decorator.property({
        displayName: '水平旋转速度',
        tooltip: '在水平方向上的旋转速度。'
      }), _dec10 = _decorator.property({
        displayName: '垂直旋转速度',
        tooltip: '在垂直方向上的旋转速度。'
      }), _dec11 = _decorator.property({
        displayName: '滚轮拉近速度',
        tooltip: '鼠标滚轮拉近速度。'
      }), _dec12 = _decorator.property({
        displayName: '触摸拉近速度',
        tooltip: '触摸拉近速度。'
      }), _dec13 = _decorator.property({
        type: Node,
        displayName: '目标',
        tooltip: '要跟随的目标。'
      }), _dec14 = _decorator.property({
        displayName: '自动跟随',
        tooltip: '是否启用自动跟随。启用后，将在目标位置发生改变时自动调整至目标后方。'
      }), _dec15 = _decorator.property({
        displayName: '自动跟随速度',
        tooltip: '自动跟随速度。',
        visible: function visible() {
          return this.autoTraceEnabled;
        }
      }), _dec(_class = _dec2(_class = (_class2 = /*#__PURE__*/function (_cc$Component) {
        _inheritsLoose(FirstPersonCamera, _cc$Component);

        function FirstPersonCamera() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _cc$Component.call.apply(_cc$Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "input", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "minDistance", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "maxDistance", _descriptor3, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "initialDistance", _descriptor4, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "initialHorizonRotation", _descriptor5, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "initialVerticalRotation", _descriptor6, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "horizonRotationSpeed", _descriptor7, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "verticalRotationSpeed", _descriptor8, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "mouseWheelSpeed", _descriptor9, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "touchZoomSpeed", _descriptor10, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "target", _descriptor11, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoTraceEnabled", _descriptor12, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "autoTraceSpeed", _descriptor13, _assertThisInitialized(_this));

          _this._targetLastPosition = new math.Vec3();
          _this._currentDirDirty = true;
          _this._currentDir = math.Vec3.negate(new math.Vec3(), math.Vec3.UNIT_Z);
          _this._mouseButtonPressing = {
            left: false,
            right: false,
            middle: false
          };
          _this._previousTwoTouchDistance = 0.0;
          _this._touches = [];
          return _this;
        }

        var _proto = FirstPersonCamera.prototype;

        _proto.start = function start() {
          this._zoom(this.initialDistance);

          this._rotateHorizon(this.initialHorizonRotation);

          this._rotateVertical(this.initialVerticalRotation);

          this._updatePosition();

          var input = this.input;

          if (input) {
            if (useMouseInput()) {
              input.on(Input.EventType.MOUSE_DOWN, this._onMouseDown, this);
              input.on(Input.EventType.MOUSE_MOVE, this._onMouseMove, this);
              input.on(Input.EventType.MOUSE_UP, this._onMouseUp, this);
              input.on(Input.EventType.MOUSE_WHEEL, this._onMouseWheel, this);
            } else {
              console.log("Touch");
              input.on(Node.EventType.TOUCH_START, this._onTouchBegin, this);
              input.on(Node.EventType.TOUCH_MOVE, this._onTouchMove, this);
              input.on(Node.EventType.TOUCH_END, this._onTouchEnd, this);
            }
          }
        };

        _proto.onDestroy = function onDestroy() {
          var input = this.input;

          if (input) {
            if (useMouseInput()) {
              input.off(Node.EventType.MOUSE_DOWN, this._onMouseDown, this);
              input.off(Node.EventType.MOUSE_MOVE, this._onMouseMove, this);
              input.off(Node.EventType.MOUSE_UP, this._onMouseUp, this);
              input.off(Node.EventType.MOUSE_WHEEL, this._onMouseWheel, this);
            }
          }
        };

        _proto.update = function update(deltaTime) {
          var targetWorldPosition = this.target.worldPosition;
          var targetLastPosition = this._targetLastPosition;
          var targetPositionChanged = !math.Vec3.strictEquals(targetLastPosition, targetWorldPosition);

          if (targetPositionChanged && this.autoTraceEnabled) {
            math.Vec3.copy(targetLastPosition, targetWorldPosition);

            this._autoTrace(deltaTime);
          }

          if (targetPositionChanged || this._currentDirDirty) {
            this._currentDirDirty = false;

            this._updatePosition();
          }
        };

        _proto._calcTransform = function _calcTransform(targetPosition, outPosition, outRotation) {
          var dir = math.Vec3.normalize(new math.Vec3(), this._currentDir);
          math.Quat.fromViewUp(outRotation, dir, math.Vec3.UNIT_Y);
          math.Vec3.add(outPosition, targetPosition, this._currentDir);
        };

        _proto._onMouseDown = function _onMouseDown(event) {
          switch (event.getButton()) {
            default:
              break;

            case EventMouse.BUTTON_LEFT:
              this._mouseButtonPressing.left = true;
              break;

            case EventMouse.BUTTON_RIGHT:
              this._mouseButtonPressing.right = true;
              break;

            case EventMouse.BUTTON_MIDDLE:
              this._mouseButtonPressing.middle = true;
              break;
          }
        };

        _proto._onMouseMove = function _onMouseMove(event) {
          {
            var dx = event.getDeltaX();

            if (dx) {
              var angle = -dx * this.horizonRotationSpeed;

              this._rotateHorizon(angle);
            }

            var dy = event.getDeltaY();

            if (dy) {
              var _angle = -dy * this.verticalRotationSpeed;

              this._rotateVertical(_angle);
            }
          }
        };

        _proto._onMouseUp = function _onMouseUp(event) {
          switch (event.getButton()) {
            default:
              break;

            case EventMouse.BUTTON_LEFT:
              this._mouseButtonPressing.left = false;
              break;

            case EventMouse.BUTTON_RIGHT:
              this._mouseButtonPressing.right = false;
              break;

            case EventMouse.BUTTON_MIDDLE:
              this._mouseButtonPressing.middle = false;
              break;
          }
        };

        _proto._onMouseWheel = function _onMouseWheel(event) {
          var deltaZoom = -this.mouseWheelSpeed * event.getScrollY();

          this._zoomDelta(deltaZoom);
        };

        _proto._onTouchBegin = function _onTouchBegin(eventTouch) {
          console.log("Touches Begin: " + eventTouch.getTouches().length);
          var touches = eventTouch.getTouches();

          for (var _iterator = _createForOfIteratorHelperLoose(touches), _step; !(_step = _iterator()).done;) {
            var touch = _step.value;

            if (this._touches.length < 2) {
              this._touches.push({
                id: touch.getID(),
                location: math.Vec2.clone(touch.getLocation())
              });
            }
          }
        };

        _proto._onTouchMove = function _onTouchMove(eventTouch) {
          console.log("Touches Move: " + this._touches.length);

          if (this._touches.length !== 2) {
            return;
          }

          var touches = eventTouch.getTouches();

          if (touches.length !== 2) {
            return;
          }

          var newTouches = this._touches.map(function (_ref) {
            var id = _ref.id;
            return touches.find(function (touch) {
              return touch.getID() === id;
            });
          });

          if (newTouches.some(function (touch) {
            return !touch;
          })) {
            return;
          }

          var oldTouch0Location = this._touches[0].location;
          var oldTouch1Location = this._touches[1].location;
          var newTouch0Location = newTouches[0].getLocation();
          var newTouch1Location = newTouches[1].getLocation();
          var dir0 = math.Vec2.subtract(new math.Vec2(), newTouch0Location, oldTouch0Location);
          math.Vec2.normalize(dir0, dir0);
          var dir1 = math.Vec2.subtract(new math.Vec2(), newTouch1Location, oldTouch1Location);
          math.Vec2.normalize(dir1, dir1);
          var angle = math.toDegree(math.Vec2.angle(dir0, dir1));

          if (angle > 170.0) {
            // Zoom
            var previousDistance = math.Vec2.distance(oldTouch0Location, oldTouch1Location);
            var thisDistance = math.Vec2.distance(newTouch0Location, newTouch1Location);
            var dDistance = thisDistance - previousDistance;

            if (dDistance !== 0) {
              var deltaZoom = -this.touchZoomSpeed * dDistance;

              this._zoomDelta(deltaZoom);
            }
          } else if (angle < 10.0) {
            var delta = math.Vec2.subtract(new math.Vec2(), newTouch0Location, oldTouch0Location);
            var dx = delta.x;

            if (dx) {
              var _angle2 = -dx * this.horizonRotationSpeed;

              this._rotateHorizon(_angle2);
            }

            var dy = delta.y;

            if (dy) {
              var _angle3 = -dy * this.verticalRotationSpeed;

              this._rotateVertical(_angle3);
            }
          }

          math.Vec2.copy(oldTouch0Location, newTouch0Location);
          math.Vec2.copy(oldTouch1Location, newTouch1Location);
        };

        _proto._onTouchEnd = function _onTouchEnd(eventTouch) {
          this._touches = this._touches.filter(function (touch) {
            return eventTouch.getTouches().findIndex(function (removal) {
              return removal.getID() === touch.id;
            }) < 0;
          });
        };

        _proto._updatePosition = function _updatePosition() {
          var position = new math.Vec3();
          var rotation = new math.Quat();

          this._calcTransform(this.target.worldPosition, position, rotation);

          this.node.position = position;
          this.node.rotation = rotation;
        };

        _proto._autoTrace = function _autoTrace(deltaTime) {
          var save = math.Vec3.clone(this._currentDir);
          var targetBackward = math.Vec3.negate(new math.Vec3(), getForward(this.target));
          var currentDirNormalized = math.Vec3.normalize(new math.Vec3(), this._currentDir);
          var up = math.Vec3.UNIT_Y;
          var currentDirXZ = math.Vec3.projectOnPlane(new math.Vec3(), currentDirNormalized, up);
          math.Vec3.normalize(currentDirXZ, currentDirXZ);
          var currentAngle = math.Vec3.angle(currentDirXZ, targetBackward);

          if (math.approx(currentAngle, 0.0, 1e-5)) {
            return;
          }

          if (currentAngle !== Math.PI) {
            var currentAngleDegrees = math.toDegree(currentAngle);
            var clampedAngle = math.clamp(deltaTime * this.autoTraceSpeed, 0.0, 180.0 - currentAngleDegrees);
            var axis = math.Vec3.cross(new math.Vec3(), currentDirXZ, targetBackward);
            var q = math.Quat.fromAxisAngle(new math.Quat(), axis, math.toRadian(clampedAngle));
            math.Vec3.transformQuat(this._currentDir, this._currentDir, q);
            this._currentDirDirty = true;
          }

          var old = math.Vec3.angle(up, save);
          var news = math.Vec3.angle(up, this._currentDir);
          if (!math.approx(old, news, 1e-5)) ;
        };

        _proto._zoom = function _zoom(distance) {
          var clamped = math.clamp(distance, this.minDistance, this.maxDistance);
          math.Vec3.normalize(this._currentDir, this._currentDir);
          math.Vec3.multiplyScalar(this._currentDir, this._currentDir, clamped);
          this._currentDirDirty = true;
        };

        _proto._zoomDelta = function _zoomDelta(delta) {
          var currentLen = math.Vec3.len(this._currentDir);
          var len = currentLen + delta;

          this._zoom(len);
        };

        _proto._rotateHorizon = function _rotateHorizon(angle) {
          var q = math.Quat.fromAxisAngle(new math.Quat(), math.Vec3.UNIT_Y, math.toRadian(angle));
          math.Vec3.transformQuat(this._currentDir, this._currentDir, q);
          this._currentDirDirty = true;
        };

        _proto._rotateVertical = function _rotateVertical(angle) {
          var currentDirNorm = math.Vec3.normalize(new math.Vec3(), this._currentDir);
          var up = math.Vec3.UNIT_Y;
          var axis = math.Vec3.cross(new math.Vec3(), currentDirNorm, up);
          math.Vec3.normalize(axis, axis);
          var currentAngle = math.toDegree(math.Vec3.angle(currentDirNorm, up));
          var DISABLE_FLIP_DELTA = 1e-2;
          var clampedAngle = currentAngle - math.clamp(currentAngle - angle, 0.0 + DISABLE_FLIP_DELTA, 180.0 - DISABLE_FLIP_DELTA);
          var q = math.Quat.fromAxisAngle(new math.Quat(), axis, math.toRadian(clampedAngle));
          math.Vec3.transformQuat(this._currentDir, this._currentDir, q);
          this._currentDirDirty = true;
        };

        _createClass(FirstPersonCamera, [{
          key: "_mouseOrTouchMoveEnabled",
          get: function get() {
            return this._mouseButtonPressing.left;
          }
        }]);

        return FirstPersonCamera;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "input", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "minDistance", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.1;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "maxDistance", [_dec5], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 20.0;
        }
      }), _descriptor4 = _applyDecoratedDescriptor(_class2.prototype, "initialDistance", [_dec6], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor5 = _applyDecoratedDescriptor(_class2.prototype, "initialHorizonRotation", [_dec7], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.0;
        }
      }), _descriptor6 = _applyDecoratedDescriptor(_class2.prototype, "initialVerticalRotation", [_dec8], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 45.0;
        }
      }), _descriptor7 = _applyDecoratedDescriptor(_class2.prototype, "horizonRotationSpeed", [_dec9], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor8 = _applyDecoratedDescriptor(_class2.prototype, "verticalRotationSpeed", [_dec10], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1.0;
        }
      }), _descriptor9 = _applyDecoratedDescriptor(_class2.prototype, "mouseWheelSpeed", [_dec11], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.01;
        }
      }), _descriptor10 = _applyDecoratedDescriptor(_class2.prototype, "touchZoomSpeed", [_dec12], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 0.01;
        }
      }), _descriptor11 = _applyDecoratedDescriptor(_class2.prototype, "target", [_dec13], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      }), _descriptor12 = _applyDecoratedDescriptor(_class2.prototype, "autoTraceEnabled", [_dec14], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return true;
        }
      }), _descriptor13 = _applyDecoratedDescriptor(_class2.prototype, "autoTraceSpeed", [_dec15], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 180.0;
        }
      })), _class2)) || _class) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/main", ['./CarmeraMove.ts', './FirstPersonCamera.ts', './Main.ts', './Move.ts', './Env.ts', './Math.ts', './NodeUtils.ts'], function () {
  'use strict';

  return {
    setters: [null, null, null, null, null, null, null],
    execute: function () {}
  };
});

System.register("chunks:///_virtual/Main.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, CCInteger, Label, Component, instantiate, Vec3;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      CCInteger = module.CCInteger;
      Label = module.Label;
      Component = module.Component;
      instantiate = module.instantiate;
      Vec3 = module.Vec3;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _class, _class2, _descriptor, _descriptor2;

      cclegacy._RF.push({}, "0766cWd8LZCdpXdQZFTYjdA", "Main", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Main = exports('Main', (_dec = ccclass('Main'), _dec2 = property(CCInteger), _dec3 = property(Label), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Main, _Component);

        function Main() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;
          _this.templates = [];

          _initializerDefineProperty(_this, "length", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "label", _descriptor2, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Main.prototype;

        _proto.onLoad = function onLoad() {
          this.templates = this.node.children.slice(0);
          this.templates.forEach(function (node) {
            node.removeFromParent();
          });
          this.reset();
        };

        _proto.onChange = function onChange(editBox) {
          var len = Number(editBox.string);
          this.length = len;
          this.reset();
        };

        _proto.onMoreLessClick = function onMoreLessClick(event, str) {
          if (str == 'more') {
            this.length += 10;
          } else {
            this.length -= 10;
          }

          this.reset();
        };

        _proto.reset = function reset() {
          var _this2 = this; // window.xx = this;


          this.node.removeAllChildren();
          this.label.string = '' + this.length; // let y = 0;
          // let z = 0

          var d = -.001;

          var _loop = function _loop(i) {
            _this2.templates.forEach(function (temp) {
              var node = instantiate(temp);
              var v3 = new Vec3();
              node.getPosition(v3);
              var x = v3.z + d * i;
              node.setPosition(x, v3.y, v3.z);

              _this2.node.addChild(node); // node.active = true;
              // if (z <= -30) {
              //     z = 0;
              // }
              // let x = i % 30
              // y = i % 900 === 0 ? y += 1 : y
              // z = i % 30 === 0 ? z -= 1 : z
              // node.setPosition(x, y, z);

            }); // const skeAnim = node.getComponent(SkeletalAnimation);
            // skeAnim.on(SkeletalAnimation.EventType.FINISHED, () => {
            //     skeAnim.play(skeAnim.clips[3].name);
            //     console.log('finish');
            // })
            // this.skeAnimations.push(skeAnim);

          };

          for (var i = 0; i < this.length; i += 1) {
            _loop(i);
          } // this.skAnim.on(SkeletalAnimation.EventType.FINISHED,()=>{
          //     console.log('finish');
          //     this.skAnim.crossFade(this.skAnim.clips[3].name);
          // })

        } // play(idx:number){
        //     this.skArr.forEach((s)=>{
        //         s.play(s.clips[idx].name);
        //     })
        // }
        // playAnim(idx: number) {
        //     // this.skAnim.crossFade(this.skAnim.clips[idx].name,0.2);
        //     // this.skAnim.play(this.skAnim.clips[idx].name);
        // }
        // update(dt: number) {
        //     // let rotate = dt * .1
        //     // let q: Quat = new Quat()
        //     // this.skeAnimations.forEach((a) => {
        //     //     let node = a.node
        //     //     node.getRotation(q)
        //     //     q.
        //     //     node.getPosition()
        //     //     q.
        //     // })
        //     let c: Camera
        //     c.convertToUINode
        // }
        ;

        return Main;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "length", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return 1;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "label", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Math.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, math;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      math = module.math;
    }],
    execute: function () {
      exports({
        reflect: reflect,
        toward: toward,
        towardVec3: towardVec3
      });

      cclegacy._RF.push({}, "46346OzTBpP0onLtfMSaSYC", "Math", undefined);

      function reflect(out, input, normal) {
        return math.Vec3.scaleAndAdd(out, input, normal, -2.0 * math.Vec3.dot(input, normal));
      }

      function toward(source, dest, maxStep) {
        var difference = dest - source;
        var distance = Math.abs(difference);
        var step = Math.sign(difference) * Math.min(distance, maxStep);
        return source += step;
      }

      function towardVec3(source, dest, maxStep, out) {
        var _out;

        (_out = out) != null ? _out : out = new math.Vec3();
        out.x = toward(source.x, dest.x, maxStep.x);
        out.y = toward(source.y, dest.y, maxStep.y);
        out.z = toward(source.z, dest.z, maxStep.z);
        return out;
      }

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/Move.ts", ['./rollupPluginModLoBabelHelpers.js', 'cc'], function (exports) {
  'use strict';

  var _applyDecoratedDescriptor, _inheritsLoose, _initializerDefineProperty, _assertThisInitialized, cclegacy, _decorator, Camera, Node, randomRangeInt, tween, Component;

  return {
    setters: [function (module) {
      _applyDecoratedDescriptor = module.applyDecoratedDescriptor;
      _inheritsLoose = module.inheritsLoose;
      _initializerDefineProperty = module.initializerDefineProperty;
      _assertThisInitialized = module.assertThisInitialized;
    }, function (module) {
      cclegacy = module.cclegacy;
      _decorator = module._decorator;
      Camera = module.Camera;
      Node = module.Node;
      randomRangeInt = module.randomRangeInt;
      tween = module.tween;
      Component = module.Component;
    }],
    execute: function () {
      var _dec, _dec2, _dec3, _dec4, _class, _class2, _descriptor, _descriptor2, _descriptor3;

      cclegacy._RF.push({}, "895dfOfYGpLlLkUxKTeerwL", "Move", undefined);

      var ccclass = _decorator.ccclass,
          property = _decorator.property;
      var Move = exports('Move', (_dec = ccclass('Move'), _dec2 = property(Camera), _dec3 = property(Node), _dec4 = property(Node), _dec(_class = (_class2 = /*#__PURE__*/function (_Component) {
        _inheritsLoose(Move, _Component);

        function Move() {
          var _this;

          for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          _this = _Component.call.apply(_Component, [this].concat(args)) || this;

          _initializerDefineProperty(_this, "camera", _descriptor, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "uiNode", _descriptor2, _assertThisInitialized(_this));

          _initializerDefineProperty(_this, "refNode", _descriptor3, _assertThisInitialized(_this));

          return _this;
        }

        var _proto = Move.prototype;

        _proto.start = function start() {
          window.xx = this;
          var node = this.node;
          var xo = {
            v: randomRangeInt(0, 5)
          };
          var yo = {
            v: randomRangeInt(0, 5)
          };
          var zo = {
            v: randomRangeInt(0, 5)
          }; // let x = node.position.x
          // let y = node.position.y
          // let z = node.position.z

          var onUpdate = function onUpdate() {
            node.setPosition(xo.v, yo.v, zo.v); // console.log(o.v)
          };

          tween(xo).to(3, {
            v: -5
          }, {
            onUpdate: onUpdate
          }).to(3, {
            v: 5
          }, {
            onUpdate: onUpdate
          }).to(3, {
            v: 5
          }, {
            onUpdate: onUpdate
          }).to(3, {
            v: -5
          }, {
            onUpdate: onUpdate
          }).union().repeatForever().start();
          tween(yo).to(2, {
            v: 0
          }, {
            onUpdate: onUpdate
          }).to(2, {
            v: 5
          }, {
            onUpdate: onUpdate
          }).to(2, {
            v: 5
          }, {
            onUpdate: onUpdate
          }).to(2, {
            v: 0
          }, {
            onUpdate: onUpdate
          }).union().repeatForever().start();
          tween(zo).to(5, {
            v: -5
          }, {
            onUpdate: onUpdate
          }).to(5, {
            v: 5
          }, {
            onUpdate: onUpdate
          }).to(5, {
            v: 5
          }, {
            onUpdate: onUpdate
          }).to(5, {
            v: -5
          }, {
            onUpdate: onUpdate
          }).union().repeatForever().start();
        };

        _proto.update = function update(dt) {
          // let rotate = dt * .1
          // let q: Quat = new Quat()
          // this.skeAnimations.forEach((a) => {
          //     let node = a.node
          //     node.getRotation(q)
          //     q.
          //     node.getPosition()
          //     q.
          // })
          var v3 = this.camera.convertToUINode(this.node.worldPosition, this.uiNode); // console.log(scale)

          this.refNode.setPosition(v3); // this.refNode.setWorldScale(scale)
        };

        return Move;
      }(Component), (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "camera", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor2 = _applyDecoratedDescriptor(_class2.prototype, "uiNode", [_dec3], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      }), _descriptor3 = _applyDecoratedDescriptor(_class2.prototype, "refNode", [_dec4], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: function initializer() {
          return null;
        }
      })), _class2)) || _class));

      cclegacy._RF.pop();
    }
  };
});

System.register("chunks:///_virtual/NodeUtils.ts", ['cc'], function (exports) {
  'use strict';

  var cclegacy, math;
  return {
    setters: [function (module) {
      cclegacy = module.cclegacy;
      math = module.math;
    }],
    execute: function () {
      exports('getForward', getForward);

      cclegacy._RF.push({}, "2bc41jGyPpE0IQMA0xUYuQD", "NodeUtils", undefined);

      function getForward(node) {
        return math.Vec3.transformQuat(new math.Vec3(), math.Vec3.UNIT_Z, node.worldRotation);
      }

      cclegacy._RF.pop();
    }
  };
});

(function(r) {
  r('virtual:///prerequisite-imports/main', 'chunks:///_virtual/main'); 
})(function(mid, cid) {
    System.register(mid, [cid], function (_export, _context) {
    return {
        setters: [function(_m) {
            var _exportObj = {};

            for (var _key in _m) {
              if (_key !== "default" && _key !== "__esModule") _exportObj[_key] = _m[_key];
            }
      
            _export(_exportObj);
        }],
        execute: function () { }
    };
    });
});