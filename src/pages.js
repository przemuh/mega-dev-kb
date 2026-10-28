export const pages = import.meta.glob('/src/routes/**/+page.svx', { eager: true });
export const routeOf = (path) => path.replace('/src/routes', '').replace('/+page.svx', '');
