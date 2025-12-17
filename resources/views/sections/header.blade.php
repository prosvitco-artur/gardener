@php
  $logoText = carbon_get_theme_option('header_logo_text') ?: 'GreenScape Pro';
  $logoImageId = carbon_get_theme_option('header_logo_image');
  $logoImage = $logoImageId ? wp_get_attachment_url($logoImageId) : '';
  $menuItems = carbon_get_theme_option('header_menu_items') ?: [];
  $ctaText = carbon_get_theme_option('header_cta_text') ?: 'Get Quote';
@endphp
<div 
  id="gardener-header" 
  class="gardener-header"
  data-logo-text="{{ esc_attr($logoText) }}"
  data-logo-image="{{ esc_attr($logoImage) }}"
  data-menu-items="{{ esc_attr(json_encode($menuItems)) }}"
  data-cta-text="{{ esc_attr($ctaText) }}"
></div>
