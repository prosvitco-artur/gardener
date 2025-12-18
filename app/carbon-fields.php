<?php

namespace App;

use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', function () {
    Container::make('theme_options', __('Theme Options', 'sage'))
        ->set_page_menu_position(2)
        ->add_tab(__('Header', 'sage'), [
            Field::make('text', 'header_cta_text', __('Текст кнопки CTA', 'sage'))
                ->set_default_value(__('Get Quote', 'sage')),
        ]);
});

