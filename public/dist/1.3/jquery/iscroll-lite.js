!function(t,i,e){function s(e,s){this.wrapper="string"==typeof e?i.querySelector(e):e,this.scroller=this.wrapper.children[0],this.scrollerStyle=this.scroller.style,this.options={disablePointer:!o.hasPointer,disableTouch:o.hasPointer||!o.hasTouch,disableMouse:o.hasPointer||o.hasTouch,startX:0,startY:0,scrollY:!0,directionLockThreshold:5,momentum:!0,bounce:!0,bounceTime:600,bounceEasing:"",preventDefault:!0,preventDefaultException:{tagName:/^(INPUT|TEXTAREA|BUTTON|SELECT)$/},HWCompositing:!0,useTransition:!0,useTransform:!0,bindToWrapper:"undefined"==typeof t.onmousedown};for(var n in s)this.options[n]=s[n];this.translateZ=this.options.HWCompositing&&o.hasPerspective?" translateZ(0)":"",this.options.useTransition=o.hasTransition&&this.options.useTransition,this.options.useTransform=o.hasTransform&&this.options.useTransform,this.options.eventPassthrough=this.options.eventPassthrough===!0?"vertical":this.options.eventPassthrough,this.options.preventDefault=!this.options.eventPassthrough&&this.options.preventDefault,this.options.scrollY="vertical"!=this.options.eventPassthrough&&this.options.scrollY,this.options.scrollX="horizontal"!=this.options.eventPassthrough&&this.options.scrollX,this.options.freeScroll=this.options.freeScroll&&!this.options.eventPassthrough,this.options.directionLockThreshold=this.options.eventPassthrough?0:this.options.directionLockThreshold,this.options.bounceEasing="string"==typeof this.options.bounceEasing?o.ease[this.options.bounceEasing]||o.ease.circular:this.options.bounceEasing,this.options.resizePolling=void 0===this.options.resizePolling?60:this.options.resizePolling,this.options.tap===!0&&(this.options.tap="tap"),this.options.useTransition||this.options.useTransform||/relative|absolute/i.test(this.scrollerStyle.position)||(this.scrollerStyle.position="relative"),this.x=0,this.y=0,this.directionX=0,this.directionY=0,this._events={},this._init(),this.refresh(),this.scrollTo(this.options.startX,this.options.startY),this.enable()}var n=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame||t.oRequestAnimationFrame||t.msRequestAnimationFrame||function(i){t.setTimeout(i,1e3/60)},o=function(){function s(t){return r!==!1&&(""===r?t:r+t.charAt(0).toUpperCase()+t.substr(1))}var n={},o=i.createElement("div").style,r=function(){for(var t,i=["t","webkitT","MozT","msT","OT"],e=0,s=i.length;e<s;e++)if(t=i[e]+"ransform",t in o)return i[e].substr(0,i[e].length-1);return!1}();n.getTime=Date.now||function(){return(new Date).getTime()},n.extend=function(t,i){for(var e in i)t[e]=i[e]},n.addEvent=function(t,i,e,s){t.addEventListener(i,e,!!s)},n.removeEvent=function(t,i,e,s){t.removeEventListener(i,e,!!s)},n.prefixPointerEvent=function(i){return t.MSPointerEvent?"MSPointer"+i.charAt(7).toUpperCase()+i.substr(8):i},n.momentum=function(t,i,s,n,o,r){var h,a,l=t-i,c=e.abs(l)/s;return r=void 0===r?6e-4:r,h=t+c*c/(2*r)*(l<0?-1:1),a=c/r,h<n?(h=o?n-o/2.5*(c/8):n,l=e.abs(h-t),a=l/c):h>0&&(h=o?o/2.5*(c/8):0,l=e.abs(t)+h,a=l/c),{destination:e.round(h),duration:a}};var h=s("transform");return n.extend(n,{hasTransform:h!==!1,hasPerspective:s("perspective")in o,hasTouch:"ontouchstart"in t,hasPointer:!(!t.PointerEvent&&!t.MSPointerEvent),hasTransition:s("transition")in o}),n.isBadAndroid=function(){var i=t.navigator.appVersion;if(/Android/.test(i)&&!/Chrome\/\d/.test(i)){var e=i.match(/Safari\/(\d+.\d)/);return!(e&&"object"==typeof e&&e.length>=2)||parseFloat(e[1])<535.19}return!1}(),n.extend(n.style={},{transform:h,transitionTimingFunction:s("transitionTimingFunction"),transitionDuration:s("transitionDuration"),transitionDelay:s("transitionDelay"),transformOrigin:s("transformOrigin")}),n.hasClass=function(t,i){var e=new RegExp("(^|\\s)"+i+"(\\s|$)");return e.test(t.className)},n.addClass=function(t,i){if(!n.hasClass(t,i)){var e=t.className.split(" ");e.push(i),t.className=e.join(" ")}},n.removeClass=function(t,i){if(n.hasClass(t,i)){var e=new RegExp("(^|\\s)"+i+"(\\s|$)","g");t.className=t.className.replace(e," ")}},n.offset=function(t){for(var i=-t.offsetLeft,e=-t.offsetTop;t=t.offsetParent;)i-=t.offsetLeft,e-=t.offsetTop;return{left:i,top:e}},n.preventDefaultException=function(t,i){for(var e in i)if(i[e].test(t[e]))return!0;return!1},n.extend(n.eventType={},{touchstart:1,touchmove:1,touchend:1,mousedown:2,mousemove:2,mouseup:2,pointerdown:3,pointermove:3,pointerup:3,MSPointerDown:3,MSPointerMove:3,MSPointerUp:3}),n.extend(n.ease={},{quadratic:{style:"cubic-bezier(0.25, 0.46, 0.45, 0.94)",fn:function(t){return t*(2-t)}},circular:{style:"cubic-bezier(0.1, 0.57, 0.1, 1)",fn:function(t){return e.sqrt(1- --t*t)}},back:{style:"cubic-bezier(0.175, 0.885, 0.32, 1.275)",fn:function(t){var i=4;return(t-=1)*t*((i+1)*t+i)+1}},bounce:{style:"",fn:function(t){return(t/=1)<1/2.75?7.5625*t*t:t<2/2.75?7.5625*(t-=1.5/2.75)*t+.75:t<2.5/2.75?7.5625*(t-=2.25/2.75)*t+.9375:7.5625*(t-=2.625/2.75)*t+.984375}},elastic:{style:"",fn:function(t){var i=.22,s=.4;return 0===t?0:1==t?1:s*e.pow(2,-10*t)*e.sin((t-i/4)*(2*e.PI)/i)+1}}}),n.tap=function(t,e){var s=i.createEvent("Event");s.initEvent(e,!0,!0),s.pageX=t.pageX,s.pageY=t.pageY,t.target.dispatchEvent(s)},n.click=function(e){var s,n=e.target;/(SELECT|INPUT|TEXTAREA)/i.test(n.tagName)||(s=i.createEvent(t.MouseEvent?"MouseEvents":"Event"),s.initEvent("click",!0,!0),s.view=e.view||t,s.detail=1,s.screenX=n.screenX||0,s.screenY=n.screenY||0,s.clientX=n.clientX||0,s.clientY=n.clientY||0,s.ctrlKey=!!e.ctrlKey,s.altKey=!!e.altKey,s.shiftKey=!!e.shiftKey,s.metaKey=!!e.metaKey,s.button=0,s.relatedTarget=null,s._constructed=!0,n.dispatchEvent(s))},n}();s.prototype={version:"5.2.0",_init:function(){this._initEvents()},destroy:function(){this._initEvents(!0),clearTimeout(this.resizeTimeout),this.resizeTimeout=null,this._execEvent("destroy")},_transitionEnd:function(t){t.target==this.scroller&&this.isInTransition&&(this._transitionTime(),this.resetPosition(this.options.bounceTime)||(this.isInTransition=!1,this._execEvent("scrollEnd")))},_start:function(t){if(1!=o.eventType[t.type]){var i;if(i=t.which?t.button:t.button<2?0:4==t.button?1:2,0!==i)return}if(this.enabled&&(!this.initiated||o.eventType[t.type]===this.initiated)){!this.options.preventDefault||o.isBadAndroid||o.preventDefaultException(t.target,this.options.preventDefaultException)||t.preventDefault();var s,n=t.touches?t.touches[0]:t;this.initiated=o.eventType[t.type],this.moved=!1,this.distX=0,this.distY=0,this.directionX=0,this.directionY=0,this.directionLocked=0,this.startTime=o.getTime(),this.options.useTransition&&this.isInTransition?(this._transitionTime(),this.isInTransition=!1,s=this.getComputedPosition(),this._translate(e.round(s.x),e.round(s.y)),this._execEvent("scrollEnd")):!this.options.useTransition&&this.isAnimating&&(this.isAnimating=!1,this._execEvent("scrollEnd")),this.startX=this.x,this.startY=this.y,this.absStartX=this.x,this.absStartY=this.y,this.pointX=n.pageX,this.pointY=n.pageY,this._execEvent("beforeScrollStart")}},_move:function(t){if(this.enabled&&o.eventType[t.type]===this.initiated){this.options.preventDefault&&t.preventDefault();var i,s,n,r,h=t.touches?t.touches[0]:t,a=h.pageX-this.pointX,l=h.pageY-this.pointY,c=o.getTime();if(this.pointX=h.pageX,this.pointY=h.pageY,this.distX+=a,this.distY+=l,n=e.abs(this.distX),r=e.abs(this.distY),!(c-this.endTime>300&&n<10&&r<10)){if(this.directionLocked||this.options.freeScroll||(n>r+this.options.directionLockThreshold?this.directionLocked="h":r>=n+this.options.directionLockThreshold?this.directionLocked="v":this.directionLocked="n"),"h"==this.directionLocked){if("vertical"==this.options.eventPassthrough)t.preventDefault();else if("horizontal"==this.options.eventPassthrough)return void(this.initiated=!1);l=0}else if("v"==this.directionLocked){if("horizontal"==this.options.eventPassthrough)t.preventDefault();else if("vertical"==this.options.eventPassthrough)return void(this.initiated=!1);a=0}a=this.hasHorizontalScroll?a:0,l=this.hasVerticalScroll?l:0,i=this.x+a,s=this.y+l,(i>0||i<this.maxScrollX)&&(i=this.options.bounce?this.x+a/3:i>0?0:this.maxScrollX),(s>0||s<this.maxScrollY)&&(s=this.options.bounce?this.y+l/3:s>0?0:this.maxScrollY),this.directionX=a>0?-1:a<0?1:0,this.directionY=l>0?-1:l<0?1:0,this.moved||this._execEvent("scrollStart"),this.moved=!0,this._translate(i,s),c-this.startTime>300&&(this.startTime=c,this.startX=this.x,this.startY=this.y,1==this.options.probeType&&this._execEvent("scroll")),this.options.probeType>1&&this._execEvent("scroll")}}},_end:function(t){if(this.enabled&&o.eventType[t.type]===this.initiated){this.options.preventDefault&&!o.preventDefaultException(t.target,this.options.preventDefaultException)&&t.preventDefault();var i,s,n=(t.changedTouches?t.changedTouches[0]:t,o.getTime()-this.startTime),r=e.round(this.x),h=e.round(this.y),a=e.abs(r-this.startX),l=e.abs(h-this.startY),c=0,p="";if(this.isInTransition=0,this.initiated=0,this.endTime=o.getTime(),!this.resetPosition(this.options.bounceTime))return this.scrollTo(r,h),this.moved?this._events.flick&&n<200&&a<100&&l<100?void this._execEvent("flick"):(this.options.momentum&&n<300&&(i=this.hasHorizontalScroll?o.momentum(this.x,this.startX,n,this.maxScrollX,this.options.bounce?this.wrapperWidth:0,this.options.deceleration):{destination:r,duration:0},s=this.hasVerticalScroll?o.momentum(this.y,this.startY,n,this.maxScrollY,this.options.bounce?this.wrapperHeight:0,this.options.deceleration):{destination:h,duration:0},r=i.destination,h=s.destination,c=e.max(i.duration,s.duration),this.isInTransition=1),r!=this.x||h!=this.y?((r>0||r<this.maxScrollX||h>0||h<this.maxScrollY)&&(p=o.ease.quadratic),void this.scrollTo(r,h,c,p)):void this._execEvent("scrollEnd")):(this.options.tap&&o.tap(t,this.options.tap),this.options.click&&o.click(t),void this._execEvent("scrollCancel"))}},_resize:function(){var t=this;clearTimeout(this.resizeTimeout),this.resizeTimeout=setTimeout(function(){t.refresh()},this.options.resizePolling)},resetPosition:function(t){var i=this.x,e=this.y;return t=t||0,!this.hasHorizontalScroll||this.x>0?i=0:this.x<this.maxScrollX&&(i=this.maxScrollX),!this.hasVerticalScroll||this.y>0?e=0:this.y<this.maxScrollY&&(e=this.maxScrollY),(i!=this.x||e!=this.y)&&(this.scrollTo(i,e,t,this.options.bounceEasing),!0)},disable:function(){this.enabled=!1},enable:function(){this.enabled=!0},refresh:function(){this.wrapper.offsetHeight;this.wrapperWidth=this.wrapper.clientWidth,this.wrapperHeight=this.wrapper.clientHeight,this.scrollerWidth=this.scroller.offsetWidth,this.scrollerHeight=this.scroller.offsetHeight,this.maxScrollX=this.wrapperWidth-this.scrollerWidth,this.maxScrollY=this.wrapperHeight-this.scrollerHeight,this.hasHorizontalScroll=this.options.scrollX&&this.maxScrollX<0,this.hasVerticalScroll=this.options.scrollY&&this.maxScrollY<0,this.hasHorizontalScroll||(this.maxScrollX=0,this.scrollerWidth=this.wrapperWidth),this.hasVerticalScroll||(this.maxScrollY=0,this.scrollerHeight=this.wrapperHeight),this.endTime=0,this.directionX=0,this.directionY=0,this.wrapperOffset=o.offset(this.wrapper),this._execEvent("refresh"),this.resetPosition()},on:function(t,i){this._events[t]||(this._events[t]=[]),this._events[t].push(i)},off:function(t,i){if(this._events[t]){var e=this._events[t].indexOf(i);e>-1&&this._events[t].splice(e,1)}},_execEvent:function(t){if(this._events[t]){var i=0,e=this._events[t].length;if(e)for(;i<e;i++)this._events[t][i].apply(this,[].slice.call(arguments,1))}},scrollBy:function(t,i,e,s){t=this.x+t,i=this.y+i,e=e||0,this.scrollTo(t,i,e,s)},scrollTo:function(t,i,e,s){s=s||o.ease.circular,this.isInTransition=this.options.useTransition&&e>0;var n=this.options.useTransition&&s.style;!e||n?(n&&(this._transitionTimingFunction(s.style),this._transitionTime(e)),this._translate(t,i)):this._animate(t,i,e,s.fn)},scrollToElement:function(t,i,s,n,r){if(t=t.nodeType?t:this.scroller.querySelector(t)){var h=o.offset(t);h.left-=this.wrapperOffset.left,h.top-=this.wrapperOffset.top,s===!0&&(s=e.round(t.offsetWidth/2-this.wrapper.offsetWidth/2)),n===!0&&(n=e.round(t.offsetHeight/2-this.wrapper.offsetHeight/2)),h.left-=s||0,h.top-=n||0,h.left=h.left>0?0:h.left<this.maxScrollX?this.maxScrollX:h.left,h.top=h.top>0?0:h.top<this.maxScrollY?this.maxScrollY:h.top,i=void 0===i||null===i||"auto"===i?e.max(e.abs(this.x-h.left),e.abs(this.y-h.top)):i,this.scrollTo(h.left,h.top,i,r)}},_transitionTime:function(t){if(this.options.useTransition){t=t||0;var i=o.style.transitionDuration;if(i&&(this.scrollerStyle[i]=t+"ms",!t&&o.isBadAndroid)){this.scrollerStyle[i]="0.0001ms";var e=this;n(function(){"0.0001ms"===e.scrollerStyle[i]&&(e.scrollerStyle[i]="0s")})}}},_transitionTimingFunction:function(t){this.scrollerStyle[o.style.transitionTimingFunction]=t},_translate:function(t,i){this.options.useTransform?this.scrollerStyle[o.style.transform]="translate("+t+"px,"+i+"px)"+this.translateZ:(t=e.round(t),i=e.round(i),this.scrollerStyle.left=t+"px",this.scrollerStyle.top=i+"px"),this.x=t,this.y=i},_initEvents:function(i){var e=i?o.removeEvent:o.addEvent,s=this.options.bindToWrapper?this.wrapper:t;e(t,"orientationchange",this),e(t,"resize",this),this.options.click&&e(this.wrapper,"click",this,!0),this.options.disableMouse||(e(this.wrapper,"mousedown",this),e(s,"mousemove",this),e(s,"mousecancel",this),e(s,"mouseup",this)),o.hasPointer&&!this.options.disablePointer&&(e(this.wrapper,o.prefixPointerEvent("pointerdown"),this),e(s,o.prefixPointerEvent("pointermove"),this),e(s,o.prefixPointerEvent("pointercancel"),this),e(s,o.prefixPointerEvent("pointerup"),this)),o.hasTouch&&!this.options.disableTouch&&(e(this.wrapper,"touchstart",this),e(s,"touchmove",this),e(s,"touchcancel",this),e(s,"touchend",this)),e(this.scroller,"transitionend",this),e(this.scroller,"webkitTransitionEnd",this),e(this.scroller,"oTransitionEnd",this),e(this.scroller,"MSTransitionEnd",this)},getComputedPosition:function(){var i,e,s=t.getComputedStyle(this.scroller,null);return this.options.useTransform?(s=s[o.style.transform].split(")")[0].split(", "),i=+(s[12]||s[4]),e=+(s[13]||s[5])):(i=+s.left.replace(/[^-\d.]/g,""),e=+s.top.replace(/[^-\d.]/g,"")),{x:i,y:e}},_animate:function(t,i,e,s){function r(){var u,f,d,v=o.getTime();return v>=p?(h.isAnimating=!1,h._translate(t,i),void(h.resetPosition(h.options.bounceTime)||h._execEvent("scrollEnd"))):(v=(v-c)/e,d=s(v),u=(t-a)*d+a,f=(i-l)*d+l,h._translate(u,f),void(h.isAnimating&&n(r)))}var h=this,a=this.x,l=this.y,c=o.getTime(),p=c+e;this.isAnimating=!0,r()},handleEvent:function(t){switch(t.type){case"touchstart":case"pointerdown":case"MSPointerDown":case"mousedown":this._start(t);break;case"touchmove":case"pointermove":case"MSPointerMove":case"mousemove":this._move(t);break;case"touchend":case"pointerup":case"MSPointerUp":case"mouseup":case"touchcancel":case"pointercancel":case"MSPointerCancel":case"mousecancel":this._end(t);break;case"orientationchange":case"resize":this._resize();break;case"transitionend":case"webkitTransitionEnd":case"oTransitionEnd":case"MSTransitionEnd":this._transitionEnd(t);break;case"wheel":case"DOMMouseScroll":case"mousewheel":this._wheel(t);break;case"keydown":this._key(t);break;case"click":this.enabled&&!t._constructed&&(t.preventDefault(),t.stopPropagation())}}},s.utils=o,"undefined"!=typeof module&&module.exports?module.exports=s:"function"==typeof define&&define.amd?define(function(){return s}):t.IScroll=s}(window,document,Math);