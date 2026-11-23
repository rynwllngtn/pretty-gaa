<script setup lang="ts">
import { getRegisterLinks, getSystemsLinks } from "../login.parser.ts";

const integratedSystems = getSystemsLinks();
const registrationProfiles = getRegisterLinks();
</script>

<template>
    <aside class="login-sidebar">
        <header class="sigaa-identification">
            <div class="sigaa-name">
                <strong>SIGAA</strong>
                <span>UFCG</span>
            </div>
            <p class="sigaa-description">Sistema Integrado de Gestão de Atividades Acadêmicas</p>
        </header>
        <nav class="sigaa-systems">
            <h2 class="systems-title">Sistemas Integrados</h2>
            <ul class="systems-list">
                <li v-for="system in integratedSystems">
                    <a :href="system.href" class="system-item" :class="{ active: system.active }">
                        <strong> {{ system.name }} </strong>
                        <span> {{ system.description }} </span>
                    </a>
                </li>
            </ul>
        </nav>
        <nav class="sigaa-registration">
            <h2 class="registration-title">Novo Usuário</h2>
            <ul class="registration-list">
                <li v-for="profile in registrationProfiles">
                    <a :href="profile.link" class="profile-item"> {{ profile.name }} </a>
                </li>
            </ul>
        </nav>
        <footer class="sidebar-footer">
            <span>STI • (83) 2101-1358</span>
            <span class="version-tag">v4.20.11-ufcg</span>
        </footer>
    </aside>
</template>

<style scoped>
.login-sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px;
    overflow-y: auto;
    color: var(--text-on-dark);
    background: linear-gradient(135deg, var(--bg-sidebar-top) 0%, var(--bg-sidebar-bottom) 100%);
    border-right: 3px solid var(--color-accent-strong);

    @media (max-width: 768px) {
        overflow-y: visible;
        padding: 24px 20px 20px;
        border-right: none;
        border-top: 2px solid var(--color-accent-strong);
    }

    .systems-title,
    .registration-title {
        font-size: 11px;
        font-weight: 700;
        letter-spacing: 0.1em;
        text-transform: uppercase;
        color: var(--text-on-dark-subtle);
    }

    .sigaa-identification {
        display: flex;
        flex-direction: column;
        gap: 8px;

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

    .sigaa-systems {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 20px;
        border-top: 1px solid var(--border-on-dark);

        .systems-list {
            display: flex;
            flex-direction: column;
            gap: 6px;
        }

        .system-item {
            display: flex;
            flex-direction: column;
            gap: 2px;
            padding: 14px;
            border: 1px solid transparent;
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.15s ease, border-color 0.15s ease;

            &:hover {
                background: var(--bg-sidebar-hover);
            }

            &.active {
                background: var(--bg-sidebar-hover);
                border-color: var(--border-on-dark-strong);
                box-shadow: inset 3px 0 0 var(--color-accent-strong);
            }

            & strong {
                font-size: 14px;
                color: var(--text-on-dark);
            }

            & span {
                font-size: 12px;
                color: var(--text-on-dark-muted);
            }
        }
    }

    .sigaa-registration {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 20px;
        border-top: 1px solid var(--border-on-dark);

        @media (max-width: 768px) {
            margin-top: 0;
        }

        .registration-list {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;

            & li {
                flex: 1 1 auto;
            }
        }

        .profile-item {
            display: flex;
            justify-content: center;
            padding: 10px 12px;
            font-size: 12px;
            font-weight: 600;
            color: var(--text-on-dark);
            background: var(--bg-sidebar-surface);
            border: 1px solid var(--border-on-dark);
            border-radius: 8px;
            cursor: pointer;
            transition: background-color 0.15s ease, border-color 0.15s ease, box-shadow 0.15s ease;

            &:hover {
                background: var(--bg-sidebar-hover);
                border-color: var(--border-on-dark-strong);
                box-shadow: inset 3px 0 0 var(--color-accent-strong);
            }
        }
    }

    .sidebar-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 20px;
        font-size: 12px;
        font-weight: 700;
        border-top: 1px solid var(--border-on-dark);
        color: var(--text-on-dark-subtle);
    }
}
</style>