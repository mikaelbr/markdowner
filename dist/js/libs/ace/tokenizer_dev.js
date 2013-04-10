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

define(["require","exports","module","./tokenizer"],function(e,t,n){var r=e("./tokenizer").Tokenizer,i=1e3,s=function(e){r.call(this,e),this.getLineTokens=function(e,t){function h(){c.push(t+"@"+l)}function p(){h(),c=[],h()}if(t&&typeof t!="string"){var n=t.slice(0);t=n[0]}else var n=[];var r=t||"start",s=this.states[r],o=this.matchMappings[r],u=this.regExps[r];u.lastIndex=0;var a,f=[],l=0,c=[],d={type:null,value:"",state:r};p();var v=1e4;while(a=u.exec(e)){var m=o.defaultToken,g=null,y=a[0],b=u.lastIndex;if(b-y.length>l){var w=e.substring(l,b-y.length);d.type==m?d.value+=w:(d.type&&f.push(d),d={type:m,value:w})}for(var E=0;E<a.length-2;E++){if(a[E+1]===undefined)continue;if(!(v--))throw"infinite"+s[o[E]]+r;g=s[o[E]],g.onMatch?m=g.onMatch(y,r,n):m=g.token,g.next&&(typeof g.next=="string"?r=g.next:r=g.next(r,n),s=this.states[r],s||(window.console&&console.error&&console.error(r,"doesn't exist"),r="start",s=this.states[r]),o=this.matchMappings[r],l=b,u=this.regExps[r],u.lastIndex=b,h());break}if(y)if(typeof m=="string")!!g&&g.merge===!1||d.type!==m?(d.type&&f.push(d),d={type:m,value:y}):d.value+=y;else{d.type&&f.push(d),d={type:null,value:""};for(var E=0;E<m.length;E++)f.push(m[E])}if(l==e.length)break;l=b;if(f.length>i){d.value+=e.substr(l),r="start";break}}return d.type&&f.push(d),{tokens:f,state:n.length?n:r}}};t.Tokenizer=s});