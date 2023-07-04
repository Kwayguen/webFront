import { writable } from 'svelte/store';

export const count = writable(0);
const initialPanier: number[] = [];
export const panier = writable(initialPanier);
export const countPanier = panier.subscribe(value => value.length);


