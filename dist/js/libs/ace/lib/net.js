/*
 * based on code from:
 *
 * @license RequireJS text 0.25.0 Copyright (c) 2010-2011, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/requirejs for details
 */

define(["require","exports","module","./useragent"],function(e,t,n){var r=e("./useragent");t.get=function(e,n){var r=t.createXhr();r.open("GET",e,!0),r.onreadystatechange=function(e){r.readyState===4&&n(r.responseText)},r.send(null)};var i=["Msxml2.XMLHTTP","Microsoft.XMLHTTP","Msxml2.XMLHTTP.4.0"];t.createXhr=function(){var e,t,n;if(typeof XMLHttpRequest!="undefined")return new XMLHttpRequest;for(t=0;t<3;t++){n=i[t];try{e=new ActiveXObject(n)}catch(r){}if(e){i=[n];break}}if(!e)throw new Error("createXhr(): XMLHttpRequest not available");return e},t.loadScript=function(e,t){var n=document.getElementsByTagName("head")[0],i=document.createElement("script");i.src=e,n.appendChild(i),r.isOldIE?i.onreadystatechange=function(){this.readyState=="loaded"&&t()}:i.onload=t}});