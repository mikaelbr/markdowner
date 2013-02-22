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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./range","./edit_session","./test/assertions"],function(e,t,n){var r=e("./range").Range,i=e("./edit_session").EditSession,s=e("./test/assertions");n.exports={name:"ACE range.js","test: create range":function(){var e=new r(1,2,3,4);s.equal(e.start.row,1),s.equal(e.start.column,2),s.equal(e.end.row,3),s.equal(e.end.column,4)},"test: create from points":function(){var e=r.fromPoints({row:1,column:2},{row:3,column:4});s.equal(e.start.row,1),s.equal(e.start.column,2),s.equal(e.end.row,3),s.equal(e.end.column,4)},"test: clip to rows":function(){s.range((new r(0,20,100,30)).clipRows(10,30),10,0,31,0),s.range((new r(0,20,30,10)).clipRows(10,30),10,0,30,10);var e=new r(0,20,3,10),e=e.clipRows(10,30);s.ok(e.isEmpty()),s.range(e,10,0,10,0)},"test: isEmpty":function(){var e=new r(1,2,1,2);s.ok(e.isEmpty());var e=new r(1,2,1,6);s.notOk(e.isEmpty())},"test: is multi line":function(){var e=new r(1,2,1,6);s.notOk(e.isMultiLine());var e=new r(1,2,2,6);s.ok(e.isMultiLine())},"test: clone":function(){var e=new r(1,2,3,4),t=e.clone();s.position(t.start,1,2),s.position(t.end,3,4),t.start.column=20,s.position(e.start,1,2),t.end.column=20,s.position(e.end,3,4)},"test: contains for multi line ranges":function(){var e=new r(1,10,5,20);s.ok(e.contains(1,10)),s.ok(e.contains(2,0)),s.ok(e.contains(3,100)),s.ok(e.contains(5,19)),s.ok(e.contains(5,20)),s.notOk(e.contains(1,9)),s.notOk(e.contains(0,0)),s.notOk(e.contains(5,21))},"test: contains for single line ranges":function(){var e=new r(1,10,1,20);s.ok(e.contains(1,10)),s.ok(e.contains(1,15)),s.ok(e.contains(1,20)),s.notOk(e.contains(0,9)),s.notOk(e.contains(2,9)),s.notOk(e.contains(1,9)),s.notOk(e.contains(1,21))},"test: extend range":function(){var e=new r(2,10,2,30),e=e.extend(2,5);s.range(e,2,5,2,30);var e=e.extend(2,35);s.range(e,2,5,2,35);var e=e.extend(2,15);s.range(e,2,5,2,35);var e=e.extend(1,4);s.range(e,1,4,2,35);var e=e.extend(6,10);s.range(e,1,4,6,10)},"test: collapse rows":function(){var e=new r(0,2,1,2);s.range(e.collapseRows(),0,0,1,0);var e=new r(2,2,3,1);s.range(e.collapseRows(),2,0,3,0);var e=new r(2,2,3,0);s.range(e.collapseRows(),2,0,2,0);var e=new r(2,0,2,0);s.range(e.collapseRows(),2,0,2,0)},"test: to screen range":function(){var e=new i(["juhu","12		34","ぁぁa","		34"]),t=new r(0,0,0,3);s.range(t.toScreenRange(e),0,0,0,3);var t=new r(1,1,1,3);s.range(t.toScreenRange(e),1,1,1,4);var t=new r(2,1,2,2);s.range(t.toScreenRange(e),2,2,2,4);var t=new r(3,0,3,4);s.range(t.toScreenRange(e),3,0,3,10)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();