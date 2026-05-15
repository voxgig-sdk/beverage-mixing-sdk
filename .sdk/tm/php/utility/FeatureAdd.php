<?php
declare(strict_types=1);

// BeverageMixing SDK utility: feature_add

class BeverageMixingFeatureAdd
{
    public static function call(BeverageMixingContext $ctx, mixed $f): void
    {
        $ctx->client->features[] = $f;
    }
}
