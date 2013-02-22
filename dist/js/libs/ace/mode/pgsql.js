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

define(["require","exports","module","../lib/oop","../mode/text","../tokenizer","./pgsql_highlight_rules","../range"],function(e,t,n){var r=e("../lib/oop"),i=e("../mode/text").Mode,s=e("../tokenizer").Tokenizer,o=e("./pgsql_highlight_rules").PgsqlHighlightRules,u=e("../range").Range,a=function(){this.$tokenizer=new s((new o).getRules())};r.inherits(a,i),function(){this.toggleCommentLines=function(e,t,n,r){var i=!0,s=/^(\s*)--/;for(var o=n;o<=r;o++)if(!s.test(t.getLine(o))){i=!1;break}if(i){var a=new u(0,0,0,0);for(var o=n;o<=r;o++){var f=t.getLine(o),l=f.match(s);a.start.row=o,a.end.row=o,a.end.column=l[0].length,t.replace(a,l[1])}}else t.indentRows(n,r,"--")},this.getNextLineIndent=function(e,t,n){return e=="start"||e=="keyword.statementEnd"?"":this.$getIndent(t)}}.call(a.prototype),t.Mode=a});