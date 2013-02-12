/**
 * @preserve jquery.fullscreen 1.1.4
 * https://github.com/kayahr/jquery-fullscreen-plugin
 * Copyright (C) 2012 Klaus Reimer <k@ailis.de>
 * Licensed under the MIT license
 * (See http://www.opensource.org/licenses/mit-license)
 */

define(["jquery"],function(e){function t(e){var t,n,r;return this.length?(t=this[0],t.ownerDocument?r=t.ownerDocument:(r=t,t=r.documentElement),e==null?r.cancelFullScreen||r.webkitCancelFullScreen||r.mozCancelFullScreen?(e=!!r.fullScreen||!!r.webkitIsFullScreen||!!r.mozFullScreen,e?r.fullScreenElement||r.webkitCurrentFullScreenElement||r.mozFullScreenElement||e:e):null:e?(n=t.requestFullScreen||t.webkitRequestFullScreen||t.mozRequestFullScreen,n&&(Element.ALLOW_KEYBOARD_INPUT?n.call(t,Element.ALLOW_KEYBOARD_INPUT):n.call(t)),this):(n=r.cancelFullScreen||r.webkitCancelFullScreen||r.mozCancelFullScreen,n&&n.call(r),this)):this}function n(){return t.call(this,!t.call(this))}function r(t){e(document).trigger(new e.Event("fullscreenchange"))}function i(t){e(document).trigger(new e.Event("fullscreenerror"))}function s(){var t,n,s;t=document,t.webkitCancelFullScreen?(n="webkitfullscreenchange",s="webkitfullscreenerror"):t.mozCancelFullScreen?(n="mozfullscreenchange",s="mozfullscreenerror"):(n="fullscreenchange",s="fullscreenerror"),e(document).bind(n,r),e(document).bind(s,i)}e.fn.fullScreen=t,e.fn.toggleFullScreen=n,s()});