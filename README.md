# Filament Draggable Modal Plugin

A Filament v5 plugin to make all modals draggable.

## Installation

1. Add this package to your Laravel app (as a local path repo for development):

```
"repositories": [
  { "type": "path", "url": "../dragmodalplugin" }
]
```

Then:

```
composer require sanzgrapher/filament-draggable-modal:*
```

2. Publish Filament assets:

```
php artisan filament:assets
```

## Usage

- The plugin will register its assets and make all Filament modals draggable automatically.
- If you want to load the assets only on demand, use Filament's x-load-js/x-load-css in a render hook or Blade view.

## Development

- JS and CSS are in `resources/dist/`.
- For advanced builds, set up a build pipeline (esbuild, postcss, etc.) and output to `resources/dist/`.

## Credits

- Inspired by Filament v5 plugin docs and modal customization best practices.
