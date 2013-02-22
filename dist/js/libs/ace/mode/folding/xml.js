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

define(["require","exports","module","../../lib/oop","../../lib/lang","../../range","./fold_mode","../../token_iterator"],function(e,t,n){var r=e("../../lib/oop"),i=e("../../lib/lang"),s=e("../../range").Range,o=e("./fold_mode").FoldMode,u=e("../../token_iterator").TokenIterator,a=t.FoldMode=function(e){o.call(this),this.voidElements=e||{}};r.inherits(a,o),function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r.closing?t=="markbeginend"?"end":"":!r.tagName||this.voidElements[r.tagName.toLowerCase()]?"":r.selfClosing?"":r.value.indexOf("/"+r.tagName)!==-1?"":"start"},this._getFirstTagInLine=function(e,t){var n=e.getTokens(t),r="";for(var s=0;s<n.length;s++){var o=n[s];o.type.indexOf("meta.tag")===0?r+=o.value:r+=i.stringRepeat(" ",o.value.length)}return this._parseTag(r)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(e){var t=this.tagRe.exec(e),n=this.tagRe.lastIndex||0;return this.tagRe.lastIndex=0,{value:e,match:t?t[2]:"",closing:t?!!t[3]:!1,selfClosing:t?!!t[5]||t[2]=="/>":!1,tagName:t?t[4]:"",column:t[1]?n+t[1].length:n}},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n="",r;do if(t.type.indexOf("meta.tag")===0){if(!r)var r={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()};n+=t.value;if(n.indexOf(">")!==-1){var i=this._parseTag(n);return i.start=r,i.end={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length},e.stepForward(),i}}while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n="",r;do if(t.type.indexOf("meta.tag")===0){r||(r={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length}),n=t.value+n;if(n.indexOf("<")!==-1){var i=this._parseTag(n);return i.end=r,i.start={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()},e.stepBackward(),i}}while(t=e.stepBackward());return null},this._pop=function(e,t){while(e.length){var n=e[e.length-1];if(!t||n.tagName==t.tagName)return e.pop();if(this.voidElements[t.tagName])return;if(this.voidElements[n.tagName]){e.pop();continue}return null}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r.match)return null;var i=r.closing||r.selfClosing,o=[],a;if(!i){var f=new u(e,n,r.column),l={row:n,column:r.column+r.tagName.length+2};while(a=this._readTagForward(f)){if(a.selfClosing){if(!o.length)return a.start.column+=a.tagName.length+2,a.end.column-=2,s.fromPoints(a.start,a.end);continue}if(a.closing){this._pop(o,a);if(o.length==0)return s.fromPoints(l,a.start)}else o.push(a)}}else{var f=new u(e,n,r.column+r.match.length),c={row:n,column:r.column};while(a=this._readTagBackward(f)){if(a.selfClosing){if(!o.length)return a.start.column+=a.tagName.length+2,a.end.column-=2,s.fromPoints(a.start,a.end);continue}if(!a.closing){this._pop(o,a);if(o.length==0)return a.start.column+=a.tagName.length+2,s.fromPoints(a.start,c)}else o.push(a)}}}}.call(a.prototype)});