"use strict";(self.webpackChunk_next_bricks_icons=self.webpackChunk_next_bricks_icons||[]).push([[712],{2159:(t,e,r)=>{function n(t,e){if(null==t)return{};var r,n,i=function(t,e){if(null==t)return{};var r,n,i={},o=Object.keys(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||(i[r]=t[r]);return i}(t,e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(t);for(n=0;n<o.length;n++)r=o[n],e.indexOf(r)>=0||Object.prototype.propertyIsEnumerable.call(t,r)&&(i[r]=t[r])}return i}r.d(e,{Z:()=>n})},6522:(t,e,r)=>{function n(t){return n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},n(t)}r.d(e,{Z:()=>n})},7252:(t,e,r)=>{r.r(e),r.d(e,{NextElement:()=>S,createDecorators:()=>f,supportsAdoptingStyleSheets:()=>k});var n=r(2159),i=r(6522);function o(t,e,r){return(e=function(t){var e=function(t,e){if("object"!==(0,i.Z)(t)||null===t)return t;var r=t[Symbol.toPrimitive];if(void 0!==r){var n=r.call(t,"string");if("object"!==(0,i.Z)(n))return n;throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t);return"symbol"===(0,i.Z)(e)?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function s(t,e){var r=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);e&&(n=n.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),r.push.apply(r,n)}return r}function a(t){for(var e=1;e<arguments.length;e++){var r=null!=arguments[e]?arguments[e]:{};e%2?s(Object(r),!0).forEach((function(e){o(t,e,r[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(r,e))}))}return t}var l=Symbol("attributeHasBeenSet"),u=Symbol("stopAttributeChangedCallback"),c=["type"],d={attribute:!0,type:String,converter:{toAttribute:(t,e)=>e===Boolean?t?"":null:t,fromAttribute(t,e){switch(e){case Boolean:return null!==t&&"false"!==t;case Number:return null===t?null:Number(t)}return t}},reflect:!0,hasChanged:(t,e)=>e!==t&&(e==e||t==t)};function f(){var t=new Map,e=new Set,r=new Set,i=new Set;return{defineElement:function(n,o){return(s,l)=>{var{kind:u,name:c,addInitializer:d}=l;d((function(){var s,l,u,c,d,f=Object.getPrototypeOf(this);b(this,"observedAttributes",h(null!==(s=f.observedAttributes)&&void 0!==s?s:[],t.keys())),b(this,"__attributeReflections",new Map([...null!==(l=f.__attributeReflections)&&void 0!==l?l:[],...t])),b(this,"styleTexts",null==o?void 0:o.styleTexts),b(this,"shadowOptions",!1!==(null==o?void 0:o.shadowOptions)?a({mode:"open"},null==o?void 0:o.shadowOptions):null),b(this,"__tagName",n),b(this,"_dev_only_definedProperties",h(null!==(u=f._dev_only_definedProperties)&&void 0!==u?u:[],e)),b(this,"_dev_only_definedMethods",h(null!==(c=f._dev_only_definedMethods)&&void 0!==c?c:[],r)),b(this,"_dev_only_definedEvents",h(null!==(d=f._dev_only_definedEvents)&&void 0!==d?d:[],i)),customElements.define(n,this)}))}},property:function(r){return function(n,i){var{get:o,set:s}=n,{kind:c,name:f,static:b,private:h}=i;e.add(f);var p=Object.assign({},d,r),v=function(t,e){var r=e.attribute;return!1===r?void 0:"string"==typeof r?r:"string"==typeof t?t.replace(/[A-Z]/g,(t=>"-".concat(t.toLowerCase()))):void 0}(f,p);return void 0!==v&&t.set(v,a(a({},p),{},{property:f})),{get(){return void 0!==v&&this[l](v)?p.converter.fromAttribute(this.getAttribute(v),p.type):o.call(this)},set(t){var e=o.call(this);if(s.call(this,t),p.hasChanged(t,e)){if(void 0!==v){var r=p.converter.toAttribute(t,p.type);this[u](!0),null==r?this.removeAttribute(v):this.setAttribute(v,r),this[u](!1)}this._requestRender()}},init(t){if(void 0!==v&&p.hasChanged(t,void 0)){var e=p.converter.toAttribute(t,p.type);null!=e&&requestAnimationFrame((()=>{this[l](v)||(this[u](!0),this.setAttribute(v,e),this[u](!1))}))}return t}}}},method:function(t){return function(e,n){var{kind:i,name:o,static:s,private:a,addInitializer:l}=n;null!=t&&t.bound&&l((function(){this[o]=this[o].bind(this)})),r.add(o)}},event:function(t){return function(e,r){var{get:o}=e,{kind:s,name:l,static:u,private:d}=r,{type:f}=t,b=(0,n.Z)(t,c);return i.add(f),{get(){return o.call(this)},set(){throw new Error("Decorated events are readonly")},init(t){return Object.freeze({emit:t=>this.dispatchEvent(new CustomEvent(f,a(a({},b),{},{detail:t})))})}}}}}}function b(t,e,r){Object.defineProperty(t,e,{get:()=>r,configurable:!0})}function h(t,e){var r=new Set(t);for(var n of e)r.add(n);return[...r]}new Set(["prefix"]);var p,v=r(3395),y=r(687),m=r(381),_=new WeakMap,w=new WeakMap,g=new WeakMap,O=new WeakMap;class S extends HTMLElement{constructor(){super(...arguments),(0,v.Z)(this,_,{writable:!0,value:!1}),(0,v.Z)(this,w,{writable:!0,value:!1}),(0,v.Z)(this,g,{writable:!0,value:!1}),(0,v.Z)(this,O,{writable:!0,value:new Set})}_markConnectedCallbackCalled(){(0,m.Z)(this,w,!0)}connectedCallback(){this._markConnectedCallbackCalled(),this._render()}[l](t){return(0,y.Z)(this,O).has(t)}[u](t){(0,m.Z)(this,g,t)}attributeChangedCallback(t,e,r){if((0,y.Z)(this,O).add(t),!(0,y.Z)(this,g)&&e!==r){var n=this.constructor.__attributeReflections.get(t),i=n.converter.fromAttribute(r,n.type);this[n.property]=i}}_requestRender(){this.isConnected&&(0,y.Z)(this,w)&&!(0,y.Z)(this,_)&&((0,m.Z)(this,_,!0),Promise.resolve().then((()=>{(0,m.Z)(this,_,!1),this._render()})))}}function k(){return void 0===p&&(p=!!(window.ShadowRoot&&"adoptedStyleSheets"in Document.prototype&&"replace"in CSSStyleSheet.prototype)),p}o(S,"styleTexts",void 0),o(S,"shadowOptions",void 0),o(S,"__attributeReflections",void 0),o(S,"__tagName",void 0)}}]);
//# sourceMappingURL=712.ad7e9439.js.map