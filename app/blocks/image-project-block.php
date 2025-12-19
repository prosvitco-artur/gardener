<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('Image Project Block', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('block-default')
    ->add_fields([
        Field::make('image', 'image', __('Зображення', 'sage')),
    ])
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.image-project-block', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });