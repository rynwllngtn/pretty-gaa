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
    { name: 'SIGAA', details: 'Gestão Acadêmica' },
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
        <aside>
            <header class="sigaa-identification">
                <div class="sigaa-name">
                    <strong>SIGAA</strong>
                    <span>UFCG</span>
                </div>
                <p class="sigaa-description">Sistema Integrado de Gestão de Atividades Acadêmicas.</p>
            </header>
            <nav class="sigaa-systems">
                <h2 class="systems-title">Sistemas Integrados</h2>
                <ul class="systems-list">
                    <li v-for="system in integratedSystems">
                        <a class="system-item">
                            <strong> {{ system.name }} </strong>
                            <span> {{ system.details }} </span>
                        </a>
                    </li>
                </ul>
            </nav>
            <nav class="sigaa-registration">
                <h2 class="registration-title">Primeiro Acesso</h2>
                <ul class="registration-list">
                    <li v-for="profile in registrationProfiles">
                        <a class="profile-item"> {{ profile.label }} </a>
                    </li>
                </ul>
            </nav>
            <footer>
                <span>STI • (83) 2101-1358</span>
                <span class="version-tag">v4.20.11-ufcg</span>
            </footer>
        </aside>
        <main>
            <form class="login-form" @submit.prevent="clickSubmit">
                <header class="login-title">
                    <h1>Entrar no Sistema</h1>
                    <p>Informe seu usuário e senha para continuar.</p>
                </header>
                <div class="form-field">
                    <div class="field-label">
                        <label for="login-user">Usuário</label>
                        <a class="text-link">Esqueceu o login?</a>
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
            </form>
            <footer class="login-footer"> SIGAA • STI UFCG • © 2006–2026 UFRN </footer>
        </main>
    </div>
</template>

<style scoped>

</style>