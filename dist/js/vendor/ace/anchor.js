/* ***** BEGIN LICENSE BLOCK *****
 * Version: MPL 1.1/GPL 2.0/LGPL 2.1
 *
 * The contents of this file are subject to the Mozilla Public License Version
 * 1.1 (the "License"); you may not use this file except in compliance with
 * the License. You may obtain a copy of the License at
 * http://www.mozilla.org/MPL/
 *
 * Software distributed under the License is distributed on an "AS IS" basis,
 * WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License
 * for the specific language governing rights and limitations under the
 * License.
 *
 * The Original Code is Ajax.org Code Editor (ACE).
 *
 * The Initial Developer of the Original Code is
 * Ajax.org B.V.
 * Portions created by the Initial Developer are Copyright (C) 2010
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *      Fabian Jakobs <fabian AT ajax DOT org>
 *
 * Alternatively, the contents of this file may be used under the terms of
 * either the GNU General Public License Version 2 or later (the "GPL"), or
 * the GNU Lesser General Public License Version 2.1 or later (the "LGPL"),
 * in which case the provisions of the GPL or the LGPL are applicable instead
 * of those above. If you wish to allow use of your version of this file only
 * under the terms of either the GPL or the LGPL, and not to allow others to
 * use your version of this file under the terms of the MPL, indicate your
 * decision by deleting the provisions above and replace them with the notice
 * and other provisions required by the GPL or the LGPL. If you do not delete
 * the provisions above, a recipient may use your version of this file under
 * the terms of any one of the MPL, the GPL or the LGPL.
 *
 * ***** END LICENSE BLOCK ***** */

define(["require","exports","module","./lib/oop","./lib/event_emitter"],function(e,t,n){var r=e("./lib/oop"),i=e("./lib/event_emitter").EventEmitter,s=t.Anchor=function(e,t,n){this.document=e,typeof n=="undefined"?this.setPosition(t.row,t.column):this.setPosition(t,n),this.$onChange=this.onChange.bind(this),e.on("change",this.$onChange)};(function(){r.implement(this,i),this.getPosition=function(){return this.$clipPositionToDocument(this.row,this.column)},this.getDocument=function(){return this.document},this.onChange=function(e){var t=e.data,n=t.range;if(n.start.row==n.end.row&&n.start.row!=this.row)return;if(n.start.row>this.row)return;if(n.start.row==this.row&&n.start.column>this.column)return;var r=this.row,i=this.column;t.action==="insertText"?n.start.row===r&&n.start.column<=i?n.start.row===n.end.row?i+=n.end.column-n.start.column:(i-=n.start.column,r+=n.end.row-n.start.row):n.start.row!==n.end.row&&n.start.row<r&&(r+=n.end.row-n.start.row):t.action==="insertLines"?n.start.row<=r&&(r+=n.end.row-n.start.row):t.action=="removeText"?n.start.row==r&&n.start.column<i?n.end.column>=i?i=n.start.column:i=Math.max(0,i-(n.end.column-n.start.column)):n.start.row!==n.end.row&&n.start.row<r?(n.end.row==r&&(i=Math.max(0,i-n.end.column)+n.start.column),r-=n.end.row-n.start.row):n.end.row==r&&(r-=n.end.row-n.start.row,i=Math.max(0,i-n.end.column)+n.start.column):t.action=="removeLines"&&n.start.row<=r&&(n.end.row<=r?r-=n.end.row-n.start.row:(r=n.start.row,i=0)),this.setPosition(r,i,!0)},this.setPosition=function(e,t,n){var r;n?r={row:e,column:t}:r=this.$clipPositionToDocument(e,t);if(this.row==r.row&&this.column==r.column)return;var i={row:this.row,column:this.column};this.row=r.row,this.column=r.column,this._emit("change",{old:i,value:r})},this.detach=function(){this.document.removeEventListener("change",this.$onChange)},this.$clipPositionToDocument=function(e,t){var n={};return e>=this.document.getLength()?(n.row=Math.max(0,this.document.getLength()-1),n.column=this.document.getLine(n.row).length):e<0?(n.row=0,n.column=0):(n.row=e,n.column=Math.min(this.document.getLine(n.row).length,Math.max(0,t))),t<0&&(n.column=0),n}}).call(s.prototype)});