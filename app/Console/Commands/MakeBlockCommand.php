<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use Illuminate\Support\Str;

class MakeBlockCommand extends Command
{
    protected $signature = 'make:block {name : The name of the block}';
    protected $description = 'Create a new Carbon Fields Gutenberg block';

    public function handle(): int
    {
        $name = $this->argument('name');
        $blockName = Str::kebab($name);
        $className = Str::studly($name) . 'Block';
        $viewName = Str::kebab($name);

        $blockPath = get_template_directory() . '/app/blocks/' . $blockName . '.php';
        $viewPath = get_template_directory() . '/resources/views/blocks/' . $viewName . '.blade.php';

        if (file_exists($blockPath)) {
            $this->error(sprintf(__('Block %s already exists!', 'sage'), $blockName));
            return 1;
        }

        $this->createBlockFile($blockPath, $blockName, $className, $viewName);
        $this->createViewFile($viewPath, $viewName);

        $this->info(sprintf(__('Block %s created successfully!', 'sage'), $blockName));
        $this->line(sprintf(__('PHP file: %s', 'sage'), $blockPath));
        $this->line(sprintf(__('View file: %s', 'sage'), $viewPath));

        return 0;
    }

    protected function createBlockFile(string $path, string $blockName, string $className, string $viewName): void
    {
        $stub = <<<'PHP'
<?php

use Carbon_Fields\Block;
use Carbon_Fields\Field;

Block::make(__('{TITLE}', 'sage'))
    ->set_category('gardener-blocks', __('Gardener Blocks', 'sage'))
    ->set_icon('block-default')
    ->add_fields([
        Field::make('text', 'title', __('Заголовок', 'sage')),
    ])
    ->set_render_callback(function ($fields, $attributes, $inner_blocks) {
        echo view('blocks.{VIEW_NAME}', [
            'fields' => $fields,
            'attributes' => $attributes,
            'inner_blocks' => $inner_blocks,
        ])->render();
    });
PHP;

        $title = Str::title(str_replace('-', ' ', $blockName));

        $content = str_replace(
            ['{TITLE}', '{VIEW_NAME}'],
            [$title, $viewName],
            $stub
        );

        file_put_contents($path, $content);
    }

    protected function createViewFile(string $path, string $viewName): void
    {
        $stub = <<<'BLADE'
@php
  $title = $fields['title'] ?? '';
@endphp

<section class="gardener-{VIEW_NAME}-block">
  <div class="max-w-7xl mx-auto px-4 py-16">
    <h2>{{ esc_html($title) }}</h2>
  </div>
</section>
BLADE;

        $content = str_replace('{VIEW_NAME}', $viewName, $stub);
        file_put_contents($path, $content);
    }
}
