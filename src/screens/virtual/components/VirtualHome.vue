<script setup lang="ts">
import { getLessonTopics, getSideBlocks } from '../virtual.parser.ts';

const topics = getLessonTopics();
const sideBlocks = getSideBlocks();
</script>

<template>
    <div class="virtual-home">
        <section class="virtual-topics">
            <header class="section-header">
                <h2>Tópicos de Aula</h2>
                <span class="topics-count">{{ topics.length }} registros</span>
            </header>
            <ul v-if="topics.length" class="topics-list">
                <li v-for="topic in topics" class="topic-card" :class="{ notice: topic.isNotice }">
                    <strong class="topic-title">{{ topic.title }}</strong>
                    <p v-if="topic.content" class="topic-content">{{ topic.content }}</p>
                    <ul v-if="topic.resources.length" class="topic-resources">
                        <li v-for="resource in topic.resources">
                            <button type="button" class="resource-link" @click="resource.open()">
                                {{ resource.label }}
                            </button>
                        </li>
                    </ul>
                </li>
            </ul>
            <p v-else class="empty-state">Nenhum tópico de aula cadastrado até o momento.</p>
        </section>
        <aside v-if="sideBlocks.length" class="virtual-blocks">
            <section v-for="block in sideBlocks" class="side-block">
                <header class="section-header">
                    <h2>{{ block.title }}</h2>
                </header>
                <ul v-if="block.items.length" class="block-list">
                    <li v-for="item in block.items" class="block-item">
                        <span v-if="item.date" class="item-date">{{ item.date }}</span>
                        <button v-if="item.open" type="button" class="item-action" @click="item.open()">
                            {{ item.text }}
                        </button>
                        <span v-else class="item-text">{{ item.text }}</span>
                    </li>
                </ul>
                <p v-else class="empty-state">{{ block.emptyMessage }}</p>
            </section>
        </aside>
    </div>
</template>

<style scoped>
.virtual-home {
    display: grid;
    grid-template-columns: minmax(0, 2fr) 1fr;
    gap: 24px;
    align-items: start;
    padding: 28px 32px 32px;

    @media (max-width: 960px) {
        grid-template-columns: 1fr;
    }

    @media (max-width: 768px) {
        padding: 20px;
    }

    .virtual-topics,
    .side-block {
        display: flex;
        flex-direction: column;
        gap: 12px;
    }

    .virtual-blocks {
        display: flex;
        flex-direction: column;
        gap: 20px;
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

        .topics-count {
            font-size: 12px;
            font-weight: 600;
            color: var(--text-muted);
        }
    }

    .topics-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .topic-card {
        display: flex;
        flex-direction: column;
        gap: 8px;
        padding: 16px 18px;
        background: var(--bg-page);
        border: 1px solid var(--border-default);
        border-radius: 12px;

        &.notice {
            border-left: 3px solid var(--color-accent-strong);
            background: var(--color-sunglow-50);
        }

        .topic-title {
            font-size: 14px;
            font-weight: 700;
            color: var(--text-primary);
        }

        .topic-content {
            font-size: 13px;
            line-height: 1.5;
            color: var(--text-secondary);
        }

        .topic-resources {
            display: flex;
            flex-wrap: wrap;
            gap: 8px;
            padding-top: 4px;
        }

        .resource-link {
            padding: 6px 10px;
            font-size: 12px;
            font-weight: 600;
            color: var(--color-link);
            background: var(--bg-subtle);
            border: 1px solid var(--border-default);
            border-radius: 8px;
            cursor: pointer;
            transition: border-color 0.15s ease, background-color 0.15s ease;

            &:hover {
                border-color: var(--border-focus);
                background: var(--color-navy-50);
            }
        }
    }

    .block-list {
        display: flex;
        flex-direction: column;
        gap: 10px;
    }

    .block-item {
        display: flex;
        flex-direction: column;
        gap: 4px;
        padding: 14px 16px;
        background: var(--bg-page);
        border: 1px solid var(--border-default);
        border-radius: 12px;

        .item-date {
            font-size: 12px;
            font-weight: 700;
            color: var(--color-link);
        }

        .item-text {
            font-size: 13px;
            color: var(--text-secondary);
        }

        .item-action {
            padding: 0;
            font-size: 13px;
            font-weight: 600;
            text-align: left;
            color: var(--color-link);
            background: transparent;
            border: none;
            cursor: pointer;

            &:hover {
                text-decoration: underline;
            }
        }
    }

    .empty-state {
        padding: 20px 16px;
        text-align: center;
        font-size: 13px;
        color: var(--text-muted);
        border: 1px dashed var(--border-default);
        border-radius: 12px;
    }
}
</style>