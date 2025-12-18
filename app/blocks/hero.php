<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('Hero Block', 'sage'))
    ->set_description(__('Hero секція з заголовком та CTA кнопкою', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('cover-image')
    ->add_fields([
        Field::make('text', 'title', __('Заголовок', 'sage')),
        Field::make('textarea', 'description', __('Опис', 'sage')),
        Field::make('image', 'background_image', __('Фонове зображення', 'sage')),
        Field::make('text', 'cta_text', __('Текст кнопки', 'sage')),
        Field::make('text', 'cta_url', __('URL кнопки', 'sage')),
    ])
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.hero', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });
