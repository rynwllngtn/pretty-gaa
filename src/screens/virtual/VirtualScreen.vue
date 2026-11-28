<script setup lang="ts">
import VirtualHeader from './components/VirtualHeader.vue';
import VirtualHome from './components/VirtualHome.vue';
import VirtualSidebar from './components/VirtualSidebar.vue';
</script>

<template>
    <div class="virtual-layout">
        <VirtualSidebar/>
        <main class="virtual-main">
            <VirtualHeader/>
            <div class="main-scroll">
                <VirtualHome/>
                <footer class="virtual-footer">
                    SIGAA • STI UFCG • (83) 2101-1358 • © 2006–2026 UFRN • v4.20.11-ufcg
                </footer>
            </div>
        </main>
    </div>
</template>

<style scoped>
.virtual-layout {
    inset: 0;
    position: fixed;
    display: grid;
    grid-template-columns: clamp(310px, 30%, 410px) 1fr;
    overflow: hidden;
    background: var(--bg-page);

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
}

.virtual-main {
    display: flex;
    flex-direction: column;
    overflow: hidden;
    background-color: var(--bg-subtle);
    background-image:
        radial-gradient(ellipse 65% 65% at 50% 48%, var(--bg-subtle) 40%, oklch(from var(--bg-subtle) l c h / 0) 85%),
        radial-gradient(oklch(from var(--color-gray-400) l c h / 0.3) 1px, transparent 1px),
        radial-gradient(oklch(from var(--color-gray-400) l c h / 0.3) 1px, transparent 1px);
    background-position: 0 0, 0 0, 6px 6px;
    background-size: 100% 100%, 12px 12px, 12px 12px;

    @media (max-width: 768px) {
        overflow: visible;
    }
}

.main-scroll {
    flex: 1;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    scrollbar-gutter: stable;
    scrollbar-width: thin;
    scrollbar-color: var(--color-gray-300) transparent;

    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: transparent;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--color-gray-300);
        border-radius: 999px;
    }

    @media (max-width: 768px) {
        overflow-y: visible;
        scrollbar-gutter: auto;
    }

    .virtual-footer {
        margin-top: auto;
        padding: 0 32px 20px;
        text-align: center;
        font-size: 12px;
        color: var(--text-muted);

        @media (max-width: 768px) {
            padding: 0 20px 20px;
        }
    }
}
</style>