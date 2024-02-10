import { writable } from 'svelte/store';

export const isAuthenticated = writable(localStorage.getItem('access_token') != undefined);
