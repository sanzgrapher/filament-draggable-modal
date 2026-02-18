# Filament Draggable Modal

![Filament Draggable Modal Feature](filament-draggable-modal-feature.jpg)

[![Latest Version on Packagist](https://img.shields.io/packagist/v/sanzgrapher/filament-draggable-modal.svg?style=flat-square)](https://packagist.org/packages/sanzgrapher/filament-draggable-modal)
[![Total Downloads](https://img.shields.io/packagist/dt/sanzgrapher/filament-draggable-modal.svg?style=flat-square)](https://packagist.org/packages/sanzgrapher/filament-draggable-modal)

A simple yet powerful Filament v5 plugin to make all your modals draggable. Improve your users' flow by allowing them to move modals out of the way to see the content underneath.

## Features

- **Zero Configuration**: Just register the plugin and it works.
- **Filament v5 Ready**: Designed specifically for the latest Filament version.
- **Smooth Dragging**: Uses fixed positioning and handles CSS transforms to prevent jumping.
- **Smart Handle Detection**: Draggable by the modal header, but buttons and inputs remain clickable.
- **Slideover Support**: Optional draggable functionality for slideover modals (disabled by default).

## Installation

You can install the package via composer:

```bash
composer require sanzgrapher/filament-draggable-modal
```

## Usage

Register the plugin in your Panel Provider (usually `AdminPanelProvider.php`):

```php
use Sanzgrapher\DraggableModal\DraggableModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        // ... other configuration
        ->plugin(DraggableModalPlugin::make());
}
```

That's it! All your regular modals are now draggable.

### Slideover Modals

By default, **slideover modals are NOT draggable** to preserve their native behavior. If you want to make slideover modals draggable as well, you can enable this feature:

```php
use Sanzgrapher\DraggableModal\DraggableModalPlugin;

public function panel(Panel $panel): Panel
{
    return $panel
        // ... other configuration
        ->plugin(
            DraggableModalPlugin::make()
                ->slideoverDraggable(false) 
        );
}
```

**Important:** When slideoverDraggable is disabled (default), slideouts will maintain their original Filament appearance and behavior without any modifications.

## Troubleshooting

If the modals are not draggable after installation, ensure you have published the assets:

```bash
php artisan filament:assets
```

## Security

If you discover any security-related issues, please email narayandhakal443@gmail.com instead of using the issue tracker.

## Credits

- [Sanzgrapher](https://github.com/sanzgrapher)
- [All Contributors](../../contributors)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
