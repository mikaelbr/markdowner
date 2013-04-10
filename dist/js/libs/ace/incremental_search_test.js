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

typeof process!="undefined"&&require("amd-loader"),define(["require","exports","module","./edit_session","./editor","./test/mockrenderer","./range","./test/assertions","./incremental_search","./keyboard/emacs"],function(e,t,n){function c(e,t){t=t||f.selection.getAllRanges(),u.equal(t+"",e+"")}function h(){var e=f.session,t=[],n={drawSingleLineMarker:function(e,n){t=t.concat(n)}};return e.$isearchHighlight.update([],n,e,{firstRow:0,lastRow:e.getRowLength()}),t}var r=e("./edit_session").EditSession,i=e("./editor").Editor,s=e("./test/mockrenderer").MockRenderer,o=e("./range").Range,u=e("./test/assertions"),a=e("./incremental_search").IncrementalSearch,f,l;n.exports={name:"ACE incremental_search.js",setUp:function(){var e=new r(["abc123","xyz124"]);f=new i(new s,e),l=new a},"test: keyboard handler setup":function(){l.activate(f),u.equal(f.getKeyboardHandler(),l.$keyboardHandler),l.deactivate(),u.notEqual(f.getKeyboardHandler(),l.$keyboardHandler)},"test: isearch highlight setup":function(){var e=f.session;l.activate(f),l.highlight("foo");var t=e.$isearchHighlight.id;u.ok(e.$isearchHighlight,"session has no isearch highlighter"),u.equal(e.getMarkers()[t.id],t.id,"isearch highlight not in markers"),l.deactivate(),l.activate(f),l.highlight("bar");var n=e.$isearchHighlight.id;u.equal(n,t,"multiple isearch highlights")},"test: find simple text incrementally":function(){l.activate(f);var e=l.addChar("1"),t=h(f.session);c("Range: [0/3] -> [0/4]",[e],"range"),c("Range: [0/3] -> [0/4],Range: [1/3] -> [1/4]",t,"highlight"),e=l.addChar("2"),t=h(f.session),c("Range: [0/3] -> [0/5]",[e],"range"),c("Range: [0/3] -> [0/5],Range: [1/3] -> [1/5]",t,"highlight"),e=l.addChar("3"),t=h(f.session),c("Range: [0/3] -> [0/6]",[e],"range"),c("Range: [0/3] -> [0/6]",t,"highlight"),e=l.removeChar(),t=h(f.session),c("Range: [0/3] -> [0/5]",[e],"range"),c("Range: [0/3] -> [0/5],Range: [1/3] -> [1/5]",t,"highlight")},"test: forward / backward":function(){l.activate(f),l.addChar("1"),l.addChar("2");var e=l.next();c("Range: [1/3] -> [1/5]",[e],"range"),e=l.next(),c("",[e],"range"),e=l.next({backwards:!0}),c("Range: [1/5] -> [1/3]",[e],"range")},"test: cancelSearch":function(){l.activate(f),l.addChar("1"),l.addChar("2");var e=l.cancelSearch(!0);c("Range: [0/0] -> [0/0]",[e],"range"),l.addChar("1"),e=l.addChar("2"),c("Range: [0/3] -> [0/5]",[e],"range")},"test: failing search keeps pos":function(){l.activate(f),l.addChar("1"),l.addChar("2");var e=l.addChar("x");c("",[e],"range"),u.position(f.getCursorPosition(),0,5)},"test: backwards search":function(){f.moveCursorTo(1,0),l.activate(f,!0),l.addChar("1");var e=l.addChar("2");c("Range: [0/5] -> [0/3]",[e],"range"),u.position(f.getCursorPosition(),0,3)},"test: forwards then backwards, same result, reoriented range":function(){l.activate(f),l.addChar("1");var e=l.addChar("2");c("Range: [0/3] -> [0/5]",[e],"range"),u.position(f.getCursorPosition(),0,5),e=l.next({backwards:!0}),c("Range: [0/5] -> [0/3]",[e],"range"),u.position(f.getCursorPosition(),0,3)},"test: reuse prev search via option":function(){l.activate(f),l.addChar("1"),l.addChar("2"),u.position(f.getCursorPosition(),0,5),l.deactivate(),l.activate(f),l.next({backwards:!1,useCurrentOrPrevSearch:!0}),u.position(f.getCursorPosition(),1,5)},"test: don't extend selection range if selection is empty":function(){l.activate(f),l.addChar("1"),l.addChar("2"),c("Range: [0/5] -> [0/5]",[f.getSelectionRange()],"sel range")},"test: extend selection range if selection exists":function(){l.activate(f),f.selection.selectTo(0,1),l.addChar("1"),l.addChar("2"),c("Range: [0/0] -> [0/5]",[f.getSelectionRange()],"sel range")},"test: extend selection in emacs mark mode":function(){var t=e("./keyboard/emacs");f.keyBinding.addKeyboardHandler(t.handler),t.handler.commands.setMark.exec(f),l.activate(f),l.addChar("1"),l.addChar("2"),c("Range: [0/0] -> [0/5]",[f.getSelectionRange()],"sel range")}}}),typeof module!="undefined"&&module===require.main&&require("asyncjs").test.testcase(module.exports).exec();