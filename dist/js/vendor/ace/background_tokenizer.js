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

define(["require","exports","module","./lib/oop","./lib/event_emitter"],function(e,t,n){var r=e("./lib/oop"),i=e("./lib/event_emitter").EventEmitter,s=5e3,o=function(e,t){this.running=!1,this.lines=[],this.states=[],this.currentLine=0,this.tokenizer=e;var n=this;this.$worker=function(){if(!n.running)return;var e=new Date,t=n.currentLine,r=n.doc,i=0,s=r.getLength();while(n.currentLine<s){n.$tokenizeRow(n.currentLine);while(n.lines[n.currentLine])n.currentLine++;i++;if(i%5==0&&new Date-e>20){n.fireUpdateEvent(t,n.currentLine-1),n.running=setTimeout(n.$worker,20);return}}n.running=!1,n.fireUpdateEvent(t,s-1)}};(function(){r.implement(this,i),this.setTokenizer=function(e){this.tokenizer=e,this.lines=[],this.states=[],this.start(0)},this.setDocument=function(e){this.doc=e,this.lines=[],this.states=[],this.stop()},this.fireUpdateEvent=function(e,t){var n={first:e,last:t};this._emit("update",{data:n})},this.start=function(e){this.currentLine=Math.min(e||0,this.currentLine,this.doc.getLength()),this.lines.splice(this.currentLine,this.lines.length),this.states.splice(this.currentLine,this.states.length),this.stop(),this.running=setTimeout(this.$worker,700)},this.$updateOnChange=function(e){var t=e.range,n=t.start.row,r=t.end.row-n;if(r===0)this.lines[n]=null;else if(e.action=="removeText"||e.action=="removeLines")this.lines.splice(n,r+1,null),this.states.splice(n,r+1,null);else{var i=Array(r+1);i.unshift(n,1),this.lines.splice.apply(this.lines,i),this.states.splice.apply(this.states,i)}this.currentLine=Math.min(n,this.currentLine,this.doc.getLength()),this.stop(),this.running=setTimeout(this.$worker,700)},this.stop=function(){this.running&&clearTimeout(this.running),this.running=!1},this.getTokens=function(e){return this.lines[e]||this.$tokenizeRow(e)},this.getState=function(e){return this.currentLine==e&&this.$tokenizeRow(e),this.states[e]||"start"},this.$tokenizeRow=function(e){var t=this.doc.getLine(e),n=this.states[e-1];if(t.length>s){var r={value:t.substr(s),type:"text"};t=t.slice(0,s)}var i=this.tokenizer.getLineTokens(t,n);return r&&(i.tokens.push(r),i.state="start"),this.states[e]!==i.state?(this.states[e]=i.state,this.lines[e+1]=null,this.currentLine>e+1&&(this.currentLine=e+1)):this.currentLine==e&&(this.currentLine=e+1),this.lines[e]=i.tokens}}).call(o.prototype),t.BackgroundTokenizer=o});