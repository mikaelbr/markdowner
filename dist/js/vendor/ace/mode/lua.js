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
*      Colin Gourlay <colin DOT j DOT gourlay AT gmail DOT com>
*      Lee Gao
*      Tim Starling
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

define(["require","exports","module","../lib/oop","./text","../tokenizer","./lua_highlight_rules","../range"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./lua_highlight_rules").LuaHighlightRules,u=e("../range").Range,a=function(){this.$tokenizer=new s((new o).getRules())};r.inherits(a,i),function(){function n(t){var n=0;for(var r in t){var i=t[r];i.type=="keyword"?i.value in e&&(n+=e[i.value]):i.type=="paren.lparen"?n++:i.type=="paren.rparen"&&n--}return n<0?-1:n>0?1:0}var e={"function":1,then:1,"do":1,"else":1,elseif:1,repeat:1,end:-1,until:-1},t=["else","elseif","end","until"];this.getNextLineIndent=function(e,t,r){var i=this.$getIndent(t),s=0,o=this.$tokenizer.getLineTokens(t,e),u=o.tokens;return e=="start"&&(s=n(u)),s>0?i+r:s<0&&i.substr(i.length-r.length)==r&&!this.checkOutdent(e,t,"\n")?i.substr(0,i.length-r.length):i},this.checkOutdent=function(e,n,r){if(r!="\n"&&r!="\r"&&r!="\r\n")return!1;if(n.match(/^\s*[\)\}\]]$/))return!0;var i=this.$tokenizer.getLineTokens(n.trim(),e).tokens;return!i||!i.length?!1:i[0].type=="keyword"&&t.indexOf(i[0].value)!=-1},this.autoOutdent=function(e,t,r){var i=t.getLine(r-1),s=this.$getIndent(i).length,o=this.$tokenizer.getLineTokens(i,"start").tokens,a=t.getTabString().length,f=s+a*n(o),l=this.$getIndent(t.getLine(r)).length;if(l<f)return;t.outdentRows(new u(r,0,r+2,0))}}.call(a.prototype),t.Mode=a});