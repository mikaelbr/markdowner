define(["require","exports","module","ace/lib/event_emitter","ace/lib/oop","ace/lib/fixoldbrowsers"],function(e,t,n){"no use strict";t.main=function(){function n(){var t=e("ace/lib/event_emitter").EventEmitter,n=e("ace/lib/oop"),r=function(){};return function(){n.implement(this,t),this.callback=function(e,t){postMessage({type:"call",id:t,data:e})},this.emit=function(e,t){postMessage({type:"event",name:e,data:t})}}.call(r.prototype),new r}var t={log:function(e){postMessage({type:"log",data:e})}};window={console:t};var r,i;onmessage=function(t){var s=t.data;s.command?r[s.command].apply(r,s.args):s.init?(e("ace/lib/fixoldbrowsers"),i=n(),e.async(s.module,function(e){var t=e[s.classname];r=new t(i)})):s.event&&i&&i._emit(s.event,s.data)}}});