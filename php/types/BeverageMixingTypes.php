<?php
declare(strict_types=1);

// Typed models for the BeverageMixing SDK.
//
// GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
// params (op.<name>.points[].args.params[]). Field/param types come from the
// canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
// @voxgig/apidef VALID_CANON). Do not edit by hand.
//
// These are documentation-grade value objects (PHP 8 typed properties),
// registered on the composer classmap autoload. The SDK boundary exchanges
// assoc-arrays; these classes name the shapes for tooling and typed callers.

/** Beverage entity data model. */
class Beverage
{
    public ?string $difficulty = null;
    public ?array $ingredients = null;
    public ?string $recommendation = null;
}

/** Request payload for Beverage#load. */
class BeverageLoadMatch
{
    public ?string $difficulty = null;
    public ?array $ingredients = null;
    public ?string $recommendation = null;
}

/** Dare entity data model. */
class Dare
{
    public int $code;
    public string $creator;
    public string $result;
    public bool $status;
}

/** Request payload for Dare#load. */
class DareLoadMatch
{
    public ?int $code = null;
    public ?string $creator = null;
    public ?string $result = null;
    public ?bool $status = null;
}

