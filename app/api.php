<?php

namespace App;

add_action('rest_api_init', function () {
    register_rest_route('gardener/v1', '/contact', [
        'methods' => 'POST',
        'callback' => function (\WP_REST_Request $request) {
            $data = $request->get_json_params();
            
            if (empty($data['name']) || empty($data['phone'])) {
                return new \WP_Error(
                    'missing_fields',
                    __('Required fields are missing', 'sage'),
                    ['status' => 400]
                );
            }

            $phoneDigits = preg_replace('/\D/', '', $data['phone']);
            $isValidPhone = false;
            
            if (preg_match('/^380\d{9}$/', $phoneDigits)) {
                $isValidPhone = true;
            } elseif (preg_match('/^0\d{9}$/', $phoneDigits)) {
                $isValidPhone = true;
            } elseif (preg_match('/^\d{9}$/', $phoneDigits)) {
                $isValidPhone = true;
            }
            
            if (!$isValidPhone) {
                return new \WP_Error(
                    'invalid_phone',
                    __('Invalid phone number format', 'sage'),
                    ['status' => 400]
                );
            }

            $telegram = new Telegram();
            $message = $telegram->formatContactMessage([
                'name' => sanitize_text_field($data['name'] ?? ''),
                'phone' => sanitize_text_field($data['phone'] ?? ''),
                'service' => sanitize_text_field($data['service'] ?? ''),
                'message' => sanitize_textarea_field($data['message'] ?? ''),
            ]);

            $result = $telegram->sendMessage($message);

            if ($result['success']) {
                return new \WP_REST_Response([
                    'success' => true,
                    'message' => __('Message sent successfully', 'sage'),
                ], 200);
            }

            return new \WP_Error(
                'telegram_error',
                $result['error'] ?? __('Failed to send message', 'sage'),
                [
                    'status' => 500,
                    'error_code' => $result['error_code'] ?? null,
                ]
            );
        },
        'permission_callback' => '__return_true',
    ]);
});
