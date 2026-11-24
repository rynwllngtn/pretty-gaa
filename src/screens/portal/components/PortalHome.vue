<script setup lang="ts">
import { getCourses, getHomeLinks } from "../portal.parser.ts";

const homeLinks = getHomeLinks();

const courses = getCourses();

const activities = [
    {
        date: '25/11',
        countdown: 'em 4 dias',
        course: 'Química Inorgânica Descritiva',
        detail: 'Avaliação: 2ª Avaliação',
    },
    {
        date: '26/11',
        countdown: 'em 5 dias',
        course: 'Química Experimental para a Educação Básica',
        detail: 'Avaliação: 1ª Avaliação',
    },
];

const updates = [
    {
        date: '29/10',
        course: 'Química Analítica Quantitativa',
        text: 'Novo Tópico de Aula: 12 dia de aula',
    },
    {
        date: '28/10',
        course: 'Química Inorgânica Descritiva',
        text: 'Novo Tópico de Aula: Não Haverá Aula',
    },
];
</script>

<template>
    <div class="portal-home">
        <section class="portal-courses">
            <header class="section-header">
                <h2>Turmas do Semestre</h2>
                <a :href="homeLinks.previousCourses" class="courses-history">Ver turmas anteriores</a>
            </header>
            <ul v-if="courses.length" class="courses-grid">
                <li v-for="course in courses">
                    <button @click="course.open" type="button" class="course-card">
                        <strong class="course-title"> {{ course.name }} </strong>
                        <span class="course-info">
                            <span> {{ course.location }} </span>
                            <span> {{ course.schedule }} </span>
                        </span>
                    </button>
                </li>
            </ul>
            <p v-else class="empty-state">Nenhuma turma matriculada neste semestre.</p>
        </section>
        <div class="portal-feeds">
            <section class="portal-activities">
                <header class="section-header">
                    <h2>Próximas Atividades</h2>
                </header>
                <ul v-if="activities.length" class="activities-list">
                    <li v-for="activity in activities" class="activity-item">
                        <span class="activity-date"> {{ activity.date }} </span>
                        <div class="activity-info">
                            <strong> {{ activity.course }} </strong>
                            <span> {{ activity.detail }} • {{ activity.countdown }} </span>
                        </div>
                    </li>
                </ul>
                <p v-else class="empty-state">Nenhuma atividade ou avaliação agendada.</p>
            </section>
            <section class="portal-updates">
                <header class="section-header">
                    <h2>Últimas Atualizações</h2>
                </header>
                <ul v-if="updates.length" class="updates-list">
                    <li v-for="update in updates" class="update-item">
                        <span class="update-date"> {{ update.date }} </span>
                        <div class="update-info">
                            <strong> {{ update.course }} </strong>
                            <span> {{ update.text }} </span>
                        </div>
                    </li>
                </ul>
                <p v-else class="empty-state">Nenhuma atualização recente nas turmas.</p>
            </section>
        </div>
    </div>
</template>

<style scoped>
.portal-home {
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 28px 32px 32px;

    @media (max-width: 768px) {
        padding: 20px;
    }

    .portal-courses,
    .portal-activities,
    .portal-updates {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .section-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 12px;

        & h2 {
            font-size: 15px;
            font-weight: 700;
            color: var(--text-primary);
        }
    }

    .courses-history {
        font-size: 12px;
        font-weight: 600;
        color: var(--color-link);
        cursor: pointer;

        &:hover {
            text-decoration: underline;
        }
    }

    .courses-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 12px;

        @media (max-width: 640px) {
            grid-template-columns: 1fr;
        }
    }

    .course-card {
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 12px;
        padding: 16px 18px;
        text-align: left;
        background: var(--bg-page);
        border: 1px solid var(--border-default);
        border-radius: 12px;
        cursor: pointer;
        transition: border-color 0.15s ease, box-shadow 0.15s ease, transform 0.1s ease;

        &:hover {
            border-color: var(--border-focus);
            box-shadow: 0 6px 18px oklch(from var(--color-navy-950) l c h / 0.08);
        }

        &:active {
            transform: translateY(1px);
        }

        .course-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
        }

        .course-info {
            width: 100%;
            display: flex;
            justify-content: space-between;
            gap: 6px 12px;
            font-size: 12px;
            color: var(--text-muted);
        }
    }

    .portal-feeds {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 24px;
        align-items: start;
        padding-top: 24px;
        border-top: 1px solid var(--border-default);

        @media (max-width: 960px) {
            grid-template-columns: 1fr;
        }
    }

    .activities-list,
    .updates-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .activity-item,
    .update-item {
        display: flex;
        align-items: center;
        gap: 14px;
        padding: 14px 16px;
        background: var(--bg-page);
        border: 1px solid var(--border-default);
        border-radius: 12px;
    }

    .activity-date,
    .update-date {
        font-size: 12px;
        font-weight: 700;
        color: var(--color-link);
    }

    .activity-info,
    .update-info {
        display: flex;
        flex-direction: column;
        gap: 2px;

        & strong {
            font-size: 14px;
            color: var(--text-primary);
        }

        & span {
            font-size: 13px;
            color: var(--text-muted);
        }
    }

    .empty-state {
        padding: 24px 16px;
        text-align: center;
        font-size: 13px;
        color: var(--text-muted);
        border: 1px dashed var(--border-default);
        border-radius: 12px;
    }
}
</style>