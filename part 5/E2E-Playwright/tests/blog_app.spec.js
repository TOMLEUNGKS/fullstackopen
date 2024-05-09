const { test, expect, beforeEach, describe } = require("@playwright/test");

describe("Blog app", () => {
  test.beforeEach(async ({ page, request }) => {
    await request.post("http://localhost:3003/api/testing/reset");
    await request.post("http://localhost:3003/api/users", {
      data: {
        username: "Tester username",
        name: "Tester One",
        password: "testor",
      },
    });
    await page.goto("http://localhost:5173");
  });

  test("Login form is shown", async ({ page }) => {
    const locator = await page.getByText("log in to application");

    await expect(locator).toBeVisible();
  });

  describe("Login", () => {
    test("Login with correct credentials", async ({ page }) => {
      await page.getByTestId("username").fill("Tester username");
      await page.getByTestId("password").fill("testor");
      await page.getByRole("button", { name: "login" }).click();

      const locator = await page.getByText("Logged in as Tester One");

      await expect(locator).toBeVisible();
    });

    test("Login with incorrect credentials", async ({ page }) => {
      await page.getByTestId("username").fill("Tester username");
      await page.getByTestId("password").fill("testorrr");
      await page.getByRole("button", { name: "login" }).click();

      const locator = await page.getByText("wrong credentials");

      await expect(locator).toBeVisible();
    });
  });

  describe("When logged in", () => {
    beforeEach(async ({ page }) => {
      await page.getByTestId("username").fill("Tester username");
      await page.getByTestId("password").fill("testor");
      await page.getByRole("button", { name: "login" }).click();
    });

    test("A new blog can be created", async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByRole("button", { name: "cancel" }).waitFor();
    //   const textboxes = await page.getByRole('textbox').all()
    //   await textboxes[0].fill("Test blog");
    //   await textboxes[1].fill("Tester One");
    //   await textboxes[2].fill("www.test.com");
      await page.getByTestId("title-input").fill("Test blog");
      await page.getByTestId("author").fill("Tester One");
      await page.getByTestId("url").fill("www.test.com");
      await page.getByRole("button", { name: "create" }).click();

      const locator = await page.getByText("Test blog Tester One");

      await expect(locator).toBeVisible();
    });

    test("A blog can be edited", async ({ page }) => {
        await page.getByRole("button", { name: "new blog" }).click();
      await page.getByRole("button", { name: "cancel" }).waitFor();
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill("Test blog");
      await textboxes[1].fill("Tester One");
      await textboxes[2].fill("www.test.com");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByRole("button", { name: "view" }).waitFor()
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "like" }).click();
      await page.waitForSelector('text=1')

    // await page.getByText("1").waitFor()
      const locator = await page.getByText("1");

      await expect(locator).toBeVisible();
    });

    test('A blog can be deleted', async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByRole("button", { name: "cancel" }).waitFor();
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill("Test blog");
      await textboxes[1].fill("Tester One");
      await textboxes[2].fill("www.test.com");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByRole("button", { name: "view" }).waitFor()
      await page.getByRole("button", { name: "view" }).click();
      await page.getByRole("button", { name: "delete" }).click();

      page.on('dialog', async dialog => {
        // Check if the dialog message matches what you expect
        if (dialog.message() === 'Remove Test blog by Tester One?') {
            // If it does, accept the dialog
            await dialog.accept();
        } else {
            // If it doesn't, handle it accordingly (e.g., dismiss it)
            await dialog.dismiss();
        }
    });

      const locator = await page.getByText("Test blog Tester One");

      await expect(locator).not.toBeVisible();
    })

    test('user can see delete button', async ({ page }) => {
      await page.getByRole("button", { name: "new blog" }).click();
      await page.getByRole("button", { name: "cancel" }).waitFor();
      const textboxes = await page.getByRole('textbox').all()
      await textboxes[0].fill("Test blog");
      await textboxes[1].fill("Tester One");
      await textboxes[2].fill("www.test.com");
      await page.getByRole("button", { name: "create" }).click();
      await page.getByRole("button", { name: "view" }).waitFor()
      await page.getByRole("button", { name: "view" }).click();

      const locator = await page.getByRole("button", { name: "delete" });

      await expect(locator).toBeVisible();
    })

    test('blogs are ordered by number of likes', async ({ page }) => {
        await page.click('[aria-label="new blog"]');
        await page.fill('[data-testid="title"]', 'First Blog');
        await page.fill('[data-testid="author"]', 'Author One');
        await page.fill('[data-testid="url"]', 'http://www.example.com');
        await page.click('[data-testid="create"]');
    
        await page.click('[aria-label="new blog"]');
        await page.fill('[data-testid="title"]', 'Second Blog');
        await page.fill('[data-testid="author"]', 'Author Two');
        await page.fill('[data-testid="url"]', 'http://www.example.com');
        await page.click('[data-testid="create"]');
    
        await page.click('[aria-label="like"]');
        await page.click('[aria-label="like"]');
    
        const blogItems = await page.$$('.blog-item');
    
        const firstBlog = await blogItems[0].innerText();
        const secondBlog = await blogItems[1].innerText();
        expect(secondBlog).toContain('Second Blog');
        expect(firstBlog).toContain('First Blog');
    })
  });
});
