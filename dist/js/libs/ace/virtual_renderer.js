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

define(["require","exports","module","./lib/oop","./lib/dom","./lib/event","./lib/useragent","./config","./layer/gutter","./layer/marker","./layer/text","./layer/cursor","./scrollbar","./renderloop","./lib/event_emitter","./requirejs/text!./css/editor.css"],function(e,t,n){var r=e("./lib/oop"),i=e("./lib/dom"),s=e("./lib/event"),o=e("./lib/useragent"),u=e("./config"),a=e("./layer/gutter").Gutter,f=e("./layer/marker").Marker,l=e("./layer/text").Text,c=e("./layer/cursor").Cursor,h=e("./scrollbar").ScrollBar,p=e("./renderloop").RenderLoop,d=e("./lib/event_emitter").EventEmitter,v=e("./requirejs/text!./css/editor.css");i.importCssString(v,"ace_editor");var m=function(e,t){var n=this;this.container=e||i.createElement("div"),this.$keepTextAreaAtCursor=!o.isIE,i.addCssClass(this.container,"ace_editor"),this.setTheme(t),this.$gutter=i.createElement("div"),this.$gutter.className="ace_gutter",this.container.appendChild(this.$gutter),this.scroller=i.createElement("div"),this.scroller.className="ace_scroller",this.container.appendChild(this.scroller),this.content=i.createElement("div"),this.content.className="ace_content",this.scroller.appendChild(this.content),this.$gutterLayer=new a(this.$gutter),this.$gutterLayer.on("changeGutterWidth",this.onGutterResize.bind(this)),this.$markerBack=new f(this.content);var r=this.$textLayer=new l(this.content);this.canvas=r.element,this.$markerFront=new f(this.content),this.$cursorLayer=new c(this.content),this.$horizScroll=!1,this.scrollBar=new h(this.container),this.scrollBar.addEventListener("scroll",function(e){n.$inScrollAnimation||n.session.setScrollTop(e.data)}),this.scrollTop=0,this.scrollLeft=0,s.addListener(this.scroller,"scroll",function(){var e=n.scroller.scrollLeft;n.scrollLeft=e,n.session.setScrollLeft(e)}),this.cursorPos={row:0,column:0},this.$textLayer.addEventListener("changeCharacterSize",function(){n.updateCharacterSize(),n.onResize(!0)}),this.$size={width:0,height:0,scrollerHeight:0,scrollerWidth:0},this.layerConfig={width:1,padding:0,firstRow:0,firstRowScreen:0,lastRow:0,lineHeight:1,characterWidth:1,minHeight:1,maxHeight:1,offset:0,height:1},this.$loop=new p(this.$renderChanges.bind(this),this.container.ownerDocument.defaultView),this.$loop.schedule(this.CHANGE_FULL),this.updateCharacterSize(),this.setPadding(4),u.resetOptions(this),u._emit("renderer",this)};(function(){this.CHANGE_CURSOR=1,this.CHANGE_MARKER=2,this.CHANGE_GUTTER=4,this.CHANGE_SCROLL=8,this.CHANGE_LINES=16,this.CHANGE_TEXT=32,this.CHANGE_SIZE=64,this.CHANGE_MARKER_BACK=128,this.CHANGE_MARKER_FRONT=256,this.CHANGE_FULL=512,this.CHANGE_H_SCROLL=1024,r.implement(this,d),this.updateCharacterSize=function(){this.$textLayer.allowBoldFonts!=this.$allowBoldFonts&&(this.$allowBoldFonts=this.$textLayer.allowBoldFonts,this.setStyle("ace_nobold",!this.$allowBoldFonts)),this.characterWidth=this.$textLayer.getCharacterWidth(),this.lineHeight=this.$textLayer.getLineHeight(),this.$updatePrintMargin()},this.setSession=function(e){this.session=e,this.scroller.className="ace_scroller",this.$cursorLayer.setSession(e),this.$markerBack.setSession(e),this.$markerFront.setSession(e),this.$gutterLayer.setSession(e),this.$textLayer.setSession(e),this.$loop.schedule(this.CHANGE_FULL)},this.updateLines=function(e,t){t===undefined&&(t=Infinity),this.$changedLines?(this.$changedLines.firstRow>e&&(this.$changedLines.firstRow=e),this.$changedLines.lastRow<t&&(this.$changedLines.lastRow=t)):this.$changedLines={firstRow:e,lastRow:t};if(this.$changedLines.firstRow>this.layerConfig.lastRow||this.$changedLines.lastRow<this.layerConfig.firstRow)return;this.$loop.schedule(this.CHANGE_LINES)},this.onChangeTabSize=function(){this.$loop.schedule(this.CHANGE_TEXT|this.CHANGE_MARKER),this.$textLayer.onChangeTabSize()},this.updateText=function(){this.$loop.schedule(this.CHANGE_TEXT)},this.updateFull=function(e){e?this.$renderChanges(this.CHANGE_FULL,!0):this.$loop.schedule(this.CHANGE_FULL)},this.updateFontSize=function(){this.$textLayer.checkForSizeChanges()},this.onResize=function(e,t,n,r){var s=0,o=this.$size;if(this.resizing>2)return;this.resizing>1?this.resizing++:this.resizing=e?1:0,r||(r=i.getInnerHeight(this.container)),r&&(e||o.height!=r)&&(o.height=r,s=this.CHANGE_SIZE,o.scrollerHeight=this.scroller.clientHeight,o.scrollerHeight||(o.scrollerHeight=o.height,this.$horizScroll&&(o.scrollerHeight-=this.scrollBar.getWidth())),this.scrollBar.setHeight(o.scrollerHeight),this.session&&(this.session.setScrollTop(this.getScrollTop()),s|=this.CHANGE_FULL)),n||(n=i.getInnerWidth(this.container));if(n&&(e||this.resizing>1||o.width!=n)){s=this.CHANGE_SIZE,o.width=n;var t=this.$showGutter?this.$gutter.offsetWidth:0;this.scroller.style.left=t+"px",o.scrollerWidth=Math.max(0,n-t-this.scrollBar.getWidth()),this.scroller.style.right=this.scrollBar.getWidth()+"px";if(this.session.getUseWrapMode()&&this.adjustWrapLimit()||e)s|=this.CHANGE_FULL}if(!this.$size.scrollerHeight)return;e?this.$renderChanges(s,!0):this.$loop.schedule(s),e&&(this.$gutterLayer.$padding=null),e&&delete this.resizing},this.onGutterResize=function(){var e=this.$size.width,t=this.$showGutter?this.$gutter.offsetWidth:0;this.scroller.style.left=t+"px",this.$size.scrollerWidth=Math.max(0,e-t-this.scrollBar.getWidth()),this.session.getUseWrapMode()&&this.adjustWrapLimit()&&this.$loop.schedule(this.CHANGE_FULL)},this.adjustWrapLimit=function(){var e=this.$size.scrollerWidth-this.$padding*2,t=Math.floor(e/this.characterWidth);return this.session.adjustWrapLimit(t,this.$showPrintMargin&&this.$printMarginColumn)},this.setAnimatedScroll=function(e){this.setOption("animatedScroll",e)},this.getAnimatedScroll=function(){return this.$animatedScroll},this.setShowInvisibles=function(e){this.setOption("showInvisibles",e)},this.getShowInvisibles=function(){return this.getOption("showInvisibles")},this.getDisplayIndentGuides=function(){return this.getOption("displayIndentGuides")},this.setDisplayIndentGuides=function(e){this.setOption("displayIndentGuides",e)},this.setShowPrintMargin=function(e){this.setOption("showPrintMargin",e)},this.getShowPrintMargin=function(){return this.getOption("showPrintMargin")},this.setPrintMarginColumn=function(e){this.setOption("printMarginColumn",e)},this.getPrintMarginColumn=function(){return this.getOption("printMarginColumn")},this.getShowGutter=function(){return this.getOption("showGutter")},this.setShowGutter=function(e){return this.setOption("showGutter",e)},this.getFadeFoldWidgets=function(){return this.getOption("fadeFoldWidgets")},this.setFadeFoldWidgets=function(e){this.setOption("fadeFoldWidgets",e)},this.setHighlightGutterLine=function(e){this.setOption("highlightGutterLine",e)},this.getHighlightGutterLine=function(){return this.getOption("highlightGutterLine")},this.$updateGutterLineHighlight=function(){var e=this.$cursorLayer.$pixelPos,t=this.layerConfig.lineHeight;if(this.session.getUseWrapMode()){var n=this.session.selection.getCursor();n.column=0,e=this.$cursorLayer.getPixelPosition(n,!0),t*=this.session.getRowLength(n.row)}this.$gutterLineHighlight.style.top=e.top-this.layerConfig.offset+"px",this.$gutterLineHighlight.style.height=t+"px"},this.$updatePrintMargin=function(){if(!this.$showPrintMargin&&!this.$printMarginEl)return;if(!this.$printMarginEl){var e=i.createElement("div");e.className="ace_layer ace_print-margin-layer",this.$printMarginEl=i.createElement("div"),this.$printMarginEl.className="ace_print-margin",e.appendChild(this.$printMarginEl),this.content.insertBefore(e,this.content.firstChild)}var t=this.$printMarginEl.style;t.left=this.characterWidth*this.$printMarginColumn+this.$padding+"px",t.visibility=this.$showPrintMargin?"visible":"hidden",this.session&&this.session.$wrap==-1&&this.adjustWrapLimit()},this.getContainerElement=function(){return this.container},this.getMouseEventTarget=function(){return this.content},this.getTextAreaContainer=function(){return this.container},this.$moveTextAreaToCursor=function(){if(!this.$keepTextAreaAtCursor)return;var e=this.layerConfig,t=this.$cursorLayer.$pixelPos.top,n=this.$cursorLayer.$pixelPos.left;t-=e.offset;var r=this.lineHeight;if(t<0||t>e.height-r)return;var i=this.characterWidth;if(this.$composition){var s=this.textarea.value.replace(/^\x01+/,"");i*=this.session.$getStringScreenWidth(s)[0],r+=2,t-=1}n-=this.scrollLeft,n>this.$size.scrollerWidth-i&&(n=this.$size.scrollerWidth-i),n-=this.scrollBar.width,this.textarea.style.height=r+"px",this.textarea.style.width=i+"px",this.textarea.style.right=Math.max(0,this.$size.scrollerWidth-n-i)+"px",this.textarea.style.bottom=Math.max(0,this.$size.height-t-r)+"px"},this.getFirstVisibleRow=function(){return this.layerConfig.firstRow},this.getFirstFullyVisibleRow=function(){return this.layerConfig.firstRow+(this.layerConfig.offset===0?0:1)},this.getLastFullyVisibleRow=function(){var e=Math.floor((this.layerConfig.height+this.layerConfig.offset)/this.layerConfig.lineHeight);return this.layerConfig.firstRow-1+e},this.getLastVisibleRow=function(){return this.layerConfig.lastRow},this.$padding=null,this.setPadding=function(e){this.$padding=e,this.$textLayer.setPadding(e),this.$cursorLayer.setPadding(e),this.$markerFront.setPadding(e),this.$markerBack.setPadding(e),this.$loop.schedule(this.CHANGE_FULL),this.$updatePrintMargin()},this.getHScrollBarAlwaysVisible=function(){return this.$hScrollBarAlwaysVisible},this.setHScrollBarAlwaysVisible=function(e){this.setOption("hScrollBarAlwaysVisible",e)},this.$updateScrollBar=function(){this.scrollBar.setInnerHeight(this.layerConfig.maxHeight),this.scrollBar.setScrollTop(this.scrollTop)},this.$renderChanges=function(e,t){if(!t&&(!e||!this.session||!this.container.offsetWidth))return;this._signal("beforeRender"),(e&this.CHANGE_FULL||e&this.CHANGE_SIZE||e&this.CHANGE_TEXT||e&this.CHANGE_LINES||e&this.CHANGE_SCROLL)&&this.$computeLayerConfig();if(e&this.CHANGE_H_SCROLL){this.scroller.scrollLeft=this.scrollLeft;var n=this.scroller.scrollLeft;this.scrollLeft=n,this.session.setScrollLeft(n),this.scroller.className=this.scrollLeft==0?"ace_scroller":"ace_scroller ace_scroll-left"}if(e&this.CHANGE_FULL){this.$textLayer.checkForSizeChanges(),this.$updateScrollBar(),this.$textLayer.update(this.layerConfig),this.$showGutter&&this.$gutterLayer.update(this.layerConfig),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$moveTextAreaToCursor(),this.$highlightGutterLine&&this.$updateGutterLineHighlight(),this._signal("afterRender");return}if(e&this.CHANGE_SCROLL){e&this.CHANGE_TEXT||e&this.CHANGE_LINES?this.$textLayer.update(this.layerConfig):this.$textLayer.scrollLines(this.layerConfig),this.$showGutter&&this.$gutterLayer.update(this.layerConfig),this.$markerBack.update(this.layerConfig),this.$markerFront.update(this.layerConfig),this.$cursorLayer.update(this.layerConfig),this.$highlightGutterLine&&this.$updateGutterLineHighlight(),this.$moveTextAreaToCursor(),this.$updateScrollBar(),this._signal("afterRender");return}e&this.CHANGE_TEXT?(this.$textLayer.update(this.layerConfig),this.$showGutter&&this.$gutterLayer.update(this.layerConfig)):e&this.CHANGE_LINES?(this.$updateLines()||e&this.CHANGE_GUTTER&&this.$showGutter)&&this.$gutterLayer.update(this.layerConfig):(e&this.CHANGE_TEXT||e&this.CHANGE_GUTTER)&&this.$showGutter&&this.$gutterLayer.update(this.layerConfig),e&this.CHANGE_CURSOR&&(this.$cursorLayer.update(this.layerConfig),this.$moveTextAreaToCursor(),this.$highlightGutterLine&&this.$updateGutterLineHighlight()),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_FRONT)&&this.$markerFront.update(this.layerConfig),e&(this.CHANGE_MARKER|this.CHANGE_MARKER_BACK)&&this.$markerBack.update(this.layerConfig),e&this.CHANGE_SIZE&&this.$updateScrollBar(),this._signal("afterRender")},this.$computeLayerConfig=function(){if(!this.$size.scrollerHeight)return this.onResize(!0);var e=this.session,t=this.scrollTop%this.lineHeight,n=this.$size.scrollerHeight+this.lineHeight,r=this.$getLongestLine(),i=this.$hScrollBarAlwaysVisible||this.$size.scrollerWidth-r<0,s=this.$horizScroll!==i;this.$horizScroll=i,s&&(this.scroller.style.overflowX=i?"scroll":"hidden",i||this.session.setScrollLeft(0));var o=this.session.getScreenLength()*this.lineHeight;this.session.setScrollTop(Math.max(0,Math.min(this.scrollTop,o-this.$size.scrollerHeight)));var u=Math.ceil(n/this.lineHeight)-1,a=Math.max(0,Math.round((this.scrollTop-t)/this.lineHeight)),f=a+u,l,c,h=this.lineHeight;a=e.screenToDocumentRow(a,0);var p=e.getFoldLine(a);p&&(a=p.start.row),l=e.documentToScreenRow(a,0),c=e.getRowLength(a)*h,f=Math.min(e.screenToDocumentRow(f,0),e.getLength()-1),n=this.$size.scrollerHeight+e.getRowLength(f)*h+c,t=this.scrollTop-l*h,this.layerConfig={width:r,padding:this.$padding,firstRow:a,firstRowScreen:l,lastRow:f,lineHeight:h,characterWidth:this.characterWidth,minHeight:n,maxHeight:o,offset:t,height:this.$size.scrollerHeight},this.$gutterLayer.element.style.marginTop=-t+"px",this.content.style.marginTop=-t+"px",this.content.style.width=r+2*this.$padding+"px",this.content.style.height=n+"px",s&&this.onResize(!0)},this.$updateLines=function(){var e=this.$changedLines.firstRow,t=this.$changedLines.lastRow;this.$changedLines=null;var n=this.layerConfig;if(e>n.lastRow+1)return;if(t<n.firstRow)return;if(t===Infinity){this.$showGutter&&this.$gutterLayer.update(n),this.$textLayer.update(n);return}return this.$textLayer.updateLines(n,e,t),!0},this.$getLongestLine=function(){var e=this.session.getScreenWidth();return this.$textLayer.showInvisibles&&(e+=1),Math.max(this.$size.scrollerWidth-2*this.$padding,Math.round(e*this.characterWidth))},this.updateFrontMarkers=function(){this.$markerFront.setMarkers(this.session.getMarkers(!0)),this.$loop.schedule(this.CHANGE_MARKER_FRONT)},this.updateBackMarkers=function(){this.$markerBack.setMarkers(this.session.getMarkers()),this.$loop.schedule(this.CHANGE_MARKER_BACK)},this.addGutterDecoration=function(e,t){this.$gutterLayer.addGutterDecoration(e,t)},this.removeGutterDecoration=function(e,t){this.$gutterLayer.removeGutterDecoration(e,t)},this.updateBreakpoints=function(e){this.$loop.schedule(this.CHANGE_GUTTER)},this.setAnnotations=function(e){this.$gutterLayer.setAnnotations(e),this.$loop.schedule(this.CHANGE_GUTTER)},this.updateCursor=function(){this.$loop.schedule(this.CHANGE_CURSOR)},this.hideCursor=function(){this.$cursorLayer.hideCursor()},this.showCursor=function(){this.$cursorLayer.showCursor()},this.scrollSelectionIntoView=function(e,t,n){this.scrollCursorIntoView(e,n),this.scrollCursorIntoView(t,n)},this.scrollCursorIntoView=function(e,t){if(this.$size.scrollerHeight===0)return;var n=this.$cursorLayer.getPixelPosition(e),r=n.left,i=n.top;this.scrollTop>i?(t&&(i-=t*this.$size.scrollerHeight),this.session.setScrollTop(i)):this.scrollTop+this.$size.scrollerHeight<i+this.lineHeight&&(t&&(i+=t*this.$size.scrollerHeight),this.session.setScrollTop(i+this.lineHeight-this.$size.scrollerHeight));var s=this.scrollLeft;s>r?(r<this.$padding+2*this.layerConfig.characterWidth&&(r=0),this.session.setScrollLeft(r)):s+this.$size.scrollerWidth<r+this.characterWidth&&this.session.setScrollLeft(Math.round(r+this.characterWidth-this.$size.scrollerWidth))},this.getScrollTop=function(){return this.session.getScrollTop()},this.getScrollLeft=function(){return this.session.getScrollLeft()},this.getScrollTopRow=function(){return this.scrollTop/this.lineHeight},this.getScrollBottomRow=function(){return Math.max(0,Math.floor((this.scrollTop+this.$size.scrollerHeight)/this.lineHeight)-1)},this.scrollToRow=function(e){this.session.setScrollTop(e*this.lineHeight)},this.alignCursor=function(e,t){typeof e=="number"&&(e={row:e,column:0});var n=this.$cursorLayer.getPixelPosition(e),r=this.$size.scrollerHeight-this.lineHeight,i=n.top-r*(t||0);return this.session.setScrollTop(i),i},this.STEPS=8,this.$calcSteps=function(e,t){var n=0,r=this.STEPS,i=[],s=function(e,t,n){return n*(Math.pow(e-1,3)+1)+t};for(n=0;n<r;++n)i.push(s(n/this.STEPS,e,t-e));return i},this.scrollToLine=function(e,t,n,r){var i=this.$cursorLayer.getPixelPosition({row:e,column:0}),s=i.top;t&&(s-=this.$size.scrollerHeight/2);var o=this.scrollTop;this.session.setScrollTop(s),n!==!1&&this.animateScrolling(o,r)},this.animateScrolling=function(e,t){var n=this.scrollTop;if(this.$animatedScroll&&Math.abs(e-n)<1e5){var r=this,i=r.$calcSteps(e,n);this.$inScrollAnimation=!0,clearInterval(this.$timer),r.session.setScrollTop(i.shift()),this.$timer=setInterval(function(){i.length?(r.session.setScrollTop(i.shift()),r.session.$scrollTop=n):n!=null?(r.session.$scrollTop=-1,r.session.setScrollTop(n),n=null):(r.$timer=clearInterval(r.$timer),r.$inScrollAnimation=!1,t&&t())},10)}},this.scrollToY=function(e){this.scrollTop!==e&&(this.$loop.schedule(this.CHANGE_SCROLL),this.scrollTop=e)},this.scrollToX=function(e){e<0&&(e=0),this.scrollLeft!==e&&(this.scrollLeft=e),this.$loop.schedule(this.CHANGE_H_SCROLL)},this.scrollBy=function(e,t){t&&this.session.setScrollTop(this.session.getScrollTop()+t),e&&this.session.setScrollLeft(this.session.getScrollLeft()+e)},this.isScrollableBy=function(e,t){if(t<0&&this.session.getScrollTop()>=1)return!0;if(t>0&&this.session.getScrollTop()+this.$size.scrollerHeight-this.layerConfig.maxHeight<-1)return!0},this.pixelToScreenCoordinates=function(e,t){var n=this.scroller.getBoundingClientRect(),r=(e+this.scrollLeft-n.left-this.$padding)/this.characterWidth,i=Math.floor((t+this.scrollTop-n.top)/this.lineHeight),s=Math.round(r);return{row:i,column:s,side:r-s>0?1:-1}},this.screenToTextCoordinates=function(e,t){var n=this.scroller.getBoundingClientRect(),r=Math.round((e+this.scrollLeft-n.left-this.$padding)/this.characterWidth),i=Math.floor((t+this.scrollTop-n.top)/this.lineHeight);return this.session.screenToDocumentPosition(i,Math.max(r,0))},this.textToScreenCoordinates=function(e,t){var n=this.scroller.getBoundingClientRect(),r=this.session.documentToScreenPosition(e,t),i=this.$padding+Math.round(r.column*this.characterWidth),s=r.row*this.lineHeight;return{pageX:n.left+i-this.scrollLeft,pageY:n.top+s-this.scrollTop}},this.visualizeFocus=function(){i.addCssClass(this.container,"ace_focus")},this.visualizeBlur=function(){i.removeCssClass(this.container,"ace_focus")},this.showComposition=function(e){this.$composition||(this.$composition={keepTextAreaAtCursor:this.$keepTextAreaAtCursor,cssText:this.textarea.style.cssText}),this.$keepTextAreaAtCursor=!0,i.addCssClass(this.textarea,"ace_composition"),this.textarea.style.cssText="",this.$moveTextAreaToCursor()},this.setCompositionText=function(e){this.$moveTextAreaToCursor()},this.hideComposition=function(){if(!this.$composition)return;i.removeCssClass(this.textarea,"ace_composition"),this.$keepTextAreaAtCursor=this.$composition.keepTextAreaAtCursor,this.textarea.style.cssText=this.$composition.cssText,this.$composition=null},this.setTheme=function(e){function r(e){if(!e.cssClass)return;i.importCssString(e.cssText,e.cssClass,t.container.ownerDocument),t.theme&&i.removeCssClass(t.container,t.theme.cssClass),t.$theme=e.cssClass,t.theme=e,i.addCssClass(t.container,e.cssClass),i.setCssClass(t.container,"ace_dark",e.isDark);var n=e.padding||4;t.$padding&&n!=t.$padding&&t.setPadding(n),t.$size&&(t.$size.width=0,t.onResize()),t._dispatchEvent("themeLoaded",{theme:e})}var t=this;this.$themeValue=e,t._dispatchEvent("themeChange",{theme:e});if(!e||typeof e=="string"){var n=e||"ace/theme/textmate";u.loadModule(["theme",n],r)}else r(e)},this.getTheme=function(){return this.$themeValue},this.setStyle=function(t,n){i.setCssClass(this.container,t,n!=0)},this.unsetStyle=function(t){i.removeCssClass(this.container,t)},this.destroy=function(){this.$textLayer.destroy(),this.$cursorLayer.destroy()}}).call(m.prototype),u.defineOptions(m.prototype,"renderer",{animatedScroll:{initialValue:!1},showInvisibles:{set:function(e){this.$textLayer.setShowInvisibles(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!1},showPrintMargin:{set:function(){this.$updatePrintMargin()},initialValue:!0},printMarginColumn:{set:function(){this.$updatePrintMargin()},initialValue:80},printMargin:{set:function(e){typeof e=="number"&&(this.$printMarginColumn=e),this.$showPrintMargin=!!e,this.$updatePrintMargin()},get:function(){return this.$showPrintMargin&&this.$printMarginColumn}},showGutter:{set:function(e){this.$gutter.style.display=e?"block":"none",this.onGutterResize()},initialValue:!0},fadeFoldWidgets:{set:function(e){i.setCssClass(this.$gutter,"ace_fade-fold-widgets",e)},initialValue:!1},showFoldWidgets:{set:function(e){this.$gutterLayer.setShowFoldWidgets(e)},initialValue:!0},displayIndentGuides:{set:function(e){this.$textLayer.setDisplayIndentGuides(e)&&this.$loop.schedule(this.CHANGE_TEXT)},initialValue:!0},highlightGutterLine:{set:function(e){if(!this.$gutterLineHighlight){this.$gutterLineHighlight=i.createElement("div"),this.$gutterLineHighlight.className="ace_gutter-active-line",this.$gutter.appendChild(this.$gutterLineHighlight);return}this.$gutterLineHighlight.style.display=e?"":"none",this.$cursorLayer.$pixelPos&&this.$updateGutterLineHighlight()},initialValue:!1,value:!0},hScrollBarAlwaysVisible:{set:function(e){this.$hScrollBarAlwaysVisible=e,(!this.$hScrollBarAlwaysVisible||!this.$horizScroll)&&this.$loop.schedule(this.CHANGE_SCROLL)},initialValue:!1},fontSize:{set:function(e){typeof e=="number"&&(e+="px"),this.container.style.fontSize=e,this.updateFontSize()},initialValue:12},fontFamily:{set:function(e){this.container.style.fontFamily=e,this.updateFontSize()}}}),t.VirtualRenderer=m});