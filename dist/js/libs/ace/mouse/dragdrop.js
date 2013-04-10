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

define(["require","exports","module","../lib/event"],function(e,t,n){var r=e("../lib/event"),i=function(e){function h(){u=t.selection.toOrientedRange(),n=t.session.addMarker(u,"ace_selection",t.getSelectionStyle()),t.clearSelection(),clearInterval(o),o=setInterval(c,20),f=0,r.addListener(document,"mousemove",v)}function p(){clearInterval(o),t.session.removeMarker(n),n=null,t.selection.fromOrientedRange(u),f=0,r.removeListener(document,"mousemove",v)}function v(){d==null&&(d=setTimeout(function(){d!=null&&n&&p()},20))}var t=e.editor,n,i,s,o,u,a,f=0,l=t.container;r.addListener(l,"dragenter",function(e){if(t.getReadOnly())return;var i=e.dataTransfer.types;if(i&&Array.prototype.indexOf.call(i,"text/plain")===-1)return;return n||h(),f++,r.preventDefault(e)}),r.addListener(l,"dragover",function(e){if(t.getReadOnly())return;var n=e.dataTransfer.types;if(n&&Array.prototype.indexOf.call(n,"text/plain")===-1)return;return d!==null&&(d=null),i=e.clientX,s=e.clientY,r.preventDefault(e)});var c=function(){a=t.renderer.screenToTextCoordinates(i,s),t.moveCursorToPosition(a),t.renderer.scrollCursorIntoView()};r.addListener(l,"dragleave",function(e){f--;if(f<=0&&n)return p(),r.preventDefault(e)}),r.addListener(l,"drop",function(e){if(!n)return;return u.end=t.session.insert(a,e.dataTransfer.getData("Text")),u.start=a,p(),t.focus(),r.preventDefault(e)});var d=null};t.DragdropHandler=i});