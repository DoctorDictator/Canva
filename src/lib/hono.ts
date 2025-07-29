import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
  fetch: (url: RequestInfo | URL, init?: RequestInit): Promise<Response> => {
    return fetch(url, {
      ...init,
      credentials: "include", // important for session cookies
    });
  },
});
