@php

    use Filament\Facades\Filament;

    $enableSlideoverDraggable = false;

    if (Filament::hasPlugin('draggable-modal')) {
        $plugin = Filament::getPlugin('draggable-modal');
        if ($plugin instanceof \Sanzgrapher\DraggableModal\DraggableModalPlugin) {
            $enableSlideoverDraggable = $plugin->isSlideoverDraggable();
        }
    }
@endphp

<script>
    window.FilamentDraggableModalConfig = {
        enableSlideoverDraggable: @js($enableSlideoverDraggable)
    };
</script>
