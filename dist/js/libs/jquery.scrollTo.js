/**
 * Copyright (c) 2007-2012 Ariel Flesler - aflesler(at)gmail(dot)com | http://flesler.blogspot.com
 * Dual licensed under MIT and GPL.
 * @author Ariel Flesler
 * @version 1.4.3.1
 */

(function(e){function n(e){return typeof e=="object"?e:{top:e,left:e}}var t=e.scrollTo=function(t,n,r){e(window).scrollTo(t,n,r)};t.defaults={axis:"xy",duration:parseFloat(e.fn.jquery)>=1.3?0:1,limit:!0},t.window=function(t){return e(window)._scrollable()},e.fn._scrollable=function(){return this.map(function(){var t=this,n=!t.nodeName||e.inArray(t.nodeName.toLowerCase(),["iframe","#document","html","body"])!=-1;if(!n)return t;var r=(t.contentWindow||t).document||t.ownerDocument||t;return/webkit/i.test(navigator.userAgent)||r.compatMode=="BackCompat"?r.body:r.documentElement})},e.fn.scrollTo=function(r,i,s){return typeof i=="object"&&(s=i,i=0),typeof s=="function"&&(s={onAfter:s}),r=="max"&&(r=9e9),s=e.extend({},t.defaults,s),i=i||s.duration,s.queue=s.queue&&s.axis.length>1,s.queue&&(i/=2),s.offset=n(s.offset),s.over=n(s.over),this._scrollable().each(function(){function d(e){u.animate(c,i,s.easing,e&&function(){e.call(this,r,s)})}if(r==null)return;var o=this,u=e(o),a=r,l,c={},p=u.is("html,body");switch(typeof a){case"number":case"string":if(/^([+-]=)?\d+(\.\d+)?(px|%)?$/.test(a)){a=n(a);break}a=e(a,this);if(!a.length)return;case"object":if(a.is||a.style)l=(a=e(a)).offset()}e.each(s.axis.split(""),function(e,n){var r=n=="x"?"Left":"Top",i=r.toLowerCase(),f="scroll"+r,v=o[f],m=t.max(o,n);if(l)c[f]=l[i]+(p?0:v-u.offset()[i]),s.margin&&(c[f]-=parseInt(a.css("margin"+r))||0,c[f]-=parseInt(a.css("border"+r+"Width"))||0),c[f]+=s.offset[i]||0,s.over[i]&&(c[f]+=a[n=="x"?"width":"height"]()*s.over[i]);else{var y=a[i];c[f]=y.slice&&y.slice(-1)=="%"?parseFloat(y)/100*m:y}s.limit&&/^\d+$/.test(c[f])&&(c[f]=c[f]<=0?0:Math.min(c[f],m)),!e&&s.queue&&(v!=c[f]&&d(s.onAfterFirst),delete c[f])}),d(s.onAfter)}).end()},t.max=function(t,n){var r=n=="x"?"Width":"Height",i="scroll"+r;if(!e(t).is("html,body"))return t[i]-e(t)[r.toLowerCase()]();var s="client"+r,o=t.ownerDocument.documentElement,u=t.ownerDocument.body;return Math.max(o[i],u[i])-Math.min(o[s],u[s])}})(jQuery);