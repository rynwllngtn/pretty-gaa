import { clickOriginalSubmit, getOriginalText, queryAllOriginalDom } from '@/core/dom.parser.ts';

const studentNamePath = '#perfil-docente .info-docente .nome';
const studentNameFallbackPath = '#info-usuario .usuario span';
export function getStudentName() {
    return getOriginalText(studentNamePath) || getOriginalText(studentNameFallbackPath);
}

const semesterPath = '#info-usuario .periodo-atual strong';
export function getCurrentSemester() {
    return getOriginalText(semesterPath);
}

const logoutPath = '.sair-sistema a';
export function clickLogout() {
    clickOriginalSubmit(logoutPath);
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