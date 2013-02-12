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
 *      Julian Viereck <julian DOT viereck AT gmail DOT com>
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

typeof process!="undefined"&&(require("amd-loader"),require("./test/mockdom")),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./test/assertions","./mode/javascript","./placeholder","./undomanager"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./test/assertions"),u=e("./mode/javascript").Mode,a=e("./placeholder").PlaceHolder,f=e("./undomanager").UndoManager;n.exports={"test: simple at the end appending of text":function(){var e=new r("var a = 10;\nconsole.log(a, a);",new u),t=new i(new s,e);new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]),t.moveCursorTo(0,5),t.insert("b"),o.equal(e.doc.getValue(),"var ab = 10;\nconsole.log(ab, ab);"),t.insert("cd"),o.equal(e.doc.getValue(),"var abcd = 10;\nconsole.log(abcd, abcd);"),t.remove("left"),t.remove("left"),t.remove("left"),o.equal(e.doc.getValue(),"var a = 10;\nconsole.log(a, a);")},"test: inserting text outside placeholder":function(){var e=new r("var a = 10;\nconsole.log(a, a);\n",new u),t=new i(new s,e);new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]),t.moveCursorTo(2,0),t.insert("b"),o.equal(e.doc.getValue(),"var a = 10;\nconsole.log(a, a);\nb")},"test: insertion at the beginning":function(e){var t=new r("var a = 10;\nconsole.log(a, a);",new u),n=new i(new s,t),f=new a(t,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]);n.moveCursorTo(0,4),n.insert("$"),o.equal(t.doc.getValue(),"var $a = 10;\nconsole.log($a, $a);"),n.moveCursorTo(0,4),setTimeout(function(){n.insert("v"),o.equal(t.doc.getValue(),"var v$a = 10;\nconsole.log(v$a, v$a);"),e()},10)},"test: detaching placeholder":function(){var e=new r("var a = 10;\nconsole.log(a, a);",new u),t=new i(new s,e),n=new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]);t.moveCursorTo(0,5),t.insert("b"),o.equal(e.doc.getValue(),"var ab = 10;\nconsole.log(ab, ab);"),n.detach(),t.insert("cd"),o.equal(e.doc.getValue(),"var abcd = 10;\nconsole.log(ab, ab);")},"test: events":function(){var e=new r("var a = 10;\nconsole.log(a, a);",new u),t=new i(new s,e),n=new a(e,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]),f=!1,l=!1;n.on("cursorEnter",function(){f=!0}),n.on("cursorLeave",function(){l=!0}),t.moveCursorTo(0,0),t.moveCursorTo(0,4),n.onCursorChange(),o.ok(f),t.moveCursorTo(1,0),n.onCursorChange(),o.ok(l)},"test: cancel":function(e){var t=new r("var a = 10;\nconsole.log(a, a);",new u);t.setUndoManager(new f);var n=new i(new s,t),l=new a(t,1,{row:0,column:4},[{row:1,column:12},{row:1,column:15}]);n.moveCursorTo(0,5),n.insert("b"),n.insert("cd"),n.remove("left"),o.equal(t.doc.getValue(),"var abc = 10;\nconsole.log(abc, abc);"),setTimeout(function(){l.cancel(),o.equal(t.doc.getValue(),"var a = 10;\nconsole.log(a, a);"),e()},80)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();