import { expect, test } from "@playwright/test";

test.describe("Rick and Morty App", () => {
  test("renders core UI and data", async ({ page }) => {
    await page.goto("/");
    const main = page.locator("main");

    await expect(main.getByRole("heading", { name: "Rick and Morty Characters" })).toBeVisible();
    await expect(main.getByText("URL state with SSR reload")).toBeVisible();
    await expect(main.getByText("Selected: 0")).toBeVisible();
    await expect(main.getByRole("button", { name: /^Next$/ })).toBeVisible();
    await expect(main.getByRole("button", { name: /^Select$/ }).first()).toBeVisible();
  });

  test("status and gender filters update URL and work together", async ({ page }) => {
    await page.goto("/");

    const main = page.locator("main");
    const selects = main.getByRole("combobox");

    await selects.nth(0).click();
    await page.getByRole("option", { name: /^Alive$/ }).click();
    await page.waitForURL(/status=alive/);

    await selects.nth(1).click();
    await page.getByRole("option", { name: /^Male$/ }).click();
    await page.waitForURL(/status=alive.*gender=male|gender=male.*status=alive/);

    await expect(main.getByText("Status: alive | Gender: male | Page: 1")).toBeVisible();
  });

  test("pagination writes page to URL and triggers new server result", async ({ page }) => {
    await page.goto("/?status=alive&gender=male&page=1");
    const main = page.locator("main");

    const firstCardNamePage1 = await page
      .locator("div.font-semibold.tracking-tight.text-base")
      .first()
      .textContent();
    await expect(main.getByText("Status: alive | Gender: male | Page: 1")).toBeVisible();

    await main.getByRole("button", { name: /^Next$/ }).click();
    await page.waitForURL(/page=2/);
    await expect(main.getByText("Status: alive | Gender: male | Page: 2")).toBeVisible();

    const firstCardNamePage2 = await page
      .locator("div.font-semibold.tracking-tight.text-base")
      .first()
      .textContent();
    expect(firstCardNamePage2).not.toBe(firstCardNamePage1);
  });

  test("zustand selection toggles selected characters state", async ({ page }) => {
    await page.goto("/");
    const main = page.locator("main");

    const selectButton = main.getByRole("button", { name: /^Select$/ }).first();
    await selectButton.click();
    await expect(main.getByText("Selected: 1")).toBeVisible();

    await main
      .getByRole("button", { name: /^Selected$/ })
      .first()
      .click();
    await expect(main.getByText("Selected: 0")).toBeVisible();
  });
});
