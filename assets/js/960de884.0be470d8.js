"use strict";(self.webpackChunkbrick_docs=self.webpackChunkbrick_docs||[]).push([[1869],{3905:(e,t,r)=>{r.d(t,{Zo:()=>o,kt:()=>E});var n=r(67294);function a(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){a(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}function i(e,t){if(null==e)return{};var r,n,a=function(e,t){if(null==e)return{};var r,n,a={},l=Object.keys(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||(a[r]=e[r]);return a}(e,t);if(Object.getOwnPropertySymbols){var l=Object.getOwnPropertySymbols(e);for(n=0;n<l.length;n++)r=l[n],t.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(e,r)&&(a[r]=e[r])}return a}var u=n.createContext({}),d=function(e){var t=n.useContext(u),r=t;return e&&(r="function"==typeof e?e(t):c(c({},t),e)),r},o=function(e){var t=d(e.components);return n.createElement(u.Provider,{value:t},e.children)},m="mdxType",p={inlineCode:"code",wrapper:function(e){var t=e.children;return n.createElement(n.Fragment,{},t)}},s=n.forwardRef((function(e,t){var r=e.components,a=e.mdxType,l=e.originalType,u=e.parentName,o=i(e,["components","mdxType","originalType","parentName"]),m=d(r),s=a,E=m["".concat(u,".").concat(s)]||m[s]||p[s]||l;return r?n.createElement(E,c(c({ref:t},o),{},{components:r})):n.createElement(E,c({ref:t},o))}));function E(e,t){var r=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var l=r.length,c=new Array(l);c[0]=s;var i={};for(var u in t)hasOwnProperty.call(t,u)&&(i[u]=t[u]);i.originalType=e,i[m]="string"==typeof e?e:a,c[1]=i;for(var d=2;d<l;d++)c[d]=r[d];return n.createElement.apply(null,c)}return n.createElement.apply(null,r)}s.displayName="MDXCreateElement"},46470:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(67294),a=r(32403);function l(e){let{events:t}=e;return n.createElement("table",null,n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"Name"),n.createElement("th",null,"Description"),n.createElement("th",null,"Event Detail"))),n.createElement("tbody",null,t.map((e=>n.createElement("tr",{key:e.name},n.createElement("td",null,n.createElement("code",null,e.name)),n.createElement("td",null,e.description),n.createElement("td",null,n.createElement(a.Z,null,e.detail?.type),e.detail?.description?` - ${e.detail?.description}`:""))))))}},10080:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(67294),a=r(32403);function l(e){let{methods:t}=e;return n.createElement("table",null,n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"Name"),n.createElement("th",null,"Description"),n.createElement("th",null,"Params"),n.createElement("th",null,"Return"))),n.createElement("tbody",null,t.map((e=>n.createElement("tr",{key:e.name},n.createElement("td",null,n.createElement("code",null,e.name)),n.createElement("td",null,e.description),n.createElement("td",null,e.params.map(((e,t,r)=>n.createElement(n.Fragment,{key:t},n.createElement("code",null,e),t<r.length-1?", ":"")))),n.createElement("td",null,n.createElement(a.Z,null,e.return?.type),e.return?.description?` - ${e.return?.description}`:""))))))}},20456:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(67294),a=r(32403);function l(e){let{properties:t}=e;return n.createElement("table",null,n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"Name"),n.createElement("th",null,"Description"),n.createElement("th",null,"Type"),n.createElement("th",null,"Default"))),n.createElement("tbody",null,t.map((e=>n.createElement("tr",{key:e.name},n.createElement("td",null,n.createElement("code",null,e.name)),n.createElement("td",null,e.description),n.createElement("td",null,n.createElement(a.Z,null,e.type)),n.createElement("td",null,n.createElement(a.Z,null,e.default)))))))}},98277:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(67294),a=r(32403);function l(e){let{slots:t}=e;return n.createElement("table",null,n.createElement("thead",null,n.createElement("tr",null,n.createElement("th",null,"Name"),n.createElement("th",null,"Description"))),n.createElement("tbody",null,t.map((e=>n.createElement("tr",{key:e.name},n.createElement("td",null,n.createElement(a.Z,{fallback:"(default)"},e.name)),n.createElement("td",null,e.description))))))}},59263:(e,t,r)=>{r.d(t,{Z:()=>l});var n=r(67294);const a={tagName:"tagName_MOG8"};function l(e){let{name:t}=e;return n.createElement("div",{className:a.tagName},n.createElement("code",null,"<",t,">"))}},32403:(e,t,r)=>{r.d(t,{Z:()=>a});var n=r(67294);function a(e){let{fallback:t,children:r}=e;return r?n.createElement("code",null,r):t?n.createElement(n.Fragment,null,t):null}},71448:(e,t,r)=>{r.r(t),r.d(t,{assets:()=>o,contentTitle:()=>u,default:()=>E,frontMatter:()=>i,metadata:()=>d,toc:()=>m});var n=r(87462),a=(r(67294),r(3905)),l=r(59263),c=r(20456);r(98277),r(46470),r(10080);const i={description:"<data-view.radar-chart>"},u=void 0,d={unversionedId:"bricks/data-view/radar-chart",id:"bricks/data-view/radar-chart",title:"radar-chart",description:"<data-view.radar-chart>",source:"@site/docs/bricks/data-view/radar-chart.md",sourceDirName:"bricks/data-view",slug:"/bricks/data-view/radar-chart",permalink:"/brick-docs/bricks/data-view/radar-chart",draft:!1,tags:[],version:"current",frontMatter:{description:"<data-view.radar-chart>"},sidebar:"docsSidebar",previous:{title:"particle-animation",permalink:"/brick-docs/bricks/data-view/particle-animation"},next:{title:"tabs-drawer",permalink:"/brick-docs/bricks/data-view/tabs-drawer"}},o={},m=[{value:"Properties",id:"properties",level:2}],p={toc:m},s="wrapper";function E(e){let{components:t,...r}=e;return(0,a.kt)(s,(0,n.Z)({},p,r,{components:t,mdxType:"MDXLayout"}),(0,a.kt)(l.Z,{name:"data-view.radar-chart",mdxType:"BrickTagName"}),(0,a.kt)("h2",{id:"properties"},"Properties"),(0,a.kt)(c.Z,{properties:[{name:"dataSource",description:"",required:!0,default:null,attribute:!1,type:"Data[]"},{name:"width",description:"",required:!0,default:null,attribute:!1,type:"number"},{name:"radius",description:"",required:!0,default:null,attribute:!1,type:"number"},{name:"scale",description:"",required:!0,default:"0.25",attribute:!1,type:"number"},{name:"height",description:"",required:!0,default:null,attribute:!1,type:"number"},{name:"value",description:"",required:!0,default:null,attribute:!1,type:"number | string"},{name:"dataFill",description:"",required:!0,default:null,attribute:!1,type:"DataFill"},{name:"dataCircle",description:"",required:!0,default:null,attribute:!1,type:"DataCircle"},{name:"dataLine",description:"",required:!0,default:null,attribute:!1,type:"DataLine"}],mdxType:"BrickDocProperties"}))}E.isMDXComponent=!0}}]);