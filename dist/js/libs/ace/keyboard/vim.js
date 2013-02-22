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

define(["require","exports","module","./vim/commands","./vim/maps/util","../lib/useragent"],function(e,t,n){var r=e("./vim/commands"),i=r.coreCommands,s=e("./vim/maps/util"),o=e("../lib/useragent"),u={i:{command:i.start},I:{command:i.startBeginning},a:{command:i.append},A:{command:i.appendEnd},"ctrl-f":{command:"gotopagedown"},"ctrl-b":{command:"gotopageup"}};t.handler={handleMacRepeat:function(e,t,n){if(t==-1)e.inputChar=n,e.lastEvent="input";else if(e.inputChar&&e.$lastHash==t&&e.$lastKey==n){if(e.lastEvent=="input")e.lastEvent="input1";else if(e.lastEvent=="input1")return!0}else e.$lastHash=t,e.$lastKey=n,e.lastEvent="keypress"},handleKeyboard:function(e,t,n,s,a){if(t!=0&&(n==""||n=="\0"))return null;t==1&&(n="ctrl-"+n);if(n=="esc"&&t==0||n=="ctrl-[")return{command:i.stop};if(e.state=="start"){o.isMac&&this.handleMacRepeat(e,t,n)&&(t=-1,n=e.inputChar);if(t==-1||t==1||t==0&&n.length>1)return r.inputBuffer.idle&&u[n]?u[n]:{command:{exec:function(e){return r.inputBuffer.push(e,n)}}};if(n.length==1&&(t==0||t==4))return{command:"null",passEvent:!0};if(n=="esc"&&t==0)return{command:i.stop}}else if(n=="ctrl-w")return{command:"removewordleft"}},attach:function(e){e.on("click",t.onCursorMove),s.currentMode!=="insert"&&r.coreCommands.stop.exec(e),e.$vimModeHandler=this},detach:function(e){e.removeListener("click",t.onCursorMove),s.noMode(e),s.currentMode="normal"},actions:r.actions,getStatusText:function(){return s.currentMode=="insert"?"INSERT":s.onVisualMode?(s.onVisualLineMode?"VISUAL LINE ":"VISUAL ")+r.inputBuffer.status:r.inputBuffer.status}},t.onCursorMove=function(e){r.onCursorMove(e.editor,e),t.onCursorMove.scheduled=!1}});