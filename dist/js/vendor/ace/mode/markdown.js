/* vim:ts=4:sts=4:sw=4:
 * ***** BEGIN LICENSE BLOCK *****
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
 *      Mihai Sucan <mihai DOT sucan AT gmail DOT com>
 *      Chris Spencer <chris.ag.spencer AT googlemail DOT com>
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

define(["require","exports","module","../lib/oop","./text","./javascript","./xml","./html","../tokenizer","./markdown_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("./javascript").Mode,o=e("./xml").Mode,u=e("./html").Mode,a=e("../tokenizer").Tokenizer,f=e("./markdown_highlight_rules").MarkdownHighlightRules,l=function(){var e=new f;this.$tokenizer=new a(e.getRules()),this.$embeds=e.getEmbeds(),this.createModeDelegates({"js-":s,"xml-":o,"html-":u})};r.inherits(l,i),function(){this.getNextLineIndent=function(e,t,n){if(e=="listblock"){var r=/^((?:.+)?)([-+*][ ]+)/.exec(t);return r?(new Array(r[1].length+1)).join(" ")+r[2]:""}return this.$getIndent(t)}}.call(l.prototype),t.Mode=l});