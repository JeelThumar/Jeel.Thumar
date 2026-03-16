const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('requestfailed', request => {
      if(request.failure()) console.log('PAGE REQUEST FAILED:', request.failure().errorText, request.url())
  });

  try {
      await page.goto('http://localhost:5173', { waitUntil: 'networkidle0' });
      const html = await page.content();
      console.log("Root content length:", html.length);
  } catch (error) {
      console.error(error);
  }
  
  await browser.close();
})();
