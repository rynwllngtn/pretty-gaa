<script setup lang="ts">
import { ref } from 'vue';
import { setLoginInput, setPasswordInput, submitLoginInput } from "./login.parser.ts";

const cpf = ref("");
const password = ref("");

function clickSubmit() {
    setLoginInput(cpf.value);
    setPasswordInput(password.value);
    submitLoginInput();
}
</script>

<template>
    <div class="login-wrapper">
        <section class="login-section">
            <form class="login-form" @submit.prevent="clickSubmit">
                <div class="form-field">
                    <label for="login-cpf">CPF</label>
                    <input v-model="cpf" id="login-cpf" type="text" placeholder="000.000.000-00" required/>
                </div>
                <div class="form-field">
                    <label for="login-password">Senha</label>
                    <input v-model="password" id="login-password" type="password" placeholder="••••••••" required/>
                </div>
                <button class="submit-btn" type="submit">Entrar</button>
            </form>
        </section>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

.login-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    position: fixed;
    inset: 0;
    pointer-events: none;
}

.login-section {
    width: 100%;
    max-width: 380px;
    background: white;
    padding: 36px 24px;
    border: 1px solid lightgray;
    border-radius: 16px;
    box-shadow: 8px 12px 32px rgba(0, 0, 0, 0.2);
    pointer-events: auto;
}

.login-form {
    display: flex;
    flex-direction: column;
    gap: 16px;

    .form-field {
        display: flex;
        flex-direction: column;
        gap: 8px;
    }

    & label {
        font-size: 14px;
        font-weight: 600;
        color: dimgrey;
    }

    & input {
        padding: 10px 12px;
        color: darkblue;
        background: white;
        border: 1px solid lightgray;
        border-radius: 8px;
        outline: none;
        transition: border-color 0.15s ease, box-shadow 0.15s ease;

        &::placeholder {
            color: darkgray;
        }

        &:hover {
            border-color: darkgray;
        }

        &:focus {
            border-color: dodgerblue;
            box-shadow: 0 0 4px 4px rgb(from dodgerblue r g b / 0.2);
        }
    }

    & .submit-btn {
        margin-top: 16px;
        padding: 12px 16px;
        font-weight: 600;
        color: white;
        background: dodgerblue;
        border: none;
        border-radius: 8px;
        cursor: pointer;
        transition: background-color 0.15s ease, transform 0.1s ease;

        &:hover {
            background: blue;
        }

        &:active {
            transform: translateY(1px);
        }
    }
}
</style>