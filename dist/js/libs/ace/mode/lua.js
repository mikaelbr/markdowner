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

define(["require","exports","module","../lib/oop","./text","../tokenizer","./lua_highlight_rules","./folding/lua","../range","../worker/worker_client"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./lua_highlight_rules").LuaHighlightRules,u=e("./folding/lua").FoldMode,a=e("../range").Range,f=e("../worker/worker_client").WorkerClient,l=function(){this.$tokenizer=new s((new o).getRules()),this.foldingRules=new u};r.inherits(l,i),function(){function n(t){var n=0;for(var r=0;r<t.length;r++){var i=t[r];i.type=="keyword"?i.value in e&&(n+=e[i.value]):i.type=="paren.lparen"?n++:i.type=="paren.rparen"&&n--}return n<0?-1:n>0?1:0}this.lineCommentStart="--",this.blockComment={start:"--[",end:"]--"};var e={"function":1,then:1,"do":1,"else":1,elseif:1,repeat:1,end:-1,until:-1},t=["else","elseif","end","until"];this.getNextLineIndent=function(e,t,r){var i=this.$getIndent(t),s=0,o=this.$tokenizer.getLineTokens(t,e),u=o.tokens;return e=="start"&&(s=n(u)),s>0?i+r:s<0&&i.substr(i.length-r.length)==r&&!this.checkOutdent(e,t,"\n")?i.substr(0,i.length-r.length):i},this.checkOutdent=function(e,n,r){if(r!="\n"&&r!="\r"&&r!="\r\n")return!1;if(n.match(/^\s*[\)\}\]]$/))return!0;var i=this.$tokenizer.getLineTokens(n.trim(),e).tokens;return!i||!i.length?!1:i[0].type=="keyword"&&t.indexOf(i[0].value)!=-1},this.autoOutdent=function(e,t,r){var i=t.getLine(r-1),s=this.$getIndent(i).length,o=this.$tokenizer.getLineTokens(i,"start").tokens,u=t.getTabString().length,f=s+u*n(o),l=this.$getIndent(t.getLine(r)).length;if(l<f)return;t.outdentRows(new a(r,0,r+2,0))},this.createWorker=function(e){var t=new f(["ace"],"ace/mode/lua_worker","Worker");return t.attachToDocument(e.getDocument()),t.on("error",function(t){e.setAnnotations([t.data])}),t.on("ok",function(t){e.clearAnnotations()}),t}}.call(l.prototype),t.Mode=l});