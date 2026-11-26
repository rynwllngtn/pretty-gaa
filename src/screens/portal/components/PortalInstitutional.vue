<script setup lang="ts">
import {getInstitutionalInfo, getIntegrationInfo, openPersonalData, getIntegrationProgress } from "../portal.parser.ts";

const institutionalItems = getInstitutionalInfo();
const integrationItems = getIntegrationInfo();
const progressPercent = getIntegrationProgress();
</script>

<template>
    <div class="portal-institutional">
        <header class="institutional-header">
            <div>
                <h1>Dados Institucionais</h1>
                <p>Informações do seu vínculo acadêmico atual.</p>
            </div>
            <button @click="openPersonalData" type="button" class="institutional-action">Meus Dados Pessoais</button>
        </header>
        <div class="institutional-grid">
            <section class="institutional-card">
                <header class="card-header">
                    <h2>Vínculo</h2>
                </header>
                <dl>
                    <div v-for="item in institutionalItems" class="institutional-row">
                        <dt> {{ item.label }} </dt>
                        <dd> {{ item.value }} </dd>
                    </div>
                </dl>
            </section>
            <section class="institutional-card">
                <header class="card-header">
                    <h2>Integralizações</h2>
                    <strong class="integration-percent"> {{ progressPercent }}% Integralizado</strong>
                </header>
                <dl>
                    <div v-for="item in integrationItems" class="institutional-row">
                        <dt> {{ item.label }} </dt>
                        <dd> {{ item.value }} </dd>
                    </div>
                </dl>
            </section>
        </div>
    </div>
</template>

<style scoped>
.portal-institutional {
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 28px 32px 32px;

    @media (max-width: 768px) {
        padding: 20px;
    }

    .institutional-header {
        display: flex;
        flex-wrap: wrap;
        align-items: flex-start;
        justify-content: space-between;
        gap: 16px;

        & h1 {
            font-size: 20px;
            font-weight: 700;
            color: var(--text-primary);
        }

        & p {
            margin-top: 2px;
            font-size: 13px;
            color: var(--text-muted);
        }

        .institutional-action {
            padding: 8px 12px;
            font-size: 12px;
            font-weight: 600;
            color: var(--color-link);
            background: var(--bg-page);
            border: 1px solid var(--border-default);
            border-radius: 8px;
            cursor: pointer;

            &:hover {
                border-color: var(--border-focus);
            }
        }
    }

    .institutional-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 20px;
        align-items: start;

        @media (max-width: 960px) {
            grid-template-columns: 1fr;
        }
    }

    .institutional-card {
        padding: 20px 24px 8px;
        background: var(--bg-page);
        border: 1px solid var(--border-default);
        border-radius: 12px;

        .card-header {
            display: flex;
            align-items: baseline;
            justify-content: space-between;
            gap: 12px;
            padding-bottom: 12px;

            & h2 {
                font-size: 15px;
                font-weight: 700;
                color: var(--text-primary);
            }

            .integration-percent {
                font-size: 13px;
                font-weight: 700;
                color: var(--color-navy-900);
            }
        }

        .institutional-row {
            display: flex;
            justify-content: space-between;
            gap: 16px;
            padding: 14px 0;
            border-bottom: 1px solid var(--color-gray-200);
            font-size: 14px;

            &:last-child {
                border-bottom: none;
            }

            & dt {
                font-weight: 600;
                color: var(--text-secondary);
            }

            & dd {
                text-align: right;
                color: var(--text-primary);
            }
        }
    }
}
</style>