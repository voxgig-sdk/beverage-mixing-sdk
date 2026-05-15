<?php
declare(strict_types=1);

// BeverageMixing SDK feature factory

require_once __DIR__ . '/feature/BaseFeature.php';
require_once __DIR__ . '/feature/TestFeature.php';


class BeverageMixingFeatures
{
    public static function make_feature(string $name)
    {
        switch ($name) {
            case "base":
                return new BeverageMixingBaseFeature();
            case "test":
                return new BeverageMixingTestFeature();
            default:
                return new BeverageMixingBaseFeature();
        }
    }
}
