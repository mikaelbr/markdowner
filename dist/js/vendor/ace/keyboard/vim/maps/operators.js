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
 *      Sergi Mansilla <sergi AT c9 DOT io>
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

define(["require","exports","module","./util","../registers"],function(e,t,n){"never use strict";var r=e("./util"),i=e("../registers");n.exports={d:{selFn:function(e,t,n,s){i._default.text=e.getCopyText(),i._default.isLine=r.onVisualLineMode,r.onVisualLineMode?e.removeLines():e.session.remove(t),r.normalMode(e)},fn:function(e,t,n,r){n=n||1;switch(r){case"d":i._default.text="",i._default.isLine=!0;for(var s=0;s<n;s++){e.selection.selectLine(),i._default.text+=e.getCopyText();var o=e.getSelectionRange();if(!o.isMultiLine()){lastLineReached=!0;var u=o.start.row-1,a=e.session.getLine(u).length;o.setStart(u,a),e.session.remove(o),e.selection.clearSelection();break}e.session.remove(o),e.selection.clearSelection()}i._default.text=i._default.text.replace(/\n$/,"");break;default:t&&(e.selection.setSelectionRange(t),i._default.text=e.getCopyText(),i._default.isLine=!1,e.session.remove(t),e.selection.clearSelection())}}},c:{selFn:function(e,t,n,i){e.session.remove(t),r.insertMode(e)},fn:function(e,t,n,i){n=n||1;switch(i){case"c":for(var s=0;s<n;s++)e.removeLines(),r.insertMode(e);break;default:t&&(e.session.remove(t),r.insertMode(e))}}},y:{selFn:function(e,t,n,s){i._default.text=e.getCopyText(),i._default.isLine=r.onVisualLineMode,e.selection.clearSelection(),r.normalMode(e)},fn:function(e,t,n,r){n=n||1;switch(r){case"y":var s=e.getCursorPosition();e.selection.selectLine();for(var o=0;o<n-1;o++)e.selection.moveCursorDown();i._default.text=e.getCopyText().replace(/\n$/,""),e.selection.clearSelection(),i._default.isLine=!0,e.moveCursorToPosition(s);break;default:if(t){var s=e.getCursorPosition();e.selection.setSelectionRange(t),i._default.text=e.getCopyText(),i._default.isLine=!1,e.selection.clearSelection(),e.moveCursorTo(s.row,s.column)}}}},">":{selFn:function(e,t,n,i){n=n||1;for(var s=0;s<n;s++)e.indent();r.normalMode(e)},fn:function(e,t,n,r){n=parseInt(n||1,10);switch(r){case">":var i=e.getCursorPosition();e.selection.selectLine();for(var s=0;s<n-1;s++)e.selection.moveCursorDown();e.indent(),e.selection.clearSelection(),e.moveCursorToPosition(i),e.navigateLineEnd(),e.navigateLineStart()}}},"<":{selFn:function(e,t,n,i){n=n||1;for(var s=0;s<n;s++)e.blockOutdent();r.normalMode(e)},fn:function(e,t,n,r){n=n||1;switch(r){case"<":var i=e.getCursorPosition();e.selection.selectLine();for(var s=0;s<n-1;s++)e.selection.moveCursorDown();e.blockOutdent(),e.selection.clearSelection(),e.moveCursorToPosition(i),e.navigateLineEnd(),e.navigateLineStart()}}}}});