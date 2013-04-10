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

define(["require","exports","module","./util","../registers"],function(e,t,n){var r=e("./util"),i=e("../registers");n.exports={d:{selFn:function(e,t,n,s){i._default.text=e.getCopyText(),i._default.isLine=r.onVisualLineMode,r.onVisualLineMode?e.removeLines():e.session.remove(t),r.normalMode(e)},fn:function(e,t,n,r){n=n||1;switch(r){case"d":i._default.text="",i._default.isLine=!0;for(var s=0;s<n;s++){e.selection.selectLine(),i._default.text+=e.getCopyText();var o=e.getSelectionRange();if(!o.isMultiLine()){var u=o.start.row-1,a=e.session.getLine(u).length;o.setStart(u,a),e.session.remove(o),e.selection.clearSelection();break}e.session.remove(o),e.selection.clearSelection()}i._default.text=i._default.text.replace(/\n$/,"");break;default:t&&(e.selection.setSelectionRange(t),i._default.text=e.getCopyText(),i._default.isLine=!1,e.session.remove(t),e.selection.clearSelection())}}},c:{selFn:function(e,t,n,i){e.session.remove(t),r.insertMode(e)},fn:function(e,t,n,i){n=n||1;switch(i){case"c":for(var s=0;s<n;s++)e.removeLines(),r.insertMode(e);break;default:t&&(e.session.remove(t),r.insertMode(e))}}},y:{selFn:function(e,t,n,s){i._default.text=e.getCopyText(),i._default.isLine=r.onVisualLineMode,e.selection.clearSelection(),r.normalMode(e)},fn:function(e,t,n,r){n=n||1;switch(r){case"y":var s=e.getCursorPosition();e.selection.selectLine();for(var o=0;o<n-1;o++)e.selection.moveCursorDown();i._default.text=e.getCopyText().replace(/\n$/,""),e.selection.clearSelection(),i._default.isLine=!0,e.moveCursorToPosition(s);break;default:if(t){var s=e.getCursorPosition();e.selection.setSelectionRange(t),i._default.text=e.getCopyText(),i._default.isLine=!1,e.selection.clearSelection(),e.moveCursorTo(s.row,s.column)}}}},">":{selFn:function(e,t,n,i){n=n||1;for(var s=0;s<n;s++)e.indent();r.normalMode(e)},fn:function(e,t,n,r){n=parseInt(n||1,10);switch(r){case">":var i=e.getCursorPosition();e.selection.selectLine();for(var s=0;s<n-1;s++)e.selection.moveCursorDown();e.indent(),e.selection.clearSelection(),e.moveCursorToPosition(i),e.navigateLineEnd(),e.navigateLineStart()}}},"<":{selFn:function(e,t,n,i){n=n||1;for(var s=0;s<n;s++)e.blockOutdent();r.normalMode(e)},fn:function(e,t,n,r){n=n||1;switch(r){case"<":var i=e.getCursorPosition();e.selection.selectLine();for(var s=0;s<n-1;s++)e.selection.moveCursorDown();e.blockOutdent(),e.selection.clearSelection(),e.moveCursorToPosition(i),e.navigateLineEnd(),e.navigateLineStart()}}}}});