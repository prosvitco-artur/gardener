@php
  $logoText = carbon_get_theme_option('header_logo_text') ?: 'GreenScape Pro';
  $logoImageId = carbon_get_theme_option('header_logo_image');
  $logoImage = $logoImageId ? wp_get_attachment_url($logoImageId) : '';
  $menuItems = carbon_get_theme_option('header_menu_items') ?: [];
  $ctaText = carbon_get_theme_option('header_cta_text') ?: 'Get Quote';
@endphp

<header id="gardener-header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent" data-scrolled="false">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between h-20">
      <div class="flex items-center gap-2">
        <div class="p-2 rounded-lg bg-white header-logo-icon">
          @if($logoImage)
            <img src="{{ esc_url($logoImage) }}" alt="{{ esc_attr($logoText) }}" class="w-7 h-7" />
          @else
            <svg class="w-7 h-7 text-green-600 header-logo-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
          @endif
        </div>
        <span class="text-2xl font-bold text-white header-logo-text">
          {{ esc_html($logoText) }}
        </span>
      </div>

      <nav class="hidden md:flex items-center gap-8">
        @foreach($menuItems as $item)
          <a 
            href="{{ esc_url($item['url']) }}" 
            class="font-semibold transition-colors text-white hover:text-green-300 header-menu-link"
            @if(str_starts_with($item['url'], '#'))
              data-smooth-scroll="{{ esc_attr($item['url']) }}"
            @endif
          >
            {{ esc_html($item['label']) }}
          </a>
        @endforeach
        <button 
          class="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 header-cta-btn"
          data-consultation-btn
        >
          {{ esc_html($ctaText) }}
        </button>
      </nav>

      <button 
        class="md:hidden text-white header-mobile-toggle" 
        aria-label="Toggle menu"
        data-mobile-toggle
      >
        <svg class="w-7 h-7 header-menu-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
        </svg>
        <svg class="w-7 h-7 header-close-icon hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
        </svg>
      </button>
    </div>
  </div>

  <div class="md:hidden bg-white border-t hidden header-mobile-menu" data-mobile-menu>
    <nav class="flex flex-col p-4 space-y-4">
      @foreach($menuItems as $item)
        <a 
          href="{{ esc_url($item['url']) }}" 
          class="text-gray-700 font-semibold hover:text-green-600 header-mobile-link"
          @if(str_starts_with($item['url'], '#'))
            data-smooth-scroll="{{ esc_attr($item['url']) }}"
          @endif
        >
          {{ esc_html($item['label']) }}
        </a>
      @endforeach
      <button 
        class="bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold header-mobile-cta"
        data-consultation-btn
      >
        {{ esc_html($ctaText) }}
      </button>
    </nav>
  </div>
</header>

@vite('resources/js/header.js')
