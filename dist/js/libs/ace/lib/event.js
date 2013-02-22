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

define(["require","exports","module","./keys","./useragent","./dom"],function(e,t,n){function o(e,t,n){var s=0;!i.isOpera||"KeyboardEvent"in window||!i.isMac?s=0|(t.ctrlKey?1:0)|(t.altKey?2:0)|(t.shiftKey?4:0)|(t.metaKey?8:0):s=0|(t.metaKey?1:0)|(t.altKey?2:0)|(t.shiftKey?4:0)|(t.ctrlKey?8:0);if(n in r.MODIFIER_KEYS){switch(r.MODIFIER_KEYS[n]){case"Alt":s=2;break;case"Shift":s=4;break;case"Ctrl":s=1;break;default:s=8}n=0}return s&8&&(n==91||n==93)&&(n=0),!!s||n in r.FUNCTION_KEYS||n in r.PRINTABLE_KEYS?e(t,s,n):!1}var r=e("./keys"),i=e("./useragent"),s=e("./dom");t.addListener=function(e,t,n){if(e.addEventListener)return e.addEventListener(t,n,!1);if(e.attachEvent){var r=function(){n(window.event)};n._wrapper=r,e.attachEvent("on"+t,r)}},t.removeListener=function(e,t,n){if(e.removeEventListener)return e.removeEventListener(t,n,!1);e.detachEvent&&e.detachEvent("on"+t,n._wrapper||n)},t.stopEvent=function(e){return t.stopPropagation(e),t.preventDefault(e),!1},t.stopPropagation=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},t.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},t.getButton=function(e){return e.type=="dblclick"?0:e.type=="contextmenu"||e.ctrlKey&&i.isMac?2:e.preventDefault?e.button:{1:0,2:2,4:1}[e.button]},document.documentElement.setCapture?t.capture=function(e,n,r){function s(o){n(o),i||(i=!0,r(o)),t.removeListener(e,"mousemove",n),t.removeListener(e,"mouseup",s),t.removeListener(e,"losecapture",s),e.releaseCapture()}var i=!1;t.addListener(e,"mousemove",n),t.addListener(e,"mouseup",s),t.addListener(e,"losecapture",s),e.setCapture()}:t.capture=function(e,t,n){function r(e){t&&t(e),n&&n(e),document.removeEventListener("mousemove",t,!0),document.removeEventListener("mouseup",r,!0),e.stopPropagation()}document.addEventListener("mousemove",t,!0),document.addEventListener("mouseup",r,!0)},t.addMouseWheelListener=function(e,n){var r=8,i=function(e){e.wheelDelta!==undefined?e.wheelDeltaX!==undefined?(e.wheelX=-e.wheelDeltaX/r,e.wheelY=-e.wheelDeltaY/r):(e.wheelX=0,e.wheelY=-e.wheelDelta/r):e.axis&&e.axis==e.HORIZONTAL_AXIS?(e.wheelX=(e.detail||0)*5,e.wheelY=0):(e.wheelX=0,e.wheelY=(e.detail||0)*5),n(e)};t.addListener(e,"DOMMouseScroll",i),t.addListener(e,"mousewheel",i)},t.addMultiMouseDownListener=function(e,n,r,s){var o=0,u,a,f,l={2:"dblclick",3:"tripleclick",4:"quadclick"};t.addListener(e,"mousedown",function(e){if(t.getButton(e)!=0)o=0;else{var i=Math.abs(e.clientX-u)>5||Math.abs(e.clientY-a)>5;if(!f||i)o=0;o+=1,f&&clearTimeout(f),f=setTimeout(function(){f=null},n[o-1]||600)}o==1&&(u=e.clientX,a=e.clientY),r[s]("mousedown",e);if(o>4)o=0;else if(o>1)return r[s](l[o],e)}),i.isOldIE&&t.addListener(e,"dblclick",function(e){o=2,f&&clearTimeout(f),f=setTimeout(function(){f=null},n[o-1]||600),r[s]("mousedown",e),r[s](l[o],e)})},t.addCommandKeyListener=function(e,n){var r=t.addListener;if(i.isOldGecko||i.isOpera&&!("KeyboardEvent"in window)){var s=null;r(e,"keydown",function(e){s=e.keyCode}),r(e,"keypress",function(e){return o(n,e,s)})}else{var u=null;r(e,"keydown",function(e){return u=e.keyIdentifier||e.keyCode,o(n,e,e.keyCode)})}};if(window.postMessage&&!i.isOldIE){var u=1;t.nextTick=function(e,n){n=n||window;var r="zero-timeout-message-"+u;t.addListener(n,"message",function i(s){s.data==r&&(t.stopPropagation(s),t.removeListener(n,"message",i),e())}),n.postMessage(r,"*")}}t.nextFrame=window.requestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame,t.nextFrame?t.nextFrame=t.nextFrame.bind(window):t.nextFrame=function(e){setTimeout(e,17)}});