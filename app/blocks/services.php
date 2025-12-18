<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('Services Block', 'sage'))
    ->set_description(__('Секція з послугами', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('grid-view')
    ->add_fields([
        Field::make('text', 'title', __('Заголовок секції', 'sage')),
        Field::make('textarea', 'description', __('Опис секції', 'sage')),
        Field::make('complex', 'services', __('Послуги', 'sage'))
            ->add_fields([
                Field::make('text', 'title', __('Назва послуги', 'sage')),
                Field::make('textarea', 'description', __('Опис послуги', 'sage')),
                Field::make('image', 'image', __('Зображення', 'sage')),
                Field::make('select', 'icon', __('Іконка', 'sage'))
                    ->add_options([
                        'palette' => 'Palette',
                        'scissors' => 'Scissors',
                        'droplets' => 'Droplets',
                    ]),
            ])
            ->set_layout('tabbed-horizontal')
            ->set_header_template('<%- title %>'),
    ])
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.services', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });
