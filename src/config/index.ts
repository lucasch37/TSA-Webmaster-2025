export const APP_CONFIG = {
    api: {
        baseUrl: process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000",
        serverUrl: process.env.NEXT_SERVER_API_BASE_URL ?? "http://localhost:3000",
    },
};
