<script setup lang="ts">
import { getHeaderInfo } from '../virtual.parser.ts';

const header = getHeaderInfo();
</script>

<template>
    <header class="virtual-header">
        <div class="header-course">
            <div class="course-meta">
                <span>{{ header.code }}</span>
                <span v-if="header.details">{{ header.details }}</span>
            </div>
            <strong class="course-name">{{ header.name }}</strong>
        </div>
        <div v-if="header.progress.lessonsCount" class="header-progress">
            <div class="progress-info">
                <span class="progress-label">Andamento das aulas</span>
                <strong class="progress-value">{{ header.progress.lessonsCount }} · {{ header.progress.progressPercent }}%</strong>
            </div>
            <div class="progress-track">
                <div class="progress-fill" :style="{ width: `${header.progress.progressPercent}%` }"/>
            </div>
        </div>
    </header>
</template>

<style scoped>
.virtual-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 16px 24px;
    padding: 20px 32px;
    background: var(--bg-page);
    border-bottom: 1px solid var(--border-default);

    @media (max-width: 768px) {
        flex-direction: column;
        align-items: stretch;
        padding: 16px 20px;
    }

    .header-course {
        display: flex;
        flex-direction: column;
        gap: 4px;
        min-width: 0;

        .course-meta {
            display: flex;
            flex-wrap: wrap;
            gap: 4px 12px;
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.06em;
            text-transform: uppercase;
            color: var(--text-muted);
        }

        .course-name {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-primary);
        }
    }

    .header-progress {
        flex-shrink: 0;
        min-width: 220px;
        display: flex;
        flex-direction: column;
        gap: 6px;

        .progress-info {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
        }

        .progress-label {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.08em;
            text-transform: uppercase;
            color: var(--text-muted);
        }

        .progress-value {
            font-size: 13px;
            font-weight: 700;
            color: var(--color-navy-900);
        }

        .progress-track {
            height: 6px;
            overflow: hidden;
            background: var(--color-gray-200);
            border-radius: 999px;
        }

        .progress-fill {
            height: 100%;
            background: var(--color-accent-strong);
            border-radius: 999px;
        }
    }
}
</style>