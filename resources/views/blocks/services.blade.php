<section class="py-20 bg-white">
      <div class="max-w-7xl mx-auto px-4">
        <div class="text-center mb-16">
          <h2>{{ esc_html($fields['title'] ?? '') }}</h2>
          <p class="text-xl text-gray-600 max-w-2xl mx-auto">
            {{ esc_html($fields['description'] ?? '') }}
          </p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          @foreach($fields['services'] as $service)
            @php
              $image = $service['image'] ? wp_get_attachment_image($service['image'], 'full', false, ['class' => 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500']) : '';
            @endphp
            <div
              class="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div class="relative h-64 overflow-hidden">
                @if($image)
                  {!! $image !!}
                @else
                  <div class="w-full h-full bg-gray-200"></div>
                @endif
                <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div class="absolute bottom-4 left-4 bg-green-600 p-3 rounded-lg">
                  <x-icon-component name="{{ $service['icon'] ?? 'palette' }}" class="w-7 h-7 text-white" />
                </div>
              </div>
              <div class="p-6">
                <h3 class="text-2xl font-bold text-gray-900 mb-3">
                  {{ esc_html($service['title'] ?? '') }}
                </h3>
                <p class="text-gray-600 leading-relaxed">
                  {{ esc_html($service['description'] ?? '') }}
                </p>
              </div>
            </div>
          @endforeach
        </div>
      </div>
    </section>