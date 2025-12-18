<?php

namespace App;

use Carbon_Fields\Block;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', function () {
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
                ]),
        ])
        ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
            $block_id = 'services-block-' . uniqid();
            $services = [];
            if (is_array($fields['services'])) {
                foreach ($fields['services'] as $service) {
                    $services[] = [
                        'title' => $service['title'] ?? '',
                        'description' => $service['description'] ?? '',
                        'image' => !empty($service['image']) ? wp_get_attachment_url($service['image']) : '',
                        'icon' => $service['icon'] ?? 'palette',
                    ];
                }
            }
            ?>
            <div 
                id="<?php echo esc_attr($block_id); ?>" 
                class="gardener-services-block"
                data-title="<?php echo esc_attr($fields['title']); ?>"
                data-description="<?php echo esc_attr($fields['description']); ?>"
                data-services="<?php echo esc_attr(json_encode($services)); ?>"
            ></div>
            <?php
        });
});

