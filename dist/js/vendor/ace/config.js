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

define(["require","exports","module","./lib/lang"],function(e,t,n){"no use strict";function o(e){return e.replace(/-(.)/g,function(e,t){return t.toUpperCase()})}var r=e("./lib/lang"),i=function(){return this}(),s={packaged:!1,workerPath:"",modePath:"",themePath:"",suffix:".js",$moduleUrls:{}};t.get=function(e){if(!s.hasOwnProperty(e))throw new Error("Unknown config key: "+e);return s[e]},t.set=function(e,t){if(!s.hasOwnProperty(e))throw new Error("Unknown config key: "+e);s[e]=t},t.all=function(){return r.copyObject(s)},t.moduleUrl=function(e,t){if(s.$moduleUrls[e])return s.$moduleUrls[e];var n=e.split("/");t=t||n[n.length-2]||"";var r=n[n.length-1].replace(t,"").replace(/(^[\-_])|([\-_]$)/,"");return!r&&n.length>1&&(r=n[n.length-2]),this.get(t+"Path")+"/"+t+"-"+r+this.get("suffix")},t.setModuleUrl=function(e,t){return s.$moduleUrls[e]=t},t.init=function(){s.packaged=e.packaged||n.packaged||i.define&&define.packaged;if(!i.document)return"";var r={},u="",a=document.getElementsByTagName("script");for(var f=0;f<a.length;f++){var l=a[f],c=l.src||l.getAttribute("src");if(!c)continue;var h=l.attributes;for(var p=0,d=h.length;p<d;p++){var v=h[p];v.name.indexOf("data-ace-")===0&&(r[o(v.name.replace(/^data-ace-/,""))]=v.value)}var m=c.match(/^(.*)\/ace(\-\w+)?\.js(\?|$)/);m&&(u=m[1])}u&&(r.base=r.base||u,r.packaged=!0),r.workerPath=r.workerPath||r.base,r.modePath=r.modePath||r.base,r.themePath=r.themePath||r.base,delete r.base;for(var g in r)typeof r[g]!="undefined"&&t.set(g,r[g])}});