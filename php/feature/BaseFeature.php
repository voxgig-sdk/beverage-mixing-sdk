<?php
declare(strict_types=1);

// BeverageMixing SDK base feature

class BeverageMixingBaseFeature
{
    public string $version;
    public string $name;
    public bool $active;

    // Positions this feature when added via the client `extend` option:
    // "__before__" / "__after__" / "__replace__" name an already-added
    // feature (mirrors the ts feature `_options`). Declared so setting it
    // on an extension instance avoids the dynamic-property deprecation.
    public ?array $_options = null;

    public function __construct()
    {
        $this->version = '0.0.1';
        $this->name = 'base';
        $this->active = true;
    }

    public function get_version(): string { return $this->version; }
    public function get_name(): string { return $this->name; }
    public function get_active(): bool { return $this->active; }

    public function init(BeverageMixingContext $ctx, array $options): void {}
    public function PostConstruct(BeverageMixingContext $ctx): void {}
    public function PostConstructEntity(BeverageMixingContext $ctx): void {}
    public function SetData(BeverageMixingContext $ctx): void {}
    public function GetData(BeverageMixingContext $ctx): void {}
    public function GetMatch(BeverageMixingContext $ctx): void {}
    public function SetMatch(BeverageMixingContext $ctx): void {}
    public function PrePoint(BeverageMixingContext $ctx): void {}
    public function PreSpec(BeverageMixingContext $ctx): void {}
    public function PreRequest(BeverageMixingContext $ctx): void {}
    public function PreResponse(BeverageMixingContext $ctx): void {}
    public function PreResult(BeverageMixingContext $ctx): void {}
    public function PreDone(BeverageMixingContext $ctx): void {}
    public function PreUnexpected(BeverageMixingContext $ctx): void {}
}
