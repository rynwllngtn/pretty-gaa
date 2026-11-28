import type { Component } from 'vue';
import { Pages } from '../core/detector';
import LoginScreen from './login/LoginScreen.vue';
import PortalScreen from "./portal/PortalScreen.vue";
import VirtualScreen from './virtual/VirtualScreen.vue';

const screens: { [key: string]: Component } = {
    [Pages.login]: LoginScreen,
    [Pages.portal]: PortalScreen,
    [Pages.virtualClass]: VirtualScreen,
};

export function getScreen(page: Pages): Component | null {
    return screens[page] ?? null;
}