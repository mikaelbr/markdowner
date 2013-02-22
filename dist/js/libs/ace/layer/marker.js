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

define(["require","exports","module","../range","../lib/dom"],function(e,t,n){var r=e("../range").Range,i=e("../lib/dom"),s=function(e){this.element=i.createElement("div"),this.element.className="ace_layer ace_marker-layer",e.appendChild(this.element)};(function(){this.$padding=0,this.setPadding=function(e){this.$padding=e},this.setSession=function(e){this.session=e},this.setMarkers=function(e){this.markers=e},this.update=function(e){var e=e||this.config;if(!e)return;this.config=e;var t=[];for(var n in this.markers){var r=this.markers[n];if(!r.range){r.update(t,this,this.session,e);continue}var s=r.range.clipRows(e.firstRow,e.lastRow);if(s.isEmpty())continue;s=s.toScreenRange(this.session);if(r.renderer){var o=this.$getTop(s.start.row,e),u=this.$padding+s.start.column*e.characterWidth;r.renderer(t,s,u,o,e)}else r.type=="fullLine"?this.drawFullLineMarker(t,s,r.clazz,e):s.isMultiLine()?r.type=="text"?this.drawTextMarker(t,s,r.clazz,e):this.drawMultiLineMarker(t,s,r.clazz,e):this.drawSingleLineMarker(t,s,r.clazz+" ace_start",e)}this.element=i.setInnerHtml(this.element,t.join(""))},this.$getTop=function(e,t){return(e-t.firstRowScreen)*t.lineHeight},this.drawTextMarker=function(e,t,n,i){var s=t.start.row,o=new r(s,t.start.column,s,this.session.getScreenLastRowColumn(s));this.drawSingleLineMarker(e,o,n+" ace_start",i,1,"text"),s=t.end.row,o=new r(s,0,s,t.end.column),this.drawSingleLineMarker(e,o,n,i,0,"text");for(s=t.start.row+1;s<t.end.row;s++)o.start.row=s,o.end.row=s,o.end.column=this.session.getScreenLastRowColumn(s),this.drawSingleLineMarker(e,o,n,i,1,"text")},this.drawMultiLineMarker=function(e,t,n,r,i){var s=this.$padding,o=r.lineHeight,u=this.$getTop(t.start.row,r),a=s+t.start.column*r.characterWidth;e.push("<div class='",n," ace_start' style='","height:",o,"px;","right:0;","top:",u,"px;","left:",a,"px;'></div>"),u=this.$getTop(t.end.row,r);var f=t.end.column*r.characterWidth;e.push("<div class='",n,"' style='","height:",o,"px;","width:",f,"px;","top:",u,"px;","left:",s,"px;'></div>"),o=(t.end.row-t.start.row-1)*r.lineHeight;if(o<0)return;u=this.$getTop(t.start.row+1,r),e.push("<div class='",n,"' style='","height:",o,"px;","right:0;","top:",u,"px;","left:",s,"px;'></div>")},this.drawSingleLineMarker=function(e,t,n,r,i){var s=r.lineHeight,o=(t.end.column+(i||0)-t.start.column)*r.characterWidth,u=this.$getTop(t.start.row,r),a=this.$padding+t.start.column*r.characterWidth;e.push("<div class='",n,"' style='","height:",s,"px;","width:",o,"px;","top:",u,"px;","left:",a,"px;'></div>")},this.drawFullLineMarker=function(e,t,n,r){var i=this.$getTop(t.start.row,r),s=r.lineHeight;t.start.row!=t.end.row&&(s+=this.$getTop(t.end.row,r)-i),e.push("<div class='",n,"' style='","height:",s,"px;","top:",i,"px;","left:0;right:0;'></div>")}}).call(s.prototype),t.Marker=s});