import { test, expect } from "@playwright/test";

test("locale switcher changes URL and translations", async ({ page }) => {
  await page.goto("/en");
  await expect(page).toHaveURL(/\/en/);
  await expect(page.locator("h1")).toContainText("More clarity");

  await page.getByRole("button", { name: "PT" }).click();
  await expect(page).toHaveURL(/\/pt-BR/);
  await expect(page.locator("h1")).toContainText("Mais clareza");
});

test("locale switcher works for spanish", async ({ page }) => {
  await page.goto("/en");
  await page.getByRole("button", { name: "ES" }).click();
  await expect(page).toHaveURL(/\/es/);
});
