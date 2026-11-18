import type { Component } from 'vue';
import { Pages } from '../core/detector';
import LoginScreen from './login/LoginScreen.vue';

const screens: { [key: string]: Component } = {
    [Pages.login]: LoginScreen,
};

export function getScreen(page: Pages): Component | null {
    return screens[page] ?? null;
}