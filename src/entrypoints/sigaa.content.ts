import { createApp } from 'vue';
import App from '../App.vue';

import { detectPage, Pages} from '../core/detector.ts';

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
        if (currentPage !== Pages.unknown) {
            wrapOriginalDOM();
            const ui = await createShadowRootUi(ctx, {
                name: 'prettygaa-dom',
                position: 'inline',
                anchor: 'body',

                onMount(container): any {
                    return createApp(App, { page: currentPage }).mount(container);
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
    wrapper.style.opacity = '0.2';

    const nodes = Array.from(document.body.childNodes).filter(
        node => node.nodeName !== 'SCRIPT'
    );

    wrapper.append(...nodes);
    document.body.appendChild(wrapper);
    return wrapper;
}