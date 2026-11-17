import { createApp } from 'vue';
import App from '../App.vue';

import { detectPage, Pages} from '../core/detector.ts';

export default defineContentScript({
    matches: ['*://*.edu.br/sigaa/*'],
    cssInjectionMode: 'ui',
    runAt: 'document_idle',

    async main(ctx) {
        const page = detectPage();
        if (page === Pages.unknown) return;

        const ui = await createShadowRootUi(ctx, {
            name: 'pretty-gaa',
            position: 'inline',
            anchor: 'body',

            onMount(container) : any {
                return createApp(App, { page: page } ).mount(container);
            },
            onRemove(app) {
                app?.unmount();
            },
        });

    ui.mount();
    },
});