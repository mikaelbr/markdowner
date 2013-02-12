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
 * The Original Code is Mozilla Skywriter.
 *
 * The Initial Developer of the Original Code is
 * Mozilla.
 * Portions created by the Initial Developer are Copyright (C) 2009
 * the Initial Developer. All Rights Reserved.
 *
 * Contributor(s):
 *   Julian Viereck (julian.viereck@gmail.com)
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

define(["require","exports","module"],function(e,t,n){function i(e){this.keymapping=this.$buildKeymappingRegex(e)}var r=!1;i.prototype={$buildKeymappingRegex:function(e){for(var t in e)this.$buildBindingsRegex(e[t]);return e},$buildBindingsRegex:function(e){e.forEach(function(e){e.key?e.key=new RegExp("^"+e.key+"$"):Array.isArray(e.regex)?("key"in e||(e.key=new RegExp("^"+e.regex[1]+"$")),e.regex=new RegExp(e.regex.join("")+"$")):e.regex&&(e.regex=new RegExp(e.regex+"$"))})},$composeBuffer:function(e,t,n,r){if(e.state==null||e.buffer==null)e.state="start",e.buffer="";var i=[];t&1&&i.push("ctrl"),t&8&&i.push("command"),t&2&&i.push("option"),t&4&&i.push("shift"),n&&i.push(n);var s=i.join("-"),o=e.buffer+s;t!=2&&(e.buffer=o);var u={bufferToUse:o,symbolicName:s};return r&&(u.keyIdentifier=r.keyIdentifier),u},$find:function(e,t,n,i,s,o){var u={};return this.keymapping[e.state].some(function(a){var f;if(a.key&&!a.key.test(n))return!1;if(a.regex&&!(f=a.regex.exec(t)))return!1;if(a.match&&!a.match(t,i,s,n,o))return!1;if(a.disallowMatches)for(var l=0;l<a.disallowMatches.length;l++)if(!!f[a.disallowMatches[l]])return!1;if(a.exec){u.command=a.exec;if(a.params){var c;u.args={},a.params.forEach(function(e){e.match!=null&&f!=null?c=f[e.match]||e.defaultValue:c=e.defaultValue,e.type==="number"&&(c=parseInt(c)),u.args[e.name]=c})}e.buffer=""}return a.then&&(e.state=a.then,e.buffer=""),u.command==null&&(u.command="null"),r&&console.log("KeyboardStateMapper#find",a),!0}),u.command?u:(e.buffer="",!1)},handleKeyboard:function(e,t,n,i,s){t==-1&&(t=0);if(t==0||n!=""&&n!=String.fromCharCode(0)){var o=this.$composeBuffer(e,t,n,s),u=o.bufferToUse,a=o.symbolicName,f=o.keyIdentifier;return o=this.$find(e,u,a,t,n,f),r&&console.log("KeyboardStateMapper#match",u,a,o),o}return null}},t.matchCharacterOnly=function(e,t,n,r){return t==0?!0:t==4&&n.length==1?!0:!1},t.StateHandler=i});