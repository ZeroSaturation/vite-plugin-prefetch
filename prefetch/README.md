# vite-plugin-prefetch-api

A prefetch plugin for an API, which inserts the APIs that need to be requested in advance into the head tag and mounts the request information on the window object. Suitable for CSR projects.

## Installation

```sh
npm i vite-plugin-prefetch-api
```

or

```sh
yarn add vite-plugin-prefetch-api
```

or

```sh
pnpm i vite-plugin-prefetch-api
```

## Usage

Configuration

```javascript
// vite.config.js
import { defineConfig } from "vite";
import PrefetchPlugin from "vite-plugin-prefetch-api";

export default defineConfig({
  plugins: [
    PrefetchPlugin({
      list: [
        {
          url: '/api/task',
          method: 'post',
          adapter: function(data) {
            return { body: { username: data.cookie.username } }
          }
        },
        {
          url: '/api/msg',
          method: 'get',
          adapter: function(data) {
            return { query: { uid: data.cookie.uid } }
          },
          trigger: function(data) {
            return data.hash === 'inbox'
          }
        }
      ]
    })
  ],
});
```


Get Prefetch Data

```typescript
import { getCache } from "vite-plugin-prefetch-api/util";

export async function request(url: string, options: any) {
    const cacheFetch = getCache({ url, ...options });
    if (cacheFetch) {
        return cacheFetch;
    }
    return fetch(url, options).then((res) => res.json());
}
```

Html before:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>example</title>
    <script type="module" crossorigin src="/assets/index-127f2da4.js"></script>
    <link rel="stylesheet" href="/assets/index-c322ae43.css">
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

Html after:

```html
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>example</title>
    <script type="module" crossorigin src="/assets/index-b747b36c.js"></script>
    <link rel="stylesheet" href="/assets/index-8c9b6ecb.css">
    <script>!function(){try{const n="__PREFETCH__",c={cookie:document.cookie.split("; ").reduce(function(e,t){var[t,o]=t.split("=");return e[t]=decodeURIComponent(o),e},{}),query:location.search.slice(1).split("&").reduce(function(e,t){t=t.split("=");return e[decodeURIComponent(t[0])]=decodeURIComponent(t[1]||""),e},{}),hash:location.hash.slice(2),path:location.pathname};function r(e,t,o){t=function r(c){return Object.keys(c).sort().reduce(function(t,e){var o=c[e];if(void 0!==o){var n=e+":"+("object"==typeof o?r(o):o);for(let e=0;e<n.length;e++)t=(t<<5)-t+n.charCodeAt(e)}return t},0).toString(36)}(t);window[n]=window[n]||{},window[n][t]={count:o||1,value:e}}function o(e){var t=function(e,t){var{url:o,method:n}=e;try{var r=e["adapter"];const{body:i,header:a,query:u={}}=r(t)||{};var c=Object.keys(u).map(e=>e+"="+u[e]).join("&");return{url:c?o+"?"+c:o,method:n,body:i,header:a}}catch(e){return{url:o,method:n}}}(e,c);const{url:o,...n}=t;r(function(e,t){const{header:o,method:n="get"}=t,r=new Headers;return r.append("Content-Type","application/json"),o&&Object.keys(o).forEach(function(e){r.append(e,o[e])}),t={body:t.body?JSON.stringify(t.body):void 0,headers:r,method:n.toLocaleUpperCase()},fetch(e,t).then(e=>e.ok?e.json():Promise.reject(e.statusText))}(o,n),t,e.count||1)}[{url:"/api/task",method:"post",adapter:function(e){return{body:{username:e.cookie.username}}},count:1,trigger:function(){return 1}},{url:"/api/msg",method:"get",adapter:function(e){return{query:{uid:e.cookie.uid}}},trigger:function(e){return"inbox"===e.hash},count:1}].forEach(({trigger:e,...t})=>{e(c)&&o(t)})}catch(e){console.error("[prefetch-api error]",String(e))}}();</script>
  </head>
  <body>
    <div id="app"></div>
  </body>
</html>
```

## Why prefetch?

The CSR project is executed in the normal order of network load execution and JS execution:  
![normal](https://github.com/ZeroSaturation/vite-plugin-prefetch-api/blob/main/assets/normal.png)

When you prefetch an api interface：  
![use-prefetch-api](https://github.com/ZeroSaturation/vite-plugin-prefetch-api/blob/main/assets/use-prefetch-api.png)

