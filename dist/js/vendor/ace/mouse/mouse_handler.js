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

define(["require","exports","module","../lib/event","./default_handlers","./default_gutter_handler","./mouse_event","./dragdrop"],function(e,t,n){var r=e("../lib/event"),i=e("./default_handlers").DefaultHandlers,s=e("./default_gutter_handler").GutterHandler,o=e("./mouse_event").MouseEvent,u=e("./dragdrop").DragdropHandler,a=function(e){this.editor=e,new i(this),new s(this),new u(this),r.addListener(e.container,"mousedown",function(t){return e.focus(),r.preventDefault(t)});var t=e.renderer.getMouseEventTarget();r.addListener(t,"click",this.onMouseEvent.bind(this,"click")),r.addListener(t,"mousemove",this.onMouseMove.bind(this,"mousemove")),r.addMultiMouseDownListener(t,[300,300,250],this,"onMouseEvent"),r.addMouseWheelListener(e.container,this.onMouseWheel.bind(this,"mousewheel"));var n=e.renderer.$gutter;r.addListener(n,"mousedown",this.onMouseEvent.bind(this,"guttermousedown")),r.addListener(n,"click",this.onMouseEvent.bind(this,"gutterclick")),r.addListener(n,"dblclick",this.onMouseEvent.bind(this,"gutterdblclick")),r.addListener(n,"mousemove",this.onMouseMove.bind(this,"gutter"))};(function(){this.$scrollSpeed=1,this.setScrollSpeed=function(e){this.$scrollSpeed=e},this.getScrollSpeed=function(){return this.$scrollSpeed},this.onMouseEvent=function(e,t){this.editor._emit(e,new o(t,this.editor))},this.$dragDelay=250,this.setDragDelay=function(e){this.$dragDelay=e},this.getDragDelay=function(){return this.$dragDelay},this.onMouseMove=function(e,t){var n=this.editor._eventRegistry&&this.editor._eventRegistry.mousemove;if(!n||!n.length)return;this.editor._emit(e,new o(t,this.editor))},this.onMouseWheel=function(e,t){var n=new o(t,this.editor);n.speed=this.$scrollSpeed*2,n.wheelX=t.wheelX,n.wheelY=t.wheelY,this.editor._emit(e,n)},this.setState=function(e){this.state=e},this.captureMouse=function(e,t){t&&this.setState(t),this.x=e.x,this.y=e.y;var n=this.editor.renderer;n.$keepTextAreaAtCursor&&(n.$keepTextAreaAtCursor=null);var i=this,s=function(e){i.x=e.clientX,i.y=e.clientY},o=function(e){clearInterval(a),i[i.state+"End"]&&i[i.state+"End"](e),i.$clickSelection=null,n.$keepTextAreaAtCursor==null&&(n.$keepTextAreaAtCursor=!0,n.$moveTextAreaToCursor())},u=function(){i[i.state]&&i[i.state]()};r.capture(this.editor.container,s,o);var a=setInterval(u,20)}}).call(a.prototype),t.MouseHandler=a});