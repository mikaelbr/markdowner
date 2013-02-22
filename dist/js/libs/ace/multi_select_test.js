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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./range","./test/assertions","./multi_select"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./range").Range,u=e("./test/assertions"),a=e("./multi_select").MultiSelect,f,l=function(e,t,n){do f.commands.exec(e,f,n);while(t-->1)},c=function(e){u.equal(f.selection.getAllRanges()+"",e+"")};n.exports={name:"ACE multi_select.js","test: multiselect editing":function(){var e=new r(["w1.w2","    wtt.w","    wtt.w"]);f=new i(new s,e),a(f),f.navigateFileEnd(),l("selectMoreBefore",3),u.ok(f.inMultiSelectMode),u.equal(f.selection.getAllRanges().length,4);var t=f.session.getDocument().getNewLineCharacter(),n="wwww".split("").join(t);u.equal(f.getCopyText(),n),l("insertstring",1,"a"),l("backspace",2),u.equal(f.session.getValue(),"w1.w2\ntt\ntt"),u.equal(f.selection.getAllRanges().length,4),l("selectall"),u.ok(!f.inMultiSelectMode)},"test: multiselect navigation":function(){var e=new r(["w1.w2","    wtt.w","    wtt.we"]);f=new i(new s,e),a(f),f.selectMoreLines(1),c("Range: [0/0] -> [0/0],Range: [1/0] -> [1/0]"),u.ok(f.inMultiSelectMode),l("golinedown"),l("gotolineend"),c("Range: [1/9] -> [1/9],Range: [2/10] -> [2/10]"),l("selectwordleft"),c("Range: [1/8] -> [1/9],Range: [2/8] -> [2/10]"),l("golinedown",2),u.ok(!f.inMultiSelectMode)},"test: multiselect session change":function(){var e=new r(["w1.w2","    wtt.w","    wtt.w"]);f=new i(new s,e),a(f),f.selectMoreLines(1),c("Range: [0/0] -> [0/0],Range: [1/0] -> [1/0]"),u.ok(f.inMultiSelectMode);var t=new r(["w1"]);f.setSession(t),u.ok(!f.inMultiSelectMode),f.setSession(e),u.ok(f.inMultiSelectMode)},"test: multiselect addRange":function(){var e=new r(["w1.w2","    wtt.w","    wtt.w"]);f=new i(new s,e),a(f);var t=f.selection,n=new o(0,2,0,4);f.selection.fromOrientedRange(n);var l=new o(0,3,0,4);t.addRange(l),u.ok(!f.inMultiSelectMode),u.ok(l.isEqual(f.selection.getRange()));var h=new o(0,1,0,1);t.addRange(h),u.ok(f.inMultiSelectMode),c([h,l]);var p=new o(0,0,4,0);t.addRange(p),u.ok(!f.inMultiSelectMode)},"test: onPaste in command with multiselect":function(){var e=new r(["l1","l2"]);f=new i(new s,e),a(f),f.commands.addCommand({name:"insertfoo",exec:function(e){e.onPaste("foo")},multiSelectAction:"forEach"});var t=f.selection,n=new o(0,2,0,2),l=new o(1,2,1,2);t.fromOrientedRange(n),t.addRange(l),f.execCommand("insertfoo"),u.equal("l1foo\nl2foo",f.getValue())}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();