<script setup lang="ts">
import type { PortalTab } from "../PortalScreen.vue";
import { getMenuGroups, getSidebarLinks, openAcademicIndices } from "../portal.parser.ts";
import PortalMenuList from "./PortalMenuList.vue";

const activeTab = defineModel<PortalTab>({ required: true });

const navigationLinks = getSidebarLinks();
const menuGroups = getMenuGroups();

const tabs: { id: PortalTab; label: string }[] = [
    { id: 'home', label: 'Início' },
    { id: 'institutional', label: 'Dados Institucionais' }
];

const recentLinks: any = [];
</script>

<template>
    <aside class="portal-sidebar">
        <header class="sigaa-identification">
            <div class="sigaa-name">
                <strong>SIGAA</strong>
                <span>UFCG</span>
            </div>
            <p class="sigaa-description">Sistema Integrado de Gestão de Atividades Acadêmicas</p>
        </header>
        <div class="sidebar-routes">
            <nav v-if="recentLinks.length" class="portal-recent">
                <h2 class="recent-title">Usados recentemente</h2>
                <ul class="recent-list">
                    <li v-for="item in recentLinks">
                        <button type="button" class="recent-link">
                            {{ item }}
                        </button>
                    </li>
                </ul>
            </nav>
            <nav class="portal-navigation">
                <h2 class="navigation-title">Navegação</h2>
                <ul class="navigation-list">
                    <li v-for="tab in tabs">
                        <button
                            type="button"
                            class="navigation-item"
                            :class="{ active: activeTab === tab.id }"
                            @click="activeTab = tab.id"
                        >
                            {{ tab.label }}
                        </button>
                    </li>
                    <li><button @click="openAcademicIndices" type="button" class="navigation-item">Índices Acadêmicos</button></li>
                    <li><a :href="navigationLinks.mailbox" class="navigation-item">Caixa Postal</a></li>
                </ul>
            </nav>
            <nav class="sigaa-menus">
                <h2 class="menus-title">Menus do SIGAA</h2>
                <ul class="menus-list">
                    <li v-for="group in menuGroups">
                        <details name="sigaa-menu" class="menu-details">
                            <summary class="menu-group">
                                {{ group.name }}
                            </summary>
                            <PortalMenuList :items="group.items"/>
                        </details>
                    </li>
                </ul>
            </nav>
        </div>
        <footer class="sidebar-footer">
            <div class="footer-actions">
                <a :href="navigationLinks.switchRole" class="footer-action">
                    Alterar vínculo
                </a>
                <a :href="navigationLinks.logout" class="footer-action danger">
                    Sair
                </a>
            </div>
        </footer>
    </aside>
</template>

<style scoped>
.portal-sidebar {
    min-height: 0;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px 0;
    overflow: hidden;
    color: var(--text-on-dark);
    background: linear-gradient(135deg, var(--bg-sidebar-top) 0%, var(--bg-sidebar-bottom) 100%);
    border-right: 3px solid var(--color-accent-strong);

    @media (max-width: 768px) {
        overflow: visible;
        padding: 24px 0 20px;
        border-right: none;
        border-bottom: 2px solid var(--color-accent-strong);
    }

    .sigaa-identification {
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 0 32px;

        @media (max-width: 768px) {
            padding: 0 20px;
        }

        .sigaa-name {
            display: flex;
            align-items: baseline;
            gap: 10px;

            & strong {
                font-size: 22px;
                font-weight: 800;
            }

            & span {
                font-size: 13px;
                font-weight: 700;
                letter-spacing: 0.1em;
                color: var(--color-accent);
            }
        }

        .sigaa-description {
            font-size: 13px;
            color: var(--text-on-dark-muted);
        }
    }

    .sidebar-routes {
        min-height: 0;
        flex: 1;
        display: flex;
        flex-direction: column;
        gap: 20px;
        padding: 20px 32px;
        overflow-y: auto;
        scrollbar-gutter: stable;
        scrollbar-width: thin;
        scrollbar-color: var(--border-on-dark-strong) transparent;
        border-top: 1px solid var(--border-on-dark);

        &::-webkit-scrollbar {
            width: 6px;
        }

        &::-webkit-scrollbar-track {
            background: transparent;
        }

        &::-webkit-scrollbar-thumb {
            background: var(--border-on-dark-strong);
            border-radius: 999px;
        }

        @media (max-width: 768px) {
            overflow-y: visible;
            scrollbar-gutter: auto;
            padding: 20px 20px 0;
        }

        .portal-recent,
        .portal-navigation,
        .sigaa-menus {
            display: flex;
            flex-direction: column;
            gap: 10px;
            padding-top: 20px;
            border-top: 1px solid var(--border-on-dark);

            &:first-child {
                padding-top: 0;
                border-top: none;
            }
        }

        .recent-title,
        .navigation-title,
        .menus-title {
            font-size: 11px;
            font-weight: 700;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--text-on-dark-subtle);
        }

        .recent-list,
        .navigation-list,
        .menus-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .recent-link,
        .navigation-item {
            display: block;
            width: 100%;
            padding: 9px 12px;
            font-size: 13px;
            font-weight: 500;
            text-align: left;
            color: var(--text-on-dark-muted);
            background: transparent;
            border: 1px solid transparent;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.15s ease, color 0.15s ease, border-color 0.15s ease;

            &:hover {
                color: var(--text-on-dark);
                background: var(--bg-sidebar-hover);
            }
        }

        .recent-link {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .navigation-item.active {
            color: var(--text-on-dark);
            font-weight: 600;
            background: var(--bg-sidebar-hover);
            border-color: var(--border-on-dark-strong);
            box-shadow: inset 3px 0 0 var(--color-accent-strong);
        }

        .menu-group {
            display: block;
            padding: 10px 12px;
            font-size: 13px;
            font-weight: 600;
            color: var(--text-on-dark);
            background: var(--bg-sidebar-surface);
            border: 1px solid var(--border-on-dark);
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.15s ease, border-color 0.15s ease;

            &::-webkit-details-marker {
                display: none;
            }

            &:hover,
            .menu-details[open] > & {
                background: var(--bg-sidebar-hover);
                border-color: var(--border-on-dark-strong);
            }
        }
    }

    .sidebar-footer {
        flex-shrink: 0;
        margin: 0 32px;
        padding-top: 20px;
        border-top: 1px solid var(--border-on-dark);
        display: flex;
        flex-direction: column;
        gap: 16px;

        @media (max-width: 768px) {
            margin: 0 20px;
        }

        .footer-actions {
            display: flex;
            gap: 8px;
        }

        .footer-action {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 10px 12px;
            font-size: 12px;
            font-weight: 600;
            color: var(--text-on-dark);
            background: var(--bg-sidebar-surface);
            border: 1px solid var(--border-on-dark);
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.15s ease, border-color 0.15s ease;

            &:hover {
                background: var(--bg-sidebar-hover);
            }

            &.danger:hover {
                border-color: var(--color-accent-strong);
            }
        }
    }
}
</style>