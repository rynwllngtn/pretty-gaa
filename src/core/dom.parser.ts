export const ORIGINAL_DOM = "sigaa-dom";

export function getOriginalDom() {
    return document.getElementById(ORIGINAL_DOM);
}

export function queryOriginalDom<T extends Element>(selector: string, root: ParentNode | null = getOriginalDom()) {
    return root?.querySelector<T>(selector) ?? null;
}

export function queryAllOriginalDom<T extends Element>(selector: string, root: ParentNode | null = getOriginalDom()): T[] {
    if (!root) return [];
    return Array.from(root.querySelectorAll<T>(selector));
}

export function getOriginalText(target: string | Element | null, root: ParentNode | null = getOriginalDom()): string {
    const element = typeof target === 'string' ? queryOriginalDom(target, root) : target;
    return element?.textContent?.replace(/\s+/g, ' ').trim() ?? '';
}

export function getOriginalHref(selector: string): string | undefined {
    return queryOriginalDom<HTMLAnchorElement>(selector)?.href;
}

export function setOriginalInputValue(field: HTMLInputElement | null, value: string) {
    if (!field) return false;
    field.value = value;
    field.dispatchEvent(new Event('input', { bubbles: true }));
    field.dispatchEvent(new Event('change', { bubbles: true }));
    return true;
}

export function clickOriginalSubmit(target: string, root: ParentNode | null = getOriginalDom()) {
    const button = queryOriginalDom<HTMLElement>(target, root);
    if (!button) return false;
    button.click();
    return true;
}