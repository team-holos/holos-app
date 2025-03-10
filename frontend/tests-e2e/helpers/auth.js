export async function waitForServer(page) {
    let retries = 5;
    while (retries > 0) {
        try {
            await page.goto('http://localhost:5173/login');
            return;
        } catch (error) {
            if (!error.message.includes('net::ERR_CONNECTION_REFUSED') || retries === 1) {
                throw error;
            }
            await new Promise(resolve => setTimeout(resolve, 2000));
            retries--;
        }
    }
}

export async function loginAsTestUser(page) {
    await waitForServer(page);
    try {
        await page.fill('input[placeholder="E-Mail-Adresse"]', 'test@example.com');
        await page.fill('input[placeholder="Passwort"]', 'Test123!');
        await page.click('button:has-text("Login")');
        await page.waitForURL('http://localhost:5173/dashboard');
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
