/*
 * tex.js
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

define(["require","exports","module","../lib/oop","./text","../tokenizer","./text_highlight_rules","./tex_highlight_rules","./matching_brace_outdent"],function(e,t,n){var r=e("../lib/oop"),i=e("./text").Mode,s=e("../tokenizer").Tokenizer,o=e("./text_highlight_rules").TextHighlightRules,u=e("./tex_highlight_rules").TexHighlightRules,a=e("./matching_brace_outdent").MatchingBraceOutdent,f=function(e){e?this.$tokenizer=new s((new o).getRules()):this.$tokenizer=new s((new u).getRules()),this.$outdent=new a};r.inherits(f,i),function(){this.getNextLineIndent=function(e,t,n){return this.$getIndent(t)},this.allowAutoInsert=function(){return!1}}.call(f.prototype),t.Mode=f});