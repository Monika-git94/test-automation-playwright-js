import { expect, test } from "@playwright/test";
import { MyOrderPage } from "./pages/my-order.page.js";
import { ICO, clientName, address, substituteName, contactName, contactPhone, conatctEmail } from "./hw-fixtures.js";

const getDateWithAddedDays = (daysToAdd) => {
  const today = new Date();
  today.setDate(today.getDate() + daysToAdd);
  const day = String(today.getDate()).padStart(2, "0");
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const year = today.getFullYear();
  return `${day}-${month}-${year}`;
};

test.describe("Orders for MŠ/ZŠ", async () => {
  test.describe("Tests for navigation to order form", async () => {
    test.beforeEach(async ({ page }) => {
      await page.goto("/prihlaseni");
      const orderPage = new MyOrderPage(page);
      await orderPage.forTeachersButtonLocator.click();
      await orderPage.orderLinkLocator.click();
    });

    test("After clicking on Pro učitele > Objednávka pro MŠ/ZŠ the correct page is opened", async ({ page }) => {
      const orderPage = new MyOrderPage(page);
      await expect(orderPage.pageTitle, "correct page title should be shown").toHaveText("Nová objednávka");
      await expect(orderPage.icoFieldLocator, "ico field should be visible").toBeVisible();
    });

    test("Should show the form correctly", async ({ page }) => {
      const orderPage = new MyOrderPage(page);
      await expect(orderPage.icoFieldLocator, "ico field should be visible").toBeVisible();
      await expect(orderPage.icoFieldLocator, "ico field should be enabled").toBeEnabled();
      await expect(orderPage.odberatelFieldLocator, "odberatel field should be visible").toBeVisible();
      await expect(orderPage.odberatelFieldLocator, "odberatel field should be enabled").toBeEnabled();
      await expect(orderPage.addressFieldLocator, "address field should be visible").toBeVisible();
      await expect(orderPage.addressFieldLocator, "address field should be enabled").toBeEnabled();
      await expect(orderPage.directorFieldLocator, "director field should be visible").toBeVisible();
      await expect(orderPage.directorFieldLocator, "director field should be enabled").toBeEnabled();
      await expect(orderPage.nameFieldLocator, "name field should be visible").toBeVisible();
      await expect(orderPage.nameFieldLocator, "name field should be enabled").toBeEnabled();
      await expect(orderPage.phoneFieldLocator, "phone field should be visible").toBeVisible();
      await expect(orderPage.phoneFieldLocator, "phone field should be enabled").toBeEnabled();
    });
  });

  test.describe("Tests for valid orders", async () => {
    test.beforeEach(async ({ page }) => {
      const orderPage = new MyOrderPage(page);
      await orderPage.newOrderPage();
    });

    test("Should create new order for camp", async ({ page }) => {
      await page.getByRole("textbox", { name: "IČO" }).fill(ICO);
      await page.getByRole("textbox", { name: "Odběratel" }).dblclick();
      await page.getByText("×Data z ARESu se nepodařilo").waitFor({ state: "visible", timeout: 5000 });
      //await page.getByText('×Data z ARESu se nepodařilo').not.toBeVisible();

      await page.getByRole("textbox", { name: "Odběratel" }).fill(clientName);
      await page.getByRole("textbox", { name: "Úplná adresa" }).fill(address);
      await page.getByRole("textbox", { name: "Zastoupena - ředitel(ka) školy" }).fill(substituteName);
      await page.getByRole("textbox", { name: "Jméno a příjmení" }).fill(contactName);
      await page.getByRole("textbox", { name: "Telefon" }).fill(contactPhone);
      await page.getByRole("textbox", { name: "Email" }).fill(conatctEmail);

      await page.locator("#start_date_1").fill(getDateWithAddedDays(30));
      await page.locator("#end_date_1").fill(getDateWithAddedDays(37));
      await page.locator("#start_date_2").fill(getDateWithAddedDays(60));
      await page.locator("#end_date_2").fill(getDateWithAddedDays(67));
      //await page.locator("#start_date_3").fill(startDate);
      //await page.locator("#end_date_3").fill(endDate);

      await page.getByRole("tab", { name: "Příměstský tábor" }).click();
      //await page.locator('select#camp-date_part').selectOption({ label: 'Dopolední' });
      await page.locator("select#camp-date_part").selectOption({ label: "Odpolední" });
      await page.locator("#camp-students").fill("20");
      await page.locator("#camp-age").fill("7");
      await page.locator("#camp-adults").fill("2");

      await page.getByRole("button", { name: "Uložit objednávku" }).click();
      await expect(page.locator("h3")).toHaveText("Děkujeme za objednávku");
    });

    test("Should create new order for nature stay", async ({ page }) => {
      await page.getByRole("textbox", { name: "IČO" }).fill(ICO);
      await page.getByRole("textbox", { name: "Odběratel" }).dblclick();
      await page.getByText("×Data z ARESu se nepodařilo").waitFor({ state: "visible", timeout: 5000 });

      await page.getByRole("textbox", { name: "Odběratel" }).fill(clientName);
      await page.getByRole("textbox", { name: "Úplná adresa" }).fill(address);
      await page.getByRole("textbox", { name: "Zastoupena - ředitel(ka) školy" }).fill(substituteName);
      await page.getByRole("textbox", { name: "Jméno a příjmení" }).fill(contactName);
      await page.getByRole("textbox", { name: "Telefon" }).fill(contactPhone);
      await page.getByRole("textbox", { name: "Email" }).fill(conatctEmail);

      await page.locator("#start_date_1").fill(getDateWithAddedDays(30));
      await page.locator("#end_date_1").fill(getDateWithAddedDays(37));
      await page.locator("#start_date_2").fill(getDateWithAddedDays(60));
      await page.locator("#end_date_2").fill(getDateWithAddedDays(67));

      await page.getByRole("tab", { name: "Škola v přírodě" }).click();
      await page.locator("#nature-students").fill("30");
      await page.locator("#nature-age").fill("10");
      await page.locator("#nature-adults").fill("4");

      await page.getByLabel("Nástup").fill("16:00");
      await page.keyboard.press("Enter");
      await page.getByLabel("Strava začíná").selectOption({ label: "Večeří" });
      await page.getByLabel("Ukončení").fill("11:00");
      await page.keyboard.press("Enter");
      await page.getByLabel("Strava končí").selectOption({ label: "Obědem" });

      await page.getByRole("button", { name: "Uložit objednávku" }).click();
      await expect(page.locator("h3")).toHaveText("Děkujeme za objednávku");
    });
  });

  test.describe("Tests for invalid orders", async () => {
    test.beforeEach(async ({ page }) => {
      const orderPage = new MyOrderPage(page);
      await orderPage.newOrderPage();
    });

    test("Check for IČO from ARES error message", async ({ page }) => {
      await page.getByRole("textbox", { name: "IČO" }).fill(ICO);
      await page.keyboard.press("Enter");
      //await page.locator(".toast-message").waitFor();

      const toast = await page.locator(".toast.toast-error");
      await expect(toast.locator(".toast-message")).toHaveText(
        "Data z ARESu se nepodařilo načíst, vyplňte je prosím ručně"
      );
      await expect(toast).toBeVisible();
      await expect(toast.locator(".toast-close-button")).toBeVisible();
      await page.locator(".toast.toast-error").waitFor({ state: "visible", timeout: 5000 });
    });

    test("Check for email error message", async ({ page }) => {
      await page.getByRole("textbox", { name: "IČO" }).fill(ICO);
      await page.getByRole("textbox", { name: "Odběratel" }).dblclick();
      await page.getByText("×Data z ARESu se nepodařilo").waitFor({ state: "visible", timeout: 5000 });
      await page.getByRole("textbox", { name: "Odběratel" }).fill(clientName);
      await page.getByRole("textbox", { name: "Úplná adresa" }).fill(address);
      await page.getByRole("textbox", { name: "Zastoupena - ředitel(ka) školy" }).fill(substituteName);
      await page.getByRole("textbox", { name: "Jméno a příjmení" }).fill(contactName);
      await page.getByRole("textbox", { name: "Telefon" }).fill(contactPhone);

      await page.getByRole("textbox", { name: "Email" }).fill("test@test");

      await page.locator("#start_date_1").fill(getDateWithAddedDays(40));
      await page.locator("#end_date_1").fill(getDateWithAddedDays(47));
      await page.getByRole("tab", { name: "Příměstský tábor" }).click();
      await page.locator("select#camp-date_part").selectOption({ label: "Odpolední" });
      await page.locator("#camp-students").fill("20");
      await page.locator("#camp-age").fill("7");
      await page.locator("#camp-adults").fill("2");
      await page.getByRole("button", { name: "Uložit objednávku" }).click();

      const errorMessage = await page.locator(".toast-message");
      await expect(errorMessage).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
      const errorTitle = await page.locator(".toast-title");
      await expect(errorTitle).toHaveText("Špatně zadané pole");

      const invalidFeedbackMessage = await page.locator("span.invalid-feedback");
      await expect(invalidFeedbackMessage).toHaveText("Zadaná adresa neexistuje, zkontrolujte překlepy");

      await expect(page.locator("h3")).not.toHaveText("Děkujeme za objednávku");
    });

    test("Should not create an order without fill all fields", async ({ page }) => {
      await page.getByRole("textbox", { name: "IČO" }).fill(ICO);
      await page.getByRole("textbox", { name: "Odběratel" }).dblclick();
      await page.getByRole("tab", { name: "Škola v přírodě" }).click();
      await page.getByRole("button", { name: "Uložit objednávku" }).click();
      await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/objednavka/pridat");
      await expect(page.locator("h3")).not.toHaveText("Děkujeme za objednávku");
    });
  });
});
