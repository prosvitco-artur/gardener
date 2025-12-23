<?php

namespace App;

class Telegram
{
    protected string $botToken;
    protected string $chatId;

    public function __construct(?string $botToken = null, ?string $chatId = null)
    {
        $this->botToken = $botToken ?? carbon_get_theme_option('telegram_bot_token') ?? '';
        $this->chatId = $chatId ?? carbon_get_theme_option('telegram_chat_id') ?? '';
    }

    public function sendMessage(string $message): array
    {
        if (empty($this->botToken) || empty($this->chatId)) {
            return [
                'success' => false,
                'error' => __('Telegram bot token or group ID is not configured', 'sage'),
            ];
        }

        $url = "https://api.telegram.org/bot{$this->botToken}/sendMessage";
        
        $data = [
            'chat_id' => $this->chatId,
            'text' => $message,
            'parse_mode' => 'HTML',
        ];

        $response = wp_remote_post($url, [
            'body' => $data,
            'timeout' => 30,
        ]);

        if (is_wp_error($response)) {
            return [
                'success' => false,
                'error' => $response->get_error_message(),
            ];
        }

        $body = json_decode(wp_remote_retrieve_body($response), true);

        if (isset($body['ok']) && $body['ok'] === true) {
            return [
                'success' => true,
                'message_id' => $body['result']['message_id'] ?? null,
            ];
        }

        $errorMessage = $body['description'] ?? __('Unknown error', 'sage');
        
        if (isset($body['error_code']) && $body['error_code'] === 401) {
            $errorMessage = __('Invalid bot token. Please check your bot token in theme settings.', 'sage');
        }

        return [
            'success' => false,
            'error' => $errorMessage,
            'error_code' => $body['error_code'] ?? null,
        ];
    }

    public function formatContactMessage(array $formData): string
    {
        $message = "<b>📧 Нова заявка з форми зворотного зв'язку</b>\n\n";
        $message .= "<b>Ім'я:</b> " . esc_html($formData['name']) . "\n";
        $message .= "<b>Телефон:</b> " . esc_html($formData['phone']) . "\n";
        
        if (!empty($formData['service'])) {
            $serviceLabels = [
                'landscape-design' => __('Landscape design', 'sage'),
                'garden-maintenance' => __('Garden maintenance', 'sage'),
                'irrigation' => __('Irrigation', 'sage'),
                'consultation' => __('Consultation', 'sage'),
            ];
            $serviceLabel = $serviceLabels[$formData['service']] ?? $formData['service'];
            $message .= "<b>Послуга:</b> " . esc_html($serviceLabel) . "\n";
        }
        
        if (!empty($formData['message'])) {
            $message .= "\n<b>Повідомлення:</b>\n" . esc_html($formData['message']);
        }
        
        return $message;
    }
}

