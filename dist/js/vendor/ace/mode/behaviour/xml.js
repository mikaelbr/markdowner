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

define(["require","exports","module","../../lib/oop","../behaviour","./cstyle","../../token_iterator"],function(e,t,n){function u(e,t){var n=!0,r=e.type.split("."),i=t.split(".");return i.forEach(function(e){if(r.indexOf(e)==-1)return n=!1,!1}),n}var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("./cstyle").CstyleBehaviour,o=e("../../token_iterator").TokenIterator,a=function(){this.inherit(s,["string_dquotes"]),this.add("autoclosing","insertion",function(e,t,n,r,i){if(i==">"){var s=n.getCursorPosition(),a=new o(r,s.row,s.column),f=a.getCurrentToken(),l=!1;if(!f||!u(f,"meta.tag")&&(!u(f,"text")||!f.value.match("/"))){do f=a.stepBackward();while(f&&(u(f,"string")||u(f,"keyword.operator")||u(f,"entity.attribute-name")||u(f,"text")))}else l=!0;if(!f||!u(f,"meta.tag-name")||a.stepBackward().value.match("/"))return;var c=f.value;if(l)var c=c.substring(0,s.column-f.start);return{text:"></"+c+">",selection:[1,1]}}}),this.add("autoindent","insertion",function(e,t,n,r,i){if(i=="\n"){var s=n.getCursorPosition(),o=r.doc.getLine(s.row),u=o.substring(s.column,s.column+2);if(u=="</"){var a=this.$getIndent(r.doc.getLine(s.row))+r.getTabString(),f=this.$getIndent(r.doc.getLine(s.row));return{text:"\n"+a+"\n"+f,selection:[1,a.length,1,a.length]}}}})};r.inherits(a,i),t.XmlBehaviour=a});