"use strict";(self.webpackChunkbrick_docs=self.webpackChunkbrick_docs||[]).push([[7918],{96507:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(67294);const a={ringContainer:"ringContainer_Jl9i",ring:"ring_UfU1"};function l(){return r.createElement("div",{className:a.ringContainer},r.createElement("div",{className:a.ring},r.createElement("div",null),r.createElement("div",null),r.createElement("div",null),r.createElement("div",null)))}},1522:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(67294),a=n(96507);function l(e){let{height:t}=e;return r.createElement("div",{style:{height:t,position:"relative"}},r.createElement(a.Z,null))}},94981:(e,t,n)=>{n.d(t,{Z:()=>c});var r=n(67294),a=n(1522);const l=r.lazy((()=>Promise.all([n.e(532),n.e(382)]).then(n.bind(n,70382)))),o=r.lazy((()=>Promise.all([n.e(532),n.e(1001),n.e(6080)]).then(n.bind(n,86080))));function c(e){let{code:t,type:n,theme:c,className:i,loadingHeight:s,onChange:u}=e;const d=!!navigator.maxTouchPoints;return r.createElement(r.Suspense,{fallback:r.createElement(a.Z,{height:s})},d?r.createElement(l,{type:n,code:t,className:i}):r.createElement(o,{type:n,code:t,theme:c,className:i,onChange:u}))}},33788:(e,t,n)=>{n.d(t,{CZ:()=>r,cP:()=>a,lV:()=>c,sE:()=>l,z5:()=>o});const r=22,a=88,l=12,o=12,c=3*r+o+l},1534:(e,t,n)=>{n.d(t,{Z:()=>_});var r=n(67294),a=n(92053),l=n(79524),o=n(9200),c=n(10748),i=n(83699),s=n(14082),u=n(86010);var d,m=n(33788),h=n(7722);function g(){return g=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},g.apply(this,arguments)}const p=e=>{let{title:t,titleId:n,...a}=e;return r.createElement("svg",g({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"currentColor",className:"bi bi-chevron-up",viewBox:"0 0 16 16","aria-labelledby":n},a),t?r.createElement("title",{id:n},t):null,d||(d=r.createElement("path",{fillRule:"evenodd",d:"M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"})))};var v;function b(){return b=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var n=arguments[t];for(var r in n)Object.prototype.hasOwnProperty.call(n,r)&&(e[r]=n[r])}return e},b.apply(this,arguments)}const f=e=>{let{title:t,titleId:n,...a}=e;return r.createElement("svg",b({xmlns:"http://www.w3.org/2000/svg",width:16,height:16,fill:"currentColor",className:"bi bi-chevron-down",viewBox:"0 0 16 16","aria-labelledby":n},a),t?r.createElement("title",{id:n},t):null,v||(v=r.createElement("path",{fillRule:"evenodd",d:"M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"})))},E={example:"example_UmKM",editorBox:"editorBox_cKdj",previewBox:"previewBox_I2iQ",sourceShown:"sourceShown_wqmH",preview:"preview_bwr6",ready:"ready_dhJq",toolbar:"toolbar_Ozie",button:"button_nX8O",buttonToggleShowSource:"buttonToggleShowSource_CKb5"};var w=n(1522),y=n(96507);let x=!1,S=!1;const Z=[];function C(e){let{code:t,type:a,hiddenStyle:d}=e;const g=a??"yaml",v=(0,r.useRef)(),{colorMode:b}=(0,o.I)(),C=(0,l.Z)("/preview/"),_=(0,r.useRef)(),[N,k]=(0,r.useState)(m.cP),[O,z]=(0,r.useState)(!1),[P,B]=(0,r.useState)(t),[T,j]=(0,r.useState)(!1),[M,R]=(0,r.useState)(!(!x&&(x=!0,1))),I=(0,r.useMemo)((()=>(0,h.Z)(t)),[t]);(0,r.useEffect)((()=>{var e;e=()=>{R(!1)},S?e():Z.push(e)}),[]);const U=(0,r.useCallback)((()=>{const e=()=>{_.current?.contentWindow?._preview_only_render?(z(!0),S||(S=!0,Z.forEach((e=>{e()})),Z.length=0)):setTimeout(e,100)};e()}),[]),L=function(e,t){void 0===t&&(t=200);const[n,a]=(0,r.useState)(e);return(0,r.useEffect)((()=>{const n=setTimeout((()=>{a(e)}),t);return()=>{clearTimeout(n)}}),[e,t]),n}(P);(0,r.useEffect)((()=>{if(!O)return;const e=_.current?.contentWindow?._preview_only_render;e&&e(g,{[g]:L},{theme:b,styleText:d})}),[b,L,O,g,d]),(0,r.useLayoutEffect)((()=>{if(!O)return;const e=new ResizeObserver((e=>{for(const t of e)k(Math.max(m.cP,t.borderBoxSize?.[0]?.blockSize??t.contentRect.height))}));return e.observe(_.current.contentDocument.body,{box:"border-box"}),()=>{e.disconnect()}}),[O]);const H=(0,r.useCallback)((()=>{j((e=>!e))}),[]);return r.createElement("div",{className:E.example,ref:v},r.createElement("div",{className:E.previewBox},M||r.createElement("div",{className:(0,u.Z)(E.preview,{[E.ready]:O})},r.createElement("iframe",{ref:_,src:C,loading:"lazy",onLoad:U,style:{height:N}})),M?r.createElement(w.Z,{height:m.cP}):!O&&r.createElement(y.Z,null)),r.createElement("div",{className:(0,u.Z)(E.editorBox,{[E.sourceShown]:T})},M?r.createElement(w.Z,{height:I}):r.createElement(c.Z,{fallback:r.createElement(w.Z,{height:I})},(()=>{const e=n(94981).Z;return r.createElement(e,{type:g,code:t,theme:"dark"===b?"vs-dark":"vs",loadingHeight:I,onChange:B})}))),r.createElement("div",{className:E.toolbar},r.createElement("button",{className:(0,u.Z)(E.button,E.buttonToggleShowSource),role:"button",onClick:H},T?r.createElement(p,{width:14,height:14}):r.createElement(f,{width:14,height:14}),r.createElement("span",null,"Source ",g.toUpperCase())),r.createElement(i.Z,{className:E.button,href:`http://easyops-cn.github.io/next-bricks/playground/?mode=${g}#${J=JSON.stringify({[g]:P}),btoa(encodeURIComponent(J).replace(/%([0-9A-F]{2})/g,(function(e,t){return String.fromCharCode(parseInt(t,16))})))}`},"Playground",r.createElement(s.Z,{width:12,height:12}))));var J}function _(e){return!0===e.preview?r.createElement(C,{type:e.className.replace("language-",""),code:e.children.trimEnd(),hiddenStyle:e.gap?`#preview-root { display: flex; flex-wrap: wrap; gap: ${!0===e.gap?"0.27em":e.gap}; }`:void 0}):r.createElement(a.Z,e)}},7722:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(33788);function a(e){return Math.max(r.lV,e.split("\n").length*r.CZ+r.sE+r.z5)}}}]);