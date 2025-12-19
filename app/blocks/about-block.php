<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('About Block', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('block-default')
    ->add_fields([
        Field::make('complex', 'items', __('Items', 'sage'))
            ->add_fields([
                Field::make('text', 'title', __('Title', 'sage')),
                Field::make('text', 'description', __('Description', 'sage')),
                Field::make('text', 'icon', __('Icon', 'sage')),
            ])
            ->set_layout('tabbed-horizontal')
            ->set_header_template('<%- title %>'),
    ])
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.about-block', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });