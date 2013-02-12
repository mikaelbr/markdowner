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
 *      Julian Viereck <julian DOT viereck AT gmail DOT com>
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

define(["require","exports","module","../lib/dom","../lib/oop","../lib/event_emitter"],function(e,t,n){var r=e("../lib/dom"),i=e("../lib/oop"),s=e("../lib/event_emitter").EventEmitter,o=function(e){this.element=r.createElement("div"),this.element.className="ace_layer ace_gutter-layer",e.appendChild(this.element),this.setShowFoldWidgets(this.$showFoldWidgets),this.gutterWidth=0,this.$breakpoints=[],this.$annotations=[],this.$decorations=[]};(function(){i.implement(this,s),this.setSession=function(e){this.session=e},this.addGutterDecoration=function(e,t){this.$decorations[e]||(this.$decorations[e]=""),this.$decorations[e]+=" "+t},this.removeGutterDecoration=function(e,t){this.$decorations[e]=(this.$decorations[e]||"").replace(" "+t,"")},this.setAnnotations=function(e){this.$annotations=[];for(var t in e)if(e.hasOwnProperty(t)){var n=e[t];if(!n)continue;var r=this.$annotations[t]={text:[]};for(var i=0;i<n.length;i++){var s=n[i],o=s.text.replace(/"/g,"&quot;").replace(/'/g,"&#8217;").replace(/</,"&lt;");r.text.indexOf(o)===-1&&r.text.push(o);var u=s.type;u=="error"?r.className="ace_error":u=="warning"&&r.className!="ace_error"?r.className="ace_warning":u=="info"&&!r.className&&(r.className="ace_info")}}},this.update=function(e){this.$config=e;var t={className:"",text:[]},n=[],i=e.firstRow,s=e.lastRow,o=this.session.getNextFoldLine(i),u=o?o.start.row:Infinity,a=this.$showFoldWidgets&&this.session.foldWidgets,f=this.session.$breakpoints;for(;;){i>u&&(i=o.end.row+1,o=this.session.getNextFoldLine(i,o),u=o?o.start.row:Infinity);if(i>s)break;var l=this.$annotations[i]||t;n.push("<div class='ace_gutter-cell",this.$decorations[i]||"",f[i]?" ace_breakpoint ":" ",l.className,"' title='",l.text.join("\n"),"' style='height:",this.session.getRowLength(i)*e.lineHeight,"px;'>",i+1);if(a){var c=a[i];c==null&&(c=a[i]=this.session.getFoldWidget(i)),c&&n.push("<span class='ace_fold-widget ",c,c=="start"&&i==u&&i<o.end.row?" closed":" open","'></span>")}n.push("</div>"),i++}this.session.$useWrapMode&&n.push("<div class='ace_gutter-cell' style='pointer-events:none;opacity:0'>",this.session.getLength()-1,"</div>"),this.element=r.setInnerHtml(this.element,n.join("")),this.element.style.height=e.minHeight+"px";var h=this.element.offsetWidth;h!==this.gutterWidth&&(this.gutterWidth=h,this._emit("changeGutterWidth",h))},this.$showFoldWidgets=!0,this.setShowFoldWidgets=function(e){e?r.addCssClass(this.element,"ace_folding-enabled"):r.removeCssClass(this.element,"ace_folding-enabled"),this.$showFoldWidgets=e},this.getShowFoldWidgets=function(){return this.$showFoldWidgets}}).call(o.prototype),t.Gutter=o});