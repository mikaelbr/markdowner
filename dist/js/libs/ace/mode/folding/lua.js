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

define(["require","exports","module","../../lib/oop","./fold_mode","../../range","../../token_iterator"],function(e,t,n){var r=e("../../lib/oop"),i=e("./fold_mode").FoldMode,s=e("../../range").Range,o=e("../../token_iterator").TokenIterator,u=t.FoldMode=function(){};r.inherits(u,i),function(){this.foldingStartMarker=/\b(function|then|do|repeat)\b|{\s*$|(\[=*\[)/,this.foldingStopMarker=/\bend\b|^\s*}|\]=*\]/,this.getFoldWidget=function(e,t,n){var r=e.getLine(n),i=this.foldingStartMarker.test(r),s=this.foldingStopMarker.test(r);if(i&&!s){var o=r.match(this.foldingStartMarker);if(o[1]=="then"&&/\belseif\b/.test(r))return;if(o[1]){if(e.getTokenAt(n,o.index+1).type==="keyword")return"start"}else{if(!o[2])return"start";var u=e.bgTokenizer.getState(n)||"";if(u[0]=="bracketedComment"||u[0]=="bracketedString")return"start"}}if(t!="markbeginend"||!s||i&&s)return"";var o=r.match(this.foldingStopMarker);if(o[0]==="end"){if(e.getTokenAt(n,o.index+1).type==="keyword")return"end"}else{if(o[0][0]!=="]")return"end";var u=e.bgTokenizer.getState(n-1)||"";if(u[0]=="bracketedComment"||u[0]=="bracketedString")return"end"}},this.getFoldWidgetRange=function(e,t,n){var r=e.doc.getLine(n),i=this.foldingStartMarker.exec(r);if(i)return i[1]?this.luaBlock(e,n,i.index+1):i[2]?e.getCommentFoldRange(n,i.index+1):this.openingBracketBlock(e,"{",n,i.index);var i=this.foldingStopMarker.exec(r);if(i)return i[0]==="end"&&e.getTokenAt(n,i.index+1).type==="keyword"?this.luaBlock(e,n,i.index+1):i[0][0]==="]"?e.getCommentFoldRange(n,i.index+1):this.closingBracketBlock(e,"}",n,i.index+i[0].length)},this.luaBlock=function(e,t,n){var r=new o(e,t,n),i={"function":1,"do":1,then:1,elseif:-1,end:-1,repeat:1,until:-1},u=r.getCurrentToken();if(!u||u.type!="keyword")return;var a=u.value,f=[a],l=i[a];if(!l)return;var c=l===-1?r.getCurrentTokenColumn():e.getLine(t).length,h=t;r.step=l===-1?r.stepBackward:r.stepForward;while(u=r.step()){if(u.type!=="keyword")continue;var p=l*i[u.value];if(p>0)f.unshift(u.value);else if(p<=0){f.shift();if(!f.length&&u.value!="elseif")break;p===0&&f.unshift(u.value)}}var t=r.getCurrentTokenRow();return l===-1?new s(t,e.getLine(t).length,h,c):new s(h,c,t,r.getCurrentTokenColumn())}}.call(u.prototype)});