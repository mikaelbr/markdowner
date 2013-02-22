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
 * Garen J. Torikian <gjtorikian AT gmail DOT com>
 * 
 *
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","../lib/oop","./javascript_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./javascript_highlight_rules").JavaScriptHighlightRules,s=function(){var e=[{token:["keyword.operator.ts","text","variable.parameter.function.ts","text"],regex:"\\b(module)(\\s*)([a-zA-Z0-9_?.$][\\w?.$]*)(\\s*\\{)"},{token:["storage.type.variable.ts","text","keyword.other.ts","text"],regex:"(super)(\\s*\\()([a-zA-Z0-9,_?.$\\s]+\\s*)(\\))"},{token:["entity.name.function.ts","paren.lparen","paren.rparen"],regex:"([a-zA-Z_?.$][\\w?.$]*)(\\()(\\))"},{token:["variable.parameter.function.ts","text","variable.parameter.function.ts"],regex:"([a-zA-Z0-9_?.$][\\w?.$]*)(\\s*:\\s*)([a-zA-Z0-9_?.$][\\w?.$]*)"},{token:["keyword.operator.ts"],regex:"(?:\\b(constructor|declare|interface|as|AS|public|private|class|extends|export|super)\\b)"},{token:["storage.type.variable.ts"],regex:"(?:\\b(this\\.|string\\b|bool\\b|number)\\b)"},{token:["keyword.operator.ts","storage.type.variable.ts","keyword.operator.ts","storage.type.variable.ts"],regex:"(class)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*\\s+)(extends)(\\s+[a-zA-Z0-9_?.$][\\w?.$]*\\s+)?"},{token:"keyword",regex:"(?:super|export|class|extends|import)\\b"}],t=(new i).getRules();t.start=e.concat(t.start),this.$rules=t};r.inherits(s,i),t.TypeScriptHighlightRules=s});