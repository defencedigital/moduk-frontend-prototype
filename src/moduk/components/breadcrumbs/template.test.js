/**
 * @jest-environment jsdom
 */

const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('breadcrumbs')

describe('Breadcrumbs', () => {
  describe('default example', () => {
    it('passes accessibility tests', async () => {
      const $ = render('breadcrumbs', examples.default)

      const results = await axe($.html())
      expect(results).toHaveNoViolations()
    })

    it('renders with items', () => {
      const $ = render('breadcrumbs', examples.default)

      const $items = $('.moduk-breadcrumbs__list-item')
      expect($items.length).toEqual(2)
    })

    it('renders 2 items', () => {
      const $ = render('breadcrumbs', examples.default)
      const $items = $('.moduk-breadcrumbs__list-item')
      expect($items.length).toEqual(2)
    })

    it('renders item with anchor', () => {
      const $ = render('breadcrumbs', examples.default)

      const $anchor = $('.moduk-breadcrumbs__list-item a').first()
      expect($anchor.get(0).tagName).toEqual('a')
      expect($anchor.attr('class')).toEqual('moduk-breadcrumbs__link')
      expect($anchor.attr('href')).toEqual('/section')
      expect($anchor.text()).toEqual('Section')
    })
  })

  describe('custom options', () => {
    it('renders item with text', () => {
      const $ = render('breadcrumbs', examples['with last breadcrumb as current page'])

      const $item = $('.moduk-breadcrumbs__list-item').last()
      expect($item.text()).toEqual('Travel abroad')
    })

    it('renders item with escaped entities in text', () => {
      const $ = render('breadcrumbs', examples['html as text'])

      const $item = $('.moduk-breadcrumbs__list-item')
      expect($item.html()).toEqual('&lt;span&gt;Section 1&lt;/span&gt;')
    })

    it('renders item with html', () => {
      const $ = render('breadcrumbs', examples.html)

      const $item = $('.moduk-breadcrumbs__list-item').first()
      expect($item.html()).toEqual('<em>Section 1</em>')
    })

    it('renders item with html inside anchor', () => {
      const $ = render('breadcrumbs', examples.html)

      const $anchor = $('.moduk-breadcrumbs__list-item a').last()
      expect($anchor.html()).toEqual('<em>Section 2</em>')
    })

    it('renders item anchor with attributes', () => {
      const $ = render('breadcrumbs', examples['item attributes'])

      const $breadcrumbLink = $('.moduk-breadcrumbs__link')
      expect($breadcrumbLink.attr('data-attribute')).toEqual('my-attribute')
      expect($breadcrumbLink.attr('data-attribute-2')).toEqual('my-attribute-2')
    })

    it('renders with classes', () => {
      const $ = render('breadcrumbs', examples.classes)

      const $component = $('.moduk-breadcrumbs')
      expect($component.hasClass('app-breadcrumbs--custom-modifier')).toBeTruthy()
    })

    it('renders with attributes', () => {
      const $ = render('breadcrumbs', examples.attributes)

      const $component = $('.moduk-breadcrumbs')
      expect($component.attr('id')).toEqual('my-navigation')
      expect($component.attr('role')).toEqual('navigation')
    })

    it('renders item as collapse on mobile if specified', () => {
      const $ = render('breadcrumbs', examples['with collapse on mobile'])

      const $component = $('.moduk-breadcrumbs')
      expect($component.hasClass('moduk-breadcrumbs--collapse-on-mobile')).toBeTruthy()
    })
  })
})
