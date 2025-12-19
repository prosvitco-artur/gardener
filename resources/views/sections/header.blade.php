@php
  $siteName = get_bloginfo('name');
  $hasCustomLogo = has_custom_logo();
  $customLogo = $hasCustomLogo ? get_custom_logo() : '';
@endphp

<header id="gardener-header" class="fixed top-0 left-0 right-0 z-50 transition-all duration-300 bg-transparent" data-scrolled="false">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex items-center justify-between h-20">
      <a href="{{ esc_url(home_url('/')) }}" class="flex items-center gap-2 mb-0" rel="home">
        <div class="p-2 rounded-lg bg-white header-logo-icon">
          @if($hasCustomLogo && $customLogo)
            @php
              $customLogoHtml = preg_replace('/<img([^>]*)>/i', '<img$1 class="w-7 h-7" />', $customLogo);
            @endphp
            {!! $customLogoHtml !!}
          @else
            <svg class="w-7 h-7 text-green-600 header-logo-svg" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"></path>
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"></path>
            </svg>
          @endif
        </div>
        <span class="text-2xl font-bold text-white header-logo-text">
          {{ esc_html($siteName) }}
        </span>
      </a>

      <nav class="hidden md:flex items-center gap-8">
        @php
          $menuOutput = wp_nav_menu([
            'theme_location' => 'primary_navigation',
            'container' => false,
            'menu_class' => 'flex items-center gap-8',
            'fallback_cb' => [\App\View\MenuFallback::class, 'fallback'],
            'items_wrap' => '<ul class="%2$s">%3$s</ul>',
            'walker' => new \App\View\NavWalker(),
            'echo' => false,
          ]);
        @endphp
        {!! $menuOutput !!}
        <a 
          class="mb-0 bg-green-600 hover:bg-green-700 text-white px-6 py-2.5 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 header-cta-btn"
          href="#contact-us-form"
        >
          {!! __('Get Quote', 'sage') !!}
        </a>
      </nav>

      <button 
        class="md:hidden text-white header-mobile-toggle" 
        aria-label="{{ __('Toggle menu', 'sage') }}"
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
      @php
        $mobileMenuOutput = wp_nav_menu([
          'theme_location' => 'primary_navigation',
          'container' => false,
          'menu_class' => 'flex flex-col space-y-4',
          'fallback_cb' => [\App\View\MenuFallback::class, 'fallback'],
          'items_wrap' => '<ul class="%2$s">%3$s</ul>',
          'walker' => new \App\View\NavWalker(),
          'echo' => false,
        ]);
      @endphp
      {!! $mobileMenuOutput !!}
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
