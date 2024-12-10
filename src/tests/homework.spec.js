import { expect, test } from "@playwright/test";
import { password, userFullName, username } from "../fixtures/fixtures";
import { generateEmail } from "../fixtures/helpers";

const pageTitle = "Registrace - Czechitas";

async function openRegistrationPage(page) {
  await page.goto("/registrace");
  await page.screenshot({ path: "registration_page.png" });
}

function getNameSurname(page) {
  return page.getByLabel("Jméno a příjmení");
}

function getEmailField(page) {
  return page.getByLabel("Email");
}

function getPasswordField(page) {
  return page.getByLabel("Heslo");
}

function getPasswordCheck(page) {
  return page.getByLabel("Kontrola hesla");
}

function getRegistrationButton(page) {
  return page.getByRole("button", { name: "Zaregistrovat" });
}

function getToast(page) {
  return page.locator(".toast-error"); //(".toast-message")
}

function getFieldError(page) {
  return page.locator(".invalid-feedback");
}

function getRightNavbar(page) {
  return page.locator(".navbar-right");
}

function getUserNameDropdown(page) {
  return getRightNavbar(page).locator('[data-toggle="dropdown"]');
}

//Test, který přejde na formulář registrace
test.describe("Open registration page", async () => {
  test.beforeEach(async ({ page }) => {
    await openRegistrationPage(page);
    await test.expect(page).toHaveTitle(pageTitle);
  });

  //zkontroluje, že se formulář správně zobrazil
  test("should show registration form correctly", async ({ page }) => {
    const nameField = await getNameSurname(page);
    await expect(nameField, "name field should be visible").toBeVisible();
    await expect(nameField, "name field should be enabled").toBeEnabled();

    const emailField = await getEmailField(page);
    await expect(emailField, "email field should be visible").toBeVisible();
    await expect(emailField, "email field should be enabled").toBeEnabled();

    const passwordField = await getPasswordField(page);
    await expect(passwordField, "password field should be visible").toBeVisible();
    await expect(passwordField, "password field should be enabled").toBeEnabled();

    const passwordCheck = await getPasswordCheck(page);
    await expect(passwordCheck, "second password field should be visible").toBeVisible();
    await expect(passwordCheck, "second password field should be enabled").toBeEnabled();

    const registrationButton = await getRegistrationButton(page);
    await expect(registrationButton, "reg button should be visible").toBeVisible();
    await expect(registrationButton, "reg button text should have text").toHaveText("Zaregistrovat");
  });

  //Test, který provede registraci uživatele s již existujícím emailem
  //zkontroluj, že registrace neproběhla a ověř chyby
  //zkontroluj stav formuláře
  //tip: elementy s třídou invalid-feedback
  test("should not login with existing email", async ({ page }) => {
    const nameField = getNameSurname(page);
    const emailField = getEmailField(page);
    const passwordField = getPasswordField(page);
    const passwordField2 = getPasswordCheck(page);
    const regButton = getRegistrationButton(page);
    const toast = await getToast(page);
    const errorField = await getFieldError(page);

    await nameField.fill(userFullName);
    await emailField.fill(username);
    await passwordField.fill(password);
    await passwordField2.fill(password);
    await page.screenshot({ path: "invalidEmail.png" });
    await regButton.click();

    await expect(toast).toHaveText("×Špatně zadané poleNěkteré pole obsahuje špatně zadanou hodnotu"); //expect(errorField).toBe(true);
    await expect(errorField).toHaveText("Účet s tímto emailem již existuje");

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(passwordField2).toBeVisible();
    await expect(regButton).toBeVisible();
  });

  //Test, který provede registraci uživatele s nevalidním heslem (obsahující pouze čísla)
  //zkontroluj, že registrace neproběhla a ověř chyby
  //zkontroluj stav formuláře
  test("should not login with invalid password", async ({ page }) => {
    const nameField = getNameSurname(page);
    const emailField = getEmailField(page);
    const passwordField = getPasswordField(page);
    const passwordCheck = getPasswordCheck(page);
    const registrationButton = getRegistrationButton(page);
    const toast = await getToast(page);
    const errorField = await getFieldError(page);
    const genEmail = generateEmail();

    await nameField.fill(userFullName);
    await emailField.fill(genEmail); //await emailField.fill(generateEmail);//await page.fill('input[name="email"]', genEmail);
    await passwordField.fill("123456");
    await passwordCheck.fill("123456");
    await page.screenshot({ path: "invalidPassword.png" });
    await registrationButton.click();

    await expect(toast).toHaveText("×Špatně zadané poleNěkteré pole obsahuje špatně zadanou hodnotu");
    await expect(errorField).toHaveText("Heslo musí obsahovat minimálně 6 znaků, velké i malé písmeno a číslici");

    await expect(nameField).toBeVisible();
    await expect(emailField).toBeVisible();
    await expect(passwordField).toBeVisible();
    await expect(passwordCheck).toBeVisible();
    await expect(registrationButton).toBeVisible();
  });

  //Test, který provede validní registraci uživatele
  //zkontroluj, že registrace proběhla úspěšně
  //Test který provede validní registraci uživatele - zkontroluj, že registrace proběhla úspěšně
  test("should register with valid credentials", async ({ page }) => {
    const nameField = getNameSurname(page);
    const emailField = getEmailField(page);
    const passwordField = getPasswordField(page);
    const passwordCheck = getPasswordCheck(page);
    const registrationButton = getRegistrationButton(page);
    const genEmail = generateEmail();

    await nameField.fill(userFullName);
    await emailField.fill(genEmail);
    await passwordField.fill(password);
    await passwordCheck.fill(password);
    await page.screenshot({ path: "validRegistration.png" });
    await registrationButton.click();

    await expect(await getUserNameDropdown(page)).toHaveText(userFullName);
    await expect(page).toHaveURL("https://team8-2022brno.herokuapp.com/zaci");
    page.screenshot({ path: "afterRegistration.png" });

    await expect(nameField, "name field should not be visible").not.toBeVisible();
    await expect(emailField, "email field should not be visible").not.toBeVisible();
    await expect(passwordField, "password field should not be visible").not.toBeVisible();
    await expect(passwordCheck, "check password field should not be visible").not.toBeVisible();
    await expect(registrationButton, "registration button should not be visible").not.toBeVisible();
  });
});
