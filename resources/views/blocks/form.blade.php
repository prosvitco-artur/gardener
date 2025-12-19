@php
  $translations = [
    'name' => __('Name', 'sage'),
    'email' => __('Email', 'sage'),
    'phone' => __('Phone', 'sage'),
    'service' => __('Service', 'sage'),
    'message' => __('Message', 'sage'),
    'enterName' => __('Enter your name', 'sage'),
    'enterEmail' => __('Enter your email', 'sage'),
    'enterPhone' => __('Enter your phone', 'sage'),
    'selectService' => __('Select service', 'sage'),
    'describeRequest' => __('Describe your request', 'sage'),
    'landscapeDesign' => __('Landscape design', 'sage'),
    'gardenMaintenance' => __('Garden maintenance', 'sage'),
    'irrigation' => __('Irrigation', 'sage'),
    'consultation' => __('Consultation', 'sage'),
    'send' => __('Send', 'sage'),
    'messageSent' => __('Message sent!', 'sage'),
  ];
@endphp


<div 
  id="gardener-contact-block" 
  data-translations="{{ json_encode($translations) }}"
></div>