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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./config","./test/assertions"],function(e,t,n){var r=e("./config"),i=e("./test/assertions");n.exports={"test: path resolution":function(){r.set("packaged","true");var e=r.moduleUrl("kr_theme","theme");i.equal(e,"theme-kr.js"),r.set("basePath","a/b"),e=r.moduleUrl("m/theme","theme"),i.equal(e,"a/b/theme-m.js"),e=r.moduleUrl("m/theme","ext"),i.equal(e,"a/b/ext-theme.js"),r.set("workerPath","c/"),e=r.moduleUrl("foo/1","worker"),i.equal(e,"c/worker-1.js"),r.setModuleUrl("foo/1","a/b1.js"),e=r.moduleUrl("foo/1","theme"),i.equal(e,"a/b1.js"),i.equal()},"test: define options":function(){var e={};r.defineOptions(e,"test_object",{opt1:{set:function(e){this.x=e},value:7},initialValue:{set:function(e){this.x=e},initialValue:8},opt2:{get:function(e){return this.x}},forwarded:"model"}),e.model={},r.defineOptions(e.model,"model",{forwarded:{value:1}}),r.resetOptions(e),r.resetOptions(e.model),i.equal(e.getOption("opt1"),7),i.equal(e.getOption("opt2"),7),e.setOption("opt1",8),i.equal(e.getOption("opt1"),8),i.equal(e.getOption("opt2"),8),i.equal(e.getOption("forwarded"),1),i.equal(e.getOption("new"),undefined),e.setOption("new",0),i.equal(e.getOption("new"),undefined),i.equal(e.getOption("initialValue"),8),e.setOption("initialValue",7),i.equal(e.getOption("opt2"),7)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();