import { getOriginalHref, getOriginalText, queryAllOriginalDom, queryOriginalDom } from '@/core/dom.parser.ts';

function getRightPanels() {
    return queryAllOriginalDom<HTMLElement>('#barraDireita .blocoDireita');
}

function getLessonsProgress() {
    const panel = getRightPanels().find((block) =>
        getOriginalText('.headerBloco', block).startsWith('Andamento das Aulas'),
    );

    const lessonsCount = getOriginalText('.rich-stglpanel-body i', panel);
    const bar = queryOriginalDom<HTMLElement>('.progress-bar', panel);
    const progressPercent = parseFloat(getOriginalText(bar)) || 0;

    return { lessonsCount, progressPercent };
}

export function getHeaderInfo() {
    return {
        code: getOriginalText('#linkCodigoTurma').replace('-', ''),
        name: getOriginalText('#linkNomeTurma'),
        details: getOriginalText('#linkPeriodoTurma').replace('-', ''),
        progress: getLessonsProgress()
    };
}

export function getSidebarLinks() {
    return {
        portal: getOriginalHref('#menu-usuario a[href*="verPortalDiscente"]') ?? '/sigaa/verPortalDiscente.do',
        switchRole: getOriginalHref('#painelDadosUsuario a[href*="escolhaVinculo"]'),
        logout: getOriginalHref('#sair-sistema a'),
    };
}

export function getAvailableCourses() {
    const links = queryAllOriginalDom<HTMLAnchorElement>('#formTurma a.linkTurma');
    const courses = [];

    for (const link of links) {
        const label = getOriginalText(link);
        if (!label) continue;

        courses.push({ label, open: () => link.click() });
    }

    return courses;
}

function getGroupItems(panel: HTMLElement) {
    return queryAllOriginalDom<HTMLAnchorElement>('a', panel)
        .map((link) => ({
            label: getOriginalText('.itemMenu', link) || getOriginalText(link),
            open: () => link.click(),
        }))
        .filter((item) => item.label);
}

export function getMenuGroups() {
    return queryAllOriginalDom<HTMLElement>('#formMenu .rich-panelbar-interior')
        .map((panel) => ({
            name: getOriginalText('.rich-panelbar-header', panel),
            items: getGroupItems(panel),
        }))
        .filter((group) => group.name && group.items.length);
}

function getTopicContent(topic: HTMLElement) {
    const container = queryOriginalDom('.conteudotopico', topic);
    if (!container) return '';

    let text = '';
    for (const node of container.childNodes) {
        if (node instanceof Element && node.matches('script, .drag_indicator')) continue;
        text += ` ${node.textContent ?? ''}`;
    }

    return text.replace(/\s+/g, ' ').trim();
}

export function getLessonTopics() {
    const topicElements = queryAllOriginalDom<HTMLElement>('#formAva [id$=":topico_aula"]');
    const topics = [];

    for (const topic of topicElements) {
        const title = getOriginalText('.titulo', topic);
        if (!title) continue;

        const resources = queryAllOriginalDom<HTMLAnchorElement>('.conteudotopico a', topic)
            .map((link) => ({ label: getOriginalText(link), open: () => link.click() }))
            .filter((item) => Boolean(item.label));

        topics.push({
            title,
            content: getTopicContent(topic),
            isNotice: title.toLowerCase().includes('não haverá aula'),
            resources,
        });
    }

    return topics;
}

const optionalSideBlocks = new Set(['Enquete', 'Mensagens dos Fóruns']);

function getSideBlockItems(body: HTMLElement) {
    return queryAllOriginalDom<HTMLLIElement>('li', body)
        .map((li) => {
            const link = queryOriginalDom<HTMLAnchorElement>('a', li);
            return {
                date: getOriginalText('.data', li),
                text: getOriginalText('.descricao', li) || getOriginalText(li),
                open: link ? () => link.click() : undefined,
            };
        })
        .filter((item) => Boolean(item.text));
}

export function getSideBlocks() {
    const blocks = [];

    for (const panel of getRightPanels()) {
        const title = getOriginalText('.headerBloco', panel);
        const body = queryOriginalDom<HTMLElement>('.rich-stglpanel-body', panel);
        if (!title || !body || title.startsWith('Andamento das Aulas')) continue;

        const items = getSideBlockItems(body);
        if (!items.length && optionalSideBlocks.has(title)) continue;

        blocks.push({
            title,
            items,
            emptyMessage: items.length ? '' : getOriginalText(body),
        });
    }

    return blocks;
}