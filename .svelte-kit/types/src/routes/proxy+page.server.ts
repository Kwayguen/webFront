// @ts-nocheck
import { redirect } from "@sveltejs/kit";
import type { Actions } from "./$types";


export const actions = {
    setTheme: async ({ url, cookies }: import('./$types').RequestEvent) => {
        const theme = url.searchParams.get('theme');
        const redirectTo = url.searchParams.get("redirectTo");
        // console.log(redirectTo);
        if (theme) {
            cookies.set("colortheme", theme, {
                path: '/',
                maxAge: 60 * 60 * 24 * 365,
            });
        }
        console.log(theme);
        throw redirect(303, redirectTo ?? "/");
    }
};

;null as any as Actions;