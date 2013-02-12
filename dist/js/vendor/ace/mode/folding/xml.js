/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","../../lib/oop","../../lib/lang","../../range","./fold_mode","../../token_iterator"],function(e,t,n){var r=e("../../lib/oop"),i=e("../../lib/lang"),s=e("../../range").Range,o=e("./fold_mode").FoldMode,u=e("../../token_iterator").TokenIterator,a=t.FoldMode=function(e){o.call(this),this.voidElements=e||{}};r.inherits(a,o),function(){this.getFoldWidget=function(e,t,n){var r=this._getFirstTagInLine(e,n);return r.closing?t=="markbeginend"?"end":"":!r.tagName||this.voidElements[r.tagName.toLowerCase()]?"":r.selfClosing?"":r.value.indexOf("/"+r.tagName)!==-1?"":"start"},this._getFirstTagInLine=function(e,t){var n=e.getTokens(t),r="";for(var s=0;s<n.length;s++){var o=n[s];o.type.indexOf("meta.tag")===0?r+=o.value:r+=i.stringRepeat(" ",o.value.length)}return this._parseTag(r)},this.tagRe=/^(\s*)(<?(\/?)([-_a-zA-Z0-9:!]*)\s*(\/?)>?)/,this._parseTag=function(e){var t=this.tagRe.exec(e),n=this.tagRe.lastIndex||0;return this.tagRe.lastIndex=0,{value:e,match:t?t[2]:"",closing:t?!!t[3]:!1,selfClosing:t?!!t[5]||t[2]=="/>":!1,tagName:t?t[4]:"",column:t[1]?n+t[1].length:n}},this._readTagForward=function(e){var t=e.getCurrentToken();if(!t)return null;var n="",r;do if(t.type.indexOf("meta.tag")===0){if(!r)var r={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()};n+=t.value;if(n.indexOf(">")!==-1){var i=this._parseTag(n);return i.start=r,i.end={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length},e.stepForward(),i}}while(t=e.stepForward());return null},this._readTagBackward=function(e){var t=e.getCurrentToken();if(!t)return null;var n="",r;do if(t.type.indexOf("meta.tag")===0){r||(r={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()+t.value.length}),n=t.value+n;if(n.indexOf("<")!==-1){var i=this._parseTag(n);return i.end=r,i.start={row:e.getCurrentTokenRow(),column:e.getCurrentTokenColumn()},e.stepBackward(),i}}while(t=e.stepBackward());return null},this._pop=function(e,t){while(e.length){var n=e[e.length-1];if(!t||n.tagName==t.tagName)return e.pop();if(this.voidElements[t.tagName])return;if(this.voidElements[n.tagName]){e.pop();continue}return null}},this.getFoldWidgetRange=function(e,t,n){var r=this._getFirstTagInLine(e,n);if(!r.match)return null;var i=r.closing||r.selfClosing,o=[],a;if(!i){var f=new u(e,n,r.column),l={row:n,column:r.column+r.tagName.length+2};while(a=this._readTagForward(f)){if(a.selfClosing){if(!o.length)return a.start.column+=a.tagName.length+2,a.end.column-=2,s.fromPoints(a.start,a.end);continue}if(a.closing){this._pop(o,a);if(o.length==0)return s.fromPoints(l,a.start)}else o.push(a)}}else{var f=new u(e,n,r.column+r.match.length),c={row:n,column:r.column};while(a=this._readTagBackward(f)){if(a.selfClosing){if(!o.length)return a.start.column+=a.tagName.length+2,a.end.column-=2,s.fromPoints(a.start,a.end);continue}if(!a.closing){this._pop(o,a);if(o.length==0)return a.start.column+=a.tagName.length+2,s.fromPoints(a.start,c)}else o.push(a)}}}}.call(a.prototype)});