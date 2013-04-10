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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","../edit_session","../tokenizer","./ruby","../test/assertions"],function(e,t,n){var r=e("../edit_session").EditSession,i=e("../tokenizer").Tokenizer,s=e("./ruby").Mode,o=e("../test/assertions");n.exports={setUp:function(){this.mode=new s},"test getNextLineIndent":function(){o.equal(this.mode.getNextLineIndent("start","class Foo","  "),"  "),o.equal(this.mode.getNextLineIndent("start","  def thing(wut)","  "),"    "),o.equal(this.mode.getNextLineIndent("start","  fork do","  "),"    "),o.equal(this.mode.getNextLineIndent("start","  fork do |wut| ","  "),"    "),o.equal(this.mode.getNextLineIndent("start","  something = :ruby","  "),"  "),o.equal(this.mode.getNextLineIndent("start","  if something == 3","  "),"    "),o.equal(this.mode.getNextLineIndent("start","  else","  "),"    ")},"test: checkOutdent":function(){o.ok(this.mode.checkOutdent("start","        en","d")),o.ok(this.mode.checkOutdent("start","        els","e")),o.ok(this.mode.checkOutdent("start","        ","}")),o.equal(this.mode.checkOutdent("start","  end","\n"),!1),o.equal(this.mode.checkOutdent("start","foo = ba","r"),!1)},"test: auto outdent":function(){var e=new r(["class Phil","  Foo = 'bar'","  end"]);this.mode.autoOutdent("start",e,2),o.equal("  end",e.getLine(2))}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();