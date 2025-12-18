<?php

namespace App\View;

class MenuFallback
{
    public static function fallback($args)
    {
        $menu_class = isset($args['menu_class']) ? $args['menu_class'] : '';
        $items_wrap = isset($args['items_wrap']) ? $args['items_wrap'] : '<ul id="%1$s" class="%2$s">%3$s</ul>';
        
        $isMobile = str_contains($menu_class, 'space-y-4');
        $isFooter = str_contains($menu_class, 'text-gray-400');
        $linkClass = $isFooter
            ? 'hover:text-green-400 transition-colors'
            : ($isMobile 
                ? 'font-semibold transition-colors text-gray-700 hover:text-green-600 header-mobile-link'
                : 'font-semibold transition-colors text-white hover:text-green-300 header-menu-link');

        $output = sprintf($items_wrap, '', $menu_class ? ' class="' . esc_attr($menu_class) . '"' : '', '');

        if (current_user_can('edit_theme_options')) {
            $output .= '<li class="menu-item menu-item-type-custom">';
            $output .= '<a href="' . esc_url(admin_url('nav-menus.php')) . '" class="' . esc_attr($linkClass) . '">';
            $output .= esc_html__('Add Menu', 'sage');
            $output .= '</a>';
            $output .= '</li>';
        }

        $output .= '</ul>';

        return $output;
    }
}
