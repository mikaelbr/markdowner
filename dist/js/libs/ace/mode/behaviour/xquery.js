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

define(["require","exports","module","../../lib/oop","../behaviour","./cstyle","../behaviour/xml","../../token_iterator"],function(e,t,n){function a(e,t){var n=!0,r=e.type.split("."),i=t.split(".");return i.forEach(function(e){if(r.indexOf(e)==-1)return n=!1,!1}),n}var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("./cstyle").CstyleBehaviour,o=e("../behaviour/xml").XmlBehaviour,u=e("../../token_iterator").TokenIterator,f=function(){this.inherit(s,["braces","parens","string_dquotes"]),this.inherit(o),this.add("autoclosing","insertion",function(e,t,n,r,i){if(i==">"){var s=n.getCursorPosition(),o=new u(r,s.row,s.column),f=o.getCurrentToken(),l=!1,e=JSON.parse(e).pop();if(f&&f.value===">"||e!=="StartTag")return;if(!f||!a(f,"meta.tag")&&(!a(f,"text")||!f.value.match("/"))){do f=o.stepBackward();while(f&&(a(f,"string")||a(f,"keyword.operator")||a(f,"entity.attribute-name")||a(f,"text")))}else l=!0;var c=o.stepBackward();if(!f||!a(f,"meta.tag")||c!==null&&c.value.match("/"))return;var h=f.value.substring(1);if(l)var h=h.substring(0,s.column-f.start);return{text:"></"+h+">",selection:[1,1]}}})};r.inherits(f,i),t.XQueryBehaviour=f});