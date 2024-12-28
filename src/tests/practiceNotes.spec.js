

/*
Ve frameworku Playwright se testy zapisují pomocí interfacu test
test - jednotlivý test
test.describe - blok sdružující testy do nějakého logického celku
test.step - popisek kroku testu
test.skip - přeskočení testu
test.only - zacílení testu
test.describe.skip - přeskočení bloku testů
test.describe.only - zacílení bloku testů
*/

import { test } from "@playwright/test";
//test.describe
test.describe("Login Page", () => {
test("should login with valid credentials", async({ page }) => {     
});

test("should not login in with invalid credentials", async({ page }) => {       
});
});

test.describe('Applications Page', () => {
test("should list all applications", async({ page }) => {     
});
});

// test.describe - vnoření

test.describe("Applications Page", async({ page }) => {   
    test("should list all applications", async({ page }) => {       
    });
    
    test.describe("filtering", async({ page }) => {     
    test("should filter by name", async({ page }) => {     
    });
    });
    
    test.describe("sorting", async({ page }) => {   
    test("should sort by price", async({ page }) => {      
    }); 
    });
    });

//Pokud chceš v reportu popsat konkrétní krok testu, můžeš to udělat pomocí test.step. Je potřeba zavolat s await!

test.describe("Login Page", () => {

    test("should login with valid credentials", async({ page }) => {  
    // code
        await test.step("type into username field", async() => {     
            // code
    });
    // code
    });
    });

//Pokud chci nějaký test nebo sadu testů vynechat, mohu to udělat pomocí test.skip nebo test.describe.skip pro vynechání celého describe bloku.
test.describe("Login Page", () => {
    test.skip("should login with valid credentials", async({ page }) => {
    });
    test("should not login with invalid credentials", async({ page }) => {
    });
    });
        
    test.describe.skip("Applications Page", () => {
    test("should list all applications", async({ page }) => {
    });
    });

//Pokud chci spustit pouze konkrétní nějaký test nebo sadu testů, mohu to udělat pomocí test.only nebo test.describe.only
test.describe("Login Page", () => {
    test.only("should login with valid credentials", async({ page }) => {
    });
    test("should not login with invalid credentials", async({ page }) => {
    });
    });
    
    test.describe.only("Applications Page", () => {
    test("should list all applications", async({ page }) => {
    });
    });
    
//Pokud chceme vyzkoušet, že nějaký test by odchytl chybu, můžeme použít test.fail
//Pokud máme test, který selhává, můžeme ho označit použitím test.fixme
test.fail("should login with valid credentials", async({ page }) => {     
    // fails whole test
    });
    
    test("should login with valid credentials", async({ page }) => {     
    // fails anything after …
    test.fail(browserName === “webkit”, “This feature is not implemented for Mac yet”);
    });

test.fixme("should login with valid credentials", async({ page }) => {     
    // skips whole test
    });
        
    test("should login with valid credentials", async({ page }) => {     
    // skips anything after …
    test.fixme(browserName === “webkit”, “This feature is not implemented for Mac yet”);
    });

    //tagy
    test("should login with valid credentials", { tag: "@smoke" }, async({ page }) => {     
    });
    
    test("should login with valid credentials", { tag: ["@smoke", @"slow"] }, async({ page }) => {     
    });

//anotace
test("should login with valid credentials", { 
    annotation: {
        type: "your type",
        description: "whatever description"
    } 
    }, async({ page }) => {     
    // test
    });

//test.beforeEach a test.afterEach
test.describe("test suite", () => {
    test.beforeAll( async() => { /* běží první před vším ostatním */ });
    test.afterAll( async() => { /* běží poslední po všem ostatním */ });
    test.beforeEach( async() => { /* běží před každým testem */ });
    test.afterEach( async() => { /* běží po každém testu */ });
        
    test("should …", async({ page }) => { /* test 1*/ });
        test("should …", async({ page }) => { /* test 2*/ });
    });


    //hledani lokatoru v
    //await page.locator('.dropdown-item').filter({ hasText: 'Objednávka pro MŠ/ZŠ' }).click()
    
        
    
        
        

        
    