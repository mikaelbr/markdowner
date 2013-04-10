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

define(["require","exports","module","../../lib/oop","./fold_mode","../../range","../../token_iterator"],function(e,t,n){var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,s=e("../../range").Range,o=e("../../token_iterator").TokenIterator,u=t.FoldMode=function(){};r.inherits(u,i),function(){this.foldingStartMarker=/^\s*\\(begin)|(section|subsection)\b|{\s*$/,this.foldingStopMarker=/^\s*\\(end)\b|^\s*}/,this.getFoldWidgetRange=function(e,t,n){var r=e.doc.getLine(n),i=this.foldingStartMarker.exec(r);if(i)return i[1]?this.latexBlock(e,n,i[0].length-1):i[2]?this.latexSection(e,n,i[0].length-1):this.openingBracketBlock(e,"{",n,i.index);var i=this.foldingStopMarker.exec(r);if(i)return i[1]?this.latexBlock(e,n,i[0].length-1):this.closingBracketBlock(e,"}",n,i.index+i[0].length)},this.latexBlock=function(e,t,n){var r={"\\begin":1,"\\end":-1},i=new o(e,t,n),u=i.getCurrentToken();if(!u||u.type!=="keyword")return;var a=u.value,f=r[a],l=function(){var e=i.stepForward(),t=e.type=="lparen"?i.stepForward().value:"";return f===-1&&(i.stepBackward(),t&&i.stepBackward()),t},c=[l()],h=f===-1?i.getCurrentTokenColumn():e.getLine(t).length,p=t;i.step=f===-1?i.stepBackward:i.stepForward;while(u=i.step()){if(u.type!=="keyword")continue;var d=r[u.value];if(!d)continue;var v=l();if(d===f)c.unshift(v);else if(c.shift()!==v||!c.length)break}if(c.length)return;var t=i.getCurrentTokenRow();return f===-1?new s(t,e.getLine(t).length,p,h):(i.stepBackward(),new s(p,h,t,i.getCurrentTokenColumn()))},this.latexSection=function(e,t,n){var r=["\\subsection","\\section","\\begin","\\end"],i=new o(e,t,n),u=i.getCurrentToken();if(!u||u.type!="keyword")return;var a=r.indexOf(u.value),f=0,l=t;while(u=i.stepForward()){if(u.type!=="keyword")continue;var c=r.indexOf(u.value);if(c>=2){f||(l=i.getCurrentTokenRow()-1),f+=c==2?1:-1;if(f<0)break}else if(c>=a)break}f||(l=i.getCurrentTokenRow()-1);while(l>t&&!/\S/.test(e.getLine(l)))l--;return new s(t,e.getLine(t).length,l,e.getLine(l).length)}}.call(u.prototype)});