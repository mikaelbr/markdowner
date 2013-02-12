/* vim:ts=4:sts=4:sw=4:
 * ***** BEGIN LICENSE BLOCK *****
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
 *      Mihai Sucan <mihai DOT sucan AT gmail DOT com>
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

define(["require","exports","module","./lib/lang","./lib/oop","./range"],function(e,t,n){var r=e("./lib/lang"),i=e("./lib/oop"),s=e("./range").Range,o=function(){this.$options={}};(function(){this.set=function(e){return i.mixin(this.$options,e),this},this.getOptions=function(){return r.copyObject(this.$options)},this.setOptions=function(e){this.$options=e},this.find=function(e){var t=this.$matchIterator(e,this.$options);if(!t)return!1;var n=null;return t.forEach(function(e,t,r){if(!e.start){var i=e.offset+(r||0);n=new s(t,i,t,i+e.length)}else n=e;return!0}),n},this.findAll=function(e){var t=this.$options;if(!t.needle)return[];this.$assembleRegExp(t);if(t.range)var n=t.range,i=e.getLines(n.start.row,n.end.row);else var i=e.doc.getAllLines();var o=[],u=t.re;if(t.$isMultiLine){var a=u.length,f=i.length-a;for(var l=u.offset||0;l<f;l++){for(var c=0;c<u.length;c++)if(i[l+c].search(u[c])==-1)break;var h=i[l+c].match(u[0])[0].length,p=line.match(u[a-1])[0].length;o.push(new s(l,startLine.length-h,l+a-1,p))}}else for(var d=0;d<i.length;d++){var v=r.getMatchOffsets(i[d],u);for(var c=0;c<v.length;c++){var m=v[c];o.push(new s(d,m.offset,d,m.offset+m.length))}}if(t.range){var g=n.start.column,y=n.start.column,d=0,c=o.length-1;while(d<c&&o[d].start.column<g&&o[d].start.row==n.start.row)d++;while(d<c&&o[c].end.column>y&&o[c].end.row==n.end.row)c--;return o.slice(d,c+1)}return o},this.replace=function(e,t){var n=this.$options,r=this.$assembleRegExp(n);if(n.$isMultiLine)return t;if(!r)return;var i=r.exec(e);if(!i||i[0].length!=e.length)return null;t=e.replace(r,t);if(n.preserveCase){t=t.split("");for(var s=Math.min(e.length,e.length);s--;){var o=e[s];o&&o.toLowerCase()!=o?t[s]=t[s].toUpperCase():t[s]=t[s].toLowerCase()}t=t.join("")}return t},this.$matchIterator=function(e,t){var n=this.$assembleRegExp(t);if(!n)return!1;var i=this,o,u=t.backwards;if(t.$isMultiLine)var a=n.length,f=function(t,r,i){var u=t.search(n[0]);if(u==-1)return;for(var f=1;f<a;f++){t=e.getLine(r+f);if(t.search(n[f])==-1)return}var l=t.match(n[a-1])[0].length,c=new s(r,u,r+a-1,l);n.offset==1?(c.start.row--,c.start.column=Number.MAX_VALUE):i&&(c.start.column+=i);if(o(c))return!0};else if(u)var f=function(e,t,i){var s=r.getMatchOffsets(e,n);for(var u=s.length-1;u>=0;u--)if(o(s[u],t,i))return!0};else var f=function(e,t,i){var s=r.getMatchOffsets(e,n);for(var u=0;u<s.length;u++)if(o(s[u],t,i))return!0};return{forEach:function(n){o=n,i.$lineIterator(e,t).forEach(f)}}},this.$assembleRegExp=function(e){if(e.needle instanceof RegExp)return e.re=e.needle;var t=e.needle;if(!e.needle)return e.re=!1;e.regExp||(t=r.escapeRegExp(t)),e.wholeWord&&(t="\\b"+t+"\\b");var n=e.caseSensitive?"g":"gi";e.$isMultiLine=/[\n\r]/.test(t);if(e.$isMultiLine)return e.re=this.$assembleMultilineRegExp(t,n);try{var i=new RegExp(t,n)}catch(s){var i=!1}return e.re=i},this.$assembleMultilineRegExp=function(e,t){var n=e.replace(/\r\n|\r|\n/g,"$\n^").split("\n"),r=[];for(var i=0;i<n.length;i++)try{r.push(new RegExp(n[i],t))}catch(s){return!1}return n[0]==""?(r.shift(),r.offset=1):r.offset=0,r},this.$lineIterator=function(e,t){var n=t.range,r=t.backwards==1,i=t.skipCurrent!=0,n=t.range,s=t.start;s||(s=n?n[r?"end":"start"]:e.selection.getRange()),s.start&&(s=s[i!=r?"end":"start"]);var o=n?n.start.row:0,u=n?n.start.column:0,a=n?n.end.row:e.getLength()-1;if(!r)var f=function(n){var r=s.row,i=e.getLine(r).substr(s.column);if(n(i,r,s.column))return;for(r+=1;r<=a;r++)if(n(e.getLine(r),r))return;if(t.wrap==0)return;for(r=o,a=s.row;r<=a;r++)if(n(e.getLine(r),r))return};else var f=function(n){var r=s.row,i=e.getLine(r).substring(0,s.column);if(n(i,r))return;for(r--;r>=o;r--)if(n(e.getLine(r),r))return;if(t.wrap==0)return;for(r=a,o=s.row;r>=o;r--)if(n(e.getLine(r),r))return};return{forEach:f}}}).call(o.prototype),t.Search=o});