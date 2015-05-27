// Universal Module Definition (you can ignore these lines)
!function(root, module_name, property_name, factory) {
  var _previousRoot_;
  var _provider_;

  var isAMD = typeof define === 'function' && define.amd;
  var isCommonJS = typeof exports === 'object';
  var isAngular = typeof angular === 'object';

  // CommonJS
  if (isCommonJS) {
    _provider_ = factory(require('crypto'));
    module.exports[property_name] = _provider_;
    if (isAngular) {
      module.exports[module_name] = angular.module(module_name, []).factory(property_name, [_provider_]);
    }
  }
  // Angular
  else if (isAngular) {
    _provider_ = factory((root.crypto || root.msCrypto));
    angular.module(module_name, []).factory(property_name, [_provider_]);
  }
  // AMD
  else if (isAMD) {
    define(['angular', 'crypto'], function (angular, crypto) {
      _provider_ = factory(crypto);
      return angular.module(module_name, []).factory(property_name, [_provider_]);
    });
  }
  // Global
  else {
    _provider_ = factory((root.crypto || root.msCrypto));
    _previousRoot_ = root[property_name];
    _provider_.noConflict = function() {
      root[property_name] = _previousRoot_;
      return _provider_;
    };
    root[property_name] = _provider_;
  }
// Global, module,  name,    factory
}( this,  'ngUUID','$uuid' , function(crypto) {
  'use strict';

  var TypeArray = (Uint16Array || Int16Array);

  function isDefined(value) {
    return typeof value !== 'undefined';
  }
  function isString(value) {
    return typeof value === 'string';
  }
  function isUUID(value) {
    var regexp = /[a-f0-9]{8}-[a-f0-9]{4}-4[a-f0-9]{3}-[89aAbB][a-f0-9]{3}-[a-f0-9]{12}/;
    return regexp.test(value);
  }
  function getRandomValues(buf) {
    // Browser
    if (crypto.getRandomValues) return crypto.getRandomValues(buf);
    // Node
    if (crypto.randomBytes) {
      var bytes = crypto.randomBytes(buf.length);
      buf.set(bytes);
    }


  }

  function secRandom() {
    // If we have a cryptographically secure PRNG, use that
    // http://stackoverflow.com/questions/6906916/collisions-when-generating-uuids-in-javascript
    var buf = new TypeArray(8);
    getRandomValues(buf);
    var S4 = function(num) {
      var ret = num.toString(16);
      while(ret.length < 4){
        ret = "0"+ret;
      }
      return ret;
    };
    return (S4(buf[0])+S4(buf[1])+"-"+S4(buf[2])+"-"+S4(buf[3])+"-"+S4(buf[4])+"-"+S4(buf[5])+S4(buf[6])+S4(buf[7]));
  }

  function jsRandom() {
    // Otherwise, just use Math.random
    // http://stackoverflow.com/questions/105034/how-to-create-a-guid-uuid-in-javascript/2117523#2117523
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
      var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
      return v.toString(16);
    });
  }

  function uuid() {
    return (isDefined(crypto)) ? secRandom : jsRandom;
  }
  uuid.isUUID = function(_uuid) {
    return (isString(_uuid)) ? isUUID : false;
  };

  return uuid;

}); // jshint ignore:line
