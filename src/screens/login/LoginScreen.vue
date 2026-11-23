<script setup lang="ts">
import LoginMain from "./components/LoginMain.vue";
import LoginSidebar from "./components/LoginSidebar.vue";
</script>

<template>
    <div class="login-layout">
        <LoginSidebar/>
        <LoginMain/>
    </div>
</template>

<style scoped>
.login-layout {
    inset: 0;
    display: grid;
    grid-template-columns: clamp(310px, 30%, 410px) 1fr;
    position: fixed;
    overflow: hidden;
    background: var(--bg-page);

    @media (max-width: 768px) {
        display: flex;
        flex-direction: column;
        justify-content: center;
        overflow-y: auto;
    }
}
</style>