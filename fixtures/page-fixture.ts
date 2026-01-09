import {
  Page,
  test as base,
} from "@playwright/test";

export type PmFixtures = {
  pmPage: Page;
  timeLogger: void;
};

export const test = base.extend<PmFixtures>({
  pmPage: async ({ page }, use) => {
    await use(page);
  },

  timeLogger: [
    async ({}, use: () => Promise<void>) => {
      test.info().annotations.push({
        type: "Start Time of the Test",
        description: new Date().toISOString(),
      });
      await use();
      test.info().annotations.push({
        type: "End Time of the Test  ",
        description: new Date().toISOString(),
      });
    },
    { auto: true },
  ],
});
