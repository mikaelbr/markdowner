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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./document","./anchor","./range","./test/assertions"],function(e,t,n){var r=e("./document").Document,i=e("./anchor").Anchor,s=e("./range").Range,o=e("./test/assertions");n.exports={"test create anchor":function(){var e=new r("juhu"),t=new i(e,0,0);o.position(t.getPosition(),0,0),o.equal(t.getDocument(),e)},"test insert text in same row before cursor should move anchor column":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insert({row:1,column:1},"123"),o.position(t.getPosition(),1,7)},"test insert lines before cursor should move anchor row":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insertLines(1,["123","456"]),o.position(t.getPosition(),3,4)},"test insert new line before cursor should move anchor column":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insertNewLine({row:0,column:0}),o.position(t.getPosition(),2,4)},"test insert new line in anchor line before anchor should move anchor column and row":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insertNewLine({row:1,column:2}),o.position(t.getPosition(),2,2)},"test delete text in anchor line before anchor should move anchor column":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.remove(new s(1,1,1,3)),o.position(t.getPosition(),1,2)},"test remove range which contains the anchor should move the anchor to the start of the range":function(){var e=new r("juhu\nkinners"),t=new i(e,0,3);e.remove(new s(0,1,1,3)),o.position(t.getPosition(),0,1)},"test delete character before the anchor should have no effect":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.remove(new s(1,4,1,5)),o.position(t.getPosition(),1,4)},"test delete lines in anchor line before anchor should move anchor row":function(){var e=new r("juhu\n1\n2\nkinners"),t=new i(e,3,4);e.removeLines(1,2),o.position(t.getPosition(),1,4)},"test remove new line before the cursor":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.removeNewLine(0),o.position(t.getPosition(),0,8)},"test delete range which contains the anchor should move anchor to the end of the range":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.remove(new s(0,2,1,2)),o.position(t.getPosition(),0,4)},"test delete line which contains the anchor should move anchor to the end of the range":function(){var e=new r("juhu\nkinners\n123"),t=new i(e,1,5);e.removeLines(1,1),o.position(t.getPosition(),1,0)},"test remove after the anchor should have no effect":function(){var e=new r("juhu\nkinners\n123"),t=new i(e,1,2);e.remove(new s(1,4,2,2)),o.position(t.getPosition(),1,2)},"test anchor changes triggered by document changes should emit change event":function(e){var t=new r("juhu\nkinners\n123"),n=new i(t,1,5);n.on("change",function(t){o.position(n.getPosition(),0,0),e()}),t.remove(new s(0,0,2,1))},"test only fire change event if position changes":function(){var e=new r("juhu\nkinners\n123"),t=new i(e,1,5);t.on("change",function(e){o.fail()}),e.remove(new s(2,0,2,1))}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();