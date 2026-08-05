import { browser } from "$app/environment";

const API_URL = "http://localhost:8080";

type LoginResponse = {
    token: string;
}

export async function login(email: string, password: string): Promise<LoginResponse> {

    const response = await fetch(`${API_URL}/login`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
    });

    if (!response.ok) {
        throw new Error("Login failed");
    }

    const data: LoginResponse = await response.json();

    return data;
}

export function saveToken(token: string) {
    if(browser){
        localStorage.setItem("token", token);
    }
}

export function getToken(): string | null {
    if (!browser) return null;

    return localStorage.getItem("token");
}