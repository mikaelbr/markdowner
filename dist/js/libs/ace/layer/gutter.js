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

define(["require","exports","module","../lib/dom","../lib/oop","../lib/lang","../lib/event_emitter"],function(e,t,n){var r=e("../lib/dom"),i=e("../lib/oop"),s=e("../lib/lang"),o=e("../lib/event_emitter").EventEmitter,u=function(e){this.element=r.createElement("div"),this.element.className="ace_layer ace_gutter-layer",e.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.gutterWidth=0,this.$annotations=[],this.$updateAnnotations=this.$updateAnnotations.bind(this)};(function(){i.implement(this,o),this.setSession=function(e){this.session&&this.session.removeEventListener("change",this.$updateAnnotations),this.session=e,e.on("change",this.$updateAnnotations)},this.addGutterDecoration=function(e,t){window.console&&console.warn&&console.warn("deprecated use session.addGutterDecoration"),this.session.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){window.console&&console.warn&&console.warn("deprecated use session.removeGutterDecoration"),this.session.removeGutterDecoration(e,t)},this.setAnnotations=function(e){this.$annotations=[];var t,n;for(var r=0;r<e.length;r++){var i=e[r],n=i.row,t=this.$annotations[n];t||(t=this.$annotations[n]={text:[]});var o=i.text;o=o?s.escapeHTML(o):i.html||"",t.text.indexOf(o)===-1&&t.text.push(o);var u=i.type;u=="error"?t.className=" ace_error":u=="warning"&&t.className!=" ace_error"?t.className=" ace_warning":u=="info"&&!t.className&&(t.className=" ace_info")}},this.$updateAnnotations=function(e){if(!this.$annotations.length)return;var t=e.data,n=t.range,r=n.start.row,i=n.end.row-r;if(i!==0)if(t.action=="removeText"||t.action=="removeLines")this.$annotations.splice(r,i+1,null);else{var s=Array(i+1);s.unshift(r,1),this.$annotations.splice.apply(this.$annotations,s)}},this.update=function(e){var t={className:""},n=[],i=e.firstRow,s=e.lastRow,o=this.session.getNextFoldLine(i),u=o?o.start.row:Infinity,a=this.$showFoldWidgets&&this.session.foldWidgets,f=this.session.$breakpoints,l=this.session.$decorations,c=this.session.$firstLineNumber,h=0;for(;;){i>u&&(i=o.end.row+1,o=this.session.getNextFoldLine(i,o),u=o?o.start.row:Infinity);if(i>s)break;var p=this.$annotations[i]||t;n.push("<div class='ace_gutter-cell ",f[i]||"",l[i]||"",p.className,"' style='height:",this.session.getRowLength(i)*e.lineHeight,"px;'>",h=i+c);if(a){var d=a[i];d==null&&(d=a[i]=this.session.getFoldWidget(i)),d&&n.push("<span class='ace_fold-widget ace_",d,d=="start"&&i==u&&i<o.end.row?" ace_closed":" ace_open","' style='height:",e.lineHeight,"px","'></span>")}n.push("</div>"),i++}this.element=r.setInnerHtml(this.element,n.join("")),this.element.style.height=e.minHeight+"px",this.session.$useWrapMode&&(h=this.session.getLength());var v=(""+h).length*e.characterWidth,m=this.$padding||this.$computePadding();v+=m.left+m.right,v!==this.gutterWidth&&(this.gutterWidth=v,this.element.style.width=Math.ceil(this.gutterWidth)+"px",this._emit("changeGutterWidth",v))},this.$showFoldWidgets=!0,this.setShowFoldWidgets=function(e){e?r.addCssClass(this.element,"ace_folding-enabled"):r.removeCssClass(this.element,"ace_folding-enabled"),this.$showFoldWidgets=e,this.$padding=null},this.getShowFoldWidgets=function(){return this.$showFoldWidgets},this.$computePadding=function(){if(!this.element.firstChild)return{left:0,right:0};var e=r.computedStyle(this.element.firstChild);return this.$padding={},this.$padding.left=parseInt(e.paddingLeft)+1,this.$padding.right=parseInt(e.paddingRight),this.$padding},this.getRegion=function(e){var t=this.$padding||this.$computePadding(),n=this.element.getBoundingClientRect();if(e.x<t.left+n.left)return"markers";if(this.$showFoldWidgets&&e.x>n.right-t.right)return"foldWidgets"}}).call(u.prototype),t.Gutter=u});