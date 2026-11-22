import { queryOriginalDom, setOriginalInputValue, clickOriginalSubmit } from "@/core/dom.parser.ts";

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