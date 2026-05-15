<?php
declare(strict_types=1);

// BeverageMixing SDK utility: make_context

require_once __DIR__ . '/../core/Context.php';

class BeverageMixingMakeContext
{
    public static function call(array $ctxmap, ?BeverageMixingContext $basectx): BeverageMixingContext
    {
        return new BeverageMixingContext($ctxmap, $basectx);
    }
}
