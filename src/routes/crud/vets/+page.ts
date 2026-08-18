export const ssr = false;

import { Endpoints } from '$lib/api/endpoints';
import { HTTP_METHODS} from "$lib/api/enums";
import { request } from '$lib/api/http';

export async function load() {
    const url = `${Endpoints.backend}${Endpoints.vetGetAll}`;

    try {
        const vetList = await request(url, HTTP_METHODS.GET);
        console.log(vetList);
        return { data: vetList };
    } catch (error) {
        console.error('Failed to fetch vets:', error);

        return { data: [] };
    }
}