export enum Pages {
    unknown = 'unknown',
    login = 'login',
    portal = 'portal',
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
    }
]

export function detectPage(doc: Document = document): Pages {
    const pageFound = PagesRegistry.find(page => page.matches(doc));
    return pageFound ? pageFound.page : Pages.unknown;
}