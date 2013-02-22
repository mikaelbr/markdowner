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

define(["require","exports","module","../tokenizer","./abap_highlight_rules","./folding/coffee","../range","./text","../lib/oop"],function(e,t,n){function f(){this.$tokenizer=new r((new i).getRules()),this.foldingRules=new s}var r=e("../tokenizer").Tokenizer,i=e("./abap_highlight_rules").AbapHighlightRules,s=e("./folding/coffee").FoldMode,o=e("../range").Range,u=e("./text").Mode,a=e("../lib/oop");a.inherits(f,u),function(){this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t);return r},this.toggleCommentLines=function(e,t,n,r){var i=new o(0,0,0,0);for(var s=n;s<=r;++s){var u=t.getLine(s);if(hereComment.test(u))continue;commentLine.test(u)?u=u.replace(commentLine,"$1"):u=u.replace(indentation,"$&#"),i.end.row=i.start.row=s,i.end.column=u.length+1,t.replace(i,u)}}}.call(f.prototype),t.Mode=f});