import { getOriginalHref, getOriginalText, queryAllOriginalDom } from '@/core/dom.parser.ts';

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

const courseCellPath = '#turmas-portal td.descricao';
export function getCourses() {
    const cells = queryAllOriginalDom<HTMLTableCellElement>(courseCellPath);
    const courses = [];

    for (const cell of cells) {
        const row = cell.parentElement;
        const link = cell.querySelector<HTMLAnchorElement>('a');
        if (!row || !link) continue;

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
export function getInstitutionalInfo() {
    const blocks = queryAllOriginalDom<HTMLElement>(profileBlockPath);
    const tableBlock = blocks.find((block) => Boolean(block.querySelector('table')));
    if (!tableBlock) return [];

    const rows = queryAllOriginalDom<HTMLTableRowElement>(':scope > table > tbody > tr', tableBlock);
    const info = [];

    for (const row of rows) {
        const cells = Array.from(row.children).filter((el) => el.tagName === 'TD');
        if (cells.length !== 2) continue;

        const label = getOriginalText(cells[0] ?? null).replace(/:$/, '');
        const value = getOriginalText(cells[1] ?? null);
        if (!label || !value) continue;

        info.push({ label, value });
    }

    return info;
}