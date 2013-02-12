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
 *      Chris Spencer <chris.ag.spencer AT googlemail DOT com>
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

define(["require","exports","module","../../lib/oop","../behaviour/xml","./cstyle","../../token_iterator"],function(e,t,n){function a(e,t){var n=!0,r=e.type.split("."),i=t.split(".");return i.forEach(function(e){if(r.indexOf(e)==-1)return n=!1,!1}),n}var r=e("../../lib/oop"),i=e("../behaviour/xml").XmlBehaviour,s=e("./cstyle").CstyleBehaviour,o=e("../../token_iterator").TokenIterator,u=["area","base","br","col","command","embed","hr","img","input","keygen","link","meta","param","source","track","wbr"],f=function(){this.inherit(i),this.add("autoclosing","insertion",function(e,t,n,r,i){if(i==">"){var s=n.getCursorPosition(),f=new o(r,s.row,s.column),l=f.getCurrentToken(),c=!1;if(!l||!a(l,"meta.tag")&&(!a(l,"text")||!l.value.match("/"))){do l=f.stepBackward();while(l&&(a(l,"string")||a(l,"keyword.operator")||a(l,"entity.attribute-name")||a(l,"text")))}else c=!0;if(!l||!a(l,"meta.tag-name")||f.stepBackward().value.match("/"))return;var h=l.value;if(c)var h=h.substring(0,s.column-l.start);if(u.indexOf(h)!==-1)return;return{text:"></"+h+">",selection:[1,1]}}})};r.inherits(f,i),t.HtmlBehaviour=f});