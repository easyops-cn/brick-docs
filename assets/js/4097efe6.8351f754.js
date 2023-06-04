"use strict";(self.webpackChunkbrick_docs=self.webpackChunkbrick_docs||[]).push([[8995],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>E});var r=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=r.createContext({}),m=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=m(e.components);return r.createElement(o.Provider,{value:t},e.children)},d="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},s=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,o=e.parentName,u=i(e,["components","mdxType","originalType","parentName"]),d=m(n),s=l,E=d["".concat(o,".").concat(s)]||d[s]||p[s]||a;return n?r.createElement(E,c(c({ref:t},u),{},{components:n})):r.createElement(E,c({ref:t},u))}));function E(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,c=new Array(a);c[0]=s;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[d]="string"==typeof e?e:l,c[1]=i;for(var m=2;m<a;m++)c[m]=n[m];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}s.displayName="MDXCreateElement"},46470:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{events:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Event Detail"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,r.createElement(l.Z,null,e.detail?.type),e.detail?.description?` - ${e.detail?.description}`:""))))))}},10080:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{methods:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Params"),r.createElement("th",null,"Return"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,e.params.map(((e,t,n)=>r.createElement(r.Fragment,{key:t},r.createElement("code",null,e),t<n.length-1?", ":"")))),r.createElement("td",null,r.createElement(l.Z,null,e.return?.type),e.return?.description?` - ${e.return?.description}`:""))))))}},20456:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{properties:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Type"),r.createElement("th",null,"Default"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,r.createElement(l.Z,null,e.type)),r.createElement("td",null,r.createElement(l.Z,null,e.default)))))))}},98277:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{slots:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement(l.Z,{fallback:"(default)"},e.name)),r.createElement("td",null,e.description))))))}},59263:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294);const l={tagName:"tagName_MOG8"};function a(e){let{name:t}=e;return r.createElement("div",{className:l.tagName},r.createElement("code",null,"<",t,">"))}},32403:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(67294);function l(e){let{fallback:t,children:n}=e;return n?r.createElement("code",null,n):t?r.createElement(r.Fragment,null,t):null}},36149:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>u,contentTitle:()=>o,default:()=>E,frontMatter:()=>i,metadata:()=>m,toc:()=>d});var r=n(87462),l=(n(67294),n(3905)),a=n(59263),c=n(20456);n(98277),n(46470),n(10080);const i={description:"<data-view.cabinet-node>"},o=void 0,m={unversionedId:"bricks/data-view/cabinet-node",id:"bricks/data-view/cabinet-node",title:"cabinet-node",description:"<data-view.cabinet-node>",source:"@site/docs/bricks/data-view/cabinet-node.md",sourceDirName:"bricks/data-view",slug:"/bricks/data-view/cabinet-node",permalink:"/brick-docs/bricks/data-view/cabinet-node",draft:!1,tags:[],version:"current",frontMatter:{description:"<data-view.cabinet-node>"},sidebar:"docsSidebar",previous:{title:"cabinet-graph",permalink:"/brick-docs/bricks/data-view/cabinet-graph"},next:{title:"cabinet-thumbnail",permalink:"/brick-docs/bricks/data-view/cabinet-thumbnail"}},u={},d=[{value:"Properties",id:"properties",level:2}],p={toc:d},s="wrapper";function E(e){let{components:t,...n}=e;return(0,l.kt)(s,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(a.Z,{name:"data-view.cabinet-node",mdxType:"BrickTagName"}),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)(c.Z,{properties:[{name:"type",description:"",type:'"container-group" | "physical-machine" | "virtual-machine"'},{name:"nodeTitle",description:"",type:"string"},{name:"status",description:"",type:'"active" | "faded"'}],mdxType:"BrickDocProperties"}))}E.isMDXComponent=!0}}]);