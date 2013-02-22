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

define(["require","exports","module","../../lib/oop","./fold_mode","../../range"],function(e,t,n){var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,s=e("../../range").Range,o=t.FoldMode=function(){};r.inherits(o,i),function(){this.foldingStartMarker=/^(?:\|={10,}|[\.\/=\-~^+]{4,}\s*$|={1,5} )/,this.singleLineHeadingRe=/^={1,5}(?=\s+\S)/,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);return this.foldingStartMarker.test(r)?r[0]=="="?this.singleLineHeadingRe.test(r)?"start":e.getLine(n-1).length!=e.getLine(n).length?"":"start":e.bgTokenizer.getState(n)=="dissallowDelimitedBlock"?"end":"start":""},this.getFoldWidgetRange=function(e,t,n){function l(t){return f=e.getTokens(t)[0],f&&f.type}function d(){var t=f.value.match(p);if(t)return t[0].length;var r=c.indexOf(f.value[0])+1;return r==1&&e.getLine(n-1).length!=e.getLine(n).length?Infinity:r}var r=e.getLine(n),i=r.length,o=e.getLength(),u=n,a=n;if(!r.match(this.foldingStartMarker))return;var f,c=["=","-","~","^","+"],h="markup.heading",p=this.singleLineHeadingRe;if(l(n)==h){var v=d();while(++n<o){if(l(n)!=h)continue;var m=d();if(m<=v)break}var g=f&&f.value.match(this.singleLineHeadingRe);a=g?n-1:n-2;if(a>u)while(a>u&&(!l(a)||f.value[0]=="["))a--;if(a>u){var y=e.getLine(a).length;return new s(u,i,a,y)}}else{var b=e.bgTokenizer.getState(n);if(b=="dissallowDelimitedBlock"){while(n-->0)if(e.bgTokenizer.getState(n).lastIndexOf("Block")==-1)break;a=n+1;if(a<u){var y=e.getLine(n).length;return new s(a,5,u,i-5)}}else{while(++n<o)if(e.bgTokenizer.getState(n)=="dissallowDelimitedBlock")break;a=n;if(a>u){var y=e.getLine(n).length;return new s(u,5,a,y-5)}}}}}.call(o.prototype)});