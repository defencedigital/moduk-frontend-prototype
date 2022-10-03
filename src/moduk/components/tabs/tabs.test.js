/**
 * @jest-environment puppeteer
 */

const { devices } = require('puppeteer')
const iPhone = devices['iPhone 6']
const configPaths = require('../../../../config/paths.js')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT

describe('/components/tabs', () => {
  describe('/components/tabs/preview', () => {
    describe('when JavaScript is unavailable or fails', () => {
      beforeAll(async () => {
        await page.setJavaScriptEnabled(false)
      })

      afterAll(async () => {
        await page.setJavaScriptEnabled(true)
      })

      it('falls back to making all tab containers visible', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })
        const isContentVisible = await page.waitForSelector('.moduk-tabs__panel', { visible: true, timeout: 1000 })
        expect(isContentVisible).toBeTruthy()
      })
    })

    describe('when JavaScript is available', () => {
      it('should indicate the open state of the first tab', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

        const firstTabAriaSelected = await page.evaluate(() => document.body.querySelector('.moduk-tabs__list-item:first-child .moduk-tabs__tab').getAttribute('aria-selected'))
        expect(firstTabAriaSelected).toEqual('true')

        const firstTabClasses = await page.evaluate(() => document.body.querySelector('.moduk-tabs__list-item:first-child').className)
        expect(firstTabClasses).toContain('moduk-tabs__list-item--selected')
      })

      it('should display the first tab panel', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

        const tabPanelIsHidden = await page.evaluate(() => document.body.querySelector('.moduk-tabs > .moduk-tabs__panel').classList.contains('moduk-tabs__panel--hidden'))
        expect(tabPanelIsHidden).toBeFalsy()
      })

      it('should hide all the tab panels except for the first one', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

        const tabPanelIsHidden = await page.evaluate(() => document.body.querySelector('.moduk-tabs > .moduk-tabs__panel ~ .moduk-tabs__panel').classList.contains('moduk-tabs__panel--hidden'))
        expect(tabPanelIsHidden).toBeTruthy()
      })
    })

    describe('when a tab is pressed', () => {
      it('should indicate the open state of the pressed tab', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

        // Click the second tab
        await page.click('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab')

        const secondTabAriaSelected = await page.evaluate(() => document.body.querySelector('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab').getAttribute('aria-selected'))
        expect(secondTabAriaSelected).toEqual('true')

        const secondTabClasses = await page.evaluate(() => document.body.querySelector('.moduk-tabs__list-item:nth-child(2)').className)
        expect(secondTabClasses).toContain('moduk-tabs__list-item--selected')
      })

      it('should display the tab panel associated with the selected tab', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

        // Click the second tab
        await page.click('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab')

        const secondTabPanelIsHidden = await page.evaluate(() => {
          const secondTabAriaControls = document.body.querySelector('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab').getAttribute('aria-controls')
          return document.body.querySelector(`[id="${secondTabAriaControls}"]`).classList.contains('moduk-tabs__panel--hidden')
        })
        expect(secondTabPanelIsHidden).toBeFalsy()
      })

      describe('when the tab contains a DOM element', () => {
        it('should display the tab panel associated with the selected tab', async () => {
          await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

          await page.evaluate(() => {
            // Replace contents of second tab with a DOM element
            const secondTab = document.body.querySelector('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab')
            secondTab.innerHTML = '<span>Tab 2</span>'
          })

          // Click the DOM element inside the second tab
          await page.click('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab span')

          const secondTabPanelIsHidden = await page.evaluate(() => {
            const secondTabAriaControls = document.body.querySelector('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab').getAttribute('aria-controls')
            return document.body.querySelector(`[id="${secondTabAriaControls}"]`).classList.contains('moduk-tabs__panel--hidden')
          })
          expect(secondTabPanelIsHidden).toBeFalsy()
        })
      })
    })

    describe('when first tab is focused and the right arrow key is pressed', () => {
      it('should indicate the open state of the next tab', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

        // Press right arrow when focused on the first tab
        await page.focus('.moduk-tabs__list-item:first-child .moduk-tabs__tab')
        await page.keyboard.press('ArrowRight')

        const secondTabAriaSelected = await page.evaluate(() => document.body.querySelector('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab').getAttribute('aria-selected'))
        expect(secondTabAriaSelected).toEqual('true')

        const secondTabClasses = await page.evaluate(() => document.body.querySelector('.moduk-tabs__list-item:nth-child(2)').className)
        expect(secondTabClasses).toContain('moduk-tabs__list-item--selected')
      })

      it('should display the tab panel associated with the selected tab', async () => {
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })

        // Press right arrow
        await page.focus('.moduk-tabs__list-item:first-child .moduk-tabs__tab')
        await page.keyboard.down('ArrowRight')

        const secondTabPanelIsHidden = await page.evaluate(() => {
          const secondTabAriaControls = document.body.querySelector('.moduk-tabs__list-item:nth-child(2) .moduk-tabs__tab').getAttribute('aria-controls')
          return document.body.querySelector(`[id="${secondTabAriaControls}"]`).classList.contains('moduk-tabs__panel--hidden')
        })
        expect(secondTabPanelIsHidden).toBeFalsy()
      })
    })

    describe('when a hash associated with a tab panel is passed in the URL', () => {
      it('should indicate the open state of the associated tab', async () => {
        await page.goto(baseUrl + '/components/tabs/preview/#past-week', { waitUntil: 'load' })

        const currentTabAriaSelected = await page.evaluate(() => document.body.querySelector('.moduk-tabs__tab[href="#past-week"]').getAttribute('aria-selected'))
        expect(currentTabAriaSelected).toEqual('true')

        const currentTabClasses = await page.evaluate(() => document.body.querySelector('.moduk-tabs__tab[href="#past-week"]').parentNode.className)
        expect(currentTabClasses).toContain('moduk-tabs__list-item--selected')

        const currentTabPanelIsHidden = await page.evaluate(() => document.getElementById('past-week').classList.contains('moduk-tabs__panel--hidden'))
        expect(currentTabPanelIsHidden).toBeFalsy()
      })
      it('should only update based on hashes that are tabs', async () => {
        await page.goto(baseUrl + '/components/tabs/tabs-with-anchor-in-panel/preview', { waitUntil: 'load' })

        await page.click('[href="#anchor"]')

        const activeElementId = await page.evaluate(() => document.activeElement.id)
        expect(activeElementId).toEqual('anchor')
      })
    })

    describe('when rendered on a small device', () => {
      it('falls back to making the all tab containers visible', async () => {
        await page.emulate(iPhone)
        await page.goto(baseUrl + '/components/tabs/preview', { waitUntil: 'load' })
        const isContentVisible = await page.waitForSelector('.moduk-tabs__panel', { visible: true, timeout: 1000 })
        expect(isContentVisible).toBeTruthy()
      })
    })
  })
})
