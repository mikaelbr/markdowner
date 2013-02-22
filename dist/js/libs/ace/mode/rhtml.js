/*
 * rhtml.js
 *
 * Copyright (C) 2009-11 by RStudio, Inc.
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * This program is licensed to you under the terms of version 3 of the
 * GNU Affero General Public License. This program is distributed WITHOUT
 * ANY EXPRESS OR IMPLIED WARRANTY, INCLUDING THOSE OF NON-INFRINGEMENT,
 * MERCHANTABILITY OR FITNESS FOR A PARTICULAR PURPOSE. Please refer to the
 * AGPL (http://www.gnu.org/licenses/agpl-3.0.txt) for more details.
 *
 */

define(["require","exports","module","../lib/oop","./html","../tokenizer","./rhtml_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./html").Mode,s=e("../tokenizer").Tokenizer,o=e("./rhtml_highlight_rules").RHtmlHighlightRules,u=function(e,t){this.$session=t,this.$tokenizer=new s((new o).getRules())};r.inherits(u,i),function(){this.insertChunkInfo={value:"<!--begin.rcode\n\nend.rcode-->\n",position:{row:0,column:15}},this.getLanguageMode=function(e){return this.$session.getState(e.row).match(/^r-/)?"R":"HTML"},this.getNextLineIndent=function(e,t,n,r,i){return this.codeModel.getNextLineIndent(i,t,e,n,r)}}.call(u.prototype),t.Mode=u});