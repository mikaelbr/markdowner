/*
 * r.js
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

define(["require","exports","module","../range","../lib/oop","./text","../tokenizer","./text_highlight_rules","./r_highlight_rules","./matching_brace_outdent","../unicode"],function(e,t,n){var r=e("../range").Range,i=e("../lib/oop"),s=e("./text").Mode,o=e("../tokenizer").Tokenizer,u=e("./text_highlight_rules").TextHighlightRules,a=e("./r_highlight_rules").RHighlightRules,f=e("./matching_brace_outdent").MatchingBraceOutdent,l=e("../unicode"),c=function(){this.$tokenizer=new o((new a).getRules()),this.$outdent=new f};i.inherits(c,s),function(){this.tokenRe=new RegExp("^["+l.packages.L+l.packages.Mn+l.packages.Mc+l.packages.Nd+l.packages.Pc+"._]+","g"),this.nonTokenRe=new RegExp("^(?:[^"+l.packages.L+l.packages.Mn+l.packages.Mc+l.packages.Nd+l.packages.Pc+"._]|s])+","g"),this.$complements={"(":")","[":"]",'"':'"',"'":"'","{":"}"},this.$reOpen=/^[(["'{]$/,this.$reClose=/^[)\]"'}]$/,this.getNextLineIndent=function(e,t,n,r,i){return this.codeModel.getNextLineIndent(i,t,e,n,r)},this.allowAutoInsert=this.smartAllowAutoInsert,this.checkOutdent=function(e,t,n){return/^\s+$/.test(t)?/^\s*[\{\}\)]/.test(n):!1},this.getIndentForOpenBrace=function(e){return this.codeModel.getIndentForOpenBrace(e)},this.autoOutdent=function(e,t,n){if(n==0)return 0;var i=t.getLine(n),s=i.match(/^(\s*[\}\)])/);if(s){var o=s[1].length,u=t.findMatchingBracket({row:n,column:o});if(!u||u.row==n)return 0;var a=this.codeModel.getIndentForOpenBrace(u);t.replace(new r(n,0,n,o-1),a)}s=i.match(/^(\s*\{)/);if(s){var o=s[1].length,a=this.codeModel.getBraceIndent(n-1);t.replace(new r(n,0,n,o-1),a)}},this.$getIndent=function(e){var t=e.match(/^(\s+)/);return t?t[1]:""},this.transformAction=function(e,t,n,r,i){if(t==="insertion"&&i==="\n"){var s=n.getSelectionRange().start,o=/^((\s*#+')\s*)/.exec(r.doc.getLine(s.row));if(o&&n.getSelectionRange().start.column>=o[2].length)return{text:"\n"+o[1]}}return!1}}.call(c.prototype),t.Mode=c});