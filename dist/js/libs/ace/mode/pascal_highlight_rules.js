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
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","../lib/oop","./text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{caseInsensitive:!0,token:"keyword.control.pascal",regex:"\\b(?:(absolute|abstract|all|and|and_then|array|as|asm|attribute|begin|bindable|case|class|const|constructor|destructor|div|do|do|else|end|except|export|exports|external|far|file|finalization|finally|for|forward|goto|if|implementation|import|in|inherited|initialization|interface|interrupt|is|label|library|mod|module|name|near|nil|not|object|of|only|operator|or|or_else|otherwise|packed|pow|private|program|property|protected|public|published|qualified|record|repeat|resident|restricted|segment|set|shl|shr|then|to|try|type|unit|until|uses|value|var|view|virtual|while|with|xor))\\b"},{caseInsensitive:!0,token:["variable.pascal","text","storage.type.prototype.pascal","entity.name.function.prototype.pascal"],regex:"\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?(?=(?:\\(.*?\\))?;\\s*(?:attribute|forward|external))"},{caseInsensitive:!0,token:["variable.pascal","text","storage.type.function.pascal","entity.name.function.pascal"],regex:"\\b(function|procedure)(\\s+)(\\w+)(\\.\\w+)?"},{token:"constant.numeric.pascal",regex:"\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)(L|l|UL|ul|u|U|F|f|ll|LL|ull|ULL)?\\b"},{token:"punctuation.definition.comment.pascal",regex:"--",push:[{token:"comment.line.double-dash.pascal.one",regex:"$",next:"pop"},{defaultToken:"comment.line.double-dash.pascal.one"}]},{token:"punctuation.definition.comment.pascal",regex:"//",push:[{token:"comment.line.double-slash.pascal.two",regex:"$",next:"pop"},{defaultToken:"comment.line.double-slash.pascal.two"}]},{token:"punctuation.definition.comment.pascal",regex:"\\(\\*",push:[{token:"punctuation.definition.comment.pascal",regex:"\\*\\)",next:"pop"},{defaultToken:"comment.block.pascal.one"}]},{token:"punctuation.definition.comment.pascal",regex:"\\{",push:[{token:"punctuation.definition.comment.pascal",regex:"\\}",next:"pop"},{defaultToken:"comment.block.pascal.two"}]},{token:"punctuation.definition.string.begin.pascal",regex:'"',push:[{token:"constant.character.escape.pascal",regex:"\\\\."},{token:"punctuation.definition.string.end.pascal",regex:'"',next:"pop"},{defaultToken:"string.quoted.double.pascal"}]},{token:"punctuation.definition.string.begin.pascal",regex:"'",push:[{token:"constant.character.escape.apostrophe.pascal",regex:"''"},{token:"punctuation.definition.string.end.pascal",regex:"'",next:"pop"},{defaultToken:"string.quoted.single.pascal"}]},{token:"keyword.operator",regex:"[+\\-;,/*%]|:=|="}]},this.normalizeRules()};r.inherits(s,i),t.PascalHighlightRules=s});