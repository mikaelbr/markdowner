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

define(["require","exports","module","../lib/oop","./text_highlight_rules"],function(e,t,n){var r=e("../lib/oop"),i=e("./text_highlight_rules").TextHighlightRules,s=function(){this.$rules={start:[{token:"comment.block",regex:"/\\*",push:[{token:"comment.block",regex:"\\*/",next:"pop"},{defaultToken:"comment.block"}]},{token:"comment.single",regex:"//.*"},{token:"constant.numeric",regex:"\\d+(?:\\.\\d+)?(?:[eE][+-]?\\d+)?"},{token:"string",regex:'"',push:[{token:"string",regex:'"',next:"pop"},{defaultToken:"string"}]},{token:"constant.language",regex:"\\b(true|false)\\b"},{token:"entity.name.type.logicblox",regex:"`[a-zA-Z_:]+(\\d|\\a)*\\b"},{token:"keyword.start",regex:"->",comment:"Constraint"},{token:"keyword.start",regex:"-->",comment:"Level 1 Constraint"},{token:"keyword.start",regex:"<-",comment:"Rule"},{token:"keyword.start",regex:"<--",comment:"Level 1 Rule"},{token:"keyword.end",regex:"\\.",comment:"Terminator"},{token:"keyword.other",regex:"!",comment:"Negation"},{token:"keyword.other",regex:",",comment:"Conjunction"},{token:"keyword.other",regex:";",comment:"Disjunction"},{token:"keyword.operator",regex:"<=|>=|!=|<|>",comment:"Equality"},{token:"keyword.other",regex:"@",comment:"Equality"},{token:"keyword.operator",regex:"\\+|-|\\*|/",comment:"Arithmetic operations"},{token:"keyword",regex:"::",comment:"Colon colon"},{token:"support.function",regex:"\\b(agg\\s*<<)",push:[{include:"$self"},{token:"support.function",regex:">>",next:"pop"}]},{token:"storage.modifier",regex:"\\b(lang:[\\w:]*)"},{token:["storage.type","text"],regex:"(export|sealed|clauses|block|alias)(\\s*\\()(?=`)"},{token:"entity.name",regex:"[a-zA-Z_][a-zA-Z_0-9:]*(@prev|@init|@final)?(?=(\\(|\\[))"},{token:"variable.parameter",regex:"([a-zA-Z][a-zA-Z_0-9]*|_)\\s*(?=(,|\\.|<-|->|\\)|\\]|=))"}]},this.normalizeRules()};r.inherits(s,i),t.LogiQLHighlightRules=s});