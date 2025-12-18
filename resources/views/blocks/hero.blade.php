@php
  $title = $fields['title'] ?? __('Transform Your Outdoor Space', 'sage');
  $description = $fields['description'] ?? __('Professional landscaping services to bring your dream garden to life', 'sage');
  $bgImageId = $fields['background_image'] ?? null;
  $bgImageUrl = $bgImageId ? wp_get_attachment_image_url($bgImageId, 'full') : 'https://images.pexels.com/photos/1453499/pexels-photo-1453499.jpeg?auto=compress&cs=tinysrgb&w=1920';
  $ctaText = $fields['cta_text'] ?? __('Get Free Consultation', 'sage');
  $ctaUrl = $fields['cta_url'] ?? '#';
@endphp

<section class="relative h-screen min-h-[600px] flex items-center justify-center gardener-hero-block">
  <div
    class="absolute inset-0 z-0 bg-cover bg-center"
    style="background-image: url('{{ esc_url($bgImageUrl) }}');"
  >
    <div class="absolute inset-0 bg-black/40"></div>
  </div>

  <div class="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
    <h1 class="text-5xl md:text-7xl font-bold mb-6 leading-tight">
      {{ esc_html($title) }}
    </h1>
    <p class="text-xl md:text-2xl mb-8 text-gray-100 leading-relaxed">
      {{ esc_html($description) }}
    </p>
    @if($ctaUrl === '#')
      <button
        class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-xl hero-cta-btn"
        data-consultation-btn
      >
        {{ esc_html($ctaText) }}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </button>
    @else
      <a
        href="{{ esc_url($ctaUrl) }}"
        class="bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 inline-flex items-center gap-2 shadow-xl"
      >
        {{ esc_html($ctaText) }}
        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
        </svg>
      </a>
    @endif
  </div>
</section>
