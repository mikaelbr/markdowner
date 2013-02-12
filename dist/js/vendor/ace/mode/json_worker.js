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

define(["require","exports","module","../lib/oop","../worker/mirror","./json/json_parse"],function(e,t,n){var r=e("../lib/oop"),i=e("../worker/mirror").Mirror,s=e("./json/json_parse"),o=t.JsonWorker=function(e){i.call(this,e),this.setTimeout(200)};r.inherits(o,i),function(){this.onUpdate=function(){var e=this.doc.getValue();try{var t=s(e)}catch(n){var r=this.charToDocumentPosition(n.at-1);this.sender.emit("error",{row:r.row,column:r.column,text:n.message,type:"error"});return}this.sender.emit("ok")},this.charToDocumentPosition=function(e){var t=0,n=this.doc.getLength(),r=this.doc.getNewLineCharacter().length;if(!n)return{row:0,column:0};var i=0;while(t<n){var s=this.doc.getLine(t),o=s.length+r;if(i+o>e)return{row:t,column:e-i};i+=o,t+=1}return{row:t-1,column:s.length}}}.call(o.prototype)});