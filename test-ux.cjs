const { chromium } = require('playwright');

(async () => {
    const browser = await chromium.launch();
    const context = await browser.newContext({
        viewport: { width: 1280, height: 720 }
    });
    const page = await context.newPage();

    console.log('Testing Pokemon App UI/UX\n');
    console.log('=' .repeat(50));

    // Test Home/Pokedex page
    console.log('\n1. Testing Home/Pokedex page...');
    await page.goto('http://localhost:5173/myprojectapi07/', { waitUntil: 'networkidle' });
    await page.waitForTimeout(2000);
    
    // Take screenshot of main grid
    await page.screenshot({ path: 'test-screenshots/home-page.png' });
    console.log('   - Screenshot: home-page.png');

    // Check for Pokemon cards
    const cards = await page.locator('[class*="PokemonCard"]').count();
    console.log(`   - Pokemon cards found: ${cards}`);

    // Check FavoritesBar
    const favBar = await page.locator('[class*="FavoritesBar"]').count();
    console.log(`   - FavoritesBar found: ${favBar > 0 ? 'Yes' : 'No'}`);

    // Check SearchBar
    const searchBar = await page.locator('[class*="SearchBar"]').count();
    console.log(`   - SearchBar found: ${searchBar > 0 ? 'Yes' : 'No'}`);

    // Check Pagination
    const pagination = await page.locator('[class*="Pagination"]').count();
    console.log(`   - Pagination found: ${pagination > 0 ? 'Yes' : 'No'}`);

    // Test mobile viewport
    console.log('\n2. Testing mobile responsiveness (375px)...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-screenshots/home-mobile.png' });
    console.log('   - Screenshot: home-mobile.png');

    // Test Pokemon Detail page - click on first pokemon
    console.log('\n3. Testing Pokemon Detail page...');
    await page.setViewportSize({ width: 1280, height: 720 });
    const firstCard = page.locator('[class*="PokemonCard"]').first();
    if (await firstCard.count() > 0) {
        await firstCard.click();
        await page.waitForTimeout(2000);
        await page.screenshot({ path: 'test-screenshots/pokemon-detail.png' });
        console.log('   - Screenshot: pokemon-detail.png');
    }

    // Test mobile detail view
    console.log('\n4. Testing detail page mobile...');
    await page.setViewportSize({ width: 375, height: 667 });
    await page.waitForTimeout(1000);
    await page.screenshot({ path: 'test-screenshots/pokemon-detail-mobile.png' });
    console.log('   - Screenshot: pokemon-detail-mobile.png');

    // Check console for errors
    console.log('\n5. Checking for console errors...');
    const consoleMessages = [];
    page.on('console', msg => {
        if (msg.type() === 'error') {
            consoleMessages.push(msg.text());
        }
    });
    await page.reload();
    await page.waitForTimeout(2000);
    
    if (consoleMessages.length > 0) {
        console.log('   - Console errors found:');
        consoleMessages.forEach(msg => console.log(`     ${msg}`));
    } else {
        console.log('   - No critical console errors found');
    }

    console.log('\n' + '='.repeat(50));
    console.log('Testing complete!');

    await browser.close();
})();