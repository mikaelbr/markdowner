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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./tokenizer","./test/assertions"],function(e,t,n){var r=e("./tokenizer").Tokenizer,i=e("./test/assertions");n.exports={"test: createSplitterRegexp":function(){var e=new r({}),t=e.createSplitterRegexp("(a)(b)(?=[x)(])");i.equal(t.source,"(a)(b)");var t=e.createSplitterRegexp("xc(?=([x)(]))");i.equal(t.source,"xc");var t=e.createSplitterRegexp("(xc(?=([x)(])))");i.equal(t.source,"(xc)");var t=e.createSplitterRegexp("(?=r)[(?=)](?=([x)(]))");i.equal(t.source,"(?=r)[(?=)]");var t=e.createSplitterRegexp("(?=r)[(?=)](\\?=t)");i.equal(t.source,"(?=r)[(?=)](\\?=t)");var t=e.createSplitterRegexp("[(?=)](\\?=t)");i.equal(t.source,"[(?=)](\\?=t)")},"test: removeCapturingGroups":function(){var e=new r({}),t=e.removeCapturingGroups("(ax(by))[()]");i.equal(t,"(?:ax(?:by))[()]")}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();