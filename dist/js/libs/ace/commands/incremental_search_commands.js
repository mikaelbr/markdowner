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

define(["require","exports","module","../config","../lib/oop","../keyboard/hash_handler","./occur_commands"],function(e,t,n){function u(e){this.$iSearch=e}var r=e("../config"),i=e("../lib/oop"),s=e("../keyboard/hash_handler").HashHandler,o=e("./occur_commands").occurStartCommand;t.iSearchStartCommands=[{name:"iSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e,t){r.loadModule(["core","ace/incremental_search"],function(n){var r=n.iSearch=n.iSearch||new n.IncrementalSearch;r.activate(e,t.backwards),t.jumpToFirstMatch&&r.next(t)})},readOnly:!0},{name:"iSearchBackwards",exec:function(e,t){e.execCommand("iSearch",{backwards:!0})},readOnly:!0},{name:"iSearchAndGo",bindKey:{win:"Ctrl-K",mac:"Command-G"},exec:function(e,t){e.execCommand("iSearch",{jumpToFirstMatch:!0,useCurrentOrPrevSearch:!0})},readOnly:!0},{name:"iSearchBackwardsAndGo",bindKey:{win:"Ctrl-Shift-K",mac:"Command-Shift-G"},exec:function(e){e.execCommand("iSearch",{jumpToFirstMatch:!0,backwards:!0,useCurrentOrPrevSearch:!0})},readOnly:!0}],t.iSearchCommands=[{name:"restartSearch",bindKey:{win:"Ctrl-F",mac:"Command-F"},exec:function(e){e.cancelSearch(!0)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"searchForward",bindKey:{win:"Ctrl-S|Ctrl-K",mac:"Ctrl-S|Command-G"},exec:function(e,t){t.useCurrentOrPrevSearch=!0,e.next(t)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"searchBackward",bindKey:{win:"Ctrl-R|Ctrl-Shift-K",mac:"Ctrl-R|Command-Shift-G"},exec:function(e,t){t.useCurrentOrPrevSearch=!0,t.backwards=!0,e.next(t)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"extendSearchTerm",exec:function(e,t){e.addChar(t)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"extendSearchTermSpace",bindKey:"space",exec:function(e){e.addChar(" ")},readOnly:!0,isIncrementalSearchCommand:!0},{name:"shrinkSearchTerm",bindKey:"backspace",exec:function(e){e.removeChar()},readOnly:!0,isIncrementalSearchCommand:!0},{name:"confirmSearch",bindKey:"return",exec:function(e){e.deactivate()},readOnly:!0,isIncrementalSearchCommand:!0},{name:"cancelSearch",bindKey:"esc|Ctrl-G",exec:function(e){e.deactivate(!0)},readOnly:!0,isIncrementalSearchCommand:!0},{name:"occurisearch",bindKey:"Ctrl-O",exec:function(e){var t=i.mixin({},e.$options);e.deactivate(),o.exec(e.$editor,t)},readOnly:!0,isIncrementalSearchCommand:!0}],i.inherits(u,s),function(){this.attach=function(e){var n=this.$iSearch;s.call(this,t.iSearchCommands,e.commands.platform),this.$commandExecHandler=e.commands.addEventListener("exec",function(e){return e.command.isIncrementalSearchCommand?(e.stopPropagation(),e.preventDefault(),e.command.exec(n,e.args||{})):undefined})},this.detach=function(e){if(!this.$commandExecHandler)return;e.commands.removeEventListener("exec",this.$commandExecHandler),delete this.$commandExecHandler};var e=this.handleKeyboard;this.handleKeyboard=function(t,n,r,i){var s=e.call(this,t,n,r,i);if(s.command)return s;if(n==-1){var o=this.commands.extendSearchTerm;if(o)return{command:o,args:r}}return{command:"null",passEvent:n==0||n==4}}}.call(u.prototype),t.IncrementalSearchKeyboardHandler=u});