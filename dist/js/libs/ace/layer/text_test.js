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

typeof process!="undefined"&&(require("amd-loader"),require("../test/mockdom")),define(["require","exports","module","../test/assertions","../edit_session","./text","../mode/javascript"],function(e,t,n){var r=e("../test/assertions"),i=e("../edit_session").EditSession,s=e("./text").Text,o=e("../mode/javascript").Mode;n.exports={setUp:function(e){this.session=new i(""),this.session.setMode(new o),this.textLayer=new s(document.createElement("div")),this.textLayer.setSession(this.session),this.textLayer.config={characterWidth:10,lineHeight:20},e()},"test: render line with hard tabs should render the same as lines with soft tabs":function(){this.session.setValue("a	a	a	\na   a   a   \n"),this.textLayer.$computeTabString();var e=[];this.textLayer.$renderLine(e,0);var t=[];this.textLayer.$renderLine(t,1),r.equal(e.join(""),t.join(""))},"test rendering width of ideographic space (U+3000)":function(){this.session.setValue("　");var e=[];this.textLayer.$renderLine(e,0,!0),r.equal(e.join(""),"<span class='ace_cjk' style='width:20px'></span>"),this.textLayer.setShowInvisibles(!0);var e=[];this.textLayer.$renderLine(e,0,!0),r.equal(e.join(""),"<span class='ace_cjk ace_invisible' style='width:20px'>"+this.textLayer.SPACE_CHAR+"</span>"+"<span class='ace_invisible'>¶</span>")},"test rendering of indent guides":function(){function o(t){for(var n=t.length;n--;){var i=[];e.$renderLine(i,n,!0),r.equal(i.join(""),t[n])}}var e=this.textLayer,t="<span class='ace_invisible'>"+e.EOL_CHAR+"</span>",n=function(e){return Array(e+1).join(" ")},i=function(t){return Array(t+1).join(e.SPACE_CHAR)},s=function(t){return e.TAB_CHAR+n(t-1)};this.session.setValue("      \n		f\n   "),o(["<span class='ace_indent-guide'>"+n(4)+"</span>"+n(2),"<span class='ace_indent-guide'>"+n(4)+"</span>"+n(4)+"<span class='ace_identifier'>f</span>",n(3)]),this.textLayer.setShowInvisibles(!0),o(["<span class='ace_indent-guide ace_invisible'>"+i(4)+"</span><span class='ace_invisible'>"+i(2)+"</span>"+t,"<span class='ace_indent-guide ace_invisible'>"+s(4)+"</span><span class='ace_invisible'>"+s(4)+"</span><span class='ace_identifier'>f</span>"+t]),this.textLayer.setDisplayIndentGuides(!1),o(["<span class='ace_invisible'>"+i(6)+"</span>"+t,"<span class='ace_invisible'>"+s(4)+"</span><span class='ace_invisible'>"+s(4)+"</span><span class='ace_identifier'>f</span>"+t])}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();