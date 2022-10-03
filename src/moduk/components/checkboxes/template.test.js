/**
 * @jest-environment jsdom
 */

const { axe, render, getExamples, htmlWithClassName } = require('../../../../lib/jest-helpers')

const examples = getExamples('checkboxes')

const WORD_BOUNDARY = '\\b'
const WHITESPACE = '\\s'

describe('Checkboxes', () => {
  it('default example passes accessibility tests', async () => {
    const $ = render('checkboxes', examples.default)

    const results = await axe($.html())
    expect(results).toHaveNoViolations()
  })

  it('render example with minimum required name and items', () => {
    const $ = render('checkboxes', examples.default)

    const $component = $('.moduk-checkboxes')

    const $firstInput = $component.find('.moduk-checkboxes__item:first-child input')
    const $firstLabel = $component.find('.moduk-checkboxes__item:first-child label')
    expect($firstInput.attr('name')).toEqual('nationality')
    expect($firstInput.val()).toEqual('british')
    expect($firstLabel.text()).toContain('British')

    const $lastInput = $component.find('.moduk-checkboxes__item:last-child input')
    const $lastLabel = $component.find('.moduk-checkboxes__item:last-child label')
    expect($lastInput.attr('name')).toEqual('nationality')
    expect($lastInput.val()).toEqual('other')
    expect($lastLabel.text()).toContain('Citizen of another country')
  })

  it('render example without falsely values', () => {
    const $ = render('checkboxes', examples['with falsey values'])

    const $component = $('.moduk-checkboxes')
    const $items = $component.find('.moduk-checkboxes__item')

    expect($items.length).toEqual(2)
  })

  it('render example with a divider and ‘None’ checkbox with exclusive behaviour', () => {
    const $ = render('checkboxes', examples['with divider and None'])

    const $component = $('.moduk-checkboxes')

    const $divider = $component.find('.moduk-checkboxes__divider').first()
    expect($divider.text().trim()).toEqual('or')

    const $items = $component.find('.moduk-checkboxes__item')
    expect($items.length).toEqual(4)

    const $orItemInput = $items.last().find('input').first()
    expect($orItemInput.attr('data-behaviour')).toEqual('exclusive')
  })

  it('render additional label classes', () => {
    const $ = render('checkboxes', examples['with label classes'])

    const $component = $('.moduk-checkboxes')
    const $label = $component.find('.moduk-checkboxes__item label')
    expect($label.hasClass('bold')).toBeTruthy()
  })

  it('render classes', () => {
    const $ = render('checkboxes', examples.classes)

    const $component = $('.moduk-checkboxes')

    expect($component.hasClass('app-checkboxes--custom-modifier')).toBeTruthy()
  })

  it('renders initial aria-describedby on fieldset', () => {
    const $ = render('checkboxes', examples['with fieldset describedBy'])

    const $fieldset = $('.moduk-fieldset')
    expect($fieldset.attr('aria-describedby')).toMatch('some-id')
  })

  it('render attributes', () => {
    const $ = render('checkboxes', examples.attributes)

    const $component = $('.moduk-checkboxes')

    expect($component.attr('data-attribute')).toEqual('value')
    expect($component.attr('data-second-attribute')).toEqual('second-value')
  })

  it('renders with a form group wrapper', () => {
    const $ = render('checkboxes', examples.default)

    const $formGroup = $('.moduk-form-group')
    expect($formGroup.length).toBeTruthy()
  })

  it('render a custom class on the form group', () => {
    const $ = render('checkboxes', examples['with optional form-group classes showing group error'])

    const $formGroup = $('.moduk-form-group')
    expect($formGroup.hasClass('moduk-form-group--error')).toBeTruthy()
  })

  describe('items', () => {
    it('render a matching label and input using name by default', () => {
      const $ = render('checkboxes', examples.default)

      const $component = $('.moduk-checkboxes')

      const $firstInput = $component.find('.moduk-checkboxes__item:first-child input')
      const $firstLabel = $component.find('.moduk-checkboxes__item:first-child label')
      expect($firstInput.attr('id')).toEqual('nationality')
      expect($firstLabel.attr('for')).toEqual('nationality')

      const $lastInput = $component.find('.moduk-checkboxes__item:last-child input')
      const $lastLabel = $component.find('.moduk-checkboxes__item:last-child label')
      expect($lastInput.attr('id')).toEqual('nationality-3')
      expect($lastLabel.attr('for')).toEqual('nationality-3')
    })

    it('render a matching label and input using custom idPrefix', () => {
      const $ = render('checkboxes', examples['with idPrefix'])

      const $component = $('.moduk-checkboxes')

      const $firstInput = $component.find('.moduk-checkboxes__item:first-child input')
      const $firstLabel = $component.find('.moduk-checkboxes__item:first-child label')
      expect($firstInput.attr('id')).toEqual('nationality')
      expect($firstLabel.attr('for')).toEqual('nationality')

      const $lastInput = $component.find('.moduk-checkboxes__item:last-child input')
      const $lastLabel = $component.find('.moduk-checkboxes__item:last-child label')
      expect($lastInput.attr('id')).toEqual('nationality-2')
      expect($lastLabel.attr('for')).toEqual('nationality-2')
    })

    it('render explicitly passed item ids', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $component = $('.moduk-checkboxes')

      const $lastInput = $component.find('.moduk-checkboxes__item:last-child input')
      expect($lastInput.attr('id')).toBe('with-id-and-name-3')

      const $firstInput = $component.find('.moduk-checkboxes__item:first-child input')
      const $firstLabel = $component.find('.moduk-checkboxes__item:first-child label')
      expect($firstInput.attr('id')).toBe('item_british')
      expect($firstLabel.attr('for')).toEqual('item_british')
    })

    it('render explicitly passed item names', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $component = $('.moduk-checkboxes')

      const $lastInput = $component.find('.moduk-checkboxes__item:last-child input')
      expect($lastInput.attr('name')).toBe('custom-name-scottish')
    })

    it('render disabled', () => {
      const $ = render('checkboxes', examples['with disabled item'])

      const $component = $('.moduk-checkboxes')

      const $disabledInput = $component.find('.moduk-checkboxes__item:last-child input')
      expect($disabledInput.attr('disabled')).toEqual('disabled')
    })

    it('render checked', () => {
      const $ = render('checkboxes', examples['with checked item'])

      const $component = $('.moduk-checkboxes')
      const $secondInput = $component.find('.moduk-checkboxes__item:nth-child(2) input')
      const $lastInput = $component.find('.moduk-checkboxes__item:last-child input')
      expect($secondInput.attr('checked')).toEqual('checked')
      expect($lastInput.attr('checked')).toEqual('checked')
    })

    it('checks the checkboxes in values', () => {
      const $ = render('checkboxes', examples['with pre-checked values'])

      const $component = $('.moduk-checkboxes')
      const $british = $component.find('input[value="british"]')
      expect($british.attr('checked')).toEqual('checked')

      const $other = $component.find('input[value="other"]')
      expect($other.attr('checked')).toEqual('checked')
    })

    it('allows item.checked to override values', () => {
      const $ = render('checkboxes', examples['item checked overrides values'])

      const $green = $('.moduk-checkboxes').find('input[value="green"]')
      expect($green.attr('checked')).toBeUndefined()
    })

    describe('when they include attributes', () => {
      it('it renders the attributes', () => {
        const $ = render('checkboxes', examples['items with attributes'])

        const $component = $('.moduk-checkboxes')

        const $firstInput = $component.find('.moduk-checkboxes__item:first-child input')
        expect($firstInput.attr('data-attribute')).toEqual('ABC')
        expect($firstInput.attr('data-second-attribute')).toEqual('DEF')

        const $lastInput = $component.find('.moduk-checkboxes__item:last-child input')
        expect($lastInput.attr('data-attribute')).toEqual('GHI')
        expect($lastInput.attr('data-second-attribute')).toEqual('JKL')
      })
    })
  })

  describe('when they include a hint', () => {
    it('it renders the hint text', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      const $firstHint = $('.moduk-checkboxes__hint').first()
      expect($firstHint.text().trim()).toContain('You\'ll have a user ID if you\'ve registered for Self Assessment or filed a tax return online before.')
    })

    it('it renders the correct id attribute for the hint', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      expect($('.moduk-checkboxes__hint').attr('id')).toBe('government-gateway-item-hint')
    })

    it('the input describedBy attribute matches the item hint id', () => {
      const $ = render('checkboxes', examples['with hints on items'])

      expect($('.moduk-checkboxes__input').attr('aria-describedby')).toBe('government-gateway-item-hint')
    })
  })

  describe('render conditionals', () => {
    it('hidden by default when not checked', () => {
      const $ = render('checkboxes', examples['with conditional items'])

      const $component = $('.moduk-checkboxes')

      const $firstConditional = $component.find('.moduk-checkboxes__conditional').first()
      expect($firstConditional.text().trim()).toContain('Email address')
      expect($firstConditional.hasClass('moduk-checkboxes__conditional--hidden')).toBeTruthy()
    })
    it('visible by default when checked', () => {
      const $ = render('checkboxes', examples['with conditional item checked'])

      const $component = $('.moduk-checkboxes')

      const $firstConditional = $component.find('.moduk-checkboxes__conditional').first()
      expect($firstConditional.text().trim()).toContain('Email address')
      expect($firstConditional.hasClass('moduk-checkboxes__conditional--hidden')).toBeFalsy()
    })

    it('visible when checked with pre-checked values', () => {
      const $ = render('checkboxes', examples['with pre-checked values'])

      const $component = $('.moduk-checkboxes')

      const $firstConditional = $component.find('.moduk-checkboxes__conditional').first()
      expect($firstConditional.text().trim()).toContain('Country')
      expect($firstConditional.hasClass('moduk-checkboxes__conditional--hidden')).toBeFalsy()
    })

    it('with association to the input they are controlled by', () => {
      const $ = render('checkboxes', examples['with conditional items'])

      const $component = $('.moduk-checkboxes')

      const $lastInput = $component.find('.moduk-checkboxes__input').last()
      const $lastConditional = $component.find('.moduk-checkboxes__conditional').last()

      expect($lastInput.attr('data-aria-controls')).toBe('conditional-how-contacted-3')
      expect($lastConditional.attr('id')).toBe('conditional-how-contacted-3')
    })

    it('omits empty conditionals', () => {
      const $ = render('checkboxes', examples['empty conditional'])

      const $component = $('.moduk-checkboxes')
      expect($component.find('.moduk-checkboxes__conditional').length).toEqual(0)
    })

    it('does not associate checkboxes with empty conditionals', () => {
      const $ = render('checkboxes', examples['empty conditional'])

      const $input = $('.moduk-checkboxes__input').first()
      expect($input.attr('data-aria-controls')).toBeFalsy()
    })
  })

  describe('when they include an error message', () => {
    it('renders the error message', () => {
      const $ = render('checkboxes', examples['with error message'])

      expect(htmlWithClassName($, '.moduk-error-message')).toMatchSnapshot()
    })

    it('uses the idPrefix for the error message id if provided', () => {
      const $ = render('checkboxes', examples['with error and idPrefix'])

      const $errorMessage = $('.moduk-error-message')

      expect($errorMessage.attr('id')).toEqual('id-prefix-error')
    })

    it('falls back to using the name for the error message id', () => {
      const $ = render('checkboxes', examples['with error message'])

      const $errorMessage = $('.moduk-error-message')

      expect($errorMessage.attr('id')).toEqual('waste-error')
    })

    it('associates the fieldset as "described by" the error message', () => {
      const $ = render('checkboxes', examples['with fieldset and error message'])

      const $fieldset = $('.moduk-fieldset')
      const $errorMessage = $('.moduk-error-message')

      const errorMessageId = new RegExp(
        WORD_BOUNDARY + $errorMessage.attr('id') + WORD_BOUNDARY
      )

      expect($fieldset.attr('aria-describedby'))
        .toMatch(errorMessageId)
    })

    it('associates the fieldset as "described by" the error message and parent fieldset', () => {
      const $ = render('checkboxes', examples['with error message and fieldset describedBy'])

      const $fieldset = $('.moduk-fieldset')
      const $errorMessage = $('.moduk-error-message')

      const errorMessageId = new RegExp(
        WORD_BOUNDARY + 'some-id' + WHITESPACE + $errorMessage.attr('id') + WORD_BOUNDARY
      )

      expect($fieldset.attr('aria-describedby'))
        .toMatch(errorMessageId)
    })

    it('does not associate each input as "described by" the error message', () => {
      const $ = render('checkboxes', examples['with error message and hints on items'])

      const $inputs = $('input')

      $inputs.each((index, input) => {
        let expectedDescribedById = `waste-${(index + 1)}-item-hint`
        if (index === 0) {
          expectedDescribedById = 'waste-item-hint'
        }
        expect($(input).attr('aria-describedby')).toEqual(expectedDescribedById)
      })
    })

    it('renders with a form group wrapper that has an error state', () => {
      const $ = render('checkboxes', examples['with error message'])

      const $formGroup = $('.moduk-form-group')
      expect($formGroup.hasClass('moduk-form-group--error')).toBeTruthy()
    })
  })

  describe('when they include a hint', () => {
    it('renders the hint', () => {
      const $ = render('checkboxes', examples['multiple hints'])

      expect(htmlWithClassName($, '.moduk-hint')).toMatchSnapshot()
    })

    it('associates the fieldset as "described by" the hint', () => {
      const $ = render('checkboxes', examples['with id and name'])

      const $fieldset = $('.moduk-fieldset')
      const $hint = $('.moduk-hint')

      const hintId = new RegExp(
        WORD_BOUNDARY + $hint.attr('id') + WORD_BOUNDARY
      )

      expect($fieldset.attr('aria-describedby')).toMatch(hintId)
    })

    it('associates the fieldset as "described by" the hint and parent fieldset', () => {
      const $ = render('checkboxes', examples['with fieldset describedBy'])
      const $fieldset = $('.moduk-fieldset')
      const $hint = $('.moduk-hint')

      const hintId = new RegExp(
        WORD_BOUNDARY + 'some-id' + WHITESPACE + $hint.attr('id') + WORD_BOUNDARY
      )

      expect($fieldset.attr('aria-describedby')).toMatch(hintId)
    })
  })

  describe('when they include both a hint and an error message', () => {
    it('associates the fieldset as described by both the hint and the error message', () => {
      const $ = render('checkboxes', examples['with error message and hint'])

      const $fieldset = $('.moduk-fieldset')
      const errorMessageId = $('.moduk-error-message').attr('id')
      const hintId = $('.moduk-hint').attr('id')

      const combinedIds = new RegExp(
        WORD_BOUNDARY + hintId + WHITESPACE + errorMessageId + WORD_BOUNDARY
      )

      expect($fieldset.attr('aria-describedby'))
        .toMatch(combinedIds)
    })

    it('associates the fieldset as described by the hint, error message and parent fieldset', () => {
      const $ = render('checkboxes', examples['with error, hint and fieldset describedBy'])

      const $fieldset = $('.moduk-fieldset')
      const errorMessageId = $('.moduk-error-message').attr('id')
      const hintId = $('.moduk-hint').attr('id')

      const combinedIds = new RegExp(
        WORD_BOUNDARY + 'some-id' + WHITESPACE + hintId + WHITESPACE + errorMessageId + WORD_BOUNDARY
      )

      expect($fieldset.attr('aria-describedby'))
        .toMatch(combinedIds)
    })
  })

  describe('nested dependant components', () => {
    it('have correct nesting order', () => {
      const $ = render('checkboxes', examples['fieldset params'])

      const $component = $('.moduk-form-group > .moduk-fieldset > .moduk-checkboxes')
      expect($component.length).toBeTruthy()
    })

    it('passes through label params without breaking', () => {
      const $ = render('checkboxes', examples['label with attributes'])

      expect(htmlWithClassName($, '.moduk-checkboxes__label')).toMatchSnapshot()
    })

    it('passes through fieldset params without breaking', () => {
      const $ = render('checkboxes', examples['fieldset params'])

      expect(htmlWithClassName($, '.moduk-fieldset')).toMatchSnapshot()
    })

    it('passes through html fieldset params without breaking', () => {
      const $ = render('checkboxes', examples['fieldset html params'])

      expect(htmlWithClassName($, '.moduk-fieldset')).toMatchSnapshot()
    })
  })

  describe('single checkbox without a fieldset', () => {
    it('adds aria-describedby to input if there is an error', () => {
      const $ = render('checkboxes', examples["with single option set 'aria-describedby' on input"])
      const $input = $('input')
      expect($input.attr('aria-describedby')).toMatch('t-and-c-error')
    })

    it('adds aria-describedby to input if there is an error and parent fieldset', () => {
      const $ = render('checkboxes', examples["with single option set 'aria-describedby' on input, and describedBy"])
      const $input = $('input')

      expect($input.attr('aria-describedby'))
        .toMatch('some-id t-and-c-error')
    })
  })

  describe('single checkbox (with hint) without a fieldset', () => {
    it('adds aria-describedby to input if there is an error and a hint', () => {
      const $ = render('checkboxes', examples["with single option (and hint) set 'aria-describedby' on input"])
      const $input = $('input')
      expect($input.attr('aria-describedby')).toMatch('t-and-c-with-hint-error t-and-c-with-hint-item-hint')
    })

    it('adds aria-describedby to input if there is an error, hint and parent fieldset', () => {
      const $ = render('checkboxes', examples["with single option (and hint) set 'aria-describedby' on input, and describedBy"])
      const $input = $('input')

      expect($input.attr('aria-describedby'))
        .toMatch('some-id t-and-c-with-hint-error t-and-c-with-hint-item-hint')
    })
  })
})
