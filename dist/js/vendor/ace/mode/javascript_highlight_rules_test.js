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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./javascript","../test/assertions"],function(e,t,n){var r=e("./javascript").Mode,i=e("../test/assertions");n.exports={name:"JavaScript Tokenizer",setUp:function(){this.tokenizer=(new r).getTokenizer()},"test: tokenize1":function(){var e="foo = function",t=this.tokenizer.getLineTokens(e,"start").tokens;i.equal(5,t.length),i.equal("identifier",t[0].type),i.equal("text",t[1].type),i.equal("keyword.operator",t[2].type),i.equal("text",t[3].type),i.equal("storage.type",t[4].type)},"test: tokenize 'standard' functions":function(){var e="string.charCodeAt(23); document.getElementById('test'); console.log('Here it is');",t=this.tokenizer.getLineTokens(e,"start").tokens;i.equal(23,t.length),i.equal("support.function",t[2].type),i.equal("support.function.dom",t[10].type),i.equal("support.function.firebug",t[18].type)},"test: tokenize doc comment":function(){var e="abc /** de */ fg",t=this.tokenizer.getLineTokens(e,"start").tokens;i.equal(5,t.length),i.equal("identifier",t[0].type),i.equal("text",t[1].type),i.equal("comment.doc",t[2].type),i.equal("text",t[3].type),i.equal("identifier",t[4].type)},"test: tokenize doc comment with tag":function(){var e="/** @param {} */",t=this.tokenizer.getLineTokens(e,"start").tokens;i.equal(3,t.length),i.equal("comment.doc",t[0].type),i.equal("comment.doc.tag",t[1].type),i.equal("comment.doc",t[2].type)},"test: tokenize parens":function(){var e="[{( )}]",t=this.tokenizer.getLineTokens(e,"start").tokens;i.equal(7,t.length),i.equal("paren.lparen",t[0].type),i.equal("paren.lparen",t[1].type),i.equal("paren.lparen",t[2].type),i.equal("text",t[3].type),i.equal("paren.rparen",t[4].type),i.equal("paren.rparen",t[5].type),i.equal("paren.rparen",t[6].type)},"test for last rule in ruleset to catch capturing group bugs":function(){var e=this.tokenizer.getLineTokens("}","start").tokens;i.equal(1,e.length),i.equal("paren.rparen",e[0].type)},"test tokenize arithmetic expression which looks like a regexp":function(){var e=this.tokenizer.getLineTokens("a/b/c","start").tokens;i.equal(5,e.length);var e=this.tokenizer.getLineTokens("a/=b/c","start").tokens;i.equal(5,e.length)},"test tokenize reg exps":function(){var e=this.tokenizer.getLineTokens("a=/b/g","start").tokens;i.equal(3,e.length),i.equal("string.regexp",e[2].type);var e=this.tokenizer.getLineTokens("a+/b/g","start").tokens;i.equal(3,e.length),i.equal("string.regexp",e[2].type);var e=this.tokenizer.getLineTokens("a = 1 + /2 + 1/b","start").tokens;i.equal(9,e.length),i.equal("string.regexp",e[8].type);var e=this.tokenizer.getLineTokens("a=/a/ / /a/","start").tokens;i.equal(7,e.length),i.equal("string.regexp",e[2].type),i.equal("string.regexp",e[6].type);var e=this.tokenizer.getLineTokens("case /a/.test(c)","start").tokens;i.equal(8,e.length),i.equal("string.regexp",e[2].type)},"test tokenize multi-line comment containing a single line comment":function(){var e=this.tokenizer.getLineTokens("/* foo // bar */","start").tokens;i.equal(1,e.length),i.equal("comment",e[0].type);var e=this.tokenizer.getLineTokens("/* foo // bar */","regex_allowed").tokens;i.equal(1,e.length),i.equal("comment",e[0].type)},"test tokenize identifier with umlauts":function(){var e=this.tokenizer.getLineTokens("füße","start").tokens;i.equal(1,e.length)},"test // is not a regexp":function(){var e=this.tokenizer.getLineTokens("{ // 123","start").tokens;i.equal(3,e.length),i.equal("paren.lparen",e[0].type),i.equal("text",e[1].type),i.equal("comment",e[2].type)},"test skipping escaped chars":function(){var e="console.log('Meh\\nNeh');",t=this.tokenizer.getLineTokens(e,"start").tokens;i.equal(9,t.length),i.equal("constant.language.escape",t[5].type),e="console.log('\\u1232Feh');",t=this.tokenizer.getLineTokens(e,"start").tokens,i.equal(9,t.length),i.equal("constant.language.escape",t[5].type)},"test multiline strings":function(){var e="console.log('Meh\\",t=this.tokenizer.getLineTokens(e,"start");i.equal(5,t.tokens.length),i.equal(t.state,"qstring"),e="console.log('Meh\\ ",t=this.tokenizer.getLineTokens(e,"start"),i.equal(6,t.tokens.length),i.equal(t.state,"start"),e='console.log("\\',t=this.tokenizer.getLineTokens(e,"start"),i.equal(5,t.tokens.length),i.equal(t.state,"qqstring"),e='a="',t=this.tokenizer.getLineTokens(e,"start"),i.equal(3,t.tokens.length),i.equal(t.state,"start")}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();