enum apiUrls {
  production = "https://vue-creeper-backend.onrender.com",
  development = "http://localhost:7777",
}

// export const baseUrl = apiUrls[process.env.NODE_ENV as keyof typeof apiUrls];
export const baseUrl = apiUrls.production;
