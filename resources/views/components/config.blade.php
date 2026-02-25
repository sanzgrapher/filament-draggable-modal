@php

    use Filament\Facades\Filament;
    use Sanzgrapher\DraggableModal\DraggableModalPlugin;

    $enableSlideoverDraggable = false;

    if (Filament::hasPlugin('draggable-modal')) {
        $plugin = Filament::getPlugin('draggable-modal');
        if ($plugin instanceof DraggableModalPlugin) {
            $enableSlideoverDraggable = $plugin->isSlideoverDraggable();
        }
    }
@endphp

<script>
    window.FilamentDraggableModalConfig = {
        enableSlideoverDraggable: @js($enableSlideoverDraggable)
    };
</script>
