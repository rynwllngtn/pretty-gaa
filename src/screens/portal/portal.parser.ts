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

export type MenuItem = {
    label: string;
    open?: () => void;
    items?: MenuItem[];
};

function getSubMenuId(element: Element) {
    const handler = element.getAttribute('onmouseover') ?? '';
    return handler.split("'").find((part) => part.startsWith('cmSubMenuID')) ?? null;
}

function triggerThemeMenuItem(item: HTMLElement) {
    const options = { bubbles: true, cancelable: true, button: 0 };
    item.dispatchEvent(new MouseEvent('mouseover', options));
    item.dispatchEvent(new MouseEvent('mousedown', options));
    item.dispatchEvent(new MouseEvent('mouseup', options));
}

function readSubMenu(menuId: string | null): MenuItem[] {
    if (!menuId) return [];

    const rows = queryAllOriginalDom<HTMLTableRowElement>(`#${menuId} tr.ThemeOfficeMenuItem`);
    const items: MenuItem[] = [];

    for (const row of rows) {
        const label = getOriginalText('.ThemeOfficeMenuItemText', row);
        if (label) {
            items.push({ label, open: () => triggerThemeMenuItem(row) });
            continue;
        }

        const folder = getOriginalText('.ThemeOfficeMenuFolderText', row);
        const children = readSubMenu(getSubMenuId(row));
        if (folder && children.length) {
                items.push({ label: folder, items: children });
        }
    }

    return items;
}

const mainMenuItemPath = 'table.ThemeOfficeMenu td.ThemeOfficeMainItem';
export function getMenuGroups() {
    const mainItems = queryAllOriginalDom<HTMLTableCellElement>(mainMenuItemPath);
    const groups = [];

    for (const mainItem of mainItems) {
        const name = getOriginalText('.ThemeOfficeMainFolderText', mainItem);
        const subMenuId = getSubMenuId(mainItem);
        if (!name || !subMenuId) continue;

        const items = readSubMenu(subMenuId);
        if (!items.length) continue;

        groups.push( { name, items } );
    }

    return groups;
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

const activityRowPath = '#avaliacao-portal tbody tr';
export function getActivities() {
    const rows = queryAllOriginalDom<HTMLTableRowElement>(activityRowPath);
    const activities = [];

    for (const row of rows) {
        const [image, dateCell, detailCell] = Array.from(row.cells);
        if (!dateCell || !detailCell) continue;

        const [date = '', rawCountdown = ''] = getOriginalText(dateCell).split('(');
        const countdown = rawCountdown.replace(')', '').trim();

        const container = queryOriginalDom('strong', detailCell)?.parentElement;
        if (!container) continue;

        const nodes = Array.from(container.childNodes);
        const course = nodes.slice(0, 1).map((node) => node.textContent).join('').replace(/\n/g, '');
        const detail = nodes.slice(2).map((node) => node.textContent).join('').replace(/\n/g, '');
        if (!date || !course) continue;

        activities.push({ date, countdown, course, detail });
    }

    return activities;
}

const updateTablePath = '#atualizacoes-turma table';
export function getUpdates() {
    const tables = queryAllOriginalDom<HTMLTableElement>(updateTablePath);
    const updates = [];

    for (const table of tables) {
        const rows = queryAllOriginalDom<HTMLTableRowElement>('tbody tr', table);
        const headerRow = rows[0];
        const bodyRow = rows[1];
        if (!headerRow || !bodyRow) continue;

        const date = getOriginalText(headerRow).split(' -')[0] ?? '';
        const course = getOriginalText('a', headerRow);
        const text = getOriginalText(bodyRow);
        if (!date || !course || !text) continue;

        updates.push({ date, course, text });
    }

    return updates;
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