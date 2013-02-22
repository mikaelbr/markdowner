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

define(["require","exports","module"],function(e,t,n){function i(e){this.keymapping=this.$buildKeymappingRegex(e)}var r=!1;i.prototype={$buildKeymappingRegex:function(e){for(var t in e)this.$buildBindingsRegex(e[t]);return e},$buildBindingsRegex:function(e){e.forEach(function(e){e.key?e.key=new RegExp("^"+e.key+"$"):Array.isArray(e.regex)?("key"in e||(e.key=new RegExp("^"+e.regex[1]+"$")),e.regex=new RegExp(e.regex.join("")+"$")):e.regex&&(e.regex=new RegExp(e.regex+"$"))})},$composeBuffer:function(e,t,n,r){if(e.state==null||e.buffer==null)e.state="start",e.buffer="";var i=[];t&1&&i.push("ctrl"),t&8&&i.push("command"),t&2&&i.push("option"),t&4&&i.push("shift"),n&&i.push(n);var s=i.join("-"),o=e.buffer+s;t!=2&&(e.buffer=o);var u={bufferToUse:o,symbolicName:s};return r&&(u.keyIdentifier=r.keyIdentifier),u},$find:function(e,t,n,i,s,o){var u={};return this.keymapping[e.state].some(function(a){var f;if(a.key&&!a.key.test(n))return!1;if(a.regex&&!(f=a.regex.exec(t)))return!1;if(a.match&&!a.match(t,i,s,n,o))return!1;if(a.disallowMatches)for(var l=0;l<a.disallowMatches.length;l++)if(!!f[a.disallowMatches[l]])return!1;if(a.exec){u.command=a.exec;if(a.params){var c;u.args={},a.params.forEach(function(e){e.match!=null&&f!=null?c=f[e.match]||e.defaultValue:c=e.defaultValue,e.type==="number"&&(c=parseInt(c)),u.args[e.name]=c})}e.buffer=""}return a.then&&(e.state=a.then,e.buffer=""),u.command==null&&(u.command="null"),r&&console.log("KeyboardStateMapper#find",a),!0}),u.command?u:(e.buffer="",!1)},handleKeyboard:function(e,t,n,i,s){t==-1&&(t=0);if(t==0||n!=""&&n!=String.fromCharCode(0)){var o=this.$composeBuffer(e,t,n,s),u=o.bufferToUse,a=o.symbolicName,f=o.keyIdentifier;return o=this.$find(e,u,a,t,n,f),r&&console.log("KeyboardStateMapper#match",u,a,o),o}return null}},t.matchCharacterOnly=function(e,t,n,r){return t==0?!0:t==4&&n.length==1?!0:!1},t.StateHandler=i});