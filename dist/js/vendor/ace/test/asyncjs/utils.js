/*!
 * async.js
 * Copyright(c) 2010 Fabian Jakobs <fabian.jakobs@web.de>
 * MIT Licensed
 */

define(["require","exports","module","asyncjs/async"],function(e,t,n){var r=e("asyncjs/async");r.plugin({delay:function(e){return this.each(function(t,n){setTimeout(function(){n()},e)})},timeout:function(e){e=e||0;var t=this.source;return this.next=function(n){var r,i=setTimeout(function(){r=!0,n("Source did not respond after "+e+"ms!")},e);t.next(function(e,t){if(r)return;r=!0,clearTimeout(i),n(e,t)})},new this.constructor(this)},get:function(e){return this.map(function(t,n){n(null,t[e])})},inspect:function(){return this.each(function(e,t){console.log(JSON.stringify(e)),t()})},print:function(){return this.each(function(e,t){console.log(e),t()})}})});