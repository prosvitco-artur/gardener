<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('Project Gallery Block', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('block-default')
    ->add_fields([
        Field::make('media_gallery', 'images', __('Images', 'sage')),
    ])
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.project-gallery-block', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });