/**
 * Lesson 6: Code organization: functions - Exercise 1
 */

import {expect, test} from "@playwright/test";
import { page } from "./pages/login.page.js";
import {username, password, userFullName} from "../fixtures/fixtures.js"

const pageTitle = "Přihlášení - Czechitas";

test.describe("Login Page", async () => {
    let page;

    test.beforeEach(async ({ page }) => {
        page = new page(page);

        await page.open();
        await test.expect(page).toHaveTitle(pageTitle);
    });

    test("should show login form", async ({ page }) => {
        
        await expect(page.emailFieldLocator, "email field should be visible").toBeVisible();
        await expect(page.emailFieldLocator, "email field should be enabled").toBeEnabled();

        await expect(page.passwordFieldLocator, "password field should be visible").toBeVisible();
        await expect(page.passwordFieldLocator, "password field should be enabled").toBeEnabled();

        await expect(page.loginButtonLocator, "login button should be visible").toBeVisible();
        await expect(page.loginButtonLocator, "login button text should have text").toHaveText("Přihlásit");
    });

    test("should login with valid credentials", async ({page}) => {

        await page.login(username, password);

        const userName = await page.usernameDropdownLocator;
        await expect(userName).toHaveText(userFullName);
        // await expect(await getUserNameDropdown(page).textContent()).toEqual(userFullName);
    });

    test("should not login with invalid credentials", async ({ page }) => {
        
        await page.login(username, "invalid");

        const toast = await page.toastLocator;
        const errorField = await page.fieldErrorLocator;

        await expect(toast).toHaveText("Některé pole obsahuje špatně zadanou hodnotu");
        await expect(errorField).toHaveText("Tyto přihlašovací údaje neodpovídají žadnému záznamu.");

        await expect(page.emailFieldLocator).toBeVisible();
        await expect(page.passwordFieldLocator).toBeVisible();
        await expect(page.loginButtonLocator).toBeVisible();
    });

    test("should logout", async ({ page }) => {

        await page.login(username, password);

        await expect(await page.usernameDropdownLocator).toHaveText(userFullName);

        await page.usernameDropdownLocator.click();
        await page.logoutLinkLocator.click();

        await expect(await page.usernameDropdownLocator).toBeVisible({ visible: false });
        await expect(await page.navbarRightLocator).toHaveText("Přihlásit");
    });

});