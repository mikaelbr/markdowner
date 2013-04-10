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

define(["require","exports","module"],function(e,t,n){var r=1e3,i=function(e){this.states=e,this.regExps={},this.matchMappings={};for(var t in this.states){var n=this.states[t],r=[],i=0,s=this.matchMappings[t]={defaultToken:"text"},o="g";for(var u=0;u<n.length;u++){var a=n[u];a.defaultToken&&(s.defaultToken=a.defaultToken),a.caseInsensitive&&(o="gi");if(a.regex==null)continue;a.regex instanceof RegExp&&(a.regex=a.regex.toString().slice(1,-1));var f=a.regex,l=(new RegExp("(?:("+f+")|(.))")).exec("a").length-2;if(Array.isArray(a.token))if(a.token.length==1||l==1)a.token=a.token[0];else{if(l-1!=a.token.length)throw new Error("number of classes and regexp groups in '"+a.token+"'\n'"+a.regex+"' doesn't match\n"+(l-1)+"!="+a.token.length);a.tokenArray=a.token,a.onMatch=this.$arrayTokens}else typeof a.token=="function"&&!a.onMatch&&(l>1?a.onMatch=this.$applyToken:a.onMatch=a.token);l>1&&(/\\\d/.test(a.regex)?f=a.regex.replace(/\\([0-9]+)/g,function(e,t){return"\\"+(parseInt(t,10)+i+1)}):(l=1,f=this.removeCapturingGroups(a.regex)),!a.splitRegex&&typeof a.token!="string"&&(a.splitRegex=this.createSplitterRegexp(a.regex,o))),s[i]=u,i+=l,r.push(f),a.onMatch||(a.onMatch=null),a.__proto__=null}this.regExps[t]=new RegExp("("+r.join(")|(")+")|($)",o)}};(function(){this.$applyToken=function(e){var t=this.splitRegex.exec(e).slice(1),n=this.token.apply(this,t);if(typeof n=="string")return[{type:n,value:e}];var r=[];for(var i=0,s=n.length;i<s;i++)t[i]&&(r[r.length]={type:n[i],value:t[i]});return r},this.$arrayTokens=function(e){if(!e)return[];var t=this.splitRegex.exec(e),n=[],r=this.tokenArray;for(var i=0,s=r.length;i<s;i++)t[i+1]&&(n[n.length]={type:r[i],value:t[i+1]});return n},this.removeCapturingGroups=function(e){var t=e.replace(/\[(?:\\.|[^\]])*?\]|\\.|\(\?[:=!]|(\()/g,function(e,t){return t?"(?:":e});return t},this.createSplitterRegexp=function(e,t){if(e.indexOf("(?=")!=-1){var n=0,r=!1,i={};e.replace(/(\\.)|(\((?:\?[=!])?)|(\))|([\[\]])/g,function(e,t,s,o,u,a){return r?r=u!="]":u?r=!0:o?(n==i.stack&&(i.end=a+1,i.stack=-1),n--):s&&(n++,s.length!=1&&(i.stack=n,i.start=a)),e}),i.end!=null&&/^\)*$/.test(e.substr(i.end))&&(e=e.substring(0,i.start)+e.substr(i.end))}return new RegExp(e,(t||"").replace("g",""))},this.getLineTokens=function(e,t){if(t&&typeof t!="string"){var n=t.slice(0);t=n[0]}else var n=[];var i=t||"start",s=this.states[i],o=this.matchMappings[i],u=this.regExps[i];u.lastIndex=0;var a,f=[],l=0,c={type:null,value:""};while(a=u.exec(e)){var h=o.defaultToken,p=null,d=a[0],v=u.lastIndex;if(v-d.length>l){var m=e.substring(l,v-d.length);c.type==h?c.value+=m:(c.type&&f.push(c),c={type:h,value:m})}for(var g=0;g<a.length-2;g++){if(a[g+1]===undefined)continue;p=s[o[g]],p.onMatch?h=p.onMatch(d,i,n):h=p.token,p.next&&(typeof p.next=="string"?i=p.next:i=p.next(i,n),s=this.states[i],s||(window.console&&console.error&&console.error(i,"doesn't exist"),i="start",s=this.states[i]),o=this.matchMappings[i],l=v,u=this.regExps[i],u.lastIndex=v);break}if(d)if(typeof h=="string")!!p&&p.merge===!1||c.type!==h?(c.type&&f.push(c),c={type:h,value:d}):c.value+=d;else if(h){c.type&&f.push(c),c={type:null,value:""};for(var g=0;g<h.length;g++)f.push(h[g])}if(l==e.length)break;l=v;if(f.length>r){c.value+=e.substr(l),i="start";break}}return c.type&&f.push(c),{tokens:f,state:n.length?n:i}}}).call(i.prototype),t.Tokenizer=i});