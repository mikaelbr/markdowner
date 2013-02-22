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

define(["require","exports","module","../lib/oop","../worker/mirror","./javascript/jshint"],function(require,exports,module){function startRegex(e){return RegExp("^("+e.join("|")+")")}var oop=require("../lib/oop"),Mirror=require("../worker/mirror").Mirror,lint=require("./javascript/jshint").JSHINT,disabledWarningsRe=startRegex(["Bad for in variable '(.+)'.",'Missing "use strict"']),errorsRe=startRegex(["Unexpected","Expected ","Confusing (plus|minus)","\\{a\\} unterminated regular expression","Unclosed ","Unmatched ","Unbegun comment","Bad invocation","Missing space after","Missing operator at"]),infoRe=startRegex(["Expected an assignment","Bad escapement of EOL","Unexpected comma","Unexpected space","Missing radix parameter.","A leading decimal point can","\\['{a}'\\] is better written in dot notation.","'{a}' used out of scope"]),JavaScriptWorker=exports.JavaScriptWorker=function(e){Mirror.call(this,e),this.setTimeout(500),this.setOptions()};oop.inherits(JavaScriptWorker,Mirror),function(){this.setOptions=function(e){this.options=e||{es5:!0,esnext:!0,devel:!0,browser:!0,node:!0,laxcomma:!0,laxbreak:!0,lastsemic:!0,onevar:!1,passfail:!1,maxerr:100,expr:!0,multistr:!0,globalstrict:!0},this.doc.getValue()&&this.deferredUpdate.schedule(100)},this.changeOptions=function(e){oop.mixin(this.options,e),this.doc.getValue()&&this.deferredUpdate.schedule(100)},this.isValidJS=function(str){try{eval("throw 0;"+str)}catch(e){if(e===0)return!0}return!1},this.onUpdate=function(){var e=this.doc.getValue();e=e.replace(/^#!.*\n/,"\n");if(!e){this.sender.emit("jslint",[]);return}var t=[],n=this.isValidJS(e)?"warning":"error";lint(e,this.options);var r=lint.errors,i=!1;for(var s=0;s<r.length;s++){var o=r[s];if(!o)continue;var u=o.raw,a="warning";if(u=="Missing semicolon."){var f=o.evidence.substr(o.character);f=f.charAt(f.search(/\S/)),n=="error"&&f&&/[\w\d{(['"]/.test(f)?(o.reason='Missing ";" before statement',a="error"):a="info"}else{if(disabledWarningsRe.test(u))continue;infoRe.test(u)?a="info":errorsRe.test(u)?(i=!0,a=n):u=="'{a}' is not defined."?a="warning":u=="'{a}' is defined but never used."&&(a="info")}t.push({row:o.line-1,column:o.character-1,text:o.reason,type:a,raw:u}),i}this.sender.emit("jslint",t)}}.call(JavaScriptWorker.prototype)});