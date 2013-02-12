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

define(["require","exports","module"],function(e,t,n){var r=t.MockRenderer=function(e){this.container=document.createElement("div"),this.visibleRowCount=e||20,this.layerConfig={firstVisibleRow:0,lastVisibleRow:this.visibleRowCount},this.isMockRenderer=!0,this.$gutter={}};r.prototype.getFirstVisibleRow=function(){return this.layerConfig.firstVisibleRow},r.prototype.getLastVisibleRow=function(){return this.layerConfig.lastVisibleRow},r.prototype.getFirstFullyVisibleRow=function(){return this.layerConfig.firstVisibleRow},r.prototype.getLastFullyVisibleRow=function(){return this.layerConfig.lastVisibleRow},r.prototype.getContainerElement=function(){return this.container},r.prototype.getMouseEventTarget=function(){return this.container},r.prototype.getTextAreaContainer=function(){return this.container},r.prototype.addGutterDecoration=function(){},r.prototype.removeGutterDecoration=function(){},r.prototype.moveTextAreaToCursor=function(){},r.prototype.setSession=function(e){this.session=e},r.prototype.getSession=function(e){return this.session},r.prototype.setTokenizer=function(){},r.prototype.on=function(){},r.prototype.updateCursor=function(){},r.prototype.animateScrolling=function(e,t){t&&t()},r.prototype.scrollToX=function(e){},r.prototype.scrollToY=function(e){},r.prototype.scrollToLine=function(e,t){var n={lineHeight:16},r=0;for(var i=1;i<e;i++)r+=this.session.getRowHeight(n,i-1)/n.lineHeight;t&&(r-=this.visibleRowCount/2),this.scrollToRow(r)},r.prototype.scrollSelectionIntoView=function(){},r.prototype.scrollCursorIntoView=function(){var e=this.session.getSelection().getCursor();e.row<this.layerConfig.firstVisibleRow?this.scrollToRow(e.row):e.row>this.layerConfig.lastVisibleRow&&this.scrollToRow(e.row)},r.prototype.scrollToRow=function(e){var e=Math.min(this.session.getLength()-this.visibleRowCount,Math.max(0,e));this.layerConfig.firstVisibleRow=e,this.layerConfig.lastVisibleRow=e+this.visibleRowCount},r.prototype.getScrollTopRow=function(){return this.layerConfig.firstVisibleRow},r.prototype.draw=function(){},r.prototype.updateLines=function(e,t){},r.prototype.updateBackMarkers=function(){},r.prototype.updateFrontMarkers=function(){},r.prototype.updateBreakpoints=function(){},r.prototype.onResize=function(){},r.prototype.updateFull=function(){},r.prototype.updateText=function(){},r.prototype.showCursor=function(){},r.prototype.visualizeFocus=function(){},r.prototype.setAnnotations=function(){},r.prototype.setStyle=function(){},r.prototype.unsetStyle=function(){},r.prototype.textToScreenCoordinates=function(){return{pageX:0,pageY:0}},r.prototype.adjustWrapLimit=function(){}});