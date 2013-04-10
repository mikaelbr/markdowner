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

define(["require","exports","module","./lib/oop","./range","./search","./search_highlight","./commands/incremental_search_commands","./lib/dom","./commands/command_manager","./editor","./config"],function(e,t,n){function f(){this.$options={wrap:!1,skipCurrent:!1},this.$keyboardHandler=new a(this)}var r=e("./lib/oop"),i=e("./range").Range,s=e("./search").Search,o=e("./search_highlight").SearchHighlight,u=e("./commands/incremental_search_commands"),a=u.IncrementalSearchKeyboardHandler;r.inherits(f,s),function(){this.activate=function(e,t){this.$editor=e,this.$startPos=this.$currentPos=e.getCursorPosition(),this.$options.needle="",this.$options.backwards=t,e.keyBinding.addKeyboardHandler(this.$keyboardHandler),this.$mousedownHandler=e.addEventListener("mousedown",this.onMouseDown.bind(this)),this.selectionFix(e),this.statusMessage(!0)},this.deactivate=function(e){this.cancelSearch(e),this.$editor.keyBinding.removeKeyboardHandler(this.$keyboardHandler),this.$mousedownHandler&&(this.$editor.removeEventListener("mousedown",this.$mousedownHandler),delete this.$mousedownHandler),this.message("")},this.selectionFix=function(e){e.selection.isEmpty()&&!e.session.$emacsMark&&e.clearSelection()},this.highlight=function(e){var t=this.$editor.session,n=t.$isearchHighlight=t.$isearchHighlight||t.addDynamicMarker(new o(null,"ace_isearch-result","text"));n.setRegexp(e),t._emit("changeBackMarker")},this.cancelSearch=function(e){var t=this.$editor;return this.$prevNeedle=this.$options.needle,this.$options.needle="",e&&(t.moveCursorToPosition(this.$startPos),this.$currentPos=this.$startPos),this.highlight(null),i.fromPoints(this.$currentPos,this.$currentPos)},this.highlightAndFindWithNeedle=function(e,t){if(!this.$editor)return null;var n=this.$options;t&&(n.needle=t.call(this,n.needle||"")||"");if(n.needle.length===0)return this.statusMessage(!0),this.cancelSearch(!0);n.start=this.$currentPos;var r=this.$editor.session,s=this.find(r);return s&&(n.backwards&&(s=i.fromPoints(s.end,s.start)),this.$editor.moveCursorToPosition(s.end),e&&(this.$currentPos=s.end),this.highlight(n.re)),this.statusMessage(s),s},this.addChar=function(e){return this.highlightAndFindWithNeedle(!1,function(t){return t+e})},this.removeChar=function(e){return this.highlightAndFindWithNeedle(!1,function(e){return e.length>0?e.substring(0,e.length-1):e})},this.next=function(e){return e=e||{},this.$options.backwards=!!e.backwards,this.$currentPos=this.$editor.getCursorPosition(),this.highlightAndFindWithNeedle(!0,function(t){return e.useCurrentOrPrevSearch&&t.length===0?this.$prevNeedle||"":t})},this.onMouseDown=function(e){return this.deactivate(),!0},this.statusMessage=function(e){var t=this.$options,n="";n+=t.backwards?"reverse-":"",n+="isearch: "+t.needle,n+=e?"":" (not found)",this.message(n)},this.message=function(e){this.$editor.showCommandLine?(this.$editor.showCommandLine(e),this.$editor.focus()):console.log(e)}}.call(f.prototype),t.IncrementalSearch=f;var l=e("./lib/dom");l.importCssString&&l.importCssString(".ace_marker-layer .ace_isearch-result {  position: absolute;  z-index: 6;  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box;  box-sizing: border-box;}div.ace_isearch-result {  border-radius: 4px;  background-color: rgba(255, 200, 0, 0.5);  box-shadow: 0 0 4px rgb(255, 200, 0);}.ace_dark div.ace_isearch-result {  background-color: rgb(100, 110, 160);  box-shadow: 0 0 4px rgb(80, 90, 140);}","incremental-search-highlighting");var c=e("./commands/command_manager");(function(){this.setupIncrementalSearch=function(e,t){if(this.usesIncrementalSearch==t)return;this.usesIncrementalSearch=t;var n=u.iSearchStartCommands,r=t?"addCommands":"removeCommands";this[r](n)}}).call(c.CommandManager.prototype);var h=e("./editor").Editor;e("./config").defineOptions(h.prototype,"editor",{useIncrementalSearch:{set:function(e){this.keyBinding.$handlers.forEach(function(t){t.setupIncrementalSearch&&t.setupIncrementalSearch(this,e)}),this._emit("incrementalSearchSettingChanged",{isEnabled:e})}}})});