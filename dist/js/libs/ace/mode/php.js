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

define(["require","exports","module","../lib/oop","./text","../tokenizer","./php_highlight_rules","./php_highlight_rules","./matching_brace_outdent","../range","../worker/worker_client","./behaviour/cstyle","./folding/cstyle","../unicode"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./php_highlight_rules").PhpHighlightRules,u=e("./php_highlight_rules").PhpLangHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,f=e("../range").Range,l=e("../worker/worker_client").WorkerClient,c=e("./behaviour/cstyle").CstyleBehaviour,h=e("./folding/cstyle").FoldMode,p=e("../unicode"),d=function(e){var t=e&&e.inline,n=t?u:o;this.$tokenizer=new s((new n).getRules()),this.$outdent=new a,this.$behaviour=new c,this.foldingRules=new h};r.inherits(d,i),function(){this.tokenRe=new RegExp("^["+p.packages.L+p.packages.Mn+p.packages.Mc+p.packages.Nd+p.packages.Pc+"_]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+p.packages.L+p.packages.Mn+p.packages.Mc+p.packages.Nd+p.packages.Pc+"_]|s])+","g"),this.lineCommentStart=["#","//"],this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=this.$tokenizer.getLineTokens(t,e),s=i.tokens,o=i.state;if(s.length&&s[s.length-1].type=="comment")return r;if(e=="php-start"){var u=t.match(/^.*[\{\(\[\:]\s*$/);u&&(r+=n)}else if(e=="php-doc-start"){if(o!="php-doc-start")return"";var u=t.match(/^\s*(\/?)\*/);u&&(u[1]&&(r+=" "),r+="* ")}return r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new l(["ace"],"ace/mode/php_worker","PhpWorker");return t.attachToDocument(e.getDocument()),t.on("error",function(t){e.setAnnotations(t.data)}),t.on("ok",function(){e.clearAnnotations()}),t}}.call(d.prototype),t.Mode=d});