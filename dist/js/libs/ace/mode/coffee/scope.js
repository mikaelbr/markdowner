/**
 * Copyright (c) 2009-2012 Jeremy Ashkenas
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 */

define(["require","exports","module","./helpers"],function(e,t,n){var r,i,s,o;o=e("./helpers"),i=o.extend,s=o.last,t.Scope=r=function(){function e(t,n,r){this.parent=t,this.expressions=n,this.method=r,this.variables=[{name:"arguments",type:"arguments"}],this.positions={},this.parent||(e.root=this)}return e.root=null,e.prototype.add=function(e,t,n){return this.shared&&!n?this.parent.add(e,t,n):Object.prototype.hasOwnProperty.call(this.positions,e)?this.variables[this.positions[e]].type=t:this.positions[e]=this.variables.push({name:e,type:t})-1},e.prototype.namedMethod=function(){return this.method.name||!this.parent?this.method:this.parent.namedMethod()},e.prototype.find=function(e){return this.check(e)?!0:(this.add(e,"var"),!1)},e.prototype.parameter=function(e){if(this.shared&&this.parent.check(e,!0))return;return this.add(e,"param")},e.prototype.check=function(e){var t;return!!(this.type(e)||((t=this.parent)!=null?t.check(e):void 0))},e.prototype.temporary=function(e,t){return e.length>1?"_"+e+(t>1?t-1:""):"_"+(t+parseInt(e,36)).toString(36).replace(/\d/g,"a")},e.prototype.type=function(e){var t,n,r,i;i=this.variables;for(n=0,r=i.length;n<r;n++){t=i[n];if(t.name===e)return t.type}return null},e.prototype.freeVariable=function(e,t){var n,r;t==null&&(t=!0),n=0;while(this.check(r=this.temporary(e,n)))n++;return t&&this.add(r,"var",!0),r},e.prototype.assign=function(e,t){return this.add(e,{value:t,assigned:!0},!0),this.hasAssignments=!0},e.prototype.hasDeclarations=function(){return!!this.declaredVariables().length},e.prototype.declaredVariables=function(){var e,t,n,r,i,s;e=[],t=[],s=this.variables;for(r=0,i=s.length;r<i;r++)n=s[r],n.type==="var"&&(n.name.charAt(0)==="_"?t:e).push(n.name);return e.sort().concat(t.sort())},e.prototype.assignedVariables=function(){var e,t,n,r,i;r=this.variables,i=[];for(t=0,n=r.length;t<n;t++)e=r[t],e.type.assigned&&i.push(""+e.name+" = "+e.type.value);return i},e}()});