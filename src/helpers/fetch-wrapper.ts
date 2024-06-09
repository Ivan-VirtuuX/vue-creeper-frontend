import { useAuthStore } from "@/stores/auth.store.ts";
import { baseUrl } from "@/api/baseUrl.ts";

export const fetchWrapper = {
  get: (url: string) => request("GET", url),
  post: (url: string, body?: any) => request("POST", url, body),
};

async function request(method: string, url: string, body?: any) {
  const requestOptions: RequestInit = {
    method,
    headers: await authHeader(url),
  };
  if (body) {
    requestOptions.headers = {
      ...requestOptions.headers,
      "Content-Type": "application/json",
    };
    requestOptions.body = JSON.stringify(body);
  }
  return fetch(url, requestOptions).then(handleResponse);
}

async function authHeader(url: string): Promise<HeadersInit> {
  const { user } = useAuthStore();
  const isLoggedIn = !!user?.token;
  const isApiUrl = url.startsWith(baseUrl);
  const headers: HeadersInit = {};

  if (isLoggedIn && isApiUrl) headers["Authorization"] = `Bearer ${user.token}`;

  return headers;
}

const handleResponse = async (response: Response) => {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);

    if (!response.ok) {
      const { user, logout } = useAuthStore();

      if ([401, 403].includes(response.status) && user) logout();

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }
    return data;
  });
};
