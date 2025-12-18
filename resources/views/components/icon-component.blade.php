@props([
    'name' => '',
    'class' => ''
])

@php
$classes = 'icon icon-' . $name;
if ($class) {
    $classes .= ' ' . $class;
}
$viewBox = \App\get_svg_viewbox($name);
@endphp

<svg class="{{ $classes }}" aria-hidden="true" focusable="false" viewBox="{{ $viewBox }}">
    <use href="#icon-{{ $name }}" fill="currentColor"></use>
</svg>

