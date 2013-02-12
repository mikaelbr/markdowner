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

typeof process!="undefined"&&(require("amd-loader"),require("./test/mockdom")),define(["require","exports","module","./edit_session","./editor","./mode/text","./mode/javascript","./mode/css","./mode/html","./test/mockrenderer","./test/assertions"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./mode/text").Mode,o=e("./mode/javascript").Mode,u=e("./mode/css").Mode,a=e("./mode/html").Mode,f=e("./test/mockrenderer").MockRenderer,l=e("./test/assertions");n.exports={setUp:function(e){this.session1=new r(["abc","def"]),this.session2=new r(["ghi","jkl"]),this.editor=new i(new f),e()},"test: change document":function(){this.editor.setSession(this.session1),l.equal(this.editor.getSession(),this.session1),this.editor.setSession(this.session2),l.equal(this.editor.getSession(),this.session2)},"test: only changes to the new document should have effect":function(){var e=!1;this.editor.onDocumentChange=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2),this.session1.duplicateLines(0,0),l.notOk(e),this.session2.duplicateLines(0,0),l.ok(e)},"test: should use cursor of new document":function(){this.session1.getSelection().moveCursorTo(0,1),this.session2.getSelection().moveCursorTo(1,0),this.editor.setSession(this.session1),l.position(this.editor.getCursorPosition(),0,1),this.editor.setSession(this.session2),l.position(this.editor.getCursorPosition(),1,0)},"test: only changing the cursor of the new doc should not have an effect":function(){this.editor.onCursorChange=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2),l.position(this.editor.getCursorPosition(),0,0);var e=!1;this.session1.getSelection().moveCursorTo(0,1),l.position(this.editor.getCursorPosition(),0,0),l.notOk(e),this.session2.getSelection().moveCursorTo(1,1),l.position(this.editor.getCursorPosition(),1,1),l.ok(e)},"test: should use selection of new document":function(){this.session1.getSelection().selectTo(0,1),this.session2.getSelection().selectTo(1,0),this.editor.setSession(this.session1),l.position(this.editor.getSelection().getSelectionLead(),0,1),this.editor.setSession(this.session2),l.position(this.editor.getSelection().getSelectionLead(),1,0)},"test: only changing the selection of the new doc should not have an effect":function(){this.editor.onSelectionChange=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2),l.position(this.editor.getSelection().getSelectionLead(),0,0);var e=!1;this.session1.getSelection().selectTo(0,1),l.position(this.editor.getSelection().getSelectionLead(),0,0),l.notOk(e),this.session2.getSelection().selectTo(1,1),l.position(this.editor.getSelection().getSelectionLead(),1,1),l.ok(e)},"test: should use mode of new document":function(){this.editor.onChangeMode=function(){e=!0},this.editor.setSession(this.session1),this.editor.setSession(this.session2);var e=!1;this.session1.setMode(new s),l.notOk(e),this.session2.setMode(new o),l.ok(e)},"test: should use stop worker of old document":function(e){var t=this;t.editor.setSession(t.session1),t.session1.setMode(new u),t.session1.setValue("DIV { color: red; }"),t.session1.setValue(""),t.session1.setMode(new a),t.session1.insert({row:0,column:0},"<html></html>"),setTimeout(function(){l.equal(Object.keys(t.session1.getAnnotations()).length,0),e()},600)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();