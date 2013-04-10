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

define(["require","exports","module","./lib/oop","./range","./search","./edit_session","./search_highlight","./lib/dom"],function(e,t,n){function a(){}var r=e("./lib/oop"),i=e("./range").Range,s=e("./search").Search,o=e("./edit_session").EditSession,u=e("./search_highlight").SearchHighlight;r.inherits(a,s),function(){this.enter=function(e,t){if(!t.needle)return!1;var n=e.getCursorPosition();this.displayOccurContent(e,t);var r=this.originalToOccurPosition(e.session,n);return e.moveCursorToPosition(r),!0},this.exit=function(e,t){var n=t.translatePosition&&e.getCursorPosition(),r=n&&this.occurToOriginalPosition(e.session,n);return this.displayOriginalContent(e),r&&e.moveCursorToPosition(r),!0},this.highlight=function(e,t){var n=e.$occurHighlight=e.$occurHighlight||e.addDynamicMarker(new u(null,"ace_occur-highlight","text"));n.setRegexp(t),e._emit("changeBackMarker")},this.displayOccurContent=function(e,t){this.$originalSession=e.session;var n=this.matchingLines(e.session,t),r=n.map(function(e){return e.content}),i=new o(r.join("\n"));i.$occur=this,i.$occurMatchingLines=n,e.setSession(i),this.highlight(i,t.re),i._emit("changeBackMarker")},this.displayOriginalContent=function(e){e.setSession(this.$originalSession)},this.originalToOccurPosition=function(e,t){var n=e.$occurMatchingLines,r={row:0,column:0};if(!n)return r;for(var i=0;i<n.length;i++)if(n[i].row===t.row)return{row:i,column:t.column};return r},this.occurToOriginalPosition=function(e,t){var n=e.$occurMatchingLines;return!n||!n[t.row]?t:{row:n[t.row].row,column:t.column}},this.matchingLines=function(e,t){t=r.mixin({},t);if(!e||!t.needle)return[];var n=new s;return n.set(t),n.findAll(e).reduce(function(t,n){var r=n.start.row,i=t[t.length-1];return i&&i.row===r?t:t.concat({row:r,content:e.getLine(r)})},[])}}.call(a.prototype);var f=e("./lib/dom");f.importCssString(".ace_occur-highlight {\n    border-radius: 4px;\n    background-color: rgba(87, 255, 8, 0.25);\n    position: absolute;\n    z-index: 4;\n    -moz-box-sizing: border-box;\n    -webkit-box-sizing: border-box;\n    box-sizing: border-box;\n    box-shadow: 0 0 4px rgb(91, 255, 50);\n}\n.ace_dark .ace_occur-highlight {\n    background-color: rgb(80, 140, 85);\n    box-shadow: 0 0 4px rgb(60, 120, 70);\n}\n","incremental-occur-highlighting"),t.Occur=a});