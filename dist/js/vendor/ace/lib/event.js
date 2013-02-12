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

define(["require","exports","module","./keys","./useragent","./dom"],function(e,t,n){function o(e,t,n){var s=0;!i.isOpera||"KeyboardEvent"in window||!i.isMac?s=0|(t.ctrlKey?1:0)|(t.altKey?2:0)|(t.shiftKey?4:0)|(t.metaKey?8:0):s=0|(t.metaKey?1:0)|(t.altKey?2:0)|(t.shiftKey?4:0)|(t.ctrlKey?8:0);if(n in r.MODIFIER_KEYS){switch(r.MODIFIER_KEYS[n]){case"Alt":s=2;break;case"Shift":s=4;break;case"Ctrl":s=1;break;default:s=8}n=0}return s&8&&(n==91||n==93)&&(n=0),!!s||n in r.FUNCTION_KEYS||n in r.PRINTABLE_KEYS?e(t,s,n):!1}var r=e("./keys"),i=e("./useragent"),s=e("./dom");t.addListener=function(e,t,n){if(e.addEventListener)return e.addEventListener(t,n,!1);if(e.attachEvent){var r=function(){n(window.event)};n._wrapper=r,e.attachEvent("on"+t,r)}},t.removeListener=function(e,t,n){if(e.removeEventListener)return e.removeEventListener(t,n,!1);e.detachEvent&&e.detachEvent("on"+t,n._wrapper||n)},t.stopEvent=function(e){return t.stopPropagation(e),t.preventDefault(e),!1},t.stopPropagation=function(e){e.stopPropagation?e.stopPropagation():e.cancelBubble=!0},t.preventDefault=function(e){e.preventDefault?e.preventDefault():e.returnValue=!1},t.getButton=function(e){return e.type=="dblclick"?0:e.type=="contextmenu"||e.ctrlKey&&i.isMac?2:e.preventDefault?e.button:{1:0,2:2,4:1}[e.button]},document.documentElement.setCapture?t.capture=function(e,n,r){function i(e){return n(e),t.stopPropagation(e)}function o(i){n(i),s||(s=!0,r(i)),t.removeListener(e,"mousemove",n),t.removeListener(e,"mouseup",o),t.removeListener(e,"losecapture",o),e.releaseCapture()}var s=!1;t.addListener(e,"mousemove",n),t.addListener(e,"mouseup",o),t.addListener(e,"losecapture",o),e.setCapture()}:t.capture=function(e,t,n){function r(e){t(e),e.stopPropagation()}function i(e){t&&t(e),n&&n(e),document.removeEventListener("mousemove",r,!0),document.removeEventListener("mouseup",i,!0),e.stopPropagation()}document.addEventListener("mousemove",r,!0),document.addEventListener("mouseup",i,!0)},t.addMouseWheelListener=function(e,n){var r=8,i=function(e){e.wheelDelta!==undefined?e.wheelDeltaX!==undefined?(e.wheelX=-e.wheelDeltaX/r,e.wheelY=-e.wheelDeltaY/r):(e.wheelX=0,e.wheelY=-e.wheelDelta/r):e.axis&&e.axis==e.HORIZONTAL_AXIS?(e.wheelX=(e.detail||0)*5,e.wheelY=0):(e.wheelX=0,e.wheelY=(e.detail||0)*5),n(e)};t.addListener(e,"DOMMouseScroll",i),t.addListener(e,"mousewheel",i)},t.addMultiMouseDownListener=function(e,n,r,s){var o=0,u,a,f,l={2:"dblclick",3:"tripleclick",4:"quadclick"},c=function(e){if(t.getButton(e)!=0)o=0;else{var i=Math.abs(e.clientX-u)>5||Math.abs(e.clientY-a)>5;if(!f||i)o=0;o+=1,f&&clearTimeout(f),f=setTimeout(function(){f=null},n[o-1]||600)}o==1&&(u=e.clientX,a=e.clientY),r[s]("mousedown",e);if(o>4)o=0;else if(o>1)return r[s](l[o],e)};t.addListener(e,"mousedown",c),i.isOldIE&&t.addListener(e,"dblclick",c)},t.addCommandKeyListener=function(e,n){var r=t.addListener;if(i.isOldGecko||i.isOpera&&!("KeyboardEvent"in window)){var s=null;r(e,"keydown",function(e){s=e.keyCode}),r(e,"keypress",function(e){return o(n,e,s)})}else{var u=null;r(e,"keydown",function(e){return u=e.keyIdentifier||e.keyCode,o(n,e,e.keyCode)})}};if(window.postMessage){var u=1;t.nextTick=function(e,n){n=n||window;var r="zero-timeout-message-"+u;t.addListener(n,"message",function i(s){s.data==r&&(t.stopPropagation(s),t.removeListener(n,"message",i),e())}),n.postMessage(r,"*")}}else t.nextTick=function(e,t){t=t||window,window.setTimeout(e,0)}});