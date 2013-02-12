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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","../test/assertions","./json_worker"],function(e,t,n){var r=e("../test/assertions"),i=e("./json_worker").JsonWorker;n.exports={setUp:function(){this.sender={on:function(){},callback:function(e,t){this.data=e},events:[],emit:function(e,t){this.events.push([e,t])}}},"test check valid json":function(){var e=new i(this.sender);e.setValue("{}"),e.deferredUpdate.call(),r.equal(this.sender.events[0][0],"ok")},"test check for syntax error":function(){var e=new i(this.sender);e.setValue(["{","juhu: 12","}"].join("\n")),e.deferredUpdate.call();var t=this.sender.events[0];r.equal(t[0],"error"),r.equal(t[1].type,"error"),r.equal(t[1].text,"Bad string"),r.equal(t[1].row,1),r.equal(t[1].column,0)},"test check for syntax error at first char":function(){var e=new i(this.sender);e.setValue("x"),e.deferredUpdate.call();var t=this.sender.events[0];r.equal(t[0],"error"),r.equal(t[1].type,"error"),r.equal(t[1].text,"Unexpected 'x'"),r.equal(t[1].row,0),r.equal(t[1].column,0)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();