import { login } from './mixins/session'

describe('Basic Sanity Check', () => {
    let page
    beforeAll(async () => {
        page = await browser.newPage()
        await page.goto(`http://localhost:${process.env.PORT}/`)
    })

    it('title matches', async () => {
        const title = await page.title()
        expect(title).toEqual('Streamr')
    })

    it('does not have logout in nav', async () => {
        await expect(page).not.toMatchElement('#nav-logout-link', { timeout: 500 })
    })

    it('has logout in nav', async () => {
        await login(page)
        await expect(page).toMatchElement('#nav-logout-link')
    })
})
