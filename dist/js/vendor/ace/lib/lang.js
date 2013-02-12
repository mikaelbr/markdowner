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

define(["require","exports","module"],function(e,t,n){t.stringReverse=function(e){return e.split("").reverse().join("")},t.stringRepeat=function(e,t){return(new Array(t+1)).join(e)};var r=/^\s\s*/,i=/\s\s*$/;t.stringTrimLeft=function(e){return e.replace(r,"")},t.stringTrimRight=function(e){return e.replace(i,"")},t.copyObject=function(e){var t={};for(var n in e)t[n]=e[n];return t},t.copyArray=function(e){var t=[];for(var n=0,r=e.length;n<r;n++)e[n]&&typeof e[n]=="object"?t[n]=this.copyObject(e[n]):t[n]=e[n];return t},t.deepCopy=function(e){if(typeof e!="object")return e;var t=e.constructor();for(var n in e)typeof e[n]=="object"?t[n]=this.deepCopy(e[n]):t[n]=e[n];return t},t.arrayToMap=function(e){var t={};for(var n=0;n<e.length;n++)t[e[n]]=1;return t},t.arrayRemove=function(e,t){for(var n=0;n<=e.length;n++)t===e[n]&&e.splice(n,1)},t.escapeRegExp=function(e){return e.replace(/([.*+?^${}()|[\]\/\\])/g,"\\$1")},t.getMatchOffsets=function(e,t){var n=[];return e.replace(t,function(e){n.push({offset:arguments[arguments.length-2],length:e.length})}),n},t.deferredCall=function(e){var t=null,n=function(){t=null,e()},r=function(e){return r.cancel(),t=setTimeout(n,e||0),r};return r.schedule=r,r.call=function(){return this.cancel(),e(),r},r.cancel=function(){return clearTimeout(t),t=null,r},r}});