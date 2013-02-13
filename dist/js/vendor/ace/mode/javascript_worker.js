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

define(["require","exports","module","../lib/oop","../worker/mirror","../worker/jshint","../narcissus/parser"],function(e,t,n){var r=e("../lib/oop"),i=e("../worker/mirror").Mirror,s=e("../worker/jshint").JSHINT,o=e("../narcissus/parser"),u=t.JavaScriptWorker=function(e){i.call(this,e),this.setTimeout(500)};r.inherits(u,i),function(){this.onUpdate=function(){var e=this.doc.getValue();e=e.replace(/^#!.*\n/,"\n");try{o.parse(e)}catch(t){var n=t.message.split(":"),r=n.pop().trim(),i=parseInt(n.pop().trim())-1;this.sender.emit("narcissus",{row:i,column:null,text:r,type:"error"});return}finally{}s(e,{undef:!1,onevar:!1,passfail:!1}),this.sender.emit("jslint",s.errors)}}.call(u.prototype)});