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
 *      Satoshi Murakami <murky.satyr AT gmail DOT com>
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

define(["require","exports","module","../lib/lang","../lib/oop","./text_highlight_rules"],function(e,t,n){function o(){var e="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*",t={token:"string",merge:!0,regex:".+"},n=r.arrayToMap("this|throw|then|try|typeof|super|switch|return|break|by)|continue|catch|class|in|instanceof|is|isnt|if|else|extends|for|forown|finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|or|on|unless|until|and|yes".split("|")),i=r.arrayToMap("true|false|null|undefined".split("|")),s=r.arrayToMap("case|const|default|function|var|void|with|enum|export|implements|interface|let|package|private|protected|public|static|yield|__hasProp|extends|slice|bind|indexOf".split("|")),o=r.arrayToMap("Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|RangeError|String|SyntaxError|Error|EvalError|TypeError|URIError".split("|")),u=r.arrayToMap("Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent|RangeError|String|SyntaxError|Error|EvalError|TypeError|URIError".split("|"));this.$rules={start:[{token:"identifier",regex:"(?:(?:\\.|::)\\s*)"+e},{token:"variable",regex:"@(?:"+e+")?"},{token:function(e){return n.hasOwnProperty(e)?"keyword":i.hasOwnProperty(e)?"constant.language":s.hasOwnProperty(e)?"invalid.illegal":o.hasOwnProperty(e)?"language.support.class":u.hasOwnProperty(e)?"language.support.function":"identifier"},regex:e},{token:"constant.numeric",regex:"(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},{token:"string",merge:!0,regex:"'''",next:"qdoc"},{token:"string",merge:!0,regex:'"""',next:"qqdoc"},{token:"string",merge:!0,regex:"'",next:"qstring"},{token:"string",merge:!0,regex:'"',next:"qqstring"},{token:"string",merge:!0,regex:"`",next:"js"},{token:"string.regex",merge:!0,regex:"///",next:"heregex"},{token:"string.regex",regex:"/(?!\\s)[^[/\\n\\\\]*(?: (?:\\\\.|\\[[^\\]\\n\\\\]*(?:\\\\.[^\\]\\n\\\\]*)*\\])[^[/\\n\\\\]*)*/[imgy]{0,4}(?!\\w)"},{token:"comment",merge:!0,regex:"###(?!#)",next:"comment"},{token:"comment",regex:"#.*"},{token:"punctuation.operator",regex:"\\?|\\:|\\,|\\."},{token:"keyword.operator",regex:"(?:[\\-=]>|[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"},{token:"paren.lparen",regex:"[({[]"},{token:"paren.rparen",regex:"[\\]})]"},{token:"text",regex:"\\s+"}],qdoc:[{token:"string",regex:".*?'''",next:"start"},t],qqdoc:[{token:"string",regex:'.*?"""',next:"start"},t],qstring:[{token:"string",regex:"[^\\\\']*(?:\\\\.[^\\\\']*)*'",merge:!0,next:"start"},t],qqstring:[{token:"string",regex:'[^\\\\"]*(?:\\\\.[^\\\\"]*)*"',merge:!0,next:"start"},t],js:[{token:"string",merge:!0,regex:"[^\\\\`]*(?:\\\\.[^\\\\`]*)*`",next:"start"},t],heregex:[{token:"string.regex",regex:".*?///[imgy]{0,4}",next:"start"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",merge:!0,regex:"\\S+"}],comment:[{token:"comment",regex:".*?###",next:"start"},{token:"comment",merge:!0,regex:".+"}]}}var r=e("../lib/lang"),i=e("../lib/oop"),s=e("./text_highlight_rules").TextHighlightRules;i.inherits(o,s),t.CoffeeHighlightRules=o});