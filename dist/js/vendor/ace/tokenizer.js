/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module"],function(e,t,n){var r=function(e,t){t=t?"g"+t:"g",this.rules=e,this.regExps={},this.matchMappings={};for(var n in this.rules){var r=this.rules[n],i=r,s=[],o=0,u=this.matchMappings[n]={};for(var a=0;a<i.length;a++){i[a].regex instanceof RegExp&&(i[a].regex=i[a].regex.toString().slice(1,-1));var f=(new RegExp("(?:("+i[a].regex+")|(.))")).exec("a").length-2,l=i[a].regex.replace(/\\([0-9]+)/g,function(e,t){return"\\"+(parseInt(t,10)+o+1)});if(f>1&&i[a].token.length!==f-1)throw new Error("Matching groups and length of the token array don't match in rule #"+a+" of state "+n);u[o]={rule:a,len:f},o+=f,s.push(l)}this.regExps[n]=new RegExp("(?:("+s.join(")|(")+")|(.))",t)}};(function(){this.getLineTokens=function(e,t){var n=t||"start",r=this.rules[n],i=this.matchMappings[n],s=this.regExps[n];s.lastIndex=0;var o,u=[],a=0,f={type:null,value:""};while(o=s.exec(e)){var l="text",c=null,h=[o[0]];for(var p=0;p<o.length-2;p++){if(o[p+1]===undefined)continue;c=r[i[p].rule],i[p].len>1&&(h=o.slice(p+2,p+1+i[p].len)),typeof c.token=="function"?l=c.token.apply(this,h):l=c.token,c.next&&(n=c.next,r=this.rules[n],i=this.matchMappings[n],a=s.lastIndex,s=this.regExps[n],s.lastIndex=a);break}if(h[0]){typeof l=="string"&&(h=[h.join("")],l=[l]);for(var p=0;p<h.length;p++){if(!h[p])continue;(!c||c.merge||l[p]==="text")&&f.type===l[p]?f.value+=h[p]:(f.type&&u.push(f),f={type:l[p],value:h[p]})}}if(a==e.length)break;a=s.lastIndex}return f.type&&u.push(f),{tokens:u,state:n}}}).call(r.prototype),t.Tokenizer=r});