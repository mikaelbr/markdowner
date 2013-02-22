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

define(["require","exports","module","./range","./lib/event_emitter","./lib/oop"],function(e,t,n){var r=e("./range").Range,i=e("./lib/event_emitter").EventEmitter,s=e("./lib/oop"),o=function(e,t,n,r,i,s){var o=this;this.length=t,this.session=e,this.doc=e.getDocument(),this.mainClass=i,this.othersClass=s,this.$onUpdate=this.onUpdate.bind(this),this.doc.on("change",this.$onUpdate),this.$others=r,this.$onCursorChange=function(){setTimeout(function(){o.onCursorChange()})},this.$pos=n;var u=e.getUndoManager().$undoStack||e.getUndoManager().$undostack||{length:-1};this.$undoStackDepth=u.length,this.setup(),e.selection.on("changeCursor",this.$onCursorChange)};(function(){s.implement(this,i),this.setup=function(){var e=this,t=this.doc,n=this.session,i=this.$pos;this.pos=t.createAnchor(i.row,i.column),this.markerId=n.addMarker(new r(i.row,i.column,i.row,i.column+this.length),this.mainClass,null,!1),this.pos.on("change",function(t){n.removeMarker(e.markerId),e.markerId=n.addMarker(new r(t.value.row,t.value.column,t.value.row,t.value.column+e.length),e.mainClass,null,!1)}),this.others=[],this.$others.forEach(function(n){var r=t.createAnchor(n.row,n.column);e.others.push(r)}),n.setUndoSelect(!1)},this.showOtherMarkers=function(){if(this.othersActive)return;var e=this.session,t=this;this.othersActive=!0,this.others.forEach(function(n){n.markerId=e.addMarker(new r(n.row,n.column,n.row,n.column+t.length),t.othersClass,null,!1),n.on("change",function(i){e.removeMarker(n.markerId),n.markerId=e.addMarker(new r(i.value.row,i.value.column,i.value.row,i.value.column+t.length),t.othersClass,null,!1)})})},this.hideOtherMarkers=function(){if(!this.othersActive)return;this.othersActive=!1;for(var e=0;e<this.others.length;e++)this.session.removeMarker(this.others[e].markerId)},this.onUpdate=function(e){var t=e.data,n=t.range;if(n.start.row!==n.end.row)return;if(n.start.row!==this.pos.row)return;if(this.$updating)return;this.$updating=!0;var i=t.action==="insertText"?n.end.column-n.start.column:n.start.column-n.end.column;if(n.start.column>=this.pos.column&&n.start.column<=this.pos.column+this.length+1){var s=n.start.column-this.pos.column;this.length+=i;if(!this.session.$fromUndo){if(t.action==="insertText")for(var o=this.others.length-1;o>=0;o--){var u=this.others[o],a={row:u.row,column:u.column+s};u.row===n.start.row&&n.start.column<u.column&&(a.column+=i),this.doc.insert(a,t.text)}else if(t.action==="removeText")for(var o=this.others.length-1;o>=0;o--){var u=this.others[o],a={row:u.row,column:u.column+s};u.row===n.start.row&&n.start.column<u.column&&(a.column+=i),this.doc.remove(new r(a.row,a.column,a.row,a.column-i))}n.start.column===this.pos.column&&t.action==="insertText"?setTimeout(function(){this.pos.setPosition(this.pos.row,this.pos.column-i);for(var e=0;e<this.others.length;e++){var t=this.others[e],r={row:t.row,column:t.column-i};t.row===n.start.row&&n.start.column<t.column&&(r.column+=i),t.setPosition(r.row,r.column)}}.bind(this),0):n.start.column===this.pos.column&&t.action==="removeText"&&setTimeout(function(){for(var e=0;e<this.others.length;e++){var t=this.others[e];t.row===n.start.row&&n.start.column<t.column&&t.setPosition(t.row,t.column-i)}}.bind(this),0)}this.pos._emit("change",{value:this.pos});for(var o=0;o<this.others.length;o++)this.others[o]._emit("change",{value:this.others[o]})}this.$updating=!1},this.onCursorChange=function(e){if(this.$updating)return;var t=this.session.selection.getCursor();t.row===this.pos.row&&t.column>=this.pos.column&&t.column<=this.pos.column+this.length?(this.showOtherMarkers(),this._emit("cursorEnter",e)):(this.hideOtherMarkers(),this._emit("cursorLeave",e))},this.detach=function(){this.session.removeMarker(this.markerId),this.hideOtherMarkers(),this.doc.removeEventListener("change",this.$onUpdate),this.session.selection.removeEventListener("changeCursor",this.$onCursorChange),this.pos.detach();for(var e=0;e<this.others.length;e++)this.others[e].detach();this.session.setUndoSelect(!0)},this.cancel=function(){if(this.$undoStackDepth===-1)throw Error("Canceling placeholders only supported with undo manager attached to session.");var e=this.session.getUndoManager(),t=(e.$undoStack||e.$undostack).length-this.$undoStackDepth;for(var n=0;n<t;n++)e.undo(!0)}}).call(o.prototype),t.PlaceHolder=o});