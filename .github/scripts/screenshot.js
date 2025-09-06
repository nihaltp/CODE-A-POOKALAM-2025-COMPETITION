const puppeteer = require("puppeteer");

(async () => {
    const browser = await puppeteer.launch({
        args: ["--no-sandbox", "--disable-setuid-sandbox"], // 🔥 important fix
    });
    const page = await browser.newPage();

    // Go to your deployed site
    await page.goto("https://nihaltp.github.io/CODE-A-POOKALAM-2025-COMPETITION/", {
        waitUntil: "networkidle0", // wait until network is idle
        timeout: 60000,
    });

    // Wait for the canvas inside #sketch_container
    await page.waitForSelector("#sketch_container canvas", { timeout: 60000 });

    // Screenshot only the canvas
    const canvas = await page.$("#sketch_container canvas");
    await canvas.screenshot({ path: "my_pookkalam.png" });

    await browser.close();
})();
