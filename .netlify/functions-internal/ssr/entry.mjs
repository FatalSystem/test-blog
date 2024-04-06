import { renderers } from './renderers.mjs';
import { manifest } from './manifest_CwzzXpKd.mjs';
import * as serverEntrypointModule from '@astrojs/netlify/ssr-function.js';
import { onRequest } from './_noop-middleware.mjs';

const _page0 = () => import('./chunks/generic_DxPzXJPj.mjs');
const _page1 = () => import('./chunks/studio-route_COi5B9_K.mjs');
const _page2 = () => import('./chunks/about-us_CTrk7Bp4.mjs');
const _page3 = () => import('./chunks/buy_DvuMyL0J.mjs');
const _page4 = () => import('./chunks/careers_BMVnjj5h.mjs');
const _page5 = () => import('./chunks/clubs-and-coaches_XXZRIr_M.mjs');
const _page6 = () => import('./chunks/faq_CFGztdfg.mjs');
const _page7 = () => import('./chunks/privacy_CIfOdwwx.mjs');
const _page8 = () => import('./chunks/rover_WpQmARB9.mjs');
const _page9 = () => import('./chunks/station_QdEyL6nv.mjs');
const _page10 = () => import('./chunks/terms_BUxAGlb0.mjs');
const _page11 = () => import('./chunks/index_104y9G7Y.mjs');
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
    "middlewareSecret": "edcdf665-d462-4af2-bb86-b588f6bd49fa"
};
const _exports = serverEntrypointModule.createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (_start in serverEntrypointModule) {
	serverEntrypointModule[_start](_manifest, _args);
}

export { __astrojsSsrVirtualEntry as default, pageMap };
