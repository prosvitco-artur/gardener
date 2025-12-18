<?php

namespace App\View\Components;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class IconComponent extends Component
{
    /**
     * Create a new component instance.
     */
    public function __construct(public string $name, public string $class = '')
    {
        $this->classes = 'icon icon-' . $this->name;
        if ($this->class) {
            $this->classes .= ' ' . $this->class;
        }
    }

    /**
     * Get the view / contents that represent the component.
     */
    public function render(): View|Closure|string
    {
        return view('components.icon-component', [
            'name' => $this->name,
            'class' => $this->classes,
        ]);
    }
}
