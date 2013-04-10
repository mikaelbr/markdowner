/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
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

define(["require","exports","module","../lib/oop","./text","../tokenizer","./logiql_highlight_rules","./folding/coffee","../token_iterator","../range","./behaviour/cstyle","./matching_brace_outdent"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./logiql_highlight_rules").LogiQLHighlightRules,u=e("./folding/coffee").FoldMode,a=e("../token_iterator").TokenIterator,f=e("../range").Range,l=e("./behaviour/cstyle").CstyleBehaviour,c=e("./matching_brace_outdent").MatchingBraceOutdent,h=function(){var e=new o;this.foldingRules=new u,this.$tokenizer=new s(e.getRules()),this.$outdent=new c,this.$behaviour=new l};r.inherits(h,i),function(){this.lineCommentStart="//",this.blockComment={start:"/*",end:"*/"},this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=this.$tokenizer.getLineTokens(t,e),s=i.tokens,o=i.state;if(/comment|string/.test(o))return r;if(s.length&&s[s.length-1].type=="comment.single")return r;var u=t.match();return/(-->|<--|<-|->|{)\s*$/.test(t)&&(r+=n),r},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)?!0:n!=="\n"&&n!=="\r\n"?!1:/^\s+/.test(t)?!0:!1},this.autoOutdent=function(e,t,n){if(this.$outdent.autoOutdent(t,n))return;var r=t.getLine(n),i=r.match(/^\s+/),s=r.lastIndexOf(".")+1;if(!i||!n||!s)return 0;var o=t.getLine(n+1),u=this.getMatching(t,{row:n,column:s});if(!u||u.start.row==n)return 0;s=i[0].length;var a=this.$getIndent(t.getLine(u.start.row));t.replace(new f(n+1,0,n+1,s),a)},this.getMatching=function(e,t,n){t==undefined&&(t=e.selection.lead),typeof t=="object"&&(n=t.column,t=t.row);var r=e.getTokenAt(t,n),i="keyword.start",s="keyword.end",o;if(!r)return;if(r.type==i){var u=new a(e,t,n);u.step=u.stepForward}else{if(r.type!=s)return;var u=new a(e,t,n);u.step=u.stepBackward}while(o=u.step())if(o.type==i||o.type==s)break;if(!o||o.type==r.type)return;var l=u.getCurrentTokenColumn(),t=u.getCurrentTokenRow();return new f(t,l,t,l+o.value.length)}}.call(h.prototype),t.Mode=h});