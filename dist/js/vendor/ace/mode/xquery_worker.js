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
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","../lib/oop","../worker/mirror","../mode/xquery/xquery","../tokenizer","./xquery_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("../worker/mirror").Mirror,s=e("../mode/xquery/xquery"),o=e("../tokenizer").Tokenizer,u=e("./xquery_highlight_rules").XQueryHighlightRules;window.addEventListener=function(){};var a=t.XQueryWorker=function(e){i.call(this,e),this.setTimeout(200)};r.inherits(a,i),function(){this.onUpdate=function(){this.sender.emit("start");var e=this.doc.getValue(),t=s.getParser(e),n=t.p_Module();if(t.hasErrors()){var r=t.getErrors(),i=0;for(i in r){var a=r[i];this.sender.emit("error",{row:a.line,column:a.column,text:a.message,type:"error"})}}else this.sender.emit("ok");t.highlighter.tokenizer=new o((new u).getRules());var f=t.highlighter.getTokens();this.sender.emit("highlight",f)}}.call(a.prototype)});