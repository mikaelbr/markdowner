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
 *      Wolfgang Meier
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
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","../worker/worker_client","../lib/oop","./text","../tokenizer","./xquery_highlight_rules","./behaviour/xquery","../range"],function(e,t,n){var r=e("../worker/worker_client").WorkerClient,i=e("../lib/oop"),s=e("./text").Mode,o=e("../tokenizer").Tokenizer,u=e("./xquery_highlight_rules").XQueryHighlightRules,a=e("./behaviour/xquery").XQueryBehaviour,f=e("../range").Range,l=function(e){this.$tokenizer=new o((new u).getRules()),this.$behaviour=new a(e)};i.inherits(l,s),function(){this.getNextLineIndent=function(e,t,n){var r=this.$getIndent(t),i=t.match(/\s*(?:then|else|return|[{\(]|<\w+>)\s*$/);return i&&(r+=n),r},this.checkOutdent=function(e,t,n){return/^\s+$/.test(t)?/^\s*[\}\)]/.test(n):!1},this.autoOutdent=function(e,t,n){var r=t.getLine(n),i=r.match(/^(\s*[\}\)])/);if(!i)return 0;var s=i[1].length,o=t.findMatchingBracket({row:n,column:s});if(!o||o.row==n)return 0;var u=this.$getIndent(t.getLine(o.row));t.replace(new f(n,0,n,s-1),u)},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""},this.toggleCommentLines=function(e,t,n,r){var i,s,o=!0,u=/^\s*\(:(.*):\)/;for(i=n;i<=r;i++)if(!u.test(t.getLine(i))){o=!1;break}var a=new f(0,0,0,0);for(i=n;i<=r;i++)s=t.getLine(i),a.start.row=i,a.end.row=i,a.end.column=s.length,t.replace(a,o?s.match(u)[1]:"(:"+s+":)")},this.createWorker=function(e){this.$deltas=[];var t=new r(["ace"],"ace/mode/xquery_worker","XQueryWorker"),n=this;return e.getDocument().on("change",function(e){n.$deltas.push(e.data)}),t.attachToDocument(e.getDocument()),t.on("start",function(e){n.$deltas=[]}),t.on("error",function(t){e.setAnnotations([t.data])}),t.on("ok",function(t){e.clearAnnotations()}),t.on("highlight",function(t){var r=0,i=e.getLength()-1,s=t.data.lines,o=t.data.states;for(var u=0;u<n.$deltas.length;u++){var a=n.$deltas[u];if(a.action==="insertLines"){var f=a.lines.length;for(var u=0;u<f;u++)s.splice(a.range.start.row+u,0,undefined),o.splice(a.range.start.row+u,0,undefined)}else if(a.action==="insertText")e.getDocument().isNewLine(a.text)?(s.splice(a.range.end.row,0,undefined),o.splice(a.range.end.row,0,undefined)):(s[a.range.start.row]=undefined,o[a.range.start.row]=undefined);else if(a.action==="removeLines"){var l=a.lines.length;s.splice(a.range.start.row,l),o.splice(a.range.start.row,l)}else a.action==="removeText"&&(e.getDocument().isNewLine(a.text)?(s[a.range.start.row]=undefined,s.splice(a.range.end.row,1),o[a.range.start.row]=undefined,o.splice(a.range.end.row,1)):(s[a.range.start.row]=undefined,o[a.range.start.row]=undefined))}e.bgTokenizer.lines=s,e.bgTokenizer.states=o,e.bgTokenizer.fireUpdateEvent(r,i)}),t}}.call(l.prototype),t.Mode=l});