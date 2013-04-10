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

define(["require","exports","module","../tokenizer","./text_highlight_rules","./behaviour","../unicode","../lib/lang"],function(e,t,n){var r=e("../tokenizer").Tokenizer,i=e("./text_highlight_rules").TextHighlightRules,s=e("./behaviour").Behaviour,o=e("../unicode"),u=e("../lib/lang"),a=function(){this.$tokenizer=new r((new i).getRules()),this.$behaviour=new s};(function(){this.tokenRe=new RegExp("^["+o.packages.L+o.packages.Mn+o.packages.Mc+o.packages.Nd+o.packages.Pc+"\\$_]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+o.packages.L+o.packages.Mn+o.packages.Mc+o.packages.Nd+o.packages.Pc+"\\$_]|s])+","g"),this.getTokenizer=function(){return this.$tokenizer},this.toggleCommentLines=function(e,t,n,r){var i=t.doc,s,o;if(!this.lineCommentStart)return!1;Array.isArray(this.lineCommentStart)?(s=this.lineCommentStart.map(u.escapeRegExp).join("|"),o=this.lineCommentStart[0]):(s=u.escapeRegExp(this.lineCommentStart),o=this.lineCommentStart),s=new RegExp("^\\s*(?:"+s+") ?");var a=!0,f=Infinity,l=[];for(var c=n;c<=r;c++){var h=i.getLine(c),p=h.search(/\S|$/);l[c]=p,p<f&&(f=p),a&&!s.test(h)&&(a=!1)}if(a)for(var c=n;c<=r;c++){var h=i.getLine(c),d=h.match(s);i.removeInLine(c,l[c],d[0].length)}else{o+=" ";for(var c=n;c<=r;c++)i.insertInLine({row:c,column:f},o)}},this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)},this.checkOutdent=function(e,t,n){return!1},this.autoOutdent=function(e,t,n){},this.$getIndent=function(e){return e.match(/^\s*/)[0]},this.createWorker=function(e){return null},this.createModeDelegates=function(e){if(!this.$embeds)return;this.$modes={};for(var t=0;t<this.$embeds.length;t++)e[this.$embeds[t]]&&(this.$modes[this.$embeds[t]]=new e[this.$embeds[t]]);var n=["toggleCommentLines","getNextLineIndent","checkOutdent","autoOutdent","transformAction"];for(var t=0;t<n.length;t++)(function(e){var r=n[t],i=e[r];e[n[t]]=function(){return this.$delegator(r,arguments,i)}})(this)},this.$delegator=function(e,t,n){var r=t[0];for(var i=0;i<this.$embeds.length;i++){if(!this.$modes[this.$embeds[i]])continue;var s=r.split(this.$embeds[i]);if(!s[0]&&s[1]){t[0]=s[1];var o=this.$modes[this.$embeds[i]];return o[e].apply(o,t)}}var u=n.apply(this,t);return n?u:undefined},this.transformAction=function(e,t,n,r,i){if(this.$behaviour){var s=this.$behaviour.getBehaviours();for(var o in s)if(s[o][t]){var u=s[o][t].apply(this,arguments);if(u)return u}}}}).call(a.prototype),t.Mode=a});