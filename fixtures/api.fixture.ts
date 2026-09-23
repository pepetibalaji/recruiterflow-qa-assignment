import { test as base, type APIRequestContext } from "@playwright/test";

type ApiFixtures = {
  apiRequest: APIRequestContext;
};

export const test = base.extend<ApiFixtures>({
  apiRequest: async ({ playwright }, use) => {
    const apiRequest = await playwright.request.newContext({
      baseURL: "https://reqres.in",
    });

    await use(apiRequest);
    await apiRequest.dispose();
  },
});

export { expect } from "@playwright/test";
