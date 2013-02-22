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

typeof process!="undefined"&&(require("amd-loader"),require("./test/mockdom")),define(["require","exports","module","./edit_session","./editor","./mode/text","./mode/javascript","./mode/css","./mode/html","./test/mockrenderer","./test/assertions"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./mode/text").Mode,o=e("./mode/javascript").Mode,u=e("./mode/css").Mode,a=e("./mode/html").Mode,f=e("./test/mockrenderer").MockRenderer,l=e("./test/assertions");n.exports={setUp:function(e){this.session1=new r(["abc","def"]),this.session2=new r(["ghi","jkl"]),this.editor=new i(new f),e()},"test: change document":function(){this.editor.setSession(this.session1),l.equal(this.editor.getSession(),this.session1),this.editor.setSession(this.session2),l.equal(this.editor.getSession(),this.session2)},"test: only changes to the new document should have effect":function(){var e=!1;this.editor.onDocumentChange=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2),this.session1.duplicateLines(0,0),l.notOk(e),this.session2.duplicateLines(0,0),l.ok(e)},"test: should use cursor of new document":function(){this.session1.getSelection().moveCursorTo(0,1),this.session2.getSelection().moveCursorTo(1,0),this.editor.setSession(this.session1),l.position(this.editor.getCursorPosition(),0,1),this.editor.setSession(this.session2),l.position(this.editor.getCursorPosition(),1,0)},"test: only changing the cursor of the new doc should not have an effect":function(){this.editor.onCursorChange=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2),l.position(this.editor.getCursorPosition(),0,0);var e=!1;this.session1.getSelection().moveCursorTo(0,1),l.position(this.editor.getCursorPosition(),0,0),l.notOk(e),this.session2.getSelection().moveCursorTo(1,1),l.position(this.editor.getCursorPosition(),1,1),l.ok(e)},"test: should use selection of new document":function(){this.session1.getSelection().selectTo(0,1),this.session2.getSelection().selectTo(1,0),this.editor.setSession(this.session1),l.position(this.editor.getSelection().getSelectionLead(),0,1),this.editor.setSession(this.session2),l.position(this.editor.getSelection().getSelectionLead(),1,0)},"test: only changing the selection of the new doc should not have an effect":function(){this.editor.onSelectionChange=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2),l.position(this.editor.getSelection().getSelectionLead(),0,0);var e=!1;this.session1.getSelection().selectTo(0,1),l.position(this.editor.getSelection().getSelectionLead(),0,0),l.notOk(e),this.session2.getSelection().selectTo(1,1),l.position(this.editor.getSelection().getSelectionLead(),1,1),l.ok(e)},"test: should use mode of new document":function(){this.editor.onChangeMode=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2);var e=!1;this.session1.setMode(new s),l.notOk(e),this.session2.setMode(new o),l.ok(e)},"test: should use stop worker of old document":function(e){var t=this;t.editor.setSession(t.session1),t.session1.setMode(new u),t.session1.setValue("DIV { color: red; }"),t.session1.setValue(""),t.session1.setMode(new a),t.session1.insert({row:0,column:0},"<html></html>"),setTimeout(function(){l.equal(Object.keys(t.session1.getAnnotations()).length,0),e()},600)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();