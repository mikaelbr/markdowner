/* ***** BEGIN LICENSE BLOCK *****
 * Distributed under the BSD license:
 *
 * Copyright (c) 2010, Ajax.org B.V.
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

define(["require","exports","module","../lib/oop","./text_highlight_rules"],function(e,t,n){function s(){var e="[$A-Za-z_\\x7f-\\uffff][$\\w\\x7f-\\uffff]*",t="this|throw|then|try|typeof|super|switch|return|break|by|continue|catch|class|in|instanceof|is|isnt|if|else|extends|for|forown|finally|function|while|when|new|no|not|delete|debugger|do|loop|of|off|or|on|unless|until|and|yes",n="true|false|null|undefined|NaN|Infinity",r="case|const|default|function|var|void|with|enum|export|implements|interface|let|package|private|protected|public|static|yield|__hasProp|slice|bind|indexOf",i="Array|Boolean|Date|Function|Number|Object|RegExp|ReferenceError|String|Error|EvalError|InternalError|RangeError|ReferenceError|StopIteration|SyntaxError|TypeError|URIError|ArrayBuffer|Float32Array|Float64Array|Int16Array|Int32Array|Int8Array|Uint16Array|Uint32Array|Uint8Array|Uint8ClampedArray",s="Math|JSON|isNaN|isFinite|parseInt|parseFloat|encodeURI|encodeURIComponent|decodeURI|decodeURIComponent|String|",o="window|arguments|prototype|document",u=this.createKeywordMapper({keyword:t,"constant.language":n,"invalid.illegal":r,"language.support.class":i,"language.support.function":s,"variable.language":o},"identifier"),a={token:["paren.lparen","variable.parameter","paren.rparen","text","storage.type"],regex:/(?:(\()((?:"[^")]*?"|'[^')]*?'|\/[^\/)]*?\/|[^()\"'\/])*?)(\))(\s*))?([\-=]>)/.source},f=/\\(?:x[0-9a-fA-F]{2}|u[0-9a-fA-F]{4}|[0-2][0-7]{0,2}|3[0-6][0-7]?|37[0-7]?|[4-7][0-7]?|.)/;this.$rules={start:[{token:"constant.numeric",regex:"(?:0x[\\da-fA-F]+|(?:\\d+(?:\\.\\d+)?|\\.\\d+)(?:[eE][+-]?\\d+)?)"},{stateName:"qdoc",token:"string",regex:"'''",next:[{token:"string",regex:"'''",next:"start"},{token:"constant.language.escape",regex:f},{defaultToken:"string"}]},{stateName:"qqdoc",token:"string",regex:'"""',next:[{token:"string",regex:'"""',next:"start"},{token:"constant.language.escape",regex:f},{defaultToken:"string"}]},{stateName:"qstring",token:"string",regex:"'",next:[{token:"string",regex:"'",next:"start"},{token:"constant.language.escape",regex:f},{defaultToken:"string"}]},{stateName:"qqstring",token:"string.start",regex:'"',next:[{token:"string.end",regex:'"',next:"start"},{token:"constant.language.escape",regex:f},{defaultToken:"string"}]},{stateName:"js",token:"string",regex:"`",next:[{token:"string",regex:"`",next:"start"},{token:"constant.language.escape",regex:f},{defaultToken:"string"}]},{token:"string.regex",regex:"///",next:"heregex"},{token:"string.regex",regex:/(?:\/(?![\s=])[^[\/\n\\]*(?:(?:\\[\s\S]|\[[^\]\n\\]*(?:\\[\s\S][^\]\n\\]*)*])[^[\/\n\\]*)*\/)(?:[imgy]{0,4})(?!\w)/},{token:"comment",regex:"###(?!#)",next:"comment"},{token:"comment",regex:"#.*"},{token:["punctuation.operator","text","identifier"],regex:"(\\.)(\\s*)("+r+")"},{token:"punctuation.operator",regex:"\\."},{token:["keyword","text","language.support.class","text","keyword","text","language.support.class"],regex:"(class)(\\s+)("+e+")(?:(\\s+)(extends)(\\s+)("+e+"))?"},{token:["entity.name.function","text","keyword.operator","text"].concat(a.token),regex:"("+e+")(\\s*)([=:])(\\s*)"+a.regex},a,{token:"variable",regex:"@(?:"+e+")?"},{token:u,regex:e},{token:"punctuation.operator",regex:"\\,|\\."},{token:"storage.type",regex:"[\\-=]>"},{token:"keyword.operator",regex:"(?:[-+*/%<>&|^!?=]=|>>>=?|\\-\\-|\\+\\+|::|&&=|\\|\\|=|<<=|>>=|\\?\\.|\\.{2,3}|[!*+-=><])"},{token:"paren.lparen",regex:"[({[]"},{token:"paren.rparen",regex:"[\\]})]"},{token:"text",regex:"\\s+"}],heregex:[{token:"string.regex",regex:".*?///[imgy]{0,4}",next:"start"},{token:"comment.regex",regex:"\\s+(?:#.*)?"},{token:"string.regex",regex:"\\S+"}],comment:[{token:"comment",regex:"###",next:"start"},{defaultToken:"comment"}]},this.normalizeRules()}var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules;r.inherits(s,i),t.CoffeeHighlightRules=s});