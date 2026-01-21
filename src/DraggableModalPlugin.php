<?php

namespace Sanzgrapher\DraggableModal;

use Filament\Contracts\Plugin;
use Filament\Panel;

class DraggableModalPlugin implements Plugin
{
    public function getId(): string
    {
        return 'draggable-modal';
    }

    public static function make(): static
    {
        return app(static::class);
    }

    public function register(Panel $panel): void
    {
        //
    }

    public function boot(Panel $panel): void
    {
        //
    }
}
