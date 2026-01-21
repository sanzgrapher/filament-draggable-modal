<?php

namespace Sanzgrapher\DraggableModal;

use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Illuminate\Support\ServiceProvider;

class DraggableModalServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        FilamentAsset::register([
            Js::make('draggable-modal-js', __DIR__ . '/../resources/dist/drag-modal.js'),
            Css::make('draggable-modal-css', __DIR__ . '/../resources/dist/drag-modal.css'),
        ], 'sanzgrapher/draggable-modal');
    }
}
