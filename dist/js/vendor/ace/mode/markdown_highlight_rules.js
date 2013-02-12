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

define(["require","exports","module","../lib/oop","./text_highlight_rules","./javascript_highlight_rules","./xml_highlight_rules","./html_highlight_rules","./css_highlight_rules"],function(e,t,n){function f(e,t){return{token:"support.function",regex:"^```"+e+"\\s*$",next:t+"start"}}var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=e("./javascript_highlight_rules").JavaScriptHighlightRules,o=e("./xml_highlight_rules").XmlHighlightRules,u=e("./html_highlight_rules").HtmlHighlightRules,a=e("./css_highlight_rules").CssHighlightRules,l=function(){this.$rules={start:[{token:"empty_line",regex:"^$"},{token:["support.function","support.function","support.function"],regex:"(`+)([^\\r]*?[^`])(\\1)"},{token:"support.function",regex:"^[ ]{4}.+"},{token:"markup.heading.1",regex:"^=+(?=\\s*$)"},{token:"markup.heading.1",regex:"^\\-+(?=\\s*$)"},{token:function(e){return"markup.heading."+e.length},regex:"^#{1,6}"},f("(?:javascript|js)","js-"),f("xml","xml-"),f("html","html-"),f("css","css-"),{token:"support.function",regex:"^```[a-zA-Z]+\\s*$",next:"githubblock"},{token:"string",regex:"^>[ ].+$",next:"blockquote"},{token:["text","constant","text","url","string","text"],regex:'^([ ]{0,3}\\[)([^\\]]+)(\\]:\\s*)([^ ]+)(\\s*(?:["][^"]+["])?(\\s*))$'},{token:["text","string","text","constant","text"],regex:"(\\[)((?:[[^\\]]*\\]|[^\\[\\]])*)(\\][ ]?(?:\\n[ ]*)?\\[)(.*?)(\\])"},{token:["text","string","text","markup.underline","string","text"],regex:'(\\[)(\\[[^\\]]*\\]|[^\\[\\]]*)(\\]\\([ \\t]*)(<?(?:(?:[^\\(]*?\\([^\\)]*?\\)\\S*?)|(?:.*?))>?)((?:[ 	]*"(?:.*?)"[ \\t]*)?)(\\))'},{token:"constant",regex:"^[ ]{0,2}(?:[ ]?\\*[ ]?){3,}\\s*$"},{token:"constant",regex:"^[ ]{0,2}(?:[ ]?\\-[ ]?){3,}\\s*$"},{token:"constant",regex:"^[ ]{0,2}(?:[ ]?\\_[ ]?){3,}\\s*$"},{token:"markup.list",regex:"^\\s{0,3}(?:[*+-]|\\d+\\.)\\s+",next:"listblock"},{token:["string","string","string"],regex:"([*]{2}|[_]{2}(?=\\S))([^\\r]*?\\S[*_]*)(\\1)"},{token:["string","string","string"],regex:"([*]|[_](?=\\S))([^\\r]*?\\S[*_]*)(\\1)"},{token:["text","url","text"],regex:"(<)((?:https?|ftp|dict):[^'\">\\s]+|(?:mailto:)?[-.\\w]+\\@[-a-z0-9]+(?:\\.[-a-z0-9]+)*\\.[a-z]+)(>)"},{token:"text",regex:"[^\\*_%$`\\[#<>]+"}],listblock:[{token:"empty_line",regex:"^$",next:"start"},{token:"markup.list",regex:".+"}],blockquote:[{token:"empty_line",regex:"^\\s*$",next:"start"},{token:"string",regex:".+"}],githubblock:[{token:"support.function",regex:"^```",next:"start"},{token:"support.function",regex:".+"}]},this.embedRules(s,"js-",[{token:"support.function",regex:"^```",next:"start"}]),this.embedRules(u,"html-",[{token:"support.function",regex:"^```",next:"start"}]),this.embedRules(a,"css-",[{token:"support.function",regex:"^```",next:"start"}]),this.embedRules(o,"xml-",[{token:"support.function",regex:"^```",next:"start"}])};r.inherits(l,i),t.MarkdownHighlightRules=l});