<script setup lang="ts">
import { ref} from "vue";
import { setLoginInput, setPasswordInput, submitLoginInput, getRecoveryLinks } from "../login.parser.ts";

const user = ref("");
const password = ref("");

const recovery = getRecoveryLinks();

function clickSubmit() {
    setLoginInput(user.value);
    setPasswordInput(password.value);
    submitLoginInput();
}
</script>

<template>
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
                <a :href="recovery.forgotLogin" class="text-link">Esqueceu o login?</a>
                <a :href="recovery.forgotPassword" class="text-link">Esqueceu a senha?</a>
            </nav>
        </form>
        <footer class="login-footer">SIGAA • STI UFCG • © 2006–2026 UFRN</footer>
    </main>
</template>

<style scoped>
.login-main {
    display: flex;
    flex-direction: column;
    overflow-y: auto;
    padding: 32px 24px 20px;
    background-color: var(--bg-page);
    background-image:
            radial-gradient(ellipse 65% 65% at 50% 48%, var(--bg-page) 40%, oklch(from var(--bg-page) l c h / 0) 85%),
            radial-gradient(oklch(from var(--color-gray-400) l c h / 0.3) 1px, transparent 1px),
            radial-gradient(oklch(from var(--color-gray-400) l c h / 0.3) 1px, transparent 1px);
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
                font-size: 22px;
                color: var(--text-primary);
            }

            & p {
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
            box-shadow: inset 0 -3px 0 var(--color-accent),
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