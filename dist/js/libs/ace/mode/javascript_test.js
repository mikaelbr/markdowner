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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","../edit_session","../tokenizer","./javascript","../test/assertions"],function(e,t,n){var r=e("../edit_session").EditSession,i=e("../tokenizer").Tokenizer,s=e("./javascript").Mode,o=e("../test/assertions");n.exports={setUp:function(){this.mode=new s},"test: getTokenizer() (smoke test)":function(){var e=this.mode.getTokenizer();o.ok(e instanceof i);var t=e.getLineTokens("'juhu'","start").tokens;o.equal("string",t[0].type)},"test: toggle comment lines should prepend '//' to each line":function(){var e=new r(["  abc","cde","fg"]);this.mode.toggleCommentLines("start",e,0,1),o.equal(["//  abc","//cde","fg"].join("\n"),e.toString())},"test: toggle comment on commented lines should remove leading '//' chars":function(){var e=new r(["//  abc","//cde","fg"]);this.mode.toggleCommentLines("start",e,0,1),o.equal(["  abc","cde","fg"].join("\n"),e.toString())},"test: toggle comment lines twice should return the original text":function(){var e=new r(["  abc","cde","fg"]);this.mode.toggleCommentLines("start",e,0,2),this.mode.toggleCommentLines("start",e,0,2),o.equal(["  abc","cde","fg"].join("\n"),e.toString())},"test: toggle comment on multiple lines with one commented line prepend '//' to each line":function(){var e=new r(["//  abc","//cde","fg"]);this.mode.toggleCommentLines("start",e,0,2),o.equal(["////  abc","////cde","//fg"].join("\n"),e.toString())},"test: toggle comment on a comment line with leading white space":function(){var e=new r(["//cde","  //fg"]);this.mode.toggleCommentLines("start",e,0,1),o.equal(["cde","  fg"].join("\n"),e.toString())},"test: auto indent after opening brace":function(){o.equal("  ",this.mode.getNextLineIndent("start","if () {","  "))},"test: auto indent after case":function(){o.equal("  ",this.mode.getNextLineIndent("start","case 'juhu':","  "))},"test: no auto indent in object literal":function(){o.equal("",this.mode.getNextLineIndent("start","{ 'juhu':","  "))},"test: no auto indent after opening brace in multi line comment":function(){o.equal("",this.mode.getNextLineIndent("start","/*if () {","  ")),o.equal("  ",this.mode.getNextLineIndent("comment","  abcd","  "))},"test: no auto indent after opening brace in single line comment":function(){o.equal("",this.mode.getNextLineIndent("start","//if () {","  ")),o.equal("  ",this.mode.getNextLineIndent("start","  //if () {","  "))},"test: no auto indent should add to existing indent":function(){o.equal("      ",this.mode.getNextLineIndent("start","    if () {","  ")),o.equal("    ",this.mode.getNextLineIndent("start","    cde","  ")),o.equal("    ",this.mode.getNextLineIndent("start","function foo(items) {","    "))},"test: special indent in doc comments":function(){o.equal(" * ",this.mode.getNextLineIndent("doc-start","/**"," ")),o.equal("   * ",this.mode.getNextLineIndent("doc-start","  /**"," ")),o.equal(" * ",this.mode.getNextLineIndent("doc-start"," *"," ")),o.equal("    * ",this.mode.getNextLineIndent("doc-start","    *"," ")),o.equal("  ",this.mode.getNextLineIndent("doc-start","  abc"," "))},"test: no indent after doc comments":function(){o.equal("",this.mode.getNextLineIndent("doc-start","   */","  "))},"test: trigger outdent if line is space and new text starts with closing brace":function(){o.ok(this.mode.checkOutdent("start","   "," }")),o.ok(!this.mode.checkOutdent("start"," a  "," }")),o.ok(!this.mode.checkOutdent("start","","}")),o.ok(!this.mode.checkOutdent("start","   ","a }")),o.ok(!this.mode.checkOutdent("start","   }","}"))},"test: auto outdent should indent the line with the same indent as the line with the matching opening brace":function(){var e=new r(["  function foo() {","    bla","    }"],new s);this.mode.autoOutdent("start",e,2),o.equal("  }",e.getLine(2))},"test: no auto outdent if no matching brace is found":function(){var e=new r(["  function foo()","    bla","    }"]);this.mode.autoOutdent("start",e,2),o.equal("    }",e.getLine(2))}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();