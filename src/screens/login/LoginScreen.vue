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
                <h2 class="registration-title">Primeiro Acesso</h2>
                <p class="registration-subtitle">Ainda não possui cadastro?</p>
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
                    <div class="field-label">
                        <label for="login-user">Usuário</label>
                    </div>
                    <input v-model="user" id="login-user" type="text" placeholder="Usuário ou CPF" required/>
                </div>
                <div class="form-field">
                    <div class="field-label">
                        <label for="login-password">Senha</label>
                        <a class="text-link">Esqueceu a senha?</a>
                    </div>
                    <input v-model="password" id="login-password" type="password" placeholder="••••••••" required/>
                </div>
                <button class="submit-btn" type="submit">Entrar</button>
                <nav class="login-links">
                    <a class="text-link">Esqueceu o login?</a>
                    <a class="text-link">Reenviar confirmação</a>
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
    grid-template-columns: minmax(320px, 390px) 1fr;
    overflow: hidden;
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    background: #ffffff;
    color: #171717;

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        overflow-y: auto;
    }
}

.login-sidebar {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 28px 24px 20px;
    overflow-y: auto;
    background: #f5f5f5;
    border-right: 2px solid #d4d4d4;

    @media (max-width: 768px) {
        overflow-y: visible;
        padding: 24px 20px 20px;
        border-right: none;
        border-top: 2px solid #d4d4d4;
    }

    .systems-title,
    .registration-title {
        margin: 0;
        font-size: 11px;
        text-transform: uppercase;
        color: #737373;
    }

    .sigaa-identification {
        display: flex;
        flex-direction: column;
        gap: 6px;

        .sigaa-name {
            display: flex;
            align-items: baseline;
            gap: 8px;

            & strong {
                font-size: 20px;
            }

            & span {
                font-size: 12px;
                font-weight: 600;
                color: #525252;
            }
        }

        .sigaa-description {
            margin: 0;
            font-size: 12px;
            color: #525252;
        }
    }

    .sigaa-systems {
        display: flex;
        flex-direction: column;
        gap: 10px;
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;

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
            padding: 12px 14px;
            background: #fafafa;
            border: 1px solid #e0e0e0;
            border-radius: 8px;
            cursor: pointer;

            &.active {
                background: #eaeaea;
                border-color: #bdbdbd;
                border-left: 4px solid #525252;
            }

            & strong {
                font-size: 13px;
            }

            & span {
                font-size: 12px;
                color: #737373;
            }
        }
    }

    .sigaa-registration {
        margin-top: auto;
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding-top: 20px;
        border-top: 1px solid #e0e0e0;

        @media (max-width: 768px) {
            margin-top: 0;
        }

        .registration-subtitle {
            margin: 0;
            font-size: 12px;
            color: #525252;
        }

        .registration-list {
            list-style: none;
            margin: 4px 0 0;
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
            padding: 8px 12px;
            font-size: 13px;
            background: #ffffff;
            border: 1px solid #d4d4d4;
            border-radius: 8px;
            cursor: pointer;
        }
    }

    .sidebar-footer {
        display: flex;
        justify-content: space-between;
        gap: 8px;
        padding-top: 16px;
        border-top: 1px solid #e0e0e0;
        font-size: 11px;
        color: #737373;
    }
}

.login-main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 32px 24px 20px;

    @media (max-width: 768px) {
        order: -1;
        overflow-y: visible;
        padding: 36px 20px 24px;
    }

    .login-form {
        width: 100%;
        max-width: 420px;
        margin: auto;
        display: flex;
        flex-direction: column;
        gap: 20px;

        .login-title {
            & h1 {
                margin: 0 0 6px;
                font-size: 26px;
            }

            & p {
                margin: 0;
                font-size: 14px;
                color: #737373;
            }
        }

        .form-field {
            display: flex;
            flex-direction: column;
            gap: 8px;

            .field-label {
                display: flex;
                justify-content: space-between;
                gap: 12px;

                & label {
                    font-size: 13px;
                    font-weight: 600;
                }
            }

            & input {
                height: 46px;
                padding: 0 14px;
                font-size: 14px;
                background: #fafafa;
                border: 1px solid #d4d4d4;
                border-radius: 8px;
                outline: none;
            }
        }

        .text-link {
            font-size: 12px;
            color: #525252;
            cursor: pointer;
        }

        .submit-btn {
            height: 46px;
            margin-top: 4px;
            font-size: 14px;
            font-weight: 600;
            color: #ffffff;
            background: #404040;
            border: none;
            border-radius: 8px;
            cursor: pointer;
        }

        .login-links {
            display: flex;
            justify-content: center;
            gap: 16px;
        }
    }

    .login-footer {
        padding-top: 24px;
        text-align: center;
        font-size: 11px;
        color: #a3a3a3;
    }
}
</style>