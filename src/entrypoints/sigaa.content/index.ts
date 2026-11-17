import { createApp } from 'vue';
import App from './App.vue';

export default defineContentScript({
    matches: ['*://*.edu.br/sigaa/*'],
    cssInjectionMode: 'ui',
    runAt: 'document_idle',

    async main(ctx) {
        const ui = await createShadowRootUi(ctx, {
            name: 'pretty-gaa',
            position: 'inline',
            anchor: 'body',

            onMount(container) : any {
                return createApp(App).mount(container);
            },
            onRemove(app) {
                app?.unmount();
            },
        });

    ui.mount();
    },
});