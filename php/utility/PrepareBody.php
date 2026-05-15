<?php
declare(strict_types=1);

// BeverageMixing SDK utility: prepare_body

class BeverageMixingPrepareBody
{
    public static function call(BeverageMixingContext $ctx): mixed
    {
        if ($ctx->op->input === 'data') {
            return ($ctx->utility->transform_request)($ctx);
        }
        return null;
    }
}
