const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: 'new' });
  const page = await browser.newPage();
  
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  page.on('console', msg => {
      if(msg.type() === 'error') console.log('PAGE ERROR LOG:', msg.text())
  });
  
  await page.goto('http://localhost:5175');
  await page.evaluate(() => {
    localStorage.setItem('isAdminAuthenticated', 'true');
  });
  
  try {
      await page.goto('http://localhost:5175/admin/dashboard', { waitUntil: 'networkidle0' });
  } catch (error) {
      console.log('Puppeteer navigation error:', error.message);
  }

  await browser.close();
})();
