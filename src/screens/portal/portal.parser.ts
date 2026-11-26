import { getOriginalHref, getOriginalText, queryAllOriginalDom, queryOriginalDom } from '@/core/dom.parser.ts';

const headerPaths = {
    studentName: '#perfil-docente .info-docente .nome',
    semester: '#info-usuario .periodo-atual strong',
    unit: '#info-usuario .unidade',
    avatar: '#perfil-docente .foto img',
};
export function getHeaderInfo() {
    return {
        studentName: getOriginalText(headerPaths.studentName),
        semester: getOriginalText(headerPaths.semester),
        unit: getOriginalText(headerPaths.unit),
        avatarUrl: queryOriginalDom<HTMLImageElement>(headerPaths.avatar)?.src ?? '/sigaa/img/no_picture.png',
        progressPercent: getIntegrationProgress(),
    };
}

const sidebarLinkPaths = {
    mailbox: 'a[href*="abrirCaixaPostal"]',
    switchRole: 'a[href*="escolhaVinculo"]',
    logout: '.sair-sistema a',
};
export function getSidebarLinks() {
    return {
        mailbox: getOriginalHref(sidebarLinkPaths.mailbox),
        switchRole: getOriginalHref(sidebarLinkPaths.switchRole),
        logout: getOriginalHref(sidebarLinkPaths.logout),
    };
}

const profileLinkPath = '#perfil-docente a';
function clickProfileAction(label: string) {
    const target = label.toLowerCase();
    const link = queryAllOriginalDom<HTMLAnchorElement>(profileLinkPath).find(
        (a) => getOriginalText(a).toLowerCase() === target,
    );
    if (!link) return false;
    link.click();
    return true;
}
export function openAcademicIndices() {
    return clickProfileAction('Detalhar');
}
export function openPersonalData() {
    return clickProfileAction('Meus Dados Pessoais');
}

const homeLinkPaths = {
    previousCourses: 'a[href*="turmas.jsf"]',
};
export function getHomeLinks() {
    return {
        previousCourses: getOriginalHref(homeLinkPaths.previousCourses),
    };
}

const courseRowPath = '#turmas-portal tbody tr';
export function getCourses() {
    const rows = queryAllOriginalDom<HTMLTableCellElement>(courseRowPath);
    const courses = [];

    for (const row of rows) {
        const link = queryOriginalDom<HTMLAnchorElement>('td.descricao a', row);
        if (!link) continue;

        const infoCells = row.querySelectorAll<HTMLTableCellElement>('td.info');
        courses.push({
            name: getOriginalText(link),
            location: getOriginalText(infoCells[0] ?? null),
            schedule: getOriginalText(infoCells[1] ?? null),
            open: () => link.click(),
        });
    }

    return courses;
}

const profileBlockPath = '#perfil-docente [id="agenda-docente"]';
function getProfileTableBlock() {
    const blocks = queryAllOriginalDom<HTMLElement>(profileBlockPath);
    return blocks.find((block) => Boolean(block.querySelector('table'))) ?? null;
}

function readProfileTable(table: HTMLTableElement | undefined) {
    if (!table) return [];

    const rows = queryAllOriginalDom<HTMLTableRowElement>(':scope > tbody > tr', table);
    const items = [];

    for (const row of rows) {
        const cells = Array.from(row.children).filter((el) => el.tagName === 'TD');
        if (cells.length !== 2) continue;

        const label = getOriginalText(cells[0] ?? null).replace(/:$/, '');
        const value = getOriginalText(cells[1] ?? null);
        if (!label || !value) continue;

        items.push({ label, value });
    }

    return items;
}

export function getInstitutionalInfo() {
    const tableBlock = getProfileTableBlock();
    if (!tableBlock) return [];

    const tables = queryAllOriginalDom<HTMLTableElement>('table', tableBlock);
    return readProfileTable(tables[0]);
}

export function getIntegrationInfo() {
    const tableBlock = getProfileTableBlock();
    if (!tableBlock) return [];

    const tables = queryAllOriginalDom<HTMLTableElement>('table', tableBlock);
    return readProfileTable(tables[2]);
}

export function getIntegrationProgress() {
    const tableBlock = getProfileTableBlock();
    if (!tableBlock) return 0;

    const cell = queryAllOriginalDom<HTMLTableCellElement>('td', tableBlock).find(
        (td) => !td.querySelector('td') && getOriginalText(td).includes('Integralizado'),
    );
    return parseFloat(getOriginalText(cell ?? null)) ?? 0;
}