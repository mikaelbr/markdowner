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

define(["require","exports","module","../lib/oop","./text","../tokenizer","./css_highlight_rules","./matching_brace_outdent","../worker/worker_client","./behaviour/css","./folding/cstyle"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./css_highlight_rules").CssHighlightRules,u=e("./matching_brace_outdent").MatchingBraceOutdent,a=e("../worker/worker_client").WorkerClient,f=e("./behaviour/css").CssBehaviour,l=e("./folding/cstyle").FoldMode,c=function(){this.$tokenizer=new s((new o).getRules()),this.$outdent=new u,this.$behaviour=new f,this.foldingRules=new l};r.inherits(c,i),function(){this.foldingRules="cStyle",this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=this.$tokenizer.getLineTokens(t,e).tokens;if(i.length&&i[i.length-1].type=="comment")return r;var s=t.match(/^.*\{\s*$/);return s&&(r+=n),r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new a(["ace"],"ace/mode/css_worker","Worker");return t.attachToDocument(e.getDocument()),t.on("csslint",function(t){e.setAnnotations(t.data)}),t.on("terminate",function(){e.clearAnnotations()}),t}}.call(c.prototype),t.Mode=c});