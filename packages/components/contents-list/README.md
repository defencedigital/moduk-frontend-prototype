# Contents list

## Guidance

Find out more about the contents list component and when to use it in the [Defence Service Manual](#0).

## Quick start example

[Preview the contents list component](https://defencedigital.github.io/moduk-frontend/components/contents-list/index.html)

### HTML markup

```html
<nav class="moduk-contents-list" role="navigation" aria-label="Pages in this guide">
  <h2 class="moduk-u-visually-hidden">Contents</h2>
  <ol class="moduk-contents-list__list">
    <li class="moduk-contents-list__item" aria-current="page">
      <span class="moduk-contents-list__current">Defence users are diverse</span>
    </li>
    <li class="moduk-contents-list__item">
      <a class="moduk-contents-list__link" href="#0">User research and military rank</a>
    </li>
    <li class="moduk-contents-list__item">
      <a class="moduk-contents-list__link" href="#0">Help with acronyms</a>
    </li>
  </ol>
</nav>
```

### Nunjucks macro

```
{% from 'components/contents-list/macro.njk' import contentsList %}

{{ contentsList({
  items: [
    {
      href: "#0",
      text: "Defence users are diverse",
      current: "true"
    }
    ,
    {
      href: "#0",
      text: "User research and military rank"
    }
    ,
    {
      href: "#0",
      text: "Help with acronyms"
    }
  ]
}) }}
```

### Nunjucks arguments

The contents list Nunjucks macro takes the following arguments:

| Name                    | Type     | Required  | Description  |
| ------------------------|----------|-----------|--------------|
| **items**               | array    | Yes       | Array of items in the contents list. |
| **items.[].href**       | string   | Yes       | Href value of an item in the contents list. |
| **items.[].text**       | string   | Yes       | Text value of an item in the contents llst. |
| **current**             | boolean  | No        | Current active page in the contents list. |
| **classes**             | string   | No        | Optional additional classes content list container. Separate each class with a space. |
| **attributes**          | object   | No        | Any extra HTML attributes (for example data attributes) to items in the list. |

If you are using Nunjucks macros in production be aware that using `html` arguments, or ones ending with `html` can be a [security risk](https://developer.mozilla.org/en-US/docs/Glossary/Cross-site_scripting). Read more about this in the [Nunjucks documentation](https://mozilla.github.io/nunjucks/api.html#user-defined-templates-warning).
