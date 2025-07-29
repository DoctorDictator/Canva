import { hc } from "hono/client";
import { AppType } from "@/app/api/[[...route]]/route";

export const client = hc<AppType>(process.env.NEXT_PUBLIC_APP_URL!, {
  fetch: (url, init) =>
    fetch(url, {
      ...init,
      credentials: "include", // ⬅️ crucial for sending cookies (sessions)
    }),
});
