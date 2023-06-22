# my website

## Downloading

After cloning this repo, make sure to clone submodule dependencies also:
```bash
git submodule update --init --recursive

```


## Installing

macOS
```bash
brew install hugo
```

Linux
```bash
snap install hugo --channel=extended
# or snap refresh hugo --channel=extended
```

## Running
```bash
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
