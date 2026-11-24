<script setup lang="ts">
const studentName = 'Ryan Wellington';
const course = 'Química (Lic.)';
const unit = 'CFP - Centro de Formação de Professores';
const avatarUrl = '/sigaa/img/no_picture.png';
const progressPercent = 44;
const semester = '2026.2';
</script>

<template>
    <header class="portal-header">
        <div class="header-session">
            <span class="session-label">Semestre</span>
            <strong class="session-value">{{ semester }}</strong>
        </div>
        <div class="header-user">
            <div class="user-info">
                <strong class="user-greeting">Olá, {{ studentName }}</strong>
                <p class="user-course">{{ course }} • {{ unit }}</p>
            </div>
            <div class="user-progress" :style="{ '--progress': progressPercent }">
                <img class="user-avatar" :src="avatarUrl" alt="Foto do usuário"/>
            </div>
        </div>
    </header>
</template>

<style scoped>
.portal-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 14px 20px;
    padding: 20px 32px;
    background: var(--bg-page);
    border-bottom: 1px solid var(--border-default);

    @media (max-width: 768px) {
        padding: 16px 20px;
    }

    .header-session {
        display: flex;
        flex-direction: column;
        gap: 2px;

        .session-label {
            font-size: 11px;
            font-weight: 600;
            letter-spacing: 0.1em;
            text-transform: uppercase;
            color: var(--text-muted);
        }

        .session-value {
            font-size: 14px;
            font-weight: 700;
            color: var(--color-navy-900);
        }
    }

    .header-user {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-left: auto;

        .user-info {
            display: flex;
            flex-direction: column;
            gap: 2px;
            text-align: right;
        }

        .user-greeting {
            font-size: 16px;
            font-weight: 700;
            color: var(--text-primary);
        }

        .user-course {
            font-size: 12px;
            color: var(--text-muted);
        }

        .user-progress {
            --progress: 0;
            flex-shrink: 0;
            padding: 3px;
            border-radius: 999px;
            background: linear-gradient(
                    to top,
                    var(--color-accent-strong) calc(var(--progress) * 1%),
                    var(--color-gray-200) 0
            );
        }

        .user-avatar {
            display: block;
            width: 44px;
            height: 44px;
            border-radius: 999px;
            border: 2px solid var(--bg-page);
            object-fit: cover;
            object-position: top;
            background: var(--color-gray-100);
        }
    }
}
</style>