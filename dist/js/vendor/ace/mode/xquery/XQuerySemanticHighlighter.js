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
 *      William Candillon <wcandillon AT gmail DOT com>
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
 * the terms of any one of the MPL, the GPL or the LGPL. *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","./Position"],function(e,t,n){var r=e("./Position").Position,s=t.XQuerySemanticHighlighter=function(){this.tokenizer=null,this.plain=null,this.source=[],this.lines=[],this.getTokens=function(){var e=new Array(this.source.length),t=new Array(this.source.length),n="start";for(i in this.source){var r=[],s=[];this.lines[i]&&(s=this.lines[i].sort(function(e,t){return e.position.getOffset()-t.position.getOffset()}));var o=this.source[i],u="",a=0;for(j in s){var f=s[j],l=f.position;if(l.getOffset()>a){var c=o.substring(a,l.getOffset());u+=c,r.push({type:"text",value:c})}a=l.getOffset()+l.getLength(),c=o.substring(l.getOffset(),a),u+=c,r.push({type:f.type,value:c})}var h="start";r.length>0&&r[r.length-1].type,h=h!="comment"&&h!="string"&&h!="cdata"&&h!="tag"?"start":h,a<o.length&&(c=o.substring(a),r.push({type:"text",value:c}),u+=c),o==u?(e[i]=r,t[i]=h):(e[i]=[{type:"text",value:o}],t[i]=h);if(e[i].length===1&&e[i][0].type==="text"&&this.tokenizer instanceof Object){var p=t[i-1]?t[i-1]:"start",d=this.tokenizer.getLineTokens(e[i][0].value,p);e[i]=d.tokens,t[i]=d.state}}return{states:t,lines:e}},this.addToken=function(e,t,n){var i=this.plain.substring(0,e),s=this.plain.substring(0,e).split("\n").length;s=s==0?0:s-1;var o=i.lastIndexOf("\n");o=o==-1?e:e-i.lastIndexOf("\n")-1;var u=e,a=this.plain.substring(e,t),f=s;for(var l in a){var c=a[l];if(c=="\n"){var h=l;h=h<t?h:t,this.addPosition(new r(f,o,h),n),f++,o=0,u=l}}this.addPosition(new r(f,o,t-u+1),n)},this.addPosition=function(e,t){var n=e.getLine();this.lines[n]||(this.lines[n]=[]),this.lines[n].push({type:t,position:e})},this.setSource=function(e){this.plain=e.data,this.source=this.plain.split("\n")}}});