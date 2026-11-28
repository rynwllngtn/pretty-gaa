import { getOriginalHref, getOriginalText, queryAllOriginalDom, queryOriginalDom } from '@/core/dom.parser.ts';

function getLessonsProgress() {
    const bar = queryOriginalDom<HTMLElement>('#barraDireita .progress-bar');
    const panel = bar?.closest('.blocoDireita') ?? null;

    return {
        lessonsCount: getOriginalText('.rich-stglpanel-body i', panel),
        progressPercent: parseFloat(getOriginalText(bar)) || 0
    };
}

export function getHeaderInfo() {
    return {
        code: getOriginalText('#linkCodigoTurma').replace('-', '').trim(),
        name: getOriginalText('#linkNomeTurma'),
        details: getOriginalText('#linkPeriodoTurma').replace('-', '').trim(),
        progress: getLessonsProgress(),
    };
}

export function getSidebarLinks() {
    return {
        portal: getOriginalHref('#menu-usuario a[href*="verPortalDiscente"]'),
        switchRole: getOriginalHref('#painelDadosUsuario a'),
        logout: getOriginalHref('#sair-sistema a'),
    };
}

export function getAvailableCourses() {
    return queryAllOriginalDom<HTMLAnchorElement>('#formTurma a').map((link) => ({
        label: getOriginalText(link),
        open: () => link.click(),
    }));
}

function getGroupItems(panel: HTMLElement) {
    return queryAllOriginalDom<HTMLAnchorElement>('a', panel).map((link) => ({
        label: getOriginalText(link),
        open: () => link.click(),
    }));
}

export function getMenuGroups() {
    return queryAllOriginalDom<HTMLElement>('#formMenu .rich-panelbar-interior').map((panel) => ({
        name: getOriginalText('.rich-panelbar-header', panel),
        items: getGroupItems(panel),
    }));
}

const ignoredTopicNodes = '.drag_indicator, [id$=":dndPanel"], .item, script, style';

function getTopicContent(container: Element | null) {
    if (!container) return '';

    return Array.from(container.childNodes)
        .filter((node) => !(node instanceof Element && node.matches(ignoredTopicNodes)))
        .map((node) => node.textContent)
        .join(' ')
        .replace(/\s+/g, ' ')
        .trim();
}

export function getLessonTopics() {
    return queryAllOriginalDom<HTMLElement>('#formAva .topico-aula').map((topic) => {
        const container = queryOriginalDom('.conteudotopico', topic);

        return {
            title: getOriginalText('.titulo', topic),
            content: getTopicContent(container),
            isNotice: Boolean(queryOriginalDom('.titulo > span', topic)),
            resources: queryAllOriginalDom<HTMLAnchorElement>('a', container).map((link) => ({
                label: getOriginalText(link),
                open: () => link.click(),
            })),
        };
    });
}

const visibleSideBlocks = new Set(['Atividades', 'Avaliações']);

function getSideBlockItems(body: HTMLElement) {
    return queryAllOriginalDom<HTMLLIElement>('li', body).map((li) => {
        const link = queryOriginalDom<HTMLAnchorElement>('a', li);
        return {
            date: getOriginalText('.data', li),
            text: getOriginalText('.descricao', li),
            open: link ? () => link.click() : undefined,
        };
    });
}

export function getSideBlocks() {
    return queryAllOriginalDom<HTMLElement>('#barraDireita .blocoDireita').flatMap((panel) => {
        const title = getOriginalText('.headerBloco', panel);
        const body = queryOriginalDom<HTMLElement>('.rich-stglpanel-body', panel);
        if (!visibleSideBlocks.has(title) || !body) return [];

        const items = getSideBlockItems(body);
        return {
            title,
            items,
            emptyMessage: items.length ? '' : getOriginalText(body),
        };
    });
}