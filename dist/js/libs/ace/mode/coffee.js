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

define(["require","exports","module","../tokenizer","./coffee_highlight_rules","./matching_brace_outdent","./folding/coffee","../range","./text","../worker/worker_client","../lib/oop"],function(e,t,n){function c(){this.$tokenizer=new r((new i).getRules()),this.$outdent=new s,this.foldingRules=new o}var r=e("../tokenizer").Tokenizer,i=e("./coffee_highlight_rules").CoffeeHighlightRules,s=e("./matching_brace_outdent").MatchingBraceOutdent,o=e("./folding/coffee").FoldMode,u=e("../range").Range,a=e("./text").Mode,f=e("../worker/worker_client").WorkerClient,l=e("../lib/oop");l.inherits(c,a),function(){var e=/(?:[({[=:]|[-=]>|\b(?:else|switch|try|catch(?:\s*[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$/,t=/^(\s*)#/,n=/^\s*###(?!#)/,r=/^\s*/;this.getNextLineIndent=function(t,n,r){var i=this.$getIndent(n),s=this.$tokenizer.getLineTokens(n,t).tokens;return(!s.length||s[s.length-1].type!=="comment")&&t==="start"&&e.test(n)&&(i+=r),i},this.toggleCommentLines=function(e,i,s,o){console.log("toggle");var a=new u(0,0,0,0);for(var f=s;f<=o;++f){var l=i.getLine(f);if(n.test(l))continue;t.test(l)?l=l.replace(t,"$1"):l=l.replace(r,"$&#"),a.end.row=a.start.row=f,a.end.column=l.length+1,i.replace(a,l)}},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new f(["ace"],"ace/mode/coffee_worker","Worker");return t.attachToDocument(e.getDocument()),t.on("error",function(t){e.setAnnotations([t.data])}),t.on("ok",function(t){e.clearAnnotations()}),t}}.call(c.prototype),t.Mode=c});