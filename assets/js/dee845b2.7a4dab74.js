"use strict";(self.webpackChunkbrick_docs=self.webpackChunkbrick_docs||[]).push([[9569],{3905:(e,t,n)=>{n.d(t,{Zo:()=>m,kt:()=>E});var r=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var o=r.createContext({}),u=function(e){var t=r.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},m=function(e){var t=u(e.components);return r.createElement(o.Provider,{value:t},e.children)},s="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,o=e.parentName,m=i(e,["components","mdxType","originalType","parentName"]),s=u(n),d=l,E=s["".concat(o,".").concat(d)]||s[d]||p[d]||a;return n?r.createElement(E,c(c({ref:t},m),{},{components:n})):r.createElement(E,c({ref:t},m))}));function E(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,c=new Array(a);c[0]=d;var i={};for(var o in t)hasOwnProperty.call(t,o)&&(i[o]=t[o]);i.originalType=e,i[s]="string"==typeof e?e:l,c[1]=i;for(var u=2;u<a;u++)c[u]=n[u];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},46470:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{events:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Event Detail"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,r.createElement(l.Z,null,e.detail?.type),e.detail?.description?` - ${e.detail?.description}`:""))))))}},10080:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{methods:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Params"),r.createElement("th",null,"Return"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,e.params.map(((e,t,n)=>r.createElement(r.Fragment,{key:t},r.createElement("code",null,e),t<n.length-1?", ":"")))),r.createElement("td",null,r.createElement(l.Z,null,e.return?.type),e.return?.description?` - ${e.return?.description}`:""))))))}},20456:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{properties:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Type"),r.createElement("th",null,"Default"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,r.createElement(l.Z,null,e.type)),r.createElement("td",null,r.createElement(l.Z,null,e.default)))))))}},98277:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{slots:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement(l.Z,{fallback:"(default)"},e.name)),r.createElement("td",null,e.description))))))}},59263:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294);const l={tagName:"tagName_MOG8"};function a(e){let{name:t}=e;return r.createElement("div",{className:l.tagName},r.createElement("code",null,"<",t,">"))}},32403:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(67294);function l(e){let{fallback:t,children:n}=e;return n?r.createElement("code",null,n):t?r.createElement(r.Fragment,null,t):null}},27227:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>m,contentTitle:()=>o,default:()=>E,frontMatter:()=>i,metadata:()=>u,toc:()=>s});var r=n(87462),l=(n(67294),n(3905)),a=n(59263),c=n(20456);n(98277),n(46470),n(10080);const i={description:"<basic.nav-menu>"},o=void 0,u={unversionedId:"bricks/basic/nav-menu",id:"bricks/basic/nav-menu",title:"nav-menu",description:"<basic.nav-menu>",source:"@site/docs/bricks/basic/nav-menu.md",sourceDirName:"bricks/basic",slug:"/bricks/basic/nav-menu",permalink:"/brick-docs/bricks/basic/nav-menu",draft:!1,tags:[],version:"current",frontMatter:{description:"<basic.nav-menu>"},sidebar:"docsSidebar",previous:{title:"general-text",permalink:"/brick-docs/bricks/basic/general-text"},next:{title:"containers",permalink:"/brick-docs/category/containers"}},m={},s=[{value:"Properties",id:"properties",level:2}],p={toc:s},d="wrapper";function E(e){let{components:t,...n}=e;return(0,l.kt)(d,(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(a.Z,{name:"basic.nav-menu",mdxType:"BrickTagName"}),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)(c.Z,{properties:[{name:"menu",description:"",required:!0,default:null,attribute:!1,type:"MenuConf"},{name:"showTooltip",description:"",required:!0,default:null,type:"boolean"}],mdxType:"BrickDocProperties"}))}E.isMDXComponent=!0}}]);