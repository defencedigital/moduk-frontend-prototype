/**
 * @jest-environment puppeteer
 */

const { getExamples } = require('../../../../lib/jest-helpers')
const { renderAndInitialise } = require('../../../../lib/puppeteer-helpers')

const examples = getExamples('notification-banner')

const configPaths = require('../../../../config/paths.js')
const PORT = configPaths.ports.test

const baseUrl = 'http://localhost:' + PORT

describe('Notification banner, when type is set to "success"', () => {
  it('has the correct tabindex attribute to be focused with JavaScript', async () => {
    await page.goto(baseUrl + '/components/notification-banner/with-type-as-success/preview', { waitUntil: 'load' })

    const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))

    expect(tabindex).toEqual('-1')
  })

  it('is automatically focused when the page loads', async () => {
    await page.goto(baseUrl + '/components/notification-banner/with-type-as-success/preview', { waitUntil: 'load' })

    const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

    expect(activeElement).toBe('moduk-notification-banner')
  })

  it('removes the tabindex attribute on blur', async () => {
    await page.goto(baseUrl + '/components/notification-banner/with-type-as-success/preview', { waitUntil: 'load' })

    await page.$eval('.moduk-notification-banner', el => el.blur())

    const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))
    expect(tabindex).toBeNull()
  })

  describe('and auto-focus is disabled using data attributes', () => {
    beforeAll(async () => {
      await page.goto(`${baseUrl}/components/notification-banner/auto-focus-disabled,-with-type-as-success/preview`, { waitUntil: 'load' })
    })

    it('does not have a tabindex attribute', async () => {
      const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('moduk-notification-banner')
    })
  })

  describe('and auto-focus is disabled using JavaScript configuration', () => {
    let page

    beforeAll(async () => {
      page = await renderAndInitialise('notification-banner', {
        baseUrl,
        nunjucksParams:
          examples['with type as success'],
        javascriptConfig: {
          disableAutoFocus: true
        }
      })
    })

    it('does not have a tabindex attribute', async () => {
      const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('moduk-notification-banner')
    })
  })

  describe('and auto-focus is disabled using options passed to initAll', () => {
    let page

    beforeAll(async () => {
      page = await renderAndInitialise('notification-banner', {
        baseUrl,
        nunjucksParams:
          examples['with type as success'],
        initialiser () {
          window.GOVUKFrontend.initAll({
            notificationBanner: {
              disableAutoFocus: true
            }
          })
        }
      })
    })

    it('does not have a tabindex attribute', async () => {
      const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('moduk-notification-banner')
    })
  })

  describe('and autofocus is disabled in JS but enabled in data attributes', () => {
    let page

    beforeAll(async () => {
      page = await renderAndInitialise('notification-banner', {
        baseUrl,
        nunjucksParams: examples['auto-focus explicitly enabled, with type as success'],
        javascriptConfig: {
          disableAutoFocus: true
        }
      })
    })

    it('has the correct tabindex attribute to be focused with JavaScript', async () => {
      const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toEqual('-1')
    })

    it('is automatically focused when the page loads', async () => {
      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).toBe('moduk-notification-banner')
    })
  })

  describe('and role is overridden to "region"', () => {
    it('does not have a tabindex attribute', async () => {
      await page.goto(`${baseUrl}/components/notification-banner/role=alert-overridden-to-role=region,-with-type-as-success/preview`, { waitUntil: 'load' })

      const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))

      expect(tabindex).toBeNull()
    })

    it('does not focus the notification banner', async () => {
      await page.goto(`${baseUrl}/components/notification-banner/role=alert-overridden-to-role=region,-with-type-as-success/preview`, { waitUntil: 'load' })

      const activeElement = await page.evaluate(() => document.activeElement.dataset.module)

      expect(activeElement).not.toBe('moduk-notification-banner')
    })
  })

  describe('and a custom tabindex is set', () => {
    it('does not remove the tabindex attribute on blur', async () => {
      await page.goto(baseUrl + '/components/notification-banner/custom-tabindex/preview', { waitUntil: 'load' })

      await page.$eval('.moduk-notification-banner', el => el.blur())

      const tabindex = await page.$eval('.moduk-notification-banner', el => el.getAttribute('tabindex'))
      expect(tabindex).toEqual('2')
    })
  })
})
