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

define(["require","exports","module","./lib/fixoldbrowsers","./lib/dom","./lib/event","./editor","./edit_session","./undomanager","./virtual_renderer","./multi_select","./worker/worker_client","./keyboard/hash_handler","./placeholder","./mode/folding/fold_mode","./config"],function(e,t,n){e("./lib/fixoldbrowsers");var r=e("./lib/dom"),i=e("./lib/event"),s=e("./editor").Editor,o=e("./edit_session").EditSession,u=e("./undomanager").UndoManager,a=e("./virtual_renderer").VirtualRenderer,f=e("./multi_select").MultiSelect;e("./worker/worker_client"),e("./keyboard/hash_handler"),e("./placeholder"),e("./mode/folding/fold_mode"),t.config=e("./config"),t.require=e,t.edit=function(e){if(typeof e=="string"){var n=e,e=document.getElementById(n);if(!e)throw"ace.edit can't find div #"+n}if(e.env&&e.env.editor instanceof s)return e.env.editor;var o=t.createEditSession(r.getInnerText(e));e.innerHTML="";var u=new s(new a(e));new f(u),u.setSession(o);var l={document:o,editor:u,onResize:u.resize.bind(u)};return i.addListener(window,"resize",l.onResize),e.env=u.env=l,u},t.createEditSession=function(e,t){var n=new o(e,n);return n.setUndoManager(new u),n},t.EditSession=o,t.UndoManager=u});