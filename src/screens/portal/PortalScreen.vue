<script setup lang="ts">
import { clickLogout, getCourses, getCurrentSemester, getInstitutionalInfo, getStudentName } from './portal.parser.ts';

const studentName = getStudentName();
const semester = getCurrentSemester();
const courses = getCourses();
const institutionalInfo = getInstitutionalInfo();
</script>

<template>
    <div class="portal-wrapper">
        <div class="portal-container">
            <header class="card portal-header">
                <div>
                    <h1 class="student-name"> {{ studentName }} </h1>
                    <span class="meta">Semestre atual: {{ semester }} </span>
                </div>
                <button class="btn-logout" type="button" @click="clickLogout">Sair</button>
            </header>
            <div class="portal-grid">
                <main class="portal-main">
                    <section class="card">
                        <h2>Turmas do Semestre</h2>
                        <ul v-if="courses.length" class="list">
                            <li v-for="(course, index) in courses" :key="index" class="list-item">
                                <button class="link-btn" type="button" @click="course.open">
                                    {{ course.name }}
                                </button>
                                <span class="meta"> {{ course.location }} • {{ course.schedule }} </span>
                            </li>
                        </ul>
                        <p v-else class="meta">Nenhuma turma encontrada.</p>
                    </section>
                </main>
                <aside class="portal-aside">
                    <section class="card">
                        <h2>Dados Institucionais</h2>
                        <dl class="info-list">
                            <div v-for="item in institutionalInfo" :key="item.label">
                                <dt> {{ item.label }} </dt>
                                <dd> {{ item.value }} </dd>
                            </div>
                        </dl>
                    </section>
                </aside>
            </div>
        </div>
    </div>
</template>

<style scoped>
* {
    box-sizing: border-box;
}

.portal-wrapper {
    position: fixed;
    inset: 0;
    overflow-y: auto;
    padding: 24px;
    background: rgb(from white r g b / 0.8);
    font-family: system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif;
    color: dimgrey;
}

.portal-container {
    max-width: 1080px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.card {
    background: white;
    padding: 20px;
    border: 1px solid lightgray;
    border-radius: 12px;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

    & h2 {
        margin: 0 0 12px;
        font-size: 16px;
        color: darkblue;
    }
}

.portal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px;

    .student-name {
        margin: 0 0 4px;
        font-size: 18px;
        color: darkblue;
    }
}

.portal-grid {
    display: grid;
    grid-template-columns: 2fr 1fr;
    gap: 16px;
    align-items: start;
}

.portal-main,
.portal-aside {
    display: flex;
    flex-direction: column;
    gap: 16px;
}

.list {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.list-item {
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 12px;
    border: 1px solid lightgray;
    border-radius: 8px;
}

.link-btn {
    padding: 0;
    text-align: left;
    font-size: 14px;
    font-weight: 600;
    color: dodgerblue;
    background: none;
    border: none;
    cursor: pointer;

    &:hover {
        color: blue;
        text-decoration: underline;
    }
}

.btn-logout {
    padding: 8px 16px;
    font-weight: 600;
    color: white;
    background: dodgerblue;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.15s ease;

    &:hover {
        background: blue;
    }
}

.info-list {
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 8px;
    font-size: 13px;

    & div {
        display: flex;
        justify-content: space-between;
        gap: 12px;
    }

    & dt {
        font-weight: 600;
    }

    & dd {
        margin: 0;
        text-align: right;
        color: darkblue;
    }
}

.meta {
    font-size: 12px;
    color: gray;
}
</style>