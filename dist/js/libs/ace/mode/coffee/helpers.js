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

define(["require","exports","module"],function(e,t,n){var r,i,s;t.starts=function(e,t,n){return t===e.substr(n,t.length)},t.ends=function(e,t,n){var r;return r=t.length,t===e.substr(e.length-r-(n||0),r)},t.compact=function(e){var t,n,r,i;i=[];for(n=0,r=e.length;n<r;n++)t=e[n],t&&i.push(t);return i},t.count=function(e,t){var n,r;n=r=0;if(!t.length)return 1/0;while(r=1+e.indexOf(t,r))n++;return n},t.merge=function(e,t){return r(r({},e),t)},r=t.extend=function(e,t){var n,r;for(n in t)r=t[n],e[n]=r;return e},t.flatten=i=function(e){var t,n,r,s;n=[];for(r=0,s=e.length;r<s;r++)t=e[r],t instanceof Array?n=n.concat(i(t)):n.push(t);return n},t.del=function(e,t){var n;return n=e[t],delete e[t],n},t.last=function(e,t){return e[e.length-(t||0)-1]},t.some=(s=Array.prototype.some)!=null?s:function(e){var t,n,r;for(n=0,r=this.length;n<r;n++){t=this[n];if(e(t))return!0}return!1}});