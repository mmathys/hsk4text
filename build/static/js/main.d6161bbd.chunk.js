(this.webpackJsonpapp=this.webpackJsonpapp||[]).push([[0],{12:function(e,t,n){},14:function(e,t,n){},15:function(e,t,n){},19:function(e,t,n){"use strict";n.r(t);var c=n(1),r=n.n(c),i=n(7),s=n.n(i),u=(n(12),n(2)),a=n.n(u),o=n(4),l=n(3),f=n(21),d=(n(14),n(15),n(0)),j=function(e){return e.map((function(e){return e.split("\uff1a")[0].length<=4})).reduce((function(e,t){return e&&t}))};function p(e){var t=Object(c.useState)(),n=Object(l.a)(t,2),r=n[0],i=n[1],s=function(e){var t=e.split("\uff1a");if(1===t.length)return["",t[0].trim()];var n=t[0]+"\uff1a",c=t.slice(1).reduce((function(e,t){return e+"\uff1a"+t}));return[n.trim(),c.trim()]};return Object(c.useEffect)((function(){(function(){var t=Object(o.a)(a.a.mark((function t(){var n,c,r,u,o,l;return a.a.wrap((function(t){for(;;)switch(t.prev=t.next){case 0:return n=m(e.config),t.next=3,fetch("text/".concat(n,".txt"));case 3:return c=t.sent,t.next=6,c.text();case 6:r=t.sent,u=r.split("\n"),j(u)?(o=u.map(s),i(o)):(l=u.map((function(e){return["",e]})),i(l));case 9:case"end":return t.stop()}}),t)})));return function(){return t.apply(this,arguments)}})()()}),[e]),Object(d.jsx)("div",{children:Object(d.jsx)("div",{className:"table",children:null===r||void 0===r?void 0:r.map((function(e){return Object(d.jsxs)("div",{className:"row",children:[Object(d.jsx)("p",{className:"cell dialog-head",children:e[0]}),Object(d.jsx)("p",{className:"cell",children:e[1]})]},e[1])}))})})}var v=n(6),b=n.n(v),h=["k","space"],x=["j","left"],O=["l","right"];function m(e){if(e)return(e.lesson<10?"0":"")+e.lesson+"-"+e.text}var g=function(){var e=Object(c.useState)(),t=Object(l.a)(e,2),n=t[0],r=t[1],i=Object(c.useState)(),s=Object(l.a)(i,2),u=s[0],j=s[1],v=Object(c.useState)(-1),g=Object(l.a)(v,2),y=g[0],k=g[1],N=Object(c.useRef)(null);return Object(c.useEffect)((function(){(function(){var e=Object(o.a)(a.a.mark((function e(){var t,n;return a.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,fetch("config.json");case 2:return t=e.sent,e.next=5,t.json();case 5:n=e.sent,r(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}})()()}),[]),Object(f.a)((function(e){if("keydown"!==e.type)return!1;var t,n,c;h.includes(e.key)&&((null===(t=N.current)||void 0===t?void 0:t.paused)?null===(n=N.current)||void 0===n||n.play():null===(c=N.current)||void 0===c||c.pause());return N.current&&(x.includes(e.key)&&(N.current.currentTime-=5),O.includes(e.key)&&(N.current.currentTime+=5)),!0})),Object(d.jsx)("div",{className:"App",children:Object(d.jsxs)("div",{className:"content",children:[Object(d.jsx)("div",{className:"nav",children:function(){if(n){var e=function(e){return function(){k(e===y?-1:e)}},t=function(e,t){if(t===y){var n=function(e){return"nav-entry"+(e===u?" active":"")};return e.map((function(e){return Object(d.jsxs)("div",{className:n(e),onClick:function(){return function(e){j(e),N.current&&N.current.load()}(e)},children:["Text ",e.text]},m(e))}))}},c=b.a.groupBy(n.texts,(function(e){return e.lesson}));return b.a.keys(c).map((function(n){var r=parseInt(n),i=c[n],s="nav-lesson"+(r===(null===u||void 0===u?void 0:u.lesson)?" active":"");return Object(d.jsxs)("div",{children:[Object(d.jsxs)("p",{className:s,onClick:e(r),children:["Lesson ",n]}),t(i,r)]},n)}))}}()}),function(){if(u){return Object(d.jsxs)("div",{className:"text chinese",children:[u.title?Object(d.jsx)("p",{className:"title",children:u.title}):void 0,Object(d.jsx)(p,{config:u}),Object(d.jsxs)("audio",{className:"audio",controls:!0,ref:N,children:[Object(d.jsx)("source",{src:"audio/".concat(m(u),".mp3"),type:"audio/mpeg"}),"Your browser does not support the audio element."]})]})}}()]})})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,22)).then((function(t){var n=t.getCLS,c=t.getFID,r=t.getFCP,i=t.getLCP,s=t.getTTFB;n(e),c(e),r(e),i(e),s(e)}))};s.a.render(Object(d.jsx)(r.a.StrictMode,{children:Object(d.jsx)(g,{})}),document.getElementById("root")),y()}},[[19,1,2]]]);
//# sourceMappingURL=main.d6161bbd.chunk.js.map