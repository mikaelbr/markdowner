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
 *      Satoshi Murakami <murky.satyr AT gmail DOT com>
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

define(["require","exports","module","../tokenizer","./coffee_highlight_rules","./matching_brace_outdent","./folding/coffee","../range","./text","../worker/worker_client","../lib/oop"],function(e,t,n){function c(){this.$tokenizer=new r((new i).getRules()),this.$outdent=new s,this.foldingRules=new o}var r=e("../tokenizer").Tokenizer,i=e("./coffee_highlight_rules").CoffeeHighlightRules,s=e("./matching_brace_outdent").MatchingBraceOutdent,o=e("./folding/coffee").FoldMode,u=e("../range").Range,a=e("./text").Mode,f=e("../worker/worker_client").WorkerClient,l=e("../lib/oop");l.inherits(c,a),function(){var e=/(?:[({[=:]|[-=]>|\b(?:else|switch|try|catch(?:\s*[$A-Za-z_\x7f-\uffff][$\w\x7f-\uffff]*)?|finally))\s*$/,t=/^(\s*)#/,n=/^\s*###(?!#)/,r=/^\s*/;this.getNextLineIndent=function(t,n,r){var i=this.$getIndent(n),s=this.$tokenizer.getLineTokens(n,t).tokens;return(!s.length||s[s.length-1].type!=="comment")&&t==="start"&&e.test(n)&&(i+=r),i},this.toggleCommentLines=function(e,i,s,o){console.log("toggle");var a=new u(0,0,0,0);for(var f=s;f<=o;++f){var l=i.getLine(f);if(n.test(l))continue;t.test(l)?l=l.replace(t,"$1"):l=l.replace(r,"$&#"),a.end.row=a.start.row=f,a.end.column=l.length+1,i.replace(a,l)}},this.checkOutdent=function(e,t,n){return this.$outdent.checkOutdent(t,n)},this.autoOutdent=function(e,t,n){this.$outdent.autoOutdent(t,n)},this.createWorker=function(e){var t=new f(["ace"],"ace/mode/coffee_worker","Worker");return t.attachToDocument(e.getDocument()),t.on("error",function(t){e.setAnnotations([t.data])}),t.on("ok",function(t){e.clearAnnotations()}),t}}.call(c.prototype),t.Mode=c});