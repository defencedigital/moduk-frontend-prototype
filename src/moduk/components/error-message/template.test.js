/**
 * @jest-environment jsdom
 */

const { axe, render, getExamples } = require('../../../../lib/jest-helpers')

const examples = getExamples('error-message')

describe('Error message', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('error-message', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('renders with a custom id', () => {
    const $ = render('error-message', examples.id)

    const $component = $('.moduk-error-message')
    expect($component.attr('id')).toEqual('my-error-message-id')
  })

  it('allows additional classes to specified', () => {
    const $ = render('error-message', examples.classes)

    const $component = $('.moduk-error-message')
    expect($component.hasClass('custom-class')).toBeTruthy()
  })

  it('allows text to be passed whilst escaping HTML entities', () => {
    const $ = render('error-message', examples['html as text'])

    const content = $('.moduk-error-message').html().trim()
    expect(content).toContain('Unexpected &gt; in body')
  })

  it('allows summary HTML to be passed un-escaped', () => {
    const $ = render('error-message', examples.html)

    const content = $('.moduk-error-message').html().trim()
    expect(content).toContain('Unexpected <b>bold text</b> in body copy')
  })

  it('allows additional attributes to be specified', () => {
    const $ = render('error-message', examples.attributes)

    const $component = $('.moduk-error-message')
    expect($component.attr('data-test')).toEqual('attribute')
    expect($component.attr('id')).toEqual('my-error-message')
  })

  it('includes a visually hidden "Error" prefix by default', () => {
    const $ = render('error-message', examples.default)

    const $component = $('.moduk-error-message')
    expect($component.text().trim()).toEqual('Error: Error message about full name goes here')
  })

  it('allows the visually hidden prefix to be customised', () => {
    const $ = render('error-message', examples['with visually hidden text'])

    const $component = $('.moduk-error-message')
    expect($component.text().trim()).toEqual('Gwall: Rhowch eich enw llawn')
  })

  it('allows the visually hidden prefix to be removed', () => {
    const $ = render('error-message', examples['visually hidden text removed'])

    const $component = $('.moduk-error-message')
    expect($component.text().trim()).toEqual('There is an error on line 42')
  })

  it('allows the visually hidden prefix to be removed and then manually added with HTML', () => {
    const $ = render('error-message', examples.translated)

    const $component = $('.moduk-error-message')
    expect($component.html().trim()).toContain('<span class="moduk-visually-hidden">Gwall:</span> Neges gwall am yr enw llawn yn mynd yma')
  })
})