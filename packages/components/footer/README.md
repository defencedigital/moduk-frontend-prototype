# Footer

## Guidance

Find out more about the footer component and when to use it in the [Defence Service Manual](#0).

## Quick start examples

### Footer

[Preview the footer component](https://defencedigital.github.io/moduk-frontend/components/footer/index.html)

#### HTML markup

```html
<footer role="contentinfo">
  <div class="moduk-footer" id="moduk-footer">
    <div class="moduk-width-container">
      <h2 class="moduk-u-visually-hidden">Support links</h2>
      <ul class="moduk-footer__list">
        <li class="moduk-footer__list-item"><a class="moduk-footer__list-item-link" href="#">Accessibility statement</a></li>
        <li class="moduk-footer__list-item"><a class="moduk-footer__list-item-link" href="#">Contact us</a></li>
        <li class="moduk-footer__list-item"><a class="moduk-footer__list-item-link" href="#">Cookies</a></li>
        <li class="moduk-footer__list-item"><a class="moduk-footer__list-item-link" href="#">Privacy policy</a></li>
        <li class="moduk-footer__list-item"><a class="moduk-footer__list-item-link" href="#">Terms and conditions</a></li>
      </ul>
      <p class="moduk-footer__copyright">&copy; Crown copyright</p>
    </div>
  </div>
</footer>
```

#### Nunjucks macro

```
{% from 'components/footer/macro.njk' import footer %}

{{ footer({
  "links": [
    {
      "URL": "#",
      "label": "Accessibility statement"
    },
    {
      "URL": "#",
      "label": "Contact us"
    },
    {
      "URL": "#",
      "label": "Cookies"
    },
    {
      "URL": "#",
      "label": "Privacy policy"
    },
    {
      "URL": "#",
      "label": "Terms and conditions"
    }
  ]
})}}
```
### Nunjucks arguments

The footer Nunjucks macro takes the following arguments:

| Name                         | Type     | Required  | Description  |
| -----------------------------|----------|-----------|--------------|
| **links**             | array    | No        | Array of primary navigation items for use in the footer. |
| **links.[].url**      | string   | No        | The href of a primary navigation item in the footer. |
| **links.[].label**    | string   | No        | The label of a primary navigation item in the footer. |
| **classes**           | string   | No        | Optional additional classes to add to the footer container. Separate each class with a space. |
| **attributes**        | object   | No        | Any extra HTML attributes (for example data attributes) to add to the footer container. |
| **copyright**        | string   | No        | The label for the copyright notice in the footer. |

If you are using Nunjucks macros in production be aware that using `html` arguments, or ones ending with `html` can be a [security risk](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting). Read more about this in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning).
