import { PUBLIC_API_URL } from '$env/static/public';

export async function clientFetch(url: string, options: RequestInit = {}) {
    const response = await fetch(`${PUBLIC_API_URL}${url}`, { ...options, headers: { 'Content-Type': 'application/json' } });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }


    if (response.status === 204) {
        return;
    }
  

    return response.json();
}