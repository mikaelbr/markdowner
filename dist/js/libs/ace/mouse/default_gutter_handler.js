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

define(["require","exports","module","../lib/dom","../lib/event"],function(e,t,n){function s(e){function f(){u=r.createElement("div"),u.className="ace_gutter-tooltip",u.style.display="none",t.container.appendChild(u)}function l(){u||f();var e=o.getDocumentPosition().row,r=n.$annotations[e];if(!r)return c();var i=t.session.getLength();if(e==i){var s=t.renderer.pixelToScreenCoordinates(0,o.y).row,l=o.$pos;if(s>t.session.documentToScreenRow(l.row,l.column))return c()}if(a==r)return;a=r.text.join("<br/>"),u.style.display="block",u.innerHTML=a,t.on("mousewheel",c),h(o)}function c(){s&&(s=clearTimeout(s)),a&&(u.style.display="none",a=null,t.removeEventListener("mousewheel",c))}function h(e){var n=t.renderer.$gutter.getBoundingClientRect();u.style.left=e.x+15+"px",e.y+3*t.renderer.lineHeight+15<n.bottom?(u.style.bottom="",u.style.top=e.y+15+"px"):(u.style.top="",u.style.bottom=n.bottom-e.y+5+"px")}var t=e.editor,n=t.renderer.$gutterLayer;e.editor.setDefaultHandler("guttermousedown",function(r){if(!t.isFocused())return;var i=n.getRegion(r);if(i=="foldWidgets")return;var s=r.getDocumentPosition().row,o=t.session.selection;if(r.getShiftKey())o.selectTo(s,0);else{if(r.domEvent.detail==2)return t.selectAll(),r.preventDefault();e.$clickSelection=t.selection.getLineRange(s)}return e.captureMouse(r,"selectByLines"),r.preventDefault()});var s,o,u,a;e.editor.setDefaultHandler("guttermousemove",function(t){var n=t.domEvent.target||t.domEvent.srcElement;if(r.hasCssClass(n,"ace_fold-widget"))return c();a&&h(t),o=t;if(s)return;s=setTimeout(function(){s=null,o&&!e.isMousePressed?l():c()},50)}),i.addListener(t.renderer.$gutter,"mouseout",function(e){o=null;if(!a||s)return;s=setTimeout(function(){s=null,c()},50)})}var r=e("../lib/dom"),i=e("../lib/event");t.GutterHandler=s});