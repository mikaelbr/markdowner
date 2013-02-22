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

define(["require","exports","module","../lib/oop","../lib/event_emitter","../config"],function(e,t,n){var r=e("../lib/oop"),i=e("../lib/event_emitter").EventEmitter,s=e("../config"),o=function(t,n,r){this.changeListener=this.changeListener.bind(this),this.onMessage=this.onMessage.bind(this),this.onError=this.onError.bind(this);var i;if(s.get("packaged"))i=s.moduleUrl(n,"worker");else{var o=this.$normalizePath;typeof e.supports!="undefined"&&e.supports.indexOf("ucjs2-pinf-0")>=0?i=e.nameToUrl("ace/worker/worker_sourcemint"):(e.nameToUrl&&!e.toUrl&&(e.toUrl=e.nameToUrl),i=o(e.toUrl("ace/worker/worker",null,"_")));var u={};t.forEach(function(t){u[t]=o(e.toUrl(t,null,"_").replace(/.js(\?.*)?$/,""))})}this.$worker=new Worker(i),this.$worker.postMessage({init:!0,tlns:u,module:n,classname:r}),this.callbackId=1,this.callbacks={},this.$worker.onerror=this.onError,this.$worker.onmessage=this.onMessage};(function(){r.implement(this,i),this.onError=function(e){throw window.console&&console.log&&console.log(e),e},this.onMessage=function(e){var t=e.data;switch(t.type){case"log":window.console&&console.log&&console.log.apply(console,t.data);break;case"event":this._emit(t.name,{data:t.data});break;case"call":var n=this.callbacks[t.id];n&&(n(t.data),delete this.callbacks[t.id])}},this.$normalizePath=function(e){return location.host?(e=e.replace(/^[a-z]+:\/\/[^\/]+/,""),e=location.protocol+"//"+location.host+(e.charAt(0)=="/"?"":location.pathname.replace(/\/[^\/]*$/,""))+"/"+e.replace(/^[\/]+/,""),e):e},this.terminate=function(){this._emit("terminate",{}),this.$worker.terminate(),this.$worker=null,this.$doc.removeEventListener("change",this.changeListener),this.$doc=null},this.send=function(e,t){this.$worker.postMessage({command:e,args:t})},this.call=function(e,t,n){if(n){var r=this.callbackId++;this.callbacks[r]=n,t.push(r)}this.send(e,t)},this.emit=function(e,t){try{this.$worker.postMessage({event:e,data:{data:t.data}})}catch(n){}},this.attachToDocument=function(e){this.$doc&&this.terminate(),this.$doc=e,this.call("setValue",[e.getValue()]),e.on("change",this.changeListener)},this.changeListener=function(e){e.range={start:e.data.range.start,end:e.data.range.end},this.emit("change",e)}}).call(o.prototype);var u=function(t,n,r){this.changeListener=this.changeListener.bind(this),this.callbackId=1,this.callbacks={},this.messageBuffer=[];var s=null,o=Object.create(i),u=this;this.$worker={},this.$worker.terminate=function(){},this.$worker.postMessage=function(e){u.messageBuffer.push(e),s&&setTimeout(a)};var a=function(){var e=u.messageBuffer.shift();e.command?s[e.command].apply(s,e.args):e.event&&o._emit(e.event,e.data)};o.postMessage=function(e){u.onMessage({data:e})},o.callback=function(e,t){this.postMessage({type:"call",id:t,data:e})},o.emit=function(e,t){this.postMessage({type:"event",name:e,data:t})},e([n],function(e){s=new e[r](o);while(u.messageBuffer.length)a()})};u.prototype=o.prototype,t.UIWorkerClient=u,t.WorkerClient=o});