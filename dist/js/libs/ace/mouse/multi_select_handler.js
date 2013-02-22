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

define(["require","exports","module","../lib/event"],function(e,t,n){function i(e,t){return e.row==t.row&&e.column==t.column}function s(e){var t=e.domEvent,n=t.altKey,s=t.shiftKey,o=e.getAccelKey(),u=e.getButton();if(e.editor.inMultiSelectMode&&u==2){e.editor.textInput.onContextMenu(e.domEvent);return}if(!o&&!n){u==0&&e.editor.inMultiSelectMode&&e.editor.exitMultiSelectMode();return}var a=e.editor,f=a.selection,l=a.inMultiSelectMode,c=e.getDocumentPosition(),h=f.getCursor(),p=e.inSelection()||f.isEmpty()&&i(c,h),d=e.x,v=e.y,m=function(e){d=e.clientX,v=e.clientY},g=function(){var e=a.renderer.pixelToScreenCoordinates(d,v),t=y.screenToDocumentPosition(e.row,e.column);if(i(w,e)&&i(t,f.selectionLead))return;w=e,a.selection.moveCursorToPosition(t),a.selection.clearSelection(),a.renderer.scrollCursorIntoView(),a.removeSelectionMarkers(x),x=f.rectangularRangeBlock(w,b),x.forEach(a.addSelectionMarker,a),a.updateSelectionMarkers()},y=a.session,b=a.renderer.pixelToScreenCoordinates(d,v),w=b;if(o&&!s&&!n&&u==0){if(!l&&p)return;if(!l){var E=f.toOrientedRange();a.addSelectionMarker(E)}var S=f.rangeList.rangeAtPoint(c);r.capture(a.container,function(){},function(){var e=f.toOrientedRange();S&&e.isEmpty()&&i(S.cursor,e.cursor)?f.substractPoint(e.cursor):(E&&(a.removeSelectionMarker(E),f.addRange(E)),f.addRange(e))})}else if(!s&&n&&u==0){e.stop(),l&&!o?f.toSingleRange():!l&&o&&f.addRange(),f.moveCursorToPosition(c),f.clearSelection();var x=[],T=function(e){clearInterval(C),a.removeSelectionMarkers(x);for(var t=0;t<x.length;t++)f.addRange(x[t])},N=g;r.capture(a.container,m,T);var C=setInterval(function(){N()},20);return e.preventDefault()}}var r=e("../lib/event");t.onMouseDown=s});