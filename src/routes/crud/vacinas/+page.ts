export const ssr = false;

import { Endpoints } from '$lib/api/endpoints';
import { HTTP_METHODS} from "$lib/api/enums";
import { request } from '$lib/api/http';

export async function load() {
    const url = `${Endpoints.backend}${Endpoints.vacinaGetAll}`;

    try {
        const vacinaList = await request(url, HTTP_METHODS.GET);
        return { data: vacinaList };
    } catch (error) {
        console.error('Failed to fetch vaccines:', error);

        return { data: [] };
    }
}
