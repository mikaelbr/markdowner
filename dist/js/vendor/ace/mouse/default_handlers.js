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
 *      Mike de Boer <mike AT ajax DOT org>
 *      Harutyun Amirjanyan <harutyun AT c9 DOT io>
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

define(["require","exports","module","../lib/dom","../lib/useragent"],function(e,t,n){function o(e){e.$clickSelection=null;var t=e.editor;t.setDefaultHandler("mousedown",this.onMouseDown.bind(e)),t.setDefaultHandler("dblclick",this.onDoubleClick.bind(e)),t.setDefaultHandler("tripleclick",this.onTripleClick.bind(e)),t.setDefaultHandler("quadclick",this.onQuadClick.bind(e)),t.setDefaultHandler("mousewheel",this.onScroll.bind(e));var n=["select","startSelect","drag","dragEnd","dragWait","dragWaitEnd","startDrag","focusWait"];n.forEach(function(t){e[t]=this[t]},this),e.selectByLines=this.extendSelectionBy.bind(e,"getLineRange"),e.selectByWords=this.extendSelectionBy.bind(e,"getWordRange"),e.$focusWaitTimout=250}function u(e,t,n,r){return Math.sqrt(Math.pow(n-e,2)+Math.pow(r-t,2))}function a(e,t){if(e.start.row==e.end.row)var n=2*t.column-e.start.column-e.end.column;else var n=2*t.row-e.start.row-e.end.row;return n<0?{cursor:e.start,anchor:e.end}:{cursor:e.end,anchor:e.start}}var r=e("../lib/dom"),i=e("../lib/useragent"),s=5;(function(){this.onMouseDown=function(e){var t=e.inSelection(),n=e.getDocumentPosition();this.mousedownEvent=e;var r=this.editor,i=e.getButton();if(i!==0){var s=r.getSelectionRange(),o=s.isEmpty();o&&(r.moveCursorToPosition(n),r.selection.clearSelection()),r.textInput.onContextMenu(e.domEvent);return}if(t&&!r.isFocused()){r.focus();if(this.$focusWaitTimout&&!this.$clickSelection)return this.setState("focusWait"),this.captureMouse(e),e.preventDefault()}return!t||this.$clickSelection||e.getShiftKey()?this.startSelect(n):t&&(this.mousedownEvent.time=(new Date).getTime(),this.setState("dragWait")),this.captureMouse(e),e.preventDefault()},this.startSelect=function(e){e=e||this.editor.renderer.screenToTextCoordinates(this.x,this.y),this.mousedownEvent.getShiftKey()?this.editor.selection.selectToPosition(e):this.$clickSelection||(this.editor.moveCursorToPosition(e),this.editor.selection.clearSelection()),this.setState("select")},this.select=function(){var e,t=this.editor,n=t.renderer.screenToTextCoordinates(this.x,this.y);if(this.$clickSelection){var r=this.$clickSelection.comparePoint(n);if(r==-1)e=this.$clickSelection.end;else if(r==1)e=this.$clickSelection.start;else{var i=a(this.$clickSelection,n);n=i.cursor,e=i.anchor}t.selection.setSelectionAnchor(e.row,e.column)}t.selection.selectToPosition(n),t.renderer.scrollCursorIntoView()},this.extendSelectionBy=function(e){var t,n=this.editor,r=n.renderer.screenToTextCoordinates(this.x,this.y),i=n.selection[e](r.row,r.column);if(this.$clickSelection){var s=this.$clickSelection.comparePoint(i.start),o=this.$clickSelection.comparePoint(i.end);if(s==-1&&o<=0){t=this.$clickSelection.end;if(i.end.row!=r.row||i.end.column!=r.column)r=i.start}else if(o==1&&s>=0){t=this.$clickSelection.start;if(i.start.row!=r.row||i.start.column!=r.column)r=i.end}else if(s==-1&&o==1)r=i.end,t=i.start;else{var u=a(this.$clickSelection,r);r=u.cursor,t=u.anchor}n.selection.setSelectionAnchor(t.row,t.column)}n.selection.selectToPosition(r),n.renderer.scrollCursorIntoView()},this.startDrag=function(){var e=this.editor;this.setState("drag"),this.dragRange=e.getSelectionRange();var t=e.getSelectionStyle();this.dragSelectionMarker=e.session.addMarker(this.dragRange,"ace_selection",t),e.clearSelection(),r.addCssClass(e.container,"ace_dragging"),this.$dragKeybinding||(this.$dragKeybinding={handleKeyboard:function(e,t,n,r){if(n=="esc")return{command:this.command}},command:{exec:function(e){var t=e.$mouseHandler;t.dragCursor=null,t.dragEnd(),t.startSelect()}}}),e.keyBinding.addKeyboardHandler(this.$dragKeybinding)},this.focusWait=function(){var e=u(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y),t=(new Date).getTime();(e>s||t-this.mousedownEvent.time>this.$focusWaitTimout)&&this.startSelect()},this.dragWait=function(e){var t=u(this.mousedownEvent.x,this.mousedownEvent.y,this.x,this.y),n=(new Date).getTime(),r=this.editor;t>s?this.startSelect():n-this.mousedownEvent.time>r.getDragDelay()&&this.startDrag()},this.dragWaitEnd=function(e){this.mousedownEvent.domEvent=e,this.startSelect()},this.drag=function(){var e=this.editor;this.dragCursor=e.renderer.screenToTextCoordinates(this.x,this.y),e.moveCursorToPosition(this.dragCursor),e.renderer.scrollCursorIntoView()},this.dragEnd=function(e){var t=this.editor,n=this.dragCursor,i=this.dragRange;r.removeCssClass(t.container,"ace_dragging"),t.session.removeMarker(this.dragSelectionMarker),t.keyBinding.removeKeyboardHandler(this.$dragKeybinding);if(!n)return;t.clearSelection();if(e&&(e.ctrlKey||e.altKey)){var s=t.session,o=i;o.end=s.insert(n,s.getTextRange(i)),o.start=n}else{if(i.contains(n.row,n.column))return;var o=t.moveText(i,n)}if(!o)return;t.selection.setSelectionRange(o)},this.onDoubleClick=function(e){var t=e.getDocumentPosition(),n=this.editor,r=n.session,i=r.getBracketRange(t);if(i){i.isEmpty()&&(i.start.column--,i.end.column++),this.$clickSelection=i,this.setState("select");return}this.$clickSelection=n.selection.getWordRange(t.row,t.column),this.setState("selectByWords")},this.onTripleClick=function(e){var t=e.getDocumentPosition(),n=this.editor;this.setState("selectByLines"),this.$clickSelection=n.selection.getLineRange(t.row)},this.onQuadClick=function(e){var t=this.editor;t.selectAll(),this.$clickSelection=t.getSelectionRange(),this.setState("null")},this.onScroll=function(e){var t=this.editor,n=t.renderer.isScrollableBy(e.wheelX*e.speed,e.wheelY*e.speed);if(n)this.$passScrollEvent=!1;else{if(this.$passScrollEvent)return;if(!this.$scrollStopTimeout){var r=this;this.$scrollStopTimeout=setTimeout(function(){r.$passScrollEvent=!0,r.$scrollStopTimeout=null},200)}}return t.renderer.scrollBy(e.wheelX*e.speed,e.wheelY*e.speed),e.preventDefault()}}).call(o.prototype),t.DefaultHandlers=o});