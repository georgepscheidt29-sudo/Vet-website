export const Endpoints = {
    backend: "http://localhost:8080/api/",
    vetGetAll: `veterinarios`,
    vetGet: (id: number) => `veterinarios/${id}`,
    vetUpdate: (id: number) => `veterinarios/${id}`,
    vetCreate: `veterinarios`,
    vetDelete: (id: number) => `veterinarios/${id}`,
    donoGet: (id: number) => `donos/${id}`,
    donoGetAll: `donos`,
    donoUpdate: (id: number) => `donos/${id}`,
    donoDelete: (id: number) => `donos/${id}`,
    donoCreate: `donos`
} as const;
