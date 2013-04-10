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

define(["require","exports","module","../config","../occur","../keyboard/hash_handler","../lib/oop"],function(e,t,n){function f(){}var r=e("../config"),i=e("../occur").Occur,s={name:"occur",exec:function(e,t){var n=!!e.session.$occur,r=(new i).enter(e,t);r&&!n&&f.installIn(e)},readOnly:!0},o=[{name:"occurexit",bindKey:"esc|Ctrl-G",exec:function(e){var t=e.session.$occur;if(!t)return;t.exit(e,{}),e.session.$occur||f.uninstallFrom(e)},readOnly:!0},{name:"occuraccept",bindKey:"enter",exec:function(e){var t=e.session.$occur;if(!t)return;t.exit(e,{translatePosition:!0}),e.session.$occur||f.uninstallFrom(e)},readOnly:!0}],u=e("../keyboard/hash_handler").HashHandler,a=e("../lib/oop");a.inherits(f,u),function(){this.isOccurHandler=!0,this.attach=function(e){u.call(this,o,e.commands.platform),this.$editor=e};var e=this.handleKeyboard;this.handleKeyboard=function(t,n,r,i){var s=e.call(this,t,n,r,i);return s&&s.command?s:undefined}}.call(f.prototype),f.installIn=function(e){var t=new this;e.keyBinding.addKeyboardHandler(t),e.commands.addCommands(o)},f.uninstallFrom=function(e){e.commands.removeCommands(o);var t=e.getKeyboardHandler();t.isOccurHandler&&e.keyBinding.removeKeyboardHandler(t)},t.occurStartCommand=s});