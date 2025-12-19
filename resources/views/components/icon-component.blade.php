@props([
    'name' => '',
    'class' => ''
])

@php
$classes = 'icon icon-' . $name;
if ($class) {
    $classes .= ' ' . $class;
}

$url = get_template_directory_uri() . "/resources/images/icons/icons.svg#icon-$name";
@endphp

<svg class='{{ $classes }}'>
    <use xlink:href='{{ $url }}'></use>
</svg>

