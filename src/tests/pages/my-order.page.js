export class MyOrderPage {
    constructor(page) {
        this.page = page;
        this.forTeachersButtonLocator = this.page.getByRole("button", { name: "Pro učitelé" });
        this.orderLinkLocator = this.page.getByRole("link", { name: "Objednávka pro MŠ/ZŠ" });
        this.pageTitle = this.page.locator("h1");

        this.icoFieldLocator = this.page.getByRole("textbox", {name: "IČO" });
        this.odberatelFieldLocator = this.page.getByRole("textbox", {name: "Odběratel" });
        this.addressFieldLocator = this.page.getByRole("textbox", {name: "Úplná adresa" });
        this.directorFieldLocator = this.page.getByRole("textbox", {name: "Zastoupena - ředitel(ka) školy" });
        this.nameFieldLocator = this.page.getByRole("textbox", {name: "Jméno a příjmení" });
        this.phoneFieldLocator = this.page.getByRole("textbox", {name: "Telefon" });
        this.emailFieldLocator = this.page.getByRole("textbox", {name: "Email" });

        this.startDate1Locator = this.page.locator("#start_date_1");
        this.endDate1Locator = this.page.locator("#end_date_1");
        this.startDate2Locator = this.page.locator("#start_date_2");
        this.endDate2Locator = this.page.locator("#end_date_2");
        this.startDate3Locator = this.page.locator("#start_date_3");
        this.endDate3Locator = this.page.locator("#end_date_3");

        this.orderCityCampLocator = this.page.getByRole("tab", { name: "Příměstský tábor" });
        this.campNumberOfKidsLocator = this.page.locator("#camp-students");
        this.campKidsAgeLocator = this.page.locator("#camp-age");
        this.campNumberOfAdultsLocator = this.page.locator("#camp-adults");

        this.orderNatureStayLocator = this.page.getByRole("tab", { name: "Škola v přírodě" });
        this.natureNumberOfKidsLocator = this.page.locator("#nature-students");

        this.saveOrderButtonLocator = this.page.getByRole("button", { name: "Uložit objednávku" });
        this.orderFinishedPageTitle = this.page.locator("h3");

    }

    async open() {
        await this.page.goto("/prihlaseni");
    }

    async newOrderPage() {
        await this.page.goto("/objednavka/pridat");
    }

    

   

}