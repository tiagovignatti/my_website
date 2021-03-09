# my website

## Development

```bash
snap install hugo --channel=extended
# or snap refresh hugo --channel=extended

hugo server
```

## Publishing new content

```bash

# manually create content files
hugo new content/posts/some-interesting-shortname.md

# publishing to GitHub Pages
./publish_to_ghpages.sh
```

## Self Notes

- image processing for performance reasons: https://github.com/spech66/hugo-best-practices#images
