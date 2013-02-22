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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","../xml","../../edit_session","../../test/assertions"],function(e,t,n){var r=e("../xml").Mode,i=e("../../edit_session").EditSession,s=e("../../test/assertions");n.exports={"test: fold multi line self closing element":function(){var e=new i(["<person",'  firstname="fabian"','  lastname="jakobs"/>']),t=new r;e.setFoldStyle("markbeginend"),e.setMode(t),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),"end"),s.range(e.getFoldWidgetRange(0),0,8,2,19),s.range(e.getFoldWidgetRange(2),0,8,2,19)},"test: fold should skip self closing elements":function(){var e=new i(["<person>",'  <attrib value="fabian"/>',"</person>"]),t=new r;e.setFoldStyle("markbeginend"),e.setMode(t),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),"end"),s.range(e.getFoldWidgetRange(0),0,8,2,0),s.range(e.getFoldWidgetRange(2),0,8,2,0)},"test: fold should skip multi line self closing elements":function(){var e=new i(["<person>","  <attib",'     key="name"','     value="fabian"/>',"</person>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),"start"),s.equal(e.getFoldWidget(2),""),s.equal(e.getFoldWidget(3),"end"),s.equal(e.getFoldWidget(4),"end"),s.range(e.getFoldWidgetRange(0),0,8,4,0),s.range(e.getFoldWidgetRange(1),1,9,3,19),s.range(e.getFoldWidgetRange(3),1,9,3,19),s.range(e.getFoldWidgetRange(4),0,8,4,0)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();