<script setup lang="ts">
import type { MenuItem } from "../portal.parser.ts";

defineProps<{ items: MenuItem[]; }>();
</script>

<template>
    <ul class="menu-list">
        <li v-for="item in items">
            <details v-if="item.items?.length" class="submenu-details">
                <summary class="submenu-group">
                    {{ item.label }}
                </summary>
                <PortalMenuList :items="item.items"/>
            </details>
            <button v-else @click="item.open?.()" type="button" class="menu-item">
                {{ item.label }}
            </button>
        </li>
    </ul>
</template>

<style scoped>
.menu-list {
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 6px;
    padding-left: 10px;
    border-left: 1px solid var(--border-on-dark);

    .submenu-group,
    .menu-item {
        display: block;
        width: 100%;
        padding: 8px 10px;
        font-size: 12px;
        text-align: left;
        border-radius: 6px;
        cursor: pointer;
        transition: background-color 0.15s ease, color 0.15s ease;
    }

    .submenu-group {
        font-weight: 600;
        color: var(--text-on-dark);
        background: var(--bg-sidebar-surface);
        border: 1px solid var(--border-on-dark);

        &::-webkit-details-marker {
            display: none;
        }

        &:hover,
        .submenu-details[open] > & {
            background: var(--bg-sidebar-hover);
            border-color: var(--border-on-dark-strong);
        }
    }

    .menu-item {
        color: var(--text-on-dark-muted);
        background: transparent;
        border: none;

        &:hover {
            color: var(--text-on-dark);
            background: var(--bg-sidebar-hover);
        }
    }
}
</style>