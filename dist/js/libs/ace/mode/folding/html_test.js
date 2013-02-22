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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","../html","../../edit_session","../../test/assertions"],function(e,t,n){var r=e("../html").Mode,i=e("../../edit_session").EditSession,s=e("../../test/assertions");n.exports={"test: fold mixed html and javascript":function(){var e=new i(['<script type="text/javascript"> ',"function() foo {","    var bar = 1;","}","</script>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),"start"),s.equal(e.getFoldWidget(2),""),s.equal(e.getFoldWidget(3),"end"),s.equal(e.getFoldWidget(4),"end"),s.range(e.getFoldWidgetRange(0),0,8,4,0),s.range(e.getFoldWidgetRange(4),0,8,4,0),s.range(e.getFoldWidgetRange(1),1,16,3,0),s.range(e.getFoldWidgetRange(3),1,16,3,0)},"test: fold mixed html and css":function(){var e=new i(['<style type="text/css">',"    .text-layer {",'        font-family: Monaco, "Courier New", monospace;',"    }","</style>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),"start"),s.equal(e.getFoldWidget(2),""),s.equal(e.getFoldWidget(3),"end"),s.equal(e.getFoldWidget(4),"end"),s.range(e.getFoldWidgetRange(0),0,7,4,0),s.range(e.getFoldWidgetRange(4),0,7,4,0),s.range(e.getFoldWidgetRange(1),1,17,3,4),s.range(e.getFoldWidgetRange(3),1,17,3,4)},"test: fold should skip self closing elements":function(){var e=new i(["<body>","<br />","</body>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),"end"),s.range(e.getFoldWidgetRange(0),0,6,2,0),s.range(e.getFoldWidgetRange(2),0,6,2,0)},"test: fold should skip void elements":function(){var e=new i(["<body>","<br>","</body>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),"end"),s.range(e.getFoldWidgetRange(0),0,6,2,0),s.range(e.getFoldWidgetRange(2),0,6,2,0)},"test: fold multiple unclosed elements":function(){var e=new i(["<div>","<p>","juhu","<p>","kinners","</div>"]),t=new r;e.setMode(t),e.setFoldStyle("markbeginend"),s.equal(e.getFoldWidget(0),"start"),s.equal(e.getFoldWidget(1),""),s.equal(e.getFoldWidget(2),""),s.equal(e.getFoldWidget(3),""),s.equal(e.getFoldWidget(4),""),s.equal(e.getFoldWidget(5),"end"),s.range(e.getFoldWidgetRange(0),0,5,5,0),s.range(e.getFoldWidgetRange(5),0,5,5,0)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();