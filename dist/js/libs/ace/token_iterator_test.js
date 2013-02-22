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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./edit_session","./mode/javascript","./token_iterator","./test/assertions"],function(e,t,n){var r=e("./edit_session").EditSession,i=e("./mode/javascript").Mode,s=e("./token_iterator").TokenIterator,o=e("./test/assertions");n.exports={"test: token iterator initialization in JavaScript document":function(){var e=["function foo(items) {","    for (var i=0; i<items.length; i++) {",'        alert(items[i] + "juhu");',"    } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=new s(t,0,0);o.equal(n.getCurrentToken().value,"function"),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0),n.stepForward(),o.equal(n.getCurrentToken().value," "),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),8);var n=new s(t,0,4);o.equal(n.getCurrentToken().value,"function"),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0),n.stepForward(),o.equal(n.getCurrentToken().value," "),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),8);var n=new s(t,2,18);o.equal(n.getCurrentToken().value,"items"),o.equal(n.getCurrentTokenRow(),2),o.equal(n.getCurrentTokenColumn(),14),n.stepForward(),o.equal(n.getCurrentToken().value,"["),o.equal(n.getCurrentTokenRow(),2),o.equal(n.getCurrentTokenColumn(),19);var n=new s(t,4,0);o.equal(n.getCurrentToken().value,"}"),o.equal(n.getCurrentTokenRow(),4),o.equal(n.getCurrentTokenColumn(),0),n.stepBackward(),o.equal(n.getCurrentToken().value,"// Real Tab."),o.equal(n.getCurrentTokenRow(),3),o.equal(n.getCurrentTokenColumn(),6);var n=new s(t,5,0);o.equal(n.getCurrentToken(),null)},"test: token iterator initialization in text document":function(){var e=["Lorem ipsum dolor sit amet, consectetur adipisicing elit,","sed do eiusmod tempor incididunt ut labore et dolore magna","aliqua. Ut enim ad minim veniam, quis nostrud exercitation","ullamco laboris nisi ut aliquip ex ea commodo consequat."],t=new r(e.join("\n")),n=new s(t,0,0);o.equal(n.getCurrentToken().value,e[0]),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,0,4);o.equal(n.getCurrentToken().value,e[0]),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,2,18);o.equal(n.getCurrentToken().value,e[2]),o.equal(n.getCurrentTokenRow(),2),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,3,e[3].length-1);o.equal(n.getCurrentToken().value,e[3]),o.equal(n.getCurrentTokenRow(),3),o.equal(n.getCurrentTokenColumn(),0);var n=new s(t,4,0);o.equal(n.getCurrentToken(),null)},"test: token iterator step forward in JavaScript document":function(){var e=["function foo(items) {","    for (var i=0; i<items.length; i++) {",'        alert(items[i] + "juhu");',"    } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=[],u=t.getLength();for(var a=0;a<u;a++)n=n.concat(t.getTokens(a));var f=new s(t,0,0);for(var a=1;a<n.length;a++)o.equal(f.stepForward(),n[a]);o.equal(f.stepForward(),null),o.equal(f.getCurrentToken(),null)},"test: token iterator step backward in JavaScript document":function(){var e=["function foo(items) {","     for (var i=0; i<items.length; i++) {",'         alert(items[i] + "juhu");',"     } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=[],u=t.getLength();for(var a=0;a<u;a++)n=n.concat(t.getTokens(a));var f=new s(t,4,0);for(var a=n.length-2;a>=0;a--)o.equal(f.stepBackward(),n[a]);o.equal(f.stepBackward(),null),o.equal(f.getCurrentToken(),null)},"test: token iterator reports correct row and column":function(){var e=["function foo(items) {","    for (var i=0; i<items.length; i++) {",'        alert(items[i] + "juhu");',"    } // Real Tab.","}"],t=new r(e.join("\n"),new i),n=new s(t,0,0);n.stepForward(),n.stepForward(),o.equal(n.getCurrentToken().value,"foo"),o.equal(n.getCurrentTokenRow(),0),o.equal(n.getCurrentTokenColumn(),9),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),n.stepForward(),o.equal(n.getCurrentToken().value,"for"),o.equal(n.getCurrentTokenRow(),1),o.equal(n.getCurrentTokenColumn(),4)}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();