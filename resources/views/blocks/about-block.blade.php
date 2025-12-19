@php
  $items = $fields['items'] ?? '';
@endphp

<div class="grid sm:grid-cols-2 gap-6">
  @foreach($items as $item)
    <div key={index} class="flex gap-4">
      <div class="flex-shrink-0">
        <div class="bg-green-600 p-3 rounded-lg">
          <x-icon-component name="{{ $item['icon'] }}" class="text-white" />
        </div>
      </div>
      <div>
        <h3>
          {{ $item['title'] }}
        </h3>
        <p class="text-gray-600 text-sm leading-relaxed">
          {{ $item['description'] }}
        </p>
      </div>
    </div>
  @endforeach
</div>