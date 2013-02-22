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

define(["require","exports","module","../worker/worker_client","../lib/oop","./text","./xquery/XQueryLexer","../range","./behaviour/xquery","./folding/cstyle"],function(e,t,n){var r=e("../worker/worker_client").WorkerClient,i=e("../lib/oop"),s=e("./text").Mode,o=e("./xquery/XQueryLexer").XQueryLexer,u=e("../range").Range,a=e("./behaviour/xquery").XQueryBehaviour,f=e("./folding/cstyle").FoldMode,l=function(e){this.$tokenizer=new o,this.$behaviour=new a,this.foldingRules=new f};i.inherits(l,s),function(){this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=t.match(/\s*(?:then|else|return|[{\(]|<\w+>)\s*$/);return i&&(r+=n),r},this.checkOutdent=function(e,t,n){return/^\s+$/.test(t)?/^\s*[\}\)]/.test(n):!1},this.autoOutdent=function(e,t,n){var r=t.getLine(n),i=r.match(/^(\s*[\}\)])/);if(!i)return 0;var s=i[1].length,o=t.findMatchingBracket({row:n,column:s});if(!o||o.row==n)return 0;var a=this.$getIndent(t.getLine(o.row));t.replace(new u(n,0,n,s-1),a)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""},this.toggleCommentLines=function(e,t,n,r){var i,s,o=!0,a=/^\s*\(:(.*):\)/;for(i=n;i<=r;i++)if(!a.test(t.getLine(i))){o=!1;break}var f=new u(0,0,0,0);for(i=n;i<=r;i++)s=t.getLine(i),f.start.row=i,f.end.row=i,f.end.column=s.length,t.replace(f,o?s.match(a)[1]:"(:"+s+":)")},this.createWorker=function(e){this.$deltas=[];var t=new r(["ace"],"ace/mode/xquery_worker","XQueryWorker"),n=this;return e.getDocument().on("change",function(e){n.$deltas.push(e.data)}),t.attachToDocument(e.getDocument()),t.on("start",function(e){n.$deltas=[]}),t.on("error",function(t){e.setAnnotations([t.data])}),t.on("ok",function(t){e.clearAnnotations()}),t.on("highlight",function(t){if(n.$deltas.length>0)return;n.$tokenizer.tokens=t.data.tokens,n.$tokenizer.lines=e.getDocument().getAllLines(),e.bgTokenizer.lines=[],e.bgTokenizer.states=[];var r=Object.keys(n.$tokenizer.tokens);for(var i=0;i<r.length;i++){var s=parseInt(r[i]);e.bgTokenizer.fireUpdateEvent(s,s)}}),t}}.call(l.prototype),t.Mode=l});