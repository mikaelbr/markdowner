/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2012, Ajax.org B.V.
 * All rights reserved.
 * 
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of Ajax.org B.V. nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 * 
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL AJAX.ORG B.V. BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 *
 *
 * Contributor(s):
 * 
 * Garen J. Torikian <gjtorikian @ gmail DOT com>
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","../lib/oop","./text_highlight_rules","./markdown_highlight_rules","./scss_highlight_rules","./less_highlight_rules","./coffee_highlight_rules","./javascript_highlight_rules"],function(e,t,n){function l(e,t){return{token:"entity.name.function.jade",regex:"^\\s*\\:"+e,next:t+"start"}}var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=e("./markdown_highlight_rules").MarkdownHighlightRules,o=e("./scss_highlight_rules").ScssHighlightRules,u=e("./less_highlight_rules").LessHighlightRules,a=e("./coffee_highlight_rules").CoffeeHighlightRules,f=e("./javascript_highlight_rules").JavaScriptHighlightRules,c=function(){var e="\\\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)";this.$rules={start:[{token:"keyword.control.import.include.jade",regex:"\\s*\\binclude\\b"},{token:"keyword.other.doctype.jade",regex:"^!!!\\s*(?:[a-zA-Z0-9-_]+)?"},{token:"punctuation.section.comment",regex:"^\\s*//(?:\\s*[^-\\s]|\\s+\\S)(?:.*$)"},{onMatch:function(e,t,n){return n.unshift(this.next,e.length-2,t),"comment"},regex:/^\s*\/\//,next:"comment_block"},l("markdown","markdown-"),l("sass","sass-"),l("less","less-"),l("coffee","coffee-"),{token:["storage.type.function.jade","entity.name.function.jade","punctuation.definition.parameters.begin.jade","variable.parameter.function.jade","punctuation.definition.parameters.end.jade"],regex:"^(\\s*mixin)( [\\w\\-]+)(\\s*\\()(.*?)(\\))"},{token:["storage.type.function.jade","entity.name.function.jade"],regex:"^(\\s*mixin)( [\\w\\-]+)"},{token:"source.js.embedded.jade",regex:"^\\s*(?:-|=|!=)",next:"js-start"},{token:"string.interpolated.jade",regex:"[#!]\\{[^\\}]+\\}"},{token:"meta.tag.any.jade",regex:/^\s*(?!\w+\:)(?:[\w]+|(?=\.|#)])/,next:"tag_single"},{token:"suport.type.attribute.id.jade",regex:"#\\w+"},{token:"suport.type.attribute.class.jade",regex:"\\.\\w+"},{token:"punctuation",regex:"\\s*(?:\\()",next:"tag_attributes"}],comment_block:[{regex:/^\s*/,onMatch:function(e,t,n){return e.length<=n[1]?(n.shift(),n.shift(),this.next=n.shift(),"text"):(this.next="","comment")},next:"start"},{defaultToken:"comment"}],tag_single:[{token:"entity.other.attribute-name.class.jade",regex:"\\.[\\w-]+"},{token:"entity.other.attribute-name.id.jade",regex:"#[\\w-]+"},{token:["text","punctuation"],regex:"($)|((?!\\.|#|=|-))",next:"start"}],tag_attributes:[{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"},{token:"entity.other.attribute-name.jade",regex:"\\b[a-zA-Z\\-:]+"},{token:["entity.other.attribute-name.jade","punctuation"],regex:"\\b([a-zA-Z:\\.-]+)(=)",next:"attribute_strings"},{token:"punctuation",regex:"\\)",next:"start"}],attribute_strings:[{token:"string",regex:"'(?=.)",next:"qstring"},{token:"string",regex:'"(?=.)',next:"qqstring"}],qqstring:[{token:"constant.language.escape",regex:e},{token:"string",regex:'[^"\\\\]+'},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"tag_attributes"}],qstring:[{token:"constant.language.escape",regex:e},{token:"string",regex:"[^'\\\\]+"},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"tag_attributes"}]},this.embedRules(f,"js-",[{token:"text",regex:".$",next:"start"}])};r.inherits(c,i),t.JadeHighlightRules=c});