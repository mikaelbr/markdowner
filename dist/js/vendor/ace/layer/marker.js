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

define(["require","exports","module","../range","../lib/dom"],function(e,t,n){var r=e("../range").Range,i=e("../lib/dom"),s=function(e){this.element=i.createElement("div"),this.element.className="ace_layer ace_marker-layer",e.appendChild(this.element)};(function(){this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setMarkers=function(e){this.markers=e},this.update=function(e){var e=e||this.config;if(!e)return;this.config=e;var t=[];for(var n in this.markers){var r=this.markers[n];if(!r.range){r.update(t,this,this.session,e);continue}var s=r.range.clipRows(e.firstRow,e.lastRow);if(s.isEmpty())continue;s=s.toScreenRange(this.session);if(r.renderer){var o=this.$getTop(s.start.row,e),u=Math.round(this.$padding+s.start.column*e.characterWidth);r.renderer(t,s,u,o,e)}else s.isMultiLine()?r.type=="text"?this.drawTextMarker(t,s,r.clazz,e):this.drawMultiLineMarker(t,s,r.clazz,e,r.type):this.drawSingleLineMarker(t,s,r.clazz+" start",e,null,r.type)}this.element=i.setInnerHtml(this.element,t.join(""))},this.$getTop=function(e,t){return(e-t.firstRowScreen)*t.lineHeight},this.drawTextMarker=function(e,t,n,i){var s=t.start.row,o=new r(s,t.start.column,s,this.session.getScreenLastRowColumn(s));this.drawSingleLineMarker(e,o,n+" start",i,1,"text"),s=t.end.row,o=new r(s,0,s,t.end.column),this.drawSingleLineMarker(e,o,n,i,0,"text");for(s=t.start.row+1;s<t.end.row;s++)o.start.row=s,o.end.row=s,o.end.column=this.session.getScreenLastRowColumn(s),this.drawSingleLineMarker(e,o,n,i,1,"text")},this.drawMultiLineMarker=function(e,t,n,r,i){var s=i==="background"?0:this.$padding,o=r.lineHeight,u=this.$getTop(t.start.row,r),a=Math.round(s+t.start.column*r.characterWidth);e.push("<div class='",n," start' style='","height:",o,"px;","right:0;","top:",u,"px;","left:",a,"px;'></div>"),u=this.$getTop(t.end.row,r);var f=Math.round(t.end.column*r.characterWidth);e.push("<div class='",n,"' style='","height:",o,"px;","width:",f,"px;","top:",u,"px;","left:",s,"px;'></div>"),o=(t.end.row-t.start.row-1)*r.lineHeight;if(o<0)return;u=this.$getTop(t.start.row+1,r),e.push("<div class='",n,"' style='","height:",o,"px;","right:0;","top:",u,"px;","left:",s,"px;'></div>")},this.drawSingleLineMarker=function(e,t,n,r,i,s){var o=s==="background"?0:this.$padding,u=r.lineHeight;if(s==="background")var a=r.width;else a=Math.round((t.end.column+(i||0)-t.start.column)*r.characterWidth);var f=this.$getTop(t.start.row,r),l=Math.round(o+t.start.column*r.characterWidth);e.push("<div class='",n,"' style='","height:",u,"px;","width:",a,"px;","top:",f,"px;","left:",l,"px;'></div>")}}).call(s.prototype),t.Marker=s});