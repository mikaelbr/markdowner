/* vim:ts=4:sts=4:sw=4:
 * ***** BEGIN LICENSE BLOCK *****
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
 *      Julian Viereck <julian.viereck@gmail.com>
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

define(["require","exports","module","../lib/dom"],function(e,t,n){var r=e("../lib/dom"),i=function(e){this.element=r.createElement("div"),this.element.className="ace_layer ace_cursor-layer",e.appendChild(this.element),this.isVisible=!1,this.cursors=[],this.cursor=this.addCursor()};(function(){this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.addCursor=function(){var e=r.createElement("div"),t="ace_cursor";return this.isVisible||(t+=" ace_hidden"),this.overwrite&&(t+=" ace_overwrite"),e.className=t,this.element.appendChild(e),this.cursors.push(e),e},this.removeCursor=function(){if(this.cursors.length>1){var e=this.cursors.pop();return e.parentNode.removeChild(e),e}},this.hideCursor=function(){this.isVisible=!1;for(var e=this.cursors.length;e--;)r.addCssClass(this.cursors[e],"ace_hidden");clearInterval(this.blinkId)},this.showCursor=function(){this.isVisible=!0;for(var e=this.cursors.length;e--;)r.removeCssClass(this.cursors[e],"ace_hidden");this.element.style.visibility="",this.restartTimer()},this.restartTimer=function(){clearInterval(this.blinkId);if(!this.isVisible)return;var e=this.cursors.length==1?this.cursor:this.element;this.blinkId=setInterval(function(){e.style.visibility="hidden",setTimeout(function(){e.style.visibility=""},400)},1e3)},this.getPixelPosition=function(e,t){if(!this.config||!this.session)return{left:0,top:0};e||(e=this.session.selection.getCursor());var n=this.session.documentToScreenPosition(e),r=Math.round(this.$padding+n.column*this.config.characterWidth),i=(n.row-(t?this.config.firstRowScreen:0))*this.config.lineHeight;return{left:r,top:i}},this.update=function(e){this.config=e;if(this.session.selectionMarkerCount>0){var t=this.session.$selectionMarkers,n=0,r,i=0;for(var n=t.length;n--;){r=t[n];var s=this.getPixelPosition(r.cursor,!0),o=(this.cursors[i++]||this.addCursor()).style;o.left=s.left+"px",o.top=s.top+"px",o.width=e.characterWidth+"px",o.height=e.lineHeight+"px"}if(i>1)while(this.cursors.length>i)this.removeCursor()}else{var s=this.getPixelPosition(null,!0),o=this.cursor.style;o.left=s.left+"px",o.top=s.top+"px",o.width=e.characterWidth+"px",o.height=e.lineHeight+"px";while(this.cursors.length>1)this.removeCursor()}var u=this.session.getOverwrite();u!=this.overwrite&&this.$setOverite(u),this.$pixelPos=s,this.restartTimer()},this.$setOverite=function(e){this.overwrite=e;for(var t=this.cursors.length;t--;)e?r.addCssClass(this.cursors[t],"ace_overwrite"):r.removeCssClass(this.cursors[t],"ace_overwrite")},this.destroy=function(){clearInterval(this.blinkId)}}).call(i.prototype),t.Cursor=i});