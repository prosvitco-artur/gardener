<?php

namespace App;

use Carbon_Fields\Container;
use Carbon_Fields\Field;

add_action('carbon_fields_register_fields', function () {
    Container::make('theme_options', __('Theme Options', 'sage'))
        ->set_page_menu_position(2)
        ->add_tab(__('Header', 'sage'), [
            Field::make('text', 'header_cta_text', __('Текст кнопки CTA', 'sage')),
        ])
        ->add_tab(__('Footer', 'sage'), [
            Field::make('text', 'footer_description', __('Опис футера', 'sage')),
            Field::make('complex', 'footer_social_links', __('Соціальні мережі', 'sage'))
                ->add_fields([
                    Field::make('select', 'platform', __('Платформа', 'sage'))
                        ->add_options([
                            'facebook' => __('Facebook', 'sage'),
                            'instagram' => __('Instagram', 'sage'),
                            'twitter' => __('Twitter', 'sage'),
                            'linkedin' => __('LinkedIn', 'sage'),
                            'youtube' => __('YouTube', 'sage'),
                        ]),
                    Field::make('text', 'url', __('URL', 'sage'))
                        ->set_required(true)
                        ->set_attribute('placeholder', 'https://...'),
                ]),
            Field::make('text', 'footer_hours', __('Години роботи', 'sage')),
            Field::make('text', 'footer_saturday', __('Субота', 'sage')),
            Field::make('text', 'footer_sunday', __('Неділя', 'sage')),
        ])
        ->add_tab(__('Telegram', 'sage'), [
            Field::make('text', 'telegram_bot_token', __('Bot Token', 'sage'))
                ->set_help_text(__('Отримайте токен бота від @BotFather в Telegram. Бот має бути доданий в групу як адміністратор', 'sage'))
                ->set_attribute('placeholder', '123456789:ABCdefGHIjklMNOpqrsTUVwxyz'),
            Field::make('text', 'telegram_chat_id', __('Group ID', 'sage'))
                ->set_help_text(__('ID Telegram групи куди відправлятимуться повідомлення. Додайте @RawDataBot в групу та скопіюйте ID з повідомлення', 'sage'))
                ->set_attribute('placeholder', '-1001234567890'),
        ]);
});

