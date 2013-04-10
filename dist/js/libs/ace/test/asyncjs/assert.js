// http://wiki.commonjs.org/wiki/Unit_Testing/1.0
//
// THIS IS NOT TESTED NOR LIKELY TO WORK OUTSIDE V8!
//
// Originally from narwhal.js (http://narwhaljs.org)
// Copyright (c) 2009 Thomas Robinson <280north.com>
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the 'Software'), to
// deal in the Software without restriction, including without limitation the
// rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
// sell copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED 'AS IS', WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
// ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
// WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

define(["require","exports","module","ace/lib/oop"],function(e,t,n){function o(e,t,n,r,i){throw new s.AssertionError({message:n,actual:e,expected:t,operator:r,stackStartFunction:i})}function u(e,t){if(e===t)return!0;if(typeof Buffer!="undefined"&&Buffer.isBuffer(e)&&Buffer.isBuffer(t)){if(e.length!=t.length)return!1;for(var n=0;n<e.length;n++)if(e[n]!==t[n])return!1;return!0}return e instanceof Date&&t instanceof Date?e.getTime()===t.getTime():typeof e!="object"&&typeof t!="object"?e==t:l(e,t)}function a(e){return e===null||e===undefined}function f(e){return Object.prototype.toString.call(e)=="[object Arguments]"}function l(e,t){if(a(e)||a(t))return!1;if(e.prototype!==t.prototype)return!1;if(f(e))return f(t)?(e=i.call(e),t=i.call(t),u(e,t)):!1;try{var n=Object.keys(e),r=Object.keys(t),s,o}catch(l){return!1}if(n.length!=r.length)return!1;n.sort(),r.sort();for(o=n.length-1;o>=0;o--)if(n[o]!=r[o])return!1;for(o=n.length-1;o>=0;o--){s=n[o];if(!u(e[s],t[s]))return!1}return!0}function c(e,t){return!e||!t?!1:t instanceof RegExp?t.test(e):e instanceof t?!0:t.call({},e)===!0?!0:!1}function h(e,t,n,r){var i;typeof n=="string"&&(r=n,n=null);try{t()}catch(s){i=s}r=(n&&n.name?" ("+n.name+").":".")+(r?" "+r:"."),e&&!i&&o("Missing expected exception"+r),!e&&c(i,n)&&o("Got unwanted exception"+r);if(e&&i&&n&&!c(i,n)||!e&&i)throw i}var r=e("ace/lib/oop"),i=Array.prototype.slice,s=t;s.AssertionError=function(t){this.name="AssertionError",this.message=t.message,this.actual=t.actual,this.expected=t.expected,this.operator=t.operator;var n=t.stackStartFunction||o;Error.captureStackTrace&&Error.captureStackTrace(this,n)},r.inherits(s.AssertionError,Error),toJSON=function(e){return typeof JSON!="undefined"?JSON.stringify(e):e.toString()},s.AssertionError.prototype.toString=function(){return this.message?[this.name+":",this.message].join(" "):[this.name+":",toJSON(this.expected),this.operator,toJSON(this.actual)].join(" ")},s.AssertionError.__proto__=Error.prototype,s.fail=o,s.ok=function(t,n){t||o(t,!0,n,"==",s.ok)},s.equal=function(t,n,r){t!=n&&o(t,n,r,"==",s.equal)},s.notEqual=function(t,n,r){t==n&&o(t,n,r,"!=",s.notEqual)},s.deepEqual=function(t,n,r){u(t,n)||o(t,n,r,"deepEqual",s.deepEqual)},s.notDeepEqual=function(t,n,r){u(t,n)&&o(t,n,r,"notDeepEqual",s.notDeepEqual)},s.strictEqual=function(t,n,r){t!==n&&o(t,n,r,"===",s.strictEqual)},s.notStrictEqual=function(t,n,r){t===n&&o(t,n,r,"!==",s.notStrictEqual)},s.throws=function(e,t,n){h.apply(this,[!0].concat(i.call(arguments)))},s.doesNotThrow=function(e,t,n){h.apply(this,[!1].concat(i.call(arguments)))},s.ifError=function(e){if(e)throw e}});