# Core

Core contains all the building blocks (page layout and the responsive grid) and fundamental styles (such as colours and typography) needed for NHS websites and services. These styles are required for all of the components to work.

Core also is the home of powerful `sass` features such as variables, mixins, functions and maps.

## Page layout

### Fixed-width container

```html
<div class="moduk-width-container">
  <main class="moduk-main-wrapper" id="maincontent">
    <!-- Grid items -->
  </main>
</div>
```

### Fluid-width container

```html
<div class="moduk-width-container-fluid">
  <main class="moduk-main-wrapper" id="maincontent">
    <!-- Grid items -->
  </main>
</div>
```

## Grid items

### Full width

```html
<div class="moduk-grid-row">
  <div class="moduk-grid-column-full">
    <!-- Component -->
  </div>
</div>
```

### Three-quarters

```html
<div class="moduk-grid-row">
  <div class="moduk-grid-column-three-quarters">
    <!-- Component -->
  </div>
</div>
```

### One-half

```html
<div class="moduk-grid-row">
  <div class="moduk-grid-column-one-half">
    <!-- Component -->
  </div>
</div>
```

### Two-thirds

```html
<div class="moduk-grid-row">
  <div class="moduk-grid-column-two-thirds">
    <!-- Component -->
  </div>
</div>
```

### One-third

```html
<div class="moduk-grid-row">
  <div class="moduk-grid-column-one-third">
    <!-- Component -->
  </div>
</div>
```

### One-quarter

```html
<div class="moduk-grid-row">
  <div class="moduk-grid-column-one-quarter">
    <!-- Component -->
  </div>
</div>
```

### Nested grid items

```html
<div class="moduk-grid-row">
  <div class="moduk-grid-column-two-thirds">
    <!-- Component -->
    <div class="moduk-grid-row">
      <div class="moduk-grid-column-one-half">
        <!-- Component -->
      </div>
      <div class="moduk-grid-column-one-half">
        <!-- Component -->
      </div>
    </div>

  </div>
</div>
```

### Example page layout

```html
<!-- Header -->
<div class="moduk-width-container">
  <main class="moduk-main-wrapper" id="maincontent">
    <div class="moduk-grid-row">
      <div class="moduk-grid-column-three-quarters">
        <!-- Components -->
      </div>
    </div>
  </main>
</div>
<!-- Footer -->
```

## Utilities

### Clearfix

Automatically clear an elements child elements.

```html
<div class="moduk-u-clear"></div>
```

### Bold font weight

```html
<p class="moduk-u-font-weight-bold"></p>
```

### Grid overrides

By default all grid elements will go to 100% width on screen sizes below tablet. These utilities can force
custom widths on all screen sizes.

```
moduk-u-[grid-size]
```

```html
<div class="moduk-grid-column-one-half moduk-u-one-half"></div>
```

### Normal font weight

```html
<p class="moduk-u-font-weight-normal"></p>
```

### Secondary text colour

```html
<p class="moduk-u-secondary-text-color"></p>
```

### Reading width

Add a maximum width to large pieces of content, to improve readability. 

```html
<div class="moduk-u-reading-width">
  <!-- Component -->
</div
```

### Remove top and bottom margins

```html
<h1 class="moduk-u-top-and-bottom"></h1>
```

### Spacing overrides

```html
class="moduk-u-margin-[direction]-[spacing]"
```

#### Remove bottom margin

```html
<h1 class="moduk-u-margin-bottom-0"></h1>
```

#### Remove all margins

```html
<h1 class="moduk-u-margin-0"></h1>
```

#### Custom margins

```html
<h1 class="moduk-u-margin-top-1"></h1>
```

### Prevent text wrapping

Prevent long anchor links from line breaking on smaller screens.

```html
<a class="moduk-u-nowrap"></a>
```

### Visually hidden

Hide elements visually but keep it in the DOM, useful for screen readers.

```html
<span class="moduk-u-visually-hidden"></span>
```

## Typography

### Lede text

```html
<h1>Live Well</h1>
<p class="moduk-lede-text">Advice, tips and tools to help you make the best choices about your health and wellbeing.</p>
```

### Font

The default `font-family` is a system font stack and is defined using the `$moduk-font` variable.

## Breakpoints

```
mobile: 320px
tablet: 641px
desktop: 769px
large-desktop: 990px
```

### Media queries (using [sass-mq](https://github.com/sass-mq/sass-mq))

`mq()` is a Sass mixin that helps you compose media queries in an elegant way.

`mq()` takes up to three optional parameters:

- `$from`: inclusive `min-width` boundary
- `$until`: exclusive `max-width` boundary
- `$and`: additional custom directives

```scss
.responsive {
  // Apply styling to mobile and upwards
  @include mq($from: mobile) {
    color: red;
  }
  // Apply styling up to devices smaller than tablets (exclude tablets)
  @include mq($until: tablet) {
    color: blue;
  }
  // Same thing, in landscape orientation
  @include mq($until: tablet, $and: '(orientation: landscape)') {
    color: green;
  }
  // Apply styling to print media
  @include mq($media-type: print) {
    color: orange;
  }
}
```

## Colour variables

### Primary

```scss
$color_moduk-maroon: #005eb8;
$color_moduk-white: #ffffff;
$color_moduk-black: #212b32;
$color_moduk-green: #007f3b;
$color_moduk-red: #da291c;
$color_moduk-yellow: #ffeb3b;
$color_moduk-purple: #330072;
```

### Secondary

```scss
$color_moduk-pale-yellow: #fff9c4;
$color_moduk-warm-yellow: #ffb81C;
$color_moduk-aqua-green: #00A499;
```

### Greyscale

```scss
$color_moduk-grey-1: #425563;
$color_moduk-grey-2: #768692;
$color_moduk-grey-3: #aeb7bd;
$color_moduk-grey-4: #d8dde0;
$color_moduk-grey-5: #f0f4f5;
```
