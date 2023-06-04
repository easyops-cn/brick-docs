"use strict";(self.webpackChunkbrick_docs=self.webpackChunkbrick_docs||[]).push([[7551],{3905:(e,t,n)=>{n.d(t,{Zo:()=>u,kt:()=>f});var r=n(67294);function l(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){l(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function o(e,t){if(null==e)return{};var n,r,l=function(e,t){if(null==e)return{};var n,r,l={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(l[n]=e[n]);return l}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(l[n]=e[n])}return l}var i=r.createContext({}),m=function(e){var t=r.useContext(i),n=t;return e&&(n="function"==typeof e?e(t):c(c({},t),e)),n},u=function(e){var t=m(e.components);return r.createElement(i.Provider,{value:t},e.children)},p="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},d=r.forwardRef((function(e,t){var n=e.components,l=e.mdxType,a=e.originalType,i=e.parentName,u=o(e,["components","mdxType","originalType","parentName"]),p=m(n),d=l,f=p["".concat(i,".").concat(d)]||p[d]||s[d]||a;return n?r.createElement(f,c(c({ref:t},u),{},{components:n})):r.createElement(f,c({ref:t},u))}));function f(e,t){var n=arguments,l=t&&t.mdxType;if("string"==typeof e||l){var a=n.length,c=new Array(a);c[0]=d;var o={};for(var i in t)hasOwnProperty.call(t,i)&&(o[i]=t[i]);o.originalType=e,o[p]="string"==typeof e?e:l,c[1]=o;for(var m=2;m<a;m++)c[m]=n[m];return r.createElement.apply(null,c)}return r.createElement.apply(null,n)}d.displayName="MDXCreateElement"},46470:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{events:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Event Detail"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,r.createElement(l.Z,null,e.detail?.type),e.detail?.description?` - ${e.detail?.description}`:""))))))}},10080:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{methods:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Params"),r.createElement("th",null,"Return"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,e.params.map(((e,t,n)=>r.createElement(r.Fragment,{key:t},r.createElement("code",null,e),t<n.length-1?", ":"")))),r.createElement("td",null,r.createElement(l.Z,null,e.return?.type),e.return?.description?` - ${e.return?.description}`:""))))))}},20456:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{properties:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"),r.createElement("th",null,"Type"),r.createElement("th",null,"Default"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement("code",null,e.name)),r.createElement("td",null,e.description),r.createElement("td",null,r.createElement(l.Z,null,e.type)),r.createElement("td",null,r.createElement(l.Z,null,e.default)))))))}},98277:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294),l=n(32403);function a(e){let{slots:t}=e;return r.createElement("table",null,r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null,"Name"),r.createElement("th",null,"Description"))),r.createElement("tbody",null,t.map((e=>r.createElement("tr",{key:e.name},r.createElement("td",null,r.createElement(l.Z,{fallback:"(default)"},e.name)),r.createElement("td",null,e.description))))))}},59263:(e,t,n)=>{n.d(t,{Z:()=>a});var r=n(67294);const l={tagName:"tagName_MOG8"};function a(e){let{name:t}=e;return r.createElement("div",{className:l.tagName},r.createElement("code",null,"<",t,">"))}},32403:(e,t,n)=>{n.d(t,{Z:()=>l});var r=n(67294);function l(e){let{fallback:t,children:n}=e;return n?r.createElement("code",null,n):t?r.createElement(r.Fragment,null,t):null}},58590:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>p,contentTitle:()=>m,default:()=>E,frontMatter:()=>i,metadata:()=>u,toc:()=>s});var r=n(87462),l=(n(67294),n(3905)),a=n(59263),c=n(20456),o=(n(98277),n(46470));n(10080);const i={description:"<form.general-checkbox>"},m=void 0,u={unversionedId:"bricks/form/general-checkbox",id:"bricks/form/general-checkbox",title:"general-checkbox",description:"<form.general-checkbox>",source:"@site/docs/bricks/form/general-checkbox.md",sourceDirName:"bricks/form",slug:"/bricks/form/general-checkbox",permalink:"/brick-docs/bricks/form/general-checkbox",draft:!1,tags:[],version:"current",frontMatter:{description:"<form.general-checkbox>"},sidebar:"docsSidebar",previous:{title:"dynamic-form-item",permalink:"/brick-docs/bricks/form/dynamic-form-item"},next:{title:"general-form-item",permalink:"/brick-docs/bricks/form/general-form-item"}},p={},s=[{value:"Properties",id:"properties",level:2},{value:"Events",id:"events",level:2}],d={toc:s},f="wrapper";function E(e){let{components:t,...n}=e;return(0,l.kt)(f,(0,r.Z)({},d,n,{components:t,mdxType:"MDXLayout"}),(0,l.kt)(a.Z,{name:"form.general-checkbox",mdxType:"BrickTagName"}),(0,l.kt)("h2",{id:"properties"},"Properties"),(0,l.kt)(c.Z,{properties:[{name:"value",description:"",attribute:!1,type:"string[]"},{name:"options",description:"",required:!0,default:"-",attribute:!1,type:"CheckboxOptionType[]"},{name:"name",description:"",attribute:!1,type:"string"},{name:"label",description:"",type:"string"},{name:"type",description:"",default:'"default"',attribute:!1,type:"CheckboxType"},{name:"isCustom",description:"",default:"false",attribute:!1,type:"boolean"}],mdxType:"BrickDocProperties"}),(0,l.kt)("h2",{id:"events"},"Events"),(0,l.kt)(o.Z,{events:[{name:"change",description:"",detail:{description:null,type:"CheckboxOptionType[]"}}],mdxType:"BrickDocEvents"}))}E.isMDXComponent=!0}}]);