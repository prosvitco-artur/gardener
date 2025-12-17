<?php

namespace App;

use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', function () {
    Container::make('theme_options', __('Theme Options', 'sage'))
        ->set_page_menu_position(2)
        ->add_tab(__('Header', 'sage'), [
            Field::make('text', 'header_logo_text', __('Текст логотипу', 'sage'))
                ->set_default_value('GreenScape Pro'),
            Field::make('image', 'header_logo_image', __('Зображення логотипу', 'sage')),
            Field::make('complex', 'header_menu_items', __('Пункти меню', 'sage'))
                ->add_fields([
                    Field::make('text', 'label', __('Назва', 'sage')),
                    Field::make('text', 'url', __('URL', 'sage')),
                ])
                ->set_default_value([
                    ['label' => 'Services', 'url' => '#services'],
                    ['label' => 'About', 'url' => '#about'],
                    ['label' => 'Gallery', 'url' => '#gallery'],
                    ['label' => 'Contact', 'url' => '#contact'],
                ]),
            Field::make('text', 'header_cta_text', __('Текст кнопки CTA', 'sage'))
                ->set_default_value('Get Quote'),
        ]);
});

