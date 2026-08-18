export const Endpoints = {
    backend: "http://localhost:8080/api/",
    vetGetAll: `veterinarios`,
    vetGet: (id: number) => `veterinarios/${id}`,
    vetUpdate: (id: number) => `veterinarios/${id}`,
    vetCreate: `veterinarios`,
    vetDelete: (id: number) => `veterinarios/${id}`
} as const;
