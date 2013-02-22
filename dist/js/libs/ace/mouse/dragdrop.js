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

define(["require","exports","module","../lib/event"],function(e,t,n){var r=e("../lib/event"),i=function(e){var t=e.editor,n,i,s,o,u,a,f,l=0,c=t.container;r.addListener(c,"dragenter",function(e){if(t.getReadOnly())return;l++;if(!n){u=t.getSelectionRange(),a=t.selection.isBackwards();var i=t.getSelectionStyle();n=t.session.addMarker(u,"ace_selection",i),t.clearSelection(),clearInterval(o),o=setInterval(h,20)}return r.preventDefault(e)}),r.addListener(c,"dragover",function(e){if(t.getReadOnly())return;return i=e.clientX,s=e.clientY,r.preventDefault(e)});var h=function(){f=t.renderer.screenToTextCoordinates(i,s),t.moveCursorToPosition(f),t.renderer.scrollCursorIntoView()};r.addListener(c,"dragleave",function(e){if(t.getReadOnly())return;l--;if(l>0)return;return clearInterval(o),t.session.removeMarker(n),n=null,t.selection.setSelectionRange(u,a),r.preventDefault(e)}),r.addListener(c,"drop",function(e){if(t.getReadOnly())return;return l=0,clearInterval(o),t.session.removeMarker(n),n=null,u.end=t.session.insert(f,e.dataTransfer.getData("Text")),u.start=f,t.focus(),t.selection.setSelectionRange(u),r.preventDefault(e)})};t.DragdropHandler=i});