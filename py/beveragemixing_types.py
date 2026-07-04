# Typed models for the BeverageMixing SDK.
#
# GENERATED from the API model: main.kit.entity.<e>.fields[] and per-op
# params (op.<name>.points[].args.params[]). Field/param types come from the
# canonical type sentinels via @voxgig/sdkgen canonToType (source of truth:
# @voxgig/apidef VALID_CANON). Do not edit by hand.

from __future__ import annotations

from dataclasses import dataclass
from typing import Optional, Any


@dataclass
class Beverage:
    code: int
    creator: str
    result: dict
    status: bool


@dataclass
class BeverageLoadMatch:
    code: Optional[int] = None
    creator: Optional[str] = None
    result: Optional[dict] = None
    status: Optional[bool] = None


@dataclass
class Dare:
    code: int
    creator: str
    result: str
    status: bool


@dataclass
class DareLoadMatch:
    code: Optional[int] = None
    creator: Optional[str] = None
    result: Optional[str] = None
    status: Optional[bool] = None

