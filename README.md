> # Archived
> 
> Please use [Johann Schopplich's plugin](https://github.com/johannschopplich/kirby-writer-marks)

# Kirby oh-hi-mark plugin

Enables the inclusion of custom Writer field marks. It's an alternative to [Johann Schopplich's plugin](https://github.com/johannschopplich/kirby-writer-marks) that doesn't require to patch Kirby's panel dist files.

## Installation

### Download

Download and copy this repository to `/site/plugins/oh-hi-mark`.

### Git submodule

```
git submodule add https://github.com/rasteiner/oh-hi-mark.git site/plugins/oh-hi-mark
```

### Composer

```
composer require rasteiner/oh-hi-mark
```

## Setup

This plugin alone does nothing. It serves only to provide you the ability to use custom Writer field marks in your own plugins.

### Example plugin
Stolen from Johann Schopplich's "footnote" example:

**index.php**
```php
<?php

use Kirby\Cms\App as Kirby;
use Kirby\Sane\Html;

/*
 * Add `article-footnote` to Kirby's Sane class allowed tags,
 * otherwise the writer field content parsed by the sanitizer would
 * strip `article-footnote` tags (Applies to Kirby 3.6+ only).
 */
Html::$allowedTags['article-footnote'] = true;

Kirby::plugin('rasteiner/footnote-mark', []);
```

**index.js**
```js
panel.plugin('rasteiner/footnote-mark', {
  thirdParty: {
    marks: {
      // if you want this plugin to play nice with other marks plugins,
      // you should keep them with the following line:
      ...panel.plugins.thirdParty.marks || {},

      footnote: {
        get button() {
          return {
            icon: 'quote',
            label: 'Footnote'
          }
        },

        commands() {
          return () => this.toggle();
        },

        get name() {
          return "footnote";
        },

        get schema() {
          return {
            parseDOM: [{ tag: "article-footnote" }],
            toDOM: (node) => [
              "article-footnote",
              {
                ...node.attrs,
              },
              0,
            ],
          };
        }
      }

    }
  }
})
```

**index.css**:
```css
.k-blocks {
  counter-reset: footnotes;
}

.k-writer .ProseMirror article-footnote {
  color: currentColor;
  counter-increment: footnotes;
  text-decoration: underline dotted;
}

.k-writer .ProseMirror article-footnote::after {
  content: "[" counter(footnotes) "]";
  color: #999;
  text-decoration: underline dotted white;
}
```

## License

MIT

## Credits

- [Roman Steiner](https://getkirby.com/plugins/rasteiner), author
- [Johann Schopplich](https://github.com/johannschopplich/kirby-writer-marks), sparked the idea & wrote the original plugin and example
