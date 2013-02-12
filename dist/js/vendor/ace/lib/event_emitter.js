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
 *      Irakli Gozalishvili <rfobic@gmail.com> (http://jeditoolkit.com)
 *      Mike de Boer <mike AT ajax DOT org>
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

define(["require","exports","module"],function(e,t,n){var r={};r._emit=r._dispatchEvent=function(e,t){this._eventRegistry=this._eventRegistry||{},this._defaultHandlers=this._defaultHandlers||{};var n=this._eventRegistry[e]||[],r=this._defaultHandlers[e];if(!n.length&&!r)return;t=t||{},t.type=e,t.stopPropagation||(t.stopPropagation=function(){this.propagationStopped=!0}),t.preventDefault||(t.preventDefault=function(){this.defaultPrevented=!0});for(var i=0;i<n.length;i++){n[i](t);if(t.propagationStopped)break}if(r&&!t.defaultPrevented)return r(t)},r.setDefaultHandler=function(e,t){this._defaultHandlers=this._defaultHandlers||{};if(this._defaultHandlers[e])throw new Error("The default handler for '"+e+"' is already set");this._defaultHandlers[e]=t},r.on=r.addEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{};var n=this._eventRegistry[e];n||(n=this._eventRegistry[e]=[]),n.indexOf(t)==-1&&n.push(t)},r.removeListener=r.removeEventListener=function(e,t){this._eventRegistry=this._eventRegistry||{};var n=this._eventRegistry[e];if(!n)return;var r=n.indexOf(t);r!==-1&&n.splice(r,1)},r.removeAllListeners=function(e){this._eventRegistry&&(this._eventRegistry[e]=[])},t.EventEmitter=r});