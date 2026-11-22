import type { Component } from 'vue';
import { Pages } from '../core/detector';
import LoginScreen from './login/LoginScreen.vue';
import PortalScreen from "./portal/PortalScreen.vue";

const screens: { [key: string]: Component } = {
    [Pages.login]: LoginScreen,
    [Pages.portal]: PortalScreen
};

export function getScreen(page: Pages): Component | null {
    return screens[page] ?? null;
}