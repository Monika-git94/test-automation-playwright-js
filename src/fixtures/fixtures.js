// import random from "random";

require("dotenv").config();

const { ADMIN_USERNAME, ADMIN_PASSWORD } = process.env;

export const username = ADMIN_USERNAME;
export const password = ADMIN_PASSWORD;
export const userFullName = "Lišák Admin";
export const applicationsPageSize = 10;
export const applicationsSearchText = "Eli";
export const applicationsSearchResultText = /.*[Ee]l[ií].*/;

export const ApplicationTexts = {
  loginPage: {
    title: "Přihlášení - Czechitas",
    emailFieldLabel: "Email",
    passwordFieldLabel: "Heslo",
    loginButtonLabel: "Přihlásit",
  },
  applicationsPage: {
    title: "Přihlášky - Czechitas",
    applicationsSectionName: "Přihlášky",
  },
  /*registrationPage: {
        title: "Registrace"
        nameFieldLabel: "Jméno a příjmení",
        emailFieldLabel: "Email",
        passwordFieldLabel: "Heslo",
        passwordCheckLAbel: "Kontrola hesla"
        loginButtonLabel: "Zaregistrovat",
    },
    */
};

