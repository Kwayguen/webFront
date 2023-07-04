import type { Handle } from "@sveltejs/kit";

export const handle = (async ({ event, resolve }) => {

    console.log(event.url.pathname);

    let theme: string | null = null;

    const newTheme = event.url.searchParams.get("theme");
    console.log("URL theme: " + newTheme);
    const cookieTheme = event.cookies.get("colortheme");
    console.log("Cookie Theme: " + cookieTheme);

    if (newTheme) {
        console.log("newTheme is not null");
        theme = newTheme
    } else if (cookieTheme) {
        console.log("cookieTheme is not null");
        theme = cookieTheme
    }

    if (theme) {
        console.log("supposed actual theme: " + theme);
        return await resolve(event, {
            transformPageChunk: ({ html }) =>
                html.replace('data-theme=""', `data-theme="${theme}"`),
                
        })

    }

    return await resolve(event);
}) satisfies Handle;





