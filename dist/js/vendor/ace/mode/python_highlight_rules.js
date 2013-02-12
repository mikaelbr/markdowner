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
 * ***** END LICENSE BLOCK *****
 *
 * TODO: python delimiters
 */

define(["require","exports","module","../lib/oop","../lib/lang","./text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("../lib/lang"),s=e("./text_highlight_rules").TextHighlightRules,o=function(){var e=i.arrayToMap("and|as|assert|break|class|continue|def|del|elif|else|except|exec|finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|raise|return|try|while|with|yield".split("|")),t=i.arrayToMap("True|False|None|NotImplemented|Ellipsis|__debug__".split("|")),n=i.arrayToMap("abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|binfile|iter|property|tuple|bool|filter|len|range|type|bytearray|float|list|raw_input|unichr|callable|format|locals|reduce|unicode|chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|__import__|complex|hash|min|set|apply|delattr|help|next|setattr|buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern".split("|")),r=i.arrayToMap("".split("|")),s="(?:r|u|ur|R|U|UR|Ur|uR)?",o="(?:(?:[1-9]\\d*)|(?:0))",u="(?:0[oO]?[0-7]+)",a="(?:0[xX][\\dA-Fa-f]+)",f="(?:0[bB][01]+)",l="(?:"+o+"|"+u+"|"+a+"|"+f+")",c="(?:[eE][+-]?\\d+)",h="(?:\\.\\d+)",p="(?:\\d+)",d="(?:(?:"+p+"?"+h+")|(?:"+p+"\\.))",v="(?:(?:"+d+"|"+p+")"+c+")",m="(?:"+v+"|"+d+")";this.$rules={start:[{token:"comment",regex:"#.*$"},{token:"string",regex:s+'"{3}(?:[^\\\\]|\\\\.)*?"{3}'},{token:"string",merge:!0,regex:s+'"{3}.*$',next:"qqstring"},{token:"string",regex:s+'"(?:[^\\\\]|\\\\.)*?"'},{token:"string",regex:s+"'{3}(?:[^\\\\]|\\\\.)*?'{3}"},{token:"string",merge:!0,regex:s+"'{3}.*$",next:"qstring"},{token:"string",regex:s+"'(?:[^\\\\]|\\\\.)*?'"},{token:"constant.numeric",regex:"(?:"+m+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:m},{token:"constant.numeric",regex:l+"[lL]\\b"},{token:"constant.numeric",regex:l+"\\b"},{token:function(i){return e.hasOwnProperty(i)?"keyword":t.hasOwnProperty(i)?"constant.language":r.hasOwnProperty(i)?"invalid.illegal":n.hasOwnProperty(i)?"support.function":i=="debugger"?"invalid.deprecated":"identifier"},regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"}],qqstring:[{token:"string",regex:'(?:[^\\\\]|\\\\.)*?"{3}',next:"start"},{token:"string",merge:!0,regex:".+"}],qstring:[{token:"string",regex:"(?:[^\\\\]|\\\\.)*?'{3}",next:"start"},{token:"string",merge:!0,regex:".+"}]}};r.inherits(o,s),t.PythonHighlightRules=o});