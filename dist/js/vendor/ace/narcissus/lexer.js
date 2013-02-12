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
 * The Original Code is the Narcissus JavaScript engine.
 *
 * The Initial Developer of the Original Code is
 * Brendan Eich <brendan@mozilla.org>.
 * Portions created by the Initial Developer are Copyright (C) 2004
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Tom Austin <taustin@ucsc.edu>
 *   Brendan Eich <brendan@mozilla.org>
 *   Shu-Yu Guo <shu@rfrn.org>
 *   Stephan Herhut <stephan.a.herhut@intel.com>
 *   Dave Herman <dherman@mozilla.com>
 *   Dimitris Vardoulakis <dimvar@ccs.neu.edu>
 *   Patrick Walton <pcwalton@mozilla.com>
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

define(["require","exports","module","./definitions"],function(require,exports,module){function isValidIdentifierChar(e,t){if(e<="")return e>="a"&&e<="z"||e>="A"&&e<="Z"||e==="$"||e==="_"||!t&&e>="0"&&e<="9"?!0:!1;var n={};n["x"+e]=!0,n[e]=!0;var r=!1;try{r=Function("x","return (x."+(t?"":"x")+e+");")(n)===!0}catch(i){}return r}function isIdentifier(e){if(typeof e!="string")return!1;if(e.length===0)return!1;if(!isValidIdentifierChar(e[0],!0))return!1;for(var t=1;t<e.length;t++)if(!isValidIdentifierChar(e[t],!1))return!1;return!0}function Tokenizer(e,t,n,r){this.cursor=0,this.source=String(e),this.tokens=[],this.tokenIndex=0,this.lookahead=0,this.scanNewlines=!1,this.filename=t||"",this.lineno=n||1,this.allowHTMLComments=r,this.blockComments=null}var definitions=require("./definitions");eval(definitions.consts);var opTokens={};for(var op in definitions.opTypeNames){if(op==="\n"||op===".")continue;var node=opTokens;for(var i=0;i<op.length;i++){var ch=op[i];ch in node||(node[ch]={}),node=node[ch],node.op=op}}Tokenizer.prototype={get done(){return this.peek(!0)===END},get token(){return this.tokens[this.tokenIndex]},match:function(e,t,n){return this.get(t,n)===e||this.unget()},mustMatch:function(e,t){if(!this.match(e,!1,t))throw this.newSyntaxError("Missing "+definitions.tokens[e].toLowerCase());return this.token},peek:function(e){var t,n;return this.lookahead?(n=this.tokens[this.tokenIndex+this.lookahead&3],t=this.scanNewlines&&n.lineno!==this.lineno?NEWLINE:n.type):(t=this.get(e),this.unget()),t},peekOnSameLine:function(e){this.scanNewlines=!0;var t=this.peek(e);return this.scanNewlines=!1,t},lastBlockComment:function(){var e=this.blockComments.length;return e?this.blockComments[e-1]:null},skip:function(){var e=this.source;this.blockComments=[];for(;;){var t=e[this.cursor++],n=e[this.cursor];if(t==="\r"){if(n==="\n")continue;t="\n"}if(t==="\n"&&!this.scanNewlines)this.lineno++;else if(t==="/"&&n==="*"){var r=++this.cursor;for(;;){t=e[this.cursor++];if(t===undefined)throw this.newSyntaxError("Unterminated comment");if(t==="*"){n=e[this.cursor];if(n==="/"){var i=this.cursor-1;this.cursor++;break}}else t==="\n"&&this.lineno++}this.blockComments.push(e.substring(r,i))}else if(t==="/"&&n==="/"||this.allowHTMLComments&&t==="<"&&n==="!"&&e[this.cursor+1]==="-"&&e[this.cursor+2]==="-"&&(this.cursor+=2)){this.cursor++;for(;;){t=e[this.cursor++],n=e[this.cursor];if(t===undefined)return;t==="\r"&&n!=="\n"&&(t="\n");if(t==="\n"){this.scanNewlines?this.cursor--:this.lineno++;break}}}else if(!(t in definitions.whitespace)){this.cursor--;return}}},lexExponent:function(){var e=this.source,t=e[this.cursor];if(t==="e"||t==="E"){this.cursor++,ch=e[this.cursor++];if(ch==="+"||ch==="-")ch=e[this.cursor++];if(ch<"0"||ch>"9")throw this.newSyntaxError("Missing exponent");do ch=e[this.cursor++];while(ch>="0"&&ch<="9");return this.cursor--,!0}return!1},lexZeroNumber:function(e){var t=this.token,n=this.source;t.type=NUMBER,e=n[this.cursor++];if(e==="."){do e=n[this.cursor++];while(e>="0"&&e<="9");this.cursor--,this.lexExponent(),t.value=parseFloat(n.substring(t.start,this.cursor))}else if(e==="x"||e==="X"){do e=n[this.cursor++];while(e>="0"&&e<="9"||e>="a"&&e<="f"||e>="A"&&e<="F");this.cursor--,t.value=parseInt(n.substring(t.start,this.cursor))}else if(e>="0"&&e<="7"){do e=n[this.cursor++];while(e>="0"&&e<="7");this.cursor--,t.value=parseInt(n.substring(t.start,this.cursor))}else this.cursor--,this.lexExponent(),t.value=0},lexNumber:function(e){var t=this.token,n=this.source;t.type=NUMBER;var r=!1;do e=n[this.cursor++],e==="."&&!r&&(r=!0,e=n[this.cursor++]);while(e>="0"&&e<="9");this.cursor--;var i=this.lexExponent();r=r||i;var s=n.substring(t.start,this.cursor);t.value=r?parseFloat(s):parseInt(s)},lexDot:function(e){var t=this.token,n=this.source,r=n[this.cursor];if(r>="0"&&r<="9"){do e=n[this.cursor++];while(e>="0"&&e<="9");this.cursor--,this.lexExponent(),t.type=NUMBER,t.value=parseFloat(n.substring(t.start,this.cursor))}else t.type=DOT,t.assignOp=null,t.value="."},lexString:function(ch){var token=this.token,input=this.source;token.type=STRING;var hasEscapes=!1,delim=ch;if(input.length<=this.cursor)throw this.newSyntaxError("Unterminated string literal");while((ch=input[this.cursor++])!==delim){if(ch=="\n"||ch=="\r")throw this.newSyntaxError("Unterminated string literal");if(this.cursor==input.length)throw this.newSyntaxError("Unterminated string literal");if(ch==="\\"){hasEscapes=!0;if(++this.cursor==input.length)throw this.newSyntaxError("Unterminated string literal")}}token.value=hasEscapes?eval(input.substring(token.start,this.cursor)):input.substring(token.start+1,this.cursor-1)},lexRegExp:function(ch){var token=this.token,input=this.source;token.type=REGEXP;do{ch=input[this.cursor++];if(ch==="\\")this.cursor++;else if(ch==="["){do{if(ch===undefined)throw this.newSyntaxError("Unterminated character class");ch==="\\"&&this.cursor++,ch=input[this.cursor++]}while(ch!=="]")}else if(ch===undefined)throw this.newSyntaxError("Unterminated regex")}while(ch!=="/");do ch=input[this.cursor++];while(ch>="a"&&ch<="z");this.cursor--,token.value=eval(input.substring(token.start,this.cursor))},lexOp:function(e){var t=this.token,n=this.source,r=opTokens[e],i=n[this.cursor];i in r&&(r=r[i],this.cursor++,i=n[this.cursor],i in r&&(r=r[i],this.cursor++,i=n[this.cursor]));var s=r.op;definitions.assignOps[s]&&n[this.cursor]==="="?(this.cursor++,t.type=ASSIGN,t.assignOp=definitions.tokenIds[definitions.opTypeNames[s]],s+="="):(t.type=definitions.tokenIds[definitions.opTypeNames[s]],t.assignOp=null),t.value=s},lexIdent:function(e,t){var n=this.token,r=e;while((e=this.getValidIdentifierChar(!1))!==null)r+=e;n.type=IDENTIFIER,n.value=r;if(t)return;var i;if(this.parser.mozillaMode){i=definitions.mozillaKeywords[r];if(i){n.type=i;return}}if(this.parser.x.strictMode){i=definitions.strictKeywords[r];if(i){n.type=i;return}}i=definitions.keywords[r],i&&(n.type=i)},get:function(e,t){var n;while(this.lookahead){--this.lookahead,this.tokenIndex=this.tokenIndex+1&3,n=this.tokens[this.tokenIndex];if(n.type!==NEWLINE||this.scanNewlines)return n.type}this.skip(),this.tokenIndex=this.tokenIndex+1&3,n=this.tokens[this.tokenIndex],n||(this.tokens[this.tokenIndex]=n={});var r=this.source;if(this.cursor>=r.length)return n.type=END;n.start=this.cursor,n.lineno=this.lineno;var i=this.getValidIdentifierChar(!0),s=i===null?r[this.cursor++]:null;if(i!==null)this.lexIdent(i,t);else if(e&&s==="/")this.lexRegExp(s);else if(s in opTokens)this.lexOp(s);else if(s===".")this.lexDot(s);else if(s>="1"&&s<="9")this.lexNumber(s);else if(s==="0")this.lexZeroNumber(s);else if(s==='"'||s==="'")this.lexString(s);else{if(!this.scanNewlines||s!=="\n"&&s!=="\r")throw this.newSyntaxError("Illegal token");s==="\r"&&r[this.cursor]==="\n"&&this.cursor++,n.type=NEWLINE,n.value="\n",this.lineno++}return n.end=this.cursor,n.type},unget:function(){if(++this.lookahead===4)throw"PANIC: too much lookahead!";this.tokenIndex=this.tokenIndex-1&3},newSyntaxError:function(e){e=(this.filename?this.filename+":":"")+this.lineno+": "+e;var t=new SyntaxError(e,this.filename,this.lineno);return t.source=this.source,t.cursor=this.lookahead?this.tokens[this.tokenIndex+this.lookahead&3].start:this.cursor,t},getValidIdentifierChar:function(e){var t=this.source;if(this.cursor>=t.length)return null;var n=t[this.cursor];if(n==="\\"&&t[this.cursor+1]==="u"){try{n=String.fromCharCode(parseInt(t.substring(this.cursor+2,this.cursor+6),16))}catch(r){return null}this.cursor+=5}var i=isValidIdentifierChar(n,e);return i&&this.cursor++,i?n:null}},exports.isIdentifier=isIdentifier,exports.Tokenizer=Tokenizer});