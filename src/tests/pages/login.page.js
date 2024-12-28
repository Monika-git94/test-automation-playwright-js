export class LoginPage {
    
    constructor(page) {
        this.page = page;
        this.emailFieldLocator = this.page.getByLabel("Email");
        this.passwordFieldLocator = this.page.getByLabel("Heslo");
        this.loginButtonLocator = this.page.getByRole("button", { name: "Přihlásit"});
        this.toastLocator = this.page.locator(".toast-message");
        this.fieldErrorLocator = this.page.locator(".invalid-feedback");
        this.navbarRightLocator = this.page.locator(".navbar-right");
        this.usernameDropdownLocator = this.navbarRightLocator.locator("[data-toggle='dropdown']");
        this.logoutLinkLocator = this.page.locator("#logout-link");

    }

    async open() {
        await this.page.goto("/prihlaseni");
    }

    async login(username, password) {
        await this.emailFieldLocator.fill(username);
        await this.passwordFieldLocator.fill(password);
        await this.loginButtonLocator.click();
        return new ApplicationPage(this.page);
    }

    async resetPassword() {

    }





}