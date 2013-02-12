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
 *   Fabian Jakobs <fabian AT ajax DOT org>
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

define(["require","exports","module","../lib/keys"],function(e,t,n){function i(e,t){this.platform=t,this.commands={},this.commmandKeyBinding={},this.addCommands(e)}var r=e("../lib/keys");(function(){this.addCommand=function(e){this.commands[e.name]&&this.removeCommand(e),this.commands[e.name]=e,e.bindKey&&this._buildKeyHash(e)},this.removeCommand=function(e){var t=typeof e=="string"?e:e.name;e=this.commands[t],delete this.commands[t];var n=this.commmandKeyBinding;for(var r in n)for(var i in n[r])n[r][i]==e&&delete n[r][i]},this.bindKey=function(e,t){if(!e)return;if(typeof t=="function"){this.addCommand({exec:t,bindKey:e,name:e});return}var n=this.commmandKeyBinding;e.split("|").forEach(function(e){var r=this.parseKeys(e,t),i=r.hashId;(n[i]||(n[i]={}))[r.key]=t},this)},this.addCommands=function(e){e&&Object.keys(e).forEach(function(t){var n=e[t];if(typeof n=="string")return this.bindKey(n,t);typeof n=="function"&&(n={exec:n}),n.name||(n.name=t),this.addCommand(n)},this)},this.removeCommands=function(e){Object.keys(e).forEach(function(t){this.removeCommand(e[t])},this)},this.bindKeys=function(e){Object.keys(e).forEach(function(t){this.bindKey(t,e[t])},this)},this._buildKeyHash=function(e){var t=e.bindKey;if(!t)return;var n=typeof t=="string"?t:t[this.platform];this.bindKey(n,e)},this.parseKeys=function(e){var t,n=0,i=e.toLowerCase().trim().split(/\s*\-\s*/);for(var s=0,o=i.length;s<o;s++)r.KEY_MODS[i[s]]?n|=r.KEY_MODS[i[s]]:t=i[s]||"-";return i[0]=="text"&&i.length==2&&(n=-1,t=i[1]),{key:t,hashId:n}},this.findKeyCommand=function(t,n){var r=this.commmandKeyBinding;return r[t]&&r[t][n.toLowerCase()]},this.handleKeyboard=function(e,t,n,r){return{command:this.findKeyCommand(t,n)}}}).call(i.prototype),t.HashHandler=i});