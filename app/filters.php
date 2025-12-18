<?php

namespace App;

add_filter('excerpt_more', function () {
    return sprintf(' &hellip; <a href="%s">%s</a>', get_permalink(), __('Continued', 'sage'));
});

add_filter('script_loader_tag', function ($tag, $handle, $src) {
    if (function_exists('wp_set_script_translations') && strpos($handle, 'app') !== false) {
        wp_set_script_translations($handle, 'sage', get_template_directory() . '/resources/lang');
    }
    return $tag;
}, 10, 3);
