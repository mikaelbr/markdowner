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

typeof process!="undefined"&&(require("amd-loader"),require("./test/mockdom")),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./test/assertions"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./test/assertions");n.exports={createEditSession:function(e,t){var n=(new Array(t+1)).join("a"),i=(new Array(e)).join(n+"\n")+n;return new r(i)},"test: navigate to end of file should scroll the last line into view":function(){var e=this.createEditSession(200,10),t=new i(new s,e);t.navigateFileEnd();var n=t.getCursorPosition();o.ok(t.getFirstVisibleRow()<=n.row),o.ok(t.getLastVisibleRow()>=n.row)},"test: navigate to start of file should scroll the first row into view":function(){var e=this.createEditSession(200,10),t=new i(new s,e);t.moveCursorTo(t.getLastVisibleRow()+20),t.navigateFileStart(),o.equal(t.getFirstVisibleRow(),0)},"test: goto hidden line should scroll the line into the middle of the viewport":function(){var e=new i(new s,this.createEditSession(200,5));e.navigateTo(0,0),e.gotoLine(101),o.position(e.getCursorPosition(),100,0),o.equal(e.getFirstVisibleRow(),89),e.navigateTo(100,0),e.gotoLine(11),o.position(e.getCursorPosition(),10,0),o.equal(e.getFirstVisibleRow(),0),e.navigateTo(100,0),e.gotoLine(6),o.position(e.getCursorPosition(),5,0),o.equal(0,e.getFirstVisibleRow(),0),e.navigateTo(100,0),e.gotoLine(1),o.position(e.getCursorPosition(),0,0),o.equal(e.getFirstVisibleRow(),0),e.navigateTo(0,0),e.gotoLine(191),o.position(e.getCursorPosition(),190,0),o.equal(e.getFirstVisibleRow(),179),e.navigateTo(0,0),e.gotoLine(196),o.position(e.getCursorPosition(),195,0),o.equal(e.getFirstVisibleRow(),180)},"test: goto visible line should only move the cursor and not scroll":function(){var e=new i(new s,this.createEditSession(200,5));e.navigateTo(0,0),e.gotoLine(12),o.position(e.getCursorPosition(),11,0),o.equal(e.getFirstVisibleRow(),0),e.navigateTo(30,0),e.gotoLine(33),o.position(e.getCursorPosition(),32,0),o.equal(e.getFirstVisibleRow(),30)},"test: navigate from the end of a long line down to a short line and back should maintain the curser column":function(){var e=new i(new s,new r(["123456","1"]));e.navigateTo(0,6),o.position(e.getCursorPosition(),0,6),e.navigateDown(),o.position(e.getCursorPosition(),1,1),e.navigateUp(),o.position(e.getCursorPosition(),0,6)},"test: reset desired column on navigate left or right":function(){var e=new i(new s,new r(["123456","12"]));e.navigateTo(0,6),o.position(e.getCursorPosition(),0,6),e.navigateDown(),o.position(e.getCursorPosition(),1,2),e.navigateLeft(),o.position(e.getCursorPosition(),1,1),e.navigateUp(),o.position(e.getCursorPosition(),0,1)},"test: typing text should update the desired column":function(){var e=new i(new s,new r(["1234","1234567890"]));e.navigateTo(0,3),e.insert("juhu"),e.navigateDown(),o.position(e.getCursorPosition(),1,7)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();