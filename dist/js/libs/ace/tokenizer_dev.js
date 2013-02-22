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

define(["require","exports","module"],function(e,t,n){var r=1e3,i=function(e){this.states=e,this.regExps={},this.matchMappings={};for(var t in this.states){var n=this.states[t],r=[],i=0,s=this.matchMappings[t]={defaultToken:"default.text"},o="g";for(var u=0;u<n.length;u++){var a=n[u];a.defaultToken&&(s.defaultToken=a.defaultToken),a.caseInsensitive&&(o="gi");if(a.regex==null)continue;a.regex instanceof RegExp&&(a.regex=a.regex.toString().slice(1,-1));var f=a.regex,l=(new RegExp("(?:("+f+")|(.))")).exec("a").length-2;Array.isArray(a.token)&&(a.token.length==1?a.token=a.token[0]:(a.tokenArray=a.token,a.token=this.$arrayTokens)),l>1&&(/\\\d/.test(a.regex)?f=a.regex.replace(/\\([0-9]+)/g,function(e,t){return"\\"+(parseInt(t,10)+i+1)}):(l=1,f=this.removeCapturingGroups(a.regex)),a.splitRegex||(a.splitRegex=this.createSplitterRegexp(a.regex,o))),s[i]=u,i+=l,r.push(f)}this.regExps[t]=new RegExp("("+r.join(")|(")+")|($)",o)}};(function(){this.$arrayTokens=function(e){if(!e)return[];var t=e.split(this.splitRegex),n=[],r=this.tokenArray;if(r.length!=t.length-2)return window.console&&console.error(r.length,t.length-2,e,this.splitRegex),[{type:"error.invalid",value:e}];for(var i=0;i<r.length;i++)t[i+1]&&(n[n.length]={type:r[i],value:t[i+1]});return n},this.removeCapturingGroups=function(e){var t=e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g,function(e,t){return t?"(?:":e});return t},this.createSplitterRegexp=function(e,t){return e=e.replace(/\(\?=([^()]|\\.)*?\)$/,""),new RegExp(e,t)},this.getLineTokens=function(e,t){function h(){c.push(t+"@"+l)}function p(){h(),c=[],h()}if(t&&typeof t!="string"){var n=t.slice(0);t=n[0]}else var n=[];var i=t||"start",s=this.states[i],o=this.matchMappings[i],u=this.regExps[i];u.lastIndex=0;var a,f=[],l=0,c=[],d={type:null,value:"",state:i};p();var v=1e4;while(a=u.exec(e)){var m=o.defaultToken,g=null,y=a[0],b=u.lastIndex;if(b-y.length>l){var w=e.substring(l,b-y.length);d.type==m?d.value+=w:(d.type&&f.push(d),d={type:m,value:w})}for(var E=0;E<a.length-2;E++){if(a[E+1]===undefined)continue;if(!(v--))throw"infinite"+s[o[E]]+i;g=s[o[E]],m=typeof g.token=="function"?g.token(y,i,n):g.token,g.next&&(typeof g.next=="string"?i=g.next:i=g.next(i,n),s=this.states[i],s||(window.console&&console.error&&console.error(i,"doesn't exist"),i="start",s=this.states[i]),o=this.matchMappings[i],l=b,u=this.regExps[i],u.lastIndex=b,h());break}if(y)if(typeof m=="string")!!g&&g.merge===!1||d.type!==m?(d.type&&f.push(d),d={type:m,value:y}):d.value+=y;else{d.type&&f.push(d),d={type:null,value:""};for(var E=0;E<m.length;E++)f.push(m[E])}if(l==e.length)break;l=b;if(f.length>r){d.value+=e.substr(l),i="start";break}}return d.type&&f.push(d),{tokens:f,state:n.length?n:i}}}).call(i.prototype),t.Tokenizer=i});