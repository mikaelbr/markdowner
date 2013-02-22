/*
 * rhtml_highlight_rules.js
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

define(["require","exports","module","../lib/oop","./r_highlight_rules","./html_highlight_rules","./text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./r_highlight_rules").RHighlightRules,s=e("./html_highlight_rules").HtmlHighlightRules,o=e("./text_highlight_rules").TextHighlightRules,u=function(){this.$rules=(new s).getRules(),this.$rules.start.unshift({token:"support.function.codebegin",regex:"^<!--\\s*begin.rcode\\s*(?:.*)",next:"r-start"});var e=(new i).getRules();this.addRules(e,"r-"),this.$rules["r-start"].unshift({token:"support.function.codeend",regex:"^\\s*end.rcode\\s*-->",next:"start"})};r.inherits(u,o),t.RHtmlHighlightRules=u});