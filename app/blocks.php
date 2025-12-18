<?php

namespace App;

add_action('carbon_fields_register_fields', function () {
    $blocks_dir = get_template_directory() . '/app/blocks/';
    
    if (!is_dir($blocks_dir)) {
        return;
    }
    
    $block_files = glob($blocks_dir . '*.php');
    
    foreach ($block_files as $file) {
        require_once $file;
    }
});

