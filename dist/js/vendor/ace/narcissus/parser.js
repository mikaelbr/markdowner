/* -*- Mode: JS; tab-width: 4; indent-tabs-mode: nil; -*-
 * vim: set sw=4 ts=4 et tw=78:
 * ***** BEGIN LICENSE BLOCK *****
 *
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

define(["require","exports","module","./lexer","./definitions","./options"],function(require,exports,module){function pushDestructuringVarDecls(e,t){for(var n in e){var r=e[n];r.type===IDENTIFIER?t.varDecls.push(r):pushDestructuringVarDecls(r,t)}}function Parser(e){e.parser=this,this.t=e,this.x=null,this.unexpectedEOF=!1,options.mozillaMode&&(this.mozillaMode=!0),options.parenFreeMode&&(this.parenFreeMode=!0)}function StaticContext(e,t,n,r,i){this.parentScript=e,this.parentBlock=t||e,this.inModule=n||!1,this.inFunction=r||!1,this.inForLoopInit=!1,this.topLevel=!0,this.allLabels=new Stack,this.currentLabels=new Stack,this.labeledTargets=new Stack,this.defaultLoopTarget=null,this.defaultTarget=null,this.strictMode=i}function Pragma(e){if(e.type===SEMICOLON){var t=e.expression;if(t.type===STRING&&t.value==="use strict")return e.pragma="strict",!0}return!1}function Node(e,t){var n=e.token;n?(this.type=n.type,this.value=n.value,this.lineno=n.lineno,this.start=n.start,this.end=n.end):this.lineno=e.lineno,this.filename=e.filename,this.children=[];for(var r in t)this[r]=t[r]}function SyntheticNode(e){this.children=[];for(var t in e)this[t]=e[t];this.synthetic=!0}function unevalableConst(e){var t=definitions.tokens[e],n=definitions.opTypeNames.hasOwnProperty(t)?definitions.opTypeNames[t]:t in definitions.keywords?t.toUpperCase():t;return{toSource:function(){return n}}}function tokenString(e){var t=definitions.tokens[e];return/^\W/.test(t)?definitions.opTypeNames[t]:t.toUpperCase()}function blockInit(){return{type:BLOCK,varDecls:[]}}function scriptInit(){return{type:SCRIPT,funDecls:[],varDecls:[],modDefns:new Dict,modAssns:new Dict,modDecls:new Dict,modLoads:new Dict,impDecls:[],expDecls:[],exports:new Dict,hasEmptyReturn:!1,hasReturnWithValue:!1,hasYield:!1}}function Export(e,t){this.node=e,this.isDefinition=t,this.resolved=null}function registerExport(e,t){function n(t,n){if(e.has(t))throw new SyntaxError("multiple exports of "+t);e.set(t,n)}switch(t.type){case MODULE:case FUNCTION:n(t.name,new Export(t,!0));break;case VAR:for(var r=0;r<t.children.length;r++)n(t.children[r].name,new Export(t.children[r],!0));break;case LET:case CONST:throw new Error("NYI: "+definitions.tokens[t.type]);case EXPORT:for(var r=0;r<t.pathList.length;r++){var i=t.pathList[r];switch(i.type){case OBJECT_INIT:for(var s=0;s<i.children.length;s++){var o=i.children[s];o.type===IDENTIFIER?n(o.value,new Export(o,!1)):n(o.children[0].value,new Export(o.children[1],!1))}break;case DOT:n(i.children[1].value,new Export(i,!1));break;case IDENTIFIER:n(i.value,new Export(i,!1));break;default:throw new Error("unexpected export path: "+definitions.tokens[i.type])}}break;default:throw new Error("unexpected export decl: "+definitions.tokens[exp.type])}}function Module(e){var t=e.body.exports,n=e.body.modDefns,r=new Dict;t.forEach(function(e,t){var i=t.node;if(i.type===MODULE)r.set(e,i);else if(!t.isDefinition&&i.type===IDENTIFIER&&n.has(i.value)){var s=n.get(i.value);r.set(e,s)}}),this.node=e,this.exports=t,this.exportedModules=r}function isPragmaToken(e){switch(e){case IDENTIFIER:case STRING:case NUMBER:case NULL:case TRUE:case FALSE:return!0}return!1}function parse(e,t,n){var r=new Tokenizer(e,t,n,options.allowHTMLComments),i=new Parser(r);return i.Script(!1,!1,!0)}function parseFunction(e,t,n,r,i){var s=new Tokenizer(e,r,i),o=new Parser(s);return o.x=new StaticContext(null,null,!1,!1,!1),o.FunctionDefinition(t,n)}function parseStdin(e,t,n,r){if(e.match(/^[\s]*\.begin[\s]*$/))return++t.value,parseMultiline(t,n);r(e.trim())&&(e="");for(;;)try{var i=new Tokenizer(e,"stdin",t.value,!1),s=new Parser(i),o=s.Script(!1,!1);return t.value=i.lineno,o}catch(u){if(!s.unexpectedEOF)throw u;var a;do{n&&putstr(n),a=readline();if(!a)throw u}while(r(a.trim()));e+="\n"+a}}function parseMultiline(e,t){var n="";for(;;){t&&putstr(t);var r=readline();if(r===null)return null;if(r.match(/^[\s]*\.end[\s]*$/))break;n+="\n"+r}var i=new Tokenizer(n,"stdin",e.value,!1),s=new Parser(i),o=s.Script(!1,!1);return e.value=i.lineno,o}var lexer=require("./lexer"),definitions=require("./definitions"),options=require("./options"),Tokenizer=lexer.Tokenizer,Dict=definitions.Dict,Stack=definitions.Stack;eval(definitions.consts),StaticContext.prototype={update:function(e){var t={};for(var n in e)t[n]={value:e[n],writable:!0,enumerable:!0,configurable:!0};return Object.create(this,t)},pushLabel:function(e){return this.update({currentLabels:this.currentLabels.push(e),allLabels:this.allLabels.push(e)})},pushTarget:function(e){var t=e.isLoop,n=t||e.type===SWITCH;return this.currentLabels.isEmpty()?(t&&this.update({defaultLoopTarget:e}),n&&this.update({defaultTarget:e}),this):(e.labels=new Dict,this.currentLabels.forEach(function(t){e.labels.set(t,!0)}),this.update({currentLabels:new Stack,labeledTargets:this.labeledTargets.push(e),defaultLoopTarget:t?e:this.defaultLoopTarget,defaultTarget:n?e:this.defaultTarget}))},nest:function(){return this.topLevel?this.update({topLevel:!1}):this},canImport:function(){return this.topLevel&&!this.inFunction},canExport:function(){return this.inModule&&this.topLevel&&!this.inFunction},banWith:function(){return this.strictMode||this.inModule},modulesAllowed:function(){return this.topLevel&&!this.inFunction}};var Pp=Parser.prototype;Pp.mozillaMode=!1,Pp.parenFreeMode=!1,Pp.withContext=function(e,t){var n=this.x;this.x=e;var r=t.call(this);return this.x=n,r},Pp.newNode=function(t){return new Node(this.t,t)},Pp.fail=function(t){throw this.t.newSyntaxError(t)},Pp.match=function(t,n,r){return this.t.match(t,n,r)},Pp.mustMatch=function(t,n){return this.t.mustMatch(t,n)},Pp.peek=function(t){return this.t.peek(t)},Pp.peekOnSameLine=function(t){return this.t.peekOnSameLine(t)},Pp.done=function(){return this.t.done},Pp.Script=function(t,n,r){var i=this.newNode(scriptInit()),s=new StaticContext(i,i,t,n);return this.withContext(s,function(){this.Statements(i,!0)}),r&&!this.done()&&this.fail("expected end of input"),i};var Np=Node.prototype=SyntheticNode.prototype={};Np.constructor=Node;var TO_SOURCE_SKIP={type:!0,value:!0,lineno:!0,start:!0,end:!0,tokenizer:!0,assignOp:!0};Np.toSource=function(){var t={},n=this;t.type=unevalableConst(this.type);if(this.generatingSource)return t.toSource();this.generatingSource=!0,"value"in this&&(t.value=this.value),"lineno"in this&&(t.lineno=this.lineno),"start"in this&&(t.start=this.start),"end"in this&&(t.end=this.end),this.assignOp&&(t.assignOp=unevalableConst(this.assignOp));for(var r in this)this.hasOwnProperty(r)&&!(r in TO_SOURCE_SKIP)&&(t[r]=this[r]);try{return t.toSource()}finally{delete this.generatingSource}},Np.push=function(e){return e!==null&&(e.start<this.start&&(this.start=e.start),this.end<e.end&&(this.end=e.end)),this.children.push(e)},Node.indentLevel=0,Np.toString=function(){var e=[];for(var t in this)this.hasOwnProperty(t)&&t!=="type"&&t!=="target"&&e.push({id:t,value:this[t]});e.sort(function(e,t){return e.id<t.id?-1:1});var n="    ",r=++Node.indentLevel,i="{\n"+n.repeat(r)+"type: "+tokenString(this.type);for(t=0;t<e.length;t++)i+=",\n"+n.repeat(r)+e[t].id+": "+e[t].value;return r=--Node.indentLevel,i+="\n"+n.repeat(r)+"}",i},Np.synth=function(e){var t=new SyntheticNode(e);return t.filename=this.filename,t.lineno=this.lineno,t.start=this.start,t.end=this.end,t};var LOOP_INIT={isLoop:!0};definitions.defineGetter(Np,"length",function(){throw new Error("Node.prototype.length is gone; use n.children.length instead")}),definitions.defineProperty(String.prototype,"repeat",function(e){var t="",n=this+t;while(--e>=0)t+=n;return t},!1,!1,!0),Pp.MaybeLeftParen=function(){return this.parenFreeMode?this.match(LEFT_PAREN)?LEFT_PAREN:END:this.mustMatch(LEFT_PAREN).type},Pp.MaybeRightParen=function(t){t===LEFT_PAREN&&this.mustMatch(RIGHT_PAREN)},Pp.Statements=function(t,n){var r=!!n;try{while(!this.done()&&this.peek(!0)!==RIGHT_CURLY){var i=this.Statement();t.push(i),r&&Pragma(i)?(this.x.strictMode=!0,t.strict=!0):r=!1}}catch(s){try{this.done()&&(this.unexpectedEOF=!0)}catch(s){}throw s}},Pp.Block=function(){this.mustMatch(LEFT_CURLY);var t=this.newNode(blockInit()),n=this.x.update({parentBlock:t}).pushTarget(t);return this.withContext(n,function(){this.Statements(t)}),this.mustMatch(RIGHT_CURLY),t};var DECLARED_FORM=0,EXPRESSED_FORM=1,STATEMENT_FORM=2;Pp.Statement=function(){var t,n,r,i,s,o,u,a=this.t.get(!0),f,l,c,h,p=this.t.blockComments;switch(a){case IMPORT:this.x.canImport()||this.fail("illegal context for import statement"),r=this.newNode(),r.pathList=this.ImportPathList(),this.x.parentScript.impDecls.push(r);break;case EXPORT:this.x.canExport()||this.fail("export statement not in module top level");switch(this.peek()){case MODULE:case FUNCTION:case LET:case VAR:case CONST:return r=this.Statement(),r.blockComments=p,r.exported=!0,this.x.parentScript.expDecls.push(r),registerExport(this.x.parentScript.exports,r),r}r=this.newNode(),r.pathList=this.ExportPathList(),this.x.parentScript.expDecls.push(r),registerExport(this.x.parentScript.exports,r);break;case FUNCTION:return this.FunctionDefinition(!0,this.x.topLevel?DECLARED_FORM:STATEMENT_FORM,p);case LEFT_CURLY:return r=this.newNode(blockInit()),c=this.x.update({parentBlock:r}).pushTarget(r).nest(),this.withContext(c,function(){this.Statements(r)}),this.mustMatch(RIGHT_CURLY),r;case IF:return r=this.newNode(),r.condition=this.HeadExpression(),c=this.x.pushTarget(r).nest(),this.withContext(c,function(){r.thenPart=this.Statement(),r.elsePart=this.match(ELSE,!0)?this.Statement():null}),r;case SWITCH:return r=this.newNode({cases:[],defaultIndex:-1}),r.discriminant=this.HeadExpression(),c=this.x.pushTarget(r).nest(),this.withContext(c,function(){this.mustMatch(LEFT_CURLY);while((a=this.t.get())!==RIGHT_CURLY){switch(a){case DEFAULT:r.defaultIndex>=0&&this.fail("More than one switch default");case CASE:i=this.newNode(),a===DEFAULT?r.defaultIndex=r.cases.length:i.caseLabel=this.Expression(COLON);break;default:this.fail("Invalid switch case")}this.mustMatch(COLON),i.statements=this.newNode(blockInit());while((a=this.peek(!0))!==CASE&&a!==DEFAULT&&a!==RIGHT_CURLY)i.statements.push(this.Statement());r.cases.push(i)}}),r;case FOR:return r=this.newNode(LOOP_INIT),r.blockComments=p,this.match(IDENTIFIER)&&(this.t.token.value==="each"?r.isEach=!0:this.t.unget()),this.parenFreeMode||this.mustMatch(LEFT_PAREN),c=this.x.pushTarget(r).nest(),h=this.x.update({inForLoopInit:!0}),i=null,(a=this.peek(!0))!==SEMICOLON&&this.withContext(h,function(){a===VAR||a===CONST?(this.t.get(),i=this.Variables()):a===LET?(this.t.get(),this.peek()===LEFT_PAREN?i=this.LetBlock(!1):(this.x.parentBlock=r,r.varDecls=[],i=this.Variables())):i=this.Expression()}),i&&this.match(IN)?(r.type=FOR_IN,this.withContext(h,function(){r.object=this.Expression();if(i.type===VAR||i.type===LET){o=i.children;if(o.length!==1&&i.destructurings.length!==1)throw new SyntaxError("Invalid for..in left-hand side",this.filename,i.lineno);i.destructurings.length>0?r.iterator=i.destructurings[0]:r.iterator=o[0],r.varDecl=i}else{if(i.type===ARRAY_INIT||i.type===OBJECT_INIT)i.destructuredNames=this.checkDestructuring(i);r.iterator=i}})):(h.inForLoopInit=!1,r.setup=i,this.mustMatch(SEMICOLON),r.isEach&&this.fail("Invalid for each..in loop"),this.withContext(h,function(){r.condition=this.peek(!0)===SEMICOLON?null:this.Expression(),this.mustMatch(SEMICOLON),f=this.peek(!0),r.update=(this.parenFreeMode?f===LEFT_CURLY||definitions.isStatementStartCode[f]:f===RIGHT_PAREN)?null:this.Expression()})),this.parenFreeMode||this.mustMatch(RIGHT_PAREN),this.withContext(c,function(){r.body=this.Statement()}),r;case WHILE:return r=this.newNode({isLoop:!0}),r.blockComments=p,r.condition=this.HeadExpression(),c=this.x.pushTarget(r).nest(),this.withContext(c,function(){r.body=this.Statement()}),r;case DO:return r=this.newNode({isLoop:!0}),r.blockComments=p,c=this.x.pushTarget(r).next(),this.withContext(c,function(){r.body=this.Statement()}),this.mustMatch(WHILE),r.condition=this.HeadExpression(),this.match(SEMICOLON),r;case BREAK:case CONTINUE:r=this.newNode(),r.blockComments=p,c=this.x.pushTarget(r),this.peekOnSameLine()===IDENTIFIER&&(this.t.get(),r.label=this.t.token.value),r.label?r.target=c.labeledTargets.find(function(e){return e.labels.has(r.label)}):a===CONTINUE?r.target=c.defaultLoopTarget:r.target=c.defaultTarget,r.target||this.fail("Invalid "+(a===BREAK?"break":"continue")),!r.target.isLoop&&a===CONTINUE&&this.fail("Invalid continue");break;case TRY:r=this.newNode({catchClauses:[]}),r.blockComments=p,r.tryBlock=this.Block();while(this.match(CATCH)){i=this.newNode(),s=this.MaybeLeftParen();switch(this.t.get()){case LEFT_BRACKET:case LEFT_CURLY:this.t.unget(),i.varName=this.DestructuringExpression(!0);break;case IDENTIFIER:i.varName=this.t.token.value;break;default:this.fail("missing identifier in catch")}this.match(IF)&&(this.mozillaMode||this.fail("Illegal catch guard"),r.catchClauses.length&&!r.catchClauses.top().guard&&this.fail("Guarded catch after unguarded"),i.guard=this.Expression()),this.MaybeRightParen(s),i.block=this.Block(),r.catchClauses.push(i)}return this.match(FINALLY)&&(r.finallyBlock=this.Block()),!r.catchClauses.length&&!r.finallyBlock&&this.fail("Invalid try statement"),r;case CATCH:case FINALLY:this.fail(definitions.tokens[a]+" without preceding try");case THROW:r=this.newNode(),r.exception=this.Expression();break;case RETURN:r=this.ReturnOrYield();break;case WITH:return this.x.banWith()&&this.fail("with statements not allowed in strict code or modules"),r=this.newNode(),r.blockComments=p,r.object=this.HeadExpression(),c=this.x.pushTarget(r).next(),this.withContext(c,function(){r.body=this.Statement()}),r;case VAR:case CONST:r=this.Variables();break;case LET:if(this.peek()===LEFT_PAREN)return r=this.LetBlock(!0),r;r=this.Variables();break;case DEBUGGER:r=this.newNode();break;case NEWLINE:case SEMICOLON:return r=this.newNode({type:SEMICOLON}),r.blockComments=p,r.expression=null,r;case IDENTIFIER:case USE:case MODULE:switch(this.t.token.value){case"use":if(!isPragmaToken(this.peekOnSameLine())){this.t.unget();break}return this.newNode({type:USE,params:this.Pragmas()});case"module":this.x.modulesAllowed()||this.fail("module declaration not at top level"),this.x.parentScript.hasModules=!0,a=this.peekOnSameLine();if(a!==IDENTIFIER&&a!==LEFT_CURLY){this.t.unget();break}r=this.newNode({type:MODULE}),r.blockComments=p,this.mustMatch(IDENTIFIER),n=this.t.token.value;if(this.match(LEFT_CURLY))return r.name=n,r.body=this.Script(!0,!1),r.module=new Module(r),this.mustMatch(RIGHT_CURLY),this.x.parentScript.modDefns.set(r.name,r),r;return this.t.unget(),this.ModuleVariables(r),r;default:a=this.peek();if(a===COLON)return n=this.t.token.value,this.x.allLabels.has(n)&&this.fail("Duplicate label: "+n),this.t.get(),r=this.newNode({type:LABEL,label:n}),r.blockComments=p,c=this.x.pushLabel(n).nest(),this.withContext(c,function(){r.statement=this.Statement()}),r.target=r.statement.type===LABEL?r.statement.target:r.statement,r};default:r=this.newNode({type:SEMICOLON}),this.t.unget(),r.blockComments=p,r.expression=this.Expression(),r.end=r.expression.end}return r.blockComments=p,this.MagicalSemicolon(),r},Pp.Pragmas=function(){var t=[];do t.push(this.Pragma());while(this.match(COMMA));return this.MagicalSemicolon(),t},Pp.Pragma=function(){var t=[],n;do n=this.t.get(!0),t.push(this.t.token);while(isPragmaToken(this.peek()));return t},Pp.MagicalSemicolon=function(){var t;this.t.lineno===this.t.token.lineno&&(t=this.peekOnSameLine(),t!==END&&t!==NEWLINE&&t!==SEMICOLON&&t!==RIGHT_CURLY&&this.fail("missing ; before statement")),this.match(SEMICOLON)},Pp.ReturnOrYield=function(){var t,n,r=this.t.token.type,i,s=this.x.parentScript;return r===RETURN?this.x.inFunction||this.fail("Return not in function"):(this.x.inFunction||this.fail("Yield not in function"),s.hasYield=!0),t=this.newNode({value:undefined}),i=r===RETURN?this.peekOnSameLine(!0):this.peek(!0),i!==END&&i!==NEWLINE&&i!==SEMICOLON&&i!==RIGHT_CURLY&&(r!==YIELD||i!==r&&i!==RIGHT_BRACKET&&i!==RIGHT_PAREN&&i!==COLON&&i!==COMMA)?r===RETURN?(t.value=this.Expression(),s.hasReturnWithValue=!0):t.value=this.AssignExpression():r===RETURN&&(s.hasEmptyReturn=!0),t},Pp.ModuleExpression=function(){return this.match(STRING)?this.newNode():this.QualifiedPath()},Pp.ImportPathList=function(){var t=[];do t.push(this.ImportPath());while(this.match(COMMA));return t},Pp.ImportPath=function(){var t=this.QualifiedPath();if(!this.match(DOT))return t.type===IDENTIFIER&&this.fail("cannot import local variable"),t;var n=this.newNode();return n.push(t),n.push(this.ImportSpecifierSet()),n},Pp.ExplicitSpecifierSet=function(t){var n,r,i,s;n=this.newNode({type:OBJECT_INIT}),this.mustMatch(LEFT_CURLY);if(!this.match(RIGHT_CURLY))do i=this.Identifier(),this.match(COLON)?(r=this.newNode({type:PROPERTY_INIT}),r.push(i),r.push(t()),n.push(r)):n.push(i);while(!this.match(RIGHT_CURLY)&&this.mustMatch(COMMA));return n},Pp.ImportSpecifierSet=function(){var t=this;return this.match(MUL)?this.newNode({type:IDENTIFIER,name:"*"}):ExplicitSpecifierSet(function(){return t.Identifier()})},Pp.Identifier=function(){return this.mustMatch(IDENTIFIER),this.newNode({type:IDENTIFIER})},Pp.IdentifierName=function(){return this.mustMatch(IDENTIFIER,!0),this.newNode({type:IDENTIFIER})},Pp.QualifiedPath=function(){var t,n;t=this.Identifier();while(this.match(DOT)){if(this.peek()!==IDENTIFIER){this.t.unget();break}n=this.newNode(),n.push(t),n.push(this.Identifier()),t=n}return t},Pp.ExportPath=function(){var t=this;return this.peek()===LEFT_CURLY?this.ExplicitSpecifierSet(function(){return t.QualifiedPath()}):this.QualifiedPath()},Pp.ExportPathList=function(){var t=[];do t.push(this.ExportPath());while(this.match(COMMA));return t},Pp.FunctionDefinition=function(t,n,r){var i,s=this.newNode({params:[],paramComments:[]});typeof r=="undefined"&&(r=null),s.blockComments=r,s.type!==FUNCTION&&(s.type=s.value==="get"?GETTER:SETTER),this.match(MUL)&&(s.isExplicitGenerator=!0),this.match(IDENTIFIER,!1,!0)?s.name=this.t.token.value:t&&this.fail("missing function identifier");var o=this.x.inModule;x2=new StaticContext(null,null,o,!0,this.x.strictMode),this.withContext(x2,function(){this.mustMatch(LEFT_PAREN);if(!this.match(RIGHT_PAREN)){do{i=this.t.get(),s.paramComments.push(this.t.lastBlockComment());switch(i){case LEFT_BRACKET:case LEFT_CURLY:this.t.unget(),s.params.push(this.DestructuringExpression());break;case IDENTIFIER:s.params.push(this.t.token.value);break;default:this.fail("missing formal parameter")}}while(this.match(COMMA));this.mustMatch(RIGHT_PAREN)}i=this.t.get(!0),i!==LEFT_CURLY&&this.t.unget(),i!==LEFT_CURLY?s.body=this.AssignExpression():s.body=this.Script(o,!0)}),i===LEFT_CURLY&&this.mustMatch(RIGHT_CURLY),s.end=this.t.token.end,s.functionForm=n,n===DECLARED_FORM&&this.x.parentScript.funDecls.push(s),this.x.inModule&&!s.isExplicitGenerator&&s.body.hasYield&&this.fail("yield in non-generator function");if(s.isExplicitGenerator||s.body.hasYield)s.body=this.newNode({type:GENERATOR,body:s.body});return s},Pp.ModuleVariables=function(t){var n,r;do n=this.Identifier(),this.match(ASSIGN)&&(r=this.ModuleExpression(),n.initializer=r,r.type===STRING?this.x.parentScript.modLoads.set(n.value,r.value):this.x.parentScript.modAssns.set(n.value,n)),t.push(n);while(this.match(COMMA))},Pp.Variables=function(t){var n,r,i,s,o,u;u=this.t.token.type;switch(u){case VAR:case CONST:o=this.x.parentScript;break;case LET:o=this.x.parentBlock;break;case LEFT_PAREN:u=LET,o=t}n=this.newNode({type:u,destructurings:[]});do{u=this.t.get();if(u===LEFT_BRACKET||u===LEFT_CURLY){this.t.unget();var a=this.DestructuringExpression(!0);r=this.newNode({type:IDENTIFIER,name:a,readOnly:n.type===CONST}),n.push(r),pushDestructuringVarDecls(r.name.destructuredNames,o),n.destructurings.push({exp:a,decl:r});if(this.x.inForLoopInit&&this.peek()===IN)continue;this.mustMatch(ASSIGN),this.t.token.assignOp&&this.fail("Invalid variable initialization"),r.blockComment=this.t.lastBlockComment(),r.initializer=this.AssignExpression();continue}u!==IDENTIFIER&&this.fail("missing variable name"),r=this.newNode({type:IDENTIFIER,name:this.t.token.value,readOnly:n.type===CONST}),n.push(r),o.varDecls.push(r);if(this.match(ASSIGN)){var f=this.t.lastBlockComment();this.t.token.assignOp&&this.fail("Invalid variable initialization"),r.initializer=this.AssignExpression()}else var f=this.t.lastBlockComment();r.blockComment=f}while(this.match(COMMA));return n},Pp.LetBlock=function(t){var n,r;return n=this.newNode({type:LET_BLOCK,varDecls:[]}),this.mustMatch(LEFT_PAREN),n.variables=this.Variables(n),this.mustMatch(RIGHT_PAREN),t&&this.peek()!==LEFT_CURLY&&(r=this.newNode({type:SEMICOLON,expression:n}),t=!1),t?n.block=this.Block():n.expression=this.AssignExpression(),n},Pp.checkDestructuring=function(t,n){t.type===ARRAY_COMP&&this.fail("Invalid array comprehension left-hand side");if(t.type!==ARRAY_INIT&&t.type!==OBJECT_INIT)return;var r={},i,s,o,u,a,f=t.children;for(var l=0,c=f.length;l<c;l++){if(!(i=f[l]))continue;i.type===PROPERTY_INIT?(a=i.children,u=a[1],o=a[0].value):t.type===OBJECT_INIT?(u=i,o=i.value):(u=i,o=l),u.type===ARRAY_INIT||u.type===OBJECT_INIT?r[o]=this.checkDestructuring(u,n):(n&&u.type!==IDENTIFIER&&this.fail("missing name in pattern"),r[o]=u)}return r},Pp.DestructuringExpression=function(t){var n=this.PrimaryExpression();return n.destructuredNames=this.checkDestructuring(n,t),n},Pp.GeneratorExpression=function(t){return this.newNode({type:GENERATOR,expression:t,tail:this.ComprehensionTail()})},Pp.ComprehensionTail=function(){var t,n,r,i,s;t=this.newNode({type:COMP_TAIL});do{n=this.newNode({type:FOR_IN,isLoop:!0}),this.match(IDENTIFIER)&&(this.mozillaMode&&this.t.token.value==="each"?n.isEach=!0:this.t.unget()),s=this.MaybeLeftParen();switch(this.t.get()){case LEFT_BRACKET:case LEFT_CURLY:this.t.unget(),n.iterator=this.DestructuringExpression();break;case IDENTIFIER:n.iterator=i=this.newNode({type:IDENTIFIER}),i.name=i.value,n.varDecl=r=this.newNode({type:VAR}),r.push(i),this.x.parentScript.varDecls.push(i);break;default:this.fail("missing identifier")}this.mustMatch(IN),n.object=this.Expression(),this.MaybeRightParen(s),t.push(n)}while(this.match(FOR));return this.match(IF)&&(t.guard=this.HeadExpression()),t},Pp.HeadExpression=function(){var t=this.MaybeLeftParen(),n=this.ParenExpression();this.MaybeRightParen(t);if(t===END&&!n.parenthesized){var r=this.peek();r!==LEFT_CURLY&&!definitions.isStatementStartCode[r]&&this.fail("Unparenthesized head followed by unbraced body")}return n},Pp.ParenExpression=function(){var t=this.x.update({inForLoopInit:this.x.inForLoopInit&&this.t.token.type===LEFT_PAREN}),n=this.withContext(t,function(){return this.Expression()});return this.match(FOR)&&(n.type===YIELD&&!n.parenthesized&&this.fail("Yield expression must be parenthesized"),n.type===COMMA&&!n.parenthesized&&this.fail("Generator expression must be parenthesized"),n=this.GeneratorExpression(n)),n},Pp.Expression=function(){var t,n;t=this.AssignExpression();if(this.match(COMMA)){n=this.newNode({type:COMMA}),n.push(t),t=n;do n=t.children[t.children.length-1],n.type===YIELD&&!n.parenthesized&&this.fail("Yield expression must be parenthesized"),t.push(this.AssignExpression());while(this.match(COMMA))}return t},Pp.AssignExpression=function(){var t,n;if(this.match(YIELD,!0))return this.ReturnOrYield();t=this.newNode({type:ASSIGN}),n=this.ConditionalExpression();if(!this.match(ASSIGN))return n;t.blockComment=this.t.lastBlockComment();switch(n.type){case OBJECT_INIT:case ARRAY_INIT:n.destructuredNames=this.checkDestructuring(n);case IDENTIFIER:case DOT:case INDEX:case CALL:break;default:this.fail("Bad left-hand side of assignment")}return t.assignOp=n.assignOp=this.t.token.assignOp,t.push(n),t.push(this.AssignExpression()),t},Pp.ConditionalExpression=function(){var t,n;t=this.OrExpression();if(this.match(HOOK)){n=t,t=this.newNode({type:HOOK}),t.push(n);var r=this.x.update({inForLoopInit:!1});this.withContext(r,function(){t.push(this.AssignExpression())}),this.match(COLON)||this.fail("missing : after ?"),t.push(this.AssignExpression())}return t},Pp.OrExpression=function(){var t,n;t=this.AndExpression();while(this.match(OR))n=this.newNode(),n.push(t),n.push(this.AndExpression()),t=n;return t},Pp.AndExpression=function(){var t,n;t=this.BitwiseOrExpression();while(this.match(AND))n=this.newNode(),n.push(t),n.push(this.BitwiseOrExpression()),t=n;return t},Pp.BitwiseOrExpression=function(){var t,n;t=this.BitwiseXorExpression();while(this.match(BITWISE_OR))n=this.newNode(),n.push(t),n.push(this.BitwiseXorExpression()),t=n;return t},Pp.BitwiseXorExpression=function(){var t,n;t=this.BitwiseAndExpression();while(this.match(BITWISE_XOR))n=this.newNode(),n.push(t),n.push(this.BitwiseAndExpression()),t=n;return t},Pp.BitwiseAndExpression=function(){var t,n;t=this.EqualityExpression();while(this.match(BITWISE_AND))n=this.newNode(),n.push(t),n.push(this.EqualityExpression()),t=n;return t},Pp.EqualityExpression=function(){var t,n;t=this.RelationalExpression();while(this.match(EQ)||this.match(NE)||this.match(STRICT_EQ)||this.match(STRICT_NE))n=this.newNode(),n.push(t),n.push(this.RelationalExpression()),t=n;return t},Pp.RelationalExpression=function(){var t,n,r=this.x.update({inForLoopInit:!1});return this.withContext(r,function(){t=this.ShiftExpression();while(this.match(LT)||this.match(LE)||this.match(GE)||this.match(GT)||!this.x.inForLoopInit&&this.match(IN)||this.match(INSTANCEOF))n=this.newNode(),n.push(t),n.push(this.ShiftExpression()),t=n}),t},Pp.ShiftExpression=function(){var t,n;t=this.AddExpression();while(this.match(LSH)||this.match(RSH)||this.match(URSH))n=this.newNode(),n.push(t),n.push(this.AddExpression()),t=n;return t},Pp.AddExpression=function(){var t,n;t=this.MultiplyExpression();while(this.match(PLUS)||this.match(MINUS))n=this.newNode(),n.push(t),n.push(this.MultiplyExpression()),t=n;return t},Pp.MultiplyExpression=function(){var t,n;t=this.UnaryExpression();while(this.match(MUL)||this.match(DIV)||this.match(MOD))n=this.newNode(),n.push(t),n.push(this.UnaryExpression()),t=n;return t},Pp.UnaryExpression=function(){var t,n,r;switch(r=this.t.get(!0)){case DELETE:case VOID:case TYPEOF:case NOT:case BITWISE_NOT:case PLUS:case MINUS:r===PLUS?t=this.newNode({type:UNARY_PLUS}):r===MINUS?t=this.newNode({type:UNARY_MINUS}):t=this.newNode(),t.push(this.UnaryExpression());break;case INCREMENT:case DECREMENT:t=this.newNode(),t.push(this.MemberExpression(!0));break;default:this.t.unget(),t=this.MemberExpression(!0),this.t.tokens[this.t.tokenIndex+this.t.lookahead-1&3].lineno===this.t.lineno&&(this.match(INCREMENT)||this.match(DECREMENT))&&(n=this.newNode({postfix:!0}),n.push(t),t=n)}return t},Pp.MemberExpression=function(t){var n,r,i,s;this.match(NEW)?(n=this.newNode(),n.push(this.MemberExpression(!1)),this.match(LEFT_PAREN)&&(n.type=NEW_WITH_ARGS,n.push(this.ArgumentList()))):n=this.PrimaryExpression();while((s=this.t.get())!==END){switch(s){case DOT:r=this.newNode(),r.push(n),r.push(this.IdentifierName());break;case LEFT_BRACKET:r=this.newNode({type:INDEX}),r.push(n),r.push(this.Expression()),this.mustMatch(RIGHT_BRACKET);break;case LEFT_PAREN:if(t){r=this.newNode({type:CALL}),r.push(n),r.push(this.ArgumentList());break};default:return this.t.unget(),n}n=r}return n},Pp.ArgumentList=function(){var t,n;t=this.newNode({type:LIST});if(this.match(RIGHT_PAREN,!0))return t;do n=this.AssignExpression(),n.type===YIELD&&!n.parenthesized&&this.peek()===COMMA&&this.fail("Yield expression must be parenthesized"),this.match(FOR)&&(n=this.GeneratorExpression(n),(t.children.length>1||this.peek(!0)===COMMA)&&this.fail("Generator expression must be parenthesized")),t.push(n);while(this.match(COMMA));return this.mustMatch(RIGHT_PAREN),t},Pp.PrimaryExpression=function(){var t,n,r=this.t.get(!0);switch(r){case FUNCTION:t=this.FunctionDefinition(!1,EXPRESSED_FORM);break;case LEFT_BRACKET:t=this.newNode({type:ARRAY_INIT});while((r=this.peek(!0))!==RIGHT_BRACKET){if(r===COMMA){this.t.get(),t.push(null);continue}t.push(this.AssignExpression());if(r!==COMMA&&!this.match(COMMA))break}t.children.length===1&&this.match(FOR)&&(n=this.newNode({type:ARRAY_COMP,expression:t.children[0],tail:this.ComprehensionTail()}),t=n),this.mustMatch(RIGHT_BRACKET);break;case LEFT_CURLY:var i,s;t=this.newNode({type:OBJECT_INIT});e:if(!this.match(RIGHT_CURLY)){do{r=this.t.get();if(this.t.token.value!=="get"&&this.t.token.value!=="set"||this.peek()!==IDENTIFIER){var o=this.t.blockComments;switch(r){case IDENTIFIER:case NUMBER:case STRING:i=this.newNode({type:IDENTIFIER});break;case RIGHT_CURLY:break e;default:if(this.t.token.value in definitions.keywords){i=this.newNode({type:IDENTIFIER});break}this.fail("Invalid property name")}this.match(COLON)?(n=this.newNode({type:PROPERTY_INIT}),n.push(i),n.push(this.AssignExpression()),n.blockComments=o,t.push(n)):(this.peek()!==COMMA&&this.peek()!==RIGHT_CURLY&&this.fail("missing : after property"),t.push(i))}else t.push(this.FunctionDefinition(!0,EXPRESSED_FORM))}while(this.match(COMMA));this.mustMatch(RIGHT_CURLY)}break;case LEFT_PAREN:t=this.ParenExpression(),this.mustMatch(RIGHT_PAREN),t.parenthesized=!0;break;case LET:t=this.LetBlock(!1);break;case NULL:case THIS:case TRUE:case FALSE:case IDENTIFIER:case NUMBER:case STRING:case REGEXP:t=this.newNode();break;default:this.fail("missing operand; found "+definitions.tokens[r])}return t},exports.parse=parse,exports.parseStdin=parseStdin,exports.parseFunction=parseFunction,exports.Node=Node,exports.DECLARED_FORM=DECLARED_FORM,exports.EXPRESSED_FORM=EXPRESSED_FORM,exports.STATEMENT_FORM=STATEMENT_FORM,exports.Tokenizer=Tokenizer,exports.Parser=Parser,exports.Module=Module,exports.Export=Export});