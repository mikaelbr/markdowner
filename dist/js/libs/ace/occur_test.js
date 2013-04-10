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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./range","./test/assertions","./occur","./commands/occur_commands"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./range").Range,u=e("./test/assertions"),a=e("./occur").Occur,f=e("./commands/occur_commands").occurStartCommand,l,c;n.exports={name:"ACE occur.js",setUp:function(){var e=new r("");l=new i(new s,e),c=new a},"test: find lines matching":function(){l.session.insert({row:0,column:0},"abc\ndef\nxyz\nbcxbc");var e=c.matchingLines(l.session,{needle:"bc"}),t=[{row:0,content:"abc"},{row:3,content:"bcxbc"}];u.deepEqual(e,t)},"test: display occurrences":function(){var e="abc\ndef\nxyz\nbcx\n";l.session.insert({row:0,column:0},e),c.displayOccurContent(l,{needle:"bc"}),u.equal(l.getValue(),"abc\nbcx"),c.displayOriginalContent(l),u.equal(l.getValue(),e)},"test: original position from occur doc":function(){var e="abc\ndef\nxyz\nbcx\n";l.session.insert({row:0,column:0},e),c.displayOccurContent(l,{needle:"bc"}),u.equal(l.getValue(),"abc\nbcx");var t=c.occurToOriginalPosition(l.session,{row:1,column:2});u.position(t,3,2)},"test: occur command":function(){var e="hel\nlo\n\nwo\nrld\n";l.session.insert({row:0,column:0},e),l.commands.addCommand(f),l.execCommand("occur",{needle:"o"}),u.equal(l.getValue(),"lo\nwo"),u.ok(l.getKeyboardHandler().isOccurHandler,"no occur handler installed"),u.ok(l.commands.byName.occurexit,"no exitoccur command installed"),l.execCommand("occurexit"),u.equal(l.getValue(),e),u.ok(!l.getKeyboardHandler().isOccurHandler,"occur handler installed after detach"),u.ok(!l.commands.byName.occurexit,"exitoccur installed after exiting occur")},"test: occur navigation":function(){var e="hel\nlo\n\nwo\nrld\n";l.session.insert({row:0,column:0},e),l.commands.addCommand(f),l.moveCursorToPosition({row:1,column:1}),l.execCommand("occur",{needle:"o"}),u.equal(l.getValue(),"lo\nwo"),u.position(l.getCursorPosition(),0,1,"original -> occur pos"),l.moveCursorToPosition({row:1,column:1}),l.execCommand("occuraccept"),u.position(l.getCursorPosition(),3,1,"occur -> original pos")},"test: recursive occur":function(){var e="x\nabc1\nx\nabc2\n";l.session.insert({row:0,column:0},e),l.commands.addCommand(f),l.execCommand("occur",{needle:"abc"}),u.equal(l.getValue(),"abc1\nabc2","orig -> occur1"),l.execCommand("occur",{needle:"2"}),u.equal(l.getValue(),"abc2","occur1 -> occur2"),l.execCommand("occurexit"),u.equal(l.getValue(),"abc1\nabc2","occur2 -> occur1"),l.execCommand("occurexit"),u.equal(l.getValue(),e,"occur1 -> orig")}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();