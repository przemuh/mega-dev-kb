import { mount, hydrate } from 'svelte';
import { pages, routeOf } from './pages';
const route = location.pathname.replace(/\/$/, '') || '/kb';
const page = Object.entries(pages).find(([path]) => routeOf(path) === route)?.[1];
if (page) {
  const target = document.getElementById('app');
  (target.hasChildNodes() ? hydrate : mount)(page.default, { target });
}
