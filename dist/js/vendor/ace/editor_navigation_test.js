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

typeof process!="undefined"&&(require("amd-loader"),require("./test/mockdom")),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./test/assertions"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./test/assertions");n.exports={createEditSession:function(e,t){var n=(new Array(t+1)).join("a"),i=(new Array(e)).join(n+"\n")+n;return new r(i)},"test: navigate to end of file should scroll the last line into view":function(){var e=this.createEditSession(200,10),t=new i(new s,e);t.navigateFileEnd();var n=t.getCursorPosition();o.ok(t.getFirstVisibleRow()<=n.row),o.ok(t.getLastVisibleRow()>=n.row)},"test: navigate to start of file should scroll the first row into view":function(){var e=this.createEditSession(200,10),t=new i(new s,e);t.moveCursorTo(t.getLastVisibleRow()+20),t.navigateFileStart(),o.equal(t.getFirstVisibleRow(),0)},"test: goto hidden line should scroll the line into the middle of the viewport":function(){var e=new i(new s,this.createEditSession(200,5));e.navigateTo(0,0),e.gotoLine(101),o.position(e.getCursorPosition(),100,0),o.equal(e.getFirstVisibleRow(),89),e.navigateTo(100,0),e.gotoLine(11),o.position(e.getCursorPosition(),10,0),o.equal(e.getFirstVisibleRow(),0),e.navigateTo(100,0),e.gotoLine(6),o.position(e.getCursorPosition(),5,0),o.equal(0,e.getFirstVisibleRow(),0),e.navigateTo(100,0),e.gotoLine(1),o.position(e.getCursorPosition(),0,0),o.equal(e.getFirstVisibleRow(),0),e.navigateTo(0,0),e.gotoLine(191),o.position(e.getCursorPosition(),190,0),o.equal(e.getFirstVisibleRow(),179),e.navigateTo(0,0),e.gotoLine(196),o.position(e.getCursorPosition(),195,0),o.equal(e.getFirstVisibleRow(),180)},"test: goto visible line should only move the cursor and not scroll":function(){var e=new i(new s,this.createEditSession(200,5));e.navigateTo(0,0),e.gotoLine(12),o.position(e.getCursorPosition(),11,0),o.equal(e.getFirstVisibleRow(),0),e.navigateTo(30,0),e.gotoLine(33),o.position(e.getCursorPosition(),32,0),o.equal(e.getFirstVisibleRow(),30)},"test: navigate from the end of a long line down to a short line and back should maintain the curser column":function(){var e=new i(new s,new r(["123456","1"]));e.navigateTo(0,6),o.position(e.getCursorPosition(),0,6),e.navigateDown(),o.position(e.getCursorPosition(),1,1),e.navigateUp(),o.position(e.getCursorPosition(),0,6)},"test: reset desired column on navigate left or right":function(){var e=new i(new s,new r(["123456","12"]));e.navigateTo(0,6),o.position(e.getCursorPosition(),0,6),e.navigateDown(),o.position(e.getCursorPosition(),1,2),e.navigateLeft(),o.position(e.getCursorPosition(),1,1),e.navigateUp(),o.position(e.getCursorPosition(),0,1)},"test: typing text should update the desired column":function(){var e=new i(new s,new r(["1234","1234567890"]));e.navigateTo(0,3),e.insert("juhu"),e.navigateDown(),o.position(e.getCursorPosition(),1,7)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();