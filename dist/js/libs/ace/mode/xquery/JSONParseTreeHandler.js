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

define(["require","exports","module"],function(e,t,n){var r=t.JSONParseTreeHandler=function(e){function f(e){return{name:e,children:[],getParent:null,pos:{sl:0,sc:0,el:0,ec:0}}}function l(e,t){var i=f(e);n===null?(n=i,r=i):(i.getParent=r,r.children.push(i),r=r.children[r.children.length-1])}function c(){if(r.children.length>0){var e=r.children[0],n=null;for(var i=r.children.length-1;i>=0;i--){n=r.children[i];if(n.pos.el!==0||n.pos.ec!==0)break}r.pos.sl=e.pos.sl,r.pos.sc=e.pos.sc,r.pos.el=n.pos.el,r.pos.ec=n.pos.ec}r.name==="FunctionName"&&(r.name="EQName"),r.name==="EQName"&&r.value===undefined&&(r.value=r.children[0].value,r.children.pop()),r.getParent!==null&&(r=r.getParent);if(r.children.length>0){var s=r.children[r.children.length-1];s.children.length===1&&t.indexOf(s.name)!==-1&&(r.children[r.children.length-1]=s.children[0])}}function h(e,t,n){var a=n-s;r.value=i.substring(0,a),i=i.substring(a),s=n;var f=u,l=o,c=f+r.value.split("\n").length-1,h=r.value.lastIndexOf("\n"),p=h===-1?l+r.value.length:r.value.substring(h+1).length;u=c,o=p,r.pos.sl=f,r.pos.sc=l,r.pos.el=c,r.pos.ec=p}var t=["OrExpr","AndExpr","ComparisonExpr","StringConcatExpr","RangeExpr","UnionExpr","IntersectExceptExpr","InstanceofExpr","TreatExpr","CastableExpr","CastExpr","UnaryExpr","ValueExpr","FTContainsExpr","SimpleMapExpr","PathExpr","RelativePathExpr","PostfixExpr","StepExpr"],n=null,r=null,i=e,s=0,o=0,u=0,a=0;this.closeParseTree=function(){while(r.getParent!==null)c();c()},this.peek=function(){return r},this.getParseTree=function(){return n},this.reset=function(e){},this.startNonterminal=function(e,t){l(e,t)},this.endNonterminal=function(e,t){c()},this.terminal=function(e,t,n){e=e.substring(0,1)==="'"&&e.substring(e.length-1)==="'"?"TOKEN":e,l(e,t),h(r,t,n),c()},this.whitespace=function(e,t){var n="WS";l(n,e),h(r,e,t),c()}}});