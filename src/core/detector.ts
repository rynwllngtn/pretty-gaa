export enum Pages {
    unknown = 'unknown',
    login = 'login',
    portal = 'portal',
    virtualClass = 'virtualClass',
}

interface PagesInterface {
    page: Pages;
    matches: (doc: Document) => boolean;
}

const PagesRegistry: PagesInterface[] = [
    {
        page: Pages.login,
        matches: doc => Boolean(doc.querySelector('input[name="user.login"]'))
    },
    {
        page: Pages.portal,
        matches: doc => Boolean(doc.getElementById('portal-docente'))
    },
    {
        page: Pages.virtualClass,
        matches: doc =>
            Boolean(doc.getElementById('barraDireita') && doc.getElementById('formAva'))
    }
]

export function detectPage(doc: Document = document): Pages {
    const pageFound = PagesRegistry.find(page => page.matches(doc));
    return pageFound ? pageFound.page : Pages.unknown;
}