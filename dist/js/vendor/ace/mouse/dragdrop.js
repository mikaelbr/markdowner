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

define(["require","exports","module","../lib/event"],function(e,t,n){var r=e("../lib/event"),i=function(e){var t=e.editor,n,i,s,o,u,a,f,l=0,c=t.container;r.addListener(c,"dragenter",function(e){l++;if(!n){u=t.getSelectionRange(),a=t.selection.isBackwards();var i=t.getSelectionStyle();n=t.session.addMarker(u,"ace_selection",i),t.clearSelection(),clearInterval(o),o=setInterval(h,20)}return r.preventDefault(e)}),r.addListener(c,"dragover",function(e){return i=e.clientX,s=e.clientY,r.preventDefault(e)});var h=function(){f=t.renderer.screenToTextCoordinates(i,s),t.moveCursorToPosition(f),t.renderer.scrollCursorIntoView()};r.addListener(c,"dragleave",function(e){l--;if(l>0)return;return console.log(e.type,l,e.target),clearInterval(o),t.session.removeMarker(n),n=null,t.selection.setSelectionRange(u,a),r.preventDefault(e)}),r.addListener(c,"drop",function(e){return console.log(e.type,l,e.target),l=0,clearInterval(o),t.session.removeMarker(n),n=null,u.end=t.session.insert(f,e.dataTransfer.getData("Text")),u.start=f,t.focus(),t.selection.setSelectionRange(u),r.preventDefault(e)})};t.DragdropHandler=i});