import { createApp } from 'vue';
import App from '../App.vue';

import { detectPage } from '../core/detector.ts';
import { getScreen } from "@/screens";

function waitForBody(): Promise<void> {
    if (document.readyState !== 'loading' && document.body) {
        return Promise.resolve();
    }
    return new Promise((resolve) => {
        document.addEventListener('DOMContentLoaded', () => resolve(), { once: true });
    });
}

export default defineContentScript({
    matches: ['*://*.edu.br/sigaa/*'],
    cssInjectionMode: 'ui',
    runAt: 'document_start',

    async main(ctx) {
        await waitForBody();

        const currentPage = detectPage();
        if (getScreen(currentPage)) {
            wrapOriginalDOM();
            const ui = await createShadowRootUi(ctx, {
                name: 'prettygaa-dom',
                position: 'inline',
                anchor: 'body',

                onMount(container): any {
                    const app = createApp(App, { page: currentPage });
                    app.mount(container);
                    return app;
                },
                onRemove(app) {
                    app?.unmount();
                }
            });
            ui.mount();
        }
    },
});

const originalId = 'sigaa-dom';
function wrapOriginalDOM() {
    const original = document.getElementById(originalId);
    if (original instanceof HTMLDivElement) {
        return original;
    }

    const wrapper = document.createElement('div');
    wrapper.id = originalId;
    wrapper.style.position = 'fixed';
    wrapper.style.inset = '0';
    wrapper.style.opacity = '0';
    wrapper.style.overflow = 'hidden';
    wrapper.style.pointerEvents = 'none';

    const nodes = Array.from(document.body.childNodes).filter(
        node => node.nodeName !== 'SCRIPT'
    );

    wrapper.append(...nodes);
    document.body.appendChild(wrapper);
    return wrapper;
}