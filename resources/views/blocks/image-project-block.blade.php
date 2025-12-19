@php
  $image = $fields['image'] ?? '';
@endphp

<div class="relative">
  <div class="rounded-2xl overflow-hidden shadow-2xl">
    {!! $image ? wp_get_attachment_image($image, 'full', false, ['class' => 'w-full h-full object-cover']) : '' !!}
  </div>
  <div class="absolute -bottom-6 -left-6 bg-white p-8 rounded-xl shadow-xl max-w-xs">
    <p class="text-4xl font-bold text-green-600 mb-1">500+</p>
    <p class="text-gray-700 font-semibold mb-0">{!! __('Projects Completed', 'sage') !!}</p>
  </div>
</div>