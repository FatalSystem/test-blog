import { renderers } from './renderers.mjs';
import { manifest } from './manifest_CL_rXiIa.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DxPzXJPj.mjs');
const _page1 = () => import('./chunks/studio-route_BX6idU5P.mjs');
const _page2 = () => import('./chunks/about-us_tveou5Op.mjs');
const _page3 = () => import('./chunks/buy_dWuHqBZS.mjs');
const _page4 = () => import('./chunks/careers_Cjd-4Ql3.mjs');
const _page5 = () => import('./chunks/clubs-and-coaches_Bv4R6jR4.mjs');
const _page6 = () => import('./chunks/faq_C1mnyNJz.mjs');
const _page7 = () => import('./chunks/privacy_CfPoVxut.mjs');
const _page8 = () => import('./chunks/rover_BZR6bQ9_.mjs');
const _page9 = () => import('./chunks/station_CRZd557e.mjs');
const _page10 = () => import('./chunks/terms_DdFko3fK.mjs');
const _page11 = () => import('./chunks/index_ByESvdd4.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["node_modules/@sanity/astro/dist/studio/studio-route.astro", _page1],
    ["src/pages/about-us.astro", _page2],
    ["src/pages/buy.astro", _page3],
    ["src/pages/careers.astro", _page4],
    ["src/pages/clubs-and-coaches.astro", _page5],
    ["src/pages/faq.astro", _page6],
    ["src/pages/privacy.astro", _page7],
    ["src/pages/rover.astro", _page8],
    ["src/pages/station.astro", _page9],
    ["src/pages/terms.astro", _page10],
    ["src/pages/index.astro", _page11]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    renderers,
    middleware: onRequest
});
const _args = {
    "middlewareSecret": "23860ea8-0d7c-4203-a7e1-dd9df85fe1e5"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
