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

define(["require","exports","module","../lib/event","../lib/useragent","./default_handlers","./default_gutter_handler","./mouse_event","./dragdrop","../config"],function(e,t,n){var r=e("../lib/event"),i=e("../lib/useragent"),s=e("./default_handlers").DefaultHandlers,o=e("./default_gutter_handler").GutterHandler,u=e("./mouse_event").MouseEvent,a=e("./dragdrop").DragdropHandler,f=e("../config"),l=function(e){this.editor=e,new s(this),new o(this),new a(this),r.addListener(e.container,"mousedown",function(t){return e.focus(),r.preventDefault(t)});var t=e.renderer.getMouseEventTarget();r.addListener(t,"click",this.onMouseEvent.bind(this,"click")),r.addListener(t,"mousemove",this.onMouseMove.bind(this,"mousemove")),r.addMultiMouseDownListener(t,[300,300,250],this,"onMouseEvent"),r.addMouseWheelListener(e.container,this.onMouseWheel.bind(this,"mousewheel"));var n=e.renderer.$gutter;r.addListener(n,"mousedown",this.onMouseEvent.bind(this,"guttermousedown")),r.addListener(n,"click",this.onMouseEvent.bind(this,"gutterclick")),r.addListener(n,"dblclick",this.onMouseEvent.bind(this,"gutterdblclick")),r.addListener(n,"mousemove",this.onMouseEvent.bind(this,"guttermousemove"))};(function(){this.onMouseEvent=function(e,t){this.editor._emit(e,new u(t,this.editor))},this.onMouseMove=function(e,t){var n=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove;if(!n||!n.length)return;this.editor._emit(e,new u(t,this.editor))},this.onMouseWheel=function(e,t){var n=new u(t,this.editor);n.speed=this.$scrollSpeed*2,n.wheelX=t.wheelX,n.wheelY=t.wheelY,this.editor._emit(e,n)},this.setState=function(e){this.state=e},this.captureMouse=function(e,t){t&&this.setState(t),this.x=e.x,this.y=e.y,this.isMousePressed=!0;var n=this.editor.renderer;n.$keepTextAreaAtCursor&&(n.$keepTextAreaAtCursor=null);var s=this,o=function(e){s.x=e.clientX,s.y=e.clientY},u=function(e){clearInterval(f),a(),s[s.state+"End"]&&s[s.state+"End"](e),s.$clickSelection=null,n.$keepTextAreaAtCursor==null&&(n.$keepTextAreaAtCursor=!0,n.$moveTextAreaToCursor()),s.isMousePressed=!1,s.onMouseEvent("mouseup",e)},a=function(){s[s.state]&&s[s.state]()};if(i.isOldIE&&e.domEvent.type=="dblclick")return setTimeout(function(){u(e.domEvent)});r.capture(this.editor.container,o,u);var f=setInterval(a,20)}}).call(l.prototype),f.defineOptions(l.prototype,"mouseHandler",{scrollSpeed:{initialValue:2},dragDelay:{initialValue:150},focusTimout:{initialValue:0}}),t.MouseHandler=l});