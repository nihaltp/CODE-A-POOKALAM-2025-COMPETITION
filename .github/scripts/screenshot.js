const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"], // 🔥 important fix
    });
    const page = await browser.newPage();

    // Open your index.html (hosted from repo)
    await page.goto(`file://${process.cwd()}/index.html`);

    // Wait for canvas to be ready
    await page.waitForSelector("canvas");

    // Screenshot only the canvas
    const canvas = await page.$("canvas");
    await canvas.screenshot({ path: "my_pookkalam.png" });

    await browser.close();
})();
