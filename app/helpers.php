<?php

namespace App;

function get_svg_sprite()
{
    static $sprite_cache = null;
    
    if ($sprite_cache !== null) {
        return $sprite_cache;
    }
    
    $icons_dir = get_template_directory() . '/resources/images/icons/';
    
    if (!is_dir($icons_dir)) {
        $sprite_cache = '';
        return $sprite_cache;
    }
    
    $svg_files = glob($icons_dir . '*.svg');
    
    if (empty($svg_files)) {
        $sprite_cache = '';
        return $sprite_cache;
    }
    
    $sprite = '<svg xmlns="http://www.w3.org/2000/svg" style="display: none;"><defs>';
    
    foreach ($svg_files as $file) {
        $icon_name = basename($file, '.svg');
        $svg_content = file_get_contents($file);
        
        if ($svg_content) {
            $dom = new \DOMDocument();
            libxml_use_internal_errors(true);
            $dom->loadXML($svg_content);
            libxml_clear_errors();
            
            $svg = $dom->getElementsByTagName('svg')->item(0);
            if ($svg) {
                $viewBox = $svg->getAttribute('viewBox') ?: '0 0 24 24';
                
                $symbol = $dom->createElement('symbol');
                $symbol->setAttribute('id', 'icon-' . $icon_name);
                $symbol->setAttribute('viewBox', $viewBox);
                
                $fill = $svg->getAttribute('fill');
                if ($fill && $fill !== 'none') {
                    $symbol->setAttribute('fill', $fill);
                } else {
                    $symbol->setAttribute('fill', 'none');
                }
                
                $stroke = $svg->getAttribute('stroke');
                if ($stroke) {
                    $symbol->setAttribute('stroke', $stroke);
                } else {
                    $symbol->setAttribute('stroke', 'currentColor');
                }
                
                $strokeWidth = $svg->getAttribute('stroke-width');
                if ($strokeWidth) {
                    $symbol->setAttribute('stroke-width', $strokeWidth);
                } else {
                    $symbol->setAttribute('stroke-width', '2');
                }
                
                $strokeLinecap = $svg->getAttribute('stroke-linecap');
                if ($strokeLinecap) {
                    $symbol->setAttribute('stroke-linecap', $strokeLinecap);
                } else {
                    $symbol->setAttribute('stroke-linecap', 'round');
                }
                
                $strokeLinejoin = $svg->getAttribute('stroke-linejoin');
                if ($strokeLinejoin) {
                    $symbol->setAttribute('stroke-linejoin', $strokeLinejoin);
                } else {
                    $symbol->setAttribute('stroke-linejoin', 'round');
                }
                
                foreach ($svg->childNodes as $child) {
                    if ($child->nodeType === XML_ELEMENT_NODE) {
                        $imported = $dom->importNode($child, true);
                        $symbol->appendChild($imported);
                    }
                }
                
                $sprite .= $dom->saveXML($symbol);
            }
        }
    }
    
    $sprite .= '</defs></svg>';
    
    $sprite_cache = $sprite;
    return $sprite_cache;
}

function get_svg_viewbox($icon_name)
{
    $icons_dir = get_template_directory() . '/resources/images/icons/';
    $file = $icons_dir . $icon_name . '.svg';
    
    if (!file_exists($file)) {
        return '0 0 24 24';
    }
    
    $svg_content = file_get_contents($file);
    if ($svg_content) {
        $dom = new \DOMDocument();
        libxml_use_internal_errors(true);
        $dom->loadXML($svg_content);
        libxml_clear_errors();
        
        $svg = $dom->getElementsByTagName('svg')->item(0);
        if ($svg) {
            return $svg->getAttribute('viewBox') ?: '0 0 24 24';
        }
    }
    
    return '0 0 24 24';
}
