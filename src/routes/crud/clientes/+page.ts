export const ssr = false;

import { Endpoints } from '$lib/api/endpoints';
import { HTTP_METHODS} from "$lib/api/enums";
import { request } from '$lib/api/http';

export async function load() {
    const url = `${Endpoints.backend}${Endpoints.donoGetAll}`;

    try {
        const donoList = await request(url, HTTP_METHODS.GET);
        console.log(donoList);
        return { data: donoList };
    } catch (error) {
        console.error('Failed to fetch owners:', error);

        return { data: [] };
    }
}