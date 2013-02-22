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

typeof process!="undefined"&&(require("amd-loader"),require("./test/mockdom")),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./test/assertions","./mode/javascript","./placeholder","./undomanager"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./test/assertions"),u=e("./mode/javascript").Mode,a=e("./placeholder").PlaceHolder,f=e("./undomanager").UndoManager;n.exports={"test: simple at the end appending of text":function(){var e=new r("var a = 10;\nconsole.log(a, a);",new u),t=new i(new s,e);new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]),t.moveCursorTo(0,5),t.insert("b"),o.equal(e.doc.getValue(),"var ab = 10;\nconsole.log(ab, ab);"),t.insert("cd"),o.equal(e.doc.getValue(),"var abcd = 10;\nconsole.log(abcd, abcd);"),t.remove("left"),t.remove("left"),t.remove("left"),o.equal(e.doc.getValue(),"var a = 10;\nconsole.log(a, a);")},"test: inserting text outside placeholder":function(){var e=new r("var a = 10;\nconsole.log(a, a);\n",new u),t=new i(new s,e);new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]),t.moveCursorTo(2,0),t.insert("b"),o.equal(e.doc.getValue(),"var a = 10;\nconsole.log(a, a);\nb")},"test: insertion at the beginning":function(e){var t=new r("var a = 10;\nconsole.log(a, a);",new u),n=new i(new s,t),f=new a(t,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]);n.moveCursorTo(0,4),n.insert("$"),o.equal(t.doc.getValue(),"var $a = 10;\nconsole.log($a, $a);"),n.moveCursorTo(0,4),setTimeout(function(){n.insert("v"),o.equal(t.doc.getValue(),"var v$a = 10;\nconsole.log(v$a, v$a);"),e()},10)},"test: detaching placeholder":function(){var e=new r("var a = 10;\nconsole.log(a, a);",new u),t=new i(new s,e),n=new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]);t.moveCursorTo(0,5),t.insert("b"),o.equal(e.doc.getValue(),"var ab = 10;\nconsole.log(ab, ab);"),n.detach(),t.insert("cd"),o.equal(e.doc.getValue(),"var abcd = 10;\nconsole.log(ab, ab);")},"test: events":function(){var e=new r("var a = 10;\nconsole.log(a, a);",new u),t=new i(new s,e),n=new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]),f=!1,l=!1;n.on("cursorEnter",function(){f=!0}),n.on("cursorLeave",function(){l=!0}),t.moveCursorTo(0,0),t.moveCursorTo(0,4),n.onCursorChange(),o.ok(f),t.moveCursorTo(1,0),n.onCursorChange(),o.ok(l)},"test: cancel":function(e){var t=new r("var a = 10;\nconsole.log(a, a);",new u);t.setUndoManager(new f);var n=new i(new s,t),l=new a(t,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]);n.moveCursorTo(0,5),n.insert("b"),n.insert("cd"),n.remove("left"),o.equal(t.doc.getValue(),"var abc = 10;\nconsole.log(abc, abc);"),setTimeout(function(){l.cancel(),o.equal(t.doc.getValue(),"var a = 10;\nconsole.log(a, a);"),e()},80)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();