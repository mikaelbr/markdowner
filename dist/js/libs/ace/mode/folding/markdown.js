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

define(["require","exports","module","../../lib/oop","./fold_mode","../../range"],function(e,t,n){var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,s=e("../../range").Range,o=t.FoldMode=function(){};r.inherits(o,i),function(){this.foldingStartMarker=/^(?:[=-]+\s*$|#{1,6} |`{3})/,this.getFoldWidget=function(e,t,n){var r=e.getLine(n);return this.foldingStartMarker.test(r)?r[0]=="`"?e.bgTokenizer.getState(n)=="start"?"end":"start":"start":""},this.getFoldWidgetRange=function(e,t,n){function l(t){return f=e.getTokens(t)[0],f&&f.type.lastIndexOf(c,0)===0}function h(){var e=f.value[0];return e=="="?6:e=="-"?5:7-f.value.search(/[^#]/)}var r=e.getLine(n),i=r.length,o=e.getLength(),u=n,a=n;if(!r.match(this.foldingStartMarker))return;if(r[0]=="`"){if(e.bgTokenizer.getState(n)!=="start"){while(++n<o){r=e.getLine(n);if(r[0]=="`"&r.substring(0,3)=="```")break}return new s(u,i,n,0)}while(n-->0){r=e.getLine(n);if(r[0]=="`"&r.substring(0,3)=="```")break}return new s(n,r.length,u,0)}var f,c="markup.heading";if(l(n)){var p=h();while(++n<o){if(!l(n))continue;var d=h();if(d>=p)break}a=n-(!f||["=","-"].indexOf(f.value[0])==-1?1:2);if(a>u)while(a>u&&/^\s*$/.test(e.getLine(a)))a--;if(a>u){var v=e.getLine(a).length;return new s(u,i,a,v)}}}}.call(o.prototype)});