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

define(["require","exports","module","../lib/oop","../lib/lang","../worker/mirror","./css/csslint"],function(e,t,n){var r=e("../lib/oop"),i=e("../lib/lang"),s=e("../worker/mirror").Mirror,o=e("./css/csslint").CSSLint,u=t.Worker=function(e){s.call(this,e),this.setTimeout(400),this.ruleset=null,this.setDisabledRules("ids"),this.setInfoRules("adjoining-classes|qualified-headings|zero-units|gradients|import|outline-none")};r.inherits(u,s),function(){this.setInfoRules=function(e){typeof e=="string"&&(e=e.split("|")),this.infoRules=i.arrayToMap(e),this.doc.getValue()&&this.deferredUpdate.schedule(100)},this.setDisabledRules=function(e){if(!e)this.ruleset=null;else{typeof e=="string"&&(e=e.split("|"));var t={};o.getRules().forEach(function(e){t[e.id]=!0}),e.forEach(function(e){delete t[e]}),this.ruleset=t}this.doc.getValue()&&this.deferredUpdate.schedule(100)},this.onUpdate=function(){var e=this.doc.getValue(),t=this.infoRules,n=o.verify(e,this.ruleset);this.sender.emit("csslint",n.messages.map(function(e){return{row:e.line-1,column:e.col-1,text:e.message,type:t[e.rule.id]?"info":e.type}}))}}.call(u.prototype)});