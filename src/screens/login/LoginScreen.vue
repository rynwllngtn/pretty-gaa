<script setup lang="ts">
import { ref } from 'vue';
import { setLoginInput, setPasswordInput, submitLoginInput } from "./login.parser.ts";

const user = ref("");
const password = ref("");

function clickSubmit() {
    setLoginInput(user.value);
    setPasswordInput(password.value);
    submitLoginInput();
}

const integratedSystems = [
    { name: 'SIGAA', details: 'Gestão Acadêmica', active: true },
    { name: 'SIPAC', details: 'Administrativo' },
    { name: 'SIGRH', details: 'Recursos Humanos' },
    { name: 'SIGEleição', details: 'Processos Eleitorais' },
    { name: 'SIGAdmin', details: 'Admin. e Comunicação' }
];

const registrationProfiles = [
    { label: 'Aluno', kind: 'student' },
    { label: 'Prof. / Func.', kind: 'staff' },
    { label: 'Familiares', kind: 'family' }
];
</script>

<template>
    <div class="login-layout">
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
                        <a class="system-item" :class="{ active: system.active }">
                            <strong> {{ system.name }} </strong>
                            <span> {{ system.details }} </span>
                        </a>
                    </li>
                </ul>
            </nav>
            <nav class="sigaa-registration">
                <h2 class="registration-title">Novo Usuário</h2>
                <ul class="registration-list">
                    <li v-for="profile in registrationProfiles">
                        <a class="profile-item"> {{ profile.label }} </a>
                    </li>
                </ul>
            </nav>
            <footer class="sidebar-footer">
                <span>STI • (83) 2101-1358</span>
                <span class="version-tag">v4.20.11-ufcg</span>
            </footer>
        </aside>
        <main class="login-main">
            <form class="login-form" @submit.prevent="clickSubmit">
                <header class="login-title">
                    <h1>Entrar no Sistema</h1>
                    <p>Informe seu usuário e senha para continuar.</p>
                </header>
                <div class="form-field">
                    <label for="login-user">Usuário</label>
                    <input v-model="user" id="login-user" type="text" placeholder="Usuário ou CPF" required/>
                </div>
                <div class="form-field">
                    <label for="login-password">Senha</label>
                    <input v-model="password" id="login-password" type="password" placeholder="••••••••" required/>
                </div>
                <button class="submit-btn" type="submit">Entrar</button>
                <nav class="login-links">
                    <a class="text-link">Esqueceu o login?</a>
                    <a class="text-link">Esqueceu a senha?</a>
                </nav>
            </form>
            <footer class="login-footer">SIGAA • STI UFCG • © 2006–2026 UFRN</footer>
        </main>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

.login-layout {
    position: fixed;
    inset: 0;
    display: grid;
    grid-template-columns: clamp(310px, 30%, 410px) 1fr;
    overflow: hidden;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: var(--bg-page);
    color: var(--text-primary);

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-y: auto;
    }
}

.login-sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 32px;
    overflow-y: auto;
    background: linear-gradient(135deg, var(--bg-sidebar-top) 0%, var(--bg-sidebar-bottom) 100%);
    color: var(--text-on-dark);
    border-right: 3px solid var(--color-accent-strong);

    @media (max-width: 768px) {
        overflow-y: visible;
        padding: 24px 20px 20px;
        border-right: none;
        border-top: 2px solid var(--color-accent-strong);
    }

    .systems-title,
    .registration-title {
        margin: 0;
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
            margin: 0;
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
            list-style: none;
            margin: 0;
            padding: 0;
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
            list-style: none;
            margin: 0;
            padding: 0;
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

.login-main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 32px 24px 20px;
    background-color: var(--bg-page);
    background-image:
        radial-gradient(ellipse 65% 65% at 50% 48%, var(--bg-page) 40%, oklch(from var(--bg-page) l c h / 0) 85%),
        radial-gradient(oklch(from var(--color-gray-400) l c h / 0.28) 1px, transparent 1px),
        radial-gradient(oklch(from var(--color-gray-400) l c h / 0.28) 1px, transparent 1px);
    background-position: 0 0, 0 0, 6px 6px;
    background-size: 100% 100%, 12px 12px, 12px 12px;

    @media (max-width: 768px) {
        order: -1;
        overflow-y: visible;
        padding: 36px 20px 24px;
    }

    .login-form {
        width: 100%;
        max-width: 400px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 18px;

        .login-title {
            margin-bottom: 8px;

            & h1 {
                margin: 0;
                font-size: 22px;
                color: var(--text-primary);
            }

            & p {
                margin: 0;
                font-size: 14px;
                color: var(--text-muted);
            }
        }

        .form-field {
            display: flex;
            flex-direction: column;
            gap: 8px;

            & label {
                font-size: 13px;
                font-weight: 600;
                color: var(--text-secondary);
            }

            & input {
                height: 46px;
                padding: 0 14px;
                font-size: 14px;
                color: var(--text-primary);
                background: var(--bg-input);
                border: 1px solid var(--border-default);
                border-radius: 8px;
                outline: none;
                transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;

                &:hover {
                    border-color: var(--border-strong);
                }

                &:focus {
                    background: var(--bg-input-focus);
                    border-color: var(--border-focus);
                    box-shadow: 0 0 0 3px oklch(from var(--color-navy-600) l c h / 0.15);
                }
            }
        }

        .submit-btn {
            height: 46px;
            margin-top: 14px;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            background: var(--color-primary);
            border: none;
            border-radius: 8px;
            box-shadow:
                inset 0 -3px 0 var(--color-accent),
                0 4px 12px oklch(from var(--color-navy-950) l c h / 0.25);
            cursor: pointer;
            transition: background-color 0.15s ease, transform 0.1s ease;

            &:hover {
                background: var(--color-primary-hover);
            }

            &:active {
                transform: translateY(1px);
            }
        }

        .login-links {
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 24px;

            .text-link {
                font-size: 13px;
                font-weight: 500;
                color: var(--text-muted);
                cursor: pointer;

                &:hover {
                    color: var(--color-link);
                    text-decoration: underline;
                }
            }
        }
    }

    .login-footer {
        padding-top: 24px;
        text-align: center;
        font-size: 12px;
        color: var(--text-muted);
    }
}
</style>