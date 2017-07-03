/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = undefined;

var _camera = __webpack_require__(9);

var _modules = __webpack_require__(1);

var app = exports.app = new WHS.App([new WHS.ElementModule(), new WHS.SceneModule(), new WHS.DefineModule('camera', _camera.camera), _modules.renderingModule,
// new WHS.OrbitControlsModule(),
new WHS.ResizeModule(), _modules.mouse, _modules.rbModule]);

app.start();

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rbModule = exports.mouse = exports.renderer = exports.renderingModule = undefined;

var _RenderBufferModule = __webpack_require__(10);

var renderingModule = exports.renderingModule = new WHS.RenderingModule({
  renderer: {
    antialias: true
    // alpha: true
  },

  // bgColor: 0x070707,
  pixelRatio: window.devicePixelRatio
});

var renderer = exports.renderer = renderingModule.renderer;
// renderer.setClearColor(0x070707, 0.01);
renderer.gammaInput = true;
renderer.gammaOutput = true;
// renderer.shadowMap.enabled = true;
// renderer.shadowMap.type = THREE.PCFSoftShadowMap;

var mouse = exports.mouse = new WHS.VirtualMouseModule();
var rbModule = exports.rbModule = new _RenderBufferModule.RenderBufferModule(400, 400, new FBOHelper(renderingModule.renderer));

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

// Thank's IE8 for his funny defineProperty
module.exports = !__webpack_require__(7)(function(){
  return Object.defineProperty({}, 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 3 */
/***/ (function(module, exports) {

module.exports = function(it){
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};

/***/ }),
/* 4 */
/***/ (function(module, exports) {

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
var global = module.exports = typeof window != 'undefined' && window.Math == Math
  ? window : typeof self != 'undefined' && self.Math == Math ? self : Function('return this')();
if(typeof __g == 'number')__g = global; // eslint-disable-line no-undef

/***/ }),
/* 5 */
/***/ (function(module, exports) {

var core = module.exports = {version: '2.4.0'};
if(typeof __e == 'number')__e = core; // eslint-disable-line no-undef

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

var anObject       = __webpack_require__(20)
  , IE8_DOM_DEFINE = __webpack_require__(21)
  , toPrimitive    = __webpack_require__(23)
  , dP             = Object.defineProperty;

exports.f = __webpack_require__(2) ? Object.defineProperty : function defineProperty(O, P, Attributes){
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if(IE8_DOM_DEFINE)try {
    return dP(O, P, Attributes);
  } catch(e){ /* empty */ }
  if('get' in Attributes || 'set' in Attributes)throw TypeError('Accessors not supported!');
  if('value' in Attributes)O[P] = Attributes.value;
  return O;
};

/***/ }),
/* 7 */
/***/ (function(module, exports) {

module.exports = function(exec){
  try {
    return !!exec();
  } catch(e){
    return true;
  }
};

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


__webpack_require__(0);

__webpack_require__(25);

__webpack_require__(29);

__webpack_require__(30);

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.camera = undefined;

var _modules = __webpack_require__(1);

var camera = exports.camera = new WHS.PerspectiveCamera({
  position: [0, 100, 100]
});

camera.native.lookAt(new THREE.Vector3(0, 0, 0));

var m = _modules.mouse.mouse;
var i = 40;

_modules.mouse.on('move', function () {
  camera.x = m.x * i;
  camera.z = m.y * i;
  camera.native.lookAt(new THREE.Vector3(0, 0, 0));
});

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RenderBufferModule = undefined;

var _classCallCheck2 = __webpack_require__(11);

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = __webpack_require__(12);

var _createClass3 = _interopRequireDefault(_createClass2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var RenderBufferModule = function () {
  function RenderBufferModule(width, height) {
    var helper = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
    (0, _classCallCheck3.default)(this, RenderBufferModule);

    this.scene = new THREE.Scene();
    this.camera = new THREE.OrthographicCamera(-width / 2, width / 2, -height / 2, height / 2, -1000, 1000);
    this.geometry = new THREE.PlaneGeometry(width, height);
    this.helper = helper;

    this.app = null;
    this.renderer = null;
    this.buffers = [];
    this.data = {};
    this.size = { width: width, height: height };

    var camera = this.camera;


    camera.position.set(0, 0, -1);
    camera.lookAt(new THREE.Vector3(0, 0, 0));
    camera.rotation.z -= Math.PI;

    this.scene.add(this.camera);
  }

  (0, _createClass3.default)(RenderBufferModule, [{
    key: 'manager',
    value: function manager(_manager) {
      this.renderer = _manager.get('renderer');
      this.app = _manager.handler;

      var size = this.renderer.getSize();
      if (this.helper) this.helper.setSize(size.width, size.height);
    }
  }, {
    key: 'defineBuffers',
    value: function defineBuffers() {
      var _this = this;

      var buffers = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

      if (this.helper) buffers.forEach(function (buff) {
        _this.buffers.push(buff);
        _this.helper.attach(buff, 'renderTarget' + _this.buffers.length);
      });else this.buffers = this.buffers.concat(buffers);
    }
  }, {
    key: 'createRT',
    value: function createRT() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
        minFilter: THREE.NearestFilter,
        format: THREE.RGBAFormat,
        stencilBuffer: false,
        depthBuffer: false
      };
      var _size = this.size,
          width = _size.width,
          height = _size.height;

      return new THREE.WebGLRenderTarget(width, height, options);
    }
  }, {
    key: 'swapBuffers',
    value: function swapBuffers() {
      this.buffers.reverse();
    }
  }, {
    key: 'offsetBuffers',
    value: function offsetBuffers() {
      var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;

      for (var i = 0; i < value; i++) {
        this.buffers.unshift(this.buffers.pop());
      }
    }
  }, {
    key: 'renderBuffer',
    value: function renderBuffer(bufferIndex) {
      this.renderer.render(this.scene, this.camera, this.buffers[bufferIndex]);
    }
  }, {
    key: 'setup',
    value: function setup(cb) {
      cb(this);
    }
  }, {
    key: 'update',
    value: function update(cb) {
      var _this2 = this;

      new WHS.Loop(function () {
        return cb(_this2.data, _this2.buffers);
      }).start(this.app);
      new WHS.Loop(function () {
        return _this2.helper.update();
      }).start(this.app);
    }
  }]);
  return RenderBufferModule;
}();

exports.RenderBufferModule = RenderBufferModule;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

exports.default = function (instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
};

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.__esModule = true;

var _defineProperty = __webpack_require__(13);

var _defineProperty2 = _interopRequireDefault(_defineProperty);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function () {
  function defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      (0, _defineProperty2.default)(target, descriptor.key, descriptor);
    }
  }

  return function (Constructor, protoProps, staticProps) {
    if (protoProps) defineProperties(Constructor.prototype, protoProps);
    if (staticProps) defineProperties(Constructor, staticProps);
    return Constructor;
  };
}();

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = { "default": __webpack_require__(14), __esModule: true };

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

__webpack_require__(15);
var $Object = __webpack_require__(5).Object;
module.exports = function defineProperty(it, key, desc){
  return $Object.defineProperty(it, key, desc);
};

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

var $export = __webpack_require__(16);
// 19.1.2.4 / 15.2.3.6 Object.defineProperty(O, P, Attributes)
$export($export.S + $export.F * !__webpack_require__(2), 'Object', {defineProperty: __webpack_require__(6).f});

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

var global    = __webpack_require__(4)
  , core      = __webpack_require__(5)
  , ctx       = __webpack_require__(17)
  , hide      = __webpack_require__(19)
  , PROTOTYPE = 'prototype';

var $export = function(type, name, source){
  var IS_FORCED = type & $export.F
    , IS_GLOBAL = type & $export.G
    , IS_STATIC = type & $export.S
    , IS_PROTO  = type & $export.P
    , IS_BIND   = type & $export.B
    , IS_WRAP   = type & $export.W
    , exports   = IS_GLOBAL ? core : core[name] || (core[name] = {})
    , expProto  = exports[PROTOTYPE]
    , target    = IS_GLOBAL ? global : IS_STATIC ? global[name] : (global[name] || {})[PROTOTYPE]
    , key, own, out;
  if(IS_GLOBAL)source = name;
  for(key in source){
    // contains in native
    own = !IS_FORCED && target && target[key] !== undefined;
    if(own && key in exports)continue;
    // export native or passed
    out = own ? target[key] : source[key];
    // prevent global pollution for namespaces
    exports[key] = IS_GLOBAL && typeof target[key] != 'function' ? source[key]
    // bind timers to global for call from export context
    : IS_BIND && own ? ctx(out, global)
    // wrap global constructors for prevent change them in library
    : IS_WRAP && target[key] == out ? (function(C){
      var F = function(a, b, c){
        if(this instanceof C){
          switch(arguments.length){
            case 0: return new C;
            case 1: return new C(a);
            case 2: return new C(a, b);
          } return new C(a, b, c);
        } return C.apply(this, arguments);
      };
      F[PROTOTYPE] = C[PROTOTYPE];
      return F;
    // make static versions for prototype methods
    })(out) : IS_PROTO && typeof out == 'function' ? ctx(Function.call, out) : out;
    // export proto methods to core.%CONSTRUCTOR%.methods.%NAME%
    if(IS_PROTO){
      (exports.virtual || (exports.virtual = {}))[key] = out;
      // export proto methods to core.%CONSTRUCTOR%.prototype.%NAME%
      if(type & $export.R && expProto && !expProto[key])hide(expProto, key, out);
    }
  }
};
// type bitmap
$export.F = 1;   // forced
$export.G = 2;   // global
$export.S = 4;   // static
$export.P = 8;   // proto
$export.B = 16;  // bind
$export.W = 32;  // wrap
$export.U = 64;  // safe
$export.R = 128; // real proto method for `library` 
module.exports = $export;

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

// optional / simple context binding
var aFunction = __webpack_require__(18);
module.exports = function(fn, that, length){
  aFunction(fn);
  if(that === undefined)return fn;
  switch(length){
    case 1: return function(a){
      return fn.call(that, a);
    };
    case 2: return function(a, b){
      return fn.call(that, a, b);
    };
    case 3: return function(a, b, c){
      return fn.call(that, a, b, c);
    };
  }
  return function(/* ...args */){
    return fn.apply(that, arguments);
  };
};

/***/ }),
/* 18 */
/***/ (function(module, exports) {

module.exports = function(it){
  if(typeof it != 'function')throw TypeError(it + ' is not a function!');
  return it;
};

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

var dP         = __webpack_require__(6)
  , createDesc = __webpack_require__(24);
module.exports = __webpack_require__(2) ? function(object, key, value){
  return dP.f(object, key, createDesc(1, value));
} : function(object, key, value){
  object[key] = value;
  return object;
};

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3);
module.exports = function(it){
  if(!isObject(it))throw TypeError(it + ' is not an object!');
  return it;
};

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = !__webpack_require__(2) && !__webpack_require__(7)(function(){
  return Object.defineProperty(__webpack_require__(22)('div'), 'a', {get: function(){ return 7; }}).a != 7;
});

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__(3)
  , document = __webpack_require__(4).document
  // in old IE typeof document.createElement is 'object'
  , is = isObject(document) && isObject(document.createElement);
module.exports = function(it){
  return is ? document.createElement(it) : {};
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

// 7.1.1 ToPrimitive(input [, PreferredType])
var isObject = __webpack_require__(3);
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function(it, S){
  if(!isObject(it))return it;
  var fn, val;
  if(S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  if(typeof (fn = it.valueOf) == 'function' && !isObject(val = fn.call(it)))return val;
  if(!S && typeof (fn = it.toString) == 'function' && !isObject(val = fn.call(it)))return val;
  throw TypeError("Can't convert object to primitive value");
};

/***/ }),
/* 24 */
/***/ (function(module, exports) {

module.exports = function(bitmap, value){
  return {
    enumerable  : !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable    : !(bitmap & 4),
    value       : value
  };
};

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

var _grid = __webpack_require__(26);

var _modules = __webpack_require__(1);

var plane = new WHS.Plane({
  geometry: [400, 200, 200, 200],
  buffer: true,
  material: new THREE.MeshPhongMaterial({
    map: _modules.rbModule.buffers[0].texture,
    displacementMap: _modules.rbModule.buffers[0].texture,
    displacementScale: 20
  }),
  rotation: {
    x: -Math.PI / 2
  }
});

plane.addTo(_app.app);
_modules.mouse.track(plane);

_modules.mouse.on('move', function () {
  _grid.material.uniforms.mouse.value.x = 0.5 + _modules.mouse.mouse.x;
  _grid.material.uniforms.mouse.value.y = 0.5 + _modules.mouse.mouse.y;
});

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.clearShader = exports.material = undefined;

var _app = __webpack_require__(0);

var _modules = __webpack_require__(1);

var _grid = __webpack_require__(27);

var _grid2 = _interopRequireDefault(_grid);

var _grid3 = __webpack_require__(28);

var _grid4 = _interopRequireDefault(_grid3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_modules.rbModule.defineBuffers([_modules.rbModule.createRT(), _modules.rbModule.createRT()]);

var material = exports.material = new THREE.ShaderMaterial({
  uniforms: {
    mouse: { value: new THREE.Vector2(0.5, 0.5) },
    tiles: { value: new THREE.Vector2(160, 80) },
    t: { value: 0 },
    isOrigin: { value: false }
  },
  vertexShader: _grid2.default,
  fragmentShader: _grid4.default,
  transparent: true
});

var clearShader = exports.clearShader = new THREE.ShaderMaterial({
  uniforms: {
    texture: { value: _modules.rbModule.buffers[0].texture }
  },
  vertexShader: _grid2.default,
  fragmentShader: '\n    precision highp float;\n    uniform sampler2D texture;\n    varying vec2 vUv;\n\n    void main() {\n      vec2 mUv = vUv;\n      mUv.y = mUv.y;\n\n      // mUv.y += 0.003;\n\n      mUv -= (mUv - 0.5) * 0.01;\n\n      vec4 c = texture2D( texture, mUv ) - 0.005;\n      c.r += 0.04;\n      c.g += 0.02;\n      gl_FragColor = c;\n    }\n  ',
  transparent: true
});

var step = 0.01;

new WHS.Loop(function () {
  material.uniforms.t.value += step;
}).start(_app.app);

_modules.rbModule.setup(function (_ref) {
  var scene = _ref.scene,
      camera = _ref.camera,
      geometry = _ref.geometry,
      data = _ref.data;

  var plane = new THREE.Mesh(geometry, material);

  var clearPlane = new THREE.Mesh(geometry, clearShader);
  clearPlane.position.set(0, 0, 1); // zIndex
  console.log(clearPlane);

  scene.add(plane);
  scene.add(clearPlane);

  data.plane = plane;
  data.clearShader = clearShader;
});

_modules.rbModule.update(function (_ref2, buffers) {
  var plane = _ref2.plane,
      clearShader = _ref2.clearShader;

  _modules.renderer.setClearColor(0x000000, 0);
  plane.visible = true;
  _modules.rbModule.renderBuffer(0);

  plane.visible = false;
  clearShader.uniforms.texture.value = buffers[0].texture;
  _modules.rbModule.renderBuffer(1);

  _modules.rbModule.swapBuffers();
  _modules.renderer.setClearColor(0x090909, 1);
});

/***/ }),
/* 27 */
/***/ (function(module, exports) {

module.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec3 vPosition;\n\nvoid main() {\n  vUv = uv;\n  vPosition = position;\n\n  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);\n}\n"

/***/ }),
/* 28 */
/***/ (function(module, exports) {

module.exports = "#define GLSLIFY 1\nvarying vec2 vUv;\nvarying vec3 vPosition;\nuniform vec2 mouse;\nuniform vec2 tiles;\n// uniform bool isOrigin;\nuniform float t;\n// uniform sampler2D bufferTarget;\n\n//\n// Description : Array and textureless GLSL 2D simplex noise function.\n//      Author : Ian McEwan, Ashima Arts.\n//  Maintainer : ijm\n//     Lastmod : 20110822 (ijm)\n//     License : Copyright (C) 2011 Ashima Arts. All rights reserved.\n//               Distributed under the MIT License. See LICENSE file.\n//               https://github.com/ashima/webgl-noise\n//\n\nvec3 mod289_2_0(vec3 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec2 mod289_2_0(vec2 x) {\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec3 permute_2_1(vec3 x) {\n  return mod289_2_0(((x*34.0)+1.0)*x);\n}\n\nfloat snoise_2_2(vec2 v)\n  {\n  const vec4 C = vec4(0.211324865405187,  // (3.0-sqrt(3.0))/6.0\n                      0.366025403784439,  // 0.5*(sqrt(3.0)-1.0)\n                     -0.577350269189626,  // -1.0 + 2.0 * C.x\n                      0.024390243902439); // 1.0 / 41.0\n// First corner\n  vec2 i  = floor(v + dot(v, C.yy) );\n  vec2 x0 = v -   i + dot(i, C.xx);\n\n// Other corners\n  vec2 i1;\n  //i1.x = step( x0.y, x0.x ); // x0.x > x0.y ? 1.0 : 0.0\n  //i1.y = 1.0 - i1.x;\n  i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);\n  // x0 = x0 - 0.0 + 0.0 * C.xx ;\n  // x1 = x0 - i1 + 1.0 * C.xx ;\n  // x2 = x0 - 1.0 + 2.0 * C.xx ;\n  vec4 x12 = x0.xyxy + C.xxzz;\n  x12.xy -= i1;\n\n// Permutations\n  i = mod289_2_0(i); // Avoid truncation effects in permutation\n  vec3 p = permute_2_1( permute_2_1( i.y + vec3(0.0, i1.y, 1.0 ))\n    + i.x + vec3(0.0, i1.x, 1.0 ));\n\n  vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy), dot(x12.zw,x12.zw)), 0.0);\n  m = m*m ;\n  m = m*m ;\n\n// Gradients: 41 points uniformly over a line, mapped onto a diamond.\n// The ring size 17*17 = 289 is close to a multiple of 41 (41*7 = 287)\n\n  vec3 x = 2.0 * fract(p * C.www) - 1.0;\n  vec3 h = abs(x) - 0.5;\n  vec3 ox = floor(x + 0.5);\n  vec3 a0 = x - ox;\n\n// Normalise gradients implicitly by scaling m\n// Approximation of: m *= inversesqrt( a0*a0 + h*h );\n  m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );\n\n// Compute final noise value at P\n  vec3 g;\n  g.x  = a0.x  * x0.x  + h.x  * x0.y;\n  g.yz = a0.yz * x12.xz + h.yz * x12.yw;\n  return 130.0 * dot(m, g);\n}\n\n\n\n//\n// GLSL textureless classic 2D noise \"cnoise\",\n// with an RSL-style periodic variant \"pnoise\".\n// Author:  Stefan Gustavson (stefan.gustavson@liu.se)\n// Version: 2011-08-22\n//\n// Many thanks to Ian McEwan of Ashima Arts for the\n// ideas for permutation and gradient selection.\n//\n// Copyright (c) 2011 Stefan Gustavson. All rights reserved.\n// Distributed under the MIT license. See LICENSE file.\n// https://github.com/ashima/webgl-noise\n//\n\nvec4 mod289_1_3(vec4 x)\n{\n  return x - floor(x * (1.0 / 289.0)) * 289.0;\n}\n\nvec4 permute_1_4(vec4 x)\n{\n  return mod289_1_3(((x*34.0)+1.0)*x);\n}\n\nvec4 taylorInvSqrt_1_5(vec4 r)\n{\n  return 1.79284291400159 - 0.85373472095314 * r;\n}\n\nvec2 fade_1_6(vec2 t) {\n  return t*t*t*(t*(t*6.0-15.0)+10.0);\n}\n\n// Classic Perlin noise\nfloat cnoise_1_7(vec2 P)\n{\n  vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);\n  vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);\n  Pi = mod289_1_3(Pi); // To avoid truncation effects in permutation\n  vec4 ix = Pi.xzxz;\n  vec4 iy = Pi.yyww;\n  vec4 fx = Pf.xzxz;\n  vec4 fy = Pf.yyww;\n\n  vec4 i = permute_1_4(permute_1_4(ix) + iy);\n\n  vec4 gx = fract(i * (1.0 / 41.0)) * 2.0 - 1.0 ;\n  vec4 gy_1_8 = abs(gx) - 0.5 ;\n  vec4 tx_1_9 = floor(gx + 0.5);\n  gx = gx - tx_1_9;\n\n  vec2 g00 = vec2(gx.x,gy_1_8.x);\n  vec2 g10 = vec2(gx.y,gy_1_8.y);\n  vec2 g01 = vec2(gx.z,gy_1_8.z);\n  vec2 g11 = vec2(gx.w,gy_1_8.w);\n\n  vec4 norm = taylorInvSqrt_1_5(vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11)));\n  g00 *= norm.x;\n  g01 *= norm.y;\n  g10 *= norm.z;\n  g11 *= norm.w;\n\n  float n00 = dot(g00, vec2(fx.x, fy.x));\n  float n10 = dot(g10, vec2(fx.y, fy.y));\n  float n01 = dot(g01, vec2(fx.z, fy.z));\n  float n11 = dot(g11, vec2(fx.w, fy.w));\n\n  vec2 fade_xy = fade_1_6(Pf.xy);\n  vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);\n  float n_xy = mix(n_x.x, n_x.y, fade_xy.y);\n  return 2.3 * n_xy;\n}\n\n\n\n\nvec2 pixelate(vec2 pUv, float xTiles, float yTiles) {\n  return vec2(\n    floor(pUv.x * xTiles) / xTiles,\n    floor(pUv.y * yTiles) / yTiles\n  );\n}\n\nfloat ismoothstep(float ex, float ey, float st) {\n  return 1.0 - smoothstep(ex, ey, st);\n}\n\nvoid main() {\n  float mIntensity = 0.02;\n\n  vec2 vUv2 = vUv;\n  vUv2.x *= tiles.x / tiles.y;\n\n  vec2 pUv = pixelate(vUv2, tiles.x, tiles.y);\n  float tsin = 60.0 + (t - floor(t)) * 4.0;\n  vec2 p2Uv = pixelate(vUv2, tsin * tiles.x / tiles.y, tsin);\n\n  float noisex = snoise_2_2(p2Uv * 200.0) * mIntensity;\n  float noisey = snoise_2_2(p2Uv * 200.0 + 10.0) * mIntensity;\n\n  pUv.x += noisex;\n  pUv.y += noisey;\n\n  float inten = 0.0;\n  float pDist = distance(pUv, vec2(mouse.x * tiles.x / tiles.y, mouse.y));\n\n  inten += ismoothstep(0.0, 0.2, pDist);\n  inten -= ismoothstep(0.0, 0.1, pDist);\n\n  inten = max(0.0, inten);\n\n  // vec3 color = vec3(pUv, 0.0);\n  vec3 color = vec3(inten);\n  // vec4 prevColor = texture2D(bufferTarget, vUv2 * 0.999 + 0.1);\n\n  // if (!isOrigin) color = prevColor.rgb * 0.9;\n\n  gl_FragColor = vec4(color * 2.0, inten);\n  // prevColor * 0.5 + vec4(color, 1.0) * 0.1; //prevColor * 0.9 +\n}\n"

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

new WHS.AmbientLight({ intensity: 0.1 }).addTo(_app.app);

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _app = __webpack_require__(0);

new WHS.DirectionalLight({
  intensity: 1,
  distance: 200,
  position: [0, 100, 0],
  target: [0, 0, 0]
}).addTo(_app.app);

/***/ })
/******/ ]);