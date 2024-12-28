import { expect, test } from "@playwright/test";
import {
  username,
  password,
  applicationsSearchText,
  applicationsPageSize,
  ApplicationTexts,
} from "../fixtures/fixtures.js";
import { RegExp } from "../fixtures/regular-expressions.js";

test.describe("Applications Page", async () => {
  let app;

  test.beforeEach(async ({ page }) => {
    app = new ApplicationPages(page);

    await app.loginPage.open();
    await app.loginPage.login(username, password);
    await app.applicationsPage.goToApplicationsPage();
    await test.expect(page).toHaveTitle(ApplicationTexts.applicationsPage.title);
  });

  test("should list all applications", async ({ page }) => {
    const allRows = await app.applicationsPage.getApplicationsTableRows(page);
    await expect(allRows.length, "table should have >= " + applicationsPageSize + " rows").toBeGreaterThanOrEqual(
      applicationsPageSize
    );

    for (const row of allRows) {
      const values = await row.getValues();
      await expect(values.name).toMatch(RegExp.NAME);
      await expect(values.date).toMatch(RegExp.DATE);
      await expect(values.paymentType).toMatch(RegExp.PAYMENT_TYPE);
      await expect(values.toPay).toMatch(RegExp.TO_PAY);
    }
  });

  test("should filter in applications", async ({ page }) => {
    const allRows = await app.applicationsPage.getApplicationsTableRows();
    await expect(allRows.length, "table should have >= " + applicationsPageSize + " rows").toBeGreaterThanOrEqual(
      applicationsPageSize
    );

    await app.applicationsPage.searchInApplicationsTable(applicationsSearchText);
    await app.applicationsPage.waitForTableToLoad();

    const filteredRows = await app.applicationsPage.getApplicationsTableRows();
    await expect(filteredRows.length, "table should have < " + allRows.length + " rows").toBeLessThan(allRows.length);

    for (const row of filteredRows) {
      const values = await row.getValues();
      await expect(values.name.toLowerCase()).toContain(applicationsSearchText.toLowerCase());
    }
  });

  test("should open application detail", async ({ page }) => {
    // selects the third application in the table (there must be at least 3)
    const thirdRow = (await app.applicationsPage.getApplicationsTableRows())[2];

    const thirdRowValues = await thirdRow.getValues();
    await expect(thirdRowValues.name).toMatch(RegExp.NAME);
    await expect(thirdRowValues.date).toMatch(RegExp.DATE);
    await expect(thirdRowValues.paymentType).toMatch(RegExp.PAYMENT_TYPE);
    await expect(thirdRowValues.toPay).toMatch(RegExp.TO_PAY);

    // opens the detail of the application
    const applicationDetailPage = await thirdRow.openInfo();
    await expect(page).toHaveScreenshot("application-detail.png");

    // Advanced: assert the content of the application detail
    const applicationDetail = await applicationDetailPage.getDetail();
    await expect(applicationDetail[3][1]).toEqual([thirdRowValues.name.split(" ")[1]]);
    await expect(applicationDetail[4][1]).toEqual([thirdRowValues.name.split(" ")[0]]);
    await expect(applicationDetail[1][1]).toContain(
      thirdRowValues.paymentType,
      "Zbývá uhradit: " + thirdRowValues.toPay
    );
  });
});
