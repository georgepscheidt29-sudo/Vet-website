const isBrowser = typeof window !== 'undefined';

export async function request(url: string, method: string, body: any = null): Promise<any> {
    let token = '';

    if (isBrowser) {
        token = localStorage.getItem('token') || '';
    }

    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (token) {
        headers['Authorization'] = `Bearer ${token}`;
    }

    const response = await fetch(url, {
        method,
        headers,
        body: body,
    });

    if (!response.ok) {
        if (response.status === 403 && isBrowser) {


            return null;
        }
        throw new Error(`Request failed: ${response.status}`);
    }

    if (response.status === 204) {
        return null;
    }

    const text = await response.text();
    return text ? JSON.parse(text) : null;
}