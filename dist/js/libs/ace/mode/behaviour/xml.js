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

define(["require","exports","module","../../lib/oop","../behaviour","./cstyle","../../token_iterator"],function(e,t,n){function u(e,t){var n=!0,r=e.type.split("."),i=t.split(".");return i.forEach(function(e){if(r.indexOf(e)==-1)return n=!1,!1}),n}var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("./cstyle").CstyleBehaviour,o=e("../../token_iterator").TokenIterator,a=function(){this.inherit(s,["string_dquotes"]),this.add("autoclosing","insertion",function(e,t,n,r,i){if(i==">"){var s=n.getCursorPosition(),a=new o(r,s.row,s.column),f=a.getCurrentToken(),l=!1;if(!f||!u(f,"meta.tag")&&(!u(f,"text")||!f.value.match("/"))){do f=a.stepBackward();while(f&&(u(f,"string")||u(f,"keyword.operator")||u(f,"entity.attribute-name")||u(f,"text")))}else l=!0;if(!f||!u(f,"meta.tag-name")||a.stepBackward().value.match("/"))return;var c=f.value;if(l)var c=c.substring(0,s.column-f.start);return{text:"></"+c+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,i){if(i=="\n"){var s=n.getCursorPosition(),o=r.doc.getLine(s.row),u=o.substring(s.column,s.column+2);if(u=="</"){var a=this.$getIndent(r.doc.getLine(s.row))+r.getTabString(),f=this.$getIndent(r.doc.getLine(s.row));return{text:"\n"+a+"\n"+f,selection:[1,a.length,1,a.length]}}}})};r.inherits(a,i),t.XmlBehaviour=a});