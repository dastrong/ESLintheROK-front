const API_URL = process.env.EXTERNAL_API_URL || 'http://localhost:4000/api';

export async function regFetch(url: string, options: RequestInit = {}) {
  return fetch(url, options).then(res => res.json());
}

export async function apiFetch(url: string, options: RequestInit = {}) {
  return fetch(API_URL + url, options).then(res => res.json());
}

export async function apiFetchToken(
  url: string,
  options: RequestInit = {},
  accessToken: string
) {
  const res = await fetch(API_URL + url, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data.message;
  return data;
}

export async function swrFetch(url: string) {
  const res = await fetch(API_URL + url);
  const data = await res.json();
  if (!res.ok) throw data.message;
  return data;
}

export async function swrFetchToken(url: string, accessToken: string) {
  const res = await fetch(API_URL + url, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  const data = await res.json();
  if (!res.ok) throw data.message;
  return data;
}
