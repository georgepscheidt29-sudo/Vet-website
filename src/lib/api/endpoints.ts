export const Endpoints = {
    backend: "http://localhost:8080/api/",
    vetGet: (id: number) => `veterinarios/${id}`,
    vetUpdate: (id: number) => `veterinarios/${id}`,
    vetCreate: (id: number) => `veterinarios/`,
    vetDelete: (id: number) => `veterinarios/${id}`
} as const;
