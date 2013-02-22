/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","./lib/lang","./lib/oop","./lib/net","./lib/event_emitter"],function(e,t,n){"no use strict";function f(e){return e.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}var r=e("./lib/lang"),i=e("./lib/oop"),s=e("./lib/net"),o=e("./lib/event_emitter").EventEmitter,u=function(){return this}(),a={packaged:!1,workerPath:null,modePath:null,themePath:null,basePath:"",suffix:".js",$moduleUrls:{}};t.get=function(e){if(!a.hasOwnProperty(e))throw new Error("Unknown config key: "+e);return a[e]},t.set=function(e,t){if(!a.hasOwnProperty(e))throw new Error("Unknown config key: "+e);a[e]=t},t.all=function(){return r.copyObject(a)},i.implement(t,o),t.moduleUrl=function(e,t){if(a.$moduleUrls[e])return a.$moduleUrls[e];var n=e.split("/");t=t||n[n.length-2]||"";var r=n[n.length-1].replace(t,"").replace(/(^[\-_])|([\-_]$)/,"");!r&&n.length>1&&(r=n[n.length-2]);var i=a[t+"Path"];return i==null&&(i=a.basePath),i&&i.slice(-1)!="/"&&(i+="/"),i+t+"-"+r+this.get("suffix")},t.setModuleUrl=function(e,t){return a.$moduleUrls[e]=t},t.loadModule=function(n,r){var i,o;Array.isArray(n)&&(o=n[0],n=n[1]);try{i=e(n)}catch(u){}if(i)return r(i);var a=function(){e([n],function(e){t._emit("load.module",{name:n,module:e}),r(e)})};if(!t.get("packaged"))return a();s.loadScript(t.moduleUrl(n,o),a)},t.init=function(){a.packaged=e.packaged||n.packaged||u.define&&define.packaged;if(!u.document)return"";var r={},i="",s=document.getElementsByTagName("script");for(var o=0;o<s.length;o++){var l=s[o],c=l.src||l.getAttribute("src");if(!c)continue;var h=l.attributes;for(var p=0,d=h.length;p<d;p++){var v=h[p];v.name.indexOf("data-ace-")===0&&(r[f(v.name.replace(/^data-ace-/,""))]=v.value)}var m=c.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);m&&(i=m[1])}i&&(r.base=r.base||i,r.packaged=!0),r.basePath=r.base,r.workerPath=r.workerPath||r.base,r.modePath=r.modePath||r.base,r.themePath=r.themePath||r.base,delete r.base;for(var g in r)typeof r[g]!="undefined"&&t.set(g,r[g])};var l={setOptions:function(e){Object.keys(e).forEach(function(t){this.setOption(t,e[t])},this)},getOptions:function(e){var t={};return Object.keys(e).forEach(function(e){t[e]=this.getOption(e)},this),t},setOption:function(e,t){if(this["$"+e]===t)return;var n=this.$options[e];if(!n)return undefined;if(n.forwardTo)return this[n.forwardTo]&&this[n.forwardTo].setOption(e,t);n.handlesSet||(this["$"+e]=t),n&&n.set&&n.set.call(this,t)},getOption:function(e){var t=this.$options[e];return t?t.forwardTo?this[t.forwardTo]&&this[t.forwardTo].getOption(e):t&&t.get?t.get.call(this):this["$"+e]:undefined}},c={};t.defineOptions=function(e,t,n){return e.$options||(c[t]=e.$options={}),Object.keys(n).forEach(function(t){var r=n[t];typeof r=="string"&&(r={forwardTo:r}),r.name||(r.name=t),e.$options[r.name]=r,"initialValue"in r&&(e["$"+r.name]=r.initialValue)}),i.implement(e,l),this},t.resetOptions=function(e){Object.keys(e.$options).forEach(function(t){var n=e.$options[t];"value"in n&&e.setOption(t,n.value)})},t.setDefaultValue=function(e,n,r){var i=c[e]||(c[e]={});i[n]&&(i.forwardTo?t.setDefaultValue(i.forwardTo,n,r):i[n].value=r)},t.setDefaultValues=function(e,n){Object.keys(n).forEach(function(r){t.setDefaultValue(e,r,n[r])})}});