export const ssr = false;

import { Endpoints } from '$lib/api/endpoints';
import { HTTP_METHODS} from "$lib/api/enums";
import { request } from '$lib/api/http';

export async function load() {
    const base = Endpoints.backend;

    try {
        const [registroList, petList, vetList, vacinaList] = await Promise.all([
            request(`${base}${Endpoints.registroGetAll}`, HTTP_METHODS.GET),
            request(`${base}${Endpoints.petGetAll}`, HTTP_METHODS.GET),
            request(`${base}${Endpoints.vetGetAll}`, HTTP_METHODS.GET),
            request(`${base}${Endpoints.vacinaGetAll}`, HTTP_METHODS.GET),
        ]);

        return { data: registroList, pets: petList, vets: vetList, vacinas: vacinaList };
    } catch (error) {
        console.error('Failed to fetch records:', error);

        return { data: [], pets: [], vets: [], vacinas: [] };
    }
}
