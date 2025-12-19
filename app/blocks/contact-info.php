<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('Contact Info', 'sage'))
    ->set_description(__('Блок Contact Info', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('block-default')
    ->add_fields([
        Field::make('text', 'title', __('Title', 'sage')),
        Field::make('text', 'phone', __('Phone', 'sage')),
        Field::make('text', 'email', __('Email', 'sage')),
        Field::make('text', 'address', __('Address', 'sage')),
        Field::make('image', 'image', __('Image', 'sage')),
    ])
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.contact-info', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });