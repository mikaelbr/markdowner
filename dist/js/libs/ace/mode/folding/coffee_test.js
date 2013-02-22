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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","../coffee","../../edit_session","../../test/assertions"],function(e,t,n){function o(e){function u(e,n){if(!e)return;e=="l"?e=t.getLine(n.row).length:e=parseInt(e),s.equal(n.column,e)}var t=e.filter(function(e,t){return t%2==1});t=new i(t);var n=new r;t.setFoldStyle("markbeginend"),t.setMode(n);var o=e.filter(function(e,t){return t%2==0});o.forEach(function(e,n){t.foldWidgets[n]=t.getFoldWidget(n)}),o.forEach(function(e,n){e=e.split(",");var r=e[0]==">"?"start":e[0]=="<"?"end":"";s.equal(t.foldWidgets[n],r);if(!r)return;var i=t.getFoldWidgetRange(n);if(!e[1]){s.equal(i,null);return}s.equal(i.start.row,n),s.equal(i.end.row-i.start.row,parseInt(e[1])),u(e[2],i.start),u(e[3],i.end)})}var r=e("../coffee").Mode,i=e("../../edit_session").EditSession,s=e("../../test/assertions");n.exports={"test: coffee script indentation based folding":function(){o([">,1,l,l"," ## indented comment","","  # ","","",">,1,l,l"," # plain comment",""," # ",">,2"," function (x)=>","","  ","","  x++","","  ","","  ",">,2"," bar = ","","   foo: 1","","   baz: lighter"])}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();