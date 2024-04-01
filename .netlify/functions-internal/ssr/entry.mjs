import { renderers } from './renderers.mjs';
import { manifest } from './manifest_B2M4yX_v.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DxPzXJPj.mjs');
const _page1 = () => import('./chunks/studio-route_XYE-ISyV.mjs');
const _page2 = () => import('./chunks/about-us_C_yOPPUZ.mjs');
const _page3 = () => import('./chunks/buy_DqcoBBn8.mjs');
const _page4 = () => import('./chunks/careers_zmycDwFS.mjs');
const _page5 = () => import('./chunks/clubs-and-coaches_BNEaC9Kk.mjs');
const _page6 = () => import('./chunks/faq_Dm2bVJrb.mjs');
const _page7 = () => import('./chunks/rover_CrRQq3BS.mjs');
const _page8 = () => import('./chunks/station_iOuf1UVt.mjs');
const _page9 = () => import('./chunks/index_CYUkhEw8.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/@sanity/astro/dist/studio/studio-route.astro", _page1],
    ["src/pages/about-us.astro", _page2],
    ["src/pages/buy.astro", _page3],
    ["src/pages/careers.astro", _page4],
    ["src/pages/clubs-and-coaches.astro", _page5],
    ["src/pages/faq.astro", _page6],
    ["src/pages/rover.astro", _page7],
    ["src/pages/station.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "e4b71d95-16d1-4b1d-9af2-720fb2a52602"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
