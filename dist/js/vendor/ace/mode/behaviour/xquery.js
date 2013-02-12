/*
*  eXide - web-based XQuery IDE
*  
*  Copyright (C) 2011 Wolfgang Meier
*
*  This program is free software: you can redistribute it and/or modify
*  it under the terms of the GNU General Public License as published by
*  the Free Software Foundation, either version 3 of the License, or
*  (at your option) any later version.
*
*  This program is distributed in the hope that it will be useful,
*  but WITHOUT ANY WARRANTY; without even the implied warranty of
*  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
*  GNU General Public License for more details.
*
*  You should have received a copy of the GNU General Public License
*  along with this program.  If not, see <http://www.gnu.org/licenses/>.
*/

define(["require","exports","module","../../lib/oop","../behaviour","./cstyle"],function(e,t,n){var r=e("../../lib/oop"),i=e("../behaviour").Behaviour,s=e("./cstyle").CstyleBehaviour,o=function(e){this.inherit(s,["braces","parens","string_dquotes"]),this.parent=e,this.add("brackets","insertion",function(e,t,n,r,i){if(i=="\n"){var s=n.getCursorPosition(),o=r.doc.getLine(s.row),u=o.substring(s.column,s.column+2);if(u=="</"){var a=this.$getIndent(r.doc.getLine(s.row))+r.getTabString(),f=this.$getIndent(r.doc.getLine(s.row));return{text:"\n"+a+"\n"+f,selection:[1,a.length,1,a.length]}}}return!1}),this.add("slash","insertion",function(t,n,r,i,s){if(s=="/"){var o=r.getCursorPosition(),u=i.doc.getLine(o.row);if(o.column>0&&u.charAt(o.column-1)=="<"){u=u.substring(0,o.column)+"/"+u.substring(o.column);var a=i.doc.getAllLines();a[o.row]=u,e.exec("closeTag",a.join(i.doc.getNewLineCharacter()),o.row)}}return!1})};r.inherits(o,i),t.XQueryBehaviour=o});