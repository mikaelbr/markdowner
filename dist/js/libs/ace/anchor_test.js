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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./document","./anchor","./range","./test/assertions"],function(e,t,n){var r=e("./document").Document,i=e("./anchor").Anchor,s=e("./range").Range,o=e("./test/assertions");n.exports={"test create anchor":function(){var e=new r("juhu"),t=new i(e,0,0);o.position(t.getPosition(),0,0),o.equal(t.getDocument(),e)},"test insert text in same row before cursor should move anchor column":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insert({row:1,column:1},"123"),o.position(t.getPosition(),1,7)},"test insert lines before cursor should move anchor row":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insertLines(1,["123","456"]),o.position(t.getPosition(),3,4)},"test insert new line before cursor should move anchor column":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insertNewLine({row:0,column:0}),o.position(t.getPosition(),2,4)},"test insert new line in anchor line before anchor should move anchor column and row":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.insertNewLine({row:1,column:2}),o.position(t.getPosition(),2,2)},"test delete text in anchor line before anchor should move anchor column":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.remove(new s(1,1,1,3)),o.position(t.getPosition(),1,2)},"test remove range which contains the anchor should move the anchor to the start of the range":function(){var e=new r("juhu\nkinners"),t=new i(e,0,3);e.remove(new s(0,1,1,3)),o.position(t.getPosition(),0,1)},"test delete character before the anchor should have no effect":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.remove(new s(1,4,1,5)),o.position(t.getPosition(),1,4)},"test delete lines in anchor line before anchor should move anchor row":function(){var e=new r("juhu\n1\n2\nkinners"),t=new i(e,3,4);e.removeLines(1,2),o.position(t.getPosition(),1,4)},"test remove new line before the cursor":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.removeNewLine(0),o.position(t.getPosition(),0,8)},"test delete range which contains the anchor should move anchor to the end of the range":function(){var e=new r("juhu\nkinners"),t=new i(e,1,4);e.remove(new s(0,2,1,2)),o.position(t.getPosition(),0,4)},"test delete line which contains the anchor should move anchor to the end of the range":function(){var e=new r("juhu\nkinners\n123"),t=new i(e,1,5);e.removeLines(1,1),o.position(t.getPosition(),1,0)},"test remove after the anchor should have no effect":function(){var e=new r("juhu\nkinners\n123"),t=new i(e,1,2);e.remove(new s(1,4,2,2)),o.position(t.getPosition(),1,2)},"test anchor changes triggered by document changes should emit change event":function(e){var t=new r("juhu\nkinners\n123"),n=new i(t,1,5);n.on("change",function(t){o.position(n.getPosition(),0,0),e()}),t.remove(new s(0,0,2,1))},"test only fire change event if position changes":function(){var e=new r("juhu\nkinners\n123"),t=new i(e,1,5);t.on("change",function(e){o.fail()}),e.remove(new s(2,0,2,1))}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();