<?php

namespace Sanzgrapher\DraggableModal;

use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Spatie\LaravelPackageTools\Package;
use Spatie\LaravelPackageTools\PackageServiceProvider;

class DraggableModalServiceProvider extends PackageServiceProvider
{
    public static string $name = 'draggable-modal';

    public function configurePackage(Package $package): void
    {
        $package->name(static::$name);
    }

    public function packageBooted(): void
    {
        FilamentAsset::register([
            Js::make('draggable-modal', __DIR__ . '/../resources/dist/draggable-modal.js'),
            Css::make('draggable-modal', __DIR__ . '/../resources/dist/draggable-modal.css'),
        ], 'sanzgrapher/draggable-modal');
    }
}
