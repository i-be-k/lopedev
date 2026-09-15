const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api/v1';

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
    // Pull the secure cryptographically signed session token string out of storage
    const token = typeof window !== 'undefined' ? localStorage.getItem('lopedev_token') : null;

    const headers = new Headers(options.headers);
    headers.set('Content-Type', 'application/json');

    if (token) {
        headers.set('Authorization', `Bearer ${token}`);
    }

    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        ...options,
        headers,
    });

    if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new Error(errorData.error || `HTTP request failure status code: ${response.status}`);
    }

    return response.json();
}
