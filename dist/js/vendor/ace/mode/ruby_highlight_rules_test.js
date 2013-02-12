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
 *      Trent Ogren <me AT trentogren DOT com>
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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./ruby","../test/assertions"],function(e,t,n){function s(e,t,n){for(var r=0,s=n.length;r<s;r++){var o=n[r],u=e.getLineTokens(o,"start").tokens;i.equal(u[0].value,o,'"'+o+'" should be one token'),i.equal(u[0].type,t,'"'+o+'" should be a "'+t+'" token')}}function o(e,t,n){for(var r=0,s=n.length;r<s;r++){var o=n[r],u=e.getLineTokens(o,"start").tokens;i.ok(u[0].type!==t||u[0].value!==o,'"'+o+'" is not a valid "'+t+'"')}}var r=e("./ruby").Mode,i=e("../test/assertions");n.exports={name:"Ruby Tokenizer",setUp:function(){this.tokenizer=(new r).getTokenizer()},"test: symbol tokenizer":function(){s(this.tokenizer,"string",[":@thing",":$thing",":_thing",":thing",":Thing",":thing1",":thing_a",":THING",":thing!",":thing=",":thing?",":t?"]),o(this.tokenizer,"string",[":",":@",":$",":1",":1thing",":th?ing",":thi=ng",":1thing",":th!ing",":thing#"])},"test: namespaces aren't symbols":function(){var e="Namespaced::Class",t=this.tokenizer.getLineTokens(e,"start").tokens;i.equal(3,t.length),i.equal("variable.class",t[0].type),i.equal("text",t[1].type),i.equal("variable.class",t[2].type)},"test: hex tokenizer":function(){s(this.tokenizer,"constant.numeric",["0x9a","0XA1","0x9_a"]),o(this.tokenizer,"constant.numeric",["0x","0x_9a","0x9a_"])},"test: float tokenizer":function(){s(this.tokenizer,"constant.numeric",["1","+1","-1","12_345","0.000_1"]),o(this.tokenizer,"constant.numeric",["_","_1","1_","1_.0","0._1"])}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();