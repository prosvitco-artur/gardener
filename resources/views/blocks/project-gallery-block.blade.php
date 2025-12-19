@php
  $images = $fields['images'] ?? '';
@endphp

<div class="grid grid-cols-2 md:grid-cols-3 gap-4">
  @foreach($images as $image)
  <div class="relative h-64 rounded-xl overflow-hidden group cursor-pointer">
    {!! $image ? wp_get_attachment_image($image, 'full', false, ['class' => 'w-full h-full object-cover group-hover:scale-110 transition-transform duration-500']) : '' !!}
    <div class="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300"></div>
  </div>
  @endforeach
</div>