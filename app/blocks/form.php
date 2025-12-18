<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('Form Block', 'sage'))
    ->set_description(__('Блок з формою зворотного зв\'язку', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('email-alt')
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.form', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });
