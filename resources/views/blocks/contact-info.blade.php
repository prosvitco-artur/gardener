@php
  $title = $fields['title'] ?? '';
  $phone = $fields['phone'] ?? '';
  $phoneNumber = preg_replace('/[^0-9]/', '', $phone);
  $email = $fields['email'] ?? '';
  $address = $fields['address'] ?? '';
  $image = $fields['image'] ?? '';
@endphp

<div>
  <h3 class="text-gray-900">
    {{ $title }}
  </h3>

  <div class="space-y-6 mb-8">
    <div class="flex items-start gap-4">
      <div class="bg-green-600 p-3 rounded-lg flex-shrink-0">
        <x-icon-component name="phone" class="text-white" />
      </div>
      <div>
        <h4 class="text-gray-900">Phone</h4>
        <a class="text-gray-600" href="tel:{{ $phoneNumber }}">{{ $phone }}</a>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <div class="bg-green-600 p-3 rounded-lg flex-shrink-0">
        <x-icon-component name="email" class="text-white" />
      </div>
      <div>
        <h4 class="text-gray-900">Email</h4>
        <a class="text-gray-600" href="mailto:{{ $email }}">{{ $email }}</a>
      </div>
    </div>

    <div class="flex items-start gap-4">
      <div class="bg-green-600 p-3 rounded-lg flex-shrink-0">
        <x-icon-component name="map-pin" class="text-white" />
      </div>
      <div>
        <h4 class="text-gray-900">Location</h4>
        <p class="text-gray-600">{{ $address }}</p>
      </div>
    </div>
  </div>

  <div class="rounded-2xl overflow-hidden shadow-lg h-64">
    {!! $image ? wp_get_attachment_image($image, 'full', false, ['class' => 'w-full h-full object-cover']) : '' !!}
  </div>
</div>