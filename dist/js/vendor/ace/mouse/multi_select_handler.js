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
 *      Harutyun Amirjanyan <amirjanyan AT gmail DOT com>
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

define(["require","exports","module","../lib/event"],function(e,t,n){function i(e,t){return e.row==t.row&&e.column==t.column}function s(e){var t=e.domEvent,n=t.altKey,s=t.shiftKey,o=e.getAccelKey(),u=e.getButton();if(e.editor.inMultiSelectMode&&u==2){e.editor.textInput.onContextMenu(e.domEvent);return}if(!o&&!n){u==0&&e.editor.inMultiSelectMode&&e.editor.exitMultiSelectMode();return}var a=e.editor,f=a.selection,l=a.inMultiSelectMode,c=e.getDocumentPosition(),h=f.getCursor(),p=e.inSelection()||f.isEmpty()&&i(c,h),d=e.x,v=e.y,m=function(e){d=e.clientX,v=e.clientY},g=function(){var e=a.renderer.pixelToScreenCoordinates(d,v),t=y.screenToDocumentPosition(e.row,e.column);if(i(w,e)&&i(t,f.selectionLead))return;w=e,a.selection.moveCursorToPosition(t),a.selection.clearSelection(),a.renderer.scrollCursorIntoView(),a.removeSelectionMarkers(x),x=f.rectangularRangeBlock(w,b),x.forEach(a.addSelectionMarker,a),a.updateSelectionMarkers()},y=a.session,b=a.renderer.pixelToScreenCoordinates(d,v),w=b;if(o&&!s&&!n&&u==0){if(!l&&p)return;if(!l){var E=f.toOrientedRange();a.addSelectionMarker(E)}var S=f.rangeList.rangeAtPoint(c);r.capture(a.container,function(){},function(){var e=f.toOrientedRange();S&&e.isEmpty()&&i(S.cursor,e.cursor)?f.substractPoint(e.cursor):(E&&(a.removeSelectionMarker(E),f.addRange(E)),f.addRange(e))})}else if(!s&&n&&u==0){e.stop(),l&&!o?f.toSingleRange():!l&&o&&f.addRange(),f.moveCursorToPosition(c),f.clearSelection();var x=[],T=function(e){clearInterval(C),a.removeSelectionMarkers(x);for(var t=0;t<x.length;t++)f.addRange(x[t])},N=g;r.capture(a.container,m,T);var C=setInterval(function(){N()},20);return e.preventDefault()}}var r=e("../lib/event");t.onMouseDown=s});