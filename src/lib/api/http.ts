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

    // ... rest of your fetch logic
    const response = await fetch(url, {
        method,
        headers,
        body: body,
    });

    if (!response.ok) {
        if (response.status === 403 && isBrowser) {

            window.location.href = '/login';
            return null;
        }
        throw new Error(`Request failed: ${response.status}`);
    }

    return response.json();
}