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

define(["require","exports","module","../lib/event","../lib/useragent","../lib/dom"],function(e,t,n){var r=e("../lib/event"),i=e("../lib/useragent"),s=e("../lib/dom"),o=function(e,t){function c(e){try{e?(n.value=o,n.selectionStart=0,n.selectionEnd=1):n.select()}catch(t){}}function h(e){if(!a){var r=e||n.value;r&&(r.length>1&&(r.charAt(0)==o?r=r.substr(1):r.charAt(r.length-1)==o&&(r=r.slice(0,-1))),r&&r!=o&&(f?t.onPaste(r):t.onTextInput(r)))}a=!1,f=!1,c(!0)}function w(){return document.activeElement===n}function E(){setTimeout(function(){l&&(n.style.cssText=l,l=""),h(),t.renderer.$keepTextAreaAtCursor==null&&(t.renderer.$keepTextAreaAtCursor=!0,t.renderer.$moveTextAreaToCursor())},0)}var n=s.createElement("textarea");i.isTouchPad&&n.setAttribute("x-palm-disable-auto-cap",!0),n.setAttribute("wrap","off"),n.style.top="-2em",e.insertBefore(n,e.firstChild);var o=i.isIE?"":"";h();var u=!1,a=!1,f=!1,l="",p=function(e){u||h(e.data),setTimeout(function(){u||c(!0)},0)},d=function(e){setTimeout(function(){u||h()},0)},v=function(e){u=!0,t.onCompositionStart(),setTimeout(m,0)},m=function(){if(!u)return;t.onCompositionUpdate(n.value)},g=function(e){u=!1,t.onCompositionEnd()},y=function(e){a=!0;var r=t.getCopyText();r?n.value=r:e.preventDefault(),c(),setTimeout(function(){h()},0)},b=function(e){a=!0;var r=t.getCopyText();r?(n.value=r,t.onCut()):e.preventDefault(),c(),setTimeout(function(){h()},0)};r.addCommandKeyListener(n,t.onCommandKey.bind(t)),r.addListener(n,"input",i.isIE?d:p),r.addListener(n,"paste",function(e){f=!0,e.clipboardData&&e.clipboardData.getData?(h(e.clipboardData.getData("text/plain")),e.preventDefault()):d()}),"onbeforecopy"in n&&typeof clipboardData!="undefined"?(r.addListener(n,"beforecopy",function(e){if(l)return;var n=t.getCopyText();n?clipboardData.setData("Text",n):e.preventDefault()}),r.addListener(e,"keydown",function(e){if(e.ctrlKey&&e.keyCode==88){var n=t.getCopyText();n&&(clipboardData.setData("Text",n),t.onCut()),r.preventDefault(e)}}),r.addListener(n,"cut",b)):i.isOpera?r.addListener(e,"keydown",function(e){if(i.isMac&&!e.metaKey||!e.ctrlKey)return;if(e.keyCode==88||e.keyCode==67){var r=t.getCopyText();r&&(n.value=r,n.select(),e.keyCode==88&&t.onCut())}}):(r.addListener(n,"copy",y),r.addListener(n,"cut",b)),r.addListener(n,"compositionstart",v),i.isGecko&&r.addListener(n,"text",m),i.isWebKit&&r.addListener(n,"keyup",m),r.addListener(n,"compositionend",g),r.addListener(n,"blur",function(){t.onBlur()}),r.addListener(n,"focus",function(){t.onFocus(),c()}),this.focus=function(){c(),n.focus()},this.blur=function(){n.blur()},this.isFocused=w,this.getElement=function(){return n},this.onContextMenu=function(e){l||(l=n.style.cssText),n.style.cssText="position:fixed; z-index:100000;left:"+(e.clientX-2)+"px; top:"+(e.clientY-2)+"px;",t.selection.isEmpty()&&(n.value="");if(e.type!="mousedown")return;t.renderer.$keepTextAreaAtCursor&&(t.renderer.$keepTextAreaAtCursor=null),i.isGecko&&i.isWin&&r.capture(t.container,function(e){n.style.left=e.clientX-2+"px",n.style.top=e.clientY-2+"px"},E)},this.onContextMenuClose=E,i.isGecko||r.addListener(n,"contextmenu",function(e){t.textInput.onContextMenu(e),E()})};t.TextInput=o});