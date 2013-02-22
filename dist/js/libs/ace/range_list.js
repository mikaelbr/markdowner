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

define(["require","exports","module"],function(e,t,n){var r=function(){this.ranges=[]};(function(){this.comparePoints=function(e,t){return e.row-t.row||e.column-t.column},this.pointIndex=function(e,t){var n=this.ranges;for(var r=t||0;r<n.length;r++){var i=n[r],s=this.comparePoints(e,i.end);if(s>0)continue;return s==0?r:(s=this.comparePoints(e,i.start),s>=0?r:-r-1)}return-r-1},this.add=function(e){var t=this.pointIndex(e.start);t<0&&(t=-t-1);var n=this.pointIndex(e.end,t);return n<0?n=-n-1:n++,this.ranges.splice(t,n-t,e)},this.addList=function(e){var t=[];for(var n=e.length;n--;)t.push.call(t,this.add(e[n]));return t},this.substractPoint=function(e){var t=this.pointIndex(e);if(t>=0)return this.ranges.splice(t,1)},this.merge=function(){var e=[],t=this.ranges,n=t[0],r;for(var i=1;i<t.length;i++){r=n,n=t[i];var s=this.comparePoints(r.end,n.start);if(s<0)continue;if(s==0&&!r.isEmpty()&&!n.isEmpty())continue;this.comparePoints(r.end,n.end)<0&&(r.end.row=n.end.row,r.end.column=n.end.column),t.splice(i,1),e.push(n),n=r,i--}return e},this.contains=function(e,t){return this.pointIndex({row:e,column:t})>=0},this.containsPoint=function(e){return this.pointIndex(e)>=0},this.rangeAtPoint=function(e){var t=this.pointIndex(e);if(t>=0)return this.ranges[t]},this.clipRows=function(e,t){var n=this.ranges;if(n[0].start.row>t||n[n.length-1].start.row<e)return[];var r=this.pointIndex({row:e,column:0});r<0&&(r=-r-1);var i=this.pointIndex({row:t,column:0},r);i<0&&(i=-i-1);var s=[];for(var o=r;o<i;o++)s.push(n[o]);return s},this.removeAll=function(){return this.ranges.splice(0,this.ranges.length)},this.attach=function(e){this.session&&this.detach(),this.session=e,this.onChange=this.$onChange.bind(this),this.session.on("change",this.onChange)},this.detach=function(){if(!this.session)return;this.session.removeListener("change",this.onChange),this.session=null},this.$onChange=function(e){var t=e.data.range;if(e.data.action[0]=="i")var n=t.start,r=t.end;else var r=t.start,n=t.end;var i=n.row,s=r.row,o=s-i,u=-n.column+r.column,a=this.ranges;for(var f=0,l=a.length;f<l;f++){var c=a[f];if(c.end.row<i)continue;if(c.start.row>i)break;c.start.row==i&&c.start.column>=n.column&&(c.start.column+=u,c.start.row+=o),c.end.row==i&&c.end.column>=n.column&&(c.end.column+=u,c.end.row+=o)}if(o!=0&&f<l)for(;f<l;f++){var c=a[f];c.start.row+=o,c.end.row+=o}}}).call(r.prototype),t.RangeList=r});