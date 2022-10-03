/**
 * @jest-environment jsdom
 */

const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('footer')

describe('footer', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('footer', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('entire component must have a role of `contentinfo`', () => {
    const $ = render('footer', examples.default)

    const $component = $('.moduk-footer')
    expect($component.attr('role')).toEqual('contentinfo')
  })

  it('renders attributes correctly', () => {
    const $ = render('footer', examples.attributes)

    const $component = $('.moduk-footer')
    expect($component.attr('data-test-attribute')).toEqual('value')
    expect($component.attr('data-test-attribute-2')).toEqual('value-2')
  })

  it('renders classes', () => {
    const $ = render('footer', examples.classes)

    const $component = $('.moduk-footer')
    expect($component.hasClass('app-footer--custom-modifier')).toBeTruthy()
  })

  it('renders custom container classes', () => {
    const $ = render('footer', examples['with container classes'])

    const $component = $('.moduk-footer')
    const $container = $component.find('.moduk-width-container')

    expect($container.hasClass('app-width-container')).toBeTruthy()
  })

  describe('meta', () => {
    it('passes accessibility tests', async () => {
      const $ = render('footer', examples['with meta'])

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders heading', () => {
      const $ = render('footer', examples['with meta'])

      const $component = $('.moduk-footer')
      const $heading = $component.find('h2.moduk-visually-hidden')
      expect($heading.text()).toEqual('Items')
    })

    it('renders default heading when none supplied', () => {
      const $ = render('footer', examples['with empty meta'])

      const $component = $('.moduk-footer')
      const $heading = $component.find('h2.moduk-visually-hidden')
      expect($heading.text()).toEqual('Support links')
    })

    it('doesn\'t render footer link list when no items are provided', () => {
      const $ = render('footer', examples['with empty meta items'])

      expect($('.moduk-footer__inline-list').length).toEqual(0)
    })

    it('renders links', () => {
      const $ = render('footer', examples['with meta'])

      const $list = $('ul.moduk-footer__inline-list')
      const $items = $list.find('li.moduk-footer__inline-list-item')
      const $firstItem = $items.find('a.moduk-footer__link:first-child')
      expect($items.length).toEqual(3)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Item 1')
    })

    it('renders custom meta text', () => {
      const $ = render('footer', examples['with custom meta'])

      const $custom = $('.moduk-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders custom meta html as text', () => {
      const $ = render('footer', examples['meta html as text'])

      const $custom = $('.moduk-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit <strong>v7.0.1</strong>')
    })

    it('renders custom meta html', () => {
      const $ = render('footer', examples['with meta html'])

      const $custom = $('.moduk-footer__meta-custom')
      expect($custom.text()).toContain('GOV.UK Prototype Kit v7.0.1')
    })

    it('renders attributes on meta links', () => {
      const $ = render('footer', examples['with meta item attributes'])

      const $metaLink = $('.moduk-footer__meta .moduk-footer__link')
      expect($metaLink.attr('data-attribute')).toEqual('my-attribute')
      expect($metaLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })
  })

  describe('navigation', () => {
    it('passes accessibility tests', async () => {
      const $ = render('footer', examples['with navigation'])

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('no items displayed when no item array is provided', () => {
      const $ = render('footer', examples['with empty navigation'])

      expect($('.moduk-footer__navigation').length).toEqual(0)
    })

    it('renders headings', () => {
      const $ = render('footer', examples['with navigation'])

      const $firstSection = $('.moduk-footer__section:first-child')
      const $lastSection = $('.moduk-footer__section:last-child')
      const $firstHeading = $firstSection.find('h2.moduk-footer__heading')
      const $lastHeading = $lastSection.find('h2.moduk-footer__heading')
      expect($firstHeading.text()).toEqual('Two column list')
      expect($lastHeading.text()).toEqual('Single column list')
    })

    it('renders lists of links', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.moduk-footer__list')
      const $items = $list.find('li.moduk-footer__list-item')
      const $firstItem = $items.find('a.moduk-footer__link:first-child')
      expect($items.length).toEqual(9)
      expect($firstItem.attr('href')).toEqual('#1')
      expect($firstItem.text()).toContain('Navigation item 1')
    })

    it('renders attributes on links', () => {
      const $ = render('footer', examples['with navigation item attributes'])

      const $navigationLink = $('.moduk-footer__list .moduk-footer__link')
      expect($navigationLink.attr('data-attribute')).toEqual('my-attribute')
      expect($navigationLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })

    it('renders lists in columns', () => {
      const $ = render('footer', examples['with navigation'])

      const $list = $('ul.moduk-footer__list')
      expect($list.hasClass('moduk-footer__list--columns-2')).toBeTruthy()
    })

    it('renders one-column section full width by default', () => {
      const $ = render('footer', examples['with default width navigation (one column)'])

      const $section = $('.moduk-footer__section')
      expect($section.hasClass('moduk-grid-column-full')).toBeTruthy()
    })

    it('renders two-column section full width by default', () => {
      const $ = render('footer', examples['with default width navigation (two columns)'])

      const $section = $('.moduk-footer__section')
      expect($section.hasClass('moduk-grid-column-full')).toBeTruthy()
    })

    it('renders section custom width when width specified', () => {
      const $ = render('footer', examples['with navigation'])

      const $section = $('.moduk-footer__section')
      expect($section.hasClass('moduk-grid-column-two-thirds')).toBeTruthy()
    })
  })

  describe('section break', () => {
    it('renders when there is a navigation', () => {
      const $ = render('footer', examples['with navigation'])

      const $sectionBreak = $('hr.moduk-footer__section-break')
      expect($sectionBreak.length).toBeTruthy()
    })

    it('renders nothing when there is only meta', () => {
      const $ = render('footer', examples['with meta'])

      const $sectionBreak = $('hr.moduk-footer__section-break')
      expect($sectionBreak.length).toBeFalsy()
    })
  })

  describe('content licence', () => {
    it('is visible', () => {
      const $ = render('footer', examples.default)

      const $licenceMessage = $('.moduk-footer__licence-description')
      expect($licenceMessage.text()).toContain('Open Government Licence v3.0')
    })

    it('can be customised with `text` parameter', () => {
      const $ = render('footer', examples['with custom text content licence and copyright notice'])

      const $licenceMessage = $('.moduk-footer__licence-description')
      expect($licenceMessage.text()).toContain('Drwydded y Llywodraeth Agored v3.0')
    })

    it('can be customised with `html` parameter', () => {
      const $ = render('footer', examples['with custom HTML content licence and copyright notice'])

      const $licenceMessage = $('.moduk-footer__licence-description')
      expect($licenceMessage.html()).toContain('<a class="moduk-footer__link" href="https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/" rel="license">Drwydded y Llywodraeth Agored v3.0</a>')
    })

    it('escapes HTML in the `text` parameter', () => {
      const $ = render('footer', examples['with HTML passed as text content'])

      const $licenceMessage = $('.moduk-footer__licence-description')
      expect($licenceMessage.html()).toContain('&lt;a class=&quot;moduk-footer__link&quot; href=&quot;https://www.nationalarchives.gov.uk/doc/open-government-licence-cymraeg/version/3/&quot; rel=&quot;license&quot;&gt;Drwydded y Llywodraeth Agored v3.0&lt;/a&gt;')
    })
  })

  describe('crown copyright', () => {
    it('is visible', () => {
      const $ = render('footer', examples.default)

      const $copyrightMessage = $('.moduk-footer__copyright-logo')
      expect($copyrightMessage.text()).toContain('© Crown copyright')
    })

    it('can be customised with `text` parameter', () => {
      const $ = render('footer', examples['with custom text content licence and copyright notice'])

      const $copyrightMessage = $('.moduk-footer__copyright-logo')
      expect($copyrightMessage.text()).toContain('© Hawlfraint y Goron')
    })

    it('can be customised with `html` parameter', () => {
      const $ = render('footer', examples['with custom HTML content licence and copyright notice'])

      const $copyrightMessage = $('.moduk-footer__copyright-logo')
      expect($copyrightMessage.html()).toContain('<span>Hawlfraint y Goron</span>')
    })

    it('escapes HTML in the `text` parameter', () => {
      const $ = render('footer', examples['with HTML passed as text content'])

      const $copyrightMessage = $('.moduk-footer__copyright-logo')
      expect($copyrightMessage.html()).toContain('&lt;span&gt;Hawlfraint y Goron&lt;/span&gt;')
    })
  })
})
