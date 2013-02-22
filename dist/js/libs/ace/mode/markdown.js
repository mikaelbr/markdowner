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

define(["require","exports","module","../lib/oop","./text","./javascript","./xml","./html","../tokenizer","./markdown_highlight_rules","./folding/markdown"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("./javascript").Mode,o=e("./xml").Mode,u=e("./html").Mode,a=e("../tokenizer").Tokenizer,f=e("./markdown_highlight_rules").MarkdownHighlightRules,l=e("./folding/markdown").FoldMode,c=function(){var e=new f;this.$tokenizer=new a(e.getRules()),this.$embeds=e.getEmbeds(),this.createModeDelegates({"js-":s,"xml-":o,"html-":u}),this.foldingRules=new l};r.inherits(c,i),function(){this.getNextLineIndent=function(e,t,n){if(e=="listblock"){var r=/^(\s*)(?:([-+*])|(\d+)\.)(\s+)/.exec(t);if(!r)return"";var i=r[2];return i||(i=parseInt(r[3],10)+1+"."),r[1]+i+r[4]}return this.$getIndent(t)}}.call(c.prototype),t.Mode=c});