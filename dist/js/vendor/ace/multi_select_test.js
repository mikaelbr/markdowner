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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./range","./test/assertions","./multi_select"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./range").Range,u=e("./test/assertions"),a=e("./multi_select").MultiSelect,f,l=function(e,t,n){do f.commands.exec(e,f,n);while(t-->1)},c=function(e){u.equal(f.selection.getAllRanges()+"",e+"")};n.exports={name:"ACE multi_select.js","test: multiselect editing":function(){var e=new r(["w1.w2","    wtt.w","    wtt.w"]);f=new i(new s,e),a(f),f.navigateFileEnd(),l("selectMoreBefore",3),u.ok(f.inMultiSelectMode),u.equal(f.selection.getAllRanges().length,4);var t=f.session.getDocument().getNewLineCharacter(),n="wwww".split("").join(t);u.equal(f.getCopyText(),n),l("insertstring",1,"a"),l("backspace",2),u.equal(f.session.getValue(),"w1.w2\ntt\ntt"),u.equal(f.selection.getAllRanges().length,4),l("selectall"),u.ok(!f.inMultiSelectMode)},"test: multiselect navigation":function(){var e=new r(["w1.w2","    wtt.w","    wtt.we"]);f=new i(new s,e),a(f),f.selectMoreLines(1),c("Range: [0/0] -> [0/0],Range: [1/0] -> [1/0]"),u.ok(f.inMultiSelectMode),l("golinedown"),l("gotolineend"),c("Range: [1/9] -> [1/9],Range: [2/10] -> [2/10]"),l("selectwordleft"),c("Range: [1/8] -> [1/9],Range: [2/8] -> [2/10]"),l("golinedown",2),u.ok(!f.inMultiSelectMode)},"test: multiselect session change":function(){var e=new r(["w1.w2","    wtt.w","    wtt.w"]);f=new i(new s,e),a(f),f.selectMoreLines(1),c("Range: [0/0] -> [0/0],Range: [1/0] -> [1/0]"),u.ok(f.inMultiSelectMode);var t=new r(["w1"]);f.setSession(t),u.ok(!f.inMultiSelectMode),f.setSession(e),u.ok(f.inMultiSelectMode)},"test: multiselect addRange":function(){var e=new r(["w1.w2","    wtt.w","    wtt.w"]);f=new i(new s,e),a(f);var t=f.selection,n=new o(0,2,0,4);f.selection.fromOrientedRange(n);var l=new o(0,3,0,4);t.addRange(l),u.ok(!f.inMultiSelectMode),u.ok(l.isEqual(f.selection.getRange()));var h=new o(0,1,0,1);t.addRange(h),u.ok(f.inMultiSelectMode),c([h,l]);var p=new o(0,0,4,0);t.addRange(p),u.ok(!f.inMultiSelectMode)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();