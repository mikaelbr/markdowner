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

define(["require","exports","module","../lib/oop","../lib/event_emitter","../config"],function(e,t,n){var r=e("../lib/oop"),i=e("../lib/event_emitter").EventEmitter,s=e("../config"),o=function(t,n,r){this.changeListener=this.changeListener.bind(this);if(s.get("packaged"))this.$worker=new Worker(s.moduleUrl(n,"worker"));else{var i;typeof e.supports!="undefined"&&e.supports.indexOf("ucjs2-pinf-0")>=0?i=e.nameToUrl("ace/worker/worker_sourcemint"):(e.nameToUrl&&!e.toUrl&&(e.toUrl=e.nameToUrl),i=this.$normalizePath(e.toUrl("ace/worker/worker",null,"_"))),this.$worker=new Worker(i);var o={};for(var u=0;u<t.length;u++){var a=t[u],f=this.$normalizePath(e.toUrl(a,null,"_").replace(/.js(\?.*)?$/,""));o[a]=f}}this.$worker.postMessage({init:!0,tlns:o,module:n,classname:r}),this.callbackId=1,this.callbacks={};var l=this;this.$worker.onerror=function(e){throw window.console&&console.log&&console.log(e),e},this.$worker.onmessage=function(e){var t=e.data;switch(t.type){case"log":window.console&&console.log&&console.log(t.data);break;case"event":l._emit(t.name,{data:t.data});break;case"call":var n=l.callbacks[t.id];n&&(n(t.data),delete l.callbacks[t.id])}}};(function(){r.implement(this,i),this.$normalizePath=function(e){return e=e.replace(/^[a-z]+:\/\/[^\/]+/,""),e=location.protocol+"//"+location.host+(e.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+e.replace(/^[\/]+/,""),e},this.terminate=function(){this._emit("terminate",{}),this.$worker.terminate(),this.$worker=null,this.$doc.removeEventListener("change",this.changeListener),this.$doc=null},this.send=function(e,t){this.$worker.postMessage({command:e,args:t})},this.call=function(e,t,n){if(n){var r=this.callbackId++;this.callbacks[r]=n,t.push(r)}this.send(e,t)},this.emit=function(e,t){try{this.$worker.postMessage({event:e,data:{data:t.data}})}catch(n){}},this.attachToDocument=function(e){this.$doc&&this.terminate(),this.$doc=e,this.call("setValue",[e.getValue()]),e.on("change",this.changeListener)},this.changeListener=function(e){e.range={start:e.data.range.start,end:e.data.range.end},this.emit("change",e)}}).call(o.prototype),t.WorkerClient=o});