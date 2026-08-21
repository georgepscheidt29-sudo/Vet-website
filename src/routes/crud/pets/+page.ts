export const ssr = false;

import { Endpoints } from '$lib/api/endpoints';
import { HTTP_METHODS} from "$lib/api/enums";
import { request } from '$lib/api/http';

export async function load() {
    const base = Endpoints.backend;

    try {
        const [petList, donoList] = await Promise.all([
            request(`${base}${Endpoints.petGetAll}`, HTTP_METHODS.GET),
            request(`${base}${Endpoints.donoGetAll}`, HTTP_METHODS.GET),
        ]);

        return { data: petList, donos: donoList };
    } catch (error) {
        console.error('Failed to fetch pets:', error);

        return { data: [], donos: [] };
    }
}
