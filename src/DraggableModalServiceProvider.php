<?php

namespace Sanzgrapher\DraggableModal;

use Filament\Facades\Filament;
use Filament\Support\Assets\Css;
use Filament\Support\Assets\Js;
use Filament\Support\Facades\FilamentAsset;
use Filament\Support\Facades\FilamentView;
use Illuminate\Support\Facades\Blade;
use Illuminate\Support\ServiceProvider;

class DraggableModalServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        // 
    }

    public function boot(): void
    {
        $this->registerAssets();
        $this->registerViews();
    }

    private function registerAssets(): void
    {
        FilamentAsset::register([
            Js::make('draggable-modal-js', __DIR__ . '/../resources/dist/drag-modal.js'),
            Css::make('draggable-modal-css', __DIR__ . '/../resources/dist/drag-modal.css'),
        ], 'sanzgrapher/draggable-modal');
    }
    private function registerViews(): void
    {
        $this->loadViewsFrom(__DIR__.'/../resources/views', 'filament-draggable-modal');
        FilamentView::registerRenderHook(
            'panels::body.end',
            fn (): string => Filament::hasPlugin('draggable-modal') ? Blade::render('<x-filament-draggable-modal::config />') : ''
        );
    }
}
