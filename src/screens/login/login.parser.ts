import { queryOriginalDom, queryAllOriginalDom, getOriginalText, getOriginalHref, setOriginalInputValue, clickOriginalSubmit } from "@/core/dom.parser.ts";

const loginPath = "input[name='user.login']";
export function setLoginInput(value: string) {
    const loginInput = queryOriginalDom<HTMLInputElement>(loginPath);
    setOriginalInputValue(loginInput, value);
}

const passwordPath = "input[name='user.senha']";
export function setPasswordInput(value: string) {
    const passwordInput = queryOriginalDom<HTMLInputElement>(passwordPath);
    setOriginalInputValue(passwordInput, value);
}

const submitPath = "input[value='Entrar']";
export function submitLoginInput() {
    clickOriginalSubmit(submitPath);
}

const recoveryPaths = {
    forgotLogin: 'a[href*="recuperar_login"]',
    forgotPassword: 'a[href*="recuperar_senha"]',
};
export function getRecoveryLinks() {
    return {
        forgotLogin: getOriginalHref(recoveryPaths.forgotLogin),
        forgotPassword: getOriginalHref(recoveryPaths.forgotPassword),
    };
}

const registerPaths = {
    student: 'a[href*="cadastro/discente"]',
    staff: 'a[href*="auto_cadastro"]',
    family: 'a[href*="cadastro/familiares"]',
};
export function getRegisterLinks() {
    return {
        student: {
            name: "Aluno",
            link: getOriginalHref(registerPaths.student),
        },
        staff: {
            name: "Prof. / Func.",
            link: getOriginalHref(registerPaths.staff),
        },
        family: {
            name: "Familiares",
            link: getOriginalHref(registerPaths.family),
        },
    };
}

const systemPaths = {
    link: 'td.painel a',
    activeClass: 'sistemaAtual',
};
export function getSystemsLinks() {
    return queryAllOriginalDom<HTMLAnchorElement>(systemPaths.link).map((a) => {
        const name = getOriginalText(a);
        const description = getOriginalText(a.parentElement).replace(name, '')
                                                                   .replace(/[()]/g, '')
                                                                   .trim();
        return {
            name,
            description,
            href: a.href,
            active: a.closest('td')?.classList.contains(systemPaths.activeClass),
        };
    });
}